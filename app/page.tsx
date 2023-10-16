import { Button } from "primereact/button"
import ClientsList from "@/shared/components/clients-list"
import Link from "next/link"
import PageHeader from "@/shared/components/page-header"
import { Breadcrumbs } from "@/shared/components/breadcrumbs"

export default function Home() {
  return (
    <main>
      <div className="container">
        <section>
          <Breadcrumbs />

          <PageHeader title="Clientes">
            <Link href="/novo-cliente">
              <Button label="Novo cliente" />
            </Link>
          </PageHeader>

          <ClientsList />
        </section>
      </div>
    </main>
  )
}
