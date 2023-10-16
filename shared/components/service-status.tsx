"use client"

import Timer from "@/shared/components/timer"
import { useEffect, useMemo, useState } from "react"
import { updateItem } from "@/shared/service/firestore"
import { Collections } from "@/shared/constants"
import { ServiceDto } from "@/shared/dtos/service.dto"
import { NewServiceDto } from "@/shared/dtos/new-service.dto"
import { doc, onSnapshot } from "@firebase/firestore"
import { db } from "@/shared/config/firebase"
import { produce } from "immer"
import { currencyFormatter } from "@/shared/utils/number"
import { getHourFrom } from "@/shared/utils/date"

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
    timerIntervals: service.timerIntervals.map((interval) => ({
      start: interval.start.toDate(),
      end: interval.end?.toDate() || null,
    })),
    estimatedHoursTotal: service.estimatedHoursTotal,
    hourValue: service.hourValue,
    clientId: service.clientId,
  } as NewServiceDto
}

function getTotalTimeSpent(service: ServiceDto) {
  return service.timerIntervals
    .map((interval) => {
      const start = interval.start.toDate()
      const end = interval.end?.toDate() || new Date()
      return Math.abs(start.getTime() - end.getTime())
    })
    .reduce((a, b) => a + b, 0)
}

function InfoLine({
  label,
  value,
  featured = false,
}: {
  label: string
  value: string
  featured?: boolean
}) {
  if (featured) {
    return (
      <div className="flex items-center gap-2 flex-col justify-center">
        <strong className="font-normal text-[#454545]">{label}:</strong>
        <span className="text-2xl">{value}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 justify-between">
      <strong className="font-normal text-[#454545]">{label}:</strong>
      <span className="text-lg">{value}</span>
    </div>
  )
}

export default function ServiceStatus({ serviceId }: ServiceStatusProps) {
  const [loading, setLoading] = useState(false)
  const [totalTime, setTotalTime] = useState<number>(0)

  const { service } = useServiceOfId(serviceId)

  const isPlaying = useMemo(() => {
    const lastInterval = service?.timerIntervals.at(-1)
    return Boolean(lastInterval && lastInterval.end === null)
  }, [service])

  const estimatedHours = useMemo(() => {
    return service?.estimatedHoursTotal ?? 0
  }, [service?.estimatedHoursTotal])

  const workedHours = useMemo(() => {
    return getHourFrom(totalTime)
  }, [totalTime])

  useEffect(() => {
    if (!service) {
      return
    }

    if (isPlaying) {
      const interval = setInterval(() => {
        setTotalTime(getTotalTimeSpent(service))
      }, 1000)

      return () => clearInterval(interval)
    }

    setTotalTime(getTotalTimeSpent(service))
  }, [isPlaying, service])

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
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Timer
      playing={isPlaying}
      loading={loading}
      onChange={handleTimerChange}
      duration={totalTime}
    >
      {(time) => (
        <div className="w-full flex flex-col gap-2 justify-center md:max-w-lg">
          <InfoLine
            label="Tempo estimado"
            value={(service?.estimatedHoursTotal ?? 0) + "h"}
          />
          <InfoLine
            label="Horas restantes"
            value={estimatedHours - workedHours + "h"}
          />
          <InfoLine
            label="Valor por hora"
            value={currencyFormatter.format(service.hourValue)}
          />

          <div className="my-5 md:my-10 self-center">{time}</div>

          <InfoLine
            label="Total"
            featured
            value={currencyFormatter.format(workedHours * service.hourValue)}
          />
        </div>
      )}
    </Timer>
  )
}
