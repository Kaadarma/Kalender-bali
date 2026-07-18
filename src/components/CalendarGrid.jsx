const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]

function CalendarCell({ day, offset, highlight, color, purnama, today, isSunday }) {
  const sundayClass = isSunday ? "text-red-500" : ""
  const sundayClassDim = isSunday ? "text-red-300" : ""

  if (offset) {
    return (
      <div className="p-3 md:p-3 border-r border-b border-surface-variant/30 flex items-start justify-center opacity-20">
        <span className={`font-label-bold text-sm md:text-sm ${sundayClassDim}`}>{day}</span>
      </div>
    )
  }

  if (purnama) {
    return (
      <div className="p-3 md:p-3 border-r border-b border-surface-variant/30 relative flex flex-col items-center">
        <div className="absolute inset-0 m-1 md:m-1.5 rounded-full border-2 border-tertiary-fixed purnama-glow flex flex-col items-center justify-center bg-white">
          <span className={`font-label-bold text-sm md:text-sm text-primary ${sundayClass}`}>{day}</span>
        </div>
      </div>
    )
  }

  if (highlight) {
    const bgClass = color === "secondary" ? "bg-secondary-fixed/50" : "bg-tertiary-container/40"
    const textClass = color === "secondary" ? "text-secondary" : "text-tertiary"
    const labelClass = color === "secondary" ? "text-secondary" : "text-on-tertiary-container"
    return (
      <div className="p-3 md:p-3 border-r border-b border-surface-variant/30 relative flex flex-col items-center">
        <div className={`absolute inset-0 m-1 md:m-1.5 rounded-2xl ${bgClass} flex flex-col items-center justify-center`}>
          <span className={`font-label-bold text-sm md:text-sm ${textClass} ${sundayClass}`}>{day}</span>
          <span className={`hidden md:block font-caption text-[9px] ${labelClass} mt-0.5`}>{highlight}</span>
        </div>
      </div>
    )
  }

  if (today) {
    return (
      <div className="p-3 md:p-3 border-r border-b border-surface-variant/30 relative flex flex-col items-center">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center">
          <span className="font-label-bold text-sm md:text-sm text-white">{day}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-cell p-3 md:p-3 border-r border-b border-surface-variant/30 relative flex flex-col items-center group cursor-pointer">
      <span className={`font-label-bold text-sm md:text-sm group-hover:scale-110 transition-transform ${sundayClass || "text-primary"}`}>{day}</span>
    </div>
  )
}

export default function CalendarGrid({ calendar }) {
  const days = calendar?.days ?? []

  return (
    <div className="px-margin-mobile md:px-margin-desktop pb-margin-desktop">
      <div className="bg-white rounded-[32px] natural-shadow overflow-hidden">
        <div className="calendar-grid border-b border-surface-variant">
          {dayNames.map((name) => (
            <div key={name} className="py-3 md:py-3 text-center font-label-bold text-on-surface-variant/40 text-[11px] md:text-[11px] uppercase tracking-widest">
              {name}
            </div>
          ))}
        </div>
        <div className="calendar-grid md:grid-rows-5 min-h-[400px] md:min-h-[500px]">
          {days.map((d, i) => (
            <CalendarCell key={i} day={d.day} offset={d.offset} highlight={d.highlight} color={d.color} purnama={d.purnama} today={d.today} isSunday={i % 7 === 0} />
          ))}
        </div>
      </div>
    </div>
  )
}
