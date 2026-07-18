export default function BentoCards({ today }) {
  const reflection = today?.reflection ?? ""
  const wuku = today?.wuku ?? ""

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-gutter grid grid-cols-1 md:grid-cols-3 gap-gutter">
      <div className="md:col-span-2 bg-surface-container-low p-8 rounded-[32px] natural-shadow flex flex-col justify-between overflow-hidden relative group">
        <div className="relative z-10">
          <h4 className="font-date-display text-[24px] text-primary mb-2">Today's Reflection</h4>
          <p className="font-body-main text-on-surface-variant max-w-md">{reflection}</p>
        </div>
        <div className="mt-8 flex gap-4 relative z-10">
          <button className="px-6 py-3 bg-primary text-white rounded-full font-label-bold hover:scale-105 transition-transform">
            Read Script
          </button>
          <button className="px-6 py-3 bg-white border border-outline-variant rounded-full font-label-bold text-primary hover:bg-surface-variant transition-colors">
            Listen Audio
          </button>
        </div>
        <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[200px] text-primary/5 select-none pointer-events-none group-hover:rotate-12 transition-transform duration-700">
          spa
        </span>
      </div>

      <div className="bg-primary text-white p-8 rounded-[32px] natural-shadow flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-[48px] mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
          bedtime
        </span>
        <h4 className="font-label-bold text-[18px]">Ritual Rest</h4>
        <p className="font-caption mt-2 opacity-80">Next period of silence begins at dusk tomorrow.</p>
        <div className="mt-6 w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="w-[65%] h-full bg-tertiary-fixed-dim" />
        </div>
      </div>
    </section>
  )
}
