import type { Event } from "./types"
import { parseStuttgartEvents, rawStuttgartEvents } from "./stuttgart-events"

export const mockEvents: Event[] = parseStuttgartEvents(rawStuttgartEvents)
