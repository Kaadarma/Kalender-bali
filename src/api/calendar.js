import { getTodayData, generateMonthGrid } from "../utils/calendar"

export function fetchToday() {
  return Promise.resolve(getTodayData())
}

export function fetchCalendar(month, year) {
  return Promise.resolve(generateMonthGrid(month - 1, year))
}
