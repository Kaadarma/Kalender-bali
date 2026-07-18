const colorMap = {
  secondary: "#a43a3d",
  tertiary: "#735c00",
  "tertiary-fixed-dim": "#e7c353",
  "primary-fixed-dim": "#666"
}

const iconMap = {
  Purnama: "brightness_4",
  Tilem: "dark_mode",
  Galungan: "temple_hindu",
  Kuningan: "celebration"
}

export default function BentoCards({ today, monthRituals }) {
  const rituals = monthRituals ?? today?.upcomingRituals ?? []

  if (rituals.length === 0) return null

  function daysAway(dateStr) {
    const diff = new Date(dateStr) - new Date()
    return Math.ceil(diff / 86400000)
  }

  return (
    <div className="hidden md:grid grid-cols-3 gap-4 px-margin-desktop pb-margin-desktop">
      {rituals.slice(0, 3).map((r, i) => (
        <div key={i} className="bg-white rounded-3xl p-5 natural-shadow flex flex-col justify-between min-h-[130px]">
          <span className="material-symbols-outlined text-[24px]" style={{ color: colorMap[r.color] || "#666" }}>
            {iconMap[r.name] || "event"}
          </span>
          <div>
            <p className="font-display text-[32px] font-bold leading-none" style={{ color: colorMap[r.color] || "#666" }}>
              {daysAway(r.date)}
              <span className="text-base font-label-bold text-on-surface-variant ml-1">hari lagi</span>
            </p>
            <p className="font-caption text-caption text-on-surface-variant mt-1">{r.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
