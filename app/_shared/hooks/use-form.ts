import type { InputHTMLAttributes } from "react"
import { useCallback, useState } from "react"
import { useFormik } from "formik"
import { type Schema } from "yup"

interface UseFormConfig<T extends Record<string, any>> {
  initialValues: T
  schema: Schema
  onSubmit: (values: T) => void | Promise<void>
}

type UseFormField = Omit<
  InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  "value"
> & { value: string | undefined }

export default function useForm<T extends Record<string, any>>(
  config: UseFormConfig<T>,
) {
  const [dirty, setDirty] = useState<Set<keyof T>>(new Set())

  const form = useFormik<T>({
    initialValues: config.initialValues,
    onSubmit: config.onSubmit,
    validationSchema: config.schema,
  })

  const markAsDirty = useCallback((field: keyof T) => {
    setDirty((prevState) => prevState.add(field))
  }, [])

  const isValid = useCallback(
    (field: keyof T) => {
      const hasError = !!form.errors[field]
      const isDirty = dirty.has(field)
      return !((isDirty || form.submitCount > 0) && hasError)
    },
    [dirty, form.errors, form.submitCount],
  )

  const field = useCallback(
    (name: keyof T & string): UseFormField => {
      return {
        name,
        id: name,
        value: form.values[name],
        onChange: (event) => {
          markAsDirty(name)
          form.handleChange(event)
        },
        onBlur: form.handleBlur,
        ...(!isValid(name)
          ? { "aria-invalid": true, "data-invalid": true }
          : { "data-valid": true }),
      }
    },
    [form, isValid, markAsDirty],
  )

  return { form, isValid, field }
}
