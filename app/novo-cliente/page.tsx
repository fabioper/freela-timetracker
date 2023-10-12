import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import Link from "next/link"
import PageHeader from "@/app/_shared/components/page-header"

export default function NewClient() {
  return (
    <main>
      <div className="container">
        <PageHeader title="Novo cliente" />

        <form className="flex flex-col gap-5 max-w-prose">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nome</label>
            <InputText placeholder="Insira o nome do cliente" id="name" />
          </div>

          <div className="flex flex-col gap-1 md:flex-row">
            <Button label="Salvar cliente" type="submit" />

            <Link href="/">
              <Button label="Cancelar" type="reset" outlined />
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
