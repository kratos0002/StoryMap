# StoryMap - Wireframes for Key Screens

## Mobile Wireframes

### Home/Map View
```
┌─────────────────────────┐
│ StoryMap    [≡ Menu]    │
├─────────────────────────┤
│                         │
│                         │
│      [Interactive       │
│         World           │
│         Map]            │
│                         │
│       •  •              │
│     •    •  •           │
│      •  •    •          │
│                         │
├─────────────────────────┤
│ [🗺️] [📚] [🔍] [⚙️]      │
└─────────────────────────┘
```

### Story Preview Card
```
┌─────────────────────────┐
│ ← Back to Map           │
├─────────────────────────┤
│ ┌───────────────────┐   │
│ │                   │   │
│ │  [Story Image]    │   │
│ │                   │   │
│ └───────────────────┘   │
│                         │
│ The Mountain's Secret   │
│ ✨ Mythical • 🇳🇵 Nepal  │
│ ⏱️ 5 min read           │
│                         │
│ A brief preview of the  │
│ story that gives a      │
│ taste of what to expect │
│                         │
│ [Read Full Story]       │
└─────────────────────────┘
```

### Reader Mode
```
┌─────────────────────────┐
│ ← Back    [☀️/🌙] [Aa+] │
├─────────────────────────┤
│ The Mountain's Secret   │
│                         │
│ Long ago, in the        │
│ shadow of the great     │
│ Himalayas, there lived  │
│ a young shepherd who    │
│ discovered a hidden     │
│ cave behind a waterfall │
│ ...                     │
│                         │
│ [Continue reading]      │
│                         │
│ ─────────────────────── │
│                         │
│ About this story:       │
│ This tale originates    │
│ from the Sherpa people  │
│ of Nepal...             │
└─────────────────────────┘
```

### Explore & Filter Panel
```
┌─────────────────────────┐
│ Explore Stories    [×]  │
├─────────────────────────┤
│ Region:                 │
│ [All▼]                  │
│                         │
│ Themes:                 │
│ [✓] Mythical           │
│ [ ] Historical          │
│ [ ] Love                │
│ [ ] Adventure           │
│                         │
│ Reading Time:           │
│ [──●───────] < 10 min   │
│                         │
│ Language:               │
│ [All▼]                  │
│                         │
│ [Apply Filters] [Reset] │
└─────────────────────────┘
```

### List View
```
┌─────────────────────────┐
│ StoryMap    [≡ Menu]    │
├─────────────────────────┤
│ [🔍 Search stories...]  │
│                         │
│ ┌───────────────────┐   │
│ │ The Mountain's... │   │
│ │ 🇳🇵 Nepal • ⏱️ 5 min  │   │
│ └───────────────────┘   │
│                         │
│ ┌───────────────────┐   │
│ │ River Spirits     │   │
│ │ 🇧🇷 Brazil • ⏱️ 7 min │   │
│ └───────────────────┘   │
│                         │
│ ┌───────────────────┐   │
│ │ City of Dreams    │   │
│ │ 🇯🇵 Japan • ⏱️ 4 min  │   │
│ └───────────────────┘   │
│                         │
├─────────────────────────┤
│ [🗺️] [📚] [🔍] [⚙️]      │
└─────────────────────────┘
```

## Desktop Wireframes

### Home/Map View (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│ StoryMap                         [Search] [≡ Menu]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                                                         │
│                   [Interactive                          │
│                      World                              │
│                      Map]                               │
│                                                         │
│                    •  •                                 │
│                  •    •  •                              │
│                   •  •    •                             │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Story Reader (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│ StoryMap                         [Search] [≡ Menu]      │
├─────────────────────────────────────────────────────────┤
│ ← Back to Map                           [☀️/🌙] [Aa+]   │
│                                                         │
│               The Mountain's Secret                     │
│               ✨ Mythical • 🇳🇵 Nepal • ⏱️ 5 min read    │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                                                     │ │
│ │ Long ago, in the shadow of the great Himalayas,     │ │
│ │ there lived a young shepherd who discovered a       │ │
│ │ hidden cave behind a waterfall...                   │ │
│ │                                                     │ │
│ │ [Content continues...]                              │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ About this story:                                       │
│ This tale originates from the Sherpa people of Nepal... │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Responsive Behavior Notes

1. **Map View**
   - Mobile: Full-screen map with bottom navigation
   - Tablet: Same as mobile but with larger touch targets
   - Desktop: Full-screen map with top navigation bar

2. **Story Cards**
   - Mobile: Full-width cards in a vertical stack
   - Tablet: Grid of 2 cards per row
   - Desktop: Grid of 3-4 cards per row or sidebar preview

3. **Reader Mode**
   - Mobile: Full-screen immersive reading
   - Tablet: Same as mobile with adjusted typography
   - Desktop: Centered content with comfortable max-width (650-800px)

4. **Navigation**
   - Mobile: Bottom tab bar for primary navigation
   - Tablet: Bottom tab bar or side navigation
   - Desktop: Top navigation bar with expanded options
