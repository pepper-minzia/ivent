"use client"
import { mockEvents } from "@/lib/mock-events"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowLeft, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import { CategorySection } from "@/components/category-section"
import { Navbar } from "@/components/navbar"

interface EventPageProps {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event nicht gefunden</h1>
          <Link href="/">
            <Button>Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = event.date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const similarEvents = mockEvents.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <div className="relative h-[400px] overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          </div>

          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="text-sm">
                    {event.category}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-balance">{event.title}</h1>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Wann</p>
                    <p className="text-muted-foreground">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Wo</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-3">Über das Event</h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">{event.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {event.link && (
                  <Button asChild className="flex-1" size="lg">
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      Zur Veranstaltungsseite
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {event.icsLink && (
                  <Button variant="outline" asChild className="flex-1 bg-transparent" size="lg">
                    <a href={event.icsLink} download className="flex items-center gap-2">
                      Zum Kalender hinzufügen
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {similarEvents.length > 0 && (
          <div className="mt-12">
            <CategorySection title="Ähnliche Events" events={similarEvents} maxEvents={3} />
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 iVent - Deine Event-Empfehlungsplattform</p>
        </div>
      </footer>
    </div>
  )
}
