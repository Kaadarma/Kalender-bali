export default function MobileRitualList() {
  return (
    <div className="md:hidden px-margin-mobile mt-8">
      <h3 className="font-header-sm text-header-sm text-primary uppercase tracking-widest mb-4">Rituals This Month</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-secondary-fixed/30 rounded-2xl flex justify-between items-center">
          <div>
            <p className="font-label-bold text-on-surface">Galungan</p>
            <p className="font-caption text-on-surface-variant">Oct 13 &bull; Victory of Dharma</p>
          </div>
          <span className="material-symbols-outlined text-secondary">festival</span>
        </div>
        <div className="p-4 bg-tertiary-container/30 rounded-2xl flex justify-between items-center">
          <div>
            <p className="font-label-bold text-on-surface">Kuningan</p>
            <p className="font-caption text-on-surface-variant">Oct 4 &bull; Ancestral Blessing</p>
          </div>
          <span className="material-symbols-outlined text-tertiary">temple_hindu</span>
        </div>
        <div className="p-4 bg-primary-container rounded-2xl flex justify-between items-center">
          <div>
            <p className="font-label-bold text-on-surface">Purnama</p>
            <p className="font-caption text-on-surface-variant">Oct 17 &bull; Full Moon Prayer</p>
          </div>
          <span className="material-symbols-outlined text-primary">brightness_high</span>
        </div>
      </div>
    </div>
  )
}
