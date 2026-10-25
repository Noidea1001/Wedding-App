import React, { useState } from "react"
import type { WeddingCmsData } from "../../types/wedding"
import { PhniTesCorner } from "../kbach/PhniTesCorner"
import { KbachCenterCrest } from "../kbach/AngkorBorder"
import { MonogramSeal } from "../kbach/MonogramSeal"

export interface WelcomeCoverProps {
  cmsData: WeddingCmsData
  guestName: string
  visible: boolean
  onOpen: () => void
}

export function WelcomeCover({
  cmsData,
  guestName,
  visible,
  onOpen,
}: WelcomeCoverProps) {
  const [isOpening, setIsOpening] = useState(false)

  if (!visible) return null

  const handleOpenClick = () => {
    if (isOpening) return
    setIsOpening(true)
    onOpen()
  }

  return (
    <div
      className={`royal-cover-overlay ${isOpening ? "stage-opening" : "stage-closed"}`}
      aria-modal="true"
      role="dialog"
      aria-label="សំបុត្រអញ្ជើញអាពាហ៍ពិពាហ៍"
    >
      <div
        className="royal-cover-frame kbach-frame-damask"
        onClick={handleOpenClick}
      >
        <PhniTesCorner position="tl" />
        <PhniTesCorner position="tr" />
        <PhniTesCorner position="bl" />
        <PhniTesCorner position="br" />
        <KbachCenterCrest className="cover-crest-top" />
        <KbachCenterCrest flip className="cover-crest-bottom" />

        <div className="royal-cover-card">
          <p className="cover-khmer-title">សិរីមង្គលអាពាហ៍ពិពាហ៍</p>

          <MonogramSeal
            leftLetter={cmsData.monogramLeft}
            rightLetter={cmsData.monogramRight}
          />

          <h1 className="cover-couple-names">
            <span>{cmsData.groomKhmer}</span>
            <b>&</b>
            <span>{cmsData.brideKhmer}</span>
          </h1>

          <div className="cover-guest-box damask-surface">
            <small>សូមគោរពជូនភ្ញៀវកិត្តិយស</small>
            <strong>{guestName}</strong>
          </div>

          <p className="cover-date-text">
            {cmsData.solarDateDisplay} • {cmsData.venueHallKhmer}
          </p>

          <button
            type="button"
            className="gold-button cover-open-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleOpenClick()
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>
              {isOpening ? "កំពុងបើកសន្លឹកធៀបការ..." : "បើកធៀបការអញ្ជើញ"}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
