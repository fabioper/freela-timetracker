import { Button, ButtonProps } from "primereact/button"
import { PrimeIcons } from "primereact/api"
import { ReactNode, useMemo } from "react"
import { formatDuration } from "@/shared/utils/date"

interface TimerProps {
  playing: boolean
  loading?: boolean
  onChange: (isPlaying: boolean) => void | Promise<void>
  duration: number
  children?: (time: ReactNode) => ReactNode
}

export default function Timer({
  playing,
  loading = false,
  duration,
  onChange,
  children,
}: TimerProps) {
  const buttonProps: ButtonProps = useMemo(
    () => ({
      rounded: true,
      outlined: true,
      loading,
      className: "p-10",
      onClick: () => onChange(!playing),
    }),
    [loading, onChange, playing],
  )

  const button = useMemo(() => {
    if (playing) {
      return (
        <Button {...buttonProps} severity="secondary" icon={PrimeIcons.PAUSE} />
      )
    }

    return <Button {...buttonProps} severity="success" icon={PrimeIcons.PLAY} />
  }, [buttonProps, playing])

  return (
    <div className="flex flex-col items-center gap-10">
      {children?.(
        <time className="flex text-6xl md:text-9xl font-light">
          {formatDuration(duration)}
        </time>,
      )}

      {button}
    </div>
  )
}
