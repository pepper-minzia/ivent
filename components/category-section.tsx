import type { Event } from "@/lib/types"
import { EventCard } from "./event-card"

interface CategorySectionProps {
  title: string
  events: Event[]
  maxEvents?: number
}

export function CategorySection({ title, events, maxEvents = 3 }: CategorySectionProps) {
  const displayEvents = events.slice(0, maxEvents)

  if (displayEvents.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-balance">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
