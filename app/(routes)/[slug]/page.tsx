import PageHeader from "@/app/_shared/components/page-header"
import { ClientDto } from "@/app/_shared/dtos/client.dto"
import { getItemBySlug } from "@/app/_shared/service/firestore"
import { notFound } from "next/navigation"

interface ClientPageProps {
  params: { slug: string }
}

export default async function ClientPage({ params }: ClientPageProps) {
  const client = await getItemBySlug<ClientDto>("clients", params.slug)

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
