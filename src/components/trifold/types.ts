import type { WeddingCmsData } from "../../types/wedding"

export type TrifoldThemeId =
  | "gold-damask"
  | "emerald-embossed"
  | "royal-ivory"
  | "dark-bronze"

export interface TemplateTheme {
  id: TrifoldThemeId
  name: string
  nameKhmer: string
  backgroundUrl: string
  bgSize?: string
  overlayClass: string
  glassClass: string
  borderClass: string
  goldAccent: string
  isDark: boolean
}

export interface TrifoldInvitationProps {
  cmsData: WeddingCmsData
  guestName: string
  onOpenRsvp: () => void
  onAddToCalendar: () => void
  onPlayChime?: () => void
  initialOpen?: boolean
}
