import { useState, useEffect, useCallback } from "react"
import type { GalleryPhoto } from "../../types/wedding"
import { GoldDivider, AngkorBorder, PhkaRomduol } from "../kbach"

export interface LuxuryGallerySectionProps {
  gallery: GalleryPhoto[]
  variant?: "damask" | "clean" | "classic"
  showBorder?: boolean
}

export function LuxuryGallerySection({
  gallery,
  variant = "damask",
  showBorder = true,
}: LuxuryGallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({})

  // Filter photos
  const filteredPhotos = gallery.filter((p) => {
    if (activeCategory === "all") return true
    return p.category === activeCategory
  })

  const activePhoto =
    activeIndex !== null && activeIndex >= 0 && activeIndex < gallery.length
      ? gallery[activeIndex]
      : null

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return
    setActiveIndex((prev) => (prev! > 0 ? prev! - 1 : gallery.length - 1))
  }, [activeIndex, gallery.length])

  const handleNext = useCallback(() => {
    if (activeIndex === null) return
    setActiveIndex((prev) => (prev! < gallery.length - 1 ? prev! + 1 : 0))
  }, [activeIndex, gallery.length])

  const handleClose = useCallback(() => {
    setActiveIndex(null)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeIndex, handleClose, handlePrev, handleNext])

  const content = (
    <div className="luxury-gallery-container">
      {/* Header */}
      <div className="section-header-center text-center">
        <p className="section-kicker">កម្រងរូបភាពអនុស្សាវរីយ៍ • Luxury Gallery</p>
        <h2 className="luxury-gallery-title">រូបថតត្រៀមអាពាហ៍ពិពាហ៍ (Pre-Wedding)</h2>
        <GoldDivider />
        <p className="luxury-gallery-subtitle">
          ឆ្លាក់ទុកនូវរាល់អនុស្សាវរីយ៍ដ៏ផ្អែមល្ហែម និងសេចក្តីស្រឡាញ់ដ៏ស្មោះស្ម័គ្រ
        </p>

        {/* Category Filter Pills */}
        <div className="luxury-gallery-filter-tabs" role="tablist">
          <button
            type="button"
            className={`gallery-filter-pill ${activeCategory === "all" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            <span>ទាំងអស់ ({gallery.length})</span>
          </button>
          <button
            type="button"
            className={`gallery-filter-pill ${activeCategory === "traditional" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("traditional")}
          >
            <span>ឈុតប្រពៃណី</span>
          </button>
          <button
            type="button"
            className={`gallery-filter-pill ${activeCategory === "celebration" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("celebration")}
          >
            <span>ពិធីជប់លៀង</span>
          </button>
          <button
            type="button"
            className={`gallery-filter-pill ${activeCategory === "modern" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("modern")}
          >
            <span>ស្នេហាសម័យ</span>
          </button>
        </div>
      </div>

      {/* Photo Cards Grid */}
      <div className="luxury-gallery-grid">
        {filteredPhotos.map((photo) => {
          const originalIdx = gallery.findIndex((p) => p.id === photo.id)
          const isFailed = failedImages[photo.id] || !photo.imageUrl

          return (
            <article
              key={photo.id}
              className="luxury-gallery-card group"
              onClick={() => setActiveIndex(originalIdx)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveIndex(originalIdx)
                }
              }}
              aria-label={`មើលរូបភាព: ${photo.title}`}
            >
              <div className="luxury-gallery-card-inner">
                {/* Photo Stage */}
                <div className="luxury-gallery-stage">
                  {!isFailed ? (
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="luxury-gallery-img"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [photo.id]: true }))
                      }
                    />
                  ) : (
                    <div
                      className="luxury-gallery-fallback"
                      style={{ background: photo.gradient }}
                    >
                      <div className="fallback-emblem-wrap">
                        <PhkaRomduol size={38} className="fallback-flower" />
                        <span className="fallback-monogram">ស & ម</span>
                      </div>
                      <span className="fallback-title">{photo.title}</span>
                    </div>
                  )}

                  {/* Top Chapter Pill */}
                  <div className="luxury-gallery-card-tag">
                    <span>{photo.tag}</span>
                  </div>

                  {/* Hover Overlay with Magnifying Hint */}
                  <div className="luxury-gallery-hover-overlay">
                    <span className="hover-view-pill">
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>ចុចមើលរូបភាពធំ</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Info Panel */}
                <div className="luxury-gallery-card-info">
                  <h3 className="luxury-gallery-card-title">{photo.title}</h3>
                  <p className="luxury-gallery-card-subtitle">{photo.subtitle}</p>
                  <p className="luxury-gallery-card-poetry">
                    <span className="poetry-quote">“</span>
                    {photo.poetry}
                    <span className="poetry-quote">”</span>
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="luxury-lightbox-backdrop"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="រូបភាពធំ"
        >
          <div
            className="luxury-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Counter & Close */}
            <div className="luxury-lightbox-header">
              <span className="luxury-lightbox-counter">
                រូបភាព {activeIndex! + 1} នៃ {gallery.length}
              </span>
              <button
                type="button"
                className="luxury-lightbox-close"
                onClick={handleClose}
                aria-label="បិទ"
              >
                ✕
              </button>
            </div>

            {/* Main Stage */}
            <div className="luxury-lightbox-stage">
              {failedImages[activePhoto.id] || !activePhoto.imageUrl ? (
                <div
                  className="luxury-lightbox-fallback"
                  style={{ background: activePhoto.gradient }}
                >
                  <PhkaRomduol size={64} className="fallback-flower" />
                  <h3>{activePhoto.title}</h3>
                  <p>{activePhoto.subtitle}</p>
                </div>
              ) : (
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="luxury-lightbox-img"
                />
              )}

              {/* Navigation Arrows */}
              <button
                type="button"
                className="luxury-lightbox-nav luxury-lightbox-prev"
                onClick={handlePrev}
                aria-label="រូបភាពមុន"
              >
                ‹
              </button>
              <button
                type="button"
                className="luxury-lightbox-nav luxury-lightbox-next"
                onClick={handleNext}
                aria-label="រូបភាពបន្ទាប់"
              >
                ›
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="luxury-lightbox-caption">
              <span className="lightbox-chapter-tag">{activePhoto.tag}</span>
              <h3 className="lightbox-photo-title">{activePhoto.title}</h3>
              <p className="lightbox-photo-poetry">{activePhoto.poetry}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <section className="gallery-section w-full" id="gallery">
      <div className="section-container">
        {showBorder ? (
          <AngkorBorder variant={variant} showCenterCrests>
            {content}
          </AngkorBorder>
        ) : (
          content
        )}
      </div>
    </section>
  )
}
