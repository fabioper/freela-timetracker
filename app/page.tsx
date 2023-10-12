import { Button } from "primereact/button"
import ClientsList, { Client } from "@/app/clients-list"
import Link from "next/link"
import PageHeader from "@/app/_shared/components/page-header"

export default function Home() {
  const clients: Client[] = [
    { id: "1", name: "Teste", slug: "test-1", addedAt: new Date() },
    { id: "2", name: "Teste1", slug: "test-2", addedAt: new Date() },
    { id: "3", name: "Teste2", slug: "test-3", addedAt: new Date() },
    { id: "4", name: "Teste3", slug: "test-4", addedAt: new Date() },
    { id: "5", name: "Teste4", slug: "test-5", addedAt: new Date() },
    { id: "6", name: "Teste5", slug: "test-6", addedAt: new Date() },
  ]

  return (
    <main>
      <div className="container">
        <section>
          <PageHeader title="Clientes">
            <Link href="/novo-cliente">
              <Button label="Novo cliente" />
            </Link>
          </PageHeader>

          <ClientsList clients={clients} />
        </section>
      </div>
    </main>
  )
}
