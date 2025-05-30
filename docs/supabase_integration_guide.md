# StoryMap Supabase Integration Guide

This document provides a comprehensive guide for developers working with the StoryMap application's Supabase integration. It covers the data model, fetching patterns, component architecture, and best practices for maintaining and extending the application.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Supabase Integration Layer](#supabase-integration-layer)
3. [Data Fetching Patterns](#data-fetching-patterns)
4. [Component Data Flow](#component-data-flow)
5. [Error Handling](#error-handling)
6. [Adding New Features](#adding-new-features)
7. [Performance Considerations](#performance-considerations)

## Architecture Overview

The StoryMap application uses a layered architecture to interact with Supabase:

```
UI Components → Supabase Integration Layer → Supabase Database
```

- **UI Components**: React components that display story data and handle user interactions
- **Supabase Integration Layer**: A set of helper functions and types that abstract database operations
- **Supabase Database**: The backend database containing all story data and relationships

## Supabase Integration Layer

The integration layer is defined in `src/lib/supabase.ts` and provides:

1. **Supabase Client**: A configured instance of the Supabase client
2. **TypeScript Types**: Type definitions for all database tables
3. **Helper Functions**: Reusable functions for common data operations

### Key Helper Functions

- `fetchStories()`: Retrieves all stories
- `fetchStoryBySlug(slug)`: Retrieves a single story by its slug
- `fetchStoryWithDetails(storyId)`: Retrieves a story with all related data (authors, locations, themes)
- `fetchStoriesByTheme(themeName)`: Retrieves stories filtered by theme
- `fetchStoriesByLocation(lat, lng, radiusKm)`: Retrieves stories near a geographic location

## Data Fetching Patterns

The application uses React's `useEffect` hook to fetch data when components mount or when dependencies change. Here's the recommended pattern:

```typescript
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchSomeData();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, [dependencies]);
```

### Best Practices

1. **Always handle loading states**: Show loading indicators while data is being fetched
2. **Always handle error states**: Display user-friendly error messages when fetches fail
3. **Use try/catch/finally**: Ensure loading state is always updated, even when errors occur
4. **Minimize fetches**: Fetch only the data needed for the current view
5. **Use appropriate dependencies**: Only re-fetch when necessary

## Component Data Flow

The application follows a top-down data flow pattern:

1. **App.tsx**: Manages application state and view switching
2. **StoryMap.tsx**: Fetches stories and displays them on a map
3. **StoryList.tsx**: Fetches stories and displays them in a list with filtering
4. **StoryReader.tsx**: Fetches a single story with details for reading
5. **StoryCard.tsx**: Displays story preview with lazy-loaded details

### Component Responsibilities

- **App**: Manages global state (dark mode, selected story, active view)
- **StoryMap**: Fetches stories and location data for map display
- **StoryList**: Fetches stories and handles filtering and search
- **StoryReader**: Fetches full story content and related data
- **StoryCard**: Fetches additional story details on demand

## Error Handling

The application implements a consistent error handling strategy:

1. **Component-level error states**: Each component manages its own error state
2. **User-friendly error messages**: Clear messages that explain what went wrong
3. **Retry mechanisms**: Buttons to retry failed operations
4. **Fallback content**: Alternative content when data is unavailable

### Error Handling Example

```typescript
if (error) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">{error}</h2>
      <button 
        onClick={retryFunction}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  );
}
```

## Adding New Features

When adding new features to the application, follow these guidelines:

### Adding a New Data Type

1. Add the type definition to `src/lib/supabase.ts`
2. Create helper functions for fetching the new data type
3. Update components to use the new data

### Adding a New Component

1. Create the component with proper loading and error states
2. Use the Supabase integration layer for data fetching
3. Implement consistent styling (respecting dark mode)
4. Add the component to the appropriate parent component

### Extending Existing Components

1. Identify the component to extend
2. Add new state variables and data fetching logic as needed
3. Update the UI to display the new data
4. Ensure loading and error states handle the new data

## Performance Considerations

To maintain good performance when working with Supabase:

1. **Use appropriate indexes**: Ensure the database has indexes for frequently queried fields
2. **Limit result sets**: Only fetch the data needed for the current view
3. **Use pagination**: For large data sets, implement pagination
4. **Cache results**: Consider caching results for frequently accessed data
5. **Optimize queries**: Use Supabase's query capabilities to filter data on the server
6. **Debounce search inputs**: Prevent excessive queries when users type in search fields
7. **Lazy load details**: Fetch additional details only when needed (as implemented in StoryCard)

By following these guidelines, you can maintain and extend the StoryMap application while ensuring good performance and user experience.
