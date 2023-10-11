"use client"

import { useAuth } from "@/app/_shared/contexts/auth.provider"
import { Button } from "primereact/button"
import { Avatar } from "primereact/avatar"

export default function Header() {
  const { login, logout, currentUser } = useAuth()

  return (
    <header>
      <div className="py-5 container flex items-center justify-between border-b border-surface-border">
        <h1>Time Tracker</h1>

        {!currentUser ? (
          <Button label="Login" link onClick={login} />
        ) : (
          <>
            <div className="flex gap-2 items-start">
              {currentUser.photoURL && (
                <Avatar image={currentUser.photoURL} shape="circle" />
              )}

              <div>
                <p className="text-xs">{currentUser.displayName}</p>
                <Button
                  onClick={logout}
                  label="Sign out"
                  link
                  className="p-0"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
