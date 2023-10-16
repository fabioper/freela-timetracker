import PageHeader from "@/shared/components/page-header"
import ClientForm from "@/shared/components/client-form"
import { getItemBySlug } from "@/shared/service/firestore"
import { notFound } from "next/navigation"
import { Collections } from "@/shared/constants"
import { Breadcrumb, Breadcrumbs } from "@/shared/components/breadcrumbs"
import { Route } from "next"
import { ClientDto } from "@/shared/dtos/client.dto"

export default async function EditClientPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = await getItemBySlug<ClientDto>(
    Collections.Clients,
    params.slug,
  )
  if (!client) return notFound()

  return (
    <main>
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb label={client.name} path={`/${client.slug}` as Route} />
          <Breadcrumb label="Editar" />
        </Breadcrumbs>
        <PageHeader title="Editar cliente" />
        <ClientForm clientSlug={params.slug} />
      </div>
    </main>
  )
}
