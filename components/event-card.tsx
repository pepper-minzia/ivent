import type { Event } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = event.date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <Link href={`/event/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {event.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-balance">{event.title}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <span className="flex items-center gap-2">
              Details ansehen
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
