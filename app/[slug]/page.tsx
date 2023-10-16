import PageHeader from "@/shared/components/page-header"
import { ClientDto } from "@/shared/dtos/client.dto"
import { getItemBySlug } from "@/shared/service/firestore"
import { notFound } from "next/navigation"
import { Collections } from "@/shared/constants"
import { Button } from "primereact/button"
import Link from "next/link"
import ServicesList from "@/shared/components/services-list"
import { Breadcrumb, Breadcrumbs } from "@/shared/components/breadcrumbs"

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
        <Breadcrumbs>
          <Breadcrumb label={client.name} />
        </Breadcrumbs>

        <PageHeader title={client.name} tag="Cliente" tagSeverity="info">
          <Link href={`/${client.slug}/novo-servico`}>
            <Button label="Novo serviço" />
          </Link>
        </PageHeader>

        <ServicesList clientId={client.id} />
      </div>
    </main>
  )
}
