import PageHeader from "@/app/_shared/components/page-header"
import UpdateClientForm from "@/app/_shared/components/update-client-form"

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
