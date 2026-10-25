import { motion } from "framer-motion"
import type { WeddingCmsData } from "../../types/wedding"
import type { TemplateTheme } from "./types"
import { GoldDivider, KbachCenterCrest, MonogramSeal, PhkaRomduol } from "../kbach"

export interface TrifoldContentProps {
  cmsData: WeddingCmsData
  guestName: string
  theme: TemplateTheme
  onClose: () => void
  onOpenRsvp: () => void
  onAddToCalendar: () => void
}

export function TrifoldContent({
  cmsData,
  guestName,
  theme,
  onClose,
  onOpenRsvp,
  onAddToCalendar,
}: TrifoldContentProps) {
  const panelBgClass = theme.isDark
    ? "bg-[#250308]/90 border border-[#D4AF37]/80 text-[#FDFBF7] shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
    : "bg-[#FDFBF7]/92 border border-[#D4AF37]/80 text-[#2C0408] shadow-[0_15px_40px_rgba(140,90,16,0.12)]"

  return (
    <motion.div
      key="trifold-opened"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ============================================================== */}
        {/* PANEL 1: LEFT PANEL — GROOM'S SIDE                             */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className={`lg:col-span-3 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-center backdrop-blur-md relative overflow-hidden ${panelBgClass}`}
        >
          {/* Subtle Corner Ornament */}
          <span className="absolute top-3 left-3 text-xs text-[#D4AF37]">❖</span>
          <span className="absolute bottom-3 left-3 text-xs text-[#D4AF37]">❖</span>

          <div className="panel-inner-top">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
              មាតាបិតាខាងកូនប្រុស
            </span>
            <div className="w-10 h-0.5 bg-[#D4AF37]/60 mx-auto mb-4" />

            {/* Groom's Parents */}
            <div className="my-3 space-y-1">
              <h4 className="font-bold text-sm sm:text-base">{cmsData.groomFather}</h4>
              <h4 className="font-bold text-sm sm:text-base">{cmsData.groomMother}</h4>
            </div>

            {/* Traditional Blessing */}
            <div className="my-5 px-2">
              <p className="text-xs leading-relaxed italic opacity-90 font-['Kantumruy_Pro']">
                “សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ
                ដល់កូនប្រុស-កូនស្រី ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង”
              </p>
            </div>
          </div>

          {/* Groom Badge & Name */}
          <div className="panel-inner-bottom pt-4 border-t border-[#D4AF37]/30 mt-4">
            <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden border-2 border-[#D4AF37] shadow-md flex items-center justify-center bg-gradient-to-tr from-[#3B030A] to-[#680A15]">
              {cmsData.groomAvatarUrl ? (
                <img src={cmsData.groomAvatarUrl} alt={cmsData.groomKhmer} className="w-full h-full object-fit" />
              ) : (
                <span className="font-['Moul'] text-xl text-[#F6DF98]">{cmsData.monogramLeft}</span>
              )}
            </div>
            <span className="text-[11px] text-[#C5A059] font-semibold uppercase">កូនប្រុសនាម</span>
            <h3 className="font-['Moul'] text-base sm:text-lg text-[#D4AF37] mt-0.5">
              {cmsData.groomKhmer}
            </h3>
            <p className="text-[11px] tracking-wider text-[#9C7A2E] font-['Montserrat',sans-serif]">
              {cmsData.groomLatin}
            </p>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* PANEL 2: CENTER PANEL — MAIN INVITATION & ACTIONS              */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className={`lg:col-span-6 rounded-3xl p-6 sm:p-10 text-center backdrop-blur-md relative flex flex-col justify-between ${panelBgClass}`}
        >
          {/* Top Close / Minimize Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full border border-[#D4AF37]/60 text-[#8C5A10] hover:bg-[#D4AF37]/20 transition-all cursor-pointer flex items-center gap-1"
            title="បិទស្រោមសំបុត្រ"
          >
            <span>បិទស្រោម</span>
          </button>

          <div>
            {/* Top Royal Crest */}
            <div className="flex justify-center mb-2">
              <KbachCenterCrest className="w-28 sm:w-36 h-6" />
            </div>

            <p className="font-['Moul'] text-xs sm:text-sm tracking-wider text-[#C5A059] uppercase mb-1">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </p>
            <GoldDivider light={theme.isDark} className="my-2" />

            {/* Couple Showcase */}
            <div className="my-4">
              <div className="flex justify-center mb-2">
                <MonogramSeal
                  leftLetter={cmsData.monogramLeft}
                  rightLetter={cmsData.monogramRight}
                  size={72}
                />
              </div>

              <h1 className="font-['Moul'] text-2xl sm:text-3xl md:text-4xl leading-tight flex flex-wrap items-center justify-center gap-2">
                <span className={theme.isDark ? "gold-foil-text" : "text-[#4B0711]"}>
                  {cmsData.groomKhmer}
                </span>
                <span className="font-['Playfair_Display',Georgia,serif] italic font-normal text-[#C5A059]">
                  &amp;
                </span>
                <span className={theme.isDark ? "gold-foil-text" : "text-[#4B0711]"}>
                  {cmsData.brideKhmer}
                </span>
              </h1>
            </div>

            {/* Formal Honorific Invitation Text */}
            <div className="max-w-md mx-auto my-4 text-xs sm:text-sm leading-relaxed px-2 font-['Kantumruy_Pro']">
              <p>
                យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ <strong>{guestName}</strong>
              </p>
              <p className="opacity-90 mt-1">
                អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី
                ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំទាំងពីរ។
              </p>
            </div>

            {/* Date & Venue Box */}
            <div className="my-5 p-3.5 rounded-xl border border-[#D4AF37]/40 bg-white/40 dark:bg-black/30 backdrop-blur-sm text-xs sm:text-sm">
              <p className="font-bold text-[#8C5A10] dark:text-[#F6DF98]">
                {cmsData.solarDateDisplay}
              </p>
              <p className="text-[11.5px] opacity-80 my-0.5">
                {cmsData.lunarDateFull} • វេលាម៉ោង {cmsData.ceremonyTimeDisplay}
              </p>
              <div className="w-8 h-px bg-[#D4AF37]/50 mx-auto my-1.5" />
              <p className="font-semibold text-xs">
                {cmsData.venueHallKhmer}
              </p>
              <p className="text-[11px] opacity-75 mt-0.5 max-w-sm mx-auto">
                {cmsData.venueAddressKhmer}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenRsvp}
              className="gold-button px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              ឆ្លើយតបការអញ្ជើញ (RSVP)
            </button>
            <button
              type="button"
              onClick={onAddToCalendar}
              className="px-6 py-2.5 rounded-full text-sm font-bold border border-[#D4AF37] text-[#8C5A10] dark:text-[#F6DF98] hover:bg-[#D4AF37]/15 transition-all"
            >
              កត់ត្រាក្នុងប្រតិទិន
            </button>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* PANEL 3: RIGHT PANEL — BRIDE'S SIDE                            */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          className={`lg:col-span-3 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-center backdrop-blur-md relative overflow-hidden ${panelBgClass}`}
        >
          {/* Subtle Corner Ornament */}
          <span className="absolute top-3 right-3 text-xs text-[#D4AF37]">❖</span>
          <span className="absolute bottom-3 right-3 text-xs text-[#D4AF37]">❖</span>

          <div className="panel-inner-top">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
              មាតាបិតាខាងកូនស្រី
            </span>
            <div className="w-10 h-0.5 bg-[#D4AF37]/60 mx-auto mb-4" />

            {/* Bride's Parents */}
            <div className="my-3 space-y-1">
              <h4 className="font-bold text-sm sm:text-base">{cmsData.brideFather}</h4>
              <h4 className="font-bold text-sm sm:text-base">{cmsData.brideMother}</h4>
            </div>

            {/* Traditional Blessing */}
            <div className="my-5 px-2">
              <p className="text-xs leading-relaxed italic opacity-90 font-['Kantumruy_Pro']">
                “សូមឱ្យគូស្វាមីភរិយាថ្មី ជួបតែសេចក្តីសុខក្សេមក្សាន្ត
                ត្រជាក់ត្រជុំដូចទឹកអម្រឹត និងជោគជ័យគ្រប់ភារកិច្ច”
              </p>
            </div>
          </div>

          {/* Bride Badge & Name */}
          <div className="panel-inner-bottom pt-4 border-t border-[#D4AF37]/30 mt-4">
            <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden border-2 border-[#D4AF37] shadow-md flex items-center justify-center bg-gradient-to-tr from-[#3B030A] to-[#680A15]">
              {cmsData.brideAvatarUrl ? (
                <img src={cmsData.brideAvatarUrl} alt={cmsData.brideKhmer} className="w-full h-full object-fit" />
              ) : (
                <span className="font-['Moul'] text-xl text-[#F6DF98]">{cmsData.monogramRight}</span>
              )}
            </div>
            <span className="text-[11px] text-[#C5A059] font-semibold uppercase">កូនស្រីនាម</span>
            <h3 className="font-['Moul'] text-base sm:text-lg text-[#D4AF37] mt-0.5">
              {cmsData.brideKhmer}
            </h3>
            <p className="text-[11px] tracking-wider text-[#9C7A2E] font-['Montserrat',sans-serif]">
              {cmsData.brideLatin}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
