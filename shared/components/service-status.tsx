"use client"

import Timer from "@/shared/components/timer"
import { useState } from "react"

interface ServiceStatusProps {}

export default function ServiceStatus({}: ServiceStatusProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div>
      <Timer playing={isPlaying} onChange={setIsPlaying} />
    </div>
  )
}
