import { Button, ButtonProps } from "primereact/button"
import { PrimeIcons } from "primereact/api"
import { useMemo } from "react"

interface TimerProps {
  playing: boolean
  loading?: boolean
  onChange: (isPlaying: boolean) => void | Promise<void>
}

export default function Timer({
  playing,
  loading = false,
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

  if (!playing) {
    return (
      <Button {...buttonProps} severity="secondary" icon={PrimeIcons.PAUSE} />
    )
  }

  return <Button {...buttonProps} icon={PrimeIcons.PLAY} severity="success" />
}
