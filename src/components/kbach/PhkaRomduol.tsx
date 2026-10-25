export interface PhkaRomduolProps {
  className?: string
  size?: number | string
  colorVariant?: "gold" | "crimson" | "cream"
}

export function PhkaRomduol({
  className = "",
  size = 28,
  colorVariant = "gold",
}: PhkaRomduolProps) {
  const primaryFill =
    colorVariant === "crimson"
      ? "url(#kbach-ruby-gem)"
      : colorVariant === "cream"
        ? "#FFF8E7"
        : "url(#kbach-gold-grad)"

  const secondaryFill =
    colorVariant === "crimson"
      ? "#781722"
      : colorVariant === "cream"
        ? "#F0E4CA"
        : "url(#kbach-gold-soft)"

  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      className={`phka-romduol-svg ${className}`}
      aria-hidden="true"
    >
      <g transform="translate(18,18)" filter="url(#kbach-emboss)">
        {/* 6 Sacred Romduol Petals with alternating shading */}
        {[0, 60, 120, 180, 240, 300].map((deg, idx) => (
          <path
            key={deg}
            d="M0 -2 C4.5 -9 7 -13 0 -16 C-7 -13 -4.5 -9 0 -2 Z"
            fill={idx % 2 === 0 ? primaryFill : secondaryFill}
            stroke="#684107"
            strokeWidth="0.5"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* Inner Blossom Core */}
        <circle
          cx="0"
          cy="0"
          r="4.2"
          fill="url(#kbach-gem-grad)"
          stroke="#422502"
          strokeWidth="0.8"
        />
        <circle cx="-1" cy="-1" r="1.5" fill="#FFFDF0" />
      </g>
    </svg>
  )
}
