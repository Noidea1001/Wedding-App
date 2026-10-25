export function GoldSvgDefs() {
  return (
    <svg width="0" height="0" className="sr-only" aria-hidden="true">
      <defs>
        <linearGradient
          id="kbach-gold-grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFBE0" />
          <stop offset="16%" stopColor="#F5D57A" />
          <stop offset="34%" stopColor="#C89124" />
          <stop offset="52%" stopColor="#FFF3B8" />
          <stop offset="72%" stopColor="#D69E2E" />
          <stop offset="88%" stopColor="#8F5B0D" />
          <stop offset="100%" stopColor="#FCE79C" />
        </linearGradient>

        <linearGradient id="kbach-gold-soft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF6C7" />
          <stop offset="45%" stopColor="#E0B145" />
          <stop offset="82%" stopColor="#9B6612" />
          <stop offset="100%" stopColor="#F5D77F" />
        </linearGradient>

        <linearGradient
          id="kbach-gold-deep"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#D8A438" />
          <stop offset="50%" stopColor="#7C4D08" />
          <stop offset="100%" stopColor="#3E2202" />
        </linearGradient>

        <radialGradient id="kbach-gem-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="40%" stopColor="#F0C65E" />
          <stop offset="78%" stopColor="#A66D11" />
          <stop offset="100%" stopColor="#4F2E02" />
        </radialGradient>

        <radialGradient id="kbach-ruby-gem" cx="35%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#FF9EAB" />
          <stop offset="38%" stopColor="#C81D35" />
          <stop offset="82%" stopColor="#5E0511" />
          <stop offset="100%" stopColor="#2B0106" />
        </radialGradient>

        <radialGradient id="kbach-candle-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF2" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FFD86B" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#E08B19" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#E08B19" stopOpacity="0" />
        </radialGradient>

        <filter id="kbach-emboss" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow
            dx="0"
            dy="2.5"
            stdDeviation="2.2"
            floodColor="#120103"
            floodOpacity="0.78"
          />
          <feDropShadow
            dx="0"
            dy="-0.8"
            stdDeviation="0.6"
            floodColor="#FFF6C4"
            floodOpacity="0.35"
          />
        </filter>

        <filter
          id="kbach-sacred-glow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
