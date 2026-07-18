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

function daysToDate(days) {
  return new Date(days * MS_PER_DAY)
}

const ANCHOR_WUKU = { date: new Date(2024, 0, 1), wukuIndex: 0 }
const ANCHOR_GALUNGAN = { date: new Date(2024, 1, 28) }

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

function getLunarPhases(year) {
  const results = []
  const KNOWN_PURNAMA = new Date(2024, 0, 25)
  const LUNAR_CYCLE = 29.530587

  for (let month = 0; month < 12; month++) {
    const target = new Date(year, month, 15)
    const diffDays = (target - KNOWN_PURNAMA) / MS_PER_DAY
    const cycles = Math.round(diffDays / LUNAR_CYCLE)
    const purnama = new Date(KNOWN_PURNAMA.getTime() + Math.round(cycles * LUNAR_CYCLE * MS_PER_DAY))
    const tilem = new Date(purnama.getTime() + Math.round(LUNAR_CYCLE / 2 * MS_PER_DAY))

    if (purnama.getMonth() === month) {
      results.push({ date: purnama, name: "Purnama", color: "tertiary-fixed-dim", purnama: true })
    }
    if (tilem.getMonth() === month) {
      results.push({ date: tilem, name: "Tilem", color: "primary-fixed-dim" })
    }
  }
  return results
}

function getSpecialDays(year) {
  return [...getGalunganDates(year), ...getLunarPhases(year)]
}

export { WUKU_LIST, getWuku, getGalunganDates, getLunarPhases, getSpecialDays }
