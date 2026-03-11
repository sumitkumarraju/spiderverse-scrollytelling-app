# Spider-Verse Multiverse Tracker (Next.js 14 Scrollytelling)

An immersive, highly performant scrollytelling web application built to simulate an Alchemax / Spider-Society dimensional tracking database. Featuring smooth canvas-based image sequence animations, dynamic Framer Motion transitions, and deeply interactive superhero lore.

## 🚀 Features

- **Interactive Scrollytelling:** Scroll-bound 3D canvas image sequence (`HeroSequenceScroll`) mapping 240+ frames to user scroll position.
- **Dynamic Character Switching:** Smooth tracking between Miles Morales, Gwen Stacy, and Miguel O'Hara dimensions via `AnimatePresence`.
- **Fictional Superhero Lore:** 
  - Bespoke temporal anomaly timelines.
  - Alchemax Database / HQ integration.
  - "Access HQ" hacking terminal overlay.
- **Cinematic UI/UX:** 
  - Glitch text effects (`glitch-text`).
  - Seamless "Multiverse Portal" dimensional transition effects.
  - Interactive SVG insignias and reactive hover states.
  - Comic-style halftone backgrounds and web-line dividers.
- **Performance Optimized:** Built with Next.js App Router, Tailwind CSS, and `next/font` for maximum rendering speed and PageSpeed Insights (Lighthouse) scoring.

## 🏗️ Project Structure

The project follows a standard Next.js App Router architecture:

```
spiderverse/
├── public/                 # Static assets (Not tracked in git due to size, place image sequences here)
│   └── frames/             # Extracted canvas sequence frames (e.g. ezgif-frame-001.jpg)
├── src/
│   ├── app/
│   │   ├── globals.css     # Global Tailwind styles, custom Spiderverse variables and CSS effects
│   │   ├── layout.tsx      # Root layout, Font definitions (Outfit, Teko), Meta tags
│   │   └── page.tsx        # Main orchestrator page holding state & sections (Timeline, Database, etc.)
│   ├── components/
│   │   ├── Footer.tsx             # Society-themed footer with DB links and anomaly forms
│   │   ├── HeroSequenceScroll.tsx # Core Canvas-based image sequence linked to scroll progress
│   │   ├── Navbar.tsx             # Fixed navigation with "Access HQ" terminal feature
│   │   └── TextOverlays.tsx       # Scroll-linked fading text sequences overlaid on the canvas
│   └── data/
│       └── characters.ts   # Core data structure containing Universe lore, SVGs, Powers, & Timelines
├── .gitignore
├── next.config.mjs         # Strict static export configuration (`output: "export"`)
├── tailwind.config.ts      # Tailwind design system mappings for Spider-Verse themes
├── tsconfig.json
└── package.json
```

## 💻 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Custom utilities for Comic patterns & Glitches)
- **Animation:** Framer Motion (useScroll, useTransform, AnimatePresence)
- **Fonts:** Google Fonts (`Outfit` for UI, `Teko` for display headers)
- **Language:** TypeScript

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd spiderverse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Asset Pipeline:**
   *(Ensure your extracted image sequence frames are placed in `public/frames/` for the Canvas to render).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚡ Performance (Lighthouse)
- Engineered for 90+ Lighthouse scores.
- Disables Next.js default Image optimization in favor of highly-responsive strict Canvas rendering for scroll sequences.
- Prevents layout thrashing via strict dimensions and CSS `scroll-smooth`.
- `prefers-reduced-motion` enabled across all heavy transitions.

---
*Created as a fictional design spec. Not affiliated with Marvel or Sony Pictures.*
