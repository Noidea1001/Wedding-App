import type { CountdownTime, WeddingCmsData } from "./wedding"

export type TemplateId =
  | "khmer-traditional"
  | "trifold-gatefold"
  | "gold-damask"
  | "modern-clean"
  | "classic-kbach" // legacy alias for khmer-traditional

export interface WeddingTemplateProps {
  cmsData: WeddingCmsData
  guestName: string
  countdown: CountdownTime
  onOpenRsvp: () => void
  onAddToCalendar: () => void
  onPlayChime?: () => void
  onQuickUpload?: (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
  ) => void
  allowUpload?: boolean
}
