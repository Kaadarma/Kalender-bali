const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const days = [
  { day: 29, offset: true },
  { day: 30, offset: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4, highlight: "Kuningan", color: "tertiary" },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13, highlight: "Galungan", color: "secondary" },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17, purnama: true },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23, today: true },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
  { day: 1, offset: true },
  { day: 2, offset: true },
]

function CalendarCell({ day, offset, highlight, color, purnama, today }) {
  if (offset) {
    return (
      <div className="p-3 md:p-4 border-r border-b border-surface-variant/30 flex items-start justify-center opacity-20">
        <span className="font-label-bold text-sm md:text-base">{day}</span>
      </div>
    )
  }

  if (purnama) {
    return (
      <div className="p-3 md:p-4 border-r border-b border-surface-variant/30 relative flex flex-col items-center">
        <div className="absolute inset-0 m-1 md:m-2 rounded-full border-2 border-tertiary-fixed purnama-glow flex flex-col items-center justify-center bg-white">
          <span className="font-label-bold text-primary text-sm md:text-base">{day}</span>
        </div>
      </div>
    )
  }

  if (highlight) {
    const bgClass = color === "secondary" ? "bg-secondary-fixed/50" : "bg-tertiary-container/40"
    const textClass = color === "secondary" ? "text-secondary" : "text-tertiary"
    const labelClass = color === "secondary" ? "text-secondary" : "text-on-tertiary-container"
    return (
      <div className="p-3 md:p-4 border-r border-b border-surface-variant/30 relative flex flex-col items-center">
        <div className={`absolute inset-0 m-1 md:m-2 rounded-2xl ${bgClass} flex flex-col items-center justify-center`}>
          <span className={`font-label-bold text-sm md:text-base ${textClass}`}>{day}</span>
          <span className={`hidden md:block font-caption text-[10px] ${labelClass} mt-1`}>{highlight}</span>
        </div>
      </div>
    )
  }

  if (today) {
    return (
      <div className="p-3 md:p-4 border-r border-b border-surface-variant/30 relative flex flex-col items-center">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="font-label-bold text-sm md:text-base text-white">{day}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-cell p-3 md:p-4 border-r border-b border-surface-variant/30 relative flex flex-col items-center group cursor-pointer">
      <span className="font-label-bold text-primary text-sm md:text-base group-hover:scale-110 transition-transform">{day}</span>
    </div>
  )
}

export default function CalendarGrid() {
  return (
    <div className="px-margin-mobile md:px-margin-desktop pb-margin-desktop">
      <div className="bg-white rounded-[32px] natural-shadow overflow-hidden">
        <div className="calendar-grid border-b border-surface-variant">
          {dayNames.map((name) => (
            <div key={name} className="py-3 md:py-4 text-center font-label-bold text-on-surface-variant/40 text-[11px] md:text-[12px] uppercase tracking-widest">
              {name}
            </div>
          ))}
        </div>
        <div className="calendar-grid md:grid-rows-5 min-h-[400px] md:min-h-[650px]">
          {days.map((d, i) => (
            <CalendarCell key={i} {...d} />
          ))}
        </div>
      </div>
    </div>
  )
}
