import { useEffect, useState } from "react"
import { loadWeddingCms, saveWeddingCms } from "../services/storage"
import type { WeddingCmsData } from "../types/wedding"

export const DEFAULT_GUEST_NAME = "ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា"

export function useWeddingData() {
  const [cmsData, setCmsData] = useState<WeddingCmsData>(() => loadWeddingCms())

  // Parse guest from URL parameter (e.g. ?guest=...)
  const [guestName, setGuestName] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_GUEST_NAME
    const params = new URLSearchParams(window.location.search)
    const guestParam = params.get("guest")
    return guestParam ? decodeURIComponent(guestParam) : DEFAULT_GUEST_NAME
  })

  // Auto-sync CMS changes to LocalStorage
  useEffect(() => {
    saveWeddingCms(cmsData)
  }, [cmsData])

  const updateCmsData = (patch: Partial<WeddingCmsData>) => {
    setCmsData((prev) => ({ ...prev, ...patch }))
  }

  return {
    cmsData,
    setCmsData,
    updateCmsData,
    guestName,
    setGuestName,
  }
}
