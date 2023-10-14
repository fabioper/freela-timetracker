import { PropsWithChildren, useRef } from "react"
import { MenuItem } from "primereact/menuitem"
import { Menu } from "primereact/menu"
import { Button } from "primereact/button"
import { PrimeIcons } from "primereact/api"
import clsx from "clsx"

interface CardProps {
  title: string
  menu?: MenuItem[]
}

export function Card({ title, menu, children }: PropsWithChildren<CardProps>) {
  const menuRef = useRef<Menu>(null)

  return (
    <div className="bg-card border border-card-border p-5 rounded flex flex-col gap-2 transition-all hover:border-card-hover hover:-translate-y-1">
      <header
        className={clsx("flex items-center", { "justify-between": !!menu })}
      >
        <h2 className="font-bold">{title}</h2>

        {menu && (
          <Button
            icon={PrimeIcons.ELLIPSIS_V}
            onClick={(event) => {
              event.preventDefault()
              return menuRef.current?.toggle(event)
            }}
            aria-controls="popup_menu"
            aria-haspopup
            rounded
            text
          />
        )}
      </header>

      {children && <div>{children}</div>}

      {menu && (
        <Menu
          model={menu}
          popup
          ref={menuRef}
          id="popup_menu"
          popupAlignment="left"
        />
      )}
    </div>
  )
}
