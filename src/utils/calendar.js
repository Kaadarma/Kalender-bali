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
        ...(special.purnama ? { purnama: true } : {}),
        ...(special.tilem ? { tilem: true } : {})
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

  const weeks = []
  for (let row = 0; row < 6; row++) {
    const i = row * 7
    let d, m, y
    if (i < startOffset) {
      d = prevMonthLast - (startOffset - i - 1)
      m = month - 1
      y = year
      if (m < 0) { m = 11; y-- }
    } else if (i < startOffset + totalDays) {
      d = i - startOffset + 1
      m = month
      y = year
    } else {
      d = i - (startOffset + totalDays) + 1
      m = month + 1
      y = year
      if (m > 11) { m = 0; y++ }
    }
    const wuku = getWuku(new Date(y, m, d))
    weeks.push({ wuku: wuku.name, index: wuku.index })
  }

  return { month, year, days, weeks }
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

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
  const upcoming = specialDays
    .filter(s => s.date >= now && s.date <= monthEnd)
    .slice(0, 5)
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

export function getMonthRituals(month, year) {
  const now = new Date()
  const specialDays = getSpecialDays(year)
  const monthStart = new Date(year, month, 1)
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59)
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()
  const start = isCurrentMonth ? now : monthStart

  return specialDays
    .filter(s => s.date >= start && s.date <= monthEnd)
    .slice(0, 5)
    .map(s => ({
      name: s.name,
      date: s.date.toISOString().split("T")[0],
      color: s.color
    }))
}
