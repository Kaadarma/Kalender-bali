function CalendarHeader() {
  return (
    <>
      <div className="hidden md:flex justify-between items-center w-full px-margin-desktop py-gutter">
        <div className="flex flex-col">
          <h1 className="font-date-display text-date-display text-primary">October 2024</h1>
          <p className="font-body-main text-on-surface-variant/70">A month for grounded growth and spiritual clarity.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-3 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="p-3 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <button className="ml-4 px-6 py-2 bg-surface border border-outline-variant rounded-full font-label-bold text-primary hover:bg-surface-container transition-colors">
            Today
          </button>
        </div>
      </div>

      <div className="md:hidden px-margin-mobile pt-unit pb-gutter">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-primary-container p-1">
            <img
              className="w-full h-full object-cover rounded-full"
              alt="Stitch portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDylNhaKt7wmfuO6H8pres7-sJQYa96kTCrS6Plaooi6Smn9Uj2ATli4yC2t-jAyA7UNPEznlzVKPpWWBaIyPoFqAd5RTSkuAYBK5kHV7IRWekJSD_DPWkM3Ty6_EKhu2ORVZqOLyMjMr_nevtxIrYtqYErW6w52bvisuXhHOrrakFdAJKa-SdeqysnDazfA7vxji1hbilzzTlkifTgYs-meEaf9hW9QvWWZiKEy8TnYmAFcpDDjAPZ"
            />
          </div>
          <div>
            <h2 className="font-date-display-mobile text-date-display-mobile text-primary">Oct 2024</h2>
            <p className="font-caption text-on-surface-variant">Wuku Sinta &bull; Wed, 23</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarHeader
