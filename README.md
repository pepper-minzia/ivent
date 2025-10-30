# iVent - Event Recommendation Platform

A modern event discovery platform built with Next.js 16, featuring personalized recommendations and advanced filtering.

## Features

### ✅ Completed Features

1. **Event Data Structure & Mock Events**
   - Comprehensive event model with categories, locations, dates, and pricing
   - 13 diverse mock events across 6 categories
   - Support for "near you" personalization

2. **Advanced Filter System (WO/WAS/WANN)**
   - **WO (Where)**: Filter by 10 German cities
   - **WAS (What)**: Filter by 6 event categories (Konzert, Museum, Kino, Party, Festival, Kindernachmittag)
   - **WANN (When)**: Date range picker for flexible scheduling
   - Real-time filter application with active filter count display
   - Sort by date, title, or price

3. **Main Page with Categorized Events**
   - Personalized "In deiner Nähe" section
   - Events grouped by category
   - Responsive grid layout (1/2/3 columns)
   - Sticky header and filter bar for easy navigation
   - Beautiful gradient branding

4. **Event Detail Page with Calendar Integration**
   - Full event information display
   - ICS file generation for calendar integration
   - Similar events recommendations
   - Responsive image display with "near you" badges
   - One-click calendar download

5. **Newsletter Subscription Feature**
   - Email subscription form
   - Category preference selection
   - Success confirmation screen
   - Privacy-focused messaging

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Date Handling**: date-fns, react-day-picker
- **TypeScript**: Full type safety

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Main event listing page
│   ├── event/[id]/page.tsx      # Event detail page
│   ├── newsletter/page.tsx      # Newsletter subscription
│   └── layout.tsx               # Root layout
├── components/
│   ├── event-card.tsx           # Event card component
│   ├── category-section.tsx     # Category section wrapper
│   ├── filter-tabs.tsx          # Filter UI (WO/WAS/WANN)
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── types.ts                 # TypeScript definitions
│   ├── mock-events.ts           # Mock event data
│   ├── filter-utils.ts          # Filter and sort logic
│   └── utils.ts                 # Utility functions
\`\`\`

## Color System

The platform uses a vibrant, modern color palette:
- **Primary**: Purple (oklch(0.55 0.22 264))
- **Secondary**: Teal (oklch(0.65 0.18 180))
- **Accent**: Pink (oklch(0.7 0.15 330))
- **Neutrals**: Grays and off-whites for backgrounds

## Key Features Explained

### Filter System
The three-tab filter system (WO/WAS/WANN) provides intuitive event discovery:
- Filters are applied in real-time
- Active filter count is displayed
- Reset functionality for quick clearing
- Mobile-friendly sheet overlay

### Calendar Integration
Events can be added to any calendar app:
- Generates standard ICS files
- Includes event title, description, location, and time
- One-click download functionality
- Compatible with Google Calendar, Apple Calendar, Outlook, etc.

### Responsive Design
- Mobile-first approach
- Sticky navigation for easy access
- Grid layouts adapt to screen size
- Touch-friendly filter interface

## Future Enhancements

Potential features for future development:
- User authentication and profiles
- Favorite events and personalized recommendations
- Real-time event updates
- Social sharing capabilities
- Map integration for event locations
- Ticket purchasing integration
- Event organizer dashboard

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## License

© 2025 iVent - Event Recommendation Platform
