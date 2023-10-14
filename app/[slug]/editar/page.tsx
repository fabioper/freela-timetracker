import PageHeader from "@/shared/components/page-header"
import ClientForm from "@/shared/components/client-form"

export default function EditClientPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <main>
      <div className="container">
        <PageHeader title="Editar cliente" />
        <ClientForm clientId={params.slug} />
      </div>
    </main>
  )
}
