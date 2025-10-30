import type { Event, EventCategory } from "./types"
import eventsData from "./events-data.json"

// Raw event data from Stuttgart API
interface RawEvent {
  title: string
  link: string
  description: string
  date: string
  ics_link: string
  location: string
  latitude?: number
  longitude?: number
}

function categorizeEvent(title: string, description: string): EventCategory {
  const text = `${title} ${description}`.toLowerCase()

  if (text.match(/konzert|musik|band|jazz|rock|pop|sänger|benefiz.*konzert/i)) return "Konzert"
  if (text.match(/theater|schauspiel|bühne|drama|komödie|musical/i)) return "Theater"
  if (text.match(/sport|fußball|volleyball|basketball|lauf|handball/i)) return "Sport"
  if (text.match(/kinder|kids|familie|jugend|figurentheater/i)) return "Kinder"
  if (text.match(/kunst|ausstellung|galerie|museum/i)) return "Kunst"
  if (text.match(/tanz|ballett|dance/i)) return "Tanz"
  if (text.match(/party|club|disco|nacht/i)) return "Party"
  if (text.match(/festival|fest|markt/i)) return "Festival"
  if (text.match(/comedy|kabarett|satire|quatsch/i)) return "Comedy"
  if (text.match(/lesung|literatur|vortrag/i)) return "Lesung"

  return "Sonstiges"
}

function getCategoryImage(category: EventCategory): string {
  const imageMap: Record<EventCategory, string> = {
    Konzert: "/indie-rock-concert-stage-lights.jpg",
    Theater: "/classic-cinema-vintage-movie-theater.jpg",
    Sport: "/indie-rock-concert-stage-lights.jpg",
    Kinder: "/children-theater-puppet-show-colorful.jpg",
    Kunst: "/modern-art-gallery.png",
    Tanz: "/90s-party-disco-ball-dance-floor.jpg",
    Party: "/rooftop-party-city-skyline-night.jpg",
    Festival: "/summer-music-festival-outdoor-crowd.jpg",
    Comedy: "/comedy-show-audience-laughing.jpg",
    Lesung: "/bookstore-literature-event.jpg",
    Sonstiges: "/indie-rock-concert-stage-lights.jpg",
  }
  return imageMap[category]
}

export function parseStuttgartEvents(rawEvents: RawEvent[]): Event[] {
  console.log("[v0] Parsing Stuttgart events, total:", rawEvents.length)

  const eventsWithCoords = rawEvents.filter((event) => event.latitude && event.longitude)
  console.log("[v0] Events with coordinates:", eventsWithCoords.length)

  return eventsWithCoords.map((event, index) => {
    const category = categorizeEvent(event.title, event.description)

    return {
      id: `stuttgart-${index + 1}`,
      title: event.title,
      category,
      date: new Date(event.date),
      location: event.location,
      description: event.description,
      image: getCategoryImage(category),
      link: event.link,
      icsLink: event.ics_link,
      coordinates: {
        lat: event.latitude!,
        lng: event.longitude!,
      },
    }
  })
}

export const rawStuttgartEvents: RawEvent[] = eventsData as RawEvent[]

export const stuttgartEvents = parseStuttgartEvents(rawStuttgartEvents)

console.log("[v0] Total Stuttgart events loaded:", stuttgartEvents.length)
