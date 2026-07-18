export default function MobileRitualList({ today }) {
  const rituals = today?.upcomingRituals ?? []

  if (rituals.length === 0) return null

  return (
    <div className="md:hidden px-margin-mobile mt-8">
      <h3 className="font-header-sm text-header-sm text-primary uppercase tracking-widest mb-4">Rituals This Month</h3>
      <div className="grid grid-cols-1 gap-4">
        {rituals.map((r, i) => (
          <div key={i} className="p-4 bg-secondary-fixed/30 rounded-2xl flex justify-between items-center">
            <div>
              <p className="font-label-bold text-on-surface">{r.name}</p>
              <p className="font-caption text-on-surface-variant">{r.daysAway === 0 ? "Today" : `In ${r.daysAway} Days`}</p>
            </div>
            <span className="material-symbols-outlined text-secondary">festival</span>
          </div>
        ))}
      </div>
    </div>
  )
}
