import { getItemById, getItemBySlug } from "@/shared/service/firestore"
import { Collections } from "@/shared/constants"
import { notFound } from "next/navigation"
import { ClientDto } from "@/shared/dtos/client.dto"
import { ServiceDto } from "@/shared/dtos/service.dto"
import PageHeader from "@/shared/components/page-header"

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
        <PageHeader title={service.name} />
      </div>
    </main>
  )
}
