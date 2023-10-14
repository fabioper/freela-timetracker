import PageHeader from "@/shared/components/page-header"
import ClientForm from "@/shared/components/client-form"

export default function NewClient() {
  return (
    <main>
      <div className="container">
        <PageHeader title="Novo cliente" />
        <ClientForm />
      </div>
    </main>
  )
}
