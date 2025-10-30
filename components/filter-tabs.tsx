"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import type { City, EventCategory, FilterState } from "@/lib/types"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FilterTabsProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClose?: () => void
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

export function FilterTabs({ filters, onFiltersChange, onClose }: FilterTabsProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  const handleCityToggle = (city: City) => {
    const newCities = localFilters.cities.includes(city)
      ? localFilters.cities.filter((c) => c !== city)
      : [...localFilters.cities, city]
    setLocalFilters({ ...localFilters, cities: newCities })
  }

  const handleCategoryToggle = (category: EventCategory) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category]
    setLocalFilters({ ...localFilters, categories: newCategories })
  }

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose?.()
  }

  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      cities: [],
      categories: [],
      dateRange: { start: null, end: null },
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const activeFilterCount =
    localFilters.cities.length + localFilters.categories.length + (localFilters.dateRange.start ? 1 : 0)

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <Tabs defaultValue="wo" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="wo">WO</TabsTrigger>
            <TabsTrigger value="was">WAS</TabsTrigger>
            <TabsTrigger value="wann">WANN</TabsTrigger>
          </TabsList>

          <TabsContent value="wo" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">Städte auswählen</h3>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <Badge
                    key={city}
                    variant={localFilters.cities.includes(city) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/90 transition-colors"
                    onClick={() => handleCityToggle(city)}
                  >
                    {city}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="was" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">Veranstaltung auswählen</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={localFilters.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/90 transition-colors"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wann" className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">Datum auswählen</h3>
              <Calendar
                mode="range"
                selected={{
                  from: localFilters.dateRange.start || undefined,
                  to: localFilters.dateRange.end || undefined,
                }}
                onSelect={(range) => {
                  setLocalFilters({
                    ...localFilters,
                    dateRange: {
                      start: range?.from || null,
                      end: range?.to || null,
                    },
                  })
                }}
                className="rounded-md border"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={handleResetFilters} className="flex-1 bg-transparent">
            Zurücksetzen
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1">
            Anwenden {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
