import { PropsWithChildren } from "react"
import { Tag, TagProps } from "primereact/tag"
import clsx from "clsx"

interface PageHeaderProps {
  title: string | undefined
  tag?: string
  tagSeverity?: TagProps["severity"]
  center?: boolean
}

export default function PageHeader({
  title,
  tag,
  tagSeverity,
  center = false,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <header
      className={clsx("flex mb-5", {
        "justify-between items-center": !center,
        "justify-center flex-col gap-5 text-center": center,
      })}
    >
      <h2
        className={clsx(
          "text-3xl font-bold flex flex-col justify-start gap-2",
          {
            "items-center": center,
          },
        )}
      >
        {tag && (
          <Tag value={tag} severity={tagSeverity} className="w-min p-0 px-2" />
        )}
        {title}
      </h2>
      {children}
    </header>
  )
}
