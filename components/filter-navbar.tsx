"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown } from "lucide-react"
import type { City, EventCategory, FilterState } from "@/lib/types"
import { format } from "date-fns"
import { de } from "date-fns/locale"

interface FilterNavbarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const cities: City[] = [
  "Berlin",
  "München",
  "Hamburg",
  "Köln",
  "Frankfurt",
  "Stuttgart",
  "Düsseldorf",
  "Leipzig",
  "Dortmund",
  "Essen",
]

const categories: EventCategory[] = ["Konzert", "Museum", "Kino", "Party", "Festival", "Kindernachmittag"]

export function FilterNavbar({ filters, onFiltersChange }: FilterNavbarProps) {
  const [woOpen, setWoOpen] = useState(false)
  const [wasOpen, setWasOpen] = useState(false)
  const [wannOpen, setWannOpen] = useState(false)

  const handleCityToggle = (city: City) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter((c) => c !== city)
      : [...filters.cities, city]
    onFiltersChange({ ...filters, cities: newCities })
  }

  const handleCategoryToggle = (category: EventCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleResetFilters = () => {
    onFiltersChange({
      cities: [],
      categories: [],
      dateRange: { start: null, end: null },
    })
  }

  const hasActiveFilters =
    filters.cities.length > 0 || filters.categories.length > 0 || filters.dateRange.start !== null

  const getWoLabel = () => {
    if (filters.cities.length === 0) return "Wo"
    if (filters.cities.length === 1) return filters.cities[0]
    return `${filters.cities.length} Städte`
  }

  const getWasLabel = () => {
    if (filters.categories.length === 0) return "Was"
    if (filters.categories.length === 1) return filters.categories[0]
    return `${filters.categories.length} Kategorien`
  }

  const getWannLabel = () => {
    if (!filters.dateRange.start) return "Wann"
    if (!filters.dateRange.end) return format(filters.dateRange.start, "dd. MMM", { locale: de })
    return `${format(filters.dateRange.start, "dd. MMM", { locale: de })} - ${format(filters.dateRange.end, "dd. MMM", { locale: de })}`
  }

  return (
    <div className="border-b bg-card sticky top-16 z-30 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* WO Filter */}
          <Popover open={woOpen} onOpenChange={setWoOpen}>
            <PopoverTrigger asChild>
              <Button variant={filters.cities.length > 0 ? "default" : "outline"} className="gap-2 h-11 px-4">
                {getWoLabel()}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Wo möchtest du hin?</h4>
                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <Badge
                        key={city}
                        variant={filters.cities.includes(city) ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5 text-sm hover:bg-primary/90 transition-colors"
                        onClick={() => handleCityToggle(city)}
                      >
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* WAS Filter */}
          <Popover open={wasOpen} onOpenChange={setWasOpen}>
            <PopoverTrigger asChild>
              <Button variant={filters.categories.length > 0 ? "default" : "outline"} className="gap-2 h-11 px-4">
                {getWasLabel()}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Was möchtest du erleben?</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={filters.categories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5 text-sm hover:bg-primary/90 transition-colors"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* WANN Filter */}
          <Popover open={wannOpen} onOpenChange={setWannOpen}>
            <PopoverTrigger asChild>
              <Button variant={filters.dateRange.start ? "default" : "outline"} className="gap-2 h-11 px-4">
                {getWannLabel()}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: filters.dateRange.start || undefined,
                  to: filters.dateRange.end || undefined,
                }}
                onSelect={(range) => {
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="gap-2 h-11 px-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Zurücksetzen
            </Button>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
            {filters.cities.map((city) => (
              <Badge key={city} variant="secondary" className="gap-1.5 pl-3 pr-2 py-1.5">
                {city}
                <button
                  onClick={() => handleCityToggle(city)}
                  className="hover:bg-background/50 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
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
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      dateRange: { start: null, end: null },
                    })
                  }
                  className="hover:bg-background/50 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
