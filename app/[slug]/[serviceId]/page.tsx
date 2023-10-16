import { getItemById, getItemBySlug } from "@/shared/service/firestore"
import { Collections } from "@/shared/constants"
import { notFound } from "next/navigation"
import { ClientDto } from "@/shared/dtos/client.dto"
import { ServiceDto } from "@/shared/dtos/service.dto"
import PageHeader from "@/shared/components/page-header"
import ServiceStatus from "@/shared/components/service-status"
import { Breadcrumb, Breadcrumbs } from "@/shared/components/breadcrumbs"
import { Route } from "next"

interface ServicePageProps {
  params: { slug: string; serviceId: string }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const client = await getItemBySlug<ClientDto>(
    Collections.Clients,
    params.slug,
  )

  const service = await getItemById<ServiceDto>(
    Collections.Services,
    params.serviceId,
  )

  if (!client || !service) return notFound()

  return (
    <main>
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb label={client.name} path={`/${client.slug}` as Route} />
          <Breadcrumb label={service.name} />
        </Breadcrumbs>

        <PageHeader title={service.name} tag="Serviço" tagSeverity="warning" />

        <ServiceStatus serviceId={service.id} />
      </div>
    </main>
  )
}
