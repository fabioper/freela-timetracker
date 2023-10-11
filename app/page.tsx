import { Button } from "primereact/button"

export default function Home() {
  return (
    <main>
      <div className="container">
        <section>
          <header className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Clientes</h2>
            <Button label="Novo cliente" />
          </header>
        </section>
      </div>
    </main>
  )
}
