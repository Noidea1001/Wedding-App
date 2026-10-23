import { useRef, useState } from "react"
import { type WeddingCmsData } from "./cmsData"

interface TemplateProps {
  cmsData: WeddingCmsData
  guestName: string
  countdown: { days: number; hours: number; minutes: number; seconds: number }
  onOpenRsvp: () => void
  onAddToCalendar: () => void
  onUploadImage: (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (dataUrl: string) => void,
  ) => void
  onUpdateCms: (patch: Partial<WeddingCmsData>) => void
}

const KHMER_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"]
function toKhmerNum(num: number | string): string {
  return String(num)
    .padStart(2, "0")
    .replace(/\d/g, (d) => KHMER_DIGITS[Number(d)])
}

/**
 * ============================================================================
 * TEMPLATE 2: 3D ROYAL POP-UP PALACE BOX INVITATION (Matches Reference Image 1)
 * Multi-state interactive 3D Cambodian Wedding Box:
 *   State 0: Stepped Temple Gatefold Cover with Diamond Heart Clasp
 *   State 1: Golden Lotus Seal Inner Flap
 *   State 2: Full 3D Pop-Up 3-Spire Palace Stage + Flat Printed Invitation Floor + Loose Cards
 * ============================================================================
 */
export function PopupPalaceTemplate({
  cmsData,
  guestName,
  countdown,
  onOpenRsvp,
  onAddToCalendar,
  onUploadImage,
  onUpdateCms,
}: TemplateProps) {
  // 0 = Stepped Gatefold Closed, 1 = Inner Seal Flap, 2 = Full 3D Pop-up Palace Open
  const [boxStage, setBoxStage] = useState<0 | 1 | 2>(2)
  const [activeCardModal, setActiveCardModal] = useState<"map" | "zone" | null>(null)

  return (
    <section className="t2-palace-showcase" aria-label="ធៀបការប្រអប់ផុស 3D រាជវាំងខ្មែរ">
      {/* 3D Interactive Box Container */}
      <div className={`t2-box-viewport stage-${boxStage}`}>
        {/* STATE 0: Stepped Temple Gatefold Cover with Diamond Heart Clasp (Bottom-Right photo in Image 1) */}
        {boxStage === 0 && (
          <div className="t2-stepped-cover" onClick={() => setBoxStage(1)}>
            <div className="t2-stepped-wing t2-wing-left">
              <div className="t2-step-tier tier-1" />
              <div className="t2-step-tier tier-2" />
              <div className="t2-step-tier tier-3" />
              <div className="t2-step-tier tier-4" />
              <div className="t2-step-tier tier-5" />
            </div>
            <div className="t2-stepped-wing t2-wing-right">
              <div className="t2-step-tier tier-1" />
              <div className="t2-step-tier tier-2" />
              <div className="t2-step-tier tier-3" />
              <div className="t2-step-tier tier-4" />
              <div className="t2-step-tier tier-5" />
            </div>

            <div className="t2-glitter-belt">
              <button
                type="button"
                className="t2-diamond-clasp"
                onClick={(e) => {
                  e.stopPropagation()
                  setBoxStage(1)
                }}
                aria-label="ដោះគន្លឹះពេជ្រ"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path
                    d="M12 3 L20 12 L12 21 L4 12 Z"
                    fill="#9e1b2b"
                    stroke="#fff5c0"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            <p className="t2-click-hint">ចុចលើត្រាពេជ្រ ដើម្បីបើកទ្វារប្រាសាទ</p>
          </div>
        )}

        {/* STATE 1: Inner Golden Lotus Medallion Flap (Bottom-Left photo in Image 1) */}
        {boxStage === 1 && (
          <div className="t2-lotus-flap-stage" onClick={() => setBoxStage(2)}>
            <div className="t2-flap-top-lid">
              <div className="t2-lid-silhouette" />
            </div>
            <div className="t2-flap-bottom-doors">
              <div className="t2-flap-door-left" />
              <div className="t2-flap-door-right" />
              <button
                type="button"
                className="t2-lotus-gold-seal"
                onClick={(e) => {
                  e.stopPropagation()
                  setBoxStage(2)
                }}
              >
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="56" fill="#d9ab42" stroke="#fff3c4" strokeWidth="2" />
                  {Array.from({ length: 16 }, (_, i) => (
                    <path
                      key={i}
                      d="M60 6 L66 26 L60 34 L54 26 Z"
                      fill="#8a560b"
                      transform={`rotate(${i * 22.5} 60 60)`}
                    />
                  ))}
                  <circle cx="60" cy="60" r="24" fill="#fae5a5" stroke="#8a560b" strokeWidth="1.5" />
                  <text
                    x="60"
                    y="66"
                    textAnchor="middle"
                    fill="#693e06"
                    fontFamily="Moul, serif"
                    fontSize="14"
                  >
                    {cmsData.monogramLeft}&{cmsData.monogramRight}
                  </text>
                </svg>
              </button>
            </div>
            <p className="t2-click-hint">ចុចលើត្រាមាស ដើម្បីបើកប្រអប់ប្រាសាទផុស 3D</p>
          </div>
        )}

        {/* STATE 2: Full Open 3D Pop-Up Palace Box + Flat Printed Invitation Floor (Top-Left & Top-Right in Image 1) */}
        {boxStage === 2 && (
          <div className="t2-open-palace-box">
            {/* Side Walls of the Open Physical Box */}
            <div className="t2-box-wall t2-wall-left" aria-hidden="true" />
            <div className="t2-box-wall t2-wall-right" aria-hidden="true" />

            {/* Top Upright Pop-Up 3-Spire Khmer Temple Stage */}
            <div className="t2-popup-stage">
              <div className="t2-sky-arch-pattern" aria-hidden="true" />

              {/* 3-Spire Pop-up Khmer Palace SVG Architecture */}
              <svg viewBox="0 0 800 420" className="t2-palace-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="t2-ivory-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF9" />
                    <stop offset="60%" stopColor="#F6E8CC" />
                    <stop offset="100%" stopColor="#DEC28E" />
                  </linearGradient>
                  <linearGradient id="t2-spire-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCE79C" />
                    <stop offset="45%" stopColor="#C88E26" />
                    <stop offset="100%" stopColor="#724607" />
                  </linearGradient>
                  <filter id="t2-paper-shadow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#3b2105" floodOpacity="0.42" />
                  </filter>
                </defs>

                {/* Back Wall & Side Wooden Windows */}
                <g filter="url(#t2-paper-shadow)">
                  <rect x="60" y="210" width="680" height="170" rx="3" fill="url(#t2-ivory-grad)" stroke="#c79b4b" strokeWidth="2" />
                  {/* Left & Right Lattice Windows */}
                  {[115, 605].map((wx, idx) => (
                    <g key={idx} transform={`translate(${wx}, 248)`}>
                      <rect width="80" height="92" fill="#8b5a2b" stroke="#d4a64a" strokeWidth="2.5" />
                      {Array.from({ length: 5 }, (_, bar) => (
                        <line
                          key={bar}
                          x1={14 + bar * 13}
                          y1="6"
                          x2={14 + bar * 13}
                          y2="86"
                          stroke="#f5deb3"
                          strokeWidth="2"
                        />
                      ))}
                    </g>
                  ))}
                </g>

                {/* 3 Tiered Angkor / Royal Palace Spires (Left, Center, Right) */}
                {[
                  { cx: 165, base: 215, tiers: 5, w: 125, h: 20 },
                  { cx: 400, base: 195, tiers: 6, w: 160, h: 22 },
                  { cx: 635, base: 215, tiers: 5, w: 125, h: 20 },
                ].map((spire, sIdx) => (
                  <g key={sIdx} filter="url(#t2-paper-shadow)">
                    {Array.from({ length: spire.tiers }, (_, t) => {
                      const tw = spire.w * (1 - t * 0.14)
                      const ty = spire.base - (t + 1) * spire.h
                      return (
                        <g key={t}>
                          <rect
                            x={spire.cx - tw / 2}
                            y={ty}
                            width={tw}
                            height={spire.h - 2}
                            rx="3"
                            fill="url(#t2-spire-gold)"
                            stroke="#fff4d1"
                            strokeWidth="1"
                          />
                          {/* Ornate Kbach Pediment triangles on each tier */}
                          <path
                            d={`M${spire.cx - tw * 0.35} ${ty + spire.h - 2} L${spire.cx} ${ty + 2} L${spire.cx + tw * 0.35} ${spire.h + ty - 2} Z`}
                            fill="#f9e8b2"
                            opacity="0.65"
                          />
                        </g>
                      )
                    })}
                    {/* Top Lotus Spire Tip */}
                    <path
                      d={`M${spire.cx - 5} ${spire.base - spire.tiers * spire.h} L${spire.cx} ${spire.base - spire.tiers * spire.h - 32} L${spire.cx + 5} ${spire.base - spire.tiers * spire.h} Z`}
                      fill="url(#t2-spire-gold)"
                    />
                  </g>
                ))}

                {/* Front Pop-Up Royal Pavilion Arch & Pillars */}
                <g filter="url(#t2-paper-shadow)">
                  {/* Multi-layered Naga & Kbach Gable Roof */}
                  <path
                    d="M230 225 L400 105 L570 225 Z"
                    fill="url(#t2-spire-gold)"
                    stroke="#fff6d6"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M258 225 L400 128 L542 225 Z"
                    fill="url(#t2-ivory-grad)"
                    stroke="#c89128"
                    strokeWidth="2"
                  />
                  {/* Pillars */}
                  <rect x="262" y="225" width="26" height="155" fill="url(#t2-ivory-grad)" stroke="#d1a449" strokeWidth="1.5" />
                  <rect x="512" y="225" width="26" height="155" fill="url(#t2-ivory-grad)" stroke="#d1a449" strokeWidth="1.5" />
                  {/* Open Sanctuary Doorway */}
                  <rect x="288" y="225" width="224" height="155" fill="#fffdf7" stroke="#d1a449" strokeWidth="2" />
                </g>

                {/* White & Green Floral Bushes along the Pavilion Steps */}
                <g filter="url(#t2-paper-shadow)">
                  {[110, 175, 250, 545, 625, 690].map((bx, i) => (
                    <g key={i} transform={`translate(${bx}, 368)`}>
                      <ellipse cx="0" cy="0" rx="46" ry="20" fill="#d9e4d2" />
                      <circle cx="-18" cy="-4" r="8" fill="#ffffff" />
                      <circle cx="0" cy="-9" r="9" fill="#fffdf5" />
                      <circle cx="18" cy="-3" r="8" fill="#ffffff" />
                      <circle cx="-8" cy="4" r="7" fill="#f7f4e8" />
                      <circle cx="11" cy="5" r="7" fill="#ffffff" />
                    </g>
                  ))}
                </g>
              </svg>

              {/* Center Couple Standee inside the Pop-Up Pavilion Doorway (Real Cambodian Wedding Photo + Custom Upload!) */}
              <div className="t2-couple-standee">
                <img
                  src={
                    cmsData.heroBannerImageUrl ||
                    "/real-cambodia/cambodia-wedding-couple.jpg"
                  }
                  alt={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
                  className="t2-standee-photo"
                />
                {cmsData.allowInlinePhotoUpload && (
                  <label className="t2-standee-upload-btn" title="ដាក់រូបគូស្វាមីភរិយាក្នុងប្រាសាទ">
                    ប្តូររូបភាព
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        onUploadImage(e, (url) => onUpdateCms({ heroBannerImageUrl: url }))
                      }
                    />
                  </label>
                )}
              </div>

              {/* Authentic Physical 3D Pop-Up Palace Box Reference Photo Badge */}
              <div className="t2-real-box-photo-showcase">
                <img
                  src="/real-cambodia/popup-palace-box.jpg"
                  alt="ម៉ូតធៀបការប្រអប់ប្រាសាទផុស 3D ពិតប្រាកដ"
                  className="t2-real-box-thumb"
                />
                <span>រូបភាពធៀបការប្រអប់ប្រាសាទផុស 3D ពិតប្រាកដ</span>
              </div>
            </div>

            {/* Bottom Angled Box Floor with Printed Gold Khmer Invitation Text & Loose Insert Cards */}
            <div className="t2-box-floor damask-surface">
              <div className="t2-floor-printed-text">
                <p className="t2-floor-header">សិរីមង្គលអាពាហ៍ពិពាហ៍</p>
                <div className="t2-floor-parents">
                  <div>
                    <strong>{cmsData.groomFather}</strong>
                    <span>{cmsData.groomMother}</span>
                  </div>
                  <span className="t2-floor-emblem">{cmsData.monogramLeft}&{cmsData.monogramRight}</span>
                  <div>
                    <strong>{cmsData.brideFather}</strong>
                    <span>{cmsData.brideMother}</span>
                  </div>
                </div>

                <p className="t2-floor-invite-body">
                  មានកិត្តិយសសូមគោរពអញ្ជើញ <strong>{guestName}</strong> ចូលរួមជាភ្ញៀវកិត្តិយសក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍
                </p>

                <div className="t2-floor-couple">
                  <div>
                    <small>កូនប្រុសនាម</small>
                    <h3>{cmsData.groomKhmer}</h3>
                  </div>
                  <span className="t2-floor-heart">ជាគូនឹង</span>
                  <div>
                    <small>កូនស្រីនាម</small>
                    <h3>{cmsData.brideKhmer}</h3>
                  </div>
                </div>

                <p className="t2-floor-date">
                  {cmsData.solarDateDisplay} វេលាម៉ោង {cmsData.ceremonyTimeDisplay} • នៅ {cmsData.venueHallKhmer}
                </p>

                <div className="t2-floor-actions">
                  <button type="button" className="gold-button" onClick={onOpenRsvp}>
                    បញ្ជាក់ការចូលរួម (RSVP)
                  </button>
                  <button type="button" className="t2-close-box-btn" onClick={() => setBoxStage(0)}>
                    បិទប្រអប់ធៀបការវិញ
                  </button>
                </div>
              </div>

              {/* Two Realistic Angled Loose Insert Cards resting in the front corners (like Top-Right of Image 1) */}
              <button
                type="button"
                className="t2-loose-card t2-loose-left"
                onClick={() => setActiveCardModal("map")}
              >
                <small>ប័ណ្ណទី១ • កម្មវិធីបុណ្យ</small>
                <strong>កម្មវិធីមង្គលការ</strong>
                <span>ចុចមើលលម្អិត</span>
              </button>

              <button
                type="button"
                className="t2-loose-card t2-loose-right"
                onClick={() => setActiveCardModal("zone")}
              >
                <small>Zone A • VIP Pass</small>
                <strong>ប័ណ្ណចូលរួមពិធី</strong>
                <span>{cmsData.venueHallKhmer}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pop-up Modal when clicking the loose corner cards */}
      {activeCardModal && (
        <div className="modal-backdrop" onMouseDown={() => setActiveCardModal(null)}>
          <div className="rsvp-modal damask-surface" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCardModal(null)}>
              ×
            </button>
            {activeCardModal === "map" ? (
              <div style={{ textAlign: "center" }}>
                <p className="section-kicker">កាតកម្មវិធីបុណ្យបន្ថែម</p>
                <h2>កម្មវិធីមង្គលការសង្ខេប</h2>
                <p style={{ margin: "12px 0 18px", fontSize: 14, color: "#4f251e" }}>
                  {cmsData.lunarDateFull}
                </p>
                <div style={{ textAlign: "left", display: "grid", gap: 10, marginBottom: 20 }}>
                  {cmsData.dayTwoEvents.map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.65)",
                        borderLeft: "3px solid #4b0711",
                      }}
                    >
                      <strong style={{ color: "#4b0711" }}>
                        {ev.time} {ev.period}
                      </strong>{" "}
                      — {ev.title}
                    </div>
                  ))}
                </div>
                <button className="gold-button" onClick={() => setActiveCardModal(null)}>
                  បិទកាត
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <p className="section-kicker">ប័ណ្ណសម្គាល់តំបន់ភ្ញៀវ • Zone Card</p>
                <h2>Zone A • ភ្ញៀវកិត្តិយស</h2>
                <p style={{ margin: "12px 0", fontSize: 14, color: "#4f251e" }}>
                  សូមគោរពជូន៖ <strong>{guestName}</strong>
                </p>
                <p style={{ fontSize: 13, color: "#6b4423", marginBottom: 20 }}>
                  ទីតាំង៖ {cmsData.venueNameKhmer} ({cmsData.venueHallKhmer})
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button className="gold-button" onClick={onAddToCalendar}>
                    រក្សាទុកក្នុងប្រតិទិន
                  </button>
                  <button className="outline-button dark-outline" onClick={() => setActiveCardModal(null)}>
                    បិទប័ណ្ណ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Countdown strip below the 3D Box */}
      <div className="t2-countdown-strip">
        <div>
          <strong>{toKhmerNum(countdown.days)}</strong>
          <span>ថ្ងៃ</span>
        </div>
        <div>
          <strong>{toKhmerNum(countdown.hours)}</strong>
          <span>ម៉ោង</span>
        </div>
        <div>
          <strong>{toKhmerNum(countdown.minutes)}</strong>
          <span>នាទី</span>
        </div>
        <div>
          <strong>{toKhmerNum(countdown.seconds)}</strong>
          <span>វិនាទី</span>
        </div>
      </div>
    </section>
  )
}

/* Deterministic falling petals shared by the interactive modern stages */
const STAGE_PETALS = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: ((i * 0.27) % 3.4).toFixed(2),
  dur: (5 + ((i * 13) % 40) / 10).toFixed(2),
  size: 8 + ((i * 7) % 11),
  tone: i % 3,
  drift: ((i % 5) - 2) * 22,
}))

/**
 * ============================================================================
 * TEMPLATE 3: CAMBODIAN MODERN LUXURY STAGE DRAPERY & GOLDEN SPOTLIGHT RUNWAY
 * (Matches Reference Image: Warm Champagne-Gold Draped Curtains Swaying in the Breeze,
 *  Overhead Stage Spotlight Beam, Lush Blush-Cream Floral Tower & Glowing Script Runway)
 * ============================================================================
 */
export function OliveFoil2026Template({
  cmsData,
  guestName,
  countdown,
  onOpenRsvp,
  onAddToCalendar,
  onUploadImage,
  onUpdateCms,
}: TemplateProps) {
  return (
    <section
      className="t3-olive-suite-section t3-drape-stage-section"
      aria-label="ឆាកវាំងននសូត្ររេរាំ និងផ្កាដេគ័រទាន់សម័យ"
    >
      <div className="t3-modern-stage-theater">
        {/* Top Stage Rigging & Animated Swaying Silk Curtain Drapery */}
        <div className="t3-curtain-canopy" aria-hidden="true">
          <svg viewBox="0 0 1000 320" className="t3-curtain-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="t3-silk-fold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5a381e" />
                <stop offset="28%" stopColor="#b88446" />
                <stop offset="52%" stopColor="#f3d49b" />
                <stop offset="76%" stopColor="#8d5c2b" />
                <stop offset="100%" stopColor="#3a200e" />
              </linearGradient>
              <linearGradient id="t3-silk-deep" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a1509" />
                <stop offset="45%" stopColor="#7c4f23" />
                <stop offset="100%" stopColor="#3d2210" />
              </linearGradient>
              <radialGradient id="t3-spotlight-cone" cx="50%" cy="0%" r="85%">
                <stop offset="0%" stopColor="#fffdf4" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#ffe39f" stopOpacity="0.48" />
                <stop offset="65%" stopColor="#d99b43" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#261309" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Warm Up-Lighting along Top Curtain Pleats */}
            {[80, 210, 340, 660, 790, 920].map((lx, idx) => (
              <ellipse
                key={idx}
                cx={lx}
                cy="18"
                rx="55"
                ry="95"
                fill="url(#t3-spotlight-cone)"
                className="t3-uplight-pulse"
                style={{ animationDelay: `${idx * 0.4}s` }}
              />
            ))}

            {/* Left Multi-Layered Scalloped Silk Drapes (Animated Breeze Sway) */}
            <g className="t3-curtain-wing-left">
              <path
                d="M0 0 H485 C430 135, 290 245, 0 285 Z"
                fill="url(#t3-silk-deep)"
                opacity="0.92"
              />
              <path
                d="M0 0 H450 C395 115, 260 210, 0 240 Z"
                fill="url(#t3-silk-fold)"
                stroke="#f5d99d"
                strokeWidth="1.2"
                opacity="0.88"
              />
              {/* Individual Scalloped Silk Swag Folds */}
              {[0, 1, 2, 3, 4].map((f) => (
                <path
                  key={f}
                  d={`M${20 + f * 35} 0 C${85 + f * 42} ${95 + f * 24}, ${245 + f * 36} ${125 + f * 26}, ${440 - f * 22} ${18 + f * 16}`}
                  fill="none"
                  stroke="#ffe6b0"
                  strokeWidth={2.2 - f * 0.25}
                  opacity={0.68 - f * 0.1}
                />
              ))}
            </g>

            {/* Right Multi-Layered Scalloped Silk Drapes (Animated Breeze Sway) */}
            <g className="t3-curtain-wing-right">
              <path
                d="M1000 0 H515 C570 135, 710 245, 1000 285 Z"
                fill="url(#t3-silk-deep)"
                opacity="0.92"
              />
              <path
                d="M1000 0 H550 C605 115, 740 210, 1000 240 Z"
                fill="url(#t3-silk-fold)"
                stroke="#f5d99d"
                strokeWidth="1.2"
                opacity="0.88"
              />
              {[0, 1, 2, 3, 4].map((f) => (
                <path
                  key={f}
                  d={`M${980 - f * 35} 0 C${915 - f * 42} ${95 + f * 24}, ${755 - f * 36} ${125 + f * 26}, ${560 + f * 22} ${18 + f * 16}`}
                  fill="none"
                  stroke="#ffe6b0"
                  strokeWidth={2.2 - f * 0.25}
                  opacity={0.68 - f * 0.1}
                />
              ))}
            </g>

            {/* Center Overhead Stage Spotlight Rig & Volumetric Light Beam */}
            <polygon
              points="500,26 240,320 760,320"
              fill="url(#t3-spotlight-cone)"
              className="t3-spotlight-beam-anim"
            />
            <g transform="translate(500, 20)">
              <rect x="-20" y="-18" width="40" height="28" rx="6" fill="#1b0e07" stroke="#d8a858" strokeWidth="1.5" />
              <circle cx="0" cy="4" r="11" fill="#e8fbff" />
              <circle cx="0" cy="4" r="18" fill="url(#t3-spotlight-cone)" />
            </g>
          </svg>
        </div>

        {/* Center Lush Blush-Pink, Champagne & Ivory Floral Cascade Tower */}
        <div className="t3-stage-focal-row">
          <div className="t3-side-floral-hedge t3-hedge-left" aria-hidden="true">
            <svg viewBox="0 0 220 260" className="t3-floral-svg">
              {[
                { cx: 65, cy: 210, r: 24, c: "#f7d4d8" },
                { cx: 115, cy: 195, r: 28, c: "#fff5eb" },
                { cx: 45, cy: 165, r: 22, c: "#f2bac4" },
                { cx: 95, cy: 145, r: 25, c: "#fbe4d8" },
                { cx: 145, cy: 220, r: 22, c: "#f5cbd1" },
                { cx: 80, cy: 105, r: 19, c: "#fff9f2" },
                { cx: 135, cy: 170, r: 21, c: "#eab0bc" },
              ].map((b, i) => (
                <g key={i}>
                  <circle cx={b.cx} cy={b.cy} r={b.r} fill={b.c} opacity="0.92" />
                  <circle cx={b.cx - 5} cy={b.cy - 5} r={b.r * 0.55} fill="#fffdf9" opacity="0.65" />
                </g>
              ))}
            </svg>
          </div>

          {/* Central Floral Tower + Couple Portrait Standee */}
          <div className="t3-center-floral-tower">
            <svg viewBox="0 0 360 320" className="t3-floral-tower-svg" aria-hidden="true">
              {/* Warm Glowing Candles at Base */}
              {[42, 68, 92, 268, 292, 318].map((cx, idx) => (
                <g key={idx} transform={`translate(${cx}, 272)`}>
                  <rect x="-7" y="0" width="14" height={22 + (idx % 2) * 8} rx="2" fill="#fff6df" />
                  <circle cx="0" cy="-5" r="5" fill="#ffd97d" />
                </g>
              ))}
              {/* Cascading Rose & Delphinium Spire */}
              {[
                { x: 180, y: 42, r: 22, fill: "#fff7ea" },
                { x: 162, y: 74, r: 26, fill: "#f7d2d6" },
                { x: 198, y: 82, r: 25, fill: "#fae6d4" },
                { x: 148, y: 114, r: 28, fill: "#fff9f0" },
                { x: 185, y: 118, r: 30, fill: "#f2bac4" },
                { x: 216, y: 122, r: 26, fill: "#fcebd9" },
                { x: 132, y: 158, r: 30, fill: "#f6cbd2" },
                { x: 176, y: 162, r: 34, fill: "#fffaf2" },
                { x: 222, y: 164, r: 29, fill: "#eab2be" },
                { x: 114, y: 208, r: 32, fill: "#fae5d3" },
                { x: 162, y: 214, r: 35, fill: "#f5c6ce" },
                { x: 208, y: 212, r: 34, fill: "#fff8ee" },
                { x: 248, y: 216, r: 30, fill: "#f2b8c2" },
                { x: 96, y: 254, r: 28, fill: "#fff6ec" },
                { x: 142, y: 258, r: 32, fill: "#eab0bc" },
                { x: 188, y: 260, r: 34, fill: "#fffaf4" },
                { x: 232, y: 258, r: 31, fill: "#f7d2d8" },
                { x: 268, y: 256, r: 27, fill: "#fbe7d8" },
              ].map((fl, idx) => (
                <g key={idx}>
                  <circle cx={fl.x} cy={fl.y} r={fl.r} fill={fl.fill} />
                  <circle cx={fl.x - 4} cy={fl.y - 4} r={fl.r * 0.52} fill="#ffffff" opacity="0.58" />
                </g>
              ))}
            </svg>

            {cmsData.heroBannerImageUrl && (
              <div className="t3-tower-custom-photo">
                <img
                  src={cmsData.heroBannerImageUrl}
                  alt={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
                />
              </div>
            )}
            {cmsData.allowInlinePhotoUpload && (
              <label className="t2-standee-upload-btn" title="ដាក់រូបគូស្វាមីភរិយាលើឆាក">
                ប្តូររូបលើឆាក
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    onUploadImage(e, (url) => onUpdateCms({ heroBannerImageUrl: url }))
                  }
                />
              </label>
            )}
          </div>

          <div className="t3-side-floral-hedge t3-hedge-right" aria-hidden="true">
            <svg viewBox="0 0 220 260" className="t3-floral-svg">
              {[
                { cx: 155, cy: 210, r: 24, c: "#f7d4d8" },
                { cx: 105, cy: 195, r: 28, c: "#fff5eb" },
                { cx: 175, cy: 165, r: 22, c: "#f2bac4" },
                { cx: 125, cy: 145, r: 25, c: "#fbe4d8" },
                { cx: 75, cy: 220, r: 22, c: "#f5cbd1" },
                { cx: 140, cy: 105, r: 19, c: "#fff9f2" },
                { cx: 85, cy: 170, r: 21, c: "#eab0bc" },
              ].map((b, i) => (
                <g key={i}>
                  <circle cx={b.cx} cy={b.cy} r={b.r} fill={b.c} opacity="0.92" />
                  <circle cx={b.cx - 5} cy={b.cy - 5} r={b.r * 0.55} fill="#fffdf9" opacity="0.65" />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Reflective Petal-Strewn Runway Aisle + Glowing Golden Floor Projection Script */}
        <div className="t3-runway-aisle">
          <div className="t3-floor-neon-projection">
            <span className="t3-neon-line-1">ក្នុងលំហូរនៃពេលវេលា • និស្ស័យស្នេហ៍ដ៏ឧត្តុង្គឧត្តម</span>
            <strong className="t3-neon-line-2">សេចក្តីស្រឡាញ់គឺជាអមតៈតែមួយគត់</strong>
          </div>

          {/* Luxury Glass & Champagne-Gold Invitation Plaque on the Runway */}
          <div className="t3-runway-invite-card">
            <span className="t3-runway-kicker">សិរីមង្គលអាពាហ៍ពិពាហ៍ • Modern Luxury Stage</span>
            <p className="t3-runway-guest">សូមគោរពជូន៖ {guestName}</p>

            <h2 className="t3-runway-couple">
              <span>{cmsData.groomKhmer}</span>
              <i>&</i>
              <span>{cmsData.brideKhmer}</span>
            </h2>

            <div className="t3-runway-parents">
              <div>
                <small>មាតាបិតាខាងកូនប្រុស</small>
                <strong>{cmsData.groomFather}</strong>
                <span>{cmsData.groomMother}</span>
              </div>
              <div className="t3-runway-monogram">
                {cmsData.monogramLeft}&{cmsData.monogramRight}
              </div>
              <div>
                <small>មាតាបិតាខាងកូនស្រី</small>
                <strong>{cmsData.brideFather}</strong>
                <span>{cmsData.brideMother}</span>
              </div>
            </div>

            <p className="t3-runway-date">
              {cmsData.lunarDateFull}
              <br />
              ត្រូវនឹង <strong>{cmsData.solarDateDisplay}</strong> វេលាម៉ោង{" "}
              <strong>{cmsData.ceremonyTimeDisplay}</strong> • នៅ{" "}
              <strong>{cmsData.venueNameKhmer}</strong>
            </p>

            <div className="t3-runway-countdown">
              <div>
                <strong>{toKhmerNum(countdown.days)}</strong>
                <small>ថ្ងៃ</small>
              </div>
              <div>
                <strong>{toKhmerNum(countdown.hours)}</strong>
                <small>ម៉ោង</small>
              </div>
              <div>
                <strong>{toKhmerNum(countdown.minutes)}</strong>
                <small>នាទី</small>
              </div>
              <div>
                <strong>{toKhmerNum(countdown.seconds)}</strong>
                <small>វិនាទី</small>
              </div>
            </div>

            <div className="t3-runway-actions">
              <button type="button" className="gold-button" onClick={onOpenRsvp}>
                បញ្ជាក់ការចូលរួម (RSVP)
              </button>
              <button type="button" className="outline-button dark-outline" onClick={onAddToCalendar}>
                រក្សាទុកក្នុងប្រតិទិន
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * ============================================================================
 * TEMPLATE 4: SCULPTURAL WHITE ROSE WAVE ARCH & COUTURE AISLE SANCTUARY
 * (Matches Reference Image: Giant Asymmetrical White Rose Wave Archway,
 *  Pleated White Silk Drape, Glass Ceremony Table & Ribbon-Tied Medallion Chairs)
 * ============================================================================
 */
export function JasmineArchTemplate({
  cmsData,
  guestName,
  countdown,
  onOpenRsvp,
  onAddToCalendar,
  onUploadImage,
  onUpdateCms,
}: TemplateProps) {
  return (
    <section
      className="t4-jasmine-stage-section t4-white-rose-wave-section"
      aria-label="ក្លោងទ្វាររលកផ្កាកុលាបស និងសាលមង្គលការទាន់សម័យ"
    >
      <div className="t4-couture-hall-frame">
        {/* Giant Sculptural White Rose Wave Arch & Sweeping White Pleated Silk */}
        <div className="t4-wave-arch-stage">
          <svg viewBox="0 0 960 500" className="t4-rose-wave-svg" aria-hidden="true">
            <defs>
              <linearGradient id="t4-hall-wall" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#352f28" />
                <stop offset="55%" stopColor="#463f36" />
                <stop offset="100%" stopColor="#26211c" />
              </linearGradient>
              <linearGradient id="t4-pleated-silk" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f2eee6" />
                <stop offset="100%" stopColor="#dcd5c7" />
              </linearGradient>
              <filter id="t4-cloud-shadow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#1c1814" floodOpacity="0.48" />
              </filter>
            </defs>

            {/* Grand Architectural Stone-Taupe Hall Portal */}
            <rect x="0" y="0" width="960" height="500" fill="url(#t4-hall-wall)" />
            <ellipse cx="495" cy="260" rx="220" ry="215" fill="#211c17" />

            {/* Sweeping Pleated White Silk Drape inside the Floral Wave */}
            <g className="t4-silk-wave-drape">
              <path
                d="M275 190 C285 280, 345 365, 445 430 L345 430 C255 365, 225 280, 235 190 Z"
                fill="url(#t4-pleated-silk)"
              />
              {[0, 1, 2, 3, 4, 5].map((p) => (
                <path
                  key={p}
                  d={`M${242 + p * 7} 195 C${255 + p * 9} 280, ${305 + p * 12} 365, ${362 + p * 14} 430`}
                  fill="none"
                  stroke="#cfc7b8"
                  strokeWidth="1.3"
                />
              ))}
            </g>

            {/* GIANT ASYMMETRICAL SCULPTURAL WHITE ROSE WAVE ARCH */}
            <g filter="url(#t4-cloud-shadow)" className="t4-rose-wave-cloud">
              {[
                // Left Outer & Inner Crescent Wave of White Roses
                { cx: 245, cy: 360, r: 44, c: "#f4f1ea" },
                { cx: 222, cy: 295, r: 48, c: "#ffffff" },
                { cx: 225, cy: 225, r: 52, c: "#faf8f2" },
                { cx: 252, cy: 162, r: 56, c: "#ffffff" },
                { cx: 305, cy: 108, r: 62, c: "#f7f4ed" },
                { cx: 378, cy: 72, r: 66, c: "#ffffff" },
                { cx: 465, cy: 54, r: 70, c: "#fbf9f4" },
                { cx: 558, cy: 52, r: 74, c: "#ffffff" },
                { cx: 648, cy: 68, r: 68, c: "#f5f2eb" },
                { cx: 718, cy: 108, r: 60, c: "#ffffff" },
                // Right Descending Floral Cascade
                { cx: 745, cy: 182, r: 52, c: "#f2efe8" },
                { cx: 748, cy: 258, r: 54, c: "#ffffff" },
                { cx: 735, cy: 335, r: 58, c: "#f7f4ed" },
                { cx: 715, cy: 402, r: 56, c: "#ffffff" },
                // Outer Framing Floral Walls Left & Right
                { cx: 48, cy: 110, r: 62, c: "#f5f2eb" },
                { cx: 36, cy: 215, r: 58, c: "#ffffff" },
                { cx: 52, cy: 325, r: 64, c: "#faf7f0" },
                { cx: 78, cy: 415, r: 62, c: "#ffffff" },
                { cx: 912, cy: 125, r: 58, c: "#f7f4ed" },
                { cx: 922, cy: 235, r: 62, c: "#ffffff" },
                { cx: 902, cy: 345, r: 66, c: "#f5f2eb" },
                { cx: 878, cy: 422, r: 62, c: "#ffffff" },
              ].map((cluster, idx) => (
                <g key={idx}>
                  <circle cx={cluster.cx} cy={cluster.cy} r={cluster.r} fill={cluster.c} />
                  {/* Individual Sculpted White Rose Heads inside each Cluster */}
                  <circle cx={cluster.cx - cluster.r * 0.32} cy={cluster.cy - cluster.r * 0.24} r={cluster.r * 0.42} fill="#ffffff" />
                  <circle cx={cluster.cx + cluster.r * 0.28} cy={cluster.cy - cluster.r * 0.18} r={cluster.r * 0.38} fill="#fdfbf7" />
                  <circle cx={cluster.cx + cluster.r * 0.12} cy={cluster.cy + cluster.r * 0.28} r={cluster.r * 0.4} fill="#f1ede4" />
                  <circle cx={cluster.cx - cluster.r * 0.22} cy={cluster.cy + cluster.r * 0.22} r={cluster.r * 0.32} fill="#ffffff" />
                </g>
              ))}
            </g>

            {/* Center Ceremony Altar, Tufted Ottoman Bench & Glass Pedestals */}
            <g transform="translate(480, 425)">
              <rect x="-145" y="-22" width="290" height="6" rx="3" fill="#e5dec9" />
              <rect x="-115" y="-12" width="230" height="24" rx="10" fill="#f7f3eb" stroke="#c8bfa8" strokeWidth="1.5" />
              {[-85, -55, -25, 0, 25, 55, 85].map((tx) => (
                <circle key={tx} cx={tx} cy="0" r="2.2" fill="#b8ad96" />
              ))}
            </g>

            {/* Left & Right Perspectives of Ribbon-Tied Medallion Banquet Chairs & White Rose Aisle Runners */}
            {[-1, 1].map((side) => (
              <g key={side} transform={`translate(${side === -1 ? 165 : 795}, 445) scale(${side}, 1)`}>
                {/* Low White Rose Hedge along the Carpet Aisle */}
                {[0, 38, 76, 114].map((rx, i) => (
                  <g key={i} transform={`translate(${95 - rx * 0.35}, ${-10 + i * 14})`}>
                    <ellipse cx="0" cy="0" rx="44" ry="18" fill="#f4f0e6" />
                    <circle cx="-14" cy="-4" r="11" fill="#ffffff" />
                    <circle cx="6" cy="-6" r="12" fill="#fdfbf7" />
                    <circle cx="20" cy="2" r="10" fill="#ffffff" />
                  </g>
                ))}
                {/* Classic Medallion Chairs with Silk Ribbon Bows */}
                {[0, 1, 2].map((ch) => (
                  <g key={ch} transform={`translate(${-55 + ch * 32}, ${-38 + ch * 16}) scale(${1 - ch * 0.1})`}>
                    <ellipse cx="0" cy="0" rx="24" ry="32" fill="#e9e2d4" stroke="#cbbd9f" strokeWidth="2.5" />
                    {/* Cream Silk Ribbon Bow */}
                    <path d="M-18 -2 Q0 6 18 -2 L12 28 H-12 Z" fill="#f7f3ea" />
                    <circle cx="0" cy="2" r="5" fill="#dcd2be" />
                  </g>
                ))}
              </g>
            ))}
          </svg>

          {cmsData.heroBannerImageUrl && (
            <div className="t4-wave-custom-photo">
              <img
                src={cmsData.heroBannerImageUrl}
                alt={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
              />
            </div>
          )}
          {cmsData.allowInlinePhotoUpload && (
            <label className="t2-standee-upload-btn" title="ដាក់រូបគូស្វាមីភរិយាក្នុងក្លោងទ្វារផ្កាកុលាបស">
              ប្តូររូបក្នុងក្លោងទ្វារផ្កា
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  onUploadImage(e, (url) => onUpdateCms({ heroBannerImageUrl: url }))
                }
              />
            </label>
          )}
        </div>

        {/* Haute-Couture Pearl & Warm Stone Invitation Plaque */}
        <div className="t4-sage-backdrop t4-pearl-couture-plaque">
          <div className="t4-plaque-banner">
            <span>សិរីមង្គលអាពាហ៍ពិពាហ៍ • White Rose Couture Sanctuary</span>
          </div>

          <p className="t4-guest-greeting">សូមគោរពជូន៖ {guestName}</p>

          <div className="t4-parents-row">
            <div>
              <small>មាតាបិតាខាងកូនប្រុស</small>
              <strong>{cmsData.groomFather}</strong>
              <strong>{cmsData.groomMother}</strong>
            </div>
            <div>
              <small>មាតាបិតាខាងកូនស្រី</small>
              <strong>{cmsData.brideFather}</strong>
              <strong>{cmsData.brideMother}</strong>
            </div>
          </div>

          <h2 className="t4-couple-names">
            <span>{cmsData.groomKhmer}</span>
            <i>&</i>
            <span>{cmsData.brideKhmer}</span>
          </h2>

          <p className="t4-date-line">
            {cmsData.lunarDateFull}
            <br />
            ត្រូវនឹង <strong>{cmsData.solarDateDisplay}</strong> វេលាម៉ោង{" "}
            <strong>{cmsData.ceremonyTimeDisplay}</strong>
            <br />
            នៅ <strong>{cmsData.venueNameKhmer}</strong>
          </p>

          <div className="t4-countdown-row">
            <div>
              <strong>{toKhmerNum(countdown.days)}</strong>
              <small>ថ្ងៃ</small>
            </div>
            <div>
              <strong>{toKhmerNum(countdown.hours)}</strong>
              <small>ម៉ោង</small>
            </div>
            <div>
              <strong>{toKhmerNum(countdown.minutes)}</strong>
              <small>នាទី</small>
            </div>
            <div>
              <strong>{toKhmerNum(countdown.seconds)}</strong>
              <small>វិនាទី</small>
            </div>
          </div>

          <div className="t4-cta-buttons">
            <button type="button" className="t4-sage-gold-btn" onClick={onOpenRsvp}>
              បញ្ជាក់ការចូលរួម (RSVP)
            </button>
            <button type="button" className="t4-sage-outline-btn" onClick={onAddToCalendar}>
              រក្សាទុកក្នុងប្រតិទិន
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}