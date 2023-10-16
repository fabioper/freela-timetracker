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

    return <Button {...buttonProps} icon={PrimeIcons.PLAY} severity="success" />
  }, [buttonProps, playing])

  return (
    <div>
      {formatDuration(duration)}
      {button}
    </div>
  )
}
