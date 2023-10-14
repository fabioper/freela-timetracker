import { PropsWithChildren, useRef } from "react"
import { MenuItem } from "primereact/menuitem"
import { Menu } from "primereact/menu"
import { Button } from "primereact/button"
import { PrimeIcons } from "primereact/api"

export function Card({
  title,
  menu,
  children,
}: PropsWithChildren<{ title: string; menu?: MenuItem[] }>) {
  const menuRef = useRef<Menu>(null)

  return (
    <div className="bg-card border border-card-border p-5 rounded flex flex-col gap-2 transition-all hover:border-card-hover hover:-translate-y-1">
      <header className="flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
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
