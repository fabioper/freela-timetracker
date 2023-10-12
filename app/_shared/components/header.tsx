"use client"

import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { Button } from "primereact/button"
import { Avatar } from "primereact/avatar"
import { PrimeIcons } from "primereact/api"
import Link from "next/link"

export default function Header() {
  const { login, logout, currentUser } = useAuth()

  return (
    <header>
      <div className="py-5 container flex items-center justify-between border-b border-surface-border">
        <Link href="/">
          <h1>Time Tracker</h1>
        </Link>

        {!currentUser ? (
          <Button
            label="Login"
            link
            onClick={login}
            icon={PrimeIcons.SIGN_IN}
          />
        ) : (
          <>
            <div className="flex gap-2 items-start">
              {currentUser.photoURL && (
                <Avatar image={currentUser.photoURL} shape="circle" />
              )}

              <div>
                <p className="text-sm">{currentUser.displayName}</p>
                <Button
                  onClick={logout}
                  label="Sign out"
                  link
                  className="p-0"
                  icon={PrimeIcons.SIGN_OUT}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
