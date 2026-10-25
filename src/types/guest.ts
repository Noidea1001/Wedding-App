export interface GuestItem {
  id: string
  name: string
  title: string
  side: "ខាងកូនប្រុស" | "ខាងកូនស្រី" | "ភ្ញៀវ VIP"
  table: string
}

export interface RsvpRecord {
  id: string
  name: string
  phone: string
  guests: number
  attending: "yes" | "no"
  createdAt: string
}

export interface WishRecord {
  id: string
  name: string
  relation: string
  message: string
  time: string
}
