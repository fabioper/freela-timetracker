import PageHeader from "@/shared/components/page-header"
import ServiceForm from "@/shared/components/service-form"
import { getItemBySlug } from "@/shared/service/firestore"
import { notFound } from "next/navigation"
import { Collections } from "@/shared/constants"
import { ClientDto } from "@/shared/dtos/client.dto"
import { Breadcrumb, Breadcrumbs } from "@/shared/components/breadcrumbs"
import { Route } from "next"

interface NewClientServicePageProps {
  params: { slug: string }
}

export default async function NewClientServicePage({
  params,
}: NewClientServicePageProps) {
  const client = await getItemBySlug<ClientDto>(
    Collections.Clients,
    params.slug,
  )

  if (!client) {
    return notFound()
  }

  return (
    <main>
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb label={client.name} path={`/${client.slug}` as Route} />
          <Breadcrumb label="Novo serviço" />
        </Breadcrumbs>

        <PageHeader title="Novo serviço" />
        <ServiceForm clientId={client.id} resetPath={`/${client.slug}`} />
      </div>
    </main>
  )
}
