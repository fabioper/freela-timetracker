"use client"

import { useAuth } from "@/shared/contexts/auth.provider"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useForm from "@/shared/hooks/use-form"
import { getItemById, upsertItem } from "@/shared/service/firestore"
import { Collections } from "@/shared/constants"
import { ServiceDto } from "@/shared/dtos/service.dto"
import { NewServiceDto } from "@/shared/dtos/new-service.dto"
import { number, object, string } from "yup"
import { InputText } from "primereact/inputtext"
import clsx from "clsx"
import { Button } from "primereact/button"
import Link from "next/link"
import { InputNumber } from "primereact/inputnumber"

const initialValues: Omit<
  NewServiceDto,
  "hourValue" | "estimatedHoursTotal" | "timerIntervals"
> = {
  name: "",
  addedAt: new Date(),
  clientId: "",
}

const schema = object({
  name: string().required("Campo obrigatório"),
  hourValue: number().required("Campo obrigatório"),
  estimatedHoursTotal: number().required("Campo obrigatório"),
})

interface ServiceFormProps {
  serviceId?: string
  clientId: string
  resetPath: string
}

export default function ServiceForm({
  serviceId,
  clientId,
  resetPath,
}: ServiceFormProps) {
  const { currentUser } = useAuth()
  const [loading, setIsLoading] = useState(false)
  const router = useRouter()

  const isUpdate = !!serviceId

  const { field, form, isValid } = useForm<NewServiceDto>({
    async onSubmit(values) {
      if (!currentUser) {
        return
      }

      setIsLoading(true)

      try {
        const updatedValues: NewServiceDto = {
          name: values.name,
          estimatedHoursTotal: values.estimatedHoursTotal,
          hourValue: values.hourValue,
          addedAt: isUpdate ? values.addedAt : new Date(),
          clientId,
          timerIntervals: isUpdate ? values.timerIntervals : [],
        }

        await upsertItem<NewServiceDto>(
          Collections.Services,
          updatedValues,
          serviceId,
        )

        return router.push(resetPath)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    },
    initialValues: initialValues as NewServiceDto,
    schema,
  })

  useEffect(() => {
    ;(async () => {
      if (isUpdate) {
        const service = await getItemById<ServiceDto>(
          Collections.Services,
          serviceId,
        )

        if (!service) return

        await form.setValues({
          name: service.name,
          addedAt: service.addedAt.toDate(),
          estimatedHoursTotal: service.estimatedHoursTotal,
          hourValue: service.hourValue,
          clientId: service.clientId,
          timerIntervals: service.timerIntervals.map((interval) => ({
            start: interval.start.toDate(),
            end: interval.end?.toDate() || null,
          })),
        })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, isUpdate])

  return (
    <form
      className="flex flex-col gap-5 max-w-prose"
      onSubmit={form.handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome</label>
        <InputText
          placeholder="Insira o nome do serviço"
          className={clsx({ "p-invalid": !isValid("name") })}
          {...field("name")}
        />

        {!isValid("name") && (
          <small className="text-red-300 text-xs mt-1">
            {form.errors.name}
          </small>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="hourValue">Valor por hora</label>
        <InputNumber
          placeholder="Insira o valor por hora"
          className={clsx({ "p-invalid": !isValid("hourValue") })}
          name="hourValue"
          onChange={(event) => {
            form.setFieldValue("hourValue", event.value)
          }}
          onValueChange={(event) => {
            form.setFieldValue("hourValue", event.value)
          }}
          onBlur={form.handleBlur}
          value={form.values.hourValue}
          locale="pt-BR"
          currency="BRL"
          inputId="hourValue"
          mode="currency"
        />

        {!isValid("hourValue") && (
          <small className="text-red-300 text-xs mt-1">
            {form.errors.hourValue}
          </small>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="estimatedHoursTotal">Horas estimadas</label>
        <InputNumber
          placeholder="Insira as horas estimadas para este serviço"
          className={clsx({ "p-invalid": !isValid("estimatedHoursTotal") })}
          name="estimatedHoursTotal"
          onChange={(event) => {
            form.setFieldValue("estimatedHoursTotal", event.value)
          }}
          onValueChange={(event) => {
            form.setFieldValue("estimatedHoursTotal", event.value)
          }}
          onBlur={form.handleBlur}
          value={form.values.estimatedHoursTotal}
          inputId="estimatedHoursTotal"
        />

        {!isValid("estimatedHoursTotal") && (
          <small className="text-red-300 text-xs mt-1">
            {form.errors.hourValue}
          </small>
        )}
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          label="Salvar serviço"
          type="submit"
          disabled={!form.isValid}
          loading={loading}
        />

        <Link href={resetPath}>
          <Button label="Cancelar" type="reset" outlined className="w-full" />
        </Link>
      </div>
    </form>
  )
}
