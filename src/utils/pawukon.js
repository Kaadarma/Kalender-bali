const WUKU_LIST = [
  "Sinta", "Landep", "Ukir", "Kulantir", "Taulu",
  "Gumbreg", "Wariga", "Warigadean", "Julungwangi", "Sungsang",
  "Dungulan", "Kuningan", "Langkir", "Medangsia", "Pujut",
  "Pahang", "Krulut", "Merakih", "Tambir", "Medangkungan",
  "Matal", "Uye", "Menail", "Prangbakat", "Bala",
  "Ugu", "Wayang", "Kelawu", "Dukut", "Watugunung"
]

const MS_PER_DAY = 86400000

function dateToDays(d) {
  return Math.floor(d.getTime() / MS_PER_DAY)
}

const ANCHOR_WUKU = { date: new Date(2023, 11, 18), wukuIndex: 0 }
const ANCHOR_GALUNGAN = { date: new Date(2024, 1, 28) }
const ANCHOR_KAJENG_KLIWON = { date: new Date(2026, 6, 12) }

function getWuku(date) {
  const diff = dateToDays(date) - dateToDays(ANCHOR_WUKU.date)
  let index = ((diff % 210) + 210) % 210
  index = Math.floor(index / 7)
  return { index, name: WUKU_LIST[index] }
}

function getGalunganDates(year) {
  const results = []
  const start = new Date(year, 0, 1)
  const end = new Date(year, 11, 31)
  let g = new Date(ANCHOR_GALUNGAN.date)

  while (g < start) {
    g = new Date(g.getTime() + 210 * MS_PER_DAY)
  }
  while (g <= end) {
    results.push({
      date: new Date(g),
      name: "Galungan",
      color: "secondary"
    })
    results.push({
      date: new Date(g.getTime() + 10 * MS_PER_DAY),
      name: "Kuningan",
      color: "tertiary"
    })
    g = new Date(g.getTime() + 210 * MS_PER_DAY)
  }
  return results
}

function getKajengKliwonDates(year) {
  const results = []
  const start = new Date(year, 0, 1)
  const end = new Date(year, 11, 31)
  const k = new Date(ANCHOR_KAJENG_KLIWON.date)

  while (k >= start) {
    k.setDate(k.getDate() - 15)
  }
  k.setDate(k.getDate() + 15)

  while (k <= end) {
    results.push({
      date: new Date(k),
      name: "Kajeng Kliwon",
      color: "outline",
      type: "kajeng"
    })
    k.setDate(k.getDate() + 15)
  }

  return results
}

function getPancawara(date) {
  const ANCHOR = { date: new Date(2026, 6, 8) }
  const diff = dateToDays(date) - dateToDays(ANCHOR.date)
  return ((diff % 5) + 5) % 5
}

function getBhataraSriDates(year) {
  const results = []
  const start = new Date(year, 0, 1)
  const end = new Date(year, 11, 31)
  const cur = new Date(start)

  while (cur <= end) {
    const wuku = getWuku(cur)
    if (cur.getDay() === 5 && getPancawara(cur) === 0 && wuku.index === 27) {
      results.push({
        date: new Date(cur),
        name: "Bhatara Sri",
        color: "tertiary",
        type: "bhataraSri"
      })
    }
    cur.setDate(cur.getDate() + 1)
  }

  return results
}

function toJulianDay(year, month, day, hour = 0) {
  let y = year
  let m = month
  if (m <= 2) { y--; m += 12 }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5 + hour / 24
}

function sunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * Math.PI / 180
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * M)
          + 0.000289 * Math.sin(3 * M)
  return ((L0 + C) % 360 + 360) % 360
}

function moonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525
  const Lp = 218.3165 + 481267.8813 * T
  const Mp = (134.9629 + 477198.8676 * T) * Math.PI / 180
  const D = (297.8502 + 445267.1114 * T) * Math.PI / 180
  const M = (357.52911 + 35999.05029 * T) * Math.PI / 180
  const F = (93.2720 + 483202.0175 * T) * Math.PI / 180

  const corr = 6.289 * Math.sin(Mp)
             + 1.274 * Math.sin(2 * D - Mp)
             + 0.658 * Math.sin(2 * D)
             + 0.214 * Math.sin(2 * Mp)
             - 0.186 * Math.sin(M)
             - 0.114 * Math.sin(2 * F)

  return ((Lp + corr) % 360 + 360) % 360
}

function getMoonSunAngle(jd) {
  const sunLon = sunLongitude(jd)
  const moonLon = moonLongitude(jd)
  return ((moonLon - sunLon) % 360 + 360) % 360
}

function getSunriseJD(date) {
  const prevDate = new Date(date)
  prevDate.setDate(prevDate.getDate() - 1)
  return toJulianDay(prevDate.getFullYear(), prevDate.getMonth() + 1, prevDate.getDate(), 22)
}

function getLunarPhases(year) {
  const results = []

  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year + 1, 0, 1)

  let prevDate = new Date(startDate)
  prevDate.setDate(prevDate.getDate() - 1)
  let prevAngle = getMoonSunAngle(getSunriseJD(prevDate))
  let prevTithi = Math.floor(prevAngle / 12)

  const cur = new Date(startDate)
  while (cur < endDate) {
    const angle = getMoonSunAngle(getSunriseJD(cur))
    const tithi = Math.floor(angle / 12)

    if (prevTithi < 14 && tithi >= 14) {
      results.push({ date: new Date(cur), name: "Purnama", color: "tertiary-fixed-dim", purnama: true })
    }
    if (prevTithi < 29 && tithi >= 29) {
      results.push({ date: new Date(cur), name: "Tilem", color: "primary-fixed-dim", tilem: true })
    }

    prevTithi = tithi
    prevAngle = angle
    cur.setDate(cur.getDate() + 1)
  }

  return results
}

function getSpecialDays(year) {
  return [
    ...getGalunganDates(year),
    ...getLunarPhases(year),
    ...getKajengKliwonDates(year),
    ...getBhataraSriDates(year)
  ]
}

export { WUKU_LIST, getWuku, getGalunganDates, getKajengKliwonDates, getLunarPhases, getBhataraSriDates, getSpecialDays }
