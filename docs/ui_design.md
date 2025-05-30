# StoryMap - UI Design Documentation

## Mobile-First Design Philosophy

The StoryMap application follows a mobile-first design approach, ensuring that the primary experience is optimized for smartphones and tablets, while still providing a rich experience on desktop devices. This approach prioritizes:

- Fast loading times
- Touch-friendly interface elements
- Efficient use of limited screen space
- Progressive enhancement for larger screens
- Intuitive navigation patterns

## Key UI Components

### 1. Navigation Bar
- Minimal, fixed-position navigation
- Logo/brand on left
- Hamburger menu on right for additional options
- Transparent overlay on map view, solid in reading mode
- Quick access to search/filter functionality

### 2. Map Interface
- Full-screen interactive map as the primary exploration interface
- Pinch-to-zoom and drag navigation on touch devices
- Story pins with visual indicators (size/color based on theme or popularity)
- Clustering for areas with multiple stories
- Semi-transparent story preview cards on pin tap/click
- Geolocation button to find stories near user's location

### 3. Story Cards
- Compact, visually appealing preview cards
- Featured image or cultural icon representing the story
- Title, origin country with flag icon
- Reading time indicator
- Theme tags with visual indicators
- Tap/click to expand to full reading mode

### 4. Reader Mode
- Clean, distraction-free reading interface
- Comfortable typography optimized for mobile reading
- Adjustable text size and contrast
- Dark/light mode toggle
- Smooth transition from map or list view
- Easy return to previous view
- Cultural context section at end of story
- Share button for social media integration

### 5. Explore & Filter Panel
- Slide-up panel from bottom of screen on mobile
- Sidebar on desktop view
- Filter options:
  - Geographic region selector
  - Theme/category checkboxes
  - Reading time slider
  - Language selector (if multilingual)
- Visual feedback on filter application
- Quick reset button

## Color Scheme

- Primary: Deep blue (#1A365D) - Representing exploration and depth
- Secondary: Warm amber (#F59E0B) - Representing storytelling and warmth
- Accent: Coral red (#EF4444) - For highlights and important actions
- Background: Off-white (#F9FAFB) for light mode, Dark slate (#1F2937) for dark mode
- Text: Near-black (#111827) for light mode, Light gray (#F3F4F6) for dark mode

## Typography

- Headings: Serif font (e.g., Merriweather) for storytelling character
- Body: Sans-serif font (e.g., Inter) for readability on mobile screens
- Reading text: Slightly larger than standard body text with increased line height
- Hierarchical type scale with appropriate contrast between heading levels

## Responsive Breakpoints

- Mobile: 320px - 639px (primary design focus)
- Tablet: 640px - 1023px
- Desktop: 1024px and above

## UI Flow and Transitions

### Initial Load
1. Brief splash screen with logo animation
2. Transition to world map view with featured story pins
3. Subtle onboarding tooltip for first-time users

### Map to Story Transition
1. User taps/clicks on story pin
2. Pin expands to preview card with story details
3. User taps "Read" button
4. Smooth animation transitions to full reading mode

### Navigation Between Views
1. Bottom navigation bar for quick access to:
   - Map view (primary)
   - List view (alternative browsing)
   - Explore/Filter
   - User preferences (if applicable)

## Accessibility Considerations

- High contrast mode option
- Screen reader compatibility
- Touch targets minimum 44x44px
- Keyboard navigation support
- Alternative text for all images
- WCAG 2.1 AA compliance target

## UI Components Library

The application will utilize shadcn/ui components with Tailwind CSS for styling, providing:
- Consistent design language
- Accessible components out of the box
- Easy theming and customization
- Responsive behavior by default
