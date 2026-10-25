export interface ScheduleItem {
  id: string
  time: string
  period: string
  icon: string
  title: string
  subtitle: string
  detail: string
}

export interface GalleryPhoto {
  id: number
  title: string
  subtitle: string
  poetry: string
  tag: string
  imageUrl: string
  gradient: string
  category?: string
}

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export type WeddingThemePreset =
  | "royal-crimson"
  | "imperial-emerald"
  | "golden-palace"

export interface WeddingCmsData {
  // Couple & Portraits
  groomKhmer: string
  groomLatin: string
  groomAvatarUrl: string
  brideKhmer: string
  brideLatin: string
  brideAvatarUrl: string
  shortGroom: string
  shortBride: string
  monogramLeft: string
  monogramRight: string
  heroBannerImageUrl: string
  venuePhotoUrl: string

  // Parents
  groomFather: string
  groomMother: string
  brideFather: string
  brideMother: string

  // Date & Venue
  solarDateDisplay: string
  dayOfWeekKhmer: string
  dayNumberKhmer: string
  monthYearKhmer: string
  lunarDateFull: string
  ceremonyTimeDisplay: string
  countdownIsoDate: string
  venueNameKhmer: string
  venueHallKhmer: string
  venueAddressKhmer: string
  venueEnglishLabel: string
  googleMapsUrl: string

  // Banking / KHQR
  bankName: string
  accountHolder: string
  usdAccountNumber: string
  usdQrImageUrl: string
  khrAccountNumber: string
  khrQrImageUrl: string

  // Theme & Visuals + Client View Controller
  templateStyle: "khmer-traditional" | "trifold-gatefold" | "gold-damask" | "modern-clean" | "classic-kbach" | "popup-palace" | "olive-foil-2026" | "jasmine-arch"
  themePreset: WeddingThemePreset
  goldDamaskTexture?: "gold-damask" | "cream-subtle" | "royal-bronze" | "royal-obsidian" | "gold-filigree"
  showFloatingPetals: boolean
  showCoverSplash: boolean
  clientShowcaseMode: boolean
  allowInlinePhotoUpload: boolean
  showHostLinkGenerator: boolean

  // Schedule
  dayOneLabel: string
  dayTwoLabel: string
  dayOneEvents: ScheduleItem[]
  dayTwoEvents: ScheduleItem[]

  // Gallery
  gallery: GalleryPhoto[]

  // Guest List for Personalized Links
  guestList: import("./guest").GuestItem[]
}
