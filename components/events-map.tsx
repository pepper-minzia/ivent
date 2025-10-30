"use client"

import { useEffect, useRef, useState } from "react"
import type { Event } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, X, ExternalLink } from "lucide-react"
import Link from "next/link"

interface EventsMapProps {
  events: Event[]
}

export function EventsMap({ events }: EventsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === "undefined" || !mapContainerRef.current || mapRef.current) return

      const maplibregl = (await import("maplibre-gl")).default
      await import("maplibre-gl/dist/maplibre-gl.css")

      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: [9.1829, 48.7758], // Stuttgart coordinates [lng, lat]
        zoom: 12,
      })

      map.addControl(new maplibregl.NavigationControl(), "top-right")

      mapRef.current = map

      return () => {
        map.remove()
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    const updateMarkers = async () => {
      const maplibregl = (await import("maplibre-gl")).default

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      // Add markers for each event
      const bounds = new maplibregl.LngLatBounds()
      let hasMarkers = false

      events.forEach((event) => {
        if (!event.coordinates) return

        // Create custom marker element
        const el = document.createElement("div")
        el.className = "custom-marker"
        el.style.width = "24px"
        el.style.height = "24px"
        el.style.borderRadius = "50%"
        el.style.backgroundColor = "#3b82f6"
        el.style.border = "2px solid white"
        el.style.cursor = "pointer"
        el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)"

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([event.coordinates.lng, event.coordinates.lat])
          .addTo(mapRef.current)

        el.addEventListener("click", () => {
          setSelectedEvent(event)
        })

        markersRef.current.push(marker)
        bounds.extend([event.coordinates.lng, event.coordinates.lat])
        hasMarkers = true
      })

      // Fit map to show all markers
      if (hasMarkers) {
        mapRef.current.fitBounds(bounds, { padding: 50 })
      }
    }

    updateMarkers()
  }, [events])

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Selected Event Card */}
      {selectedEvent && (
        <Card className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-96 shadow-lg z-[1000]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Badge className="mb-2">{selectedEvent.category}</Badge>
                <h3 className="font-semibold text-lg leading-tight">{selectedEvent.title}</h3>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1" onClick={() => setSelectedEvent(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{selectedEvent.date.toLocaleDateString("de-DE", { dateStyle: "long" })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-2">{selectedEvent.location}</span>
              </div>
            </div>

            <Link href={`/event/${selectedEvent.id}`}>
              <Button className="w-full flex items-center gap-2">
                Details ansehen
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
