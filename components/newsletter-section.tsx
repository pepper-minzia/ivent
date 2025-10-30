"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Check, Calendar } from "lucide-react"
import type { FilterState } from "@/lib/types"

interface NewsletterSectionProps {
  filters: FilterState
}

export function NewsletterSection({ filters }: NewsletterSectionProps) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setIsLoading(false)

    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 3000)
  }

  const handleCalendarFeed = () => {
    // Generate iCal feed URL with current filters
    const params = new URLSearchParams()
    params.set("city", filters.city)
    if (filters.categories.length > 0) params.set("categories", filters.categories.join(","))
    if (filters.dateRange.start) params.set("start", filters.dateRange.start.toISOString())
    if (filters.dateRange.end) params.set("end", filters.dateRange.end.toISOString())

    // In a real app, this would point to an actual iCal feed endpoint
    const feedUrl = `/api/calendar-feed?${params.toString()}`

    // For demo purposes, show an alert
    alert(
      `iCal Feed URL:\n${window.location.origin}${feedUrl}\n\nFüge diese URL zu deinem Kalender hinzu, um automatisch Updates zu erhalten.`,
    )
  }

  const getFilterDescription = () => {
    const parts: string[] = []
    if (filters.categories.length > 0) {
      parts.push(filters.categories.join(", "))
    }
    if (parts.length === 0) return `alle Events in ${filters.city}`
    return `${parts.join(" ")} in ${filters.city}`
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border rounded-2xl p-4 mb-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          {/* Column 1: Title & Subtitle */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-1">Verpasse keine Events</h2>
            <p className="text-sm text-muted-foreground">
              Updates für <span className="font-semibold text-foreground">{getFilterDescription()}</span>
            </p>
          </div>

          {/* Column 2: Email Newsletter */}
          <div className="flex flex-col p-3 rounded-xl bg-background/50 border">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-sm">E-Mail Newsletter</h3>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Deine E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribed || isLoading}
                className="h-9 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!email || isSubscribed || isLoading}
                className="w-full h-9 text-sm"
              >
                {isSubscribed ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Abonniert!
                  </>
                ) : (
                  "Abonnieren"
                )}
              </Button>
            </form>
          </div>

          {/* Column 3: Calendar Feed */}
          <div className="flex flex-col p-3 rounded-xl bg-background/50 border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <h3 className="font-semibold text-sm">Kalender-Feed</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Events automatisch in deinem Kalender</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCalendarFeed}
              className="w-full h-9 text-sm gap-2 bg-transparent"
            >
              <Calendar className="h-4 w-4" />
              Feed-URL generieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
