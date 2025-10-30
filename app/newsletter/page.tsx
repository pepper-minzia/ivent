"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Check } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", { email })
    setIsSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
        </Link>

        {!isSubscribed ? (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Newsletter abonnieren</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Erhalte deine aktuelle Auswahl als Newsletter direkt in dein Postfach
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Newsletter abonnieren
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Du kannst dich jederzeit wieder abmelden. Wir respektieren deine Privatsphäre.
                </p>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Check className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3">Erfolgreich abonniert!</h2>
              <p className="text-muted-foreground mb-6 text-pretty">
                Vielen Dank für dein Interesse! Du erhältst ab sofort deine personalisierten Event-Empfehlungen per
                E-Mail.
              </p>
              <Link href="/">
                <Button>Zurück zur Startseite</Button>
              </Link>
            </CardContent>
          </Card>
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
