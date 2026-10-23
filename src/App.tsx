import { useEffect, useMemo, useRef, useState } from "react"
import {
  defaultWeddingCmsData,
  initialRsvpList,
  initialWishesList,
  type RsvpRecord,
  type WeddingCmsData,
  type WishRecord,
} from "./cmsData"
import { CmsStudioDrawer } from "./CmsStudioDrawer"
import {
  JasmineArchTemplate,
  OliveFoil2026Template,
  PopupPalaceTemplate,
} from "./CreativeKhmerTemplates"

const navItems = [
  { label: "ទំព័រដើម", href: "#home" },
  { label: "សំបុត្រអញ្ជើញ", href: "#invitation" },
  { label: "បង្វិលពពិល", href: "#ritual" },
  { label: "កម្មវិធីបុណ្យ", href: "#schedule" },
  { label: "សម្លៀកបំពាក់", href: "#dresscode" },
  { label: "កម្រងរូបភាព", href: "#gallery" },
  { label: "ចងដៃ & ជូនពរ", href: "#blessings" },
]

const dressSwatches = [
  {
    name: "មាសឆ្អិន (Royal Gold)",
    khmer: "ពណ៌មាសប្រពៃណី",
    hex: "#D7AA43",
    accent: "#F8E39B",
  },
  {
    name: "ក្រហមឈាមជ្រូក (Imperial Ruby)",
    khmer: "ពណ៌ក្រហមមង្គល",
    hex: "#6B0B17",
    accent: "#A82031",
  },
  {
    name: "ពណ៌សំរឹទ្ធ (Champagne Silk)",
    khmer: "ពណ៌សូត្រពងមាន់",
    hex: "#E6CFA1",
    accent: "#FFF5DF",
  },
  {
    name: "បៃតងមរកត (Angkor Emerald)",
    khmer: "ពណ៌បៃតងហូលផាមួង",
    hex: "#134E3A",
    accent: "#2A7B5F",
  },
  {
    name: "ផ្កាឈូកសូត្រ (Lotus Blush)",
    khmer: "ពណ៌ផ្កាឈូកស្រគាំ",
    hex: "#B55D6A",
    accent: "#E39CA7",
  },
]

const CMS_STORAGE_KEY = "khmer_wedding_cms_v1"
const RSVP_STORAGE_KEY = "khmer_wedding_rsvps_v1"
const WISHES_STORAGE_KEY = "khmer_wedding_wishes_v1"

const KHMER_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"]
function toKhmerNum(num: number | string): string {
  return String(num)
    .padStart(2, "0")
    .replace(/\d/g, (d) => KHMER_DIGITS[Number(d)])
}

/**
 * 3D Chased Gold Leaf, Ruby Gem & Sacred Glow SVG Defs shared across all Khmer Artworks
 */
function GoldSvgDefs() {
  return (
    <svg width="0" height="0" className="sr-only" aria-hidden="true">
      <defs>
        <linearGradient id="kbach-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
        <linearGradient id="kbach-gold-deep" x1="0%" y1="0%" x2="100%" y2="100%">
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
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#120103" floodOpacity="0.78" />
          <feDropShadow dx="0" dy="-0.8" stdDeviation="0.6" floodColor="#FFF6C4" floodOpacity="0.35" />
        </filter>
        <filter id="kbach-sacred-glow" x="-40%" y="-40%" width="180%" height="180%">
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

/**
 * Living 3D Cambodian Romduol Flowers & Floating Sacred Gold Light Spores
 */
const floatingPetals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 4) % 96}%`,
  delay: `${(i * 1.2) % 14}s`,
  duration: `${14 + (i % 6) * 2.4}s`,
  size: 20 + (i % 4) * 6,
}))

function GoldenPetalCanvas() {
  return (
    <div className="petal-canvas" aria-hidden="true">
      {floatingPetals.map((p) => (
        <span
          key={p.id}
          className="romduol-floating-blossom"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          <svg viewBox="0 0 48 48" width="100%" height="100%">
            <g transform="translate(24,24)" filter="url(#kbach-emboss)">
              {[0, 120, 240].map((deg) => (
                <g key={`o-${deg}`} transform={`rotate(${deg})`}>
                  <path
                    d="M0 -3 C8 -13 13 -19 0 -22 C-13 -19 -8 -13 0 -3 Z"
                    fill="url(#kbach-gold-grad)"
                    stroke="#754907"
                    strokeWidth="0.7"
                  />
                  <path
                    d="M0 -5 C3 -12 4 -16 0 -19"
                    fill="none"
                    stroke="#FFF9D9"
                    strokeWidth="0.6"
                    opacity="0.75"
                  />
                </g>
              ))}
              {[60, 180, 300].map((deg) => (
                <g key={`i-${deg}`} transform={`rotate(${deg})`}>
                  <path
                    d="M0 -2 C5.5 -10 8.5 -14 0 -17 C-8.5 -14 -5.5 -10 0 -2 Z"
                    fill="url(#kbach-gold-soft)"
                    stroke="#8E5E12"
                    strokeWidth="0.65"
                  />
                </g>
              ))}
              <circle cx="0" cy="0" r="4.2" fill="url(#kbach-gem-grad)" stroke="#5A3604" strokeWidth="0.6" />
              <circle cx="-1" cy="-1" r="1.4" fill="#FFFDF0" />
            </g>
          </svg>
        </span>
      ))}
    </div>
  )
}

/**
 * Intricate Khmer Kbach Corner Scrollwork (Matches Reference Images 2, 3, 4)
 */
function KbachCorner({
  position,
  className = "",
}: {
  position: "tl" | "tr" | "bl" | "br"
  className?: string
}) {
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
      style={{ transform: transforms[position] }}
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
          <circle cx="0" cy="0" r="8" fill="url(#kbach-gem-grad)" stroke="#5A3604" strokeWidth="1" />
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
        <path d="M54 54 L78 78" stroke="url(#kbach-gold-soft)" strokeWidth="1.2" opacity="0.7" />
        <circle cx="84" cy="84" r="3" fill="url(#kbach-gem-grad)" />
      </g>
    </svg>
  )
}

/**
 * Center Top / Bottom Floral Kbach Crest (Matches Reference Image 2 Top & Bottom Centerpiece)
 */
function KbachCenterCrest({
  flip = false,
  className = "",
}: {
  flip?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 420 110"
      className={`kbach-center-crest ${flip ? "kbach-crest-flip" : ""} ${className}`}
      aria-hidden="true"
    >
      <g filter="url(#kbach-emboss)">
        {[-1, 1].map((dir) => (
          <g key={dir} transform={`translate(210, 42) scale(${dir}, 1)`}>
            <path
              d="M22 0 C52 -24, 95 -18, 118 6 C130 18, 112 34, 98 22 C88 14, 98 2, 108 8"
              fill="none"
              stroke="url(#kbach-gold-grad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M26 -2 C50 -16, 82 -12, 104 6 C84 -2, 56 0, 34 12 Z"
              fill="url(#kbach-gold-grad)"
            />
            <path
              d="M114 -4 C140 -18, 168 -10, 188 4 C170 2, 148 6, 128 16 Z"
              fill="url(#kbach-gold-soft)"
            />
            <path
              d="M18 14 C42 32, 72 38, 92 26 C72 28, 48 22, 28 8 Z"
              fill="url(#kbach-gold-soft)"
            />
            <path
              d="M0 30 C12 42, 22 52, 0 64"
              fill="none"
              stroke="url(#kbach-gold-grad)"
              strokeWidth="2.2"
            />
            <g transform="translate(65, 22) scale(0.45)">
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
          </g>
        ))}

        <g transform="translate(210, 38)">
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d="M0 -4 C8 -18 14 -26 0 -35 C-14 -26 -8 -18 0 -4 Z"
              fill="url(#kbach-gold-grad)"
              stroke="#684107"
              strokeWidth="0.7"
              transform={`rotate(${i * 45})`}
            />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={`in-${i}`}
              d="M0 -3 C5 -11 9 -16 0 -23 C-9 -16 -5 -11 0 -3 Z"
              fill="url(#kbach-gold-soft)"
              transform={`rotate(${i * 45 + 22.5})`}
            />
          ))}
          <circle cx="0" cy="0" r="9" fill="url(#kbach-gem-grad)" stroke="#5A3604" strokeWidth="1" />
          <circle cx="0" cy="0" r="4" fill="#FFF9DC" />
        </g>

        <path
          d="M210 74 L217 88 L210 104 L203 88 Z"
          fill="url(#kbach-gold-grad)"
          stroke="#684107"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  )
}

/**
 * Sculpted 3D Khmer Royal Gold Bas-Relief Medallions for Each Ceremony
 */
function CeremonyIcon({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 64 64" className="ceremony-svg-icon ceremony-relief-art" aria-hidden="true">
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
          /* ពានមាស និងភួងផ្លែឈើមង្គល (Royal Golden Pedestal Tray & Phka Sla Cone) */
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
          /* ពិធីសូត្រមន្តព្រះសង្ឃ — ផ្កាឈូកមាសលើជើងពាន និងប្រទីបធម៌ (Sacred Lotus & Dharma Halo) */
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
          /* ពិធីហែជំនួន — ឆ័ត្ររួតរាជ្យ ៥ ជាន់ (Royal 5-Tiered Ceremonial Parasol) */
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
            <rect x="30.8" y="14" width="2.4" height="35" fill="url(#kbach-gold-soft)" />
            <path d="M23 49 H41 L43 52 H21 Z" fill="url(#kbach-gold-grad)" />
          </g>
        )}

        {type === "scissors" && (
          /* ពិធីកាត់សក់បង្កក់សិរី — កន្ត្រៃមាសរាជ្យ និងក្រាសមាសលើជើងពាន (Royal Golden Scissors & Pedestal) */
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
            <circle cx="32" cy="27" r="2.8" fill="url(#kbach-ruby-gem)" stroke="#FFF6C4" strokeWidth="0.7" />
            <path d="M22 48 H42 L45 51 H19 Z" fill="url(#kbach-gold-grad)" />
          </g>
        )}

        {type === "popil" && (
          /* ពិធីបង្វិលពពិល — ស្លឹកពពិលមាសឆ្លាក់ក្បាច់ និងទៀនជ័យកំពុងឆេះ (Sculpted Gold Popil Leaf & Sacred Flame) */
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
            <circle cx="32" cy="34" r="3.5" fill="url(#kbach-ruby-gem)" stroke="#FFF6C4" strokeWidth="0.7" />
            <path d="M30 48 H34 V53 H30 Z" fill="url(#kbach-gold-soft)" />
          </g>
        )}

        {type !== "offering" &&
          type !== "monk" &&
          type !== "procession" &&
          type !== "scissors" &&
          type !== "popil" && (
            /* ពិធីពិសាភោជនាហារ និងចងដៃ — ពានមាសសំពះផ្ទឹម និងផ្កាស្លា (Royal Wedding Chalice & Blessing Garland) */
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

/**
 * Reusable Luxury Frame Container with 4 Kbach Corners + Top & Bottom Center Crests
 */
function KbachLuxuryFrame({
  children,
  variant = "damask",
  showCenterCrests = true,
  className = "",
}: {
  children: React.ReactNode
  variant?: "damask" | "velvet"
  showCenterCrests?: boolean
  className?: string
}) {
  return (
    <div className={`kbach-frame kbach-frame-${variant} ${className}`}>
      <div className="kbach-frame-border-outer" aria-hidden="true" />
      <div className="kbach-frame-border-inner" aria-hidden="true" />
      <KbachCorner position="tl" />
      <KbachCorner position="tr" />
      <KbachCorner position="bl" />
      <KbachCorner position="br" />
      {showCenterCrests && <KbachCenterCrest className="kbach-crest-top" />}
      {showCenterCrests && <KbachCenterCrest flip className="kbach-crest-bottom" />}
      <div className="kbach-frame-content">{children}</div>
    </div>
  )
}

function Flourish({ light = false }: { light?: boolean }) {
  return (
    <div className={`flourish ${light ? "flourish-light" : ""}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 36 36" width="22" height="22" className="flourish-romduol-icon">
        <g transform="translate(18,18)" filter="url(#kbach-emboss)">
          {[0, 60, 120, 180, 240, 300].map((deg, idx) => (
            <path
              key={deg}
              d="M0 -2 C4.5 -9 7 -13 0 -16 C-7 -13 -4.5 -9 0 -2 Z"
              fill={idx % 2 === 0 ? "url(#kbach-gold-grad)" : "url(#kbach-gold-soft)"}
              stroke="#684107"
              strokeWidth="0.5"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="3.2" fill="url(#kbach-ruby-gem)" stroke="#FFF6C4" strokeWidth="0.6" />
        </g>
      </svg>
      <span />
    </div>
  )
}

function SvgCameraIcon() {
  return (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 6.5h2.5L7 4.5h6l1.5 2H17a1.5 1.5 0 0 1 1.5 1.5v7.5A1.5 1.5 0 0 1 17 17H3a1.5 1.5 0 0 1-1.5-1.5V8A1.5 1.5 0 0 1 3 6.5Z" />
      <circle cx="10" cy="11.5" r="3" />
    </svg>
  )
}

function SvgExpandIcon() {
  return (
    <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13.2 13.2L17.5 17.5" strokeLinecap="round" />
    </svg>
  )
}

function SvgEnvelopeIcon() {
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2.5 5L10 10.8L17.5 5" />
    </svg>
  )
}

function SvgSettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="10" cy="10" r="2.8" />
      <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" strokeLinecap="round" />
    </svg>
  )
}

function SvgMusicIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 15V4.5l9-2V13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="15" r="2.2" />
      <circle cx="14" cy="13" r="2.2" />
    </svg>
  )
}

function SvgCandleIcon() {
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 2.2C12 4.5 12 6.8 10 8.2C8 6.8 8 4.5 10 2.2Z" fill="currentColor" />
      <rect x="7.5" y="9.5" width="5" height="8" rx="1" />
    </svg>
  )
}

/**
 * Sculpted Angkor Lotus Tower (ប្រាង្គប្រាសាទក្បាច់ឈូក) with Tiered Antefixes & Trishula Spire
 */
function AngkorLotusTower({
  x,
  base,
  tiers,
  w,
  h,
}: {
  x: number
  base: number
  tiers: number
  w: number
  h: number
}) {
  const parts = []
  for (let i = 0; i < tiers; i++) {
    const tw = w * Math.pow(0.84, i)
    const y = base - (i + 1) * h
    parts.push(
      <g key={i}>
        {/* Stepped Sandstone & Gold Tier Body */}
        <path
          d={`M${x - tw / 2} ${y + h} L${x - tw * 0.44} ${y} H${x + tw * 0.44} L${x + tw / 2} ${y + h} Z`}
          fill="url(#kbach-gold-grad)"
          stroke="#5e3904"
          strokeWidth="0.7"
        />
        {/* Carved Kbach Antefix Pediment on each tier */}
        <path
          d={`M${x - tw * 0.22} ${y + h} Q${x} ${y - 3} ${x + tw * 0.22} ${y + h} Z`}
          fill="url(#kbach-gold-soft)"
          stroke="#5e3904"
          strokeWidth="0.5"
        />
        {/* Corner Naga / Garuda Finials */}
        <path
          d={`M${x - tw / 2} ${y + h - 1} L${x - tw / 2 - 4} ${y + 2} L${x - tw * 0.43} ${y + 3} Z`}
          fill="url(#kbach-gold-soft)"
        />
        <path
          d={`M${x + tw / 2} ${y + h - 1} L${x + tw / 2 + 4} ${y + 2} L${x + tw * 0.43} ${y + 3} Z`}
          fill="url(#kbach-gold-soft)"
        />
      </g>,
    )
  }
  const top = base - tiers * h
  parts.push(
    <g key="spire">
      {/* Sacred Lotus Crown & 3-Pronged Royal Spire (ត្រីសូល៍) */}
      <ellipse cx={x} cy={top} rx={w * 0.14} ry={4} fill="url(#kbach-gold-grad)" />
      <path
        d={`M${x - 3} ${top} L${x} ${top - 28} L${x + 3} ${top} Z`}
        fill="url(#kbach-gold-grad)"
        stroke="#5e3904"
        strokeWidth="0.6"
      />
      <circle cx={x} cy={top - 14} r="2.6" fill="#FFFDF0" />
      <circle cx={x} cy={top - 28} r="2" fill="#FFFDF0" />
    </g>,
  )
  return <>{parts}</>
}

/**
 * LIVING 3D KHMER ROYAL ART DIORAMA:
 * Angkor Sunrise Mandala, Flying Golden Hongsa Swans, Royal Throne Pavilion,
 * Sacred Lotus Pond & Traditional Khmer Bride & Groom Performing Sampeah
 */
function TempleScene() {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5))
    el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5))
  }
  return (
    <div className="temple khmer-living-diorama" ref={ref} onPointerMove={move} aria-hidden="true">
      {/* LAYER 1: Sacred Sunrise Mandala Halo, Khmer Silk Clouds & Flying Hongsa Swans */}
      <svg viewBox="0 0 400 300" className="temple-layer layer-back">
        <defs>
          <radialGradient id="diorama-sun-halo" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#FFF9D2" stopOpacity="0.95" />
            <stop offset="32%" stopColor="#F5C85B" stopOpacity="0.55" />
            <stop offset="68%" stopColor="#B86B14" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3B040A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glowing Sunrise Aura */}
        <circle cx="200" cy="138" r="142" fill="url(#diorama-sun-halo)" />

        {/* Rotating Sacred Khmer Lotus Mandala Wheel in Sky */}
        <g className="living-sun-mandala" transform="translate(200, 132)">
          <circle
            cx="0"
            cy="0"
            r="96"
            fill="none"
            stroke="url(#kbach-gold-grad)"
            strokeWidth="0.9"
            strokeDasharray="3 4"
            opacity="0.65"
          />
          <circle
            cx="0"
            cy="0"
            r="74"
            fill="none"
            stroke="url(#kbach-gold-soft)"
            strokeWidth="0.8"
            opacity="0.55"
          />
          {Array.from({ length: 16 }, (_, i) => (
            <path
              key={i}
              d="M0 -52 C5 -70 5 -82 0 -94 C-5 -82 -5 -70 0 -52 Z"
              fill="url(#kbach-gold-grad)"
              opacity="0.32"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* Left & Right Flanking Angkor Lotus Towers */}
        <g filter="url(#kbach-emboss)" opacity="0.88">
          <AngkorLotusTower x={68} base={246} tiers={6} w={66} h={14} />
          <AngkorLotusTower x={332} base={246} tiers={6} w={66} h={14} />
        </g>

        {/* Pair of Sacred Golden Hongsa Swans (ហង្សមាសគូស្នេហ៍) Gliding in Sky */}
        <g className="living-hongsa-left" transform="translate(88, 52) scale(0.75)" filter="url(#kbach-emboss)">
          <path
            d="M0 14 C10 6 22 6 30 14 C36 4 46 0 52 6 C46 12 42 18 32 22 C18 26 8 22 0 14 Z"
            fill="url(#kbach-gold-grad)"
          />
          <path d="M16 12 C8 -4 -4 -6 -12 2 C-2 4 6 8 16 12 Z" fill="url(#kbach-gold-soft)" />
        </g>
        <g className="living-hongsa-right" transform="translate(312, 52) scale(-0.75, 0.75)" filter="url(#kbach-emboss)">
          <path
            d="M0 14 C10 6 22 6 30 14 C36 4 46 0 52 6 C46 12 42 18 32 22 C18 26 8 22 0 14 Z"
            fill="url(#kbach-gold-grad)"
          />
          <path d="M16 12 C8 -4 -4 -6 -12 2 C-2 4 6 8 16 12 Z" fill="url(#kbach-gold-soft)" />
        </g>
      </svg>

      {/* LAYER 2: Central Imperial Angkor Sanctuary & colonnade galleries */}
      <svg viewBox="0 0 400 300" className="temple-layer layer-mid">
        <g filter="url(#kbach-emboss)">
          {/* Colonnade Galleries */}
          <path
            d="M12 204 H120 V248 H12 Z M280 204 H388 V248 H280 Z"
            fill="#4A0710"
            stroke="url(#kbach-gold-grad)"
            strokeWidth="1.2"
          />
          <path
            d="M6 204 L68 182 L126 204 Z M274 204 L332 182 L394 204 Z"
            fill="url(#kbach-gold-soft)"
            stroke="#5e3904"
            strokeWidth="0.8"
          />
          {/* Gallery Carved Pillars */}
          {[26, 48, 70, 92, 308, 330, 352, 374].map((px) => (
            <rect
              key={px}
              x={px - 2.5}
              y="207"
              width="5"
              height="39"
              fill="url(#kbach-gold-grad)"
            />
          ))}

          {/* Grand Central Angkor Prasat Spire */}
          <AngkorLotusTower x={200} base={246} tiers={7} w={104} h={15.5} />
        </g>
      </svg>

      {/* LAYER 3: Royal Khmer Throne Pavilion, 5-Tiered Parasols & Sculpted Bride and Groom */}
      <svg viewBox="0 0 400 300" className="temple-layer layer-front">
        <g filter="url(#kbach-emboss)">
          {/* Multi-Tiered Royal Palace Roof with Chofah (កន្ទុយហង្ស) & Naga Bargeboards */}
          <path
            d="M84 182 C118 176 146 154 200 102 C254 154 282 176 316 182 L298 190 H102 Z"
            fill="#5E0814"
            stroke="url(#kbach-gold-grad)"
            strokeWidth="2"
          />
          <path
            d="M68 198 C108 190 144 166 200 116 C256 166 292 190 332 198 Z"
            fill="url(#kbach-gold-grad)"
            stroke="#5e3904"
            strokeWidth="0.9"
          />
          {/* Chofah Spire & Naga Tail Finials */}
          <path
            d="M200 72 C203 86 204 96 200 106 C196 96 197 86 200 72 Z M68 198 C60 192 58 182 64 176 C65 185 68 192 74 196 Z M332 198 C340 192 342 182 336 176 C335 185 332 192 326 196 Z"
            fill="#FFF7C8"
          />

          {/* Ornate Carved Pediment (ហោជាងក្បាច់ភ្ញីទេស) */}
          <path
            d="M116 196 L200 132 L284 196 Z"
            fill="#3B030A"
            stroke="url(#kbach-gold-grad)"
            strokeWidth="1.8"
          />
          <path
            d="M200 144 C184 162 164 176 142 190 C168 184 186 176 200 162 C214 176 232 184 258 190 C236 176 216 162 200 144 Z"
            fill="url(#kbach-gold-grad)"
          />
          <circle cx="200" cy="174" r="6" fill="url(#kbach-ruby-gem)" stroke="#FFF6C4" strokeWidth="1" />

          {/* Palace Sanctuary Archway & Draped Silk Curtains */}
          <rect
            x="118"
            y="196"
            width="164"
            height="54"
            fill="#280106"
            stroke="url(#kbach-gold-grad)"
            strokeWidth="1.5"
          />
          {/* Warm Candlelight Glow Behind Couple */}
          <circle cx="200" cy="222" r="46" fill="url(#kbach-candle-glow)" />

          {/* Left & Right Draped Silk Curtains */}
          <path
            d="M122 198 H158 C152 214 142 228 128 248 H122 Z M278 198 H242 C248 214 258 228 272 248 H278 Z"
            fill="url(#kbach-gold-soft)"
            opacity="0.85"
          />
          {/* Carved Gold Lotus Columns */}
          {[122, 152, 248, 278].map((cx) => (
            <g key={cx}>
              <rect x={cx - 4} y="196" width="8" height="54" fill="url(#kbach-gold-grad)" />
              <path
                d={`M${cx - 7} 196 H${cx + 7} L${cx + 5} 202 H${cx - 5} Z M${cx - 7} 250 H${cx + 7} L${cx + 5} 244 H${cx - 5} Z`}
                fill="#FFF5C0"
              />
            </g>
          ))}

          {/* Left & Right 5-Tiered Royal Parasols (ឆ័ត្ររួតមាស) */}
          {[96, 304].map((ux) => (
            <g key={ux}>
              <line x1={ux} y1="172" x2={ux} y2="250" stroke="url(#kbach-gold-grad)" strokeWidth="2.2" />
              <path
                d={`M${ux - 16} 186 Q${ux} 178 ${ux + 16} 186 Z M${ux - 12} 179 Q${ux} 172 ${ux + 12} 179 Z M${ux - 8} 173 Q${ux} 168 ${ux + 8} 173 Z`}
                fill="url(#kbach-gold-grad)"
              />
            </g>
          ))}

          {/* SCULPTED KHMER BRIDE & GROOM IN ROYAL ATTIRE PERFORMING SAMPEAH */}
          <g className="couple khmer-royal-couple-art">
            {/* Groom (Left — Ao Phamuong & Sampot Chang Kben) */}
            <g transform="translate(184, 204)">
              <circle cx="0" cy="11" r="6.2" fill="url(#kbach-gold-grad)" />
              {/* Groom Traditional Hair & Golden Collar */}
              <path d="M-5 8 C-3 3 3 3 5 8 Z" fill="#FFF6C4" />
              <path
                d="M-10 20 C-6 17 6 17 10 20 L13 46 H-12 Z"
                fill="url(#kbach-gold-grad)"
                stroke="#5A3604"
                strokeWidth="0.6"
              />
              {/* Golden Sbai / Collar Inlay & Sampeah Hands */}
              <path d="M-6 20 L0 29 L6 20" fill="none" stroke="#FFF9D6" strokeWidth="1.2" />
              <path d="M1 24 L6 19 L4 28 Z" fill="#FFFDF0" />
            </g>

            {/* Bride (Right — Royal Mokot Spire Crown, Sabai & Sampot Charabap) */}
            <g transform="translate(216, 202)">
              {/* Royal Spire Crown (ម្កុដរាជ្យកូនក្រមុំ) */}
              <path
                d="M-5 9 L0 -5 L5 9 Z"
                fill="url(#kbach-gold-grad)"
                stroke="#FFF8D6"
                strokeWidth="0.6"
              />
              <circle cx="0" cy="13" r="5.8" fill="url(#kbach-gold-soft)" />
              {/* Bride Draped Golden Sabai & Silk Skirt */}
              <path
                d="M-9 21 C-4 18 5 18 9 21 L12 48 H-11 Z"
                fill="url(#kbach-gold-soft)"
                stroke="#5A3604"
                strokeWidth="0.6"
              />
              <path
                d="M-8 21 L7 36 L11 48 H2 L-8 29 Z"
                fill="url(#kbach-gold-grad)"
              />
              {/* Sampeah Hands */}
              <path d="M-1 25 L-6 20 L-4 29 Z" fill="#FFFDF0" />
            </g>
          </g>

          {/* Grand Stepped Lotus Dais Base */}
          <rect x="52" y="250" width="296" height="7" rx="2" fill="url(#kbach-gold-grad)" />
          <rect x="34" y="257" width="332" height="7" rx="2" fill="url(#kbach-gold-soft)" />
        </g>
      </svg>

      {/* LAYER 4: Sacred Lotus Pond (ត្រពាំងឈូកមាស) & Floating Golden Fireflies */}
      <svg viewBox="0 0 400 300" className="temple-layer layer-bloom">
        {/* Shimmering Water Ripples */}
        <ellipse cx="200" cy="278" rx="165" ry="12" fill="none" stroke="url(#kbach-gold-grad)" strokeWidth="0.8" opacity="0.45" />
        <ellipse cx="200" cy="282" rx="120" ry="7" fill="none" stroke="#FFF6C4" strokeWidth="0.6" opacity="0.4" />

        {/* Sculpted Blooming Lotuses on the Pond */}
        {[58, 108, 156, 200, 244, 292, 342].map((lx, idx) => {
          const ly = idx % 2 === 0 ? 274 : 282
          const sc = idx === 3 ? 1.05 : 0.82
          return (
            <g key={lx} transform={`translate(${lx}, ${ly}) scale(${sc})`} filter="url(#kbach-emboss)">
              <ellipse cx="0" cy="5" rx="16" ry="3.5" fill="url(#kbach-gold-deep)" opacity="0.7" />
              {[-36, -18, 0, 18, 36].map((deg) => (
                <path
                  key={deg}
                  d="M0 4 C4 -4 5 -10 0 -15 C-5 -10 -4 -4 0 4 Z"
                  fill={deg === 0 ? "#FFF7CC" : "url(#kbach-gold-grad)"}
                  stroke="#684107"
                  strokeWidth="0.5"
                  transform={`rotate(${deg} 0 4)`}
                />
              ))}
            </g>
          )
        })}

        {/* Floating Golden Lantern Sparks */}
        {Array.from({ length: 24 }, (_, i) => {
          const cx = 36 + ((i * 37) % 328)
          const cy = 24 + ((i * 53) % 210)
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={(i % 3) * 0.7 + 1.2}
              fill="#FFF8D2"
              className="living-gold-spark"
              style={{ animationDelay: `${(i * 0.35) % 4}s` }}
            />
          )
        })}
      </svg>
    </div>
  )
}

/**
 * CREATIVE FEATURE: Interactive Sacred "បង្វិលពពិល" (Living Popil Candle Blessing, Smoke & Phka Sla Art)
 */
function PopilBlessingRitual({
  coupleLabel,
  onPlayChime,
}: {
  coupleLabel: string
  onPlayChime: () => void
}) {
  const [rotations, setRotations] = useState(3)
  const [bursts, setBursts] = useState<{ id: number; text: string; x: number }[]>([])

  const blessingWords = [
    "សិរីសួស្តី ជ័យមង្គល",
    "ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង",
    "សុភមង្គលពេញគ្រួសារ",
    "ត្រជាក់ត្រជុំដូចទឹកអម្រឹត",
    "អាយុ វណ្ណៈ សុខៈ ពលៈ",
  ]

  const triggerBlessing = () => {
    setRotations((r) => r + 1)
    onPlayChime()
    const id = Date.now() + Math.random()
    const text = blessingWords[rotations % blessingWords.length]
    const x = 25 + Math.floor(Math.random() * 50)
    setBursts((prev) => [...prev.slice(-5), { id, text, x }])
  }

  return (
    <section className="popil-ritual-section" id="ritual">
      <div className="section-container">
        <KbachLuxuryFrame variant="damask" showCenterCrests>
          <div className="popil-inner">
            <p className="section-kicker">ពិធីប្រសិទ្ធពរជ័យអន្តរកម្ម • Interactive Khmer Ritual</p>
            <h2>ពិធីបង្វិលពពិល និងបាចផ្កាស្លា</h2>
            <Flourish />
            <p className="popil-description">
              តាមទំនៀមទម្លាប់ខ្មែរ ភ្ញៀវកិត្តិយសអង្គុយព័ទ្ធជុំវិញគូស្វាមីភរិយា ដើម្បីបង្វិលទៀនពពិល និងបក់ផ្សែងពរជ័យ។
              សូមចុចប៊ូតុងខាងក្រោមដើម្បីចូលរួម <strong>បង្វិលពពិល និងបាចផ្កាស្លា</strong> ជូនពរគូស្វាមីភរិយាថ្មី!
            </p>

            <div className="popil-stage">
              <div className="popil-burst-layer" aria-live="polite">
                {bursts.map((b) => (
                  <span
                    key={b.id}
                    className="popil-floating-blessing"
                    style={{ left: `${b.x}%` }}
                  >
                    {b.text}
                  </span>
                ))}
              </div>

              <div
                className="popil-mandala-ring"
                style={{ transform: `rotate(${rotations * 52}deg)` }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 300 300" className="popil-mandala-svg">
                  <g filter="url(#kbach-emboss)">
                    <circle
                      cx="150"
                      cy="150"
                      r="138"
                      fill="none"
                      stroke="url(#kbach-gold-grad)"
                      strokeWidth="1.6"
                      strokeDasharray="6 4"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="116"
                      fill="none"
                      stroke="url(#kbach-gold-grad)"
                      strokeWidth="2.2"
                    />
                    {/* 16 Sculpted Lotus Petals around the Mandala */}
                    {Array.from({ length: 16 }, (_, i) => (
                      <g key={i} transform={`rotate(${i * 22.5} 150 150)`}>
                        <path
                          d="M150 16 C157 26 157 38 150 46 C143 38 143 26 150 16 Z"
                          fill={i % 2 === 0 ? "url(#kbach-gold-grad)" : "url(#kbach-gold-soft)"}
                          stroke="#684107"
                          strokeWidth="0.6"
                        />
                        <circle cx="150" cy="31" r="2" fill="#FFF9D6" />
                      </g>
                    ))}
                    {/* 4 Sacred Sculpted Golden Popil Candles (ស្លឹកពពិលមាស និងទៀនជ័យ) at Cardinal Points */}
                    {[0, 90, 180, 270].map((deg) => (
                      <g key={`popil-${deg}`} transform={`rotate(${deg} 150 150) translate(150, 18)`}>
                        <circle cx="0" cy="-6" r="12" fill="url(#kbach-candle-glow)" />
                        <path
                          d="M0 -14 C4 -8 4 -3 0 0 C-4 -3 -4 -8 0 -14 Z"
                          fill="#FFFDF0"
                          stroke="#E89E1E"
                          strokeWidth="0.7"
                        />
                        <path
                          d="M0 0 C11 5 13 16 0 24 C-13 16 -11 5 0 0 Z"
                          fill="url(#kbach-gold-grad)"
                          stroke="#5A3604"
                          strokeWidth="0.8"
                        />
                        <circle cx="0" cy="12" r="2.8" fill="url(#kbach-ruby-gem)" />
                      </g>
                    ))}
                  </g>
                </svg>
              </div>

              <div className="popil-couple-core damask-surface">
                <small>ជុំទី (Rounds)</small>
                <strong>{toKhmerNum(rotations)}</strong>
                <span>{coupleLabel}</span>
              </div>
            </div>

            <div className="popil-controls">
              <button type="button" className="gold-button popil-trigger-btn" onClick={triggerBlessing}>
                <SvgCandleIcon />
                <span>ចុចបង្វិលពពិល និងបាចផ្កាស្លាជូនពរ (+១ ជុំ)</span>
              </button>
              <p className="popil-counter-note">
                ភ្ញៀវកិត្តិយសបានចូលរួមបង្វិលពពិលប្រសិទ្ធពរជ័យចំនួន{" "}
                <strong>{toKhmerNum(rotations)} ជុំ</strong> ហើយ
              </p>
            </div>
          </div>
        </KbachLuxuryFrame>
      </div>
    </section>
  )
}

/**
 * 3 Distinct Full-Scene 3D Sculpted Khmer Royal Masterpiece Artworks for the Pre-Wedding Gallery
 * - Scene 0 (Chapter I): Angkor Wat Sunrise Mandala, Sacred Hongsa Swans & Royal Sovereign Attire
 * - Scene 1 (Chapter II): Royal Khmer Pavilion, 7-Tiered Baysei & Sacred Sompas Vows
 * - Scene 2 (Chapter III): Throne Hall Arch, 5-Tiered Royal Chatra Parasols & Red Thread of Destiny
 */
function GalleryMasterpieceArt({ sceneIndex }: { sceneIndex: number }) {
  const variant = sceneIndex % 3
  return (
    <svg viewBox="0 0 280 310" className="gallery-masterpiece-svg" aria-hidden="true">
      {/* Ambient Royal Sanctuary Glow */}
      <circle cx="140" cy="138" r="118" fill="url(#kbach-candle-glow)" />

      {/* Outer Sculpted Angkor Sanctuary Arch & Filigree Pillars */}
      <g filter="url(#kbach-emboss)">
        {/* Left & Right Sculpted Temple Columns */}
        <rect x="26" y="106" width="12" height="164" rx="2" fill="url(#kbach-gold-deep)" stroke="#5A3604" strokeWidth="0.7" />
        <rect x="242" y="106" width="12" height="164" rx="2" fill="url(#kbach-gold-deep)" stroke="#5A3604" strokeWidth="0.7" />
        <rect x="22" y="100" width="20" height="8" rx="2" fill="url(#kbach-gold-grad)" />
        <rect x="238" y="100" width="20" height="8" rx="2" fill="url(#kbach-gold-grad)" />
        <rect x="20" y="266" width="24" height="8" rx="2" fill="url(#kbach-gold-grad)" />
        <rect x="236" y="266" width="24" height="8" rx="2" fill="url(#kbach-gold-grad)" />

        {/* Multi-Tiered Kbach Phni Tes Tympanum Arch */}
        <path
          d="M26 106 C26 48 82 18 140 12 C198 18 254 48 254 106"
          fill="none"
          stroke="url(#kbach-gold-grad)"
          strokeWidth="3.2"
        />
        <path
          d="M36 108 C36 58 86 28 140 22 C194 28 244 58 244 108"
          fill="none"
          stroke="url(#kbach-gold-soft)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        {/* Top Crown Finial on Sanctuary Arch */}
        <path d="M140 2 L147 16 L140 13 L133 16 Z" fill="#FFF8D2" />
        <circle cx="140" cy="14" r="3.2" fill="url(#kbach-ruby-gem)" />
      </g>

      {/* SCENE-SPECIFIC BACKGROUND ARCHITECTURE */}
      {variant === 0 && (
        <g filter="url(#kbach-emboss)">
          {/* Rotating 24-Ray Golden Sunrise Mandala */}
          <g transform="translate(140, 118)">
            <g className="living-sun-mandala">
              {Array.from({ length: 24 }, (_, i) => (
                <path
                  key={i}
                  d="M0 -24 L3.5 -82 L0 -92 L-3.5 -82 Z"
                  fill="url(#kbach-gold-grad)"
                  opacity={i % 2 === 0 ? 0.42 : 0.22}
                  transform={`rotate(${i * 15})`}
                />
              ))}
              <circle cx="0" cy="0" r="64" fill="none" stroke="url(#kbach-gold-grad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
            </g>
          </g>
          {/* Distant Angkor Lotus Towers */}
          <g opacity="0.48" fill="url(#kbach-gold-deep)">
            <path d="M140 34 L152 68 L160 112 H120 L128 68 Z" />
            <path d="M76 62 L85 92 L92 126 H60 L67 92 Z" />
            <path d="M204 62 L213 92 L220 126 H188 L195 92 Z" />
          </g>
          {/* Twin Sacred Hongsa Swans in Flight */}
          <g transform="translate(64, 58) scale(0.68)" fill="url(#kbach-gold-grad)">
            <path d="M0 10 C8 0 18 0 24 8 C18 6 10 8 4 14 Z" />
            <path d="M8 6 C14 -6 24 -8 30 -2 C22 -2 15 2 10 8 Z" fill="#FFF7CC" />
          </g>
          <g transform="translate(216, 58) scale(-0.68, 0.68)" fill="url(#kbach-gold-grad)">
            <path d="M0 10 C8 0 18 0 24 8 C18 6 10 8 4 14 Z" />
            <path d="M8 6 C14 -6 24 -8 30 -2 C22 -2 15 2 10 8 Z" fill="#FFF7CC" />
          </g>
        </g>
      )}

      {variant === 1 && (
        <g filter="url(#kbach-emboss)">
          {/* Glowing Full Moon & Hanging Jasmine (ផ្កាម្លិះ) Garlands */}
          <circle cx="140" cy="96" r="46" fill="url(#kbach-gold-soft)" opacity="0.22" />
          <circle cx="140" cy="96" r="54" fill="none" stroke="url(#kbach-gold-grad)" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.65" />
          {[56, 84, 196, 224].map((gx, idx) => (
            <g key={gx}>
              <line
                x1={gx}
                y1={idx === 0 || idx === 3 ? 52 : 34}
                x2={gx}
                y2={idx === 0 || idx === 3 ? 116 : 96}
                stroke="url(#kbach-gold-grad)"
                strokeWidth="1.1"
                strokeDasharray="2 3"
              />
              <circle cx={gx} cy={idx === 0 || idx === 3 ? 120 : 100} r="4.5" fill="#FFF8D6" stroke="#684107" strokeWidth="0.6" />
              <path
                d={`M${gx} ${idx === 0 || idx === 3 ? 125 : 105} L${gx + 3.5} ${idx === 0 || idx === 3 ? 134 : 114} L${gx} ${idx === 0 || idx === 3 ? 131 : 111} L${gx - 3.5} ${idx === 0 || idx === 3 ? 134 : 114} Z`}
                fill="url(#kbach-gold-grad)"
              />
            </g>
          ))}
          {/* Twin 7-Tiered Ceremonial Baysei (បាយសី ៧ ថ្នាក់) Flanking the Couple */}
          {[56, 224].map((bx) => (
            <g key={bx} transform={`translate(${bx}, 256)`}>
              <rect x="-10" y="-8" width="20" height="8" rx="2" fill="url(#kbach-gold-deep)" />
              <path d="M-8 -8 L-5 -24 H5 L8 -8 Z" fill="url(#kbach-gold-grad)" />
              {[0, 1, 2, 3, 4].map((tier) => {
                const w = 15 - tier * 2.4
                const ty = -26 - tier * 12
                return (
                  <path
                    key={tier}
                    d={`M${-w} ${ty} L0 ${ty - 11} L${w} ${ty} Z`}
                    fill={tier % 2 === 0 ? "url(#kbach-gold-grad)" : "url(#kbach-gold-soft)"}
                    stroke="#5A3604"
                    strokeWidth="0.6"
                  />
                )
              })}
              <circle cx="0" cy="-90" r="3" fill="url(#kbach-ruby-gem)" />
            </g>
          ))}
        </g>
      )}

      {variant === 2 && (
        <g filter="url(#kbach-emboss)">
          {/* Sacred Popil Candle Mandala Halo Overhead */}
          <g transform="translate(140, 108)">
            <g className="living-sun-mandala">
              {Array.from({ length: 12 }, (_, i) => (
                <path
                  key={i}
                  d="M0 -34 C6 -48 8 -58 0 -68 C-8 -58 -6 -48 0 -34 Z"
                  fill="url(#kbach-gold-grad)"
                  opacity="0.38"
                  transform={`rotate(${i * 30})`}
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="44" fill="none" stroke="url(#kbach-gold-grad)" strokeWidth="1.4" />
          </g>
          {/* Twin 5-Tiered Royal Chatra Parasols (ឆ័ត្ររាជ្យ ៥ ជាន់) */}
          {[54, 226].map((px, idx) => (
            <g key={px} transform={`translate(${px}, 258) rotate(${idx === 0 ? 8 : -8})`}>
              <line x1="0" y1="0" x2="0" y2="-142" stroke="url(#kbach-gold-grad)" strokeWidth="2.2" />
              {[0, 1, 2, 3, 4].map((t) => {
                const w = 22 - t * 3.2
                const y = -88 - t * 13
                return (
                  <path
                    key={t}
                    d={`M${-w} ${y} Q0 ${y - 9} ${w} ${y} Z`}
                    fill="url(#kbach-gold-grad)"
                    stroke="#5A3604"
                    strokeWidth="0.6"
                  />
                )
              })}
              <path d="M0 -158 L3.5 -144 L-3.5 -144 Z" fill="#FFF8D6" />
            </g>
          ))}
        </g>
      )}

      {/* FOREGROUND: SCULPTED 3D ROYAL KHMER BRIDE & GROOM IN TRADITIONAL SOVEREIGN ATTIRE */}
      <g filter="url(#kbach-emboss)">
        {/* GROOM (Left — Royal Ao Phamuong Collar, Sangvar Gold Chain & Chang Kben) */}
        <g transform="translate(115, 132)">
          {/* Groom Crown / Headpiece */}
          <path d="M-11 -6 L0 -26 L11 -6 Z" fill="url(#kbach-gold-grad)" stroke="#FFF8D6" strokeWidth="0.8" />
          <circle cx="0" cy="4" r="14" fill="url(#kbach-gold-grad)" stroke="#5A3604" strokeWidth="0.8" />
          <path d="M-10 -2 C-5 -10 5 -10 10 -2 Z" fill="#FFF6C4" />
          {/* Groom Royal Tunic & Shoulders */}
          <path
            d="M-28 118 C-26 62 -18 24 0 24 C18 24 24 62 26 118 Z"
            fill="url(#kbach-gold-grad)"
            stroke="#5A3604"
            strokeWidth="0.9"
          />
          {/* Crossed Royal Sangvar Gold Chain & Ruby Medallion */}
          <path d="M-14 26 L14 72 M10 26 L-12 68" stroke="#FFF9D6" strokeWidth="2" />
          <circle cx="0" cy="48" r="3.6" fill="url(#kbach-ruby-gem)" stroke="#FFF8D6" strokeWidth="0.8" />
          {/* Groom Praying Hands (សំពះ) */}
          <path d="M2 52 L14 38 L18 50 L6 60 Z" fill="#FFF5C0" stroke="#684107" strokeWidth="0.7" />
        </g>

        {/* BRIDE (Right — Tall Pointed Mokot Reachspire Crown, Draped Sabai & Sampot Hol) */}
        <g transform="translate(163, 136)">
          {/* Tall Multi-Tiered Royal Mokot Spire Crown */}
          <path d="M-12 -6 L-7 -22 L0 -46 L7 -22 L12 -6 Z" fill="url(#kbach-gold-grad)" stroke="#FFF8D6" strokeWidth="0.9" />
          <circle cx="0" cy="-22" r="2.8" fill="url(#kbach-ruby-gem)" />
          <circle cx="0" cy="4" r="13.5" fill="url(#kbach-gold-soft)" stroke="#5A3604" strokeWidth="0.8" />
          {/* Jasmine Hair Garland */}
          <circle cx="12" cy="6" r="3" fill="#FFFDF2" />
          <circle cx="13" cy="13" r="2.5" fill="#FFFDF2" />
          {/* Bride Silhouette & Sampot Hol */}
          <path
            d="M-24 114 C-22 60 -14 23 0 23 C16 23 24 60 26 114 Z"
            fill="url(#kbach-gold-soft)"
            stroke="#5A3604"
            strokeWidth="0.9"
          />
          {/* Diagonal Jeweled Sabai Sash */}
          <path
            d="M-12 24 L22 86 L25 114 H4 L-16 44 Z"
            fill="url(#kbach-gold-grad)"
            stroke="#FFF6C4"
            strokeWidth="0.8"
          />
          <circle cx="0" cy="44" r="3.2" fill="url(#kbach-ruby-gem)" stroke="#FFF8D6" strokeWidth="0.7" />
          {/* Bride Praying Hands (សំពះ) */}
          <path d="M-4 50 L-14 36 L-18 48 L-8 58 Z" fill="#FFF5C0" stroke="#684107" strokeWidth="0.7" />
        </g>

        {/* Sacred Red & Gold Thread of Destiny (អំបោះក្រហមចងដៃ) Linking Couple's Hands */}
        <path
          d="M128 176 Q140 192 150 176"
          fill="none"
          stroke="url(#kbach-ruby-gem)"
          strokeWidth="2.4"
        />
        <circle cx="139" cy="183" r="3.2" fill="url(#kbach-ruby-gem)" stroke="#FFF8D6" strokeWidth="0.8" />

        {/* Grand Sculpted Blooming Lotus Throne Base (បល្ល័ង្កផ្កាឈូកមាស) */}
        <g transform="translate(140, 262)">
          <ellipse cx="0" cy="6" rx="88" ry="10" fill="url(#kbach-gold-deep)" stroke="#5A3604" strokeWidth="0.9" />
          {[-56, -38, -20, 0, 20, 38, 56].map((deg) => (
            <path
              key={deg}
              d="M0 4 C7 -10 9 -20 0 -30 C-9 -20 -7 -10 0 4 Z"
              fill={deg === 0 ? "#FFF7CC" : "url(#kbach-gold-grad)"}
              stroke="#5A3604"
              strokeWidth="0.7"
              transform={`rotate(${deg} 0 4)`}
            />
          ))}
          <rect x="-96" y="6" width="192" height="7" rx="3" fill="url(#kbach-gold-grad)" stroke="#5A3604" strokeWidth="0.8" />
          <rect x="-112" y="13" width="224" height="6" rx="2" fill="url(#kbach-gold-soft)" />
        </g>
      </g>

      {/* Shimmering Golden Fireflies / Phka Sla Sparks */}
      {[
        { x: 52, y: 82, r: 2 },
        { x: 88, y: 46, r: 1.6 },
        { x: 192, y: 48, r: 2.2 },
        { x: 228, y: 86, r: 1.7 },
        { x: 68, y: 168, r: 1.8 },
        { x: 212, y: 164, r: 2 },
      ].map((sp, i) => (
        <circle
          key={i}
          cx={sp.x}
          cy={sp.y}
          r={sp.r}
          fill="#FFF8D6"
          className="living-gold-spark"
          style={{ animationDelay: `${i * 0.45}s` }}
        />
      ))}
    </svg>
  )
}

/**
 * Ambient synthesized traditional Khmer xylophone/chime melody using Web Audio API
 */
function useTraditionalChimeAudio() {
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<number | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)

  const ensureCtx = () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!ctxRef.current) {
      ctxRef.current = new AudioCtx()
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }

  const playSingleChime = () => {
    try {
      const ctx = ensureCtx()
      const now = ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)
        gain.gain.setValueAtTime(0.001, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.04, now + idx * 0.08 + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.08 + 0.9)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.95)
      })
    } catch {
      // Ignore audio errors if blocked by browser
    }
  }

  const stopAudio = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setPlaying(false)
  }

  const startAudio = () => {
    try {
      const ctx = ensureCtx()
      const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]
      let step = 0
      const pattern = [0, 2, 3, 4, 3, 2, 1, 2, 4, 5, 4, 2]

      const playNote = () => {
        if (!ctxRef.current) return
        const now = ctx.currentTime
        const freq = scale[pattern[step % pattern.length]]
        step += 1

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now)

        gain.gain.setValueAtTime(0.001, now)
        gain.gain.exponentialRampToValueAtTime(0.045, now + 0.04)
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.1)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 1.15)
      }

      if (timerRef.current) window.clearInterval(timerRef.current)
      playNote()
      timerRef.current = window.setInterval(playNote, 650)
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const toggleAudio = () => {
    if (playing) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  return { playing, startAudio, toggleAudio, playSingleChime }
}

export default function App() {
  // Load CMS data from LocalStorage (or default)
  const [cmsData, setCmsData] = useState<WeddingCmsData>(() => {
    try {
      const raw = localStorage.getItem(CMS_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed.gallery)) {
          parsed.gallery = parsed.gallery.map((g: { imageUrl?: string }) =>
            g.imageUrl === "/reference-fourth.avif" ? { ...g, imageUrl: "" } : g,
          )
        }
        return { ...defaultWeddingCmsData, ...parsed }
      }
    } catch {
      // Fallback
    }
    return defaultWeddingCmsData
  })

  // Load RSVPs from LocalStorage
  const [rsvps, setRsvps] = useState<RsvpRecord[]>(() => {
    try {
      const raw = localStorage.getItem(RSVP_STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      // Fallback
    }
    return initialRsvpList
  })

  // Load Wishes from LocalStorage
  const [wishes, setWishes] = useState<WishRecord[]>(() => {
    try {
      const raw = localStorage.getItem(WISHES_STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      // Fallback
    }
    return initialWishesList
  })

  const [cmsOpen, setCmsOpen] = useState(() => {
    if (typeof window === "undefined") return false
    const params = new URLSearchParams(window.location.search)
    const hash = window.location.hash.toLowerCase()
    const path = window.location.pathname.toLowerCase()
    return (
      params.get("cms") === "1" ||
      params.get("admin") === "1" ||
      hash === "#cms" ||
      hash === "#admin" ||
      path.endsWith("/cms") ||
      path.endsWith("/admin")
    )
  })

  const [isClientUrlParam] = useState(() => {
    if (typeof window === "undefined") return false
    const params = new URLSearchParams(window.location.search)
    return params.get("client") === "1" || params.get("preview") === "client"
  })

  // Sync URL hash (#cms) & keyboard shortcut (Ctrl+Shift+A) for Separate CMS Page
  useEffect(() => {
    const syncFromLocation = () => {
      const params = new URLSearchParams(window.location.search)
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      const shouldOpen =
        params.get("cms") === "1" ||
        params.get("admin") === "1" ||
        hash === "#cms" ||
        hash === "#admin" ||
        path.endsWith("/cms") ||
        path.endsWith("/admin")
      setCmsOpen(shouldOpen)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault()
        setCmsOpen((prev) => {
          const next = !prev
          window.history.replaceState(null, "", next ? "#cms" : window.location.pathname + window.location.search)
          return next
        })
      }
    }

    window.addEventListener("hashchange", syncFromLocation)
    window.addEventListener("popstate", syncFromLocation)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("hashchange", syncFromLocation)
      window.removeEventListener("popstate", syncFromLocation)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const openSeparateCmsPage = () => {
    window.history.pushState(null, "", "#cms")
    setCmsOpen(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeSeparateCmsPage = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete("cms")
    params.delete("admin")
    const qs = params.toString()
    const cleanUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}`
    window.history.pushState(null, "", cleanUrl)
    setCmsOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Controller flags controlled from the Separate CMS Page
  const showClientShowcaseBar = Boolean(cmsData.clientShowcaseMode) || isClientUrlParam
  const allowPublicInlineUpload = Boolean(cmsData.allowInlinePhotoUpload) || isClientUrlParam
  const showHostVipGenerator = Boolean(cmsData.showHostLinkGenerator)

  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    id: number
    title: string
    subtitle: string
    poetry: string
    imageUrl: string
  } | null>(null)

  // Quick inline image upload helper
  const handleQuickFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploaded: (dataUrl: string) => void,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onUploaded(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  // Scroll-reveal observer + sticky header detector
  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 48)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )

    const nodes = document.querySelectorAll(".reveal-on-scroll")
    nodes.forEach((n) => observer.observe(n))

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [cmsData.gallery.length])

  const [coverStage, setCoverStage] = useState<"closed" | "unsealing" | "unfolding" | "opened">(
    "closed",
  )
  const coverFrameRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeDay, setActiveDay] = useState<1 | 2>(2)
  const [currencyTab, setCurrencyTab] = useState<"USD" | "KHR">("USD")
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [selectedSwatch, setSelectedSwatch] = useState(0)

  // VIP Invite Link Generator state
  const [customGuestInput, setCustomGuestInput] = useState("")
  const [copiedInviteLink, setCopiedInviteLink] = useState(false)

  // Guestbook form state
  const [wishName, setWishName] = useState("")
  const [wishRelation, setWishRelation] = useState("ភ្ញៀវកិត្តិយស")
  const [wishMessage, setWishMessage] = useState("")

  // RSVP form state
  const [rsvpNameInput, setRsvpNameInput] = useState("")
  const [rsvpPhoneInput, setRsvpPhoneInput] = useState("")
  const [rsvpGuestsInput, setRsvpGuestsInput] = useState("2")
  const [rsvpAttendingInput, setRsvpAttendingInput] = useState<"yes" | "no">("yes")

  const { playing, startAudio, toggleAudio, playSingleChime } = useTraditionalChimeAudio()

  // Persist CMS data, RSVPs, and Wishes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cmsData))
    } catch {
      // Ignore storage quota errors
    }
  }, [cmsData])

  useEffect(() => {
    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvps))
    } catch {
      // Ignore
    }
  }, [rsvps])

  useEffect(() => {
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes))
    } catch {
      // Ignore
    }
  }, [wishes])

  // Read optional ?guest= parameter from URL for personalized Cambodian invitation
  const [guestName, setGuestName] = useState(() => {
    if (typeof window === "undefined") return "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា"
    const params = new URLSearchParams(window.location.search)
    return params.get("guest") || "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា"
  })

  // Live countdown to Wedding Date
  const targetDate = useMemo(() => {
    const parsed = new Date(cmsData.countdownIsoDate).getTime()
    return Number.isNaN(parsed) ? new Date("2026-12-27T07:00:00+07:00").getTime() : parsed
  }, [cmsData.countdownIsoDate])

  const [countdown, setCountdown] = useState({ days: 65, hours: 19, minutes: 40, seconds: 12 })

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now()
      const diff = Math.max(0, targetDate - now)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setCountdown({ days, hours, minutes, seconds })
    }
    updateCountdown()
    const id = window.setInterval(updateCountdown, 1000)
    return () => window.clearInterval(id)
  }, [targetDate])

  const isCoverVisible = cmsData.showCoverSplash && coverStage !== "opened" && !cmsOpen

  useEffect(() => {
    document.body.style.overflow = rsvpOpen || isCoverVisible ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [rsvpOpen, isCoverVisible])

  const handleCoverPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (coverStage !== "closed") return
    const el = coverFrameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty("--tilt-x", `${(-ny * 9).toFixed(2)}deg`)
    el.style.setProperty("--tilt-y", `${(nx * 11).toFixed(2)}deg`)
    el.style.setProperty("--sheen-x", `${((nx + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty("--sheen-y", `${((ny + 0.5) * 100).toFixed(1)}%`)
  }

  const handleCoverPointerLeave = () => {
    const el = coverFrameRef.current
    if (!el) return
    el.style.setProperty("--tilt-x", "0deg")
    el.style.setProperty("--tilt-y", "0deg")
    el.style.setProperty("--sheen-x", "50%")
    el.style.setProperty("--sheen-y", "50%")
  }

  const handleOpenInvitationCover = () => {
    if (coverStage !== "closed") return
    playSingleChime()
    setCoverStage("unsealing")
    window.setTimeout(() => {
      setCoverStage("unfolding")
      startAudio()
    }, 320)
  }

  const handleContinueToFullPage = () => {
    playSingleChime()
    setCoverStage("opened")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCloseBackToCover = () => {
    playSingleChime()
    setCoverStage("closed")
  }

  const handleReplayCover = () => {
    setCoverStage("closed")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeMenu = () => setMenuOpen(false)

  const copyAccountNumber = () => {
    const acc =
      currencyTab === "USD"
        ? `${cmsData.usdAccountNumber} (${cmsData.accountHolder})`
        : `${cmsData.khrAccountNumber} (${cmsData.accountHolder})`
    navigator.clipboard?.writeText(acc)
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2500)
  }

  const handleGenerateGuestLink = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = customGuestInput.trim() || "ឯកឧត្តម សុខា និង លោកជំទាវ"
    setGuestName(cleanName)
    const url = `${window.location.origin}${window.location.pathname}?guest=${encodeURIComponent(cleanName)}`
    navigator.clipboard?.writeText(url)
    setCopiedInviteLink(true)
    setTimeout(() => setCopiedInviteLink(false), 3000)
  }

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wishName.trim() || !wishMessage.trim()) return
    setWishes([
      {
        id: `w-${Date.now()}`,
        name: wishName.trim(),
        relation: wishRelation,
        message: wishMessage.trim(),
        time: "អម្បាញ់មិញនេះ",
      },
      ...wishes,
    ])
    setWishName("")
    setWishMessage("")
    playSingleChime()
  }

  const handleRsvpSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const finalName =
      rsvpNameInput.trim() ||
      (guestName !== "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា" ? guestName : "ភ្ញៀវកិត្តិយស")
    const newRsvp: RsvpRecord = {
      id: `r-${Date.now()}`,
      name: finalName,
      phone: rsvpPhoneInput.trim(),
      guests: Number(rsvpGuestsInput) || 1,
      attending: rsvpAttendingInput,
      createdAt: "អម្បាញ់មិញនេះ",
    }
    setRsvps([newRsvp, ...rsvps])
    setSubmitted(true)
    playSingleChime()
  }

  const addToCalendar = () => {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20261227T000000Z",
      "DTEND:20261227T140000Z",
      `SUMMARY:ពិធីមង្គលការរបស់ ${cmsData.shortGroom} និង ${cmsData.shortBride}`,
      `LOCATION:${cmsData.venueNameKhmer}`,
      "DESCRIPTION:សូមគោរពអញ្ជើញចូលរួមពិធីមង្គលការរបស់យើងខ្ញុំ",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n")
    const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "cambodian-wedding-invite.ics"
    link.click()
    URL.revokeObjectURL(url)
  }

  const activeQrImage = currencyTab === "USD" ? cmsData.usdQrImageUrl : cmsData.khrQrImageUrl

  // ===== SEPARATE DEDICATED CMS PAGE (Completely separate from the Public Guest Invitation Page) =====
  if (cmsOpen) {
    return (
      <main className={`wedding-app cms-standalone-root theme-${cmsData.themePreset}`}>
        <GoldSvgDefs />
        <CmsStudioDrawer
          open={true}
          onClose={closeSeparateCmsPage}
          data={cmsData}
          onChange={setCmsData}
          rsvps={rsvps}
          onDeleteRsvp={(id) => setRsvps(rsvps.filter((r) => r.id !== id))}
          wishes={wishes}
          onDeleteWish={(id) => setWishes(wishes.filter((w) => w.id !== id))}
          onSelectGuestPreview={(name) => setGuestName(name)}
        />
      </main>
    )
  }

  return (
    <main
      className={`wedding-app theme-${cmsData.themePreset} tpl-${
        cmsData.templateStyle || "classic-kbach"
      } ${showClientShowcaseBar ? "has-client-bar" : "is-clean-guest-view"}`}
    >
      <GoldSvgDefs />
      {cmsData.showFloatingPetals && <GoldenPetalCanvas />}

      {/* ===== FULLSCREEN 3-GRID TRI-FOLD GATEFOLD INVITATION COVER ===== */}
      <div
        className={`royal-cover-overlay trifold-cover-overlay stage-${coverStage} ${
          !isCoverVisible ? "is-dismissed" : ""
        }`}
        aria-hidden={!isCoverVisible}
      >
        <div
          ref={coverFrameRef}
          className="trifold-cover-wrapper"
          onPointerMove={handleCoverPointerMove}
          onPointerLeave={handleCoverPointerLeave}
        >
          <p className="trifold-cover-top-hint">
            {coverStage === "closed"
              ? "សូមចុចលើត្រាមាស ដើម្បីបើកសន្លឹកធៀបការអញ្ជើញ"
              : "សូមចុច «អានសំបុត្រផ្លូវការ» ដើម្បីមើលព័ត៌មានលម្អិតទាំងអស់"}
          </p>

          <div
            className={`trifold-stage trifold-cover-stage ${
              coverStage === "unfolding" ? "is-open" : "is-closed"
            } ${coverStage === "unsealing" ? "is-unsealing" : ""}`}
          >
            {/* COLUMN 1 (LEFT WING): Closed Left Flap (Image 1) -> Opens Left to show Groom & Lunar Date */}
            <div className="trifold-wing trifold-wing-left">
              <div className="trifold-wing-front" onClick={handleOpenInvitationCover}>
                <KbachCorner position="tl" className="gf-panel-corner" />
                <KbachCorner position="bl" className="gf-panel-corner" />
              </div>
              <div className="trifold-wing-inside damask-surface">
                <KbachCorner position="tl" className="gf-corner" />
                <KbachCorner position="bl" className="gf-corner" />
                <div className="trifold-wing-copy">
                  <span className="trifold-side-kicker">មាតាបិតាខាងកូនប្រុស</span>
                  <h4>{cmsData.groomFather}</h4>
                  <h4>{cmsData.groomMother}</h4>
                  <div className="trifold-wing-divider" />
                  <span className="trifold-side-kicker">កូនប្រុសនាម</span>
                  <strong className="trifold-side-name">{cmsData.groomKhmer}</strong>
                  <small>{cmsData.groomLatin}</small>
                  <div className="trifold-wing-divider" />
                  <p className="trifold-side-note">{cmsData.lunarDateFull}</p>
                </div>
              </div>
            </div>

            {/* COLUMN 2 (CENTER PANEL): Stays in Center showing Invitation Info (Exact Match to Image 2) */}
            <div className="trifold-center damask-surface">
              <KbachCorner position="tl" className="gf-corner" />
              <KbachCorner position="tr" className="gf-corner" />
              <KbachCorner position="bl" className="gf-corner" />
              <KbachCorner position="br" className="gf-corner" />

              <small className="gf-kicker">សិរីមង្គលអាពាហ៍ពិពាហ៍</small>
              <p className="gf-guest">សូមគោរពជូន៖ {guestName}</p>
              <h2>
                {cmsData.shortGroom} <i>&</i> {cmsData.shortBride}
              </h2>
              <p className="gf-desc">
                មានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងពិធីមង្គលការរបស់យើងខ្ញុំ
              </p>
              <strong>{cmsData.solarDateDisplay}</strong>

              <div className="gf-actions">
                <button
                  type="button"
                  className="gf-link"
                  onClick={handleContinueToFullPage}
                >
                  អានសំបុត្រផ្លូវការ
                </button>
                <button
                  type="button"
                  className="gf-close-btn"
                  onClick={handleCloseBackToCover}
                >
                  បិទសំបុត្រវិញ
                </button>
              </div>
            </div>

            {/* COLUMN 3 (RIGHT WING): Closed Right Flap (Image 1) -> Opens Right to show Bride & Venue */}
            <div className="trifold-wing trifold-wing-right">
              <div className="trifold-wing-front" onClick={handleOpenInvitationCover}>
                <KbachCorner position="tr" className="gf-panel-corner" />
                <KbachCorner position="br" className="gf-panel-corner" />
              </div>
              <div className="trifold-wing-inside damask-surface">
                <KbachCorner position="tr" className="gf-corner" />
                <KbachCorner position="br" className="gf-corner" />
                <div className="trifold-wing-copy">
                  <span className="trifold-side-kicker">មាតាបិតាខាងកូនស្រី</span>
                  <h4>{cmsData.brideFather}</h4>
                  <h4>{cmsData.brideMother}</h4>
                  <div className="trifold-wing-divider" />
                  <span className="trifold-side-kicker">កូនស្រីនាម</span>
                  <strong className="trifold-side-name">{cmsData.brideKhmer}</strong>
                  <small>{cmsData.brideLatin}</small>
                  <div className="trifold-wing-divider" />
                  <p className="trifold-side-note">
                    {cmsData.venueHallKhmer} • {cmsData.ceremonyTimeDisplay}
                  </p>
                </div>
              </div>
            </div>

            {/* CENTER GOLDEN SUNBURST MONOGRAM SEAL & SILK RIBBON (Image 1 Closed State) */}
            <button
              type="button"
              className="medallion trifold-medallion"
              onClick={handleOpenInvitationCover}
              aria-label="បើកសំបុត្រ"
            >
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="46" className="m-ring" />
                {Array.from({ length: 16 }, (_, i) => (
                  <path
                    key={i}
                    d="M50 6 L55 28 L50 34 L45 28Z"
                    transform={`rotate(${i * 22.5} 50 50)`}
                  />
                ))}
                <circle cx="50" cy="50" r="22" className="m-core" />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fill="#5d0711"
                  fontFamily="Moul, serif"
                  fontSize="11"
                >
                  {cmsData.monogramLeft} & {cmsData.monogramRight}
                </text>
              </svg>
            </button>

            <div className="ribbon trifold-ribbon" onClick={handleOpenInvitationCover}>
              <span className="buckle">
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                  <path d="M8 1 L15 8 L8 15 L1 8 Z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back-to-CMS Button (ONLY visible when Client Showcase Mode is enabled in CMS) */}
      {showClientShowcaseBar && (
        <button
          type="button"
          className="cms-fab"
          onClick={openSeparateCmsPage}
          aria-label="ត្រឡប់ទៅទំព័រគ្រប់គ្រងធៀបការ (Back to CMS Page)"
        >
          <span className="cms-fab-dot" />
          <SvgSettingsIcon />
          <span>ត្រឡប់ទៅទំព័រ CMS (Controller)</span>
        </button>
      )}

      {/* Floating Traditional Music Toggle Button (Bottom Right) */}
      <button
        type="button"
        className={`music-fab ${playing ? "is-playing" : ""}`}
        onClick={toggleAudio}
        aria-label={playing ? "បិទភ្លេងប្រពៃណី" : "បើកភ្លេងប្រពៃណី"}
        title={playing ? "បិទភ្លេងប្រពៃណី" : "បើកភ្លេងប្រពៃណី"}
      >
        <span className="music-fab-icon">
          <SvgMusicIcon />
        </span>
        <span className="music-fab-label">{playing ? "ភ្លេងការខ្មែរ" : "បើកភ្លេង"}</span>
      </button>

      {/* ===== FLOATING TEMPLATE STYLE SWITCHER PILL BAR (ONLY visible when Client Showcase Mode is ON in CMS) ===== */}
      {showClientShowcaseBar && (
        <div className="template-switcher-bar" role="region" aria-label="ជ្រើសរើសម៉ូតធៀបការសម្រាប់បង្ហាញអតិថិជន">
          <span className="ts-label">បង្ហាញជូនអតិថិជន (Client Showcase):</span>
          <div className="ts-pills">
            <button
              type="button"
              className="replay-cover-pill"
              onClick={handleReplayCover}
            >
              បើកស្រោមធៀបការម្តងទៀត
            </button>
            <button
              type="button"
              className={cmsData.templateStyle === "classic-kbach" || !cmsData.templateStyle ? "is-active" : ""}
              onClick={() => setCmsData((prev) => ({ ...prev, templateStyle: "classic-kbach" }))}
            >
              ១. ក្បាច់ភ្ញីទេសមាស & ផ្ការំដួល
            </button>
            <button
              type="button"
              className={cmsData.templateStyle === "popup-palace" ? "is-active" : ""}
              onClick={() => setCmsData((prev) => ({ ...prev, templateStyle: "popup-palace" }))}
            >
              ២. ប្រអប់ប្រាសាទផុស 3D
            </button>
            <button
              type="button"
              className={cmsData.templateStyle === "olive-foil-2026" ? "is-active" : ""}
              onClick={() => setCmsData((prev) => ({ ...prev, templateStyle: "olive-foil-2026" }))}
            >
              ៣. ម៉ូតថ្មី 2026 បៃតងទឹកមាស
            </button>
            <button
              type="button"
              className={cmsData.templateStyle === "jasmine-arch" ? "is-active" : ""}
              onClick={() => setCmsData((prev) => ({ ...prev, templateStyle: "jasmine-arch" }))}
            >
              ៤. ស៊ុមវាំងននសូត្រ & ផ្កាកុលាបស
            </button>
          </div>
        </div>
      )}

      {/* ===== DYNAMIC KHMER TEMPLATE SHOWCASE (Matches Uploaded Real Reference Photos) ===== */}
      <div id="home">
        {cmsData.templateStyle === "popup-palace" && (
          <PopupPalaceTemplate
            cmsData={cmsData}
            guestName={guestName}
            countdown={countdown}
            onOpenRsvp={() => setRsvpOpen(true)}
            onAddToCalendar={addToCalendar}
            onUploadImage={handleQuickFileUpload}
            onUpdateCms={(patch) => setCmsData((prev) => ({ ...prev, ...patch }))}
          />
        )}

        {cmsData.templateStyle === "olive-foil-2026" && (
          <OliveFoil2026Template
            cmsData={cmsData}
            guestName={guestName}
            countdown={countdown}
            onOpenRsvp={() => setRsvpOpen(true)}
            onAddToCalendar={addToCalendar}
            onUploadImage={handleQuickFileUpload}
            onUpdateCms={(patch) => setCmsData((prev) => ({ ...prev, ...patch }))}
          />
        )}

        {cmsData.templateStyle === "jasmine-arch" && (
          <JasmineArchTemplate
            cmsData={cmsData}
            guestName={guestName}
            countdown={countdown}
            onOpenRsvp={() => setRsvpOpen(true)}
            onAddToCalendar={addToCalendar}
            onUploadImage={handleQuickFileUpload}
            onUpdateCms={(patch) => setCmsData((prev) => ({ ...prev, ...patch }))}
          />
        )}
      </div>

      {/* ===== HERO SECTION (Shown when Classic Royal Kbach is active) ===== */}
      {(cmsData.templateStyle === "classic-kbach" || !cmsData.templateStyle) && (
        <section className="hero">
          <div className="section-container">
            <KbachLuxuryFrame variant="damask" showCenterCrests className="hero-luxury-frame">
              <div className="hero-content reveal-on-scroll is-visible">
                <p className="eyebrow">សិរីសួស្តី អាពាហ៍ពិពាហ៍ • ប្រពៃណីខ្មែរ</p>
                <Flourish />
                <article className="pop-card damask-surface">
                  <div className="hero-banner-stage">
                    {cmsData.heroBannerImageUrl ? (
                      <div className="hero-custom-banner">
                        <img
                          src={cmsData.heroBannerImageUrl}
                          alt={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
                        />
                      </div>
                    ) : (
                      <TempleScene />
                    )}
                    {allowPublicInlineUpload && (
                      <label className="quick-photo-upload-chip hero-upload-chip" title="ប្តូររូបភាពទំព័រដើម">
                        <SvgCameraIcon />
                        <span>ប្តូររូបភាព</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleQuickFileUpload(e, (url) =>
                              setCmsData((prev) => ({ ...prev, heroBannerImageUrl: url })),
                            )
                          }
                        />
                      </label>
                    )}
                  </div>
                  <div className="pop-paper">
                    <p className="invitation-line">យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ</p>
                    <h1>
                      <span>{cmsData.shortGroom}</span>
                      <b>&</b>
                      <span>{cmsData.shortBride}</span>
                    </h1>
                    <p className="hero-subtitle">ចូលរួមជាសក្ខីភាពនៃសេចក្តីស្រឡាញ់ និងពរជ័យសិរីមង្គល</p>
                    <div className="hero-date">
                      <span>{cmsData.dayOfWeekKhmer}</span>
                      <strong>{cmsData.dayNumberKhmer}</strong>
                      <span>{cmsData.monthYearKhmer}</span>
                    </div>
                  </div>
                </article>

                <div className="hero-cta-row">
                  <button className="gold-button" onClick={() => setRsvpOpen(true)}>
                    បញ្ជាក់ការចូលរួម (RSVP)
                  </button>
                  <a href="#invitation" className="outline-button dark-outline">
                    មើលសំបុត្រអញ្ជើញផ្លូវការ
                  </a>
                </div>
              </div>
            </KbachLuxuryFrame>
          </div>
        </section>
      )}

      {/* ===== AUTHENTIC CAMBODIAN FORMAL INVITATION CARD + VIP PASS GENERATOR ===== */}
      <section className="formal-invitation-section" id="invitation">
        <div className="section-container reveal-on-scroll">
          <KbachLuxuryFrame variant="damask" showCenterCrests>
            <div className="khmer-card-inner">
              <p className="khmer-card-motto">សិរីមង្គលអាពាហ៍ពិពាហ៍</p>
              <Flourish />

              {/* Personalized Guest Name Banner */}
              <div className="vip-guest-ribbon">
                <small>សូមគោរពជូនភ្ញៀវកិត្តិយស</small>
                <strong>{guestName}</strong>
              </div>

              {/* Both Parents' Names (មាតាបិតាទាំងសងខាង) */}
              <div className="parents-grid">
                <div className="parent-column">
                  <span className="parent-side-label">មាតាបិតាខាងកូនប្រុស</span>
                  <h3>{cmsData.groomFather}</h3>
                  <h3>{cmsData.groomMother}</h3>
                </div>

                <div className="parents-center-emblem" aria-hidden="true">
                  <div className="emblem-circle">
                    <span>
                      {cmsData.monogramLeft} & {cmsData.monogramRight}
                    </span>
                  </div>
                </div>

                <div className="parent-column">
                  <span className="parent-side-label">មាតាបិតាខាងកូនស្រី</span>
                  <h3>{cmsData.brideFather}</h3>
                  <h3>{cmsData.brideMother}</h3>
                </div>
              </div>

              {/* Formal Honorific Invitation Paragraph */}
              <div className="formal-honorific-block">
                <h2 className="formal-heading">មានកិត្តិយសសូមគោរពអញ្ជើញ</h2>
                <p className="formal-paragraph">
                  សម្តេច ទ្រង់ ឯកឧត្តម អ្នកឧកញ៉ា ឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា
                  អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល
                  ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំទាំងពីរ៖
                </p>
              </div>

              {/* Groom & Bride Names + Portrait Medallion Showcase */}
              <div className="couple-showcase-grid">
                <div className="couple-box">
                  <div className="couple-avatar-frame">
                    {cmsData.groomAvatarUrl ? (
                      <img src={cmsData.groomAvatarUrl} alt={cmsData.groomKhmer} />
                    ) : (
                      <svg viewBox="0 0 120 120" className="couple-royal-portrait-svg" aria-hidden="true">
                        <g filter="url(#kbach-emboss)">
                          <circle cx="60" cy="60" r="54" fill="#320308" stroke="url(#kbach-gold-grad)" strokeWidth="2.2" />
                          <circle cx="60" cy="60" r="46" fill="none" stroke="url(#kbach-gold-soft)" strokeWidth="0.9" strokeDasharray="3 2" />
                          {/* Sculpted Khmer Royal Groom Bust in Ao Phamuong */}
                          <circle cx="60" cy="46" r="15" fill="url(#kbach-gold-grad)" />
                          <path d="M47 40 C50 26 70 26 73 40 Z" fill="#FFF5C0" />
                          <path
                            d="M32 98 C34 72 44 64 60 64 C76 64 86 72 88 98 Z"
                            fill="url(#kbach-gold-grad)"
                            stroke="#5A3604"
                            strokeWidth="0.8"
                          />
                          <path d="M48 65 L60 82 L72 65" fill="none" stroke="#FFF9D6" strokeWidth="1.8" />
                          <circle cx="60" cy="82" r="3" fill="url(#kbach-ruby-gem)" />
                        </g>
                      </svg>
                    )}
                    {allowPublicInlineUpload && (
                      <label className="avatar-upload-badge" title="ដាក់រូបកូនកំលោះ">
                        <SvgCameraIcon />
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleQuickFileUpload(e, (url) =>
                              setCmsData((prev) => ({ ...prev, groomAvatarUrl: url })),
                            )
                          }
                        />
                      </label>
                    )}
                  </div>
                  <span className="couple-role">កូនប្រុសនាម</span>
                  <h3 className="couple-khmer-name">{cmsData.groomKhmer}</h3>
                  <p className="couple-latin-name">{cmsData.groomLatin}</p>
                </div>

                <div className="couple-union-symbol" aria-hidden="true">
                  <div className="union-heart-ring">
                    <span>ជាគូនឹង</span>
                    <svg viewBox="0 0 64 64" width="44" height="44" className="union-royal-emblem-svg">
                      <g filter="url(#kbach-emboss)" transform="translate(32,32)">
                        {Array.from({ length: 8 }, (_, i) => (
                          <path
                            key={i}
                            d="M0 -4 C5 -14 8 -20 0 -26 C-8 -20 -5 -14 0 -4 Z"
                            fill="url(#kbach-gold-grad)"
                            stroke="#684107"
                            strokeWidth="0.6"
                            transform={`rotate(${i * 45})`}
                          />
                        ))}
                        <circle cx="0" cy="0" r="8" fill="url(#kbach-ruby-gem)" stroke="#FFF6C4" strokeWidth="1" />
                        <circle cx="-2" cy="-2" r="2.2" fill="#FFFDF0" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="couple-box">
                  <div className="couple-avatar-frame">
                    {cmsData.brideAvatarUrl ? (
                      <img src={cmsData.brideAvatarUrl} alt={cmsData.brideKhmer} />
                    ) : (
                      <svg viewBox="0 0 120 120" className="couple-royal-portrait-svg" aria-hidden="true">
                        <g filter="url(#kbach-emboss)">
                          <circle cx="60" cy="60" r="54" fill="#320308" stroke="url(#kbach-gold-grad)" strokeWidth="2.2" />
                          <circle cx="60" cy="60" r="46" fill="none" stroke="url(#kbach-gold-soft)" strokeWidth="0.9" strokeDasharray="3 2" />
                          {/* Sculpted Khmer Royal Bride Bust with Mokot Spire Crown & Sabai */}
                          <path
                            d="M49 42 L60 12 L71 42 Z"
                            fill="url(#kbach-gold-grad)"
                            stroke="#FFF8D6"
                            strokeWidth="0.8"
                          />
                          <circle cx="60" cy="49" r="14" fill="url(#kbach-gold-soft)" />
                          <path
                            d="M34 98 C36 74 46 66 60 66 C74 66 84 74 86 98 Z"
                            fill="url(#kbach-gold-soft)"
                            stroke="#5A3604"
                            strokeWidth="0.8"
                          />
                          {/* Draped Golden Sabai Sash */}
                          <path d="M42 67 L78 98 H56 L38 76 Z" fill="url(#kbach-gold-grad)" />
                          <circle cx="60" cy="32" r="2.8" fill="url(#kbach-ruby-gem)" />
                        </g>
                      </svg>
                    )}
                    {allowPublicInlineUpload && (
                      <label className="avatar-upload-badge" title="ដាក់រូបកូនក្រមុំ">
                        <SvgCameraIcon />
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleQuickFileUpload(e, (url) =>
                              setCmsData((prev) => ({ ...prev, brideAvatarUrl: url })),
                            )
                          }
                        />
                      </label>
                    )}
                  </div>
                  <span className="couple-role">កូនស្រីនាម</span>
                  <h3 className="couple-khmer-name">{cmsData.brideKhmer}</h3>
                  <p className="couple-latin-name">{cmsData.brideLatin}</p>
                </div>
              </div>

              {/* Lunar & Solar Date + Venue Box */}
              <div className="lunar-date-banner">
                <p className="lunar-text">
                  ដែលនឹងប្រព្រឹត្តទៅនៅ <strong>{cmsData.lunarDateFull}</strong>
                </p>
                <p className="solar-text">
                  ត្រូវនឹង <strong>{cmsData.solarDateDisplay}</strong> វេលាម៉ោង{" "}
                  <strong>{cmsData.ceremonyTimeDisplay}</strong>
                </p>
                <p className="venue-highlight">
                  នៅមជ្ឈមណ្ឌល សន្និបាត និងពិព័រណ៍ <strong>{cmsData.venueHallKhmer}</strong>
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="countdown-wrapper" aria-label="រាប់ថយក្រោយទៅកាន់ថ្ងៃមង្គលការ">
                <p className="countdown-title">រាប់ថយក្រោយទៅកាន់ថ្ងៃមង្គលជ័យ</p>
                <div className="countdown-grid">
                  <div className="countdown-cell">
                    <strong>{toKhmerNum(countdown.days)}</strong>
                    <span>ថ្ងៃ (Days)</span>
                  </div>
                  <div className="countdown-cell">
                    <strong>{toKhmerNum(countdown.hours)}</strong>
                    <span>ម៉ោង (Hours)</span>
                  </div>
                  <div className="countdown-cell">
                    <strong>{toKhmerNum(countdown.minutes)}</strong>
                    <span>នាទី (Mins)</span>
                  </div>
                  <div className="countdown-cell">
                    <strong>{toKhmerNum(countdown.seconds)}</strong>
                    <span>វិនាទី (Secs)</span>
                  </div>
                </div>
              </div>

              <div className="formal-card-actions">
                <button className="gold-button" onClick={() => setRsvpOpen(true)}>
                  ឆ្លើយតបការអញ្ជើញ
                </button>
                <button className="outline-button dark-outline" onClick={addToCalendar}>
                  រក្សាទុកក្នុងប្រតិទិន
                </button>
              </div>

              {/* CREATIVE FEATURE: Host Tool to Generate Personalized Guest Links (Controlled from CMS) */}
              {showHostVipGenerator && (
                <div className="vip-link-generator">
                  <p className="vip-gen-title">
                    បង្កើតតំណភ្ជាប់ធៀបការផ្ទាល់ខ្លួនជូនភ្ញៀវ (Personalize Guest Link)
                  </p>
                  <form className="vip-gen-form" onSubmit={handleGenerateGuestLink}>
                    <input
                      type="text"
                      value={customGuestInput}
                      onChange={(e) => setCustomGuestInput(e.target.value)}
                      placeholder="វាយឈ្មោះភ្ញៀវ ឧ. ឯកឧត្តម សុខា និង លោកជំទាវ..."
                    />
                    <button type="submit" className="vip-gen-btn">
                      {copiedInviteLink ? "បានចម្លងតំណភ្ជាប់រួចរាល់" : "ប្តូរឈ្មោះ និងចម្លង Link"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </KbachLuxuryFrame>
        </div>
      </section>

      {/* ===== CREATIVE FEATURE: INTERACTIVE SACRED POPIL CANDLE BLESSING RITUAL ===== */}
      <PopilBlessingRitual
        coupleLabel={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
        onPlayChime={playSingleChime}
      />

      {/* ===== 2-DAY CAMBODIAN CEREMONY SCHEDULE ===== */}
      <section className="schedule-section" id="schedule">
        <div className="section-container reveal-on-scroll">
          <KbachLuxuryFrame variant="damask" showCenterCrests>
            <div className="schedule-heading">
              <p className="section-kicker">កាលវិភាគពិធីប្រពៃណីខ្មែរ</p>
              <h2>កម្មវិធីមង្គលការ</h2>
              <Flourish />
              <p>សូមមេត្តាអញ្ជើញមកដល់តាមកម្មវិធីដូចខាងក្រោម ដើម្បីញ៉ាំងពិធីឱ្យកាន់តែអធិកអធម</p>

              {/* Day 1 & Day 2 Switcher Tabs */}
              <div className="schedule-tabs" role="tablist" aria-label="ជ្រើសរើសថ្ងៃកម្មវិធី">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDay === 1}
                  className={`schedule-tab ${activeDay === 1 ? "is-active" : ""}`}
                  onClick={() => setActiveDay(1)}
                >
                  <small>{cmsData.dayOneLabel}</small>
                  <strong>ពិធីសូត្រមន្ត (Day 1)</strong>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDay === 2}
                  className={`schedule-tab ${activeDay === 2 ? "is-active" : ""}`}
                  onClick={() => setActiveDay(2)}
                >
                  <small>{cmsData.dayTwoLabel}</small>
                  <strong>ពិធីមង្គលការ (Main Day)</strong>
                </button>
              </div>
            </div>

            <div className="timeline" key={activeDay}>
              {(activeDay === 1 ? cmsData.dayOneEvents : cmsData.dayTwoEvents).map(
                (event, index) => (
                  <article
                    className="event stagger-item"
                    key={event.id}
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="event-time">
                      <strong>{event.time}</strong>
                      <span>{event.period}</span>
                    </div>
                    <div className="timeline-mark">
                      <i>{toKhmerNum(index + 1)}</i>
                    </div>
                    <div className="event-copy">
                      <div className="event-title-row">
                        <CeremonyIcon type={event.icon} />
                        <div>
                          <span className="event-en-sub">{event.subtitle}</span>
                          <h3>{event.title}</h3>
                        </div>
                      </div>
                      <p>{event.detail}</p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </KbachLuxuryFrame>
        </div>
      </section>

      {/* ===== KHMER SILK (ហូលផាមួង) DRESS CODE & COLOR PALETTE SHOWCASE ===== */}
      <section className="dresscode-section" id="dresscode">
        <div className="section-container reveal-on-scroll">
          <KbachLuxuryFrame variant="damask" showCenterCrests={false} className="dresscode-kbach-wrapper">
            <div className="section-header-center">
              <p className="section-kicker">ពណ៌សម្លៀកបំពាក់លើករាសី • Royal Dress Code</p>
              <h2>ពណ៌ហូលផាមួង និងសម្លៀកបំពាក់មង្គល</h2>
              <Flourish />
              <p className="section-subcopy">
                ដើម្បីញ៉ាំងបរិយាកាសពិធីមង្គលការឱ្យកាន់តែស្រស់ត្រកាលតាមបែបប្រពៃណីខ្មែរ
                សូមភ្ញៀវកិត្តិយសជ្រើសរើសពណ៌សម្លៀកបំពាក់មង្គលដូចខាងក្រោម៖
              </p>
            </div>

            <div className="swatch-Interactive-box">
              <div className="swatch-row">
                {dressSwatches.map((s, idx) => (
                  <button
                    key={s.name}
                    type="button"
                    className={`silk-swatch-card ${selectedSwatch === idx ? "is-selected" : ""}`}
                    onClick={() => setSelectedSwatch(idx)}
                  >
                    <span
                      className="silk-swatch-circle"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${s.accent}, ${s.hex})`,
                      }}
                    />
                    <strong>{s.khmer}</strong>
                    <small>{s.name}</small>
                  </button>
                ))}
              </div>

              <div
                className="silk-preview-banner"
                style={{
                  background: `linear-gradient(135deg, ${dressSwatches[selectedSwatch].hex}, #280206)`,
                }}
              >
                <div className="silk-preview-text">
                  <span>ពណ៌ដែលបានជ្រើសរើស • Selected Silk Tone</span>
                  <h3>{dressSwatches[selectedSwatch].khmer}</h3>
                  <p>
                    សម្លៀកបំពាក់ប្រពៃណីខ្មែរ (ហូល ផាមួង ក្បិន) ឬឈុតសម្លៀកបំពាក់ផ្លូវការ (Formal Evening Gown / Suit)
                  </p>
                </div>
                <div className="silk-code-chip">{dressSwatches[selectedSwatch].hex}</div>
              </div>
            </div>
          </KbachLuxuryFrame>
        </div>
      </section>

      {/* ===== PRE-WEDDING GALLERY IN ROYAL KHMER SANCTUARY & ARCHED KBACH GOLD FRAMES ===== */}
      <section className="gallery-section" id="gallery">
        <div className="section-container reveal-on-scroll">
          <KbachLuxuryFrame variant="damask" showCenterCrests className="gallery-kbach-sanctuary">
            <div className="section-header-center">
              <p className="section-kicker">កម្រងរូបភាពអនុស្សាវរីយ៍ • Pre-Wedding Royal Gallery</p>
              <h2>រូបភាពមុនថ្ងៃមង្គលការ</h2>
              <Flourish />
              <p className="section-subcopy">
                រាល់ស្នាមញញឹម និងកាយវិការដ៏ផ្អែមល្ហែម ក្នុងឈុតសម្លៀកបំពាក់ប្រពៃណីជាតិខ្មែរដ៏ឧត្តុង្គឧត្តម
              </p>
            </div>

            <div className="gallery-grid">
              {cmsData.gallery.map((item, idx) => {
                const hasCustomPhoto =
                  Boolean(item.imageUrl) && item.imageUrl !== "/reference-fourth.avif"
                return (
                  <article
                    key={item.id}
                    className={`gallery-card ${idx === 1 ? "is-centerpiece" : ""}`}
                  >
                    <div className="gallery-frame-outer">
                      <KbachCorner position="tl" className="gallery-kbach" />
                      <KbachCorner position="tr" className="gallery-kbach" />
                      <KbachCorner position="bl" className="gallery-kbach" />
                      <KbachCorner position="br" className="gallery-kbach" />

                      {/* Top Royal Chapter Ribbon Badge (Cleanly separated from corner ornaments) */}
                      <div className="gallery-chapter-ribbon">
                        <span className="gallery-ribbon-gem" aria-hidden="true" />
                        <span className="gallery-tag">{item.tag}</span>
                        <span className="gallery-ribbon-gem" aria-hidden="true" />
                      </div>

                      {/* Recessed Sculpted 24K Gold Arched Portrait Stage */}
                      <div
                        className="gallery-portrait-stage"
                        onClick={() => hasCustomPhoto && setLightboxPhoto(item)}
                        style={{
                          cursor: hasCustomPhoto ? "zoom-in" : "default",
                          background: hasCustomPhoto
                            ? `linear-gradient(180deg, rgba(20, 2, 5, 0.08) 0%, rgba(20, 2, 5, 0.55) 100%), url(${item.imageUrl}) center / cover no-repeat`
                            : item.gradient,
                        }}
                      >
                        <div className="gallery-portrait-inner-rim" aria-hidden="true" />

                        {!hasCustomPhoto && (
                          <div className="gallery-masterpiece-wrap">
                            <GalleryMasterpieceArt sceneIndex={idx} />
                          </div>
                        )}

                        {/* Direct on-card Photo Upload & Lightbox Controls */}
                        {(allowPublicInlineUpload || hasCustomPhoto) && (
                          <div
                            className="gallery-card-toolbar"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {allowPublicInlineUpload && (
                              <label
                                className="quick-photo-upload-chip"
                                title="ប្តូររូបភាពក្នុងស៊ុមនេះ"
                              >
                                <SvgCameraIcon />
                                <span>ប្តូររូប</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  onChange={(e) =>
                                    handleQuickFileUpload(e, (url) => {
                                      const next = cmsData.gallery.map((g) =>
                                        g.id === item.id ? { ...g, imageUrl: url } : g,
                                      )
                                      setCmsData((prev) => ({ ...prev, gallery: next }))
                                    })
                                  }
                                />
                              </label>
                            )}
                            {hasCustomPhoto && (
                              <button
                                type="button"
                                className="quick-photo-upload-chip"
                                onClick={() => setLightboxPhoto(item)}
                                title="មើលរូបធំ"
                              >
                                <SvgExpandIcon />
                                <span>មើលរូបធំ</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Engraved Royal Plaque Footer */}
                      <div className="gallery-plaque-footer">
                        <div className="gallery-plaque-divider" aria-hidden="true">
                          <span />
                          <i />
                          <span />
                        </div>
                        <h3>{item.title}</h3>
                        <p className="gallery-subtitle">{item.subtitle}</p>
                        <blockquote className="gallery-poetry">“{item.poetry}”</blockquote>
                      </div>
                    </div>
                  </article>
                )
              })}

              {/* Direct Add New Photo Frame Card (ONLY visible when Inline Photo Upload is ON in CMS) */}
              {allowPublicInlineUpload && (
                <label className="gallery-add-frame-card" title="បន្ថែមរូបភាព Pre-Wedding ថ្មី">
                  <div className="gallery-add-inner">
                    <span className="gallery-add-plus">+</span>
                    <strong>បន្ថែមរូបភាពថ្មី</strong>
                    <small>ចុចជ្រើសរើសរូបភាពពីទូរស័ព្ទ ឬកុំព្យូទ័រ</small>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleQuickFileUpload(e, (url) => {
                        const nextId =
                          cmsData.gallery.reduce((max, g) => Math.max(max, g.id), 0) + 1
                        setCmsData((prev) => ({
                          ...prev,
                          gallery: [
                            ...prev.gallery,
                            {
                              id: nextId,
                              title: `កម្រងរូបភាពទី ${toKhmerNum(nextId)}`,
                              subtitle: "អនុស្សាវរីយ៍ថ្ងៃមង្គលជ័យ",
                              poetry: "ស្នេហាស្មោះស្ម័គ្រ ភ្ជាប់និស្ស័យគូព្រេងមិនប្រែប្រួល",
                              tag: `Chapter ${nextId} • Royal Portrait`,
                              imageUrl: url,
                              gradient:
                                "radial-gradient(circle at 50% 35%, #8f1d28 0%, #42060c 60%, #1c0104 100%)",
                            },
                          ],
                        }))
                      })
                    }
                  />
                </label>
              )}
            </div>
          </KbachLuxuryFrame>
        </div>
      </section>

      {/* ===== DIGITAL GIFT (ចងដៃតាម QR / ABA KHQR) & GUEST WISHING WALL (សារជូនពរ) ===== */}
      <section className="blessings-section" id="blessings">
        <div className="section-container reveal-on-scroll">
          <div className="blessings-grid">
            {/* Left Column: Digital Gift / ចងដៃតាមរយៈ QR */}
            <KbachLuxuryFrame variant="damask" showCenterCrests={false} className="gift-frame">
              <div className="gift-card-content">
                <p className="section-kicker">ចងដៃអនឡាញ • Digital Gift</p>
                <h2>ចងដៃតាមរយៈ QR Code</h2>
                <Flourish />
                <p className="gift-desc">
                  សម្រាប់ភ្ញៀវកិត្តិយសដែលពុំមានពេលវេលាគ្រប់គ្រាន់
                  ឬមានបំណងចងដៃជូនពរគូស្វាមីភរិយាថ្មីតាមរយៈប្រព័ន្ធធនាគារ៖
                </p>

                <div className="currency-switcher">
                  <button
                    type="button"
                    className={currencyTab === "USD" ? "is-active" : ""}
                    onClick={() => setCurrencyTab("USD")}
                  >
                    គណនីដុល្លារ (USD $)
                  </button>
                  <button
                    type="button"
                    className={currencyTab === "KHR" ? "is-active" : ""}
                    onClick={() => setCurrencyTab("KHR")}
                  >
                    គណនីរៀល (KHR ៛)
                  </button>
                </div>

                <div className="khqr-box damask-surface">
                  <div className="khqr-header">
                    <span className="khqr-badge">{cmsData.bankName}</span>
                    <small>{currencyTab === "USD" ? "USD Account" : "KHR Account"}</small>
                  </div>

                  <div className="khqr-code-frame">
                    {activeQrImage ? (
                      <img
                        src={activeQrImage}
                        alt="KHQR Code"
                        className="qr-uploaded-img"
                      />
                    ) : (
                      <svg viewBox="0 0 140 140" className="qr-svg" aria-label="QR Code សម្រាប់ចងដៃ">
                        <rect width="140" height="140" rx="6" fill="#fffaf0" />
                        <path
                          d="M12 12h34v34H12zM18 18v22h22V18zM23 23h12v12H23z M94 12h34v34H94zM100 18v22h22V18zM105 23h12v12h-12z M12 94h34v34H12zM18 100v22h22v-22zM23 105h12v12H23z"
                          fill="#4b0711"
                        />
                        {Array.from({ length: 42 }, (_, i) => {
                          const row = Math.floor(i / 7)
                          const col = i % 7
                          const x = 52 + col * 6
                          const y = 16 + row * 18
                          if (x > 88 && y < 48) return null
                          return (
                            <rect
                              key={i}
                              x={x}
                              y={(y % 116) + 12}
                              width="4.5"
                              height="4.5"
                              rx="1"
                              fill={
                                (i + (currencyTab === "USD" ? 1 : 2)) % 2 === 0
                                  ? "#4b0711"
                                  : "#b98625"
                              }
                            />
                          )
                        })}
                        <circle
                          cx="70"
                          cy="70"
                          r="14"
                          fill="#4b0711"
                          stroke="#d7aa43"
                          strokeWidth="2"
                        />
                        <text
                          x="70"
                          y="75"
                          textAnchor="middle"
                          fill="#f0d487"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          {currencyTab === "USD" ? "$" : "៛"}
                        </text>
                      </svg>
                    )}
                    {allowPublicInlineUpload && (
                      <label className="khqr-upload-overlay" title="បង្ហោះរូប KHQR ពិតប្រាកដ">
                        ប្តូររូប QR ({currencyTab})
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleQuickFileUpload(e, (url) =>
                              setCmsData((prev) => ({
                                ...prev,
                                [currencyTab === "USD" ? "usdQrImageUrl" : "khrQrImageUrl"]: url,
                              })),
                            )
                          }
                        />
                      </label>
                    )}
                  </div>

                  <div className="khqr-account-details">
                    <strong>{cmsData.accountHolder}</strong>
                    <span>
                      លេខគណនី៖{" "}
                      <b>
                        {currencyTab === "USD"
                          ? cmsData.usdAccountNumber
                          : cmsData.khrAccountNumber}
                      </b>
                    </span>
                  </div>

                  <button type="button" className="copy-acc-btn" onClick={copyAccountNumber}>
                    {copiedAccount ? "បានចម្លងលេខគណនីរួចរាល់" : "ចម្លងលេខគណនី (Copy Account)"}
                  </button>
                </div>
              </div>
            </KbachLuxuryFrame>

            {/* Right Column: Guest Wishing Wall / សារជូនពរ */}
            <KbachLuxuryFrame variant="damask" showCenterCrests={false} className="wishes-frame">
              <div className="wishes-card-content">
                <p className="section-kicker">សៀវភៅជូនពរ • Guestbook</p>
                <h2>ផ្ញើសារជូនពរគូស្វាមីភរិយា</h2>
                <Flourish />

                <form className="wish-form" onSubmit={handleAddWish}>
                  <div className="wish-form-row">
                    <input
                      type="text"
                      required
                      placeholder="ឈ្មោះរបស់លោកអ្នក..."
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                    />
                    <select
                      value={wishRelation}
                      onChange={(e) => setWishRelation(e.target.value)}
                      aria-label="ទំនាក់ទំនង"
                    >
                      <option value="ភ្ញៀវកិត្តិយស">ភ្ញៀវកិត្តិយស</option>
                      <option value="ញាតិមិត្តខាងកូនប្រុស">ញាតិមិត្តខាងកូនប្រុស</option>
                      <option value="ញាតិមិត្តខាងកូនស្រី">ញាតិមិត្តខាងកូនស្រី</option>
                      <option value="មិត្តភក្តិ / សហការី">មិត្តភក្តិ / សហការី</option>
                    </select>
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="សរសេរពាក្យជូនពរដ៏មានអត្ថន័យ..."
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                  />
                  <button type="submit" className="gold-button wish-submit-btn">
                    ផ្ញើសារជូនពរ
                  </button>
                </form>

                <div className="wishes-list" aria-live="polite">
                  {wishes.map((w) => (
                    <article key={w.id} className="wish-item">
                      <div className="wish-item-header">
                        <div>
                          <h4>{w.name}</h4>
                          <small>{w.relation}</small>
                        </div>
                        <span className="wish-time">{w.time}</span>
                      </div>
                      <p>“{w.message}”</p>
                    </article>
                  ))}
                </div>
              </div>
            </KbachLuxuryFrame>
          </div>
        </div>
      </section>

      {/* ===== LOCATION SECTION (Framed inside a Royal Kbach Card on the unified Romduol silk canvas) ===== */}
      <section className="location-section" id="location">
        <div className="section-container reveal-on-scroll">
          <KbachLuxuryFrame variant="damask" showCenterCrests={false} className="location-kbach-wrapper">
            <div className="location-inner-grid">
              <div className="location-card">
                <p className="section-kicker">ទីតាំងប្រារព្ធពិធី • Wedding Venue</p>
                <h2>{cmsData.venueNameKhmer}</h2>
                <Flourish />
                <p className="address">{cmsData.venueAddressKhmer}</p>
                <div className="location-actions">
                  <a
                    className="gold-button"
                    href={cmsData.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}
                  >
                    បើកផែនទី Google Maps
                  </a>
                </div>
              </div>
              <div
                className="map-art"
                style={
                  cmsData.venuePhotoUrl
                    ? {
                        backgroundImage: `linear-gradient(rgba(35, 2, 7, 0.35), rgba(35, 2, 7, 0.68)), url(${cmsData.venuePhotoUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              >
                <KbachCorner position="tl" className="map-kbach" />
                <KbachCorner position="tr" className="map-kbach" />
                <KbachCorner position="bl" className="map-kbach" />
                <KbachCorner position="br" className="map-kbach" />
                {allowPublicInlineUpload && (
                  <label className="quick-photo-upload-chip venue-upload-chip" title="ប្តូររូបភាពទីតាំង">
                    <SvgCameraIcon />
                    <span>រូបទីតាំង</span>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleQuickFileUpload(e, (url) =>
                          setCmsData((prev) => ({ ...prev, venuePhotoUrl: url })),
                        )
                      }
                    />
                  </label>
                )}
                <div className="map-line line-one" />
                <div className="map-line line-two" />
                <svg
                  className="map-royal-svg"
                  viewBox="0 0 360 220"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="venueCompassGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f6df98" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#c59632" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Concentric Royal Compass Rings */}
                  <circle cx="180" cy="105" r="88" fill="url(#venueCompassGlow)" />
                  <circle cx="180" cy="105" r="78" fill="none" stroke="#c59632" strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
                  <circle cx="180" cy="105" r="56" fill="none" stroke="#c59632" strokeWidth="1.2" opacity="0.45" />
                  {/* Architectural Avenue Grid Lines */}
                  <path d="M 20 105 L 340 105" stroke="#c59632" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
                  <path d="M 180 15 L 180 195" stroke="#c59632" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
                  <path d="M 45 170 Q 125 135 180 105 T 315 45" fill="none" stroke="#b88428" strokeWidth="2.2" opacity="0.45" />
                  <path d="M 55 45 Q 130 85 180 105 T 310 165" fill="none" stroke="#b88428" strokeWidth="1.5" opacity="0.35" />
                  {/* Subtle Royal Palace Roof Silhouette at Top */}
                  <path
                    d="M 125 56 L 145 44 L 162 44 L 180 24 L 198 44 L 215 44 L 235 56 Z"
                    fill="rgba(197, 150, 50, 0.16)"
                    stroke="#c59632"
                    strokeWidth="1"
                    opacity="0.65"
                  />
                </svg>
                <div className="map-art-center-stack">
                  <div className="map-pin-wrap">
                    <div className="map-pin-pulse" />
                    <div className="map-pin">
                      <span>{cmsData.monogramLeft}</span>
                    </div>
                  </div>
                  <div className="map-venue-plaque">
                    <span className="map-venue-plaque-gem" />
                    <p>{cmsData.venueEnglishLabel}</p>
                    <span className="map-venue-plaque-gem" />
                  </div>
                </div>
              </div>
            </div>
          </KbachLuxuryFrame>
        </div>
      </section>

      {/* ===== FINAL INVITE CTA ===== */}
      <section className="final-invite">
        <div className="section-container reveal-on-scroll">
          <KbachLuxuryFrame variant="damask" showCenterCrests className="final-kbach-wrapper">
            <p>
              វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក ជាកិត្តិយសដ៏ធំធេងបំផុត
              <br />
              សម្រាប់យើងខ្ញុំ និងក្រុមគ្រួសារទាំងសងខាង
            </p>
            <h2>សូមគោរពអញ្ជើញ និងថ្លែងអំណរគុណ</h2>
            <div className="final-actions">
              <button className="gold-button" onClick={() => setRsvpOpen(true)}>
                បញ្ជាក់ការចូលរួម (RSVP)
              </button>
              <button className="text-button" onClick={addToCalendar}>
                រក្សាទុកកាលបរិច្ឆេទ
              </button>
            </div>
          </KbachLuxuryFrame>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="footer-monogram">
          {cmsData.monogramLeft} <b>&</b> {cmsData.monogramRight}
        </div>
        <p>
          {cmsData.groomKhmer} និង {cmsData.brideKhmer} • {cmsData.solarDateDisplay}
        </p>
        {/* Discreet owner-only lock icon to open the Separate CMS Page (#cms or Ctrl+Shift+A) */}
        <button
          type="button"
          className="footer-owner-lock"
          onClick={openSeparateCmsPage}
          title="Owner CMS Studio (#cms)"
          aria-label="Owner CMS Studio"
        >
          <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="4.5" y="9" width="11" height="8" rx="1.8" />
            <path d="M7 9V6.5a3 3 0 0 1 6 0V9" strokeLinecap="round" />
          </svg>
        </button>
      </footer>

      {/* ===== RSVP MODAL WITH PERSONALIZED GOLDEN VIP PASS ===== */}
      {rsvpOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setRsvpOpen(false)}
        >
          <div
            className="rsvp-modal damask-surface"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <KbachCorner position="tl" className="modal-kbach" />
            <KbachCorner position="tr" className="modal-kbach" />
            <KbachCorner position="bl" className="modal-kbach" />
            <KbachCorner position="br" className="modal-kbach" />

            <button
              className="modal-close"
              onClick={() => setRsvpOpen(false)}
              aria-label="បិទ"
            >
              ×
            </button>
            {!submitted ? (
              <>
                <p className="section-kicker">សូមគោរពអញ្ជើញ</p>
                <h2 id="rsvp-title">បញ្ជាក់ការចូលរួម</h2>
                <Flourish />
                <form onSubmit={handleRsvpSubmit}>
                  <label>
                    ឈ្មោះរបស់លោកអ្នក
                    <input
                      required
                      name="name"
                      value={
                        rsvpNameInput ||
                        (guestName !== "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា"
                          ? guestName
                          : "")
                      }
                      onChange={(e) => setRsvpNameInput(e.target.value)}
                      placeholder="បញ្ចូលឈ្មោះរបស់លោកអ្នក"
                    />
                  </label>
                  <label>
                    លេខទូរស័ព្ទ / Telegram
                    <input
                      name="phone"
                      value={rsvpPhoneInput}
                      onChange={(e) => setRsvpPhoneInput(e.target.value)}
                      placeholder="012 345 678"
                    />
                  </label>
                  <label>
                    ចំនួនភ្ញៀវចូលរួម
                    <select
                      name="guests"
                      value={rsvpGuestsInput}
                      onChange={(e) => setRsvpGuestsInput(e.target.value)}
                    >
                      <option value="1">១ នាក់</option>
                      <option value="2">២ នាក់</option>
                      <option value="3">៣ នាក់</option>
                      <option value="4">៤ នាក់</option>
                      <option value="5">៥ នាក់</option>
                    </select>
                  </label>
                  <fieldset>
                    <legend>តើលោកអ្នកអាចអញ្ជើញចូលរួមបានទេ?</legend>
                    <label>
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={rsvpAttendingInput === "yes"}
                        onChange={() => setRsvpAttendingInput("yes")}
                      />{" "}
                      ចូលរួមដោយក្តីរីករាយ
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={rsvpAttendingInput === "no"}
                        onChange={() => setRsvpAttendingInput("no")}
                      />{" "}
                      សូមអភ័យទោស មិនអាចចូលរួមបាន
                    </label>
                  </fieldset>
                  <button className="gold-button" type="submit">
                    ផ្ញើការឆ្លើយតប & ទទួលប័ណ្ណកិត្តិយស
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="vip-pass-ticket">
                  <span className="vip-pass-badge">ប័ណ្ណភ្ញៀវកិត្តិយស • VIP PASS</span>
                  <h3>
                    {cmsData.shortGroom} & {cmsData.shortBride}
                  </h3>
                  <p className="vip-pass-guest">{rsvpNameInput || guestName}</p>
                  <div className="vip-pass-meta">
                    <span>
                      {cmsData.solarDateDisplay} • {cmsData.ceremonyTimeDisplay}
                    </span>
                    <strong>{cmsData.venueHallKhmer}</strong>
                  </div>
                </div>
                <p>សូមថ្លែងអំណរគុណ! យើងខ្ញុំរង់ចាំទទួលស្វាគមន៍លោកអ្នកដោយក្តីគោរព។</p>
                <button
                  className="gold-button"
                  onClick={() => {
                    setSubmitted(false)
                    setRsvpOpen(false)
                  }}
                >
                  រួចរាល់
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== FULLSCREEN PHOTO LIGHTBOX MODAL ===== */}
      {lightboxPhoto && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          onMouseDown={() => setLightboxPhoto(null)}
        >
          <div
            className="lightbox-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <KbachCorner position="tl" className="modal-kbach" />
            <KbachCorner position="tr" className="modal-kbach" />
            <KbachCorner position="bl" className="modal-kbach" />
            <KbachCorner position="br" className="modal-kbach" />
            <button
              type="button"
              className="modal-close lightbox-close"
              onClick={() => setLightboxPhoto(null)}
              aria-label="បិទ"
            >
              ×
            </button>
            <img
              src={lightboxPhoto.imageUrl}
              alt={lightboxPhoto.title}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <h3>{lightboxPhoto.title}</h3>
              <p>{lightboxPhoto.subtitle}</p>
              <blockquote>“{lightboxPhoto.poetry}”</blockquote>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
