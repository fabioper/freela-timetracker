"use client"

import { InputText } from "primereact/inputtext"
import clsx from "clsx"
import { Button } from "primereact/button"
import Link from "next/link"
import { useCollection } from "@/app/_shared/hooks/use-collection"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useForm from "@/app/_shared/hooks/use-form"
import { NewClientDto } from "@/app/_shared/dtos/new-client.dto"
import slugify from "slugify"
import { object, string } from "yup"
import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { ClientDto } from "@/app/_shared/dtos/client.dto"

const initialValues = {
  name: "",
  slug: "",
  addedAt: new Date(),
  userId: "",
}

const schema = object({ name: string().required("Campo obrigatório") })

export default function UpdateClientForm({ clientId }: { clientId?: string }) {
  const { currentUser } = useAuth()

  const { addItem, updateItem, getItemBySlug } =
    useCollection<ClientDto>("clients")
  const [loading, setIsLoading] = useState(false)
  const router = useRouter()

  const isUpdate = !!clientId

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

        isUpdate
          ? await updateItem(clientId, updatedValues)
          : await addItem<NewClientDto>(updatedValues)

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
        console.log(clientId)
        const client = await getItemBySlug(clientId)
        if (!client) return

        await form.setValues({
          userId: client.userId,
          addedAt: client.addedAt.toDate(),
          slug: client.slug,
          name: client.name,
        })
      }
    })()
  }, [clientId, isUpdate])

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
          <Button label="Cancelar" type="reset" outlined />
        </Link>
      </div>
    </form>
  )
}
