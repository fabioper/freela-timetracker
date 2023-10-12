import { Button } from "primereact/button"
import ClientsList from "@/app/_shared/components/clients-list"
import Link from "next/link"
import PageHeader from "@/app/_shared/components/page-header"

export default function Home() {
  return (
    <main>
      <div className="container">
        <section>
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
