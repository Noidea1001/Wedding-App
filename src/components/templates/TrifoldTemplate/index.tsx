import React, { useState } from "react"
import type { WeddingTemplateProps } from "../../../types/template"
import type { GalleryPhoto } from "../../../types/wedding"
import { toKhmerNum } from "../../../hooks/useCountdown"
import { AngkorBorder, CeremonyIcon, GoldDivider } from "../../kbach"
import { PopilRitual } from "../../shared/PopilRitual"
import { DigitalGiftCard } from "../../shared/DigitalGiftCard"
import { LightboxModal } from "../../shared/LightboxModal"
import { TrifoldInvitation } from "../../trifold"

export function TrifoldTemplate({
  cmsData,
  guestName,
  onOpenRsvp,
  onAddToCalendar,
  onPlayChime,
  allowUpload = false,
}: WeddingTemplateProps) {
  const [activeDay, setActiveDay] = useState<1 | 2>(2)
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null)

  // Local Guestbook Wishes state
  const [wishName, setWishName] = useState("")
  const [wishRelation, setWishRelation] = useState("ភ្ញៀវកិត្តិយស")
  const [wishMessage, setWishMessage] = useState("")
  const [localWishes, setLocalWishes] = useState([
    {
      id: "tw-1",
      name: "ឯកឧត្តម សុខា និង លោកជំទាវ",
      relation: "ភ្ញៀវ VIP",
      message:
        "សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ដល់គូស្វាមីភរិយាថ្មី ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង។",
      time: "១ ម៉ោងមុន",
    },
    {
      id: "tw-2",
      name: "លោក ចាន់ថន និង ភរិយា",
      relation: "មិត្តភក្តិកូនក្រមុំ",
      message: "សូមឱ្យចំណងអាពាហ៍ពិពាហ៍នេះពោរពេញដោយសុភមង្គល វិបុលសុខ និងជោគជ័យគ្រប់ភារកិច្ច។",
      time: "៣ ម៉ោងមុន",
    },
  ])

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!wishName.trim() || !wishMessage.trim()) return
    setLocalWishes([
      {
        id: `tw-${Date.now()}`,
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
    <div className="trifold-template-root w-full min-h-screen">
      {/* ============================================================== */}
      {/* 1. HERO & INTERACTIVE 3-PANEL TRIFOLD OPENING ANIMATION       */}
      {/* ============================================================== */}
      <section id="invitation" className="w-full">
        <TrifoldInvitation
          cmsData={cmsData}
          guestName={guestName}
          onOpenRsvp={onOpenRsvp}
          onAddToCalendar={onAddToCalendar}
          onPlayChime={onPlayChime}
          initialOpen={false}
        />
      </section>

      <div className="w-full flex flex-col gap-8 py-6">
        {/* ============================================================== */}
        {/* 2. SACRED POPIL BLESSING RITUAL                                */}
        {/* ============================================================== */}
        <PopilRitual
          coupleLabel={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
          onPlayChime={onPlayChime}
        />

        {/* ============================================================== */}
        {/* 3. 2-DAY CAMBODIAN CEREMONY SCHEDULE                           */}
        {/* ============================================================== */}
        <section className="schedule-section w-full" id="schedule">
          <div className="section-container">
            <AngkorBorder variant="damask" showCenterCrests>
              <div className="schedule-heading text-center">
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

        {/* ============================================================== */}
        {/* 4. PRE-WEDDING PHOTO GALLERY                                   */}
        {/* ============================================================== */}
        <section className="gallery-section w-full" id="gallery">
          <div className="section-container">
            <AngkorBorder variant="damask" showCenterCrests>
              <div className="section-header-center text-center">
                <p className="section-kicker">កម្រងរូបភាពអនុស្សាវរីយ៍ • Gallery</p>
                <h2>រូបថតត្រៀមអាពាហ៍ពិពាហ៍ (Pre-Wedding)</h2>
                <GoldDivider />
              </div>

              <div className="gallery-grid">
                {cmsData.gallery.map((photo) => (
                  <div
                    key={photo.id}
                    className="gallery-card"
                    onClick={() => setActivePhoto(photo)}
                  >
                    <div className="gallery-frame-outer">
                      <div className="gallery-image-stage">
                        {photo.imageUrl ? (
                          <img src={photo.imageUrl} alt={photo.title} />
                        ) : (
                          <div
                            className="gallery-fallback-art"
                            style={{ background: photo.gradient }}
                          >
                            <span>{photo.title}</span>
                          </div>
                        )}
                      </div>
                      <div className="gallery-info damask-surface">
                        <span className="gallery-tag-pill">{photo.tag}</span>
                        <h3>{photo.title}</h3>
                        <p>{photo.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AngkorBorder>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. DIGITAL GIFT (KHQR) & WISHES GUESTBOOK (EQUAL HEIGHT)       */}
        {/* ============================================================== */}
        <section className="blessings-section w-full" id="blessings">
          <div className="section-container">
            <div className="blessings-grid">
              <AngkorBorder variant="damask" showCenterCrests={false} className="gift-frame">
                <DigitalGiftCard cmsData={cmsData} allowUpload={allowUpload} />
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

        {/* ============================================================== */}
        {/* 6. VENUE & LOCATION MAP                                        */}
        {/* ============================================================== */}
        <section className="location-section w-full" id="location">
          <div className="section-container">
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

      {/* Lightbox Modal */}
      <LightboxModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </div>
  )
}
