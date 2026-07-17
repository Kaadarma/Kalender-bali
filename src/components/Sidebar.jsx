function Sidebar() {
  return (
    <aside className="fixed hidden md:flex h-full left-0 w-sidebar-width bg-primary-container flex-col py-margin-desktop space-y-gutter z-40">
      <div className="px-8 flex flex-col items-start gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white/50 border-4 border-white/30 p-1 natural-shadow">
          <img
            className="w-full h-full object-cover rounded-full"
            alt="Stitch in Balinese attire"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXkQLJ4vxX35jCaN7bANDGTV778pkDQZ_k8lrwjU9Y4FNc_NQdwNj7fohyAxZ2FCiLa4fm56nyI42Z2WTbCDUcmLb7iNeq_u_hYetfgoZjiCI00MDydfsO2uQRraM9_YydcaS-Q8yuz-c99E6k_91kQ-CsBTy4Bjybwb_3Li2tQolt319p3v5NHNVhkv-MOqC18Z0fWoZ0L76fotjTHyrmHLBnV3YqoSLu0vpLXF9e4RZ8xO_J4_SP"
          />
        </div>
        <div>
          <h2 className="font-date-display text-[24px] text-primary tracking-tight">Rhythm of Bali</h2>
          <p className="font-label-bold text-label-bold text-on-primary-container mt-1">Wednesday, Oct 23</p>
          <p className="font-caption text-caption text-primary/70 uppercase tracking-widest mt-1">Wuku Sinta</p>
        </div>
      </div>

      <nav className="flex-grow sidebar-scroll overflow-y-auto px-4">
        <div className="space-y-1">
          <a className="text-secondary font-bold flex items-center gap-4 px-6 py-3 bg-surface-bright/50 rounded-xl transition-all scale-[0.98]" href="#">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-label-bold">Monthly Schedule</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3 hover:bg-surface-bright/50 transition-colors rounded-xl" href="#">
            <span className="material-symbols-outlined">temple_hindu</span>
            <span className="font-label-bold">Holy Rituals</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3 hover:bg-surface-bright/50 transition-colors rounded-xl" href="#">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="font-label-bold">Wuku Calendar</span>
          </a>
          <a className="text-on-surface-variant flex items-center gap-4 px-6 py-3 hover:bg-surface-bright/50 transition-colors rounded-xl" href="#">
            <span className="material-symbols-outlined">paragliding</span>
            <span className="font-label-bold">Personal Rest</span>
          </a>
        </div>

        <div className="mt-gutter pt-gutter border-t border-primary/10">
          <h3 className="px-6 font-header-sm text-header-sm text-primary uppercase tracking-widest mb-4">Upcoming Rituals</h3>
          <div className="space-y-4 px-2">
            <div className="flex items-center gap-4 p-4 bg-white/40 rounded-2xl">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <div>
                <p className="font-label-bold text-on-surface">Galungan</p>
                <p className="font-caption text-on-surface-variant">In 4 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/40 rounded-2xl">
              <div className="w-2 h-8 bg-tertiary rounded-full" />
              <div>
                <p className="font-label-bold text-on-surface">Kuningan</p>
                <p className="font-caption text-on-surface-variant">In 14 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/40 rounded-2xl">
              <div className="w-2 h-8 bg-tertiary-fixed-dim rounded-full" />
              <div>
                <p className="font-label-bold text-on-surface">Purnama</p>
                <p className="font-caption text-on-surface-variant">Next Full Moon</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-8 pb-4">
        <button className="w-full bg-tertiary-container text-on-tertiary-container py-3 rounded-full font-label-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Plan Ceremony</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
