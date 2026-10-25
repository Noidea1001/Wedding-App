import type { GalleryPhoto } from "../../types/wedding"

export interface LightboxModalProps {
  photo: GalleryPhoto | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export function LightboxModal({
  photo,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  if (!photo) return null

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="lightbox-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="បិទ"
        >
          &times;
        </button>

        <div className="lightbox-image-stage">
          {photo.imageUrl ? (
            <img src={photo.imageUrl} alt={photo.title} />
          ) : (
            <div
              className="lightbox-fallback-art"
              style={{ background: photo.gradient }}
            >
              <h3>{photo.title}</h3>
              <p>{photo.subtitle}</p>
            </div>
          )}
        </div>

        <div className="lightbox-caption">
          <span className="lightbox-tag">{photo.tag}</span>
          <h3>{photo.title}</h3>
          <p className="lightbox-poetry">{photo.poetry}</p>
        </div>

        {onPrev && (
          <button
            className="lightbox-nav-btn lightbox-prev"
            onClick={onPrev}
            aria-label="រូបភាពមុន"
          >
            &#8249;
          </button>
        )}
        {onNext && (
          <button
            className="lightbox-nav-btn lightbox-next"
            onClick={onNext}
            aria-label="រូបភាពបន្ទាប់"
          >
            &#8250;
          </button>
        )}
      </div>
    </div>
  )
}
