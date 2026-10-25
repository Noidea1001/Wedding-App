import React, { useState } from "react"
import type { WeddingCmsData } from "../../types/wedding"
import type { RsvpRecord } from "../../types/guest"
import { PhniTesCorner } from "../kbach/PhniTesCorner"
import { GoldDivider } from "../kbach/GoldDivider"
import { playRoyalChime } from "../../services/audio"

export interface RsvpModalProps {
  isOpen: boolean
  onClose: () => void
  cmsData: WeddingCmsData
  guestName: string
  onSubmitRsvp: (record: Omit<RsvpRecord, "id" | "createdAt">) => void
}

export function RsvpModal({
  isOpen,
  onClose,
  cmsData,
  guestName,
  onSubmitRsvp,
}: RsvpModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [guests, setGuests] = useState(1)
  const [attending, setAttending] = useState<"yes" | "no">("yes")
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const defaultName =
    guestName !== "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា"
      ? guestName
      : ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalName = name.trim() || defaultName || "ភ្ញៀវកិត្តិយស"
    onSubmitRsvp({
      name: finalName,
      phone: phone.trim(),
      guests: Number(guests) || 1,
      attending,
    })
    playRoyalChime()
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setName("")
    setPhone("")
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="rsvp-modal damask-surface"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-title"
        onClick={(e) => e.stopPropagation()}
      >
        <PhniTesCorner position="tl" className="modal-kbach" />
        <PhniTesCorner position="tr" className="modal-kbach" />
        <PhniTesCorner position="bl" className="modal-kbach" />
        <PhniTesCorner position="br" className="modal-kbach" />

        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="បិទ"
        >
          &times;
        </button>

        {!submitted ? (
          <>
            <p className="section-kicker">សូមគោរពអញ្ជើញ</p>
            <h2 id="rsvp-title">បញ្ជាក់ការចូលរួម</h2>
            <GoldDivider />

            <form onSubmit={handleSubmit}>
              <label>
                ឈ្មោះរបស់លោកអ្នក
                <input
                  required
                  name="name"
                  value={name || defaultName}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="បញ្ចូលឈ្មោះរបស់លោកអ្នក"
                />
              </label>

              <label>
                លេខទូរស័ព្ទ / Telegram
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="012 345 678"
                />
              </label>

              <label>
                ចំនួនភ្ញៀវចូលរួម
                <select
                  name="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  <option value={1}>១ នាក់</option>
                  <option value={2}>២ នាក់</option>
                  <option value={3}>៣ នាក់</option>
                  <option value={4}>៤ នាក់</option>
                  <option value={5}>៥ នាក់</option>
                </select>
              </label>

              <fieldset>
                <legend>តើលោកអ្នកអាចអញ្ជើញចូលរួមបានទេ?</legend>
                <label>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={attending === "yes"}
                    onChange={() => setAttending("yes")}
                  />{" "}
                  ចូលរួមដោយក្តីរីករាយ
                </label>
                <label>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={attending === "no"}
                    onChange={() => setAttending("no")}
                  />{" "}
                  សូមអភ័យទោស មិនអាចចូលរួមបាន
                </label>
              </fieldset>

              <button className="gold-button" type="submit">
                ផ្ញើការឆ្លើយតប &amp; ទទួលប័ណ្ណកិត្តិយស
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="vip-pass-ticket">
              <span className="vip-pass-badge">
                ប័ណ្ណភ្ញៀវកិត្តិយស • VIP PASS
              </span>
              <h3>
                {cmsData.shortGroom} &amp; {cmsData.shortBride}
              </h3>
              <p className="vip-pass-guest">
                សូមស្វាគមន៍ <strong>{name || defaultName}</strong>
              </p>
              <div className="vip-pass-meta">
                <span>{cmsData.solarDateDisplay}</span>
                <span>{cmsData.venueHallKhmer}</span>
              </div>
            </div>

            <p className="thank-you-note">
              សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះការឆ្លើយតបរបស់លោកអ្នក!
            </p>

            <div className="vip-pass-actions" style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(
                  `ជម្រាបសួរ! ខ្ញុំបាទ/នាងខ្ញុំ (${name || defaultName}) បានឆ្លើយតបចូលរួមពិធីមង្គលការ ${cmsData.shortGroom} & ${cmsData.shortBride} ចំនួន ${guests} នាក់។ សូមអរគុណ!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="gold-button"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <span>ផ្ញើដំណឹងតាម Telegram</span>
              </a>
              <button
                type="button"
                className="outline-button dark-outline"
                onClick={handleClose}
              >
                ត្រឡប់ទៅមើលធៀបការ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
