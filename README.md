# StoryMap

StoryMap is a mobile-first, intuitive web application that hosts short stories from around the world, making global narratives accessible, shareable, and enjoyable for modern readers on the go.

## 🌍 Vision

To build a platform that connects readers with short stories drawn from oral traditions, folk tales, myths, and contemporary voices from across the globe, all geographically anchored to their places of origin.

## 📚 Core Features

- **Interactive Map Interface**: Explore stories by clicking on locations around the world
- **Curated Story Collection**: Famous public domain short stories from diverse cultures and traditions
- **Immersive Reading Experience**: Clean, distraction-free reading mode with adjustable settings
- **Cultural Context**: Background information about each story's origin and significance
- **Mobile-First Design**: Optimized for reading on the go across all devices
- **Enhanced Discovery**: Advanced filtering, search, and recommendation features
- **Full-Text Content**: Complete story content stored directly in the database

## 🔍 Enhanced Discovery Features

- **Multi-Select Filtering**: Filter stories by themes, tags, time periods, regions, and reading levels
- **Full-Text Search**: Search across all story content with relevance ranking
- **Timeline View**: Discover stories chronologically across historical periods
- **Recommendation Engine**: Find similar stories based on themes, tags, and locations
- **Curated Collections**: Thematically grouped stories for guided exploration

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Map**: Mapbox GL JS
- **Styling**: CSS with custom typography system
- **Build Tool**: Vite
- **Backend**: Supabase (PostgreSQL)
- **Database**: Rich metadata schema with full-text search capabilities

## 🗄️ Database Structure

The Supabase database includes:

- **Core Tables**: stories, authors, locations, themes
- **Relationship Tables**: story_themes, story_locations, story_authors
- **Enhanced Metadata**: reading_levels, time_periods, tags
- **Full-Text Search**: Optimized search vectors for content discovery
- **Spatial Data**: Geographic coordinates for map-based exploration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation
1. Clone the repository
   ```
   git clone https://github.com/kratos0002/StoryMap.git
   cd StoryMap/storymap-app
   ```
2. Install dependencies
   ```
   npm install
   # or
   pnpm install
   ```
3. Start the development server
   ```
   npm run dev
   # or
   pnpm dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## 📖 Story Collection

The application features a growing collection of public domain short stories including:

- "The Tell-Tale Heart" by Edgar Allan Poe
- "The Gift of the Magi" by O. Henry
- "The Legend of Sleepy Hollow" by Washington Irving
- "Rip Van Winkle" by Washington Irving
- "The Yellow Wallpaper" by Charlotte Perkins Gilman
- "The Most Dangerous Game" by Richard Connell
- "The Story of the Late Mr. Elvesham" by H.G. Wells
- "The Open Window" by Saki
- "The Signal-Man" by Charles Dickens
- "The Lady with the Dog" by Anton Chekhov
- "The Nose" by Nikolai Gogol
- "The Queen of Spades" by Alexander Pushkin
- "The Overcoat" by Nikolai Gogol
- "The Necklace" by Guy de Maupassant
- "Ball of Fat" by Guy de Maupassant
- "The Metamorphosis" by Franz Kafka
- "In a Grove" by Ryūnosuke Akutagawa
- "Rashomon" by Ryūnosuke Akutagawa
- "The True Story of Ah Q" by Lu Xun
- "The Arabian Nights" (Selected Tales)

## 🔧 Project Structure

- **/storymap-app**: Frontend React application
  - **/src/components**: React components including enhanced discovery features
  - **/src/lib**: Utility functions and Supabase client
  - **/src/data**: Sample story data

- **/docs**: Documentation and setup instructions
  - **/supabase_scripts**: SQL scripts for database setup and management
    - **01_tables.sql**: Core table definitions
    - **02_indexes.sql**: Database indexes for performance
    - **03_rls_policies.sql**: Row-level security policies
    - **04_functions_triggers.sql**: Database functions and triggers
    - **05_schema_validation.sql**: Validation queries
    - **06_data_migration.sql**: Data migration templates
    - **07_spatial_functions.sql**: Geographic query functions
    - **08_enhanced_discovery_schema.sql**: Enhanced discovery metadata schema
    - **09_fix_discovery_functions.sql - 11_final_fixes.sql**: Function fixes and optimizations
    - **/data_migration**: Python scripts for data transformation

## 🛣️ Development Roadmap

- ✅ **Phase 1**: Core application with map interface and basic story display
- ✅ **Phase 2**: Supabase integration for database storage
- ✅ **Phase 3**: Full story content migration to database
- ✅ **Phase 4**: Enhanced discovery features with advanced filtering and search
- 🔄 **Phase 5**: User authentication and personalized recommendations
- 🔄 **Phase 6**: Community features and user-generated content
- 🔄 **Phase 7**: Mobile app versions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Project Gutenberg for providing access to public domain literature
- Mapbox for their excellent mapping platform
- Supabase for the powerful backend platform
- All the authors whose timeless stories make this project possible
