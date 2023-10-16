import PageHeader from "@/shared/components/page-header"
import ClientForm from "@/shared/components/client-form"
import { Breadcrumb, Breadcrumbs } from "@/shared/components/breadcrumbs"

export default function NewClient() {
  return (
    <main>
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb label="Novo cliente" />
        </Breadcrumbs>

        <PageHeader title="Novo cliente" />
        <ClientForm />
      </div>
    </main>
  )
}
