export interface GuestPlaqueProps {
  guestName: string
  prefix?: string
  isDark?: boolean
  className?: string
}

export function GuestPlaque({
  guestName,
  prefix = "សូមគោរពអញ្ជើញភ្ញៀវកិត្តិយស",
  isDark = false,
  className = "",
}: GuestPlaqueProps) {
  return (
    <div
      className={`guest-name-plaque relative px-6 sm:px-8 py-3 rounded-full inline-flex flex-col items-center justify-center text-center transition-all duration-300 max-w-full sm:max-w-md mx-auto shadow-md backdrop-blur-md ${
        isDark
          ? "bg-[#FAF5EA]/95 border border-[#D4AF37] shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          : "bg-[#FFFFFF]/90 border border-[#D4AF37]/80 shadow-[0_4px_16px_rgba(197,150,50,0.18)]"
      } ${className}`}
    >
      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8C5A10] flex items-center gap-1.5">
        <span className="text-[#C5A059]">❖</span>
        {prefix}
        <span className="text-[#C5A059]">❖</span>
      </span>

      <strong className="font-['Moul'] text-sm sm:text-base md:text-lg text-[#4B0711] mt-1 leading-normal">
        {guestName}
      </strong>
    </div>
  )
}
