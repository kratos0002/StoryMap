# StoryMap Scripts

This directory contains the essential scripts for managing the StoryMap database using our streamlined CSV-based approach.

## Core Scripts

### 📚 `populate-from-datastories.js`
**Purpose**: Populates the database with stories from the `datastories/` CSV files
- Reads from `datastories/db_books.csv` (metadata) and `datastories/stories.csv` (content)
- Processes stories in batches with configurable limits and offsets
- Automatically filters out overly long texts (likely full books)
- Creates authors and links them to stories

**Usage**:
```bash
node scripts/populate-from-datastories.js
```

### 🤖 `story_enrichment_pipeline.js`
**Purpose**: Enriches stories with locations, themes, and author details using Perplexity AI
- Analyzes stories for missing metadata
- Uses Perplexity API to generate location and theme data
- Processes stories in batches with rate limiting
- Saves enrichment reports for tracking

**Usage**:
```bash
node scripts/story_enrichment_pipeline.js
```

### 📊 `check-current-stories.js`
**Purpose**: Displays current database status and story details
- Shows total story count and metadata coverage
- Lists all stories with their locations, themes, and authors
- Useful for monitoring database state

**Usage**:
```bash
node scripts/check-current-stories.js
```

### 🔍 `database-integrity-checker.js`
**Purpose**: Validates database integrity and relationships
- Checks for orphaned records and missing relationships
- Validates data consistency across tables
- Reports any integrity issues

**Usage**:
```bash
node scripts/database-integrity-checker.js
```

## Workflow

1. **Populate**: Use `populate-from-datastories.js` to add stories from CSV files
2. **Enrich**: Run `story_enrichment_pipeline.js` to add locations and themes
3. **Verify**: Check results with `check-current-stories.js`
4. **Validate**: Ensure integrity with `database-integrity-checker.js`

## Data Source

All story data comes from the `datastories/` directory:
- `db_books.csv`: Book metadata (title, author, language)
- `stories.csv`: Full story content (227MB, 1000+ stories)

This approach is much more reliable and faster than web scraping APIs. 