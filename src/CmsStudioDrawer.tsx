import { useState } from "react"
import {
  defaultWeddingCmsData,
  type GuestItem,
  type RsvpRecord,
  type ScheduleItem,
  type WeddingCmsData,
  type WishRecord,
} from "./cmsData"

type CmsTab =
  | "couple"
  | "date-venue"
  | "schedule"
  | "gallery-khqr"
  | "guests-rsvp"
  | "theme-backup"

interface CmsStudioDrawerProps {
  open: boolean
  onClose: () => void
  data: WeddingCmsData
  onChange: (next: WeddingCmsData) => void
  rsvps: RsvpRecord[]
  onDeleteRsvp: (id: string) => void
  wishes: WishRecord[]
  onDeleteWish: (id: string) => void
  onSelectGuestPreview: (guestName: string) => void
}

const iconOptions = [
  { value: "offering", label: "ជើងពានបាយសី (Offering)" },
  { value: "monk", label: "ផ្លិតសូត្រមន្ត (Monk Blessing)" },
  { value: "procession", label: "ឆ័ត្ររួតហែជំនូន (Procession)" },
  { value: "scissors", label: "កន្ត្រៃមាសកាត់សក់ (Hair Cutting)" },
  { value: "popil", label: "ស្លឹកពពិល (Popil Candle)" },
  { value: "banquet", label: "ភោជនាហារ (Banquet)" },
]

export function CmsStudioDrawer({
  open,
  onClose,
  data,
  onChange,
  rsvps,
  onDeleteRsvp,
  wishes,
  onDeleteWish,
  onSelectGuestPreview,
}: CmsStudioDrawerProps) {
  const [activeTab, setActiveTab] = useState<CmsTab>("couple")
  const [scheduleDayEdit, setScheduleDayEdit] = useState<1 | 2>(2)
  const [newGuestName, setNewGuestName] = useState("")
  const [newGuestSide, setNewGuestSide] = useState<GuestItem["side"]>("ភ្ញៀវ VIP")
  const [newGuestTable, setNewGuestTable] = useState("VIP-03")
  const [copiedGuestId, setCopiedGuestId] = useState<string | null>(null)
  const [copiedUrlType, setCopiedUrlType] = useState<string | null>(null)
  const [savedToast, setSavedToast] = useState(false)

  if (!open) return null

  const copyShareUrl = (type: "guest" | "client" | "cms") => {
    const base = `${window.location.origin}${window.location.pathname}`
    const url =
      type === "guest"
        ? base
        : type === "client"
          ? `${base}?client=1`
          : `${base}?cms=1`
    navigator.clipboard?.writeText(url)
    setCopiedUrlType(type)
    setTimeout(() => setCopiedUrlType(null), 2400)
  }

  const updateField = <K extends keyof WeddingCmsData>(key: K, value: WeddingCmsData[K]) => {
    onChange({ ...data, [key]: value })
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onResult: (dataUrl: string) => void,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onResult(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const currentScheduleList = scheduleDayEdit === 1 ? data.dayOneEvents : data.dayTwoEvents
  const scheduleKey = scheduleDayEdit === 1 ? "dayOneEvents" : "dayTwoEvents"

  const updateScheduleItem = (id: string, patch: Partial<ScheduleItem>) => {
    const updated = currentScheduleList.map((item) =>
      item.id === id ? { ...item, ...patch } : item,
    )
    updateField(scheduleKey, updated)
  }

  const addScheduleItem = () => {
    const newItem: ScheduleItem = {
      id: `evt-${Date.now()}`,
      time: "០៨:៣០",
      period: "ព្រឹក",
      icon: "offering",
      title: "កម្មវិធីថ្មី",
      subtitle: "New Ceremony Event",
      detail: "ពិពណ៌នាអំពីកម្មវិធីមង្គលការ...",
    }
    updateField(scheduleKey, [...currentScheduleList, newItem])
  }

  const removeScheduleItem = (id: string) => {
    updateField(
      scheduleKey,
      currentScheduleList.filter((item) => item.id !== id),
    )
  }

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGuestName.trim()) return
    const newGuest: GuestItem = {
      id: `g-${Date.now()}`,
      name: newGuestName.trim(),
      title: "ភ្ញៀវកិត្តិយស",
      side: newGuestSide,
      table: newGuestTable.trim() || "VIP",
    }
    updateField("guestList", [newGuest, ...data.guestList])
    setNewGuestName("")
  }

  const removeGuest = (id: string) => {
    updateField(
      "guestList",
      data.guestList.filter((g) => g.id !== id),
    )
  }

  const copyGuestInviteUrl = (guest: GuestItem) => {
    const url = `${window.location.origin}${window.location.pathname}?guest=${encodeURIComponent(guest.name)}`
    navigator.clipboard?.writeText(url)
    onSelectGuestPreview(guest.name)
    setCopiedGuestId(guest.id)
    setTimeout(() => setCopiedGuestId(null), 2500)
  }

  const exportJsonConfig = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cambodian-wedding-cms-config.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJsonConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as WeddingCmsData
        if (parsed && parsed.groomKhmer && parsed.brideKhmer) {
          onChange(parsed)
          triggerSavedToast()
        }
      } catch {
        alert("ឯកសារ JSON មិនត្រឹមត្រូវទេ!")
      }
    }
    reader.readAsText(file)
  }

  const triggerSavedToast = () => {
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2200)
  }

  const totalAttendingGuests = rsvps
    .filter((r) => r.attending === "yes")
    .reduce((acc, r) => acc + Number(r.guests || 1), 0)

  return (
    <div className="cms-separate-page" role="region" aria-label="Wedding CMS Studio Page">
      <div className="cms-page-container">
        {/* Top Admin Page Header */}
        <header className="cms-header">
          <div className="cms-header-brand">
            <span className="cms-badge">CMS ADMIN PAGE</span>
            <div>
              <h2>ទំព័រគ្រប់គ្រងធៀបការឌីជីថល និងបញ្ជាការបង្ហាញជូនអតិថិជន</h2>
              <p>
                ទំព័រ CMS ដាច់ដោយឡែក (ភ្ញៀវទូទៅមើលមិនឃើញទំព័រនេះទេ) • កែប្រែទិន្នន័យ និងបញ្ជាម៉ូតសម្រាប់បង្ហាញអតិថិជន
              </p>
            </div>
          </div>

          <div className="cms-header-actions">
            {savedToast && <span className="cms-saved-pill">រក្សាទុកស្វ័យប្រវត្តិរួចរាល់</span>}
            <button
              type="button"
              className="cms-client-preview-btn"
              onClick={() => {
                onChange({
                  ...data,
                  clientShowcaseMode: true,
                  allowInlinePhotoUpload: true,
                })
                onClose()
              }}
            >
              បើកបង្ហាញជូនអតិថិជនមើល (Client View)
            </button>
            <button
              type="button"
              className="cms-guest-preview-btn"
              onClick={() => {
                onChange({
                  ...data,
                  clientShowcaseMode: false,
                  allowInlinePhotoUpload: false,
                  showHostLinkGenerator: false,
                })
                onClose()
              }}
            >
              មើលទំព័រភ្ញៀវសាធារណៈ (Pure Guest View)
            </button>
          </div>
        </header>

        {/* Master Client & Public View Controller Strip */}
        <section className="cms-controller-banner" aria-label="Client & Guest View Controller">
          <div className="cms-controller-top">
            <div className="cms-controller-title">
              <strong>ឧបករណ៍បញ្ជាការបង្ហាញលើទំព័រមុខ (Public vs. Client Showcase Controller)</strong>
              <span>
                កំណត់ថាតើត្រូវលាក់ឧបករណ៍ទាំងអស់សម្រាប់ភ្ញៀវកិត្តិយស ឬបើកឱ្យអតិថិជន (Client) រើសម៉ូតធៀបការ និងសាកល្បងដាក់រូបភាព
              </span>
            </div>
            <div className="cms-share-links">
              <button
                type="button"
                className="cms-link-chip"
                onClick={() => copyShareUrl("guest")}
              >
                {copiedUrlType === "guest" ? "បានចម្លង Link ភ្ញៀវ" : "ចម្លង Link ភ្ញៀវទូទៅ (Public)"}
              </button>
              <button
                type="button"
                className="cms-link-chip"
                onClick={() => copyShareUrl("client")}
              >
                {copiedUrlType === "client" ? "បានចម្លង Link អតិថិជន" : "ចម្លង Link អតិថិជន (?client=1)"}
              </button>
              <button
                type="button"
                className="cms-link-chip"
                onClick={() => copyShareUrl("cms")}
              >
                {copiedUrlType === "cms" ? "បានចម្លង Link CMS" : "ចម្លង Link ទំព័រ CMS (?cms=1)"}
              </button>
            </div>
          </div>

          <div className="cms-controller-switches">
            <label className={`cms-switch-card ${data.clientShowcaseMode ? "is-on" : ""}`}>
              <input
                type="checkbox"
                checked={Boolean(data.clientShowcaseMode)}
                onChange={(e) => updateField("clientShowcaseMode", e.target.checked)}
              />
              <div>
                <strong>របៀបបង្ហាញអតិថិជនរើសម៉ូត (Client Template Switcher)</strong>
                <small>
                  {data.clientShowcaseMode
                    ? "កំពុងបើក៖ អតិថិជនអាចឃើញរបារប្តូរម៉ូតធៀបការទាំង ៤ នៅលើទំព័រមុខ"
                    : "កំពុងបិទ (សម្រាប់ភ្ញៀវទូទៅ)៖ បង្ហាញតែធៀបការសុទ្ធ គ្មានរបារប្តូរម៉ូតទេ"}
                </small>
              </div>
            </label>

            <label className={`cms-switch-card ${data.allowInlinePhotoUpload ? "is-on" : ""}`}>
              <input
                type="checkbox"
                checked={Boolean(data.allowInlinePhotoUpload)}
                onChange={(e) => updateField("allowInlinePhotoUpload", e.target.checked)}
              />
              <div>
                <strong>ប៊ូតុងដាក់រូបភាពផ្ទាល់លើធៀបការ (Inline Photo Upload)</strong>
                <small>
                  {data.allowInlinePhotoUpload
                    ? "កំពុងបើក៖ អនុញ្ញាតឱ្យចុចដាក់រូបភាពផ្ទាល់លើស៊ុមរូបថត"
                    : "កំពុងបិទ (សម្រាប់ភ្ញៀវទូទៅ)៖ លាក់ប៊ូតុងប្តូររូបភាពទាំងអស់ពីភ្ញៀវ"}
                </small>
              </div>
            </label>

            <label className={`cms-switch-card ${data.showHostLinkGenerator ? "is-on" : ""}`}>
              <input
                type="checkbox"
                checked={Boolean(data.showHostLinkGenerator)}
                onChange={(e) => updateField("showHostLinkGenerator", e.target.checked)}
              />
              <div>
                <strong>ប្រអប់បង្កើតឈ្មោះភ្ញៀវលើធៀបការ (On-Card Guest Link Box)</strong>
                <small>
                  {data.showHostLinkGenerator
                    ? "កំពុងបើក៖ បង្ហាញប្រអប់វាយឈ្មោះភ្ញៀវនៅផ្នែកខាងក្រោមសំបុត្រអញ្ជើញ"
                    : "កំពុងបិទ (សម្រាប់ភ្ញៀវទូទៅ)៖ លាក់ប្រអប់បង្កើត Link ពីភ្ញៀវ"}
                </small>
              </div>
            </label>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="cms-tabs" aria-label="ផ្នែកគ្រប់គ្រង CMS">
          <button
            type="button"
            className={activeTab === "couple" ? "is-active" : ""}
            onClick={() => setActiveTab("couple")}
          >
            ១. គូស្វាមីភរិយា & មាតាបិតា
          </button>
          <button
            type="button"
            className={activeTab === "date-venue" ? "is-active" : ""}
            onClick={() => setActiveTab("date-venue")}
          >
            ២. កាលបរិច្ឆេទ & ទីតាំង
          </button>
          <button
            type="button"
            className={activeTab === "schedule" ? "is-active" : ""}
            onClick={() => setActiveTab("schedule")}
          >
            ៣. កម្មវិធីមង្គលការ
          </button>
          <button
            type="button"
            className={activeTab === "gallery-khqr" ? "is-active" : ""}
            onClick={() => setActiveTab("gallery-khqr")}
          >
            ៤. រូបភាព & ចងដៃ KHQR
          </button>
          <button
            type="button"
            className={activeTab === "guests-rsvp" ? "is-active" : ""}
            onClick={() => setActiveTab("guests-rsvp")}
          >
            ៥. បញ្ជីភ្ញៀវ & RSVP ({rsvps.length})
          </button>
          <button
            type="button"
            className={activeTab === "theme-backup" ? "is-active" : ""}
            onClick={() => setActiveTab("theme-backup")}
          >
            ៦. ពណ៌ធៀបការ & Backup
          </button>
        </nav>

        {/* Body Content */}
        <div className="cms-body">
          {/* TAB 1: COUPLE & PARENTS */}
          {activeTab === "couple" && (
            <div className="cms-section">
              <div className="cms-card">
                <h3>ព័ត៌មានកូនកំលោះ និងកូនក្រមុំ (Groom & Bride)</h3>
                <div className="cms-grid-2">
                  <label>
                    ឈ្មោះពេញកូនកំលោះ (ភាសាខ្មែរ)
                    <input
                      value={data.groomKhmer}
                      onChange={(e) => updateField("groomKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះពេញកូនក្រមុំ (ភាសាខ្មែរ)
                    <input
                      value={data.brideKhmer}
                      onChange={(e) => updateField("brideKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះកូនកំលោះ (អក្សរឡាតាំង)
                    <input
                      value={data.groomLatin}
                      onChange={(e) => updateField("groomLatin", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះកូនក្រមុំ (អក្សរឡាតាំង)
                    <input
                      value={data.brideLatin}
                      onChange={(e) => updateField("brideLatin", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះហៅក្រៅកូនកំលោះ (បង្ហាញលើទំព័រដើម)
                    <input
                      value={data.shortGroom}
                      onChange={(e) => updateField("shortGroom", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះហៅក្រៅកូនក្រមុំ (បង្ហាញលើទំព័រដើម)
                    <input
                      value={data.shortBride}
                      onChange={(e) => updateField("shortBride", e.target.value)}
                    />
                  </label>
                  <label>
                    អក្សរកាត់ត្រាមាសខាងឆ្វេង (Monogram 1)
                    <input
                      maxLength={3}
                      value={data.monogramLeft}
                      onChange={(e) => updateField("monogramLeft", e.target.value)}
                    />
                  </label>
                  <label>
                    អក្សរកាត់ត្រាមាសខាងស្តាំ (Monogram 2)
                    <input
                      maxLength={3}
                      value={data.monogramRight}
                      onChange={(e) => updateField("monogramRight", e.target.value)}
                    />
                  </label>
                  <label>
                    រូបថតកូនកំលោះ (Groom Portrait Image)
                    <div className="cms-upload-field">
                      <input
                        placeholder="Paste Image URL ឬចុច Upload..."
                        value={data.groomAvatarUrl || ""}
                        onChange={(e) => updateField("groomAvatarUrl", e.target.value)}
                      />
                      <label className="cms-upload-btn">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleImageUpload(e, (url) => updateField("groomAvatarUrl", url))
                          }
                        />
                      </label>
                    </div>
                  </label>
                  <label>
                    រូបថតកូនក្រមុំ (Bride Portrait Image)
                    <div className="cms-upload-field">
                      <input
                        placeholder="Paste Image URL ឬចុច Upload..."
                        value={data.brideAvatarUrl || ""}
                        onChange={(e) => updateField("brideAvatarUrl", e.target.value)}
                      />
                      <label className="cms-upload-btn">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleImageUpload(e, (url) => updateField("brideAvatarUrl", url))
                          }
                        />
                      </label>
                    </div>
                  </label>
                  <label>
                    រូបភាពកាតទំព័រដើម (Hero Banner Image)
                    <div className="cms-upload-field">
                      <input
                        placeholder="ទុកទទេដើម្បីប្រើរូបប្រាសាទ 3D..."
                        value={data.heroBannerImageUrl || ""}
                        onChange={(e) => updateField("heroBannerImageUrl", e.target.value)}
                      />
                      <label className="cms-upload-btn">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleImageUpload(e, (url) => updateField("heroBannerImageUrl", url))
                          }
                        />
                      </label>
                    </div>
                  </label>
                  <label>
                    រូបភាពទីតាំងប្រារព្ធពិធី (Venue Photo)
                    <div className="cms-upload-field">
                      <input
                        placeholder="Paste Image URL ឬចុច Upload..."
                        value={data.venuePhotoUrl || ""}
                        onChange={(e) => updateField("venuePhotoUrl", e.target.value)}
                      />
                      <label className="cms-upload-btn">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleImageUpload(e, (url) => updateField("venuePhotoUrl", url))
                          }
                        />
                      </label>
                    </div>
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>មាតាបិតាទាំងសងខាង (Parents of Groom & Bride)</h3>
                <div className="cms-grid-2">
                  <label>
                    ឪពុកខាងកូនប្រុស
                    <input
                      value={data.groomFather}
                      onChange={(e) => updateField("groomFather", e.target.value)}
                    />
                  </label>
                  <label>
                    ឪពុកខាងកូនស្រី
                    <input
                      value={data.brideFather}
                      onChange={(e) => updateField("brideFather", e.target.value)}
                    />
                  </label>
                  <label>
                    ម្តាយខាងកូនប្រុស
                    <input
                      value={data.groomMother}
                      onChange={(e) => updateField("groomMother", e.target.value)}
                    />
                  </label>
                  <label>
                    ម្តាយខាងកូនស្រី
                    <input
                      value={data.brideMother}
                      onChange={(e) => updateField("brideMother", e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATE & VENUE */}
          {activeTab === "date-venue" && (
            <div className="cms-section">
              <div className="cms-card">
                <h3>កាលបរិច្ឆេទចន្ទគតិ និងសុរិយគតិ (Lunar & Solar Date)</h3>
                <div className="cms-grid-2">
                  <label>
                    ថ្ងៃទីពេញ (សុរិយគតិ)
                    <input
                      value={data.solarDateDisplay}
                      onChange={(e) => updateField("solarDateDisplay", e.target.value)}
                    />
                  </label>
                  <label>
                    ម៉ោងទទួលភ្ញៀវពិសាភោជនាហារ
                    <input
                      value={data.ceremonyTimeDisplay}
                      onChange={(e) => updateField("ceremonyTimeDisplay", e.target.value)}
                    />
                  </label>
                  <label className="cms-col-span-2">
                    ថ្ងៃខែឆ្នាំចន្ទគតិខ្មែរ (Lunar Date)
                    <input
                      value={data.lunarDateFull}
                      onChange={(e) => updateField("lunarDateFull", e.target.value)}
                    />
                  </label>
                  <label>
                    ថ្ងៃក្នុងសប្តាហ៍ (លើកាតទំព័រដើម)
                    <input
                      value={data.dayOfWeekKhmer}
                      onChange={(e) => updateField("dayOfWeekKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    លេខថ្ងៃធំ (ឧ. ២៧)
                    <input
                      value={data.dayNumberKhmer}
                      onChange={(e) => updateField("dayNumberKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    ខែ និងឆ្នាំ (ឧ. ធ្នូ ២០២៦)
                    <input
                      value={data.monthYearKhmer}
                      onChange={(e) => updateField("monthYearKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    កាលបរិច្ឆេទរាប់ថយក្រោយ (ISO Format)
                    <input
                      value={data.countdownIsoDate}
                      onChange={(e) => updateField("countdownIsoDate", e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>ទីតាំងប្រារព្ធពិធី និងផែនទី (Venue & Google Maps)</h3>
                <div className="cms-grid-2">
                  <label>
                    ឈ្មោះមជ្ឈមណ្ឌល / ភោជនីយដ្ឋាន
                    <input
                      value={data.venueNameKhmer}
                      onChange={(e) => updateField("venueNameKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះអគារ / សាល (បង្ហាញក្នុងសំបុត្រ)
                    <input
                      value={data.venueHallKhmer}
                      onChange={(e) => updateField("venueHallKhmer", e.target.value)}
                    />
                  </label>
                  <label className="cms-col-span-2">
                    អាសយដ្ឋានពេញលេញ
                    <input
                      value={data.venueAddressKhmer}
                      onChange={(e) => updateField("venueAddressKhmer", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះទីតាំងលើផែនទី (អង់គ្លេស)
                    <input
                      value={data.venueEnglishLabel}
                      onChange={(e) => updateField("venueEnglishLabel", e.target.value)}
                    />
                  </label>
                  <label>
                    តំណភ្ជាប់ Google Maps URL
                    <input
                      value={data.googleMapsUrl}
                      onChange={(e) => updateField("googleMapsUrl", e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CEREMONY SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="cms-section">
              <div className="cms-card">
                <div className="cms-row-between">
                  <h3>កាលវិភាគកម្មវិធីមង្គលការទាំង ២ ថ្ងៃ</h3>
                  <div className="cms-pill-switch">
                    <button
                      type="button"
                      className={scheduleDayEdit === 1 ? "is-active" : ""}
                      onClick={() => setScheduleDayEdit(1)}
                    >
                      ថ្ងៃទី១ (សូត្រមន្ត)
                    </button>
                    <button
                      type="button"
                      className={scheduleDayEdit === 2 ? "is-active" : ""}
                      onClick={() => setScheduleDayEdit(2)}
                    >
                      ថ្ងៃទី២ (ថ្ងៃមង្គលការ)
                    </button>
                  </div>
                </div>

                <div className="cms-grid-2" style={{ marginBottom: 16 }}>
                  <label>
                    ចំណងជើងថ្ងៃទី១
                    <input
                      value={data.dayOneLabel}
                      onChange={(e) => updateField("dayOneLabel", e.target.value)}
                    />
                  </label>
                  <label>
                    ចំណងជើងថ្ងៃទី២
                    <input
                      value={data.dayTwoLabel}
                      onChange={(e) => updateField("dayTwoLabel", e.target.value)}
                    />
                  </label>
                </div>

                <div className="cms-schedule-list">
                  {currentScheduleList.map((ev, idx) => (
                    <div key={ev.id} className="cms-schedule-item">
                      <div className="cms-schedule-item-head">
                        <strong>កម្មវិធីទី {idx + 1}</strong>
                        <button
                          type="button"
                          className="cms-danger-link"
                          onClick={() => removeScheduleItem(ev.id)}
                        >
                          លុបកម្មវិធីនេះ
                        </button>
                      </div>
                      <div className="cms-grid-3">
                        <label>
                          ម៉ោង (ឧ. ០៧:០០)
                          <input
                            value={ev.time}
                            onChange={(e) => updateScheduleItem(ev.id, { time: e.target.value })}
                          />
                        </label>
                        <label>
                          ពេល (ព្រឹក/រសៀល/ល្ងាច)
                          <input
                            value={ev.period}
                            onChange={(e) => updateScheduleItem(ev.id, { period: e.target.value })}
                          />
                        </label>
                        <label>
                          និមិត្តសញ្ញា (Icon)
                          <select
                            value={ev.icon}
                            onChange={(e) => updateScheduleItem(ev.id, { icon: e.target.value })}
                          >
                            {iconOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="cms-grid-2">
                        <label>
                          ឈ្មោះពិធី (ភាសាខ្មែរ)
                          <input
                            value={ev.title}
                            onChange={(e) => updateScheduleItem(ev.id, { title: e.target.value })}
                          />
                        </label>
                        <label>
                          ឈ្មោះពិធី (ភាសាអង់គ្លេស)
                          <input
                            value={ev.subtitle}
                            onChange={(e) =>
                              updateScheduleItem(ev.id, { subtitle: e.target.value })
                            }
                          />
                        </label>
                        <label className="cms-col-span-2">
                          សេចក្តីលម្អិត
                          <input
                            value={ev.detail}
                            onChange={(e) => updateScheduleItem(ev.id, { detail: e.target.value })}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" className="cms-add-btn" onClick={addScheduleItem}>
                  + បន្ថែមកម្មវិធីថ្មីក្នុងថ្ងៃទី {scheduleDayEdit}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY & KHQR BANKING */}
          {activeTab === "gallery-khqr" && (
            <div className="cms-section">
              <div className="cms-card">
                <h3>គណនីធនាគារ និង QR Code ចងដៃ (ABA / ACLEDA KHQR)</h3>
                <div className="cms-grid-2">
                  <label>
                    ឈ្មោះធនាគារ (ឧ. KHQR • ABA BANK)
                    <input
                      value={data.bankName}
                      onChange={(e) => updateField("bankName", e.target.value)}
                    />
                  </label>
                  <label>
                    ឈ្មោះម្ចាស់គណនី (Account Holder)
                    <input
                      value={data.accountHolder}
                      onChange={(e) => updateField("accountHolder", e.target.value)}
                    />
                  </label>
                  <label>
                    លេខគណនីដុល្លារ (USD Account)
                    <input
                      value={data.usdAccountNumber}
                      onChange={(e) => updateField("usdAccountNumber", e.target.value)}
                    />
                  </label>
                  <label>
                    បង្ហោះរូប QR ដុល្លារ (ឬដាក់ Image URL)
                    <div className="cms-upload-field">
                      <input
                        placeholder="Paste QR Image URL..."
                        value={data.usdQrImageUrl}
                        onChange={(e) => updateField("usdQrImageUrl", e.target.value)}
                      />
                      <label className="cms-upload-btn">
                        Upload QR
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleImageUpload(e, (url) => updateField("usdQrImageUrl", url))
                          }
                        />
                      </label>
                    </div>
                  </label>
                  <label>
                    លេខគណនីរៀល (KHR Account)
                    <input
                      value={data.khrAccountNumber}
                      onChange={(e) => updateField("khrAccountNumber", e.target.value)}
                    />
                  </label>
                  <label>
                    បង្ហោះរូប QR រៀល (ឬដាក់ Image URL)
                    <div className="cms-upload-field">
                      <input
                        placeholder="Paste QR Image URL..."
                        value={data.khrQrImageUrl}
                        onChange={(e) => updateField("khrQrImageUrl", e.target.value)}
                      />
                      <label className="cms-upload-btn">
                        Upload QR
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) =>
                            handleImageUpload(e, (url) => updateField("khrQrImageUrl", url))
                          }
                        />
                      </label>
                    </div>
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>កម្រងរូបភាព Pre-Wedding ក្នុងស៊ុមមាសក្បាច់ខ្មែរ</h3>
                <div className="cms-schedule-list">
                  {data.gallery.map((item, idx) => (
                    <div key={item.id} className="cms-schedule-item">
                      <strong>ស៊ុមរូបភាពទី {idx + 1}</strong>
                      <div className="cms-grid-2">
                        <label>
                          ចំណងជើងរូបភាព
                          <input
                            value={item.title}
                            onChange={(e) => {
                              const next = data.gallery.map((g) =>
                                g.id === item.id ? { ...g, title: e.target.value } : g,
                              )
                              updateField("gallery", next)
                            }}
                          />
                        </label>
                        <label>
                          คำពិពណ៌នារង
                          <input
                            value={item.subtitle}
                            onChange={(e) => {
                              const next = data.gallery.map((g) =>
                                g.id === item.id ? { ...g, subtitle: e.target.value } : g,
                              )
                              updateField("gallery", next)
                            }}
                          />
                        </label>
                        <label className="cms-col-span-2">
                          កំណាព្យ / ពាក្យពេចន៍ស្នេហា
                          <input
                            value={item.poetry}
                            onChange={(e) => {
                              const next = data.gallery.map((g) =>
                                g.id === item.id ? { ...g, poetry: e.target.value } : g,
                              )
                              updateField("gallery", next)
                            }}
                          />
                        </label>
                        <label className="cms-col-span-2">
                          រូបភាព Pre-Wedding (Upload ពីកុំព្យូទ័រ ឬដាក់តំណ URL)
                          <div className="cms-upload-field">
                            <input
                              placeholder="https://... ឬចុច Upload រូបភាព"
                              value={item.imageUrl}
                              onChange={(e) => {
                                const next = data.gallery.map((g) =>
                                  g.id === item.id ? { ...g, imageUrl: e.target.value } : g,
                                )
                                updateField("gallery", next)
                              }}
                            />
                            <label className="cms-upload-btn">
                              ជ្រើសរើសរូបភាព
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) =>
                                  handleImageUpload(e, (url) => {
                                    const next = data.gallery.map((g) =>
                                      g.id === item.id ? { ...g, imageUrl: url } : g,
                                    )
                                    updateField("gallery", next)
                                  })
                                }
                              />
                            </label>
                            {item.imageUrl && (
                              <button
                                type="button"
                                className="cms-clear-img-btn"
                                onClick={() => {
                                  const next = data.gallery.map((g) =>
                                    g.id === item.id ? { ...g, imageUrl: "" } : g,
                                  )
                                  updateField("gallery", next)
                                }}
                              >
                                លុបរូប
                              </button>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="cms-add-btn"
                  onClick={() => {
                    const nextId =
                      data.gallery.reduce((max, g) => Math.max(max, g.id), 0) + 1
                    updateField("gallery", [
                      ...data.gallery,
                      {
                        id: nextId,
                        title: `រូបភាពអនុស្សាវរីយ៍ទី ${nextId}`,
                        subtitle: "ឈុតប្រពៃណីខ្មែរដ៏ផូរផង់",
                        poetry: "ស្នេហាស្មោះស្ម័គ្រ ភ្ជាប់និស្ស័យគូព្រេងមិនប្រែប្រួល",
                        tag: `Chapter ${nextId} • Royal Portrait`,
                        imageUrl: "",
                        gradient:
                          "radial-gradient(circle at 50% 35%, #8f1d28 0%, #42060c 60%, #1c0104 100%)",
                      },
                    ])
                  }}
                >
                  + បន្ថែមស៊ុមរូបភាព Pre-Wedding ថ្មី (Add Photo Frame)
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: GUEST LIST, RSVP & WISHES MANAGEMENT */}
          {activeTab === "guests-rsvp" && (
            <div className="cms-section">
              {/* Summary Metrics */}
              <div className="cms-stats-grid">
                <div className="cms-stat-box">
                  <small>បញ្ជីភ្ញៀវកិត្តិយសសរុប</small>
                  <strong>{data.guestList.length} គ្រួសារ</strong>
                </div>
                <div className="cms-stat-box">
                  <small>ភ្ញៀវឆ្លើយតប RSVP សរុប</small>
                  <strong>{rsvps.length} ការឆ្លើយតប</strong>
                </div>
                <div className="cms-stat-box">
                  <small>ចំនួនអ្នកចូលរួមសរុប</small>
                  <strong>{totalAttendingGuests} នាក់</strong>
                </div>
                <div className="cms-stat-box">
                  <small>សារជូនពរក្នុងសៀវភៅ</small>
                  <strong>{wishes.length} សារ</strong>
                </div>
              </div>

              {/* VIP Guest List & Personalized Invite Link Builder */}
              <div className="cms-card">
                <h3>បញ្ជីឈ្មោះភ្ញៀវកិត្តិយស & បង្កើតតំណភ្ជាប់ធៀបការ (Guest Link Manager)</h3>
                <form className="cms-guest-add-form" onSubmit={handleAddGuest}>
                  <input
                    placeholder="ឈ្មោះភ្ញៀវ ឧ. ឯកឧត្តម សុខា និង លោកជំទាវ..."
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    required
                  />
                  <select
                    value={newGuestSide}
                    onChange={(e) => setNewGuestSide(e.target.value as GuestItem["side"])}
                  >
                    <option value="ភ្ញៀវ VIP">ភ្ញៀវ VIP</option>
                    <option value="ខាងកូនប្រុស">ខាងកូនប្រុស</option>
                    <option value="ខាងកូនស្រី">ខាងកូនស្រី</option>
                  </select>
                  <input
                    placeholder="លេខតុ (ឧ. VIP-01)"
                    value={newGuestTable}
                    onChange={(e) => setNewGuestTable(e.target.value)}
                    className="cms-small-input"
                  />
                  <button type="submit" className="cms-save-btn">
                    + បន្ថែមភ្ញៀវ
                  </button>
                </form>

                <div className="cms-table-wrap">
                  <table className="cms-table">
                    <thead>
                      <tr>
                        <th>ឈ្មោះភ្ញៀវកិត្តិយស</th>
                        <th>ផ្នែក</th>
                        <th>លេខតុ</th>
                        <th>សកម្មភាព (Actions)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.guestList.map((g) => (
                        <tr key={g.id}>
                          <td>
                            <strong>{g.name}</strong>
                          </td>
                          <td>{g.side}</td>
                          <td>{g.table}</td>
                          <td className="cms-table-actions">
                            <button
                              type="button"
                              className="cms-copy-link-btn"
                              onClick={() => copyGuestInviteUrl(g)}
                            >
                              {copiedGuestId === g.id
                                ? "បានចម្លង Link រួចរាល់"
                                : "ចម្លង Link និងមើលធៀប"}
                            </button>
                            <button
                              type="button"
                              className="cms-danger-link"
                              onClick={() => removeGuest(g.id)}
                            >
                              លុប
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RSVP Responses Table */}
              <div className="cms-card">
                <h3>បញ្ជីភ្ញៀវដែលបានបញ្ជាក់ការចូលរួម (RSVP Submissions)</h3>
                <div className="cms-table-wrap">
                  <table className="cms-table">
                    <thead>
                      <tr>
                        <th>ឈ្មោះភ្ញៀវ</th>
                        <th>លេខទូរស័ព្ទ</th>
                        <th>ចំនួនភ្ញៀវ</th>
                        <th>ស្ថានភាព</th>
                        <th>ពេលវេលា</th>
                        <th>លុប</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((r) => (
                        <tr key={r.id}>
                          <td>
                            <strong>{r.name}</strong>
                          </td>
                          <td>{r.phone || "—"}</td>
                          <td>{r.guests} នាក់</td>
                          <td>
                            <span
                              className={`cms-status-pill ${
                                r.attending === "yes" ? "is-yes" : "is-no"
                              }`}
                            >
                              {r.attending === "yes" ? "ចូលរួម" : "មិនអាចចូលរួម"}
                            </span>
                          </td>
                          <td>{r.createdAt}</td>
                          <td>
                            <button
                              type="button"
                              className="cms-danger-link"
                              onClick={() => onDeleteRsvp(r.id)}
                            >
                              លុប
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Guestbook Wishes Moderation */}
              <div className="cms-card">
                <h3>គ្រប់គ្រងសារជូនពរ (Guestbook Wishes Moderation)</h3>
                <div className="cms-wishes-admin-list">
                  {wishes.map((w) => (
                    <div key={w.id} className="cms-wish-admin-row">
                      <div>
                        <strong>{w.name}</strong> <small>({w.relation})</small>
                        <p>“{w.message}”</p>
                      </div>
                      <button
                        type="button"
                        className="cms-danger-link"
                        onClick={() => onDeleteWish(w.id)}
                      >
                        លុបសារ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: THEME PRESETS & JSON BACKUP */}
          {activeTab === "theme-backup" && (
            <div className="cms-section">
              <div className="cms-card">
                <h3>ជ្រើសរើសម៉ូតធៀបការទាំង ៤ (Select Cambodian Invitation Template Style)</h3>
                <div className="cms-theme-grid">
                  <button
                    type="button"
                    className={`cms-theme-option ${
                      data.templateStyle === "popup-palace" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("templateStyle", "popup-palace")}
                  >
                    <strong>១. ប្រអប់ប្រាសាទផុស 3D (3D Pop-Up Palace)</strong>
                    <small>ម៉ូតប្រអប់ប្រាសាទរាជវាំង និងបេះដូងពេជ្រ</small>
                  </button>
                  <button
                    type="button"
                    className={`cms-theme-option ${
                      data.templateStyle === "olive-foil-2026" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("templateStyle", "olive-foil-2026")}
                  >
                    <strong>២. ម៉ូតថ្មី 2026 បៃតងទឹកមាស (Olive & Elephant Foil)</strong>
                    <small>ម៉ូតស្រោមសំបុត្រដំរីមង្គល & ព្រះខ័នរាជ្យ</small>
                  </button>
                  <button
                    type="button"
                    className={`cms-theme-option ${
                      data.templateStyle === "jasmine-arch" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("templateStyle", "jasmine-arch")}
                  >
                    <strong>៣. វាំងននសូត្រ & ផ្កាកុលាបស (Jasmine Pillar Arch)</strong>
                    <small>ម៉ូតសសររ៉ូម៉ាំង វាំងននស និងអំពូលគ្រីស្តាល់</small>
                  </button>
                  <button
                    type="button"
                    className={`cms-theme-option ${
                      data.templateStyle === "classic-kbach" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("templateStyle", "classic-kbach")}
                  >
                    <strong>៤. ក្បាច់ភ្ញីទេសមាសបុរាណ (Classic Royal Kbach)</strong>
                    <small>ម៉ូតស៊ុមមាសក្បាច់ខ្មែរ និងក្រណាត់សូត្រ</small>
                  </button>
                </div>
              </div>

              <div className="cms-card">
                <h3>ជ្រើសរើសពណ៌ផ្ទៃធៀបការ (Royal Cambodian Color Theme)</h3>
                <div className="cms-theme-grid">
                  <button
                    type="button"
                    className={`cms-theme-option ${
                      data.themePreset === "royal-crimson" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("themePreset", "royal-crimson")}
                  >
                    <span
                      className="cms-theme-swatch"
                      style={{ background: "linear-gradient(135deg, #520711, #d7aa43)" }}
                    />
                    <strong>ផ្ទៃក្រហមឈាមជ្រូក & មាស (Royal Crimson)</strong>
                    <small>ពណ៌ប្រពៃណីខ្មែរពេញនិយមបំផុត</small>
                  </button>

                  <button
                    type="button"
                    className={`cms-theme-option ${
                      data.themePreset === "imperial-emerald" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("themePreset", "imperial-emerald")}
                  >
                    <span
                      className="cms-theme-swatch"
                      style={{ background: "linear-gradient(135deg, #093526, #d7aa43)" }}
                    />
                    <strong>ផ្ទៃបៃតងមរកត & មាស (Angkor Emerald)</strong>
                    <small>ពណ៌ហូលផាមួងបៃតងរាជវាំង</small>
                  </button>

                  <button
                    type="button"
                    className={`cms-theme-option ${
                      data.themePreset === "golden-palace" ? "is-selected" : ""
                    }`}
                    onClick={() => updateField("themePreset", "golden-palace")}
                  >
                    <span
                      className="cms-theme-swatch"
                      style={{ background: "linear-gradient(135deg, #3d2204, #f0d487)" }}
                    />
                    <strong>ផ្ទៃមាសសំរឹទ្ធប្រាសាទ (Golden Palace)</strong>
                    <small>ពណ៌មាសចាស់បុរាណដ៏ឧត្តុង្គឧត្តម</small>
                  </button>
                </div>

                <div className="cms-toggles-row">
                  <label className="cms-checkbox-label">
                    <input
                      type="checkbox"
                      checked={data.showFloatingPetals}
                      onChange={(e) => updateField("showFloatingPetals", e.target.checked)}
                    />
                    បង្ហាញផ្កាស្លាមាសធ្លាក់លើអេក្រង់ (Floating Golden Phka Sla Petals)
                  </label>
                  <label className="cms-checkbox-label">
                    <input
                      type="checkbox"
                      checked={data.showCoverSplash}
                      onChange={(e) => updateField("showCoverSplash", e.target.checked)}
                    />
                    បង្ហាញទ្វារស្រោមធៀបការពេលបើកដំបូង (Show Opening Royal Envelope Cover)
                  </label>
                </div>
              </div>

              <div className="cms-card">
                <h3>ទាញយកទុក ឬបញ្ចូលទិន្នន័យធៀបការ (Export / Import / Reset)</h3>
                <p className="cms-help-text">
                  ទិន្នន័យទាំងអស់ត្រូវបានរក្សាទុកដោយស្វ័យប្រវត្តិក្នុង Browser (LocalStorage)។
                  លោកអ្នកក៏អាចទាញយកជាឯកសារ JSON ដើម្បីរក្សាទុក ឬផ្ញើទៅឧបករណ៍ផ្សេងបានផងដែរ។
                </p>
                <div className="cms-backup-actions">
                  <button type="button" className="cms-save-btn" onClick={exportJsonConfig}>
                    ទាញយកទិន្នន័យ (Export JSON)
                  </button>
                  <label className="cms-upload-btn">
                    បញ្ចូលទិន្នន័យ (Import JSON)
                    <input type="file" accept=".json" hidden onChange={importJsonConfig} />
                  </label>
                  <button
                    type="button"
                    className="cms-reset-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "តើលោកអ្នកពិតជាចង់កំណត់ទិន្នន័យទាំងអស់ទៅជាទម្រង់ដើមវិញមែនទេ?",
                        )
                      ) {
                        onChange(defaultWeddingCmsData)
                      }
                    }}
                  >
                    កំណត់ទៅទម្រង់ដើមវិញ (Reset Default)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
