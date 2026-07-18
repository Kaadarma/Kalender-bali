import { getWuku, getSpecialDays } from "./pawukon.js"

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

export function getTodayData() {
  const now = new Date()
  const wuku = getWuku(now)
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

  const day = now.getDate()
  const suffix = day >= 11 && day <= 13 ? "th" : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][day % 10]

  const WUKU_REFLECTIONS = {
    "Sinta": "Wuku Sinta is the first week of the Pawukon cycle. Focus on new beginnings and internal cleansing. It's an auspicious day for meditation and setting intentions for the upcoming ritual cycle.",
    "Landep": "Wuku Landep brings a sharpness of mind. A good day for intellectual work and making important decisions.",
    "Ukir": "Wuku Ukir is a time for creativity and carving out your path. Artistic expression flows freely.",
    "Kuningan": "Kuningan marks ancestral blessings and spiritual completion. A day to honor those who came before us.",
    "Dungulan": "Dungulan is the wuku of Galungan. Victory of dharma over adharma. Celebrate with offerings and prayer.",
    "Purnama": "Purnama is the full moon — a time of abundance, ceremony, and gratitude. Ideal for large temple prayers.",
    "Tilem": "Tilem is the new moon — a time for introspection, rest, and internal cleansing."
  }

  return {
    date: now.toISOString().split("T")[0],
    dayName: dayNames[now.getDay()],
    dayShort: dayShort[now.getDay()],
    month: months[now.getMonth()],
    monthShort: monthShort[now.getMonth()],
    monthNum: now.getMonth(),
    year: now.getFullYear(),
    day: now.getDate(),
    daySuffix: suffix,
    wuku: wuku.name,
    wukuIndex: wuku.index,
    isSpecial: !!todaySpecial,
    specialToday: todaySpecial ? { name: todaySpecial.name, color: todaySpecial.color } : null,
    upcomingRituals: upcoming,
    reflection: WUKU_REFLECTIONS[wuku.name] || "A balanced day for rest and mindful living according to Balinese traditions."
  }
}
