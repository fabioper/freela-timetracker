"use client"

import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import Link from "next/link"
import PageHeader from "@/app/_shared/components/page-header"
import useForm from "@/app/_shared/hooks/use-form"
import { object, string } from "yup"
import { NewClientDto } from "@/app/_shared/dtos/new-client-dto"
import { useAuth } from "@/app/_shared/contexts/auth.provider"
import clsx from "clsx"
import { useCollection } from "@/app/_shared/hooks/use-collection"
import slugify from "slugify"
import { useRouter } from "next/navigation"
import { useState } from "react"

const initialValues = {
  name: "",
  slug: "",
  addedAt: new Date(),
  userId: "",
}
const schema = object({ name: string().required("Campo obrigatório") })

export default function NewClient() {
  const { currentUser } = useAuth()
  const { addItem } = useCollection("clients")
  const [loading, setIsLoading] = useState(false)
  const router = useRouter()

  const { field, form } = useForm<NewClientDto>({
    async onSubmit(values) {
      if (!currentUser) {
        return
      }

      setIsLoading(true)

      try {
        await addItem<NewClientDto>({
          name: values.name,
          slug: slugify(values.name, { lower: true }),
          userId: currentUser.uid,
          addedAt: new Date(),
        })
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

  return (
    <main>
      <div className="container">
        <PageHeader title="Novo cliente" />

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
      </div>
    </main>
  )
}
