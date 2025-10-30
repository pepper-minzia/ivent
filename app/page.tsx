"use client"

import { useState, useMemo } from "react"
import { mockEvents } from "@/lib/mock-events"
import type { FilterState, EventCategory } from "@/lib/types"
import { filterEvents, groupEventsByCategory, sortEvents } from "@/lib/filter-utils"
import { CategorySection } from "@/components/category-section"
import { Navbar } from "@/components/navbar"
import { NewsletterSection } from "@/components/newsletter-section"
import { EventsMap } from "@/components/events-map"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutGrid, Map } from "lucide-react"

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    city: "Stuttgart",
    dateRange: { start: null, end: null },
  })
  const [sortBy, setSortBy] = useState<"date" | "title">("date")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  const availableCategories = useMemo(() => {
    const categories = new Set<EventCategory>()
    mockEvents.forEach((event) => categories.add(event.category))
    return Array.from(categories).sort()
  }, [])

  const filteredEvents = useMemo(() => {
    const filtered = filterEvents(mockEvents, filters)
    return sortEvents(filtered, sortBy)
  }, [filters, sortBy])

  const groupedEvents = useMemo(() => {
    return groupEventsByCategory(filteredEvents)
  }, [filteredEvents])

  const nearYouEvents = useMemo(() => {
    return mockEvents.filter((event) => event.nearYou)
  }, [])

  const hasActiveFilters = (filters.categories?.length ?? 0) > 0 || filters.dateRange.start !== null

  return (
    <div className="min-h-screen bg-background">
      <Navbar filters={filters} onFiltersChange={setFilters} availableCategories={availableCategories} />

      <div className="container mx-auto px-4 pt-8">
        <NewsletterSection filters={filters} />
      </div>

      {/* View Mode and Sort Bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Nach Datum</SelectItem>
                <SelectItem value="title">Nach Titel</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-9 w-9"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("map")}
                className="h-9 w-9"
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {viewMode === "map" ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Events auf der Karte</h1>
              <p className="text-muted-foreground">
                {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"} gefunden
              </p>
            </div>
            <EventsMap events={filteredEvents} />
          </div>
        ) : (
          <div className="space-y-12">
            {!hasActiveFilters && (
              <>
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-balance">Entdecke Events in deiner Nähe</h1>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Personalisierte Empfehlungen für unvergessliche Erlebnisse
                  </p>
                </div>

                <CategorySection title="In deiner Nähe" events={nearYouEvents} maxEvents={3} />
              </>
            )}

            {hasActiveFilters && filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Keine Events gefunden. Versuche andere Filter.</p>
              </div>
            )}

            {Array.from(groupedEvents.entries()).map(([category, events]) => (
              <CategorySection key={category} title={category} events={events} maxEvents={hasActiveFilters ? 100 : 3} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 iVent - Deine Event-Empfehlungsplattform</p>
        </div>
      </footer>
    </div>
  )
}
