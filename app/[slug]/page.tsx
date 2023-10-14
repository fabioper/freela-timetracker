import PageHeader from "@/shared/components/page-header"
import { ClientDto } from "@/shared/dtos/client.dto"
import { getItemBySlug } from "@/shared/service/firestore"
import { notFound } from "next/navigation"
import { Collections } from "@/shared/constants"

interface ClientPageProps {
  params: { slug: string }
}

export default async function ClientPage({ params }: ClientPageProps) {
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
        <PageHeader title={client.name} />
      </div>
    </main>
  )
}
