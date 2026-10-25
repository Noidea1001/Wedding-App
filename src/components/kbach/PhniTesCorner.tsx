export interface PhniTesCornerProps {
  position: "tl" | "tr" | "bl" | "br"
  className?: string
  size?: number | string
}

export function PhniTesCorner({
  position,
  className = "",
  size,
}: PhniTesCornerProps) {
  const transforms: Record<typeof position, string> = {
    tl: "",
    tr: "scale(-1, 1)",
    bl: "scale(1, -1)",
    br: "scale(-1, -1)",
  }

  return (
    <svg
      viewBox="0 0 220 220"
      className={`kbach-corner kbach-corner-${position} ${className}`}
      style={{
        transform: transforms[position],
        ...(size ? { width: size, height: size } : {}),
      }}
      aria-hidden="true"
    >
      <g filter="url(#kbach-emboss)">
        <path
          d="M8 210 V28 Q8 8 28 8 H210"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="2.4"
        />
        <path
          d="M16 185 V36 Q16 16 36 16 H185"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.85"
        />

        {/* Corner Lotus Medallion Rosette */}
        <g transform="translate(34, 34)">
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d="M0 -4 C7 -16 13 -24 0 -32 C-13 -24 -7 -16 0 -4 Z"
              fill="url(#kbach-gold-grad)"
              stroke="#684107"
              strokeWidth="0.6"
              transform={`rotate(${i * 45})`}
            />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={`inner-${i}`}
              d="M0 -3 C4 -10 8 -15 0 -21 C-8 -15 -4 -10 0 -3 Z"
              fill="url(#kbach-gold-soft)"
              transform={`rotate(${i * 45 + 22.5})`}
            />
          ))}
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="url(#kbach-gem-grad)"
            stroke="#5A3604"
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="3.5" fill="#FFF8D9" />
        </g>

        {/* Horizontal Acanthus & Kbach Phni Tes Scrollwork */}
        <path
          d="M64 26 C88 8, 118 12, 132 28 C142 40, 124 54, 112 43 C103 35, 114 23, 123 29"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M68 28 C84 18, 108 18, 122 32 C110 26, 92 28, 76 38 Z"
          fill="url(#kbach-gold-grad)"
        />
        <path
          d="M126 22 C148 8, 174 12, 188 24 C196 31, 184 42, 175 34 C169 29, 175 21, 182 25"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M138 24 C154 15, 170 17, 182 26 C168 24, 152 27, 142 35 Z"
          fill="url(#kbach-gold-soft)"
        />
        <path
          d="M188 18 C198 12, 208 14, 214 8 C208 20, 198 24, 188 24 Z"
          fill="url(#kbach-gold-grad)"
        />

        <g transform="translate(96, 42) scale(0.5)">
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d="M0 -2 C5 -12 9 -16 0 -22 C-9 -16 -5 -12 0 -2 Z"
              fill="url(#kbach-gold-grad)"
              transform={`rotate(${i * 60})`}
            />
          ))}
          <circle cx="0" cy="0" r="5" fill="#FFF5C0" />
        </g>

        {/* Vertical Acanthus & Kbach Phni Tes Scrollwork */}
        <path
          d="M26 64 C8 88, 12 118, 28 132 C40 142, 54 124, 43 112 C35 103, 23 114, 29 123"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M28 68 C18 84, 18 108, 32 122 C26 110, 28 92, 38 76 Z"
          fill="url(#kbach-gold-grad)"
        />
        <path
          d="M22 126 C8 148, 12 174, 24 188 C31 196, 42 184, 34 175 C29 169, 21 175, 25 182"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M24 138 C15 154, 17 170, 26 182 C24 168, 27 152, 35 142 Z"
          fill="url(#kbach-gold-soft)"
        />
        <path
          d="M18 188 C12 198, 14 208, 8 214 C20 208, 24 198, 24 188 Z"
          fill="url(#kbach-gold-grad)"
        />

        <g transform="translate(42, 96) scale(0.5)">
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d="M0 -2 C5 -12 9 -16 0 -22 C-9 -16 -5 -12 0 -2 Z"
              fill="url(#kbach-gold-grad)"
              transform={`rotate(${i * 60})`}
            />
          ))}
          <circle cx="0" cy="0" r="5" fill="#FFF5C0" />
        </g>

        <path
          d="M54 54 C74 62, 82 74, 72 88 C65 98, 52 90, 58 80 C62 72, 72 76, 70 83"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M54 54 L78 78"
          stroke="url(#kbach-gold-soft)"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <circle cx="84" cy="84" r="3" fill="url(#kbach-gem-grad)" />
      </g>
    </svg>
  )
}
