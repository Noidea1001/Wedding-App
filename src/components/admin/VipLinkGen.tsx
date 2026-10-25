import React, { useState } from "react"
import type { GuestItem } from "../../types/guest"

export interface VipLinkGenProps {
  guestList: GuestItem[]
  onSelectPreviewGuest: (name: string) => void
}

export function VipLinkGen({
  guestList,
  onSelectPreviewGuest,
}: VipLinkGenProps) {
  const [guestNameInput, setGuestNameInput] = useState("")
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyLink = (name: string) => {
    if (typeof window === "undefined") return
    const cleanName = name.trim() || "ភ្ញៀវកិត្តិយស"
    const url = `${window.location.origin}${window.location.pathname}?guest=${encodeURIComponent(cleanName)}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
    onSelectPreviewGuest(cleanName)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestNameInput.trim()) return
    handleCopyLink(guestNameInput.trim())
  }

  return (
    <div className="cms-card vip-link-generator-card">
      <h3>បង្កើតតំណភ្ជាប់ផ្ទាល់ខ្លួនជូនភ្ញៀវ (VIP Personalized Link Generator)</h3>
      <p className="cms-hint">
        វាយឈ្មោះភ្ញៀវ ឬជ្រើសរើសពីបញ្ជីខាងក្រោម ដើម្បីបង្កើតតំណភ្ជាប់ (Link) សម្រាប់ផ្ញើតាម Telegram ឬ Messenger៖
      </p>

      <form className="vip-link-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={guestNameInput}
          onChange={(e) => setGuestNameInput(e.target.value)}
          placeholder="វាយឈ្មោះភ្ញៀវ ឧ. ឯកឧត្តម សុខា និង លោកជំទាវ..."
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          <button type="submit" className="cms-button gold-btn">
            {copiedLink ? "បានចម្លងតំណភ្ជាប់ (Copied)" : "បង្កើត & ចម្លង Link"}
          </button>
          {guestNameInput.trim() && (
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                `${typeof window !== "undefined" ? window.location.origin + window.location.pathname : ""}?guest=${encodeURIComponent(guestNameInput.trim())}`
              )}&text=${encodeURIComponent(`សូមគោរពអញ្ជើញ ${guestNameInput.trim()} ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ!`)}`}
              target="_blank"
              rel="noreferrer"
              className="cms-button"
              style={{
                background: "#0088cc",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                borderRadius: "6px",
                padding: "8px 14px",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>ផ្ញើតាម Telegram ផ្ទាល់</span>
            </a>
          )}
        </div>
      </form>

      {guestList && guestList.length > 0 && (
        <div className="quick-guest-tags">
          <small>ភ្ញៀវដែលមានស្រាប់៖</small>
          <div className="tag-pills">
            {guestList.map((g) => (
              <button
                type="button"
                key={g.id}
                className="guest-tag-pill"
                onClick={() => {
                  setGuestNameInput(g.name)
                  handleCopyLink(g.name)
                }}
              >
                {g.name} ({g.side})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
