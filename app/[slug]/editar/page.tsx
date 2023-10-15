import PageHeader from "@/shared/components/page-header"
import ClientForm from "@/shared/components/client-form"
import { getItemBySlug } from "@/shared/service/firestore"
import { notFound } from "next/navigation"
import { Collections } from "@/shared/constants"

export default async function EditClientPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = await getItemBySlug(Collections.Clients, params.slug)
  if (!client) return notFound()

  return (
    <main>
      <div className="container">
        <PageHeader title="Editar cliente" />
        <ClientForm clientSlug={params.slug} />
      </div>
    </main>
  )
}
