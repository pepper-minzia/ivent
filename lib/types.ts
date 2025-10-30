export type EventCategory =
  | "Konzert"
  | "Theater"
  | "Sport"
  | "Kinder"
  | "Kunst"
  | "Tanz"
  | "Party"
  | "Festival"
  | "Comedy"
  | "Lesung"
  | "Sonstiges"

export interface Event {
  id: string
  title: string
  category: EventCategory
  date: Date
  location: string
  description: string
  image: string
  link: string
  icsLink: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface FilterState {
  categories: EventCategory[]
  city: string
  dateRange: {
    start: Date | null
    end: Date | null
  }
}
