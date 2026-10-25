import { PhkaRomduol } from "./PhkaRomduol"

export interface GoldDividerProps {
  className?: string
  light?: boolean
}

export function GoldDivider({ className = "", light = false }: GoldDividerProps) {
  return (
    <div
      className={`flourish ${light ? "flourish-light" : ""} ${className}`}
      aria-hidden="true"
    >
      <span />
      <PhkaRomduol size={22} className="flourish-romduol-icon" />
      <span />
    </div>
  )
}
