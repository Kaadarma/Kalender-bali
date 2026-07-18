import { getTodayData, getMonthRituals, generateMonthGrid } from "../utils/calendar"

export function fetchToday() {
  return Promise.resolve(getTodayData())
}

export function fetchMonthRituals(month, year) {
  return Promise.resolve(getMonthRituals(month, year))
}

export function fetchCalendar(month, year) {
  return Promise.resolve(generateMonthGrid(month - 1, year))
}
