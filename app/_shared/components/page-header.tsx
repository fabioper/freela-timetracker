import { PropsWithChildren } from "react"

interface PageHeaderProps {
  title: string
}

export default function PageHeader({
  title,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <header className="flex items-center justify-between mb-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </header>
  )
}
