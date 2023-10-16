import { Duration } from "luxon"

export const dateFormatter = new Intl.DateTimeFormat("pt-br", {
  dateStyle: "short",
  timeStyle: "short",
})

export function durationFrom(totalTime: number) {
  return Duration.fromMillis(totalTime)
}

export function formatDuration(milli: number) {
  return durationFrom(milli).toFormat("hh:mm:ss")
}
