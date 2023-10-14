import PageHeader from "@/shared/components/page-header"
import UpdateClientForm from "@/shared/components/update-client-form"

export default function NewClient() {
  return (
    <main>
      <div className="container">
        <PageHeader title="Novo cliente" />
        <UpdateClientForm />
      </div>
    </main>
  )
}
