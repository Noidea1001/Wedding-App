export interface CeremonyIconProps {
  type: string
  className?: string
}

export function CeremonyIcon({ type, className = "" }: CeremonyIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="40"
      height="40"
      className={`ceremony-svg-icon ceremony-relief-art ${className}`}
      aria-hidden="true"
    >
      <g filter="url(#kbach-emboss)">
        {/* Outer Chased Gold Lotus Medallion Frame */}
        <circle
          cx="32"
          cy="32"
          r="29"
          fill="rgba(36, 2, 7, 0.88)"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="2"
        />
        <circle
          cx="32"
          cy="32"
          r="25"
          fill="none"
          stroke="url(#kbach-gold-soft)"
          strokeWidth="0.9"
          strokeDasharray="3 2"
        />
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d="M32 2.5 L34.5 7.5 L32 6 L29.5 7.5 Z"
            fill="url(#kbach-gold-grad)"
            transform={`rotate(${i * 45} 32 32)`}
          />
        ))}

        {type === "offering" && (
          <g>
            <path
              d="M32 10 C36 17 40 22 41 27 H23 C24 22 28 17 32 10 Z"
              fill="url(#kbach-gold-grad)"
              stroke="#684107"
              strokeWidth="0.6"
            />
            <path
              d="M27 21 C30 16 34 16 37 21"
              fill="none"
              stroke="#FFF8D6"
              strokeWidth="0.9"
            />
            <circle cx="26" cy="25" r="3" fill="url(#kbach-ruby-gem)" />
            <circle cx="32" cy="24" r="3.4" fill="url(#kbach-gem-grad)" />
            <circle cx="38" cy="25" r="3" fill="url(#kbach-ruby-gem)" />
            <path
              d="M16 28 H48 L43 36 C39 39 25 39 21 36 Z"
              fill="url(#kbach-gold-grad)"
              stroke="#684107"
              strokeWidth="0.7"
            />
            <path
              d="M28 37 H36 L34 45 H30 Z M21 45 H43 L46 50 H18 Z"
              fill="url(#kbach-gold-soft)"
              stroke="#684107"
              strokeWidth="0.6"
            />
          </g>
        )}

        {type === "monk" && (
          <g>
            <circle cx="32" cy="24" r="12" fill="url(#kbach-candle-glow)" />
            {[-40, -20, 0, 20, 40].map((deg) => (
              <path
                key={deg}
                d="M32 34 C37 25 38 17 32 11 C26 17 27 25 32 34 Z"
                fill="url(#kbach-gold-grad)"
                stroke="#684107"
                strokeWidth="0.65"
                transform={`rotate(${deg} 32 34)`}
              />
            ))}
            <path
              d="M20 35 Q32 41 44 35 L40 42 H24 Z M23 44 H41 L44 49 H20 Z"
              fill="url(#kbach-gold-soft)"
              stroke="#684107"
              strokeWidth="0.6"
            />
            <circle cx="32" cy="23" r="3" fill="url(#kbach-ruby-gem)" />
          </g>
        )}

        {type === "procession" && (
          <g>
            <path d="M32 8 L34 14 H30 Z" fill="#FFF9D6" />
            <path
              d="M23 16 Q32 11 41 16 Z M19 22 Q32 16 45 22 Z M15 29 Q32 21 49 29 Z"
              fill="url(#kbach-gold-grad)"
              stroke="#684107"
              strokeWidth="0.65"
            />
            <path
              d="M17 30 V33 M23 30 V34 M29 30 V34 M35 30 V34 M41 30 V34 M47 30 V33"
              stroke="#FFF6C4"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <rect
              x="30.8"
              y="14"
              width="2.4"
              height="35"
              fill="url(#kbach-gold-soft)"
            />
            <path d="M23 49 H41 L43 52 H21 Z" fill="url(#kbach-gold-grad)" />
          </g>
        )}

        {type === "scissors" && (
          <g>
            <circle
              cx="22"
              cy="39"
              r="5.5"
              fill="none"
              stroke="url(#kbach-gold-grad)"
              strokeWidth="2.4"
            />
            <circle
              cx="42"
              cy="39"
              r="5.5"
              fill="none"
              stroke="url(#kbach-gold-grad)"
              strokeWidth="2.4"
            />
            <path
              d="M25 35 L43 13 C44 15 43 19 39 23 L27 37 Z"
              fill="url(#kbach-gold-grad)"
            />
            <path
              d="M39 35 L21 13 C20 15 21 19 25 23 L37 37 Z"
              fill="url(#kbach-gold-soft)"
            />
            <circle
              cx="32"
              cy="27"
              r="2.8"
              fill="url(#kbach-ruby-gem)"
              stroke="#FFF6C4"
              strokeWidth="0.7"
            />
            <path d="M22 48 H42 L45 51 H19 Z" fill="url(#kbach-gold-grad)" />
          </g>
        )}

        {type === "popil" && (
          <g>
            <circle cx="32" cy="16" r="9" fill="url(#kbach-candle-glow)" />
            <path
              d="M32 8 C35 13 35 18 32 21 C29 18 29 13 32 8 Z"
              fill="#FFFDF0"
              stroke="#E8A325"
              strokeWidth="0.7"
            />
            <path
              d="M32 19 C45 25 48 39 32 49 C16 39 19 25 32 19 Z"
              fill="url(#kbach-gold-grad)"
              stroke="#684107"
              strokeWidth="0.8"
            />
            <path
              d="M32 23 C40 28 41 37 32 44 C23 37 24 28 32 23 Z"
              fill="none"
              stroke="#684107"
              strokeWidth="0.8"
              strokeDasharray="2 1.5"
            />
            <circle
              cx="32"
              cy="34"
              r="3.5"
              fill="url(#kbach-ruby-gem)"
              stroke="#FFF6C4"
              strokeWidth="0.7"
            />
            <path d="M30 48 H34 V53 H30 Z" fill="url(#kbach-gold-soft)" />
          </g>
        )}

        {type !== "offering" &&
          type !== "monk" &&
          type !== "procession" &&
          type !== "scissors" &&
          type !== "popil" && (
            <g>
              <path
                d="M20 16 H44 L39 31 C36 36 28 36 25 31 Z"
                fill="url(#kbach-gold-grad)"
                stroke="#684107"
                strokeWidth="0.7"
              />
              <path
                d="M24 16 C26 11 38 11 40 16 Z"
                fill="url(#kbach-gold-soft)"
              />
              <circle cx="32" cy="23" r="3.2" fill="url(#kbach-ruby-gem)" />
              <path
                d="M29 34 H35 L37 44 H27 Z M21 44 H43 L46 49 H18 Z"
                fill="url(#kbach-gold-grad)"
                stroke="#684107"
                strokeWidth="0.6"
              />
            </g>
          )}
      </g>
    </svg>
  )
}
