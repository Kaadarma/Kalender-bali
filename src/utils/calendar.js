import { getWuku, getSpecialDays } from "./pawukon"

export function generateMonthGrid(month, year) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const prevMonthLast = new Date(year, month, 0).getDate()
  const specialDays = getSpecialDays(year)

  const days = []

  for (let i = startOffset - 1; i >= 0; i--) {
    const d = prevMonthLast - i
    days.push({ day: d, offset: true })
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day)
    const special = specialDays.find(s =>
      s.date.getFullYear() === year &&
      s.date.getMonth() === month &&
      s.date.getDate() === day
    )
    const isToday =
      date.getFullYear() === new Date().getFullYear() &&
      date.getMonth() === new Date().getMonth() &&
      date.getDate() === new Date().getDate()

    if (special) {
      days.push({
        day,
        highlight: special.name,
        color: special.color,
        ...(special.purnama ? { purnama: true } : {})
      })
    } else if (isToday) {
      days.push({ day, today: true })
    } else {
      days.push({ day })
    }
  }

  const remaining = 42 - days.length
  for (let day = 1; day <= remaining; day++) {
    days.push({ day, offset: true })
  }

  return { month, year, days }
}

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const monthShort = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

export function getTodayData() {
  const now = new Date()
  const wuku = getWuku(now)

  const specialDays = getSpecialDays(now.getFullYear())
  const todaySpecial = specialDays.find(s =>
    s.date.getFullYear() === now.getFullYear() &&
    s.date.getMonth() === now.getMonth() &&
    s.date.getDate() === now.getDate()
  )

  const upcoming = specialDays
    .filter(s => s.date >= now)
    .slice(0, 3)
    .map(s => ({
      name: s.name,
      date: s.date.toISOString().split("T")[0],
      color: s.color
    }))

  return {
    date: now.toISOString().split("T")[0],
    dayName: dayNames[now.getDay()],
    dayShort: dayNames[now.getDay()].slice(0, 3),
    month: months[now.getMonth()],
    monthShort: monthShort[now.getMonth()],
    monthNum: now.getMonth(),
    year: now.getFullYear(),
    day: now.getDate(),
    wuku: wuku.name,
    wukuIndex: wuku.index,
    isSpecial: !!todaySpecial,
    specialToday: todaySpecial ? { name: todaySpecial.name, color: todaySpecial.color } : null,
    upcomingRituals: upcoming
  }
}
