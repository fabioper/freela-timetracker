import { Duration } from "luxon"

export const dateFormatter = new Intl.DateTimeFormat("pt-br", {
  dateStyle: "short",
  timeStyle: "short",
})

export function formatDuration(milli: number) {
  return Duration.fromMillis(milli).toFormat("hh:mm:ss")
}

export function getHourFrom(milli: number) {
  return Number(Duration.fromMillis(milli).toFormat("h"))
}
