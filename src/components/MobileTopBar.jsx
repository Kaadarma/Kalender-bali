function MobileTopBar({ onToggleMenu }) {
  return (
    <header className="md:hidden flex justify-between items-center w-full px-margin-mobile py-unit bg-surface sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button onClick={onToggleMenu} className="p-1 rounded-full hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-primary">menu</span>
        </button>
        <h1 className="font-header-sm text-header-sm font-bold text-primary">Kalabali</h1>
      </div>
      <span className="material-symbols-outlined text-primary">account_circle</span>
    </header>
  )
}

export default MobileTopBar
