import { useState } from "react"
import { getWuku } from "../utils/pawukon"

const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

function CalendarCell({ day, offset, highlight, color, purnama, tilem, today, isSunday, onClick }) {
  const sundayClass = isSunday ? "text-red-500" : "text-primary"
  const sundayClassDim = isSunday ? "text-red-300" : ""
  const base = "p-3 border-r border-b border-surface-variant/30 relative flex flex-col items-center"

  if (offset) {
    return (
      <div className={`${base} opacity-20`}>
        <span className={`font-label-bold text-sm ${sundayClassDim}`}>{day}</span>
      </div>
    )
  }

  let content = (
    <span className={`font-label-bold text-sm ${sundayClass}`}>{day}</span>
  )

  if (today) {
    content = (
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
        <span className="font-label-bold text-sm text-white">{day}</span>
      </div>
    )
  }

  if (highlight) {
    const bgClass = color === "secondary" ? "bg-secondary-fixed/50" : "bg-tertiary-container/40"
    const textClass = color === "secondary" ? "text-secondary" : "text-tertiary"
    content = (
      <div className={`absolute inset-0 m-1 rounded-2xl ${bgClass} flex flex-col items-center justify-center`}>
        <span className={`font-label-bold text-sm ${textClass} ${sundayClass}`}>{day}</span>
        <span className="hidden md:block font-caption text-[9px] mt-0.5 text-on-tertiary-container">{highlight}</span>
      </div>
    )
  }

  return (
    <button onClick={onClick} className={`${base} cursor-pointer hover:bg-surface-container/30 transition-colors`}>
      {content}
      {purnama && <div className="absolute top-1/4 right-1/4 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-red-500" />}
      {tilem && <div className="absolute top-1/4 right-1/4 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-gray-900 dark:bg-gray-300" />}
    </button>
  )
}

export default function CalendarGrid({ calendar }) {
  const days = calendar?.days ?? []
  const month = calendar?.month ?? 0
  const year = calendar?.year ?? 2026

  const [selected, setSelected] = useState(null)

  const now = new Date()
  const wuku = getWuku(now)

  function handleCellClick(d, i) {
    const startOffset = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()
    const prevMonthLast = new Date(year, month, 0).getDate()

    let date
    if (i < startOffset) {
      date = new Date(year, month - 1, prevMonthLast - (startOffset - i - 1))
    } else if (i < startOffset + totalDays) {
      date = new Date(year, month, i - startOffset + 1)
    } else {
      date = new Date(year, month + 1, i - (startOffset + totalDays) + 1)
    }
    const w = getWuku(date)
    setSelected({ date, wuku: w.name, index: w.index })
  }

  return (
    <div className="px-margin-mobile md:px-margin-desktop pb-margin-desktop">
      <div className="bg-white rounded-[32px] natural-shadow overflow-hidden">
        <div className="px-4 md:px-6 pt-3 md:pt-4 pb-1 md:pb-1 border-b border-surface-variant/30 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary/60">auto_awesome</span>
          <span className="font-caption text-[11px] text-on-surface-variant/70 uppercase tracking-wider">
            {now.getDate()} {monthNames[now.getMonth()]} {now.getFullYear()} &middot; Wuku <strong className="text-primary font-label-bold">{wuku.name}</strong>
          </span>
        </div>

        {selected && (
          <div className="mx-4 md:mx-6 mt-2 mb-1 px-4 py-2 bg-primary-container rounded-xl flex items-center justify-between">
            <div>
              <span className="font-label-bold text-sm text-primary">
                {selected.date.getDate()} {monthNames[selected.date.getMonth()]} {selected.date.getFullYear()}
              </span>
              <span className="font-caption text-xs text-on-surface-variant ml-3">
                Wuku {selected.wuku} &middot; minggu ke-{selected.index + 1} dari 30
              </span>
            </div>
            <button onClick={() => setSelected(null)} className="text-primary/50 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        <div className="calendar-grid border-b border-surface-variant">
          {dayNames.map((name) => (
            <div key={name} className="py-3 text-center font-label-bold text-on-surface-variant text-[11px] uppercase tracking-widest">
              {name}
            </div>
          ))}
        </div>
        <div className="calendar-grid min-h-[400px]">
          {days.map((d, i) => (
            <CalendarCell key={i} day={d.day} offset={d.offset} highlight={d.highlight} color={d.color} purnama={d.purnama} tilem={d.tilem} today={d.today} isSunday={i % 7 === 0} onClick={() => handleCellClick(d, i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
