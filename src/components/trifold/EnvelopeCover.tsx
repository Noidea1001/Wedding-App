import { motion } from "framer-motion"
import type { WeddingCmsData } from "../../types/wedding"
import type { TemplateTheme } from "./types"
import { GuestPlaque } from "./GuestPlaque"
import { MonogramSeal, GoldDivider, KbachCenterCrest } from "../kbach"

export interface EnvelopeCoverProps {
  cmsData: WeddingCmsData
  guestName: string
  theme: TemplateTheme
  onOpen: () => void
}

export function EnvelopeCover({
  cmsData,
  guestName,
  theme,
  onOpen,
}: EnvelopeCoverProps) {
  return (
    <motion.div
      key="envelope-closed"
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        className={`relative rounded-3xl p-6 sm:p-10 text-center transition-all duration-300 ${
          theme.isDark
            ? "bg-[#2D040A]/92 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_0_0_4px_rgba(212,175,55,0.2)] text-[#FDFBF7]"
            : "bg-[#FFFFFF]/92 border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(140,90,16,0.18),inset_0_0_0_4px_rgba(197,150,50,0.15)] text-[#2C0408]"
        } backdrop-blur-md`}
      >
        {/* Corner Ornaments (❖) */}
        <span className="absolute top-3 left-3 text-sm text-[#D4AF37] select-none" aria-hidden="true">
          ❖
        </span>
        <span className="absolute top-3 right-3 text-sm text-[#D4AF37] select-none" aria-hidden="true">
          ❖
        </span>
        <span className="absolute bottom-3 left-3 text-sm text-[#D4AF37] select-none" aria-hidden="true">
          ❖
        </span>
        <span className="absolute bottom-3 right-3 text-sm text-[#D4AF37] select-none" aria-hidden="true">
          ❖
        </span>

        {/* Top Royal Crest */}
        <div className="flex justify-center mb-2">
          <KbachCenterCrest className="w-28 sm:w-36 h-6" />
        </div>

        {/* Sacred Subtitle */}
        <p className="font-['Moul'] text-xs sm:text-sm tracking-wider text-[#C5A059] uppercase mb-1">
          សិរីមង្គលអាពាហ៍ពិពាហ៍
        </p>

        <GoldDivider light={theme.isDark} className="my-2" />

        {/* Monogram Seal Badge */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="my-3 flex justify-center"
        >
          <MonogramSeal
            leftLetter={cmsData.monogramLeft}
            rightLetter={cmsData.monogramRight}
            size={86}
          />
        </motion.div>

        {/* Couple Names */}
        <h1 className="font-['Moul'] text-xl sm:text-2xl md:text-3xl my-2 leading-tight flex flex-wrap items-center justify-center gap-2">
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

        <p className="font-['Montserrat',sans-serif] text-[11px] sm:text-xs tracking-widest uppercase text-[#9C7A2E] mb-4">
          {cmsData.groomLatin} &bull; {cmsData.brideLatin}
        </p>

        {/* Personalized Guest Name Plaque */}
        <div className="my-4">
          <GuestPlaque
            guestName={guestName}
            prefix="សូមគោរពអញ្ជើញភ្ញៀវកិត្តិយស"
            isDark={theme.isDark}
          />
        </div>

        {/* Date & Hall Teaser */}
        <div className="my-3 text-xs sm:text-sm font-semibold text-[#8C5A10]">
          <p>{cmsData.solarDateDisplay}</p>
          <p className="text-[11.5px] opacity-90 mt-0.5">{cmsData.venueHallKhmer}</p>
        </div>

        {/* Animated Open Button */}
        <div className="mt-6 flex justify-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpen}
            className="gold-button px-7 py-3 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 group cursor-pointer"
          >
            <span>សូមបើកសំបុត្រអញ្ជើញ</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
