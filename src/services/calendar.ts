import type { WeddingCmsData } from "../types/wedding"

export function exportWeddingCalendarIcs(cmsData: WeddingCmsData): void {
  if (typeof window === "undefined") return

  const startDate = "20261227T000000Z"
  const endDate = "20261227T140000Z"
  const summary = `ពិធីមង្គលការរបស់ ${cmsData.shortGroom} និង ${cmsData.shortBride}`
  const location = cmsData.venueNameKhmer
  const description = `សូមគោរពអញ្ជើញចូលរួមពិធីមង្គលការរបស់យើងខ្ញុំ នៅ ${cmsData.venueHallKhmer}`

  const calendarContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cambodian Royal Wedding//Digital Invitation//KM",
    "BEGIN:VEVENT",
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n")

  const blob = new Blob([calendarContent], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `cambodian-wedding-${cmsData.shortGroom}-${cmsData.shortBride}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
