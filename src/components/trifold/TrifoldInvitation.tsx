import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import type { TrifoldInvitationProps, TemplateTheme, TrifoldThemeId } from "./types"
import { EnvelopeCover } from "./EnvelopeCover"
import { TrifoldContent } from "./TrifoldContent"

export const TRIFOLD_THEMES: Record<TrifoldThemeId, TemplateTheme> = {
  "gold-damask": {
    id: "gold-damask",
    name: "Gold Damask",
    nameKhmer: "១. មាសឆ្អិនផ្កាដាម៉ាស (Gold Damask)",
    backgroundUrl: "/textures/gold-damask-luxury.webp",
    bgSize: "200px 200px",
    overlayClass: "bg-black/25 backdrop-blur-[2px]",
    glassClass: "bg-[#FDFBF7]/90 backdrop-blur-md",
    borderClass: "border-[#D4AF37]",
    goldAccent: "#D4AF37",
    isDark: false,
  },
  "emerald-embossed": {
    id: "emerald-embossed",
    name: "Emerald Embossed",
    nameKhmer: "២. ត្បូងមរកតរាជវាំង (Emerald Embossed)",
    backgroundUrl: "/textures/gold-scroll-filigree.webp",
    bgSize: "220px 220px",
    overlayClass: "bg-[#072418]/85 backdrop-blur-[2px]",
    glassClass: "bg-[#0D3827]/92 backdrop-blur-md",
    borderClass: "border-[#F0D487]",
    goldAccent: "#F0D487",
    isDark: true,
  },
  "royal-ivory": {
    id: "royal-ivory",
    name: "Royal Ivory",
    nameKhmer: "៣. សូត្រភ្លុកក្បាច់ផ្កា (Royal Ivory)",
    backgroundUrl: "/textures/cream-damask-subtle.webp",
    bgSize: "190px 190px",
    overlayClass: "bg-white/45 backdrop-blur-[2px]",
    glassClass: "bg-[#FFFDF9]/95 backdrop-blur-md",
    borderClass: "border-[#C5A059]",
    goldAccent: "#C5A059",
    isDark: false,
  },
  "dark-bronze": {
    id: "dark-bronze",
    name: "Dark Bronze Grid",
    nameKhmer: "៤. ក្បាច់ភ្ញីទេសសំរឹទ្ធ (Dark Bronze)",
    backgroundUrl: "/textures/royal-kbach-bronze.jpg",
    bgSize: "240px 240px",
    overlayClass: "bg-[#140803]/85 backdrop-blur-[2px]",
    glassClass: "bg-[#2E1508]/92 backdrop-blur-md",
    borderClass: "border-[#D4AF37]",
    goldAccent: "#D4AF37",
    isDark: true,
  },
}

export function TrifoldInvitation({
  cmsData,
  guestName,
  onOpenRsvp,
  onAddToCalendar,
  onPlayChime,
  initialOpen = false,
}: TrifoldInvitationProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [themeId, setThemeId] = useState<TrifoldThemeId>("gold-damask")
  const currentTheme = TRIFOLD_THEMES[themeId]

  const handleOpen = () => {
    setIsOpen(true)
    if (onPlayChime) onPlayChime()
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div
      className="trifold-invitation-root relative w-full min-h-[680px] py-10 px-3 sm:px-6 flex flex-col items-center justify-center transition-all duration-700"
      style={{
        backgroundImage: `url(${currentTheme.backgroundUrl})`,
        backgroundRepeat: "repeat",
        backgroundSize: currentTheme.bgSize || "200px 200px",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle Dark/Light Glassmorphism Backdrop Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${currentTheme.overlayClass}`}
        aria-hidden="true"
      />

      {/* Interactive AnimatePresence Container for State A & State B */}
      <div className="relative z-10 w-full flex justify-center items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <EnvelopeCover
              key="closed-envelope"
              cmsData={cmsData}
              guestName={guestName}
              theme={currentTheme}
              onOpen={handleOpen}
            />
          ) : (
            <TrifoldContent
              key="opened-trifold"
              cmsData={cmsData}
              guestName={guestName}
              theme={currentTheme}
              onClose={handleClose}
              onOpenRsvp={onOpenRsvp}
              onAddToCalendar={onAddToCalendar}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
