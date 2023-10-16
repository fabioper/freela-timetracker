import { getItemById, getItemBySlug } from "@/shared/service/firestore"
import { ClientDto } from "@/shared/dtos/client.dto"
import { Collections } from "@/shared/constants"
import { notFound } from "next/navigation"
import PageHeader from "@/shared/components/page-header"
import ServiceForm from "@/shared/components/service-form"
import { ServiceDto } from "@/shared/dtos/service.dto"
import { Breadcrumb, Breadcrumbs } from "@/shared/components/breadcrumbs"
import { Route } from "next"

interface EditServicePageProps {
  params: { slug: string; serviceId: string }
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const client = await getItemBySlug<ClientDto>(
    Collections.Clients,
    params.slug,
  )

  const service = await getItemById<ServiceDto>(
    Collections.Services,
    params.serviceId,
  )

  if (!client || !service) {
    return notFound()
  }

  return (
    <main>
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb label={client.name} path={`/${client.slug}` as Route} />
          <Breadcrumb
            label={service.name}
            path={`/${client.slug}/${service.id}` as Route}
          />
          <Breadcrumb label="Editar" />
        </Breadcrumbs>

        <PageHeader title="Novo serviço" />
        <ServiceForm
          clientId={client.id}
          resetPath={`/${client.slug}`}
          serviceId={service.id}
        />
      </div>
    </main>
  )
}
