"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Sparkles, CalendarDays, ChevronDown, X, MapPin } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { FilterState, EventCategory } from "@/lib/types"
import { format } from "date-fns"
import { de } from "date-fns/locale"

interface NavbarProps {
  filters?: FilterState
  onFiltersChange?: (filters: FilterState) => void
  availableCategories?: EventCategory[]
}

export function Navbar({ filters, onFiltersChange, availableCategories = [] }: NavbarProps) {
  const [wasOpen, setWasOpen] = useState(false)
  const [woOpen, setWoOpen] = useState(false)
  const [wannOpen, setWannOpen] = useState(false)

  const hasFilters = filters !== undefined && onFiltersChange !== undefined

  const handleCategoryToggle = (category: EventCategory) => {
    if (!hasFilters || !filters) return
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleResetFilters = () => {
    if (!hasFilters || !onFiltersChange) return
    onFiltersChange({
      categories: [],
      city: "Stuttgart",
      dateRange: { start: null, end: null },
    })
  }

  const getWasLabel = () => {
    if (!filters || filters.categories.length === 0) return "Alle Events"
    if (filters.categories.length === 1) return filters.categories[0]
    return `${filters.categories.length} Kategorien`
  }

  const getWannLabel = () => {
    if (!filters || !filters.dateRange.start) return "Jederzeit"
    if (!filters.dateRange.end) return format(filters.dateRange.start, "dd. MMM", { locale: de })
    return `${format(filters.dateRange.start, "dd. MMM", { locale: de })} - ${format(filters.dateRange.end, "dd. MMM", { locale: de })}`
  }

  const hasActiveFilters = filters && (filters.categories.length > 0 || filters.dateRange.start !== null)

  return (
    <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8 mb-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              iVent
            </h1>
          </Link>
        </div>

        {hasFilters && filters && (
          <>
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-0 bg-background border rounded-full shadow-lg p-2">
                {/* WO Filter */}
                <Popover open={woOpen} onOpenChange={setWoOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="gap-3 h-14 px-6 rounded-full hover:bg-muted/50 transition-all">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div className="flex flex-col items-start">
                        <span className="text-xs font-semibold text-muted-foreground">Wo</span>
                        <span className="text-sm font-medium text-foreground">{filters.city}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64" align="center">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Wo suchst du?</h4>
                      <p className="text-sm text-muted-foreground">Aktuell zeigen wir Events in Stuttgart</p>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="w-px h-8 bg-border" />

                {/* WAS Filter */}
                <Popover open={wasOpen} onOpenChange={setWasOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`gap-3 h-14 px-6 rounded-full hover:bg-muted/50 transition-all ${
                        filters.categories.length > 0 ? "bg-muted" : ""
                      }`}
                    >
                      <Sparkles className="h-5 w-5 text-secondary" />
                      <div className="flex flex-col items-start">
                        <span className="text-xs font-semibold text-muted-foreground">Was</span>
                        <span
                          className={`text-sm font-medium ${filters.categories.length === 0 ? "text-foreground" : ""}`}
                        >
                          {getWasLabel()}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96" align="center">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Was möchtest du erleben?</h4>
                      <div className="flex flex-wrap gap-2">
                        {availableCategories.map((category) => (
                          <Badge
                            key={category}
                            variant={filters.categories.includes(category) ? "default" : "outline"}
                            className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/90 transition-colors"
                            onClick={() => handleCategoryToggle(category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="w-px h-8 bg-border" />

                {/* WANN Filter */}
                <Popover open={wannOpen} onOpenChange={setWannOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`gap-3 h-14 px-6 rounded-full hover:bg-muted/50 transition-all ${
                        filters.dateRange.start ? "bg-muted" : ""
                      }`}
                    >
                      <CalendarDays className="h-5 w-5 text-accent" />
                      <div className="flex flex-col items-start">
                        <span className="text-xs font-semibold text-muted-foreground">Wann</span>
                        <span className={`text-sm font-medium ${!filters.dateRange.start ? "text-foreground" : ""}`}>
                          {getWannLabel()}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="range"
                      selected={{
                        from: filters.dateRange.start || undefined,
                        to: filters.dateRange.end || undefined,
                      }}
                      onSelect={(range) => {
                        if (!onFiltersChange) return
                        onFiltersChange({
                          ...filters,
                          dateRange: {
                            start: range?.from || null,
                            end: range?.to || null,
                          },
                        })
                      }}
                      numberOfMonths={2}
                      locale={de}
                    />
                  </PopoverContent>
                </Popover>

                {/* Reset Button */}
                {hasActiveFilters && (
                  <>
                    <div className="w-px h-8 bg-border" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResetFilters}
                      className="gap-2 h-14 px-4 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {filters.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1.5 pl-3 pr-2 py-1.5">
                    {category}
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      className="hover:bg-background/50 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {filters.dateRange.start && (
                  <Badge variant="secondary" className="gap-1.5 pl-3 pr-2 py-1.5">
                    {filters.dateRange.end
                      ? `${format(filters.dateRange.start, "dd. MMM", { locale: de })} - ${format(filters.dateRange.end, "dd. MMM", { locale: de })}`
                      : format(filters.dateRange.start, "dd. MMM", { locale: de })}
                    <button
                      onClick={() => {
                        if (!onFiltersChange) return
                        onFiltersChange({
                          ...filters,
                          dateRange: { start: null, end: null },
                        })
                      }}
                      className="hover:bg-background/50 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}
