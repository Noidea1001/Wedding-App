import { useState } from "react"
import { AngkorBorder } from "../kbach/AngkorBorder"
import { GoldDivider } from "../kbach/GoldDivider"
import { toKhmerNum } from "../../hooks/useCountdown"

export interface PopilRitualProps {
  coupleLabel: string
  onPlayChime?: () => void
}

export function PopilRitual({ coupleLabel, onPlayChime }: PopilRitualProps) {
  const [rotations, setRotations] = useState(3)
  const [bursts, setBursts] = useState<
    { id: number; text: string; x: number }[]
  >([])

  const blessingWords = [
    "សិរីសួស្តី ជ័យមង្គល",
    "ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង",
    "សុភមង្គលពេញគ្រួសារ",
    "ត្រជាក់ត្រជុំដូចទឹកអម្រឹត",
    "អាយុ វណ្ណៈ សុខៈ ពលៈ",
  ]

  const triggerBlessing = () => {
    setRotations((r) => r + 1)
    if (onPlayChime) onPlayChime()
    const id = Date.now() + Math.random()
    const text = blessingWords[rotations % blessingWords.length]
    const x = 25 + Math.floor(Math.random() * 50)
    setBursts((prev) => [...prev.slice(-5), { id, text, x }])
  }

  return (
    <section className="popil-ritual-section" id="ritual">
      <div className="section-container">
        <AngkorBorder variant="damask" showCenterCrests>
          <div className="popil-inner">
            <p className="section-kicker">
              ពិធីប្រសិទ្ធពរជ័យអន្តរកម្ម • Interactive Khmer Ritual
            </p>
            <h2>ពិធីបង្វិលពពិល និងបាចផ្កាស្លា</h2>
            <GoldDivider />
            <p className="popil-description">
              តាមទំនៀមទម្លាប់ខ្មែរ ភ្ញៀវកិត្តិយសអង្គុយព័ទ្ធជុំវិញគូស្វាមីភរិយា ដើម្បីបង្វិលទៀនពពិល
              និងបក់ផ្សែងពរជ័យ។ សូមចុចប៊ូតុងខាងក្រោមដើម្បីចូលរួម{" "}
              <strong>បង្វិលពពិល និងបាចផ្កាស្លា</strong> ជូនពរគូស្វាមីភរិយាថ្មី!
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
                          fill={
                            i % 2 === 0
                              ? "url(#kbach-gold-grad)"
                              : "url(#kbach-gold-soft)"
                          }
                          stroke="#684107"
                          strokeWidth="0.6"
                        />
                        <circle cx="150" cy="31" r="2" fill="#FFF9D6" />
                      </g>
                    ))}
                    {/* 4 Sacred Sculpted Golden Popil Candles */}
                    {[0, 90, 180, 270].map((deg) => (
                      <g
                        key={`popil-${deg}`}
                        transform={`rotate(${deg} 150 150) translate(150, 18)`}
                      >
                        <circle
                          cx="0"
                          cy="-6"
                          r="12"
                          fill="url(#kbach-candle-glow)"
                        />
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
                        <circle
                          cx="0"
                          cy="12"
                          r="2.8"
                          fill="url(#kbach-ruby-gem)"
                        />
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
              <button
                type="button"
                className="gold-button popil-trigger-btn"
                onClick={triggerBlessing}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                <span>ចុចបង្វិលពពិល និងបាចផ្កាស្លាជូនពរ (+១ ជុំ)</span>
              </button>
              <p className="popil-counter-note">
                ភ្ញៀវកិត្តិយសបានចូលរួមបង្វិលពពិលប្រសិទ្ធពរជ័យចំនួន{" "}
                <strong>{toKhmerNum(rotations)} ជុំ</strong> ហើយ
              </p>
            </div>
          </div>
        </AngkorBorder>
      </div>
    </section>
  )
}
