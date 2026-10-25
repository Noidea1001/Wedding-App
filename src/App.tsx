import { useState } from "react"
import { useWeddingData } from "./hooks/useWeddingData"
import { useGuestRSVP } from "./hooks/useGuestRSVP"
import { useWishes } from "./hooks/useWishes"
import { useCountdown } from "./hooks/useCountdown"
import { exportWeddingCalendarIcs } from "./services/calendar"
import { playRoyalChime, startBackgroundAudio, pauseBackgroundAudio } from "./services/audio"
import { GoldSvgDefs } from "./components/kbach"
import { RoyalGatefoldInvitation, RsvpModal, MusicFab } from "./components/shared"
import {
  KhmerTraditionalTemplate,
  GoldDamaskTemplate,
  ModernCleanTemplate,
} from "./components/templates"
import { AdminDashboard } from "./components/admin"

export function App() {
  const { cmsData, setCmsData, updateCmsData, guestName, setGuestName } = useWeddingData()
  const { rsvps, submitRsvp, deleteRsvp } = useGuestRSVP()
  const { wishes, deleteWish } = useWishes()
  const countdown = useCountdown(cmsData.countdownIsoDate)

  // Modals & UI state
  const [coverVisible, setCoverVisible] = useState(() => cmsData.showCoverSplash)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [playingAudio, setPlayingAudio] = useState(false)

  const showAdminFab = true

  const handleOpenCover = () => {
    playRoyalChime()
    startBackgroundAudio().then((started) => {
      if (started) setPlayingAudio(true)
    })
    window.setTimeout(() => {
      setCoverVisible(false)
    }, 450)
  }

  const handleToggleAudio = () => {
    if (playingAudio) {
      pauseBackgroundAudio()
      setPlayingAudio(false)
    } else {
      startBackgroundAudio().then((started) => {
        if (started) setPlayingAudio(true)
      })
    }
  }

  const handleAddToCalendar = () => {
    exportWeddingCalendarIcs(cmsData)
  }

  // Active Template logic (Removed old TrifoldTemplate as requested)
  const isGoldDamask = cmsData.templateStyle === "gold-damask"
  const isModern = cmsData.templateStyle === "modern-clean"
  const isTraditional = !isGoldDamask && !isModern

  const currentThemeClass = isGoldDamask
    ? "tpl-gold-damask"
    : isModern
      ? "tpl-modern-clean"
      : "tpl-classic-kbach"

  return (
    <main
      className={`wedding-app theme-${cmsData.themePreset} ${currentThemeClass}`}
    >
      <GoldSvgDefs />

      {/* Interactive 3-Stage Gatefold Experience: Image 1 -> Image 2 -> Image 3 */}
      <RoyalGatefoldInvitation
        cmsData={cmsData}
        guestName={guestName}
        visible={coverVisible}
        onCompleteOpen={() => {
          setCoverVisible(false)
          startBackgroundAudio().then((started) => {
            if (started) setPlayingAudio(true)
          })
        }}
      />

      {/* Client Showcase / Template Switcher Bar */}
      {cmsData.clientShowcaseMode && (
        <div className="template-switcher-bar">
          <span className="ts-label">ជ្រើសរើសម៉ូតធៀបការ៖</span>
          <div className="ts-pills">
            <button
              type="button"
              className={`ts-pill-btn ${isTraditional ? "is-active" : ""}`}
              onClick={() => updateCmsData({ templateStyle: "khmer-traditional" })}
            >
              ១. ក្បាច់ភ្ញីទេសមាសបុរាណ (Classic Royal Kbach)
            </button>
            <button
              type="button"
              className={`ts-pill-btn ${isGoldDamask ? "is-active" : ""}`}
              onClick={() => updateCmsData({ templateStyle: "gold-damask" })}
            >
              ២. មាសឆ្អិនផ្កាដាម៉ាស (Gold Damask Luxury)
            </button>
            <button
              type="button"
              className={`ts-pill-btn ${isModern ? "is-active" : ""}`}
              onClick={() => updateCmsData({ templateStyle: "modern-clean" })}
            >
              ៣. ម៉ូតទំនើប (Modern Clean Minimalist)
            </button>
            <button
              type="button"
              className="replay-cover-pill"
              onClick={() => {
                setCoverVisible(true)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              បើកស្រោមធៀបការឡើងវិញ
            </button>
          </div>
        </div>
      )}

      {/* Floating Audio Toggle */}
      <MusicFab playing={playingAudio} onToggle={handleToggleAudio} />

      {/* Floating Admin FAB */}
      {showAdminFab && (
        <button
          type="button"
          className="cms-fab"
          onClick={() => setAdminOpen(true)}
          aria-label="បើកផ្ទាំងគ្រប់គ្រង CMS"
        >
          <span className="cms-fab-dot" />
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>គ្រប់គ្រង CMS ({rsvps.length})</span>
        </button>
      )}

      {/* Active Wedding Template View */}
      {isGoldDamask ? (
        <GoldDamaskTemplate
          cmsData={cmsData}
          guestName={guestName}
          countdown={countdown}
          onOpenRsvp={() => setRsvpOpen(true)}
          onAddToCalendar={handleAddToCalendar}
          onPlayChime={playRoyalChime}
          allowUpload={cmsData.allowInlinePhotoUpload}
        />
      ) : isTraditional ? (
        <KhmerTraditionalTemplate
          cmsData={cmsData}
          guestName={guestName}
          countdown={countdown}
          onOpenRsvp={() => setRsvpOpen(true)}
          onAddToCalendar={handleAddToCalendar}
          onPlayChime={playRoyalChime}
          allowUpload={cmsData.allowInlinePhotoUpload}
        />
      ) : (
        <ModernCleanTemplate
          cmsData={cmsData}
          guestName={guestName}
          countdown={countdown}
          onOpenRsvp={() => setRsvpOpen(true)}
          onAddToCalendar={handleAddToCalendar}
          onPlayChime={playRoyalChime}
          allowUpload={cmsData.allowInlinePhotoUpload}
        />
      )}

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        cmsData={cmsData}
        guestName={guestName}
        onSubmitRsvp={submitRsvp}
      />

      {/* Admin Studio Dashboard */}
      <AdminDashboard
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={cmsData}
        onChange={setCmsData}
        rsvps={rsvps}
        onDeleteRsvp={deleteRsvp}
        wishes={wishes}
        onDeleteWish={deleteWish}
        onSelectGuestPreview={(name) => setGuestName(name)}
      />
    </main>
  )
}

export default App
