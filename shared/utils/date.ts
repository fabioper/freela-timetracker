import { Duration } from "luxon"

export const dateFormatter = new Intl.DateTimeFormat("pt-br", {
  dateStyle: "short",
  timeStyle: "short",
})

export const formatDuration = (milli: number) =>
  Duration.fromMillis(milli).toFormat("hh:mm:ss")
