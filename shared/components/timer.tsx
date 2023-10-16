import { Button, ButtonProps } from "primereact/button"
import { PrimeIcons } from "primereact/api"
import { useMemo } from "react"
import { formatDuration } from "@/shared/utils/date"

interface TimerProps {
  playing: boolean
  loading?: boolean
  onChange: (isPlaying: boolean) => void | Promise<void>
  duration: number
}

export default function Timer({
  playing,
  loading = false,
  duration,
  onChange,
}: TimerProps) {
  const buttonProps: ButtonProps = useMemo(
    () => ({
      rounded: true,
      outlined: true,
      loading,
      className: "p-8",
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
    <div className="flex flex-col items-center gap-10 py-10">
      <div className="flex flex-col gap-5 items-center justify-center rounded-full">
        <time className="text-6xl md:text-9xl font-light">
          {formatDuration(duration)}
        </time>
      </div>

      {button}
    </div>
  )
}
