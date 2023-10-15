"use client"

import { useCollection } from "@/shared/hooks/use-collection"
import { Collections } from "@/shared/constants"
import { where } from "@firebase/firestore"
import Link from "next/link"
import { ServiceDto } from "@/shared/dtos/service.dto"
import { Card } from "@/shared/components/card"
import { useCallback } from "react"
import { PrimeIcons } from "primereact/api"
import { usePathname, useRouter } from "next/navigation"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { deleteItem } from "@/shared/service/firestore"

interface ServicesListProps {
  clientId: string
}

export default function ServicesList({ clientId }: ServicesListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const services = useCollection<ServiceDto>(
    Collections.Services,
    where("clientId", "==", clientId),
  )

  const removeService = useCallback((service: ServiceDto) => {
    confirmDialog({
      header: "Deletar serviço",
      message: `Tem certeza que deseja excluir o serviço: ${service.name}?`,
      icon: PrimeIcons.TRASH,
      acceptLabel: "Sim, excluir",
      rejectLabel: "Não, mudei de idéia",
      acceptClassName: "p-button-danger",
      accept: async () => await deleteItem(Collections.Services, service.id),
    })
  }, [])

  const getMenuItems = useCallback(
    (service: ServiceDto) => [
      {
        label: "Editar",
        icon: PrimeIcons.PENCIL,
        command: () => router.push(`${pathname}/${service.id}/editar`),
      },
      {
        label: "Remover",
        icon: PrimeIcons.TRASH,
        command: () => removeService(service),
      },
    ],
    [pathname, removeService, router],
  )

  return (
    <div className="grid grid-cols-auto gap-2">
      {services.map((service) => (
        <Link href={`${pathname}/${service.id}`} key={service.id}>
          <Card title={service.name} menu={getMenuItems(service)} />
        </Link>
      ))}
      <ConfirmDialog />
    </div>
  )
}
