import { useState } from "react"
import type { WeddingTemplateProps } from "../../../types/template"
import type { GalleryPhoto } from "../../../types/wedding"
import { toKhmerNum } from "../../../hooks/useCountdown"
import { CeremonyIcon, GoldDivider, AngkorBorder } from "../../kbach"
import { PopilRitual } from "../../shared/PopilRitual"
import { DigitalGiftCard } from "../../shared/DigitalGiftCard"
import { LuxuryGallerySection } from "../../shared/LuxuryGallerySection"
import { LuxuryDamaskInvitationCard } from "./LuxuryDamaskInvitationCard"

export function GoldDamaskTemplate({
  cmsData,
  guestName,
  countdown,
  onOpenRsvp,
  onAddToCalendar,
  onPlayChime,
  allowUpload = false,
}: WeddingTemplateProps) {
  const [activeDay, setActiveDay] = useState<1 | 2>(2)

  // Local Guestbook Wishes
  const [wishName, setWishName] = useState("")
  const [wishRelation, setWishRelation] = useState("ភ្ញៀវកិត្តិយស")
  const [wishMessage, setWishMessage] = useState("")
  const [localWishes, setLocalWishes] = useState([
    {
      id: "gw-1",
      name: "ឯកឧត្តម សុខា និង លោកជំទាវ",
      relation: "ភ្ញៀវ VIP",
      message:
        "សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ដល់គូស្វាមីភរិយាថ្មី ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង។",
      time: "១ ម៉ោងមុន",
    },
    {
      id: "gw-2",
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
        id: `gw-${Date.now()}`,
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
    <div className="gold-damask-template-root w-full min-h-screen py-6">
      {/* Visual Overlay for overall page elegance */}
      <div className="w-full flex flex-col gap-8">
        {/* 1. MASTER LUXURY DAMASK INVITATION CARD */}
        <section id="invitation" className="w-full">
          <LuxuryDamaskInvitationCard
            cmsData={cmsData}
            guestName={guestName}
            defaultTexture="gold-damask"
            showTextureSwitcher={false}
            onOpenRsvp={onOpenRsvp}
            onAddToCalendar={onAddToCalendar}
          />
        </section>

        {/* 2. SACRED POPIL BLESSING RITUAL */}
        <PopilRitual
          coupleLabel={`${cmsData.shortGroom} & ${cmsData.shortBride}`}
          onPlayChime={onPlayChime}
        />

        {/* 3. CEREMONY SCHEDULE */}
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

        {/* 4. LUXURY PHOTO GALLERY */}
        <LuxuryGallerySection gallery={cmsData.gallery} variant="damask" />

        {/* 5. BLESSINGS & GUESTBOOK (Equal Height Cards) */}
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

        {/* 6. LOCATION / VENUE */}
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
    </div>
  )
}
