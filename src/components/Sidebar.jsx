const colorMap = {
  secondary: "#a43a3d",
  tertiary: "#735c00",
  "tertiary-fixed-dim": "#e7c353"
}

function Sidebar({ open, onClose, today, monthRituals }) {
  const dayName = today?.dayName ?? "Rabu"
  const monthShort = today?.monthShort ?? "Okt"
  const day = today?.day ?? "23"
  const wuku = today?.wuku ?? "Sinta"
  const rituals = monthRituals ?? today?.upcomingRituals ?? []

  function daysAway(dateStr) {
    const diff = new Date(dateStr) - new Date()
    return Math.ceil(diff / 86400000)
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    const names = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    return `${d.getDate()} ${names[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-50 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-sidebar-width bg-primary-container flex flex-col z-50 transition-transform duration-300 overflow-y-auto sidebar-scroll ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-center w-full">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white/70 natural-shadow mb-4">
                <img
                  className="w-full h-full object-cover"
                  alt="Kalabali logo"
                  src="/logo.png"
                />
              </div>
              <h2 className="font-date-display text-[24px] text-primary tracking-tight leading-tight text-center">Kalabali</h2>
              <p className="font-caption text-caption text-primary/60 uppercase tracking-widest mt-2 text-center">{dayName}, {monthShort} {day}</p>
              <p className="font-caption text-caption text-primary/50 uppercase tracking-widest mt-0.5 text-center">{wuku}</p>
            </div>
            <button onClick={onClose} className="md:hidden p-1.5 rounded-full hover:bg-primary/10 transition-colors flex-shrink-0">
              <span className="material-symbols-outlined text-primary">close</span>
            </button>
          </div>
        </div>

        <nav className="px-4 mt-6">
          <div className="space-y-1">
            <a className="text-secondary font-bold flex items-center gap-4 px-6 py-3 bg-surface-bright/50 rounded-xl transition-all scale-[0.98]" href="#">
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="font-label-bold">Jadwal Bulanan</span>
            </a>
            <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3 hover:bg-surface-bright/50 transition-colors rounded-xl" href="#">
              <span className="material-symbols-outlined">temple_hindu</span>
              <span className="font-label-bold">Upacara Suci</span>
            </a>
          </div>
        </nav>

        <div className="flex flex-col flex-1 px-6 mt-10">
          <div>
            <h3 className="px-2 font-header-sm text-header-sm text-primary uppercase tracking-widest mb-4">Upacara Mendatang</h3>
            <div className="space-y-3">
              {rituals.slice(0, 3).map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: colorMap[r.color] || "#666" }} />
                  <div>
                    <p className="font-label-bold text-on-surface">{r.name}</p>
                    <p className="font-caption text-on-surface-variant">{daysAway(r.date)} hari lagi &middot; {formatDate(r.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto pb-4 pt-8">
            <button className="w-full bg-tertiary-container text-on-tertiary-container py-3 rounded-full font-label-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Rencanakan Upacara</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
