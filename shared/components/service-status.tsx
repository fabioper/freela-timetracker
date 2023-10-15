"use client"

import Timer from "@/shared/components/timer"
import { useEffect, useState } from "react"
import { updateItem } from "@/shared/service/firestore"
import { Collections } from "@/shared/constants"
import { ServiceDto } from "@/shared/dtos/service.dto"
import { NewServiceDto } from "@/shared/dtos/new-service.dto"
import { doc, onSnapshot } from "@firebase/firestore"
import { db } from "@/shared/config/firebase"
import { produce } from "immer"

interface ServiceStatusProps {
  serviceId: string
}

function useServiceOfId(serviceId: string) {
  const [service, setService] = useState<ServiceDto>()

  useEffect(() => {
    const serviceDoc = doc(db, Collections.Services, serviceId)
    onSnapshot(serviceDoc, (snapshot) => {
      setService({ ...snapshot.data(), id: snapshot.id } as ServiceDto)
    })

    return () => setService(undefined)
  }, [serviceId])

  return { service }
}

function serviceToNewServiceDto(service: ServiceDto) {
  return {
    name: service.name,
    addedAt: service.addedAt.toDate(),
    timerIntervals: service.timerIntervals,
    estimatedHoursTotal: service.estimatedHoursTotal,
    hourValue: service.hourValue,
    clientId: service.clientId,
  } as NewServiceDto
}

export default function ServiceStatus({ serviceId }: ServiceStatusProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const { service } = useServiceOfId(serviceId)

  if (!service) {
    return <></>
  }

  const handlePlaying = (service: NewServiceDto) => {
    const nextIndex = service.timerIntervals.length
    service.timerIntervals[nextIndex] = {
      start: new Date(),
      end: null,
    }
  }

  const handlePause = (service: NewServiceDto) => {
    const lastInterval = service.timerIntervals.at(-1)
    if (lastInterval) {
      lastInterval.end = new Date()
    }
  }

  const handleTimerChange = async (playing: boolean) => {
    setLoading(true)

    try {
      await updateItem<NewServiceDto>(
        Collections.Services,
        serviceId,
        produce(serviceToNewServiceDto(service), (draft) =>
          playing ? handlePlaying(draft) : handlePause(draft),
        ),
      )

      setIsPlaying(playing)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Timer
        playing={isPlaying}
        loading={loading}
        onChange={handleTimerChange}
      />
    </div>
  )
}
