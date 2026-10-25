import { useEffect, useMemo, useState } from "react"
import { loadRsvps, saveRsvps } from "../services/storage"
import type { RsvpRecord } from "../types/guest"

export function useGuestRSVP() {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>(() => loadRsvps())
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    saveRsvps(rsvps)
  }, [rsvps])

  const submitRsvp = (record: Omit<RsvpRecord, "id" | "createdAt">) => {
    const newRecord: RsvpRecord = {
      ...record,
      id: `r-${Date.now()}`,
      createdAt: "អម្បាញ់មិញនេះ",
    }
    setRsvps((prev) => [newRecord, ...prev])
    setSubmitted(true)
    return newRecord
  }

  const deleteRsvp = (id: string) => {
    setRsvps((prev) => prev.filter((r) => r.id !== id))
  }

  const stats = useMemo(() => {
    const totalResponses = rsvps.length
    const attendingRecords = rsvps.filter((r) => r.attending === "yes")
    const attendingCount = attendingRecords.length
    const notAttendingCount = rsvps.filter((r) => r.attending === "no").length
    const totalGuests = attendingRecords.reduce((sum, r) => sum + (r.guests || 1), 0)

    return {
      totalResponses,
      attendingCount,
      notAttendingCount,
      totalGuests,
    }
  }, [rsvps])

  return {
    rsvps,
    submitted,
    setSubmitted,
    submitRsvp,
    deleteRsvp,
    stats,
  }
}
