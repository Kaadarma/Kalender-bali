const BASE = "/api"

export async function fetchToday() {
  const res = await fetch(`${BASE}/today`)
  if (!res.ok) throw new Error("Failed to fetch today")
  return res.json()
}

export async function fetchCalendar(month, year) {
  const res = await fetch(`${BASE}/calendar?month=${month}&year=${year}`)
  if (!res.ok) throw new Error("Failed to fetch calendar")
  return res.json()
}
