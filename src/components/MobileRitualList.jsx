const colorMap = {
  secondary: "#a43a3d",
  tertiary: "#735c00",
  "tertiary-fixed-dim": "#e7c353"
}

export default function MobileRitualList({ today, monthRituals }) {
  const rituals = monthRituals ?? today?.upcomingRituals ?? []

  if (rituals.length === 0) return null

  function daysAway(dateStr) {
    const diff = new Date(dateStr) - new Date()
    return Math.ceil(diff / 86400000)
  }

  return (
    <div className="md:hidden px-margin-mobile pb-margin-desktop space-y-3">
      <h3 className="font-header-sm text-header-sm text-primary uppercase tracking-widest">Upacara Mendatang</h3>
      {rituals.slice(0, 3).map((r, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl natural-shadow">
          <div className="w-2 h-10 rounded-full" style={{ backgroundColor: colorMap[r.color] || "#666" }} />
          <div className="flex-1">
            <p className="font-label-bold text-on-surface">{r.name}</p>
            <p className="font-caption text-on-surface-variant">{daysAway(r.date)} hari lagi &middot; {r.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
