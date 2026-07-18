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
    const specials = specialDays.filter(s =>
      s.date.getFullYear() === year &&
      s.date.getMonth() === month &&
      s.date.getDate() === day
    )
    const isToday =
      date.getFullYear() === new Date().getFullYear() &&
      date.getMonth() === new Date().getMonth() &&
      date.getDate() === new Date().getDate()

    if (specials.length > 0) {
      const primary = specials[0]
      const lines = []
      specials.forEach(s => {
        if (s.type === "kajeng") lines.push("kajeng")
        if (s.type === "bhataraSri") lines.push("bhataraSri")
      })

      days.push({
        day,
        highlight: primary.name,
        color: primary.color,
        ...(specials.some(s => s.purnama) ? { purnama: true } : {}),
        ...(specials.some(s => s.tilem) ? { tilem: true } : {}),
        ...(lines.length ? { lines } : {})
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

function localDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
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
      date: localDateStr(s.date),
      color: s.color
    }))

  return {
    date: localDateStr(now),
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
  const viewStart = new Date(year, month, 1)
  const thisYear = getSpecialDays(year)
  const nextYear = getSpecialDays(year + 1)
  const allDays = [...thisYear, ...nextYear]

  return allDays
    .filter(s => {
      const cutoff = viewStart > now ? viewStart : now
      return s.date >= cutoff
    })
    .sort((a, b) => a.date - b.date)
    .slice(0, 5)
    .map(s => ({
      name: s.name,
      date: localDateStr(s.date),
      color: s.color
    }))
}
