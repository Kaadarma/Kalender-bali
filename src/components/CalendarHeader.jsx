const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
const monthShort = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

const yearRange = Array.from({ length: 101 }, (_, i) => 2000 + i)

function CalendarHeader({ onToggleSidebar, sidebarOpen, month, year, onPrevMonth, onNextMonth, onToday, onYearChange, darkMode, onToggleDarkMode }) {
  const now = new Date()
  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear()

  const wuku = ""

  return (
    <>
      <div className="hidden md:flex justify-between items-center w-full px-margin-desktop py-gutter">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-primary">
              {sidebarOpen ? "menu_open" : "menu"}
            </span>
          </button>
          <div className="flex flex-col">
            <h1 className="font-date-display text-date-display text-primary">
              {months[month]}{' '}
              <select
                value={year}
                onChange={e => onYearChange(Number(e.target.value))}
                className="bg-transparent font-date-display text-date-display text-primary outline-none cursor-pointer hover:underline"
              >
                {yearRange.map(y => (
                  <option key={y} value={y} className="text-base">{y}</option>
                ))}
              </select>
            </h1>
            <p className="font-body-main text-on-surface-variant/70">{isCurrentMonth ? "Bulan ini" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onPrevMonth} className="p-3 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button onClick={onNextMonth} className="p-3 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <button onClick={onToday} className="px-6 py-2 bg-surface border border-outline-variant rounded-full font-label-bold text-primary hover:bg-surface-container transition-colors">
            Hari Ini
          </button>
          <button
            onClick={onToggleDarkMode}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
              darkMode ? 'bg-primary' : 'bg-surface-variant'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              <span className="material-symbols-outlined text-[12px] text-primary">
                {darkMode ? 'dark_mode' : 'light_mode'}
              </span>
            </span>
          </button>
        </div>
      </div>

      <div className="md:hidden px-margin-mobile pt-unit pb-gutter">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-primary-container p-1">
              <img
                className="w-full h-full object-cover rounded-full"
                alt="Kalabali logo"
                src="/logo.png"
              />
            </div>
            <div>
              <h2 className="font-date-display-mobile text-date-display-mobile text-primary">
                {monthShort[month]}{' '}
                <select
                  value={year}
                  onChange={e => onYearChange(Number(e.target.value))}
                  className="bg-transparent font-date-display-mobile text-date-display-mobile text-primary outline-none cursor-pointer"
                >
                  {yearRange.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </h2>
              <p className="font-caption text-on-surface-variant">{wuku}</p>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
              darkMode ? 'bg-primary' : 'bg-surface-variant'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              <span className="material-symbols-outlined text-[12px] text-primary">
                {darkMode ? 'dark_mode' : 'light_mode'}
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default CalendarHeader
