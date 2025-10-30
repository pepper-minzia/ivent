"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Event } from "@/lib/types"

interface AddToCalendarButtonProps {
  event: Event
}

export function AddToCalendarButton({ event }: AddToCalendarButtonProps) {
  const handleAddToCalendar = () => {
    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//iVent//Event//DE
BEGIN:VEVENT
UID:${event.id}@ivent.app
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${event.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}, ${event.city}
END:VEVENT
END:VCALENDAR`

    // Create blob and download
    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${event.title.replace(/\s+/g, "-")}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button size="lg" className="w-full gap-2" onClick={handleAddToCalendar}>
      <Download className="h-5 w-5" />
      Im Kalender speichern
    </Button>
  )
}
