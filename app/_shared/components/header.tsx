"use client"

import { useAuth } from "@/app/_shared/contexts/auth.provider"
import Image from "next/image"

export default function Header() {
  const { login, logout, currentUser } = useAuth()

  return (
    <header className="p-5 flex items-center justify-between">
      <h1>Header</h1>

      {!currentUser ? (
        <button onClick={login} className="text-xs underline">
          Login
        </button>
      ) : (
        <>
          <div className="flex gap-2 items-start">
            {currentUser.photoURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <Image
                src={currentUser.photoURL}
                alt=""
                width="24"
                height="24"
                className="rounded-full w-7"
              />
            )}
            <div>
              <p className="text-xs">{currentUser.displayName}</p>
              <button onClick={logout} className="text-xs underline">
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
