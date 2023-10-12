import type React from "react"
import { useCallback, useState } from "react"
import { useFormik } from "formik"
import styles from "components/Contact/ContactForm/ContactForm.module.css"
import { type Schema } from "yup"

interface UseFormConfig<T extends Record<string, any>> {
  handleSubmit: (values: T) => Promise<void>
  initialValues: T
  schema: Schema
}

export default function useForm<T extends Record<string, any>>(
  config: UseFormConfig<T>,
) {
  const [dirty, setDirty] = useState<Set<keyof T>>(new Set())

  const form = useFormik<T>({
    initialValues: config.initialValues,
    onSubmit: config.handleSubmit,
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
    (
      name: keyof T & string,
    ): React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> => {
      return {
        name,
        id: name,
        value: form.values[name],
        onChange: (event) => {
          markAsDirty(name)
          form.handleChange(event)
        },
        onBlur: form.handleBlur,
        className: !isValid(name) ? styles.invalid : undefined,
      }
    },
    [form, isValid, markAsDirty],
  )
  return { form, isValid, field }
}
