import React, { useState } from "react"
import { defaultWeddingCmsData, type WeddingCmsData } from "../../../cmsData"
import {
  AngkorBorder,
  GoldDivider,
  KbachCenterCrest,
  MonogramSeal,
  PhniTesCorner,
} from "../../kbach"

export type TextureVariant =
  | "gold-damask"
  | "cream-subtle"
  | "royal-bronze"
  | "royal-obsidian"
  | "gold-filigree"

export interface LuxuryDamaskInvitationProps {
  cmsData?: WeddingCmsData
  guestName?: string
  defaultTexture?: TextureVariant
  showTextureSwitcher?: boolean
  onOpenRsvp?: () => void
  onAddToCalendar?: () => void
}

const textureMap: Record<TextureVariant, { label: string; url: string; theme: "light" | "dark" }> = {
  "gold-damask": {
    label: "១. មាសឆ្អិនផ្កាដាម៉ាស (Gold Damask)",
    url: "/textures/gold-damask-luxury.webp",
    theme: "light",
  },
  "cream-subtle": {
    label: "២. ក្រែមសូត្រផ្ការំដួល (Subtle Cream)",
    url: "/textures/cream-damask-subtle.webp",
    theme: "light",
  },
  "royal-bronze": {
    label: "៣. ក្បាច់ភ្ញីទេសសំរឹទ្ធ (Royal Bronze Kbach)",
    url: "/textures/royal-kbach-bronze.jpg",
    theme: "dark",
  },
  "royal-obsidian": {
    label: "៤. ក្បាច់ភ្ញីទេសរាត្រី (Obsidian Royal Kbach)",
    url: "/textures/royal-kbach-obsidian.webp",
    theme: "dark",
  },
  "gold-filigree": {
    label: "៥. វល្លិមាសរំលេច (Gold Filigree)",
    url: "/textures/gold-scroll-filigree.webp",
    theme: "light",
  },
}

export function LuxuryDamaskInvitationCard({
  cmsData = defaultWeddingCmsData,
  guestName = "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា",
  defaultTexture = "gold-damask",
  showTextureSwitcher = true,
  onOpenRsvp,
  onAddToCalendar,
}: LuxuryDamaskInvitationProps) {
  const activeTextureKey = (cmsData?.goldDamaskTexture as TextureVariant) || defaultTexture || "gold-damask"
  const currentTexture = textureMap[activeTextureKey] || textureMap["gold-damask"]
  const isDark = currentTexture.theme === "dark"

  return (
    <div className="luxury-invitation-container relative w-full py-8 sm:py-12 px-3 sm:px-6 flex flex-col items-center justify-center">
      {/* MASTER LUXURY INVITATION FRAME */}
      <div
        className={`luxury-card-wrapper relative w-full max-w-4xl rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl ${
          isDark
            ? "border-2 border-[#D4AF37]/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
            : "border-2 border-[#D4AF37]/70 shadow-[0_25px_60px_rgba(140,90,16,0.18)]"
        }`}
        style={{
          backgroundImage: `url(${currentTexture.url})`,
          backgroundRepeat: "repeat",
          backgroundSize:
            activeTextureKey === "royal-bronze" || activeTextureKey === "royal-obsidian"
              ? "240px 240px"
              : "190px 190px",
          backgroundPosition: "center",
        }}
      >
        {/* Soft Radial Gradient Overlay (Ensures High Contrast & Text Legibility) */}
        <div
          className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
            isDark
              ? "bg-gradient-to-b from-[#1A0205]/88 via-[#2A0409]/92 to-[#120103]/95 backdrop-blur-[1px]"
              : "bg-gradient-to-b from-[#FFFDF8]/90 via-[#FAF4E6]/94 to-[#F5EAD4]/96 backdrop-blur-[1px]"
          }`}
          aria-hidden="true"
        />

        {/* Structural Gold Inset Border with Khmer Corner Accents */}
        <div className="relative z-10 p-5 sm:p-10 md:p-14">
          <div
            className={`inner-luxury-card relative rounded-2xl p-6 sm:p-10 md:p-12 text-center transition-all duration-500 ${
              isDark
                ? "bg-[#2D040A]/85 border-2 border-[#D4AF37]/85 text-[#FDFBF7] shadow-[inset_0_0_0_5px_rgba(212,175,55,0.2),0_15px_40px_rgba(0,0,0,0.6)]"
                : "bg-[#FFFFFF]/90 border-2 border-[#C59632] text-[#2C0408] shadow-[inset_0_0_0_5px_rgba(197,150,50,0.18),0_15px_45px_rgba(140,90,16,0.12)]"
            }`}
          >
            {/* 4 Authentic Khmer Kbach Corners */}
            <PhniTesCorner position="tl" className="modal-kbach" />
            <PhniTesCorner position="tr" className="modal-kbach" />
            <PhniTesCorner position="bl" className="modal-kbach" />
            <PhniTesCorner position="br" className="modal-kbach" />

            {/* Top Center Kbach Crest */}
            <div className="crest-top-wrap flex justify-center mb-3">
              <KbachCenterCrest className="w-28 sm:w-36 h-6" />
            </div>

            {/* Sacred Khmer Motto */}
            <p
              className={`khmer-motto font-['Moul'] text-sm sm:text-base md:text-lg tracking-wider mb-2 ${
                isDark ? "gold-foil-text" : "text-[#8C5A10]"
              }`}
            >
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </p>

            {/* Flourish Divider */}
            <GoldDivider light={isDark} className="my-2" />

            {/* VIP Personalized Guest Ribbon Plaque */}
            <div
              className={`guest-ribbon-plaque mx-auto my-5 px-6 py-2.5 rounded-full inline-flex flex-col items-center max-w-[90%] border shadow-md transition-transform duration-300 hover:scale-[1.02] ${
                isDark
                  ? "bg-[#FAF4E6] border-[#D4AF37] text-[#3B030A]"
                  : "bg-gradient-to-r from-[#FFFDF8] via-[#FDF5E2] to-[#FFFDF8] border-[#C59632] text-[#3B030A]"
              }`}
            >
              <small className="text-[11px] font-bold tracking-wider text-[#8C5A10] uppercase">
                សូមគោរពជូនភ្ញៀវកិត្តិយស
              </small>
              <strong className="font-['Moul'] text-sm sm:text-base text-[#4B0711] mt-0.5 text-center">
                {guestName}
              </strong>
            </div>

            {/* Parents' Honorific Grid */}
            <div className="parents-section my-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center">
                {/* Groom's Parents */}
                <div className="parent-side">
                  <span
                    className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                      isDark ? "text-[#E5B967]" : "text-[#8C5A10]"
                    }`}
                  >
                    មាតាបិតាខាងកូនប្រុស
                  </span>
                  <h4 className="font-bold text-sm sm:text-base leading-snug">
                    {cmsData.groomFather}
                  </h4>
                  <h4 className="font-bold text-sm sm:text-base leading-snug">
                    {cmsData.groomMother}
                  </h4>
                </div>

                {/* Center 24K Monogram Seal */}
                <div className="monogram-center flex justify-center my-2 md:my-0">
                  <MonogramSeal
                    leftLetter={cmsData.monogramLeft}
                    rightLetter={cmsData.monogramRight}
                    size={78}
                  />
                </div>

                {/* Bride's Parents */}
                <div className="parent-side">
                  <span
                    className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                      isDark ? "text-[#E5B967]" : "text-[#8C5A10]"
                    }`}
                  >
                    មាតាបិតាខាងកូនស្រី
                  </span>
                  <h4 className="font-bold text-sm sm:text-base leading-snug">
                    {cmsData.brideFather}
                  </h4>
                  <h4 className="font-bold text-sm sm:text-base leading-snug">
                    {cmsData.brideMother}
                  </h4>
                </div>
              </div>
            </div>

            {/* Formal Honorific Invitation Text */}
            <div className="formal-message my-5 max-w-xl mx-auto px-2">
              <h3
                className={`font-['Moul'] text-sm sm:text-base mb-2 ${
                  isDark ? "text-[#F6DF98]" : "text-[#540814]"
                }`}
              >
                មានកិត្តិយសសូមគោរពអញ្ជើញ
              </h3>
              <p
                className={`font-['Kantumruy_Pro'] text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-[#F2E8D5]" : "text-[#4A3828]"
                }`}
              >
                សម្តេច ទ្រង់ ឯកឧត្តម អ្នកឧកញ៉ា ឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា
                អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល
                ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រី របស់យើងខ្ញុំទាំងពីរ៖
              </p>
            </div>

            {/* Couple Showcase (The Golden Highlight) */}
            <div className="couple-highlight my-6 py-4 border-y border-[#D4AF37]/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Groom */}
                <div className="groom-box flex flex-col items-center">
                  <span
                    className={`text-xs font-semibold mb-1 ${
                      isDark ? "text-[#E5B967]" : "text-[#8C5A10]"
                    }`}
                  >
                    កូនប្រុសនាម
                  </span>
                  <h2
                    className={`font-['Moul'] text-xl sm:text-2xl md:text-3xl ${
                      isDark ? "gold-foil-text" : "text-[#540814]"
                    }`}
                  >
                    {cmsData.groomKhmer}
                  </h2>
                  <p className="font-['Cinzel','Montserrat',serif] text-xs tracking-widest text-[#9C7A2E] mt-1 uppercase">
                    {cmsData.groomLatin}
                  </p>
                </div>

                {/* Bride */}
                <div className="bride-box flex flex-col items-center">
                  <span
                    className={`text-xs font-semibold mb-1 ${
                      isDark ? "text-[#E5B967]" : "text-[#8C5A10]"
                    }`}
                  >
                    កូនស្រីនាម
                  </span>
                  <h2
                    className={`font-['Moul'] text-xl sm:text-2xl md:text-3xl ${
                      isDark ? "gold-foil-text" : "text-[#540814]"
                    }`}
                  >
                    {cmsData.brideKhmer}
                  </h2>
                  <p className="font-['Cinzel','Montserrat',serif] text-xs tracking-widest text-[#9C7A2E] mt-1 uppercase">
                    {cmsData.brideLatin}
                  </p>
                </div>
              </div>
            </div>

            {/* Date & Auspicious Timing */}
            <div className="wedding-datetime my-6">
              <p
                className={`text-xs sm:text-sm font-medium mb-1 ${
                  isDark ? "text-[#EBD8B8]" : "text-[#540814]"
                }`}
              >
                ដែលនឹងប្រព្រឹត្តទៅនៅ <strong>{cmsData.lunarDateFull}</strong>
              </p>
              <p
                className={`text-sm sm:text-base font-bold my-1 ${
                  isDark ? "text-[#FFF0B8]" : "text-[#8C5A10]"
                }`}
              >
                ត្រូវនឹង <strong>{cmsData.solarDateDisplay}</strong> វេលាម៉ោង{" "}
                <strong>{cmsData.ceremonyTimeDisplay}</strong>
              </p>
              <p
                className={`text-xs sm:text-sm font-semibold mt-2 ${
                  isDark ? "text-[#E5B967]" : "text-[#540814]"
                }`}
              >
                នៅមជ្ឈមណ្ឌលសន្និបាត <strong>{cmsData.venueHallKhmer}</strong>
              </p>
              <p
                className={`text-xs leading-normal max-w-lg mx-auto mt-1 ${
                  isDark ? "text-[#D4C3A3]" : "text-[#665444]"
                }`}
              >
                {cmsData.venueAddressKhmer}
              </p>
            </div>

            {/* Action Buttons (RSVP & Calendar) */}
            <div className="action-buttons-row mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                className="gold-button px-7 py-3 rounded-full text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                onClick={onOpenRsvp}
              >
                ឆ្លើយតបការអញ្ជើញ (RSVP)
              </button>

              <button
                type="button"
                className={`px-7 py-3 rounded-full text-sm font-bold border transition-all hover:scale-105 active:scale-95 ${
                  isDark
                    ? "border-[#D4AF37] text-[#F6DF98] hover:bg-[#D4AF37]/15"
                    : "border-[#8C5A10] text-[#540814] hover:bg-[#8C5A10]/10"
                }`}
                onClick={onAddToCalendar}
              >
                រក្សាទុកក្នុងប្រតិទិន (Save Date)
              </button>
            </div>

            {/* Bottom Inverted Kbach Crest */}
            <div className="crest-bottom-wrap flex justify-center mt-6">
              <KbachCenterCrest flip className="w-28 sm:w-36 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
