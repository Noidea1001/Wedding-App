export interface MonogramSealProps {
  leftLetter: string
  rightLetter: string
  className?: string
  size?: number | string
}

export function MonogramSeal({
  leftLetter,
  rightLetter,
  className = "",
  size = 96,
}: MonogramSealProps) {
  return (
    <div
      className={`cover-monogram-badge ${className}`}
      style={{ width: size, height: size }}
      aria-label={`ត្រាមង្គល ${leftLetter} និង ${rightLetter}`}
    >
      <svg
        viewBox="0 0 140 140"
        className="cover-seal-svg"
        aria-hidden="true"
      >
        {/* Outer Beaded Dotted Ring */}
        <circle
          cx="70"
          cy="70"
          r="64"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="2"
          strokeDasharray="5 3"
        />
        {/* Inner Plaque Disc */}
        <circle
          cx="70"
          cy="70"
          r="56"
          fill="rgba(48, 3, 8, 0.88)"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="2.5"
        />
        {/* 12 Radiant Golden Lotus Sun Rays */}
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d="M70 6 L74 16 L70 21 L66 16 Z"
            fill="url(#kbach-gold-grad)"
            transform={`rotate(${i * 30} 70 70)`}
          />
        ))}
      </svg>

      <div className="cover-monogram-letters">
        <span>{leftLetter}</span>
        <i>&</i>
        <span>{rightLetter}</span>
      </div>
    </div>
  )
}
