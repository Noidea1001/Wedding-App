import React, { useState } from "react"
import type { WeddingTemplateProps } from "../../../types/template"
import type { GalleryPhoto } from "../../../types/wedding"
import { toKhmerNum } from "../../../hooks/useCountdown"
import {
  AngkorBorder,
  CeremonyIcon,
  GoldDivider,
} from "../../kbach"
import { PopilRitual } from "../../shared/PopilRitual"
import { DigitalGiftCard } from "../../shared/DigitalGiftCard"
import { LuxuryGallerySection } from "../../shared/LuxuryGallerySection"

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
]

export function KhmerTraditionalTemplate({
  cmsData,
  guestName,
  countdown,
  onOpenRsvp,
  onAddToCalendar,
  onPlayChime,
  onQuickUpload,
  allowUpload = false,
}: WeddingTemplateProps) {
  const [activeDay, setActiveDay] = useState<1 | 2>(2)
  const [selectedSwatch, setSelectedSwatch] = useState(0)
  const [copiedShare, setCopiedShare] = useState(false)

  const handleShare = () => {
    if (typeof window === "undefined") return
    const shareData = {
      title: `សិរីមង្គលអាពាហ៍ពិពាហ៍ ${cmsData.shortGroom} & ${cmsData.shortBride}`,
      text: `សូមគោរពអញ្ជើញចូលរួមពិធីមង្គលការ ${cmsData.shortGroom} & ${cmsData.shortBride} នៅ ${cmsData.solarDateDisplay}`,
      url: window.location.href,
    }
    if (navigator.share) {
      navigator.share(shareData).catch(() => {})
    } else {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareData.text)}`,
        "_blank"
      )
    }
  }

  // Guestbook Wishes state (local to guestbook)
  const [wishName, setWishName] = useState("")
  const [wishRelation, setWishRelation] = useState("ភ្ញៀវកិត្តិយស")
  const [wishMessage, setWishMessage] = useState("")
  const [localWishes, setLocalWishes] = useState([
    {
      id: "w-1",
      name: "ឯកឧត្តម សុខា និង លោកជំទាវ",
      relation: "ភ្ញៀវកិត្តិយសខាងកូនប្រុស",
      message:
        "សូមជូនពរគូស្វាមីភរិយាថ្មី ទទួលបាននូវសុភមង្គល សេចក្តីសុខចម្រើន និងស្រឡាញ់គ្នាជារៀងរហូត ដល់ចាស់កោងខ្នង។",
      time: "២ ម៉ោងមុន",
    },
    {
      id: "w-2",
      name: "លោក ចាន់ថន និង ភរិយា",
      relation: "មិត្តភក្តិកូនក្រមុំ",
      message:
        "អបអរសាទរថ្ងៃមង្គលជ័យ សុវណ្ណ & មាលា! សូមឱ្យជីវិតគ្រួសារថ្មីពោរពេញដោយស្នាមញញឹម ទ្រព្យសម្បត្តិហូរចូល និងសុខភាពល្អបរិបូរណ៍។",
      time: "៥ ម៉ោងមុន",
    },
  ])

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wishName.trim() || !wishMessage.trim()) return
    setLocalWishes([
      {
        id: `w-${Date.now()}`,
        name: wishName.trim(),
        relation: wishRelation,
        message: wishMessage.trim(),
        time: "អម្បាញ់មិញនេះ",
      },
      ...localWishes,
    ])
    setWishName("")
    setWishMessage("")
    if (onPlayChime) onPlayChime()
  }

  return (
    <div className="khmer-traditional-layout">
      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home">
        <div className="section-container">
          <AngkorBorder variant="damask" showCenterCrests className="hero-luxury-frame">
            <div className="hero-content reveal-on-scroll is-visible">
              <p className="eyebrow">សិរីសួស្តី អាពាហ៍ពិពាហ៍ • ប្រពៃណីខ្មែរ</p>
              <GoldDivider />

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
                    <div className="hero-fallback-temple">
                      <svg viewBox="0 0 360 200" className="hero-temple-svg" aria-hidden="true">
                        <g filter="url(#kbach-emboss)">
                          <path
                            d="M60 170 C100 130 140 100 180 40 C220 100 260 130 300 170 Z"
                            fill="url(#kbach-gold-grad)"
                          />
                          <circle cx="180" cy="40" r="10" fill="url(#kbach-ruby-gem)" />
                          <circle cx="180" cy="110" r="40" fill="url(#kbach-candle-glow)" />
                        </g>
                      </svg>
                    </div>
                  )}

                  {allowUpload && onQuickUpload && (
                    <label className="quick-photo-upload-chip hero-upload-chip">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          onQuickUpload(e, (url) => {
                            cmsData.heroBannerImageUrl = url
                          })
                        }
                      />
                      <span>ប្តូររូបភាព</span>
                    </label>
                  )}
                </div>

                <div className="pop-paper">
                  <p className="invitation-line">យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ</p>
                  <h1>
                    <span>{cmsData.shortGroom}</span>
                    <b>&amp;</b>
                    <span>{cmsData.shortBride}</span>
                  </h1>
                  <p className="hero-subtitle">
                    ចូលរួមជាសក្ខីភាពនៃសេចក្តីស្រឡាញ់ និងពរជ័យសិរីមង្គល
                  </p>
                  <div className="hero-date">
                    <span>{cmsData.dayOfWeekKhmer}</span>
                    <strong>{cmsData.dayNumberKhmer}</strong>
                    <span>{cmsData.monthYearKhmer}</span>
                  </div>
                </div>
              </article>

              <div className="hero-cta-row">
                <button className="gold-button" onClick={onOpenRsvp}>
                  បញ្ជាក់ការចូលរួម (RSVP)
                </button>
                <a href="#invitation" className="outline-button dark-outline">
                  មើលសំបុត្រអញ្ជើញផ្លូវការ
                </a>
              </div>
            </div>
          </AngkorBorder>
        </div>
      </section>

      {/* ===== FORMAL INVITATION SECTION ===== */}
      <section className="formal-invitation-section" id="invitation">
        <div className="section-container reveal-on-scroll is-visible">
          <AngkorBorder variant="damask" showCenterCrests>
            <div className="khmer-card-inner">
              <p className="khmer-card-motto">សិរីមង្គលអាពាហ៍ពិពាហ៍</p>
              <GoldDivider />

              {/* VIP Guest Badge */}
              <div className="vip-guest-ribbon">
                <small>សូមគោរពជូនភ្ញៀវកិត្តិយស</small>
                <strong>{guestName}</strong>
              </div>

              {/* Parents' Names Grid */}
              <div className="parents-grid">
                <div className="parent-column">
                  <span className="parent-side-label">មាតាបិតាខាងកូនប្រុស</span>
                  <h3>{cmsData.groomFather}</h3>
                  <h3>{cmsData.groomMother}</h3>
                </div>

                <div className="parents-center-emblem" aria-hidden="true">
                  <div className="emblem-circle">
                    <span>
                      {cmsData.monogramLeft} &amp; {cmsData.monogramRight}
                    </span>
                  </div>
                </div>

                <div className="parent-column">
                  <span className="parent-side-label">មាតាបិតាខាងកូនស្រី</span>
                  <h3>{cmsData.brideFather}</h3>
                  <h3>{cmsData.brideMother}</h3>
                </div>
              </div>

              {/* Formal Honorific Block */}
              <div className="formal-honorific-block">
                <h2 className="formal-heading">មានកិត្តិយសសូមគោរពអញ្ជើញ</h2>
                <p className="formal-paragraph">
                  សម្តេច ទ្រង់ ឯកឧត្តម អ្នកឧកញ៉ា ឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា
                  អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល
                  ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំទាំងពីរ៖
                </p>
              </div>

              {/* Groom & Bride Showcase Grid */}
              <div className="couple-showcase-grid">
                <div className="couple-box">
                  <div className="couple-avatar-frame">
                    {cmsData.groomAvatarUrl ? (
                      <img src={cmsData.groomAvatarUrl} alt={cmsData.groomKhmer} />
                    ) : (
                      <svg viewBox="0 0 120 120" className="couple-royal-portrait-svg" aria-hidden="true">
                        <g filter="url(#kbach-emboss)">
                          <circle cx="60" cy="60" r="54" fill="#320308" stroke="url(#kbach-gold-grad)" strokeWidth="2.2" />
                          <circle cx="60" cy="46" r="15" fill="url(#kbach-gold-grad)" />
                          <path d="M47 40 C50 26 70 26 73 40 Z" fill="#FFF5C0" />
                          <path d="M32 98 C34 72 44 64 60 64 C76 64 86 72 88 98 Z" fill="url(#kbach-gold-grad)" stroke="#5A3604" strokeWidth="0.8" />
                          <circle cx="60" cy="82" r="3" fill="url(#kbach-ruby-gem)" />
                        </g>
                      </svg>
                    )}
                  </div>
                  <span className="couple-role">កូនប្រុសនាម</span>
                  <h3 className="couple-khmer-name">{cmsData.groomKhmer}</h3>
                  <p className="couple-latin-name">{cmsData.groomLatin}</p>
                </div>

                <div className="couple-union-symbol" aria-hidden="true">
                  <div className="union-heart-ring">
                    <span>ជាគូនឹង</span>
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
                          <path d="M49 42 L60 12 L71 42 Z" fill="url(#kbach-gold-grad)" stroke="#FFF8D6" strokeWidth="0.8" />
                          <circle cx="60" cy="49" r="14" fill="url(#kbach-gold-soft)" />
                          <path d="M34 98 C36 74 46 66 60 66 C74 66 84 74 86 98 Z" fill="url(#kbach-gold-soft)" stroke="#5A3604" strokeWidth="0.8" />
                          <circle cx="60" cy="32" r="2.8" fill="url(#kbach-ruby-gem)" />
                        </g>
                      </svg>
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
                  នៅ <strong>{cmsData.venueHallKhmer}</strong>
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="countdown-wrapper" aria-label="រាប់ថយក្រោយ">
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
                <button className="gold-button" onClick={onOpenRsvp}>
                  ឆ្លើយតបការអញ្ជើញ (RSVP)
                </button>
                <button className="outline-button dark-outline" onClick={onAddToCalendar}>
                  រក្សាទុកក្នុងប្រតិទិន (Calendar)
                </button>
                <button className="outline-button dark-outline" onClick={handleShare}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: 6 }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  {copiedShare ? "បានចម្លង Link រួចរាល់" : "ចែករំលែកធៀបការ (Share)"}
                </button>
              </div>
            </div>
          </AngkorBorder>
        </div>
      </section>

      {/* ===== POPIL BLESSING RITUAL ===== */}
      <PopilRitual
        coupleLabel={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
        onPlayChime={onPlayChime}
      />

      {/* ===== CEREMONY SCHEDULE ===== */}
      <section className="schedule-section" id="schedule">
        <div className="section-container reveal-on-scroll is-visible">
          <AngkorBorder variant="damask" showCenterCrests>
            <div className="schedule-heading">
              <p className="section-kicker">កាលវិភាគពិធីប្រពៃណីខ្មែរ</p>
              <h2>កម្មវិធីមង្គលការ</h2>
              <GoldDivider />
              <p>សូមមេត្តាអញ្ជើញមកដល់តាមកម្មវិធីដូចខាងក្រោម ដើម្បីញ៉ាំងពិធីឱ្យកាន់តែអធិកអធម</p>

              <div className="schedule-tabs" role="tablist">
                <button
                  type="button"
                  className={`schedule-tab ${activeDay === 1 ? "is-active" : ""}`}
                  onClick={() => setActiveDay(1)}
                >
                  <small>{cmsData.dayOneLabel}</small>
                  <strong>ពិធីសូត្រមន្ត (Day 1)</strong>
                </button>
                <button
                  type="button"
                  className={`schedule-tab ${activeDay === 2 ? "is-active" : ""}`}
                  onClick={() => setActiveDay(2)}
                >
                  <small>{cmsData.dayTwoLabel}</small>
                  <strong>ពិធីមង្គលការ (Main Day)</strong>
                </button>
              </div>
            </div>

            <div className="timeline" key={activeDay}>
              {(activeDay === 1 ? cmsData.dayOneEvents : cmsData.dayTwoEvents).map((event, index) => (
                <article className="event" key={event.id}>
                  <div className="event-time">
                    <strong>{event.time}</strong>
                    <span>{event.period}</span>
                  </div>
                  <div className="timeline-mark">
                    <i>{toKhmerNum(index + 1)}</i>
                  </div>
                  <div className="event-body damask-surface">
                    <div className="event-header-row">
                      <h3>{event.title}</h3>
                      <CeremonyIcon type={event.icon} className="timeline-icon-svg" />
                    </div>
                    <h4>{event.subtitle}</h4>
                    <p>{event.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </AngkorBorder>
        </div>
      </section>

      {/* ===== DRESS CODE SECTION ===== */}
      <section className="dresscode-section" id="dresscode">
        <div className="section-container reveal-on-scroll is-visible">
          <AngkorBorder variant="damask" showCenterCrests>
            <div className="dresscode-content">
              <p className="section-kicker">សម្លៀកបំពាក់កិត្តិយស • Dress Code</p>
              <h2>ពណ៌សម្លៀកបំពាក់ប្រពៃណីខ្មែរ</h2>
              <GoldDivider />
              <p className="dresscode-lead">
                ដើម្បីឱ្យពិធីមង្គលការកាន់តែស្រស់បំព្រង និងរក្សាបាននូវភាពថ្លៃថ្នូរតាមប្រពៃណីជាតិ
                ភ្ញៀវកិត្តិយសអាចជ្រើសរើសពណ៌សម្លៀកបំពាក់ដូចខាងក្រោម៖
              </p>

              <div className="swatch-list">
                {dressSwatches.map((swatch, idx) => (
                  <button
                    type="button"
                    key={swatch.name}
                    className={`swatch-item ${selectedSwatch === idx ? "is-selected" : ""}`}
                    onClick={() => setSelectedSwatch(idx)}
                  >
                    <span
                      className="swatch-color-disc"
                      style={{
                        backgroundColor: swatch.hex,
                        boxShadow: `0 4px 14px ${swatch.hex}55`,
                      }}
                    />
                    <strong>{swatch.name}</strong>
                    <small>{swatch.khmer}</small>
                  </button>
                ))}
              </div>
            </div>
          </AngkorBorder>
        </div>
      </section>

      {/* ===== LUXURY PRE-WEDDING GALLERY SECTION ===== */}
      <LuxuryGallerySection gallery={cmsData.gallery} variant="damask" />

      {/* ===== BLESSINGS & WISHES SECTION (Equal Height Cards) ===== */}
      <section className="blessings-section" id="blessings">
        <div className="section-container reveal-on-scroll is-visible">
          <div className="blessings-grid">
            <AngkorBorder variant="damask" showCenterCrests={false} className="gift-frame">
              <DigitalGiftCard
                cmsData={cmsData}
                allowUpload={allowUpload}
              />
            </AngkorBorder>

            <AngkorBorder variant="damask" showCenterCrests={false} className="wishes-frame">
              <div className="wishes-card-content">
                <p className="section-kicker">សៀវភៅជូនពរ • Guestbook</p>
                <h2>ផ្ញើសារជូនពរគូស្វាមីភរិយា</h2>
                <GoldDivider />

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
                  {localWishes.map((w) => (
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
            </AngkorBorder>
          </div>
        </div>
      </section>

      {/* ===== LOCATION / VENUE SECTION ===== */}
      <section className="location-section" id="location">
        <div className="section-container reveal-on-scroll is-visible">
          <AngkorBorder variant="damask" showCenterCrests={false} className="location-kbach-wrapper">
            <div className="location-inner-grid">
              <div className="location-card">
                <p className="section-kicker">ទីតាំងប្រារព្ធពិធី • Wedding Venue</p>
                <h2>{cmsData.venueNameKhmer}</h2>
                <GoldDivider />
                <p className="address">{cmsData.venueAddressKhmer}</p>
                <div className="location-actions">
                  <a
                    className="gold-button"
                    href={cmsData.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    បើកមើលក្នុង Google Maps
                  </a>
                </div>
              </div>

              <div className="map-art damask-surface">
                <iframe
                  title="Wedding Location Map"
                  src="https://maps.google.com/maps?q=The+Premier+Center+Sen+Sok&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 320, borderRadius: 8 }}
                  loading="lazy"
                />
              </div>
            </div>
          </AngkorBorder>
        </div>
      </section>
    </div>
  )
}
