"use client"

import { InputText } from "primereact/inputtext"
import clsx from "clsx"
import { Button } from "primereact/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useForm from "@/shared/hooks/use-form"
import { NewClientDto } from "@/shared/dtos/new-client.dto"
import slugify from "slugify"
import { object, string } from "yup"
import { useAuth } from "@/shared/contexts/auth.provider"
import { getItemBySlug, upsertItem } from "@/shared/service/firestore"
import { ClientDto } from "@/shared/dtos/client.dto"
import { Collections } from "@/shared/constants"

const initialValues = {
  name: "",
  slug: "",
  addedAt: new Date(),
  userId: "",
}

const schema = object({ name: string().required("Campo obrigatório") })

const getClientIdFromSlug = async (clientSlug?: string) => {
  if (!clientSlug) return

  const client = await getItemBySlug<ClientDto>(Collections.Clients, clientSlug)

  if (!client) {
    throw new Error(`Client with slug ${clientSlug} not found`)
  }

  return client.id
}

export default function ClientForm({ clientSlug }: { clientSlug?: string }) {
  const { currentUser } = useAuth()
  const [loading, setIsLoading] = useState(false)
  const router = useRouter()

  const isUpdate = !!clientSlug

  const { field, form } = useForm<NewClientDto>({
    async onSubmit(values) {
      if (!currentUser) {
        return
      }

      setIsLoading(true)

      try {
        const updatedValues = {
          name: values.name,
          userId: currentUser.uid,
          slug: slugify(values.name, { lower: true }),
          addedAt: isUpdate ? values.addedAt : new Date(),
        }

        const clientIdIfUpdate = await getClientIdFromSlug(clientSlug)
        await upsertItem(Collections.Clients, updatedValues, clientIdIfUpdate)

        return router.push("/")
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    },
    initialValues,
    schema,
  })

  useEffect(() => {
    ;(async () => {
      if (isUpdate) {
        const client = await getItemBySlug<ClientDto>(
          Collections.Clients,
          clientSlug,
        )

        if (!client) return

        await form.setValues({
          userId: client.userId,
          addedAt: client.addedAt.toDate(),
          slug: client.slug,
          name: client.name,
        })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSlug, isUpdate])

  return (
    <form
      className="flex flex-col gap-5 max-w-prose"
      onSubmit={form.handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome</label>
        <InputText
          placeholder="Insira o nome do cliente"
          className={clsx({ "p-invalid": !!form.errors.name })}
          {...field("name")}
        />

        {!!form.errors.name && (
          <small className="text-red-300 text-xs mt-1">
            {form.errors.name}
          </small>
        )}
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          label="Salvar cliente"
          type="submit"
          disabled={!form.isValid}
          loading={loading}
        />

        <Link href="/">
          <Button label="Cancelar" type="reset" outlined className="w-full" />
        </Link>
      </div>
    </form>
  )
}
