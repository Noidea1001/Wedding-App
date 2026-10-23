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
}

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
  templateStyle: "classic-kbach" | "popup-palace" | "olive-foil-2026" | "jasmine-arch"
  themePreset: "royal-crimson" | "imperial-emerald" | "golden-palace"
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
  guestList: GuestItem[]
}

export const defaultWeddingCmsData: WeddingCmsData = {
  groomKhmer: "សិរី សុវណ្ណ",
  groomLatin: "SEREY SOVANN",
  groomAvatarUrl: "",
  brideKhmer: "ចាន់ មាលា",
  brideLatin: "CHAN MALIS",
  brideAvatarUrl: "",
  shortGroom: "សុវណ្ណ",
  shortBride: "មាលា",
  monogramLeft: "ស",
  monogramRight: "ម",
  heroBannerImageUrl: "",
  venuePhotoUrl: "",

  groomFather: "លោក ឧកញ៉ា សិរី វឌ្ឍនា",
  groomMother: "លោកជំទាវ ហេង សុខុម",
  brideFather: "ឯកឧត្តម ចាន់ ដារ៉ា",
  brideMother: "លោកជំទាវ កែវ សុជាតា",

  solarDateDisplay: "ថ្ងៃសៅរ៍ ទី២៧ ខែធ្នូ ឆ្នាំ២០២៦",
  dayOfWeekKhmer: "ថ្ងៃសៅរ៍",
  dayNumberKhmer: "២៧",
  monthYearKhmer: "ធ្នូ ២០២៦",
  lunarDateFull: "ថ្ងៃសៅរ៍ ៣រោច ខែមិគសិរ ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០",
  ceremonyTimeDisplay: "០៥:០០ ល្ងាច",
  countdownIsoDate: "2026-12-27T07:00:00+07:00",
  venueNameKhmer: "មជ្ឈមណ្ឌលសន្និបាត ដឹ ព្រេមៀ សែនសុខ",
  venueHallKhmer: "ដឹ ព្រេមៀ សែនសុខ (អគារ A)",
  venueAddressKhmer:
    "អគារ A មហាវិថីឈ្នះឈ្នះ (ទល់មុខផ្សារទំនើប អ៊ីអន ២) សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ",
  venueEnglishLabel: "THE PREMIER CENTER SEN SOK • HALL A",
  googleMapsUrl: "https://maps.google.com/?q=The+Premier+Center+Sen+Sok",

  bankName: "KHQR • ABA BANK",
  accountHolder: "SOVANN SEREY & MALIS CHAN",
  usdAccountNumber: "001 888 999",
  usdQrImageUrl: "",
  khrAccountNumber: "002 777 888",
  khrQrImageUrl: "",

  templateStyle: "classic-kbach",
  themePreset: "royal-crimson",
  showFloatingPetals: true,
  showCoverSplash: true,
  clientShowcaseMode: false,
  allowInlinePhotoUpload: false,
  showHostLinkGenerator: false,

  dayOneLabel: "ថ្ងៃទី១ • ថ្ងៃសុក្រ ទី២៦ ធ្នូ",
  dayTwoLabel: "ថ្ងៃទី២ • ថ្ងៃសៅរ៍ ទី២៧ ធ្នូ",
  dayOneEvents: [
    {
      id: "d1-1",
      time: "០២:០០",
      period: "រសៀល",
      icon: "offering",
      title: "ពិធីសែនក្រុងពាលី",
      subtitle: "Krong Peali Offering Ritual",
      detail: "ពិធីបួងសួងសុំទឹកដី និងទេវតាថែរក្សា ដើម្បីសេចក្តីសុខសប្បាយក្នុងពិធីមង្គលការ",
    },
    {
      id: "d1-2",
      time: "០៣:៣០",
      period: "រសៀល",
      icon: "monk",
      title: "ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត",
      subtitle: "Monks' Chanting & Blessing",
      detail: "និមន្តព្រះសង្ឃចម្រើនព្រះបរិត្ត និងប្រសិទ្ធពរជ័យសិរីមង្គលដល់គូស្វាមីភរិយាថ្មី",
    },
    {
      id: "d1-3",
      time: "០៥:០០",
      period: "ល្ងាច",
      icon: "banquet",
      title: "ពិធីជាវខាន់ស្លា និងទទួលភ្ញៀវ",
      subtitle: "Betel Offering & Evening Gathering",
      detail: "ជួបជុំញាតិមិត្តជិតឆ្ងាយ និងពិសាអាហារពេលល្ងាចដោយមេត្រីភាព",
    },
  ],
  dayTwoEvents: [
    {
      id: "d2-1",
      time: "០៦:៣០",
      period: "ព្រឹក",
      icon: "procession",
      title: "ពិធីហែជំនូន (កំណត់)",
      subtitle: "Royal Groom's Procession (Haeoum)",
      detail: "ជួបជុំភ្ញៀវកិត្តិយស រៀបចំក្បួនហែជំនូនតាមប្រពៃណីខ្មែរដ៏ផូរផង់",
    },
    {
      id: "d2-2",
      time: "០៨:០០",
      period: "ព្រឹក",
      icon: "offering",
      title: "ពិធីនិយាយជើងការ និងរាប់ផ្លែឈើ",
      subtitle: "Symbolic Dowry & 36 Fruits Counting",
      detail: "ពិធីជូនភស្តុតាងជំនូន និងផ្លែឈើទាំង ៣៦ មុខ ជូនមាតាបិតាខាងកូនស្រី",
    },
    {
      id: "d2-3",
      time: "០៩:០០",
      period: "ព្រឹក",
      icon: "scissors",
      title: "ពិធីកាត់សក់បង្កក់សិរី",
      subtitle: "Royal Hair-Cutting Cleansing Ritual",
      detail: "ពិធីកាត់សក់ជម្រះឧបទ្រពចង្រៃ និងប្រសិទ្ធពរជ័យពីលោកអ្នកមានគុណ និងភ្ញៀវកិត្តិយស",
    },
    {
      id: "d2-4",
      time: "១០:៣០",
      period: "ព្រឹក",
      icon: "popil",
      title: "ពិធីសំពះផ្ទឹម បង្វិលពពិល និងចងដៃ",
      subtitle: "Sompas Phtim, Popil Candle & Red Thread",
      detail: "ពិធីបង្វិលពពិល ១៩ ជុំ បាចផ្កាស្លា សំពះផ្ទឹម និងចងដៃប្រសិទ្ធពរជ័យពីចាស់ទុំ",
    },
    {
      id: "d2-5",
      time: "០៥:០០",
      period: "ល្ងាច",
      icon: "banquet",
      title: "ពិធីពិសាភោជនាហារ",
      subtitle: "Grand Gala Wedding Banquet",
      detail: "ទទួលភ្ញៀវកិត្តិយស ពិសាភោជនាហាររួមគ្នា នៅមជ្ឈមណ្ឌល ដឹ ព្រេមៀ សែនសុខ (អគារ A)",
    },
  ],

  gallery: [
    {
      id: 1,
      title: "ឈុតប្រពៃណីខ្មែរ បុរាណ",
      subtitle: "សម្លៀកបំពាក់ហូលផាមួង និងក្បិនមាស",
      poetry: "ស្នេហាប្រៀបដូចផ្កាឈូកមាស រីកក្រោមពន្លឺព្រះអាទិត្យនៃប្រាសាទបុរាណ",
      tag: "Chapter I • Royal Attire",
      imageUrl: "",
      gradient: "radial-gradient(circle at 50% 35%, #8f1d28 0%, #42060c 60%, #1c0104 100%)",
    },
    {
      id: 2,
      title: "ស្នាមញញឹមនៃសុភមង្គល",
      subtitle: "ក្រោមម្លប់ប្រាសាទបុរាណខ្មែរ",
      poetry: "វាសនាចងភ្ជាប់និស្ស័យពីអតីតជាតិ ឱ្យយើងជួបគ្នាក្នុងថ្ងៃមង្គលជ័យ",
      tag: "Chapter II • Sacred Vows",
      imageUrl: "",
      gradient: "radial-gradient(circle at 50% 35%, #a16f22 0%, #4d2807 62%, #1d0902 100%)",
    },
    {
      id: 3,
      title: "សន្យាស្នេហ៍អមតៈ",
      subtitle: "ពិធីសំពះផ្ទឹម និងចងដៃ",
      poetry: "អំបោះក្រហមចងភ្ជាប់ដួងចិត្តទាំងពីរ រួមរស់ជាគូស្វាមីភរិយាអស់កល្បជានិច្ច",
      tag: "Chapter III • Eternal Union",
      imageUrl: "",
      gradient: "radial-gradient(circle at 50% 35%, #781722 0%, #360409 65%, #160103 100%)",
    },
  ],

  guestList: [
    {
      id: "g-1",
      name: "ឯកឧត្តម សុខា និង លោកជំទាវ",
      title: "VIP",
      side: "ភ្ញៀវ VIP",
      table: "VIP-01",
    },
    {
      id: "g-2",
      name: "អ្នកឧកញ៉ា លី ហួរ និង លោកជំទាវ",
      title: "VIP",
      side: "ខាងកូនប្រុស",
      table: "VIP-02",
    },
    {
      id: "g-3",
      name: "លោក ចាន់ថន និង ភរិយា",
      title: "ភ្ញៀវកិត្តិយស",
      side: "ខាងកូនស្រី",
      table: "A-09",
    },
  ],
}

export const initialRsvpList: RsvpRecord[] = [
  {
    id: "r-1",
    name: "ឯកឧត្តម សុខា និង លោកជំទាវ",
    phone: "012 888 999",
    guests: 2,
    attending: "yes",
    createdAt: "ថ្ងៃនេះ ១០:១៥ ព្រឹក",
  },
  {
    id: "r-2",
    name: "លោក ចាន់ថន និង ភរិយា",
    phone: "017 345 678",
    guests: 2,
    attending: "yes",
    createdAt: "ម្សិលមិញ ០៤:៣០ ល្ងាច",
  },
]

export const initialWishesList: WishRecord[] = [
  {
    id: "w-1",
    name: "ឯកឧត្តម សុខា និង លោកជំទាវ",
    relation: "ភ្ញៀវកិត្តិយសខាងកូនប្រុស",
    message:
      "សូមជូនពរគូស្វាមីភរិយាថ្មី ទទួលបាននូវសុភមង្គល សេចក្តីសុខចម្រើន និងស្រឡាញ់គ្នាជារៀងរហូត ដល់ចាស់កោងខ្នង។",
    time: "២ ម៉ោងមុន",
  },
  {
    id: "w-2",
    name: "លោក ចាន់ថន និង ភរិយា",
    relation: "មិត្តភក្តិកូនក្រមុំ",
    message:
      "អបអរសាទរថ្ងៃមង្គលជ័យ សុវណ្ណ & មាលា! សូមឱ្យជីវិតគ្រួសារថ្មីពោរពេញដោយស្នាមញញឹម ទ្រព្យសម្បត្តិហូរចូល និងសុខភាពល្អបរិបូរណ៍។",
    time: "៥ ម៉ោងមុន",
  },
  {
    id: "w-3",
    name: "កញ្ញា បុប្ផា រចនា",
    relation: "មិត្តរួមការងារ",
    message:
      "សូមទេវតាឆ្នាំថ្មីតាមថែរក្សាអ្នកទាំងពីរ ឱ្យជួបតែពុទ្ធពរទាំងបួនប្រការ គឺ អាយុ វណ្ណៈ សុខៈ ពលៈ កុំបីឃ្លៀងឃ្លាតឡើយ។",
    time: "១ ថ្ងៃមុន",
  },
]
