import type { Event, FilterState } from "./types"

export function filterEvents(events: Event[], filters: FilterState): Event[] {
  return events.filter((event) => {
    // Filter by categories
    if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
      return false
    }

    // Filter by date range
    if (filters.dateRange.start && event.date < filters.dateRange.start) {
      return false
    }
    if (filters.dateRange.end && event.date > filters.dateRange.end) {
      return false
    }

    return true
  })
}

export function groupEventsByCategory(events: Event[]) {
  const grouped = new Map<string, Event[]>()

  events.forEach((event) => {
    const category = event.category
    if (!grouped.has(category)) {
      grouped.set(category, [])
    }
    grouped.get(category)!.push(event)
  })

  return grouped
}

export function sortEvents(events: Event[], sortBy: "date" | "title"): Event[] {
  return [...events].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return a.date.getTime() - b.date.getTime()
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })
}
