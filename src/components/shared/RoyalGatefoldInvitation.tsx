import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { WeddingCmsData } from "../../types/wedding"
import { PhniTesCorner } from "../kbach/PhniTesCorner"
import { playRoyalChime } from "../../services/audio"

export interface RoyalGatefoldInvitationProps {
  cmsData: WeddingCmsData
  guestName: string
  visible: boolean
  onCompleteOpen?: () => void
  onReplayCover?: () => void
}

export function RoyalGatefoldInvitation({
  cmsData,
  guestName,
  visible,
  onCompleteOpen,
}: RoyalGatefoldInvitationProps) {
  // State: false = Closed Gatefold Box (Image 2), true = Opened 3-Panel Trifold (Image 3)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  )

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!visible) return null

  // Responsive scale: ensures the 1000px opened 3D suite fits any screen without clipping
  const currentScale = isOpen
    ? windowWidth >= 1060
      ? 1
      : Math.max(0.36, (windowWidth - 28) / 1040)
    : Math.min(1, (windowWidth - 32) / 500)

  // Trigger Real 3D Gatefold Door Opening
  const handleOpenGatefold = () => {
    if (isOpening || isOpen) return
    setIsOpening(true)
    playRoyalChime()
    setIsOpen(true)
    setTimeout(() => {
      setIsOpening(false)
    }, 950)
  }

  // Fold back to Closed Gatefold Box
  const handleCloseGatefold = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    playRoyalChime()
    setIsOpen(false)
  }

  // Click [អានសំបុត្រផ្លូវការ] -> Continue to full page & details
  const handleContinueToFullPage = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    playRoyalChime()
    setIsExiting(true)
    setTimeout(() => {
      if (onCompleteOpen) {
        onCompleteOpen()
      }
      const target =
        document.getElementById("home") ||
        document.getElementById("invitation") ||
        document.getElementById("gallery")
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }, 350)
  }

  return (
    <motion.div
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.04 : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="royal-gatefold-overlay fixed inset-0 z-50 flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: "#EAE0CE",
        backgroundImage: "var(--pattern-popup-palace)",
        backgroundRepeat: "repeat",
        backgroundSize: "124px 124px",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="gatefold-3d-scene w-full max-w-[1060px] mx-auto my-auto flex flex-col items-center">
        {/* Top Notification Hint Pill (Appears when opened, exact match to screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -16,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          transition={{ duration: 0.5, delay: isOpen ? 0.4 : 0 }}
          className="mb-3 px-4 py-1.5 rounded-full bg-[#46362C]/85 text-[#F5E5C9] font-['Kantumruy_Pro'] text-[11.5px] sm:text-xs shadow-md backdrop-blur-sm select-none border border-[#8C6D4C]/30 text-center z-30"
        >
          សូមចុច «អានសំបុត្រផ្លូវការ» ដើម្បីមើលព័ត៌មានលម្អិតទាំងអស់
        </motion.div>

        {/* 3D Gatefold Card Container */}
        <div
          className="relative flex items-center justify-center"
          style={{
            perspective: "2200px",
            perspectiveOrigin: "center center",
            width: "100%",
          }}
        >
          {/* Main Stage: Center Panel is the root anchor, with Left & Right 3D doors attached */}
          <motion.div
            animate={{ scale: currentScale }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-stretch justify-center"
            style={{
              width: "500px",
              minHeight: "520px",
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
          >
            {/* ============================================================== */}
            {/* 1. CENTER PANEL (MAIN INVITATION)                              */}
            {/* Sits at the root center, exposed when doors swing open         */}
            {/* When opened, has z-30 and pointer-events-auto for full click   */}
            {/* ============================================================== */}
            <div
              className={`relative w-full rounded-2xl md:rounded-none p-6 sm:p-9 text-center flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-[#D4AF37]/80 transition-all ${
                isOpen ? "z-30 pointer-events-auto" : "z-10 pointer-events-none"
              }`}
              style={{
                backgroundColor: "#FFFDF9",
                minHeight: "520px",
              }}
            >
              {/* Corners: All 4 Corners (Matching User Image) */}
              <PhniTesCorner position="tl" size={62} />
              <PhniTesCorner position="tr" size={62} />
              <PhniTesCorner position="bl" size={62} />
              <PhniTesCorner position="br" size={62} />

              {/* Top Title: សិរីមង្គលអាពាហ៍ពិពាហ៍ */}
              <div className="pt-2">
                <p className="font-['Moul'] text-xs sm:text-[14px] text-[#8C5A10] mb-3">
                  សិរីមង្គលអាពាហ៍ពិពាហ៍
                </p>

                {/* Horizontal Divider Line Above Guest Plaque */}
                <div className="w-full max-w-[280px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#C59632] to-transparent my-2 opacity-50" />

                {/* Guest Plaque Text */}
                <div className="my-2.5 px-2">
                  <p className="font-['Moul'] text-xs sm:text-[13.5px] text-[#4B0711] leading-relaxed">
                    សូមគោរពជូន៖ ឯកឧត្តម លោកជំទាវ លោក
                  </p>
                  <p className="font-['Moul'] text-xs sm:text-[13.5px] text-[#4B0711] leading-relaxed">
                    លោកស្រី អ្នកនាងកញ្ញា
                  </p>
                </div>

                {/* Horizontal Divider Line Below Guest Plaque */}
                <div className="w-full max-w-[280px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#C59632] to-transparent my-2 opacity-50" />
              </div>

              {/* Massive Couple Names (Exact Moul font from user screenshot) */}
              <div className="my-auto py-2">
                <h1 className="font-['Moul'] text-3xl sm:text-4xl text-[#4B0711] leading-tight">
                  <span>{cmsData.shortGroom}</span>
                  <span className="font-['Playfair_Display'] text-[#C59632] mx-2.5 italic font-normal text-2xl sm:text-3xl">
                    &amp;
                  </span>
                  <span>{cmsData.shortBride}</span>
                </h1>

                {/* Invitation Blessing Text */}
                <div className="mt-3 px-3">
                  <p className="font-['Kantumruy_Pro'] text-xs sm:text-[12.5px] text-[#4B0711] leading-relaxed">
                    មានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងពិធី
                  </p>
                  <p className="font-['Kantumruy_Pro'] text-xs sm:text-[12.5px] text-[#4B0711] leading-relaxed">
                    មង្គលការរបស់យើងខ្ញុំ
                  </p>
                </div>

                {/* Solar Date (In golden-brown Moul font) */}
                <p className="font-['Moul'] text-sm sm:text-[16px] text-[#8C5A10] mt-3">
                  {cmsData.solarDateDisplay}
                </p>
              </div>

              {/* Two Action Buttons: [អានសំបុត្រផ្លូវការ] & [បិទសំបុត្រវិញ] */}
              <div className="relative z-50 pt-4 pb-1 flex items-center justify-center gap-4 flex-wrap pointer-events-auto">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full border-2 border-[#C59632] bg-[#F6EAD0] text-[#4B0711] font-['Moul'] text-xs shadow-md hover:bg-[#EAD9BA] cursor-pointer transition-all hover:scale-105 active:scale-95 select-none relative z-50"
                  onClick={handleContinueToFullPage}
                >
                  អានសំបុត្រផ្លូវការ
                </button>
                <button
                  type="button"
                  className="text-[#4B0711] font-['Moul'] text-xs hover:underline cursor-pointer transition-opacity opacity-85 hover:opacity-100 select-none relative z-50 p-2"
                  onClick={handleCloseGatefold}
                >
                  បិទសំបុត្រវិញ
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* 2. REAL 3D LEFT DOOR (SWINGS OPEN TO THE LEFT BY -180 DEG)     */}
            {/* Exterior: Left half of Image 2 | Interior: Groom's Wing        */}
            {/* When opened, pointer-events-none prevents blocking center btn  */}
            {/* ============================================================== */}
            <motion.div
              className={`gatefold-3d-door absolute top-0 bottom-0 left-0 w-1/2 ${
                isOpen ? "z-10 pointer-events-none" : "z-20 pointer-events-auto cursor-pointer"
              }`}
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: isOpen ? -180 : 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={!isOpen ? handleOpenGatefold : undefined}
            >
              {/* EXTERIOR FACE: Left half of closed box (Image 2) */}
              <div
                className="door-3d-face rounded-l-2xl overflow-hidden border-2 border-r-0 border-[#D4AF37]"
                style={{
                  backgroundColor: "#EAE0CE",
                  backgroundImage:
                    "linear-gradient(145deg, #F0E4CE 0%, #DFCEAB 50%, #ECE0C7 100%)",
                  boxShadow: isOpen ? "none" : "inset -2px 0 6px rgba(0,0,0,0.12)",
                }}
              >
                {/* Concentric Ripples (radiating from right center edge of this door) */}
                <svg
                  viewBox="0 0 270 590"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ opacity: 0.38 }}
                  aria-hidden="true"
                >
                  <circle cx="270" cy="295" r="75" fill="none" stroke="#B88A2E" strokeWidth="1.2" />
                  <circle cx="270" cy="295" r="110" fill="none" stroke="#B88A2E" strokeWidth="1" />
                  <circle cx="270" cy="295" r="145" fill="none" stroke="#B88A2E" strokeWidth="0.9" />
                  <circle cx="270" cy="295" r="180" fill="none" stroke="#B88A2E" strokeWidth="0.8" />
                  <circle cx="270" cy="295" r="215" fill="none" stroke="#B88A2E" strokeWidth="0.8" />
                  <circle cx="270" cy="295" r="250" fill="none" stroke="#B88A2E" strokeWidth="0.7" />
                  <circle cx="120" cy="150" r="35" fill="none" stroke="#B88A2E" strokeWidth="0.9" />
                  <circle cx="170" cy="420" r="65" fill="none" stroke="#B88A2E" strokeWidth="0.8" />
                </svg>

                {/* Corners: Top-Left & Bottom-Left */}
                <PhniTesCorner position="tl" size={68} />
                <PhniTesCorner position="bl" size={68} />

                {/* Right Edge Seam Highlight */}
                <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-[#C59632]/60" />
              </div>

              {/* INTERIOR FACE: Groom's Wing (Image 3 Left Panel) */}
              <div
                className="door-3d-face door-3d-face-interior rounded-l-2xl p-5 sm:p-7 text-center flex flex-col justify-between border border-r-0 border-[#D4AF37]/80"
                style={{
                  backgroundColor: "#FFFDF9",
                }}
              >
                {/* Corners: Top-Left & Bottom-Left */}
                <PhniTesCorner position="tl" size={62} />
                <PhniTesCorner position="bl" size={62} />

                {/* Top Section: Groom's Parents */}
                <div className="pt-3">
                  <span className="block text-[11px] font-['Kantumruy_Pro'] font-bold text-[#8C5A10] uppercase mb-1 tracking-wider">
                    មាតាបិតាខាងកូនប្រុស
                  </span>
                  <h4 className="font-['Moul'] text-xs sm:text-[13px] text-[#4B0711] my-1 leading-loose">
                    {cmsData.groomFather}
                  </h4>
                  <h4 className="font-['Moul'] text-xs sm:text-[13px] text-[#4B0711] my-1 leading-loose">
                    {cmsData.groomMother}
                  </h4>
                </div>

                {/* Middle Section: Groom's Name */}
                <div className="my-auto py-4">
                  <span className="block text-[11px] font-['Kantumruy_Pro'] text-[#8C5A10] font-bold mb-1">
                    កូនប្រុសនាម
                  </span>
                  <h3 className="font-['Moul'] text-base sm:text-lg text-[#4B0711] leading-snug">
                    {cmsData.groomKhmer}
                  </h3>
                  <p className="font-['Playfair_Display',Georgia,serif] text-[10.5px] text-[#8C5A10] tracking-widest uppercase mt-0.5 font-medium">
                    {cmsData.groomLatin}
                  </p>
                </div>

                {/* Bottom Section: Lunar Date */}
                <div className="pb-3 px-1">
                  <p className="font-['Kantumruy_Pro'] text-[11px] text-[#4B0711] font-medium leading-relaxed">
                    {cmsData.lunarDateFull}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* 3. REAL 3D RIGHT DOOR (SWINGS OPEN TO THE RIGHT BY +180 DEG)   */}
            {/* Exterior: Right half of Image 2 | Interior: Bride's Wing       */}
            {/* When opened, pointer-events-none prevents blocking center btn  */}
            {/* ============================================================== */}
            <motion.div
              className={`gatefold-3d-door absolute top-0 bottom-0 right-0 w-1/2 ${
                isOpen ? "z-10 pointer-events-none" : "z-20 pointer-events-auto cursor-pointer"
              }`}
              style={{
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: isOpen ? 180 : 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={!isOpen ? handleOpenGatefold : undefined}
            >
              {/* EXTERIOR FACE: Right half of closed box (Image 2) */}
              <div
                className="door-3d-face rounded-r-2xl overflow-hidden border-2 border-l-0 border-[#D4AF37]"
                style={{
                  backgroundColor: "#EAE0CE",
                  backgroundImage:
                    "linear-gradient(145deg, #F0E4CE 0%, #DFCEAB 50%, #ECE0C7 100%)",
                  boxShadow: isOpen ? "none" : "inset 2px 0 6px rgba(0,0,0,0.12)",
                }}
              >
                {/* Concentric Ripples (radiating from left center edge of this door) */}
                <svg
                  viewBox="0 0 270 590"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ opacity: 0.38 }}
                  aria-hidden="true"
                >
                  <circle cx="0" cy="295" r="75" fill="none" stroke="#B88A2E" strokeWidth="1.2" />
                  <circle cx="0" cy="295" r="110" fill="none" stroke="#B88A2E" strokeWidth="1" />
                  <circle cx="0" cy="295" r="145" fill="none" stroke="#B88A2E" strokeWidth="0.9" />
                  <circle cx="0" cy="295" r="180" fill="none" stroke="#B88A2E" strokeWidth="0.8" />
                  <circle cx="0" cy="295" r="215" fill="none" stroke="#B88A2E" strokeWidth="0.8" />
                  <circle cx="0" cy="295" r="250" fill="none" stroke="#B88A2E" strokeWidth="0.7" />
                  <circle cx="150" cy="150" r="35" fill="none" stroke="#B88A2E" strokeWidth="0.9" />
                  <circle cx="100" cy="420" r="65" fill="none" stroke="#B88A2E" strokeWidth="0.8" />
                </svg>

                {/* Corners: Top-Right & Bottom-Right */}
                <PhniTesCorner position="tr" size={68} />
                <PhniTesCorner position="br" size={68} />

                {/* Left Edge Seam Highlight */}
                <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-[#C59632]/60" />
              </div>

              {/* INTERIOR FACE: Bride's Wing (Image 3 Right Panel) */}
              <div
                className="door-3d-face door-3d-face-interior rounded-r-2xl p-5 sm:p-7 text-center flex flex-col justify-between border border-l-0 border-[#D4AF37]/80"
                style={{
                  backgroundColor: "#FFFDF9",
                }}
              >
                {/* Corners: Top-Right & Bottom-Right */}
                <PhniTesCorner position="tr" size={62} />
                <PhniTesCorner position="br" size={62} />

                {/* Top Section: Bride's Parents */}
                <div className="pt-3">
                  <span className="block text-[11px] font-['Kantumruy_Pro'] font-bold text-[#8C5A10] uppercase mb-1 tracking-wider">
                    មាតាបិតាខាងកូនស្រី
                  </span>
                  <h4 className="font-['Moul'] text-xs sm:text-[13px] text-[#4B0711] my-1 leading-loose">
                    {cmsData.brideFather}
                  </h4>
                  <h4 className="font-['Moul'] text-xs sm:text-[13px] text-[#4B0711] my-1 leading-loose">
                    {cmsData.brideMother}
                  </h4>
                </div>

                {/* Middle Section: Bride's Name */}
                <div className="my-auto py-4">
                  <span className="block text-[11px] font-['Kantumruy_Pro'] text-[#8C5A10] font-bold mb-1">
                    កូនស្រីនាម
                  </span>
                  <h3 className="font-['Moul'] text-base sm:text-lg text-[#4B0711] leading-snug">
                    {cmsData.brideKhmer}
                  </h3>
                  <p className="font-['Playfair_Display',Georgia,serif] text-[10.5px] text-[#8C5A10] tracking-widest uppercase mt-0.5 font-medium">
                    {cmsData.brideLatin}
                  </p>
                </div>

                {/* Bottom Section: Venue & Time */}
                <div className="pb-3 px-1">
                  <p className="font-['Kantumruy_Pro'] text-[11px] text-[#4B0711] font-medium leading-relaxed">
                    {cmsData.venueHallKhmer} • ០៥:០០ ល្ងាច
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* 4. OVERLAYS ON CLOSED BOX (MEDALLION, BELLY BAND, GUEST BADGE) */}
            {/* Unmounted completely when opened so it NEVER blocks clicks     */}
            {/* ============================================================== */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  key="closed-box-overlays"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.3 } }}
                  className="absolute inset-0 z-30 pointer-events-auto"
                >
                  {/* Personalized Guest Badge Plaque */}
                  <div className="absolute top-[38px] left-1/2 -translate-x-1/2 w-[84%] max-w-[340px] text-center pointer-events-auto">
                    <div
                      className="py-2 px-3 rounded-full border border-[#C59632] shadow-sm backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(255, 253, 247, 0.92)" }}
                    >
                      <small className="block text-[10.5px] font-bold text-[#8C5A10] uppercase tracking-wider mb-0.5">
                        សូមគោរពអញ្ជើញ
                      </small>
                      <strong className="block text-xs sm:text-[13px] font-['Moul'] font-normal text-[#4B0711] truncate">
                        {guestName}
                      </strong>
                    </div>
                  </div>

                  {/* Center Monogram Medallion Seal (Sunburst 16 rays) */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto group"
                    onClick={handleOpenGatefold}
                    title="ចុចលើត្រាមាសដើម្បីបើកសំបុត្រ"
                  >
                    <svg
                      viewBox="0 0 120 120"
                      width="122"
                      height="122"
                      className="filter drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-108 group-active:scale-96"
                    >
                      <g filter="url(#kbach-emboss)">
                        {/* Outer 16 Sunburst Rays */}
                        {Array.from({ length: 16 }, (_, i) => (
                          <path
                            key={i}
                            d="M60 4 L64.5 16 L60 14 L55.5 16 Z"
                            fill="url(#kbach-gold-grad)"
                            stroke="#684107"
                            strokeWidth="0.5"
                            transform={`rotate(${i * 22.5} 60 60)`}
                          />
                        ))}

                        {/* Outer Gold Ring */}
                        <circle
                          cx="60"
                          cy="60"
                          r="46"
                          fill="url(#kbach-gold-grad)"
                          stroke="#684107"
                          strokeWidth="1.2"
                        />

                        {/* Beaded Ring */}
                        <circle
                          cx="60"
                          cy="60"
                          r="42"
                          fill="none"
                          stroke="#FFF8D6"
                          strokeWidth="1"
                          strokeDasharray="2.5 2"
                        />

                        {/* Center Cream Inner Circle */}
                        <circle
                          cx="60"
                          cy="60"
                          r="36"
                          fill="#FFFDF7"
                          stroke="#B88A2E"
                          strokeWidth="1.2"
                        />

                        {/* Monogram Khmer Letters */}
                        <text
                          x="60"
                          y="66"
                          textAnchor="middle"
                          fill="#4B0711"
                          fontFamily="'Moul', serif"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          {cmsData.monogramLeft} &amp; {cmsData.monogramRight}
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Lower Horizontal Belly Band with Diamond Button */}
                  <div
                    className="absolute left-[-6px] right-[-6px] bottom-[48px] h-[36px] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.22)] border-y border-[#D4AF37]/70 pointer-events-auto"
                    style={{
                      background:
                        "linear-gradient(180deg, #F0E2C8 0%, #D8C398 50%, #C9B283 100%)",
                    }}
                  >
                    {/* Center White Button with Maroon Diamond */}
                    <div className="w-[32px] h-[32px] rounded-full bg-[#FFFDF8] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
                      <span className="text-[#4B0711] text-xs font-bold leading-none select-none">
                        ◆
                      </span>
                    </div>
                  </div>

                  {/* Pulsing Open Button */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full text-center pointer-events-auto">
                    <button
                      type="button"
                      className="gold-button !py-2 !px-5 !text-xs inline-flex items-center gap-2 shadow-lg animate-pulse"
                      onClick={handleOpenGatefold}
                    >
                      <span>សូមបើកសំបុត្រអញ្ជើញ</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
