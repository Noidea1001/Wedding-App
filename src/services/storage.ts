import {
  defaultWeddingCmsData,
  initialRsvpList,
  initialWishesList,
  type RsvpRecord,
  type WeddingCmsData,
  type WishRecord,
} from "../cmsData"

export const CMS_STORAGE_KEY = "cambodian_wedding_cms_v2"
export const RSVP_STORAGE_KEY = "cambodian_wedding_rsvps_v2"
export const WISHES_STORAGE_KEY = "cambodian_wedding_wishes_v2"

export function loadWeddingCms(): WeddingCmsData {
  if (typeof window === "undefined") return defaultWeddingCmsData
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const mergedGallery = defaultWeddingCmsData.gallery.map((defaultPhoto, idx) => {
        const userPhoto = parsed.gallery?.[idx]
        const hasValidUrl =
          userPhoto?.imageUrl &&
          typeof userPhoto.imageUrl === "string" &&
          userPhoto.imageUrl.trim() !== "" &&
          !userPhoto.imageUrl.includes("reference-fourth")
        return {
          ...defaultPhoto,
          ...userPhoto,
          imageUrl: hasValidUrl ? userPhoto.imageUrl : defaultPhoto.imageUrl,
        }
      })
      return { ...defaultWeddingCmsData, ...parsed, gallery: mergedGallery }
    }
  } catch (e) {
    console.error("Failed to load CMS data from localStorage", e)
  }
  return defaultWeddingCmsData
}

export function saveWeddingCms(data: WeddingCmsData): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error("Failed to save CMS data to localStorage", e)
  }
}

export function loadRsvps(): RsvpRecord[] {
  if (typeof window === "undefined") return initialRsvpList
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error("Failed to load RSVPs from localStorage", e)
  }
  return initialRsvpList
}

export function saveRsvps(rsvps: RsvpRecord[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvps))
  } catch (e) {
    console.error("Failed to save RSVPs to localStorage", e)
  }
}

export function loadWishes(): WishRecord[] {
  if (typeof window === "undefined") return initialWishesList
  try {
    const raw = localStorage.getItem(WISHES_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error("Failed to load Wishes from localStorage", e)
  }
  return initialWishesList
}

export function saveWishes(wishes: WishRecord[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes))
  } catch (e) {
    console.error("Failed to save Wishes to localStorage", e)
  }
}
