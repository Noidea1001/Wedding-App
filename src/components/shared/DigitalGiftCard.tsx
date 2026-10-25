import React, { useState } from "react"
import type { WeddingCmsData } from "../../types/wedding"
import { GoldDivider } from "../kbach/GoldDivider"

export interface DigitalGiftCardProps {
  cmsData: WeddingCmsData
  allowUpload?: boolean
  onUploadQr?: (e: React.ChangeEvent<HTMLInputElement>, currency: "USD" | "KHR") => void
}

export function DigitalGiftCard({
  cmsData,
  allowUpload = false,
  onUploadQr,
}: DigitalGiftCardProps) {
  const [currencyTab, setCurrencyTab] = useState<"USD" | "KHR">("USD")
  const [copiedAccount, setCopiedAccount] = useState(false)

  const activeAccountNumber =
    currencyTab === "USD" ? cmsData.usdAccountNumber : cmsData.khrAccountNumber

  const activeQrImage =
    currencyTab === "USD" ? cmsData.usdQrImageUrl : cmsData.khrQrImageUrl

  const copyAccountNumber = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(activeAccountNumber)
      setCopiedAccount(true)
      setTimeout(() => setCopiedAccount(false), 2500)
    }
  }

  return (
    <div className="gift-card-content">
      <p className="section-kicker">អំណោយមង្គល • Digital Gift</p>
      <h2>ចងដៃតាមរយៈ QR Code</h2>
      <GoldDivider />
      <p className="gift-desc">
        សម្រាប់ការជូនពរ និងចងដៃតាមប្រព័ន្ធឌីជីថល (KHQR)
        លោកអ្នកអាចស្កេនកូដខាងក្រោមដោយសុវត្ថិភាព និងភាពងាយស្រួល
      </p>

      <div className="currency-switcher">
        <button
          type="button"
          className={currencyTab === "USD" ? "is-active" : ""}
          onClick={() => setCurrencyTab("USD")}
        >
          គណនីដុល្លារ (USD $)
        </button>
        <button
          type="button"
          className={currencyTab === "KHR" ? "is-active" : ""}
          onClick={() => setCurrencyTab("KHR")}
        >
          គណនីរៀល (KHR ៛)
        </button>
      </div>

      <div className="khqr-box damask-surface">
        <div className="khqr-header">
          <span className="khqr-badge">{cmsData.bankName}</span>
          <small>{currencyTab === "USD" ? "USD Account" : "KHR Account"}</small>
        </div>

        <div className="khqr-code-frame">
          {activeQrImage ? (
            <img
              src={activeQrImage}
              alt="KHQR Code"
              className="qr-uploaded-img"
            />
          ) : (
            <svg
              viewBox="0 0 140 140"
              className="qr-svg"
              aria-label="QR Code សម្រាប់ចងដៃ"
            >
              <rect width="140" height="140" rx="6" fill="#fffaf0" />
              <path
                d="M12 12h34v34H12zM18 18v22h22V18zM23 23h12v12H23z M94 12h34v34H94zM100 18v22h22V18zM105 23h12v12h-12z M12 94h34v34H12zM18 100v22h22v-22zM23 105h12v12H23z"
                fill="#4b0711"
              />
              {Array.from({ length: 42 }, (_, i) => {
                const row = Math.floor(i / 7)
                const col = i % 7
                const x = 52 + col * 6
                const y = 16 + row * 18
                if (x > 88 && y < 48) return null
                return (
                  <rect
                    key={i}
                    x={x}
                    y={(y % 116) + 12}
                    width="4.5"
                    height="4.5"
                    rx="1"
                    fill={
                      (i + (currencyTab === "USD" ? 1 : 2)) % 2 === 0
                        ? "#4b0711"
                        : "#b98625"
                    }
                  />
                )
              })}
              <circle
                cx="70"
                cy="70"
                r="14"
                fill="#4b0711"
                stroke="#d7aa43"
                strokeWidth="2"
              />
              <text
                x="70"
                y="75"
                textAnchor="middle"
                fill="#f0d487"
                fontSize="11"
                fontWeight="bold"
              >
                {currencyTab === "USD" ? "$" : "៛"}
              </text>
            </svg>
          )}

          {allowUpload && onUploadQr && (
            <label
              className="khqr-upload-overlay"
              title="បង្ហោះរូប KHQR ពិតប្រាកដ"
            >
              ប្តូររូប QR ({currencyTab})
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onUploadQr(e, currencyTab)}
              />
            </label>
          )}
        </div>

        <div className="khqr-account-details">
          <strong>{cmsData.accountHolder}</strong>
          <span>
            លេខគណនី៖ <b>{activeAccountNumber}</b>
          </span>
        </div>

        <div style={{ display: "flex", gap: "8px", width: "100%", justifyContent: "center", flexWrap: "wrap", marginTop: "10px" }}>
          <button
            type="button"
            className="copy-acc-btn"
            onClick={copyAccountNumber}
          >
            {copiedAccount
              ? "បានចម្លងលេខគណនីរួចរាល់"
              : "ចម្លងលេខគណនី (Copy Account)"}
          </button>
          {activeQrImage && (
            <a
              href={activeQrImage}
              download={`KHQR-${currencyTab}-${cmsData.shortGroom}-${cmsData.shortBride}.png`}
              className="copy-acc-btn"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
            >
              ទាញយក QR Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
