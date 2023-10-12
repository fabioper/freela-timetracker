import PageHeader from "@/app/_shared/components/page-header"
import UpdateClientForm from "@/app/_shared/components/update-client-form"

export default function EditClientPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <main>
      <div className="container">
        <PageHeader title="Editar cliente" />
        <UpdateClientForm clientId={params.slug} />
      </div>
    </main>
  )
}
