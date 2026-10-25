import { useState } from "react"
import type { WeddingCmsData } from "../../types/wedding"
import type { RsvpRecord, WishRecord } from "../../types/guest"
import { RsvpStats } from "./RsvpStats"
import { GuestTable } from "./GuestTable"
import { VipLinkGen } from "./VipLinkGen"

export interface AdminDashboardProps {
  open: boolean
  onClose: () => void
  data: WeddingCmsData
  onChange: (updated: WeddingCmsData) => void
  rsvps: RsvpRecord[]
  onDeleteRsvp: (id: string) => void
  wishes: WishRecord[]
  onDeleteWish: (id: string) => void
  onSelectGuestPreview: (name: string) => void
}

export function AdminDashboard({
  open,
  onClose,
  data,
  onChange,
  rsvps,
  onDeleteRsvp,
  wishes,
  onDeleteWish,
  onSelectGuestPreview,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "couples" | "venue" | "schedule" | "banking" | "rsvp" | "wishes" | "settings"
  >("rsvp")

  if (!open) return null

  const updateField = <K extends keyof WeddingCmsData>(
    field: K,
    val: WeddingCmsData[K],
  ) => {
    onChange({ ...data, [field]: val })
  }

  // Calculate RSVP stats
  const totalResponses = rsvps.length
  const attendingCount = rsvps.filter((r) => r.attending === "yes").length
  const notAttendingCount = rsvps.filter((r) => r.attending === "no").length
  const totalGuests = rsvps
    .filter((r) => r.attending === "yes")
    .reduce((sum, r) => sum + (r.guests || 1), 0)

  // Export JSON
  const handleExportJson = () => {
    const payload = JSON.stringify(data, null, 2)
    const blob = new Blob([payload], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `wedding-cms-data-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="cms-drawer-overlay" role="dialog" aria-modal="true">
      <div className="cms-drawer-panel">
        <div className="cms-drawer-header">
          <div>
            <h2>ផ្ទាំងគ្រប់គ្រងធៀបការ (Wedding Admin Studio)</h2>
            <p>គ្រប់គ្រងទិន្នន័យ កាលបរិច្ឆេទ ភ្ញៀវ RSVP និងម៉ូតធៀបការ</p>
          </div>
          <button className="cms-close-btn" onClick={onClose} aria-label="បិទ">
            &times;
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="cms-tabs-bar">
          <button
            type="button"
            className={`cms-tab-btn ${activeTab === "rsvp" ? "is-active" : ""}`}
            onClick={() => setActiveTab("rsvp")}
          >
            ភ្ញៀវ &amp; RSVP ({rsvps.length})
          </button>
          <button
            type="button"
            className={`cms-tab-btn ${activeTab === "couples" ? "is-active" : ""}`}
            onClick={() => setActiveTab("couples")}
          >
            កូនកំលោះ-កូនក្រមុំ
          </button>
          <button
            type="button"
            className={`cms-tab-btn ${activeTab === "venue" ? "is-active" : ""}`}
            onClick={() => setActiveTab("venue")}
          >
            កាលបរិច្ឆេទ &amp; ទីតាំង
          </button>
          <button
            type="button"
            className={`cms-tab-btn ${activeTab === "schedule" ? "is-active" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            កម្មវិធីបុណ្យ
          </button>
          <button
            type="button"
            className={`cms-tab-btn ${activeTab === "banking" ? "is-active" : ""}`}
            onClick={() => setActiveTab("banking")}
          >
            KHQR &amp; ធនាគារ
          </button>
          <button
            type="button"
            className={`cms-tab-btn ${activeTab === "wishes" ? "is-active" : ""}`}
            onClick={() => setActiveTab("wishes")}
          >
            សារជូនពរ ({wishes.length})
          </button>
          <button
            type="button"
            className={`cms-tab-btn ${activeTab === "settings" ? "is-active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ការកំណត់ &amp; ម៉ូត
          </button>
        </div>

        {/* Tab Body */}
        <div className="cms-drawer-body">
          {/* TAB 1: RSVP & GUESTS */}
          {activeTab === "rsvp" && (
            <div className="cms-tab-content">
              <RsvpStats
                totalResponses={totalResponses}
                attendingCount={attendingCount}
                notAttendingCount={notAttendingCount}
                totalGuests={totalGuests}
              />
              <VipLinkGen
                guestList={data.guestList}
                onSelectPreviewGuest={onSelectGuestPreview}
              />
              <GuestTable rsvps={rsvps} onDeleteRsvp={onDeleteRsvp} />
            </div>
          )}

          {/* TAB 2: COUPLE & PARENTS */}
          {activeTab === "couples" && (
            <div className="cms-tab-content">
              <div className="cms-card">
                <h3>ព័ត៌មានកូនកំលោះ</h3>
                <div className="cms-form-grid">
                  <label>
                    ឈ្មោះខ្មែរ
                    <input
                      type="text"
                      value={data.groomKhmer}
                      onChange={(e) => updateField("groomKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះឡាតាំង
                    <input
                      type="text"
                      value={data.groomLatin}
                      onChange={(e) => updateField("groomLatin", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះហៅក្រៅ
                    <input
                      type="text"
                      value={data.shortGroom}
                      onChange={(e) => updateField("shortGroom", e.target.value)}
                    />
                  </label>
                  <label>
                    អក្សរកាត់ (Monogram)
                    <input
                      type="text"
                      value={data.monogramLeft}
                      onChange={(e) => updateField("monogramLeft", e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>ព័ត៌មានកូនក្រមុំ</h3>
                <div className="cms-form-grid">
                  <label>
                    ឈ្មោះខ្មែរ
                    <input
                      type="text"
                      value={data.brideKhmer}
                      onChange={(e) => updateField("brideKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះឡាតាំង
                    <input
                      type="text"
                      value={data.brideLatin}
                      onChange={(e) => updateField("brideLatin", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះហៅក្រៅ
                    <input
                      type="text"
                      value={data.shortBride}
                      onChange={(e) => updateField("shortBride", e.target.value)}
                    />
                  </label>
                  <label>
                    អក្សរកាត់ (Monogram)
                    <input
                      type="text"
                      value={data.monogramRight}
                      onChange={(e) => updateField("monogramRight", e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>មាតាបិតាទាំងសងខាង</h3>
                <div className="cms-form-grid">
                  <label>
                    ឪពុកកូនប្រុស
                    <input
                      type="text"
                      value={data.groomFather}
                      onChange={(e) => updateField("groomFather", e.target.value)}
                    />
                  </label>
                  <label>
                    ម្តាយកូនប្រុស
                    <input
                      type="text"
                      value={data.groomMother}
                      onChange={(e) => updateField("groomMother", e.target.value)}
                    />
                  </label>
                  <label>
                    ឪពុកកូនស្រី
                    <input
                      type="text"
                      value={data.brideFather}
                      onChange={(e) => updateField("brideFather", e.target.value)}
                    />
                  </label>
                  <label>
                    ម្តាយកូនស្រី
                    <input
                      type="text"
                      value={data.brideMother}
                      onChange={(e) => updateField("brideMother", e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VENUE & DATES */}
          {activeTab === "venue" && (
            <div className="cms-tab-content">
              <div className="cms-card">
                <h3>កាលបរិច្ឆេទ</h3>
                <div className="cms-form-grid">
                  <label>
                    កាលបរិច្ឆេទសុរិយគតិ (Solar Date)
                    <input
                      type="text"
                      value={data.solarDateDisplay}
                      onChange={(e) => updateField("solarDateDisplay", e.target.value)}
                    />
                  </label>
                  <label>
                    កាលបរិច្ឆេទចន្ទគតិ (Lunar Date)
                    <input
                      type="text"
                      value={data.lunarDateFull}
                      onChange={(e) => updateField("lunarDateFull", e.target.value)}
                    />
                  </label>
                  <label>
                    វេលាម៉ោង
                    <input
                      type="text"
                      value={data.ceremonyTimeDisplay}
                      onChange={(e) => updateField("ceremonyTimeDisplay", e.target.value)}
                    />
                  </label>
                  <label>
                    កាលបរិច្ឆេទសម្រាប់ Countdown (ISO)
                    <input
                      type="text"
                      value={data.countdownIsoDate}
                      onChange={(e) => updateField("countdownIsoDate", e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>ទីតាំងប្រារព្ធពិធី</h3>
                <div className="cms-form-grid">
                  <label>
                    ឈ្មោះមជ្ឈមណ្ឌល / ទីកន្លែង
                    <input
                      type="text"
                      value={data.venueNameKhmer}
                      onChange={(e) => updateField("venueNameKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    អគារ / សាល
                    <input
                      type="text"
                      value={data.venueHallKhmer}
                      onChange={(e) => updateField("venueHallKhmer", e.target.value)}
                    />
                  </label>
                  <label style={{ gridColumn: "span 2" }}>
                    អាសយដ្ឋានលម្អិត
                    <input
                      type="text"
                      value={data.venueAddressKhmer}
                      onChange={(e) => updateField("venueAddressKhmer", e.target.value)}
                    />
                  </label>
                  <label style={{ gridColumn: "span 2" }}>
                    តំណភ្ជាប់ Google Maps
                    <input
                      type="text"
                      value={data.googleMapsUrl}
                      onChange={(e) => updateField("googleMapsUrl", e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="cms-tab-content">
              <div className="cms-card">
                <h3>កាលវិភាគថ្ងៃទី១ ({data.dayOneLabel})</h3>
                {data.dayOneEvents.map((evt, idx) => (
                  <div key={evt.id} className="schedule-edit-row">
                    <span>{idx + 1}.</span>
                    <input
                      type="text"
                      value={evt.time}
                      onChange={(e) => {
                        const updated = [...data.dayOneEvents]
                        updated[idx].time = e.target.value
                        updateField("dayOneEvents", updated)
                      }}
                      style={{ width: "90px" }}
                    />
                    <input
                      type="text"
                      value={evt.title}
                      onChange={(e) => {
                        const updated = [...data.dayOneEvents]
                        updated[idx].title = e.target.value
                        updateField("dayOneEvents", updated)
                      }}
                      style={{ flex: 1 }}
                    />
                  </div>
                ))}
              </div>

              <div className="cms-card">
                <h3>កាលវិភាគថ្ងៃទី២ ({data.dayTwoLabel})</h3>
                {data.dayTwoEvents.map((evt, idx) => (
                  <div key={evt.id} className="schedule-edit-row">
                    <span>{idx + 1}.</span>
                    <input
                      type="text"
                      value={evt.time}
                      onChange={(e) => {
                        const updated = [...data.dayTwoEvents]
                        updated[idx].time = e.target.value
                        updateField("dayTwoEvents", updated)
                      }}
                      style={{ width: "90px" }}
                    />
                    <input
                      type="text"
                      value={evt.title}
                      onChange={(e) => {
                        const updated = [...data.dayTwoEvents]
                        updated[idx].title = e.target.value
                        updateField("dayTwoEvents", updated)
                      }}
                      style={{ flex: 1 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BANKING & KHQR */}
          {activeTab === "banking" && (
            <div className="cms-tab-content">
              <div className="cms-card">
                <h3>គណនីធនាគារ &amp; KHQR</h3>
                <div className="cms-form-grid">
                  <label>
                    ឈ្មោះធនាគារ
                    <input
                      type="text"
                      value={data.bankName}
                      onChange={(e) => updateField("bankName", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះម្ចាស់គណនី
                    <input
                      type="text"
                      value={data.accountHolder}
                      onChange={(e) => updateField("accountHolder", e.target.value)}
                    />
                  </label>
                  <label>
                    លេខគណនីដុល្លារ (USD)
                    <input
                      type="text"
                      value={data.usdAccountNumber}
                      onChange={(e) => updateField("usdAccountNumber", e.target.value)}
                    />
                  </label>
                  <label>
                    លេខគណនីរៀល (KHR)
                    <input
                      type="text"
                      value={data.khrAccountNumber}
                      onChange={(e) => updateField("khrAccountNumber", e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WISHES */}
          {activeTab === "wishes" && (
            <div className="cms-tab-content">
              <div className="cms-card">
                <h3>សារជូនពរទាំងអស់ ({wishes.length})</h3>
                <div className="wishes-admin-list">
                  {wishes.map((w) => (
                    <div key={w.id} className="wish-admin-card">
                      <div className="wish-admin-header">
                        <div>
                          <strong>{w.name}</strong>
                          <small>{w.relation} &bull; {w.time}</small>
                        </div>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => onDeleteWish(w.id)}
                        >
                          លុប
                        </button>
                      </div>
                      <p>“{w.message}”</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & TEMPLATES */}
          {activeTab === "settings" && (
            <div className="cms-tab-content">
              <div className="cms-card">
                <h3>ជ្រើសរើសម៉ូតធៀបការ (Template Style)</h3>
                <div className="template-select-grid">
                  <button
                    type="button"
                    className={`template-select-card ${
                      data.templateStyle === "khmer-traditional" ||
                      data.templateStyle === "classic-kbach" ||
                      !data.templateStyle
                        ? "is-selected"
                        : ""
                    }`}
                    onClick={() => updateField("templateStyle", "khmer-traditional")}
                  >
                    <strong>១. ក្បាច់ភ្ញីទេសមាសបុរាណ (Khmer Traditional)</strong>
                    <p>ស៊ុមមាសក្បាច់ខ្មែរ ក្រណាត់សូត្រក្រហម ពិធីបង្វិលពពិល</p>
                  </button>

                  <button
                    type="button"
                    className={`template-select-card ${
                      data.templateStyle === "gold-damask" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("templateStyle", "gold-damask")}
                  >
                    <strong>២. មាសឆ្អិនផ្កាដាម៉ាស (Luxury Gold Damask)</strong>
                    <p>សន្លឹកមាសផ្កាដាម៉ាស ផ្ទៃសូត្រក្រែម និងក្បាច់រាជវាំង 5 ម៉ូត</p>
                  </button>

                  <button
                    type="button"
                    className={`template-select-card ${
                      data.templateStyle === "modern-clean" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("templateStyle", "modern-clean")}
                  >
                    <strong>៣. ម៉ូតទំនើប (Modern Clean Luxury)</strong>
                    <p>ស្ទីលបែប Editorial Minimalist Alabaster &amp; Champagne Gold</p>
                  </button>
                </div>
              </div>

              {/* Dedicated Gold Damask Texture Selector (ONLY IN CMS) */}
              <div className="cms-card">
                <h3>ម៉ូតផ្ទៃខាងក្រោយសន្លឹកមាស (Gold Damask Textures)</h3>
                <p className="cms-hint">
                  ជ្រើសរើសប្រភេទសាច់ក្រណាត់សម្រាប់បង្ហាញលើទំព័រធៀបការ (កែប្រែបានតែក្នុង CMS ប៉ុណ្ណោះ ភ្ញៀវទូទៅនឹងមិនឃើញប៊ូតុងប្តូរទេ)៖
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "10px",
                    marginTop: "12px",
                  }}
                >
                  {[
                    { id: "gold-damask", label: "១. មាសឆ្អិនផ្កាដាម៉ាស (Gold Damask)" },
                    { id: "cream-subtle", label: "២. ក្រែមសូត្រផ្ការំដួល (Subtle Cream)" },
                    { id: "royal-bronze", label: "៣. ក្បាច់ភ្ញីទេសសំរឹទ្ធ (Royal Bronze Kbach)" },
                    { id: "royal-obsidian", label: "៤. ក្បាច់ភ្ញីទេសរាត្រី (Obsidian Royal Kbach)" },
                    { id: "gold-filigree", label: "៥. វល្លិមាសរំលេច (Gold Filigree)" },
                  ].map((tex) => (
                    <button
                      key={tex.id}
                      type="button"
                      className={`template-select-card ${
                        (data.goldDamaskTexture || "gold-damask") === tex.id ? "is-selected" : ""
                      }`}
                      onClick={() => updateField("goldDamaskTexture", tex.id as any)}
                    >
                      <strong>{tex.label}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cms-card">
                <h3>មុខងារបន្ថែម</h3>
                <div className="cms-toggle-list">
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={data.showCoverSplash}
                      onChange={(e) => updateField("showCoverSplash", e.target.checked)}
                    />
                    <span>បង្ហាញស្រោមសំបុត្រស្វាគមន៍ (Welcome Cover Modal)</span>
                  </label>
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={data.showFloatingPetals}
                      onChange={(e) => updateField("showFloatingPetals", e.target.checked)}
                    />
                    <span>បង្ហាញលម្អងផ្កាអណ្តែត (Floating Petals)</span>
                  </label>
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={data.clientShowcaseMode}
                      onChange={(e) => updateField("clientShowcaseMode", e.target.checked)}
                    />
                    <span>របៀបបង្ហាញអតិថិជន (Client Showcase Floating Bar)</span>
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>ទាញយកទិន្នន័យបម្រុងទុក (JSON Backup)</h3>
                <button type="button" className="cms-button gold-btn" onClick={handleExportJson}>
                  ទាញយកឯកសារ JSON (Export Backup)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
