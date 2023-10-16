import { PropsWithChildren } from "react"
import { Tag, TagProps } from "primereact/tag"

interface PageHeaderProps {
  title: string | undefined
  tag?: string
  tagSeverity?: TagProps["severity"]
}

export default function PageHeader({
  title,
  tag,
  tagSeverity,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <header className="flex items-center justify-between mb-10">
      <h2 className="text-3xl font-bold flex flex-col gap-2">
        {tag && (
          <Tag value={tag} severity={tagSeverity} className="w-8/12 p-0 px-2" />
        )}
        {title}
      </h2>
      {children}
    </header>
  )
}
