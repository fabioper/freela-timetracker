"use client"

import { Message } from "primereact/message"
import { PrimeIcons } from "primereact/api"
import { useAuth } from "@/shared/contexts/auth.provider"
import { PropsWithChildren } from "react"

export default function Protected({ children }: PropsWithChildren) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return (
      <main>
        <div className="container">
          <Message
            text="Você precisa estar logado"
            className="w-full justify-start"
            severity="warn"
            icon={PrimeIcons.LOCK}
          />
        </div>
      </main>
    )
  }

  return children
}
