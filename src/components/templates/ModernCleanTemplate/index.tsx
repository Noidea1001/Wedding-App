import React, { useState } from "react"
import type { WeddingTemplateProps } from "../../../types/template"
import type { GalleryPhoto } from "../../../types/wedding"
import { toKhmerNum } from "../../../hooks/useCountdown"
import { DigitalGiftCard } from "../../shared/DigitalGiftCard"
import { LuxuryGallerySection } from "../../shared/LuxuryGallerySection"

export function ModernCleanTemplate({
  cmsData,
  guestName,
  countdown,
  onOpenRsvp,
  onAddToCalendar,
  onPlayChime,
  allowUpload = false,
}: WeddingTemplateProps) {
  const [activeDay, setActiveDay] = useState<1 | 2>(2)

  const [wishName, setWishName] = useState("")
  const [wishRelation, setWishRelation] = useState("ភ្ញៀវកិត្តិយស")
  const [wishMessage, setWishMessage] = useState("")
  const [localWishes, setLocalWishes] = useState([
    {
      id: "mw-1",
      name: "ឯកឧត្តម សុខា និង លោកជំទាវ",
      relation: "ភ្ញៀវ VIP",
      message:
        "សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ ដល់គូស្វាមីភរិយាថ្មី ឱ្យស្រឡាញ់គ្នាជារៀងរហូត។",
      time: "២ ម៉ោងមុន",
    },
    {
      id: "mw-2",
      name: "លោក ចាន់ថន និង ភរិយា",
      relation: "មិត្តភក្តិ",
      message: "Congratulations on your special day! Wishing you both a lifetime of love and happiness.",
      time: "៤ ម៉ោងមុន",
    },
  ])

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wishName.trim() || !wishMessage.trim()) return
    setLocalWishes([
      {
        id: `mw-${Date.now()}`,
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
    <div className="modern-clean-layout">
      {/* ===== MODERN HERO ===== */}
      <section className="modern-hero-section" id="home">
        <div className="modern-container">
          <div className="modern-hero-card">
            <span className="modern-kicker">WEDDING CELEBRATION • សិរីមង្គលអាពាហ៍ពិពាហ៍</span>
            <div className="modern-monogram-circle">
              <span>{cmsData.monogramLeft} &amp; {cmsData.monogramRight}</span>
            </div>

            <h1 className="modern-couple-title">
              <span>{cmsData.groomKhmer}</span>
              <i>&amp;</i>
              <span>{cmsData.brideKhmer}</span>
            </h1>
            <p className="modern-latin-names">
              {cmsData.groomLatin} &bull; {cmsData.brideLatin}
            </p>

            <div className="modern-hero-divider" />

            <div className="modern-hero-meta">
              <div className="meta-block">
                <small>កាលបរិច្ឆេទ</small>
                <strong>{cmsData.solarDateDisplay}</strong>
              </div>
              <div className="meta-block">
                <small>ទីតាំងប្រារព្ធពិធី</small>
                <strong>{cmsData.venueHallKhmer}</strong>
              </div>
            </div>

            <div className="modern-cta-row">
              <button type="button" className="modern-btn-primary" onClick={onOpenRsvp}>
                ឆ្លើយតបការអញ្ជើញ (RSVP)
              </button>
              <button type="button" className="modern-btn-secondary" onClick={onAddToCalendar}>
                កត់ត្រាក្នុងប្រតិទិន (Save Date)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL INVITATION CARD ===== */}
      <section className="modern-invitation-section" id="invitation">
        <div className="modern-container">
          <div className="modern-paper-card">
            <div className="modern-guest-pill">
              <small>សូមគោរពជូនភ្ញៀវកិត្តិយស</small>
              <strong>{guestName}</strong>
            </div>

            <div className="modern-parents-row">
              <div className="modern-parent-col">
                <span className="col-label">មាតាបិតាខាងកូនប្រុស</span>
                <h4>{cmsData.groomFather}</h4>
                <h4>{cmsData.groomMother}</h4>
              </div>
              <div className="modern-ampersand-divider">&amp;</div>
              <div className="modern-parent-col">
                <span className="col-label">មាតាបិតាខាងកូនស្រី</span>
                <h4>{cmsData.brideFather}</h4>
                <h4>{cmsData.brideMother}</h4>
              </div>
            </div>

            <p className="modern-formal-text">
              មានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា
              អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល
              ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំទាំងពីរ៖
            </p>

            <div className="modern-couple-grid">
              <div className="modern-couple-cell">
                <div className="modern-avatar-frame">
                  {cmsData.groomAvatarUrl ? (
                    <img src={cmsData.groomAvatarUrl} alt={cmsData.groomKhmer} />
                  ) : (
                    <div className="modern-avatar-placeholder">
                      <span>{cmsData.monogramLeft}</span>
                    </div>
                  )}
                </div>
                <small className="cell-role">កូនប្រុស</small>
                <h3>{cmsData.groomKhmer}</h3>
                <p>{cmsData.groomLatin}</p>
              </div>

              <div className="modern-couple-center-symbol">
                <span>ជាគូនឹង</span>
              </div>

              <div className="modern-couple-cell">
                <div className="modern-avatar-frame">
                  {cmsData.brideAvatarUrl ? (
                    <img src={cmsData.brideAvatarUrl} alt={cmsData.brideKhmer} />
                  ) : (
                    <div className="modern-avatar-placeholder">
                      <span>{cmsData.monogramRight}</span>
                    </div>
                  )}
                </div>
                <small className="cell-role">កូនស្រី</small>
                <h3>{cmsData.brideKhmer}</h3>
                <p>{cmsData.brideLatin}</p>
              </div>
            </div>

            {/* Countdown Row */}
            <div className="modern-countdown-block">
              <span className="countdown-kicker">រាប់ថយក្រោយទៅកាន់ថ្ងៃមង្គលជ័យ</span>
              <div className="modern-countdown-cells">
                <div className="c-cell">
                  <strong>{toKhmerNum(countdown.days)}</strong>
                  <span>ថ្ងៃ</span>
                </div>
                <div className="c-cell">
                  <strong>{toKhmerNum(countdown.hours)}</strong>
                  <span>ម៉ោង</span>
                </div>
                <div className="c-cell">
                  <strong>{toKhmerNum(countdown.minutes)}</strong>
                  <span>នាទី</span>
                </div>
                <div className="c-cell">
                  <strong>{toKhmerNum(countdown.seconds)}</strong>
                  <span>វិនាទី</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MODERN TIMELINE ===== */}
      <section className="modern-timeline-section" id="schedule">
        <div className="modern-container">
          <div className="modern-section-header">
            <span className="modern-kicker">CEREMONY SCHEDULE</span>
            <h2>កម្មវិធីមង្គលការ</h2>
            <div className="modern-tab-pills">
              <button
                type="button"
                className={`tab-pill ${activeDay === 1 ? "is-active" : ""}`}
                onClick={() => setActiveDay(1)}
              >
                {cmsData.dayOneLabel}
              </button>
              <button
                type="button"
                className={`tab-pill ${activeDay === 2 ? "is-active" : ""}`}
                onClick={() => setActiveDay(2)}
              >
                {cmsData.dayTwoLabel}
              </button>
            </div>
          </div>

          <div className="modern-events-list">
            {(activeDay === 1 ? cmsData.dayOneEvents : cmsData.dayTwoEvents).map((event, idx) => (
              <div key={event.id} className="modern-event-card">
                <div className="event-time-col">
                  <strong>{event.time}</strong>
                  <span>{event.period}</span>
                </div>
                <div className="event-bullet-col">
                  <span className="bullet-node">{toKhmerNum(idx + 1)}</span>
                </div>
                <div className="event-content-col">
                  <h3>{event.title}</h3>
                  <h4>{event.subtitle}</h4>
                  <p>{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LUXURY GALLERY ===== */}
      <LuxuryGallerySection gallery={cmsData.gallery} variant="clean" showBorder={false} />

      {/* ===== BLESSINGS & WISHES SECTION ===== */}
      <section className="modern-blessings-section" id="blessings">
        <div className="modern-container">
          <div className="modern-blessings-split">
            {/* Digital Gift */}
            <div className="modern-sub-card">
              <DigitalGiftCard cmsData={cmsData} allowUpload={allowUpload} />
            </div>

            {/* Guest Wishes */}
            <div className="modern-sub-card">
              <div className="modern-wishes-header">
                <span className="modern-kicker">GUESTBOOK</span>
                <h3>សៀវភៅជូនពរ</h3>
              </div>

              <form className="modern-wish-form" onSubmit={handleAddWish}>
                <div className="form-row">
                  <input
                    type="text"
                    required
                    placeholder="ឈ្មោះរបស់អ្នក..."
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
                    <option value="មិត្តភក្តិ">មិត្តភក្តិ</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="សរសេរពាក្យជូនពរ..."
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                />
                <button type="submit" className="modern-btn-primary">
                  ផ្ញើសារជូនពរ
                </button>
              </form>

              <div className="modern-wishes-feed">
                {localWishes.map((w) => (
                  <div key={w.id} className="modern-wish-item">
                    <div className="wish-meta">
                      <strong>{w.name}</strong>
                      <small>{w.relation} &bull; {w.time}</small>
                    </div>
                    <p>“{w.message}”</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VENUE & LOCATION ===== */}
      <section className="modern-venue-section" id="location">
        <div className="modern-container">
          <div className="modern-paper-card modern-venue-card">
            <span className="modern-kicker">LOCATION &amp; DIRECTIONS</span>
            <h2>{cmsData.venueNameKhmer}</h2>
            <p className="modern-venue-address">{cmsData.venueAddressKhmer}</p>
            <div className="modern-map-wrapper">
              <iframe
                title="Google Maps Location"
                src="https://maps.google.com/maps?q=The+Premier+Center+Sen+Sok&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: 8 }}
                loading="lazy"
              />
            </div>
            <a
              className="modern-btn-primary modern-map-btn"
              href={cmsData.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              បើកមើលក្នុង Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
