"use client"

import Link from "next/link"
import { orderBy, where } from "@firebase/firestore"
import { useAuth } from "@/shared/contexts/auth.provider"
import { useCollection } from "@/shared/hooks/use-collection"
import { PrimeIcons } from "primereact/api"
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog"
import { ClientDto } from "@/shared/dtos/client.dto"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/shared/components/card"
import { Message } from "primereact/message"
import { deleteItem } from "@/shared/service/firestore"
import { Collections } from "@/shared/constants"
import { dateFormatter } from "@/shared/utils/date"

export default function ClientsList() {
  const { currentUser } = useAuth()
  const router = useRouter()

  const clients = useCollection<ClientDto>(
    Collections.Clients,
    where("userId", "==", currentUser?.uid),
    orderBy("addedAt", "asc"),
  )

  const removeClient = useCallback(async (client: ClientDto) => {
    confirmDialog({
      header: "Deletar cliente",
      message: `Tem certeza que deseja excluir o cliente: ${client.name}?`,
      icon: PrimeIcons.TRASH,
      acceptLabel: "Sim, excluir",
      rejectLabel: "Não, mudei de idéia",
      acceptClassName: "p-button-danger",
      accept: async () => await deleteItem(Collections.Clients, client.id),
    })
  }, [])

  const getMenuItems = useCallback(
    (client: ClientDto) => [
      {
        label: "Editar",
        icon: PrimeIcons.PENCIL,
        command: () => router.push(`/${client.slug}/editar`),
      },
      {
        label: "Remover",
        icon: PrimeIcons.TRASH,
        command: () => removeClient(client),
      },
    ],
    [removeClient, router],
  )

  if (!currentUser) {
    return (
      <Message
        text="Você precisa estar logado"
        className="w-full justify-start"
        severity="warn"
        icon={PrimeIcons.LOCK}
      />
    )
  }

  return (
    <div className="grid grid-cols-auto gap-2">
      {clients.map((client) => (
        <Link href={`/${client.slug}`} key={client.id}>
          <Card title={client.name} menu={getMenuItems(client)}>
            <time className="text-sm">
              {dateFormatter.format(client.addedAt.toDate())}
            </time>
          </Card>
        </Link>
      ))}

      <ConfirmDialog />
    </div>
  )
}
