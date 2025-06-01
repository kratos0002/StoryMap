# Story Enrichment System for StoryMap

## Overview

The Story Enrichment System is a comprehensive pipeline that ensures all stories in StoryMap have complete metadata, with a critical focus on **location data** (StoryMap's core proposition). The system uses Perplexity's Sonar model to intelligently fill missing information and leverages the Supabase MCP Server for database operations.

## Architecture

```
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│   Story Analysis    │───▶│  Perplexity Sonar    │───▶│  Database Storage   │
│   & Gap Detection   │    │  AI Enrichment       │    │  via MCP Server     │
└─────────────────────┘    └──────────────────────┘    └─────────────────────┘
           │                          │                           │
           ▼                          ▼                           ▼
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│ Missing Locations   │    │ Location Extraction  │    │ Real-time Updates   │
│ Missing Themes      │    │ Theme Classification │    │ Live Monitoring     │
│ Incomplete Authors  │    │ Author Details       │    │ Error Recovery      │
└─────────────────────┘    └──────────────────────┘    └─────────────────────┘
```

## Core Components

### 1. Story Enrichment Pipeline (`scripts/story_enrichment_pipeline.js`)

The main orchestrator that:
- Analyzes stories for missing metadata
- Uses Perplexity Sonar API for intelligent enrichment
- Implements batch processing with rate limiting
- Ensures every story has at least one location (critical requirement)
- Provides comprehensive error handling and recovery

### 2. Enhanced Supabase MCP Server (`mcp-server/enhanced-supabase-server.js`)

Advanced MCP server that provides:
- 12 specialized tools for story enrichment
- Real-time subscriptions for live updates
- Analytics and monitoring capabilities
- Automated enrichment triggers for new stories

### 3. Global Location Database

Built-in comprehensive location mapping with:
- 50+ major cities with precise coordinates
- Country-level fallbacks
- Regional defaults for edge cases
- Intelligent partial matching

## Critical Features

### 🚨 Location Guarantee
Every story **MUST** have at least one location. The system:
- Prioritizes location extraction above all other metadata
- Uses multiple fallback strategies (author nationality, regional defaults)
- Never allows a story to exist without location data
- Provides "Europe" as absolute last resort

### 🤖 AI-Powered Enrichment
Uses Perplexity's `llama-3.1-sonar-large-128k-online` model for:
- Intelligent location extraction from story content
- Theme classification based on plot and content
- Author biographical information completion
- Publication year estimation

### ⚡ Scalable Processing
- Configurable batch sizes (default: 10 stories)
- Rate limiting (2 seconds between API calls)
- Error recovery with retry logic
- Progress tracking and detailed reporting

## Quick Start

### 1. Environment Setup

Add to your `.env` file:
```bash
# Required for enrichment
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Existing Supabase config
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Analyze Current Stories

```bash
# Check what needs enrichment
npm run enrich:analyze
```

### 3. Enrich Stories

```bash
# Single story (testing)
npm run enrich:single

# Small batch (5 stories)
npm run enrich:batch

# Large batch (10 stories)
npm run enrich:batch:large

# All stories needing enrichment
npm run enrich:all
```

### 4. Start Enhanced MCP Server

```bash
# Start enhanced server with enrichment capabilities
npm run mcp:enhanced
```

## Available Scripts

| Script | Description | Use Case |
|--------|-------------|----------|
| `enrich:analyze` | Analyze stories without making changes | Assessment and planning |
| `enrich:single` | Process 1 story at a time | Testing and debugging |
| `enrich:batch` | Process 5 stories per batch | Regular maintenance |
| `enrich:batch:large` | Process 10 stories per batch | Bulk processing |
| `enrich:all` | Process all incomplete stories | Full system enrichment |
| `mcp:enhanced` | Start enhanced MCP server | Production operations |

## MCP Server Tools

The enhanced MCP server provides 12 specialized tools:

### Core Enrichment Tools
- `analyze_stories_for_enrichment` - Identify missing metadata
- `enrich_story_with_ai` - AI-powered single story enrichment
- `batch_enrich_stories` - Bulk enrichment processing
- `validate_story_completeness` - Ensure all stories meet requirements

### Location Management
- `add_location_to_story` - Manual location assignment
- `search_stories_by_location` - Geographic story search
- `get_location_coverage` - Analyze geographic distribution

### Analytics & Monitoring
- `get_enrichment_statistics` - System health metrics
- `cleanup_incomplete_stories` - Maintenance operations
- `sync_story_metadata` - Data consistency checks

### Utility Tools
- `get_story_with_metadata` - Complete story information
- `add_theme_to_story` - Manual theme assignment

## Real-time Features

### Automatic Enrichment
- New stories trigger automatic enrichment checks
- Real-time monitoring of story completeness
- Live updates via Supabase subscriptions

### Live Analytics
- Real-time enrichment status dashboard
- Geographic coverage analytics
- Theme distribution monitoring

## Configuration

### Rate Limiting
```javascript
const CONFIG = {
  PERPLEXITY_RATE_LIMIT_MS: 2000, // 2 seconds between calls
  BATCH_SIZE: 10,                 // Stories per batch
  MAX_RETRIES: 3                  // Retry attempts
};
```

### Location Database
The system includes 50+ pre-mapped locations:
- Major world cities with precise coordinates
- Country-level fallbacks
- Regional defaults (Europe, Asia, North America)

### AI Model Configuration
```javascript
const PERPLEXITY_CONFIG = {
  model: 'llama-3.1-sonar-large-128k-online',
  max_tokens: 1000,
  temperature: 0.1  // Low temperature for consistent results
};
```

## Error Handling

### Robust Recovery
- API failures trigger automatic retries
- Fallback location assignment for failed extractions
- Comprehensive error logging and reporting
- Graceful degradation for partial failures

### Monitoring
- Real-time error tracking
- Detailed enrichment reports
- Performance metrics and statistics
- Health checks and validation

## Best Practices

### 1. Start Small
```bash
# Always test with small batches first
npm run enrich:analyze
npm run enrich:single
```

### 2. Monitor Progress
```bash
# Check enrichment statistics regularly
npm run enrich:test
```

### 3. Validate Results
```bash
# Ensure all stories have locations
npm run mcp:enhanced
# Then use validate_story_completeness tool
```

### 4. Handle Rate Limits
- Use appropriate batch sizes for your API limits
- Monitor Perplexity API usage
- Adjust rate limiting as needed

## Troubleshooting

### Common Issues

#### 1. Missing Perplexity API Key
```bash
Error: PERPLEXITY_API_KEY is required in .env file
```
**Solution**: Add your Perplexity API key to `.env`

#### 2. Stories Without Locations
```bash
Warning: Story has no location data
```
**Solution**: Run enrichment pipeline to add locations

#### 3. Rate Limit Exceeded
```bash
Error: Rate limit exceeded
```
**Solution**: Increase `PERPLEXITY_RATE_LIMIT_MS` in config

#### 4. MCP Server Connection Issues
```bash
Error: Cannot read properties of undefined (reading 'method')
```
**Solution**: Use `npm run mcp:enhanced` instead of old server

### Debug Mode

Enable detailed logging:
```bash
DEBUG=true npm run enrich:batch
```

## Performance Optimization

### Batch Size Tuning
- Small batches (1-5): Better for testing and debugging
- Medium batches (5-10): Optimal for regular processing
- Large batches (10+): Use only with high API limits

### Memory Management
- Pipeline processes stories in chunks
- Automatic cleanup of processed data
- Efficient database connection pooling

### API Optimization
- Intelligent prompt engineering for better results
- Minimal token usage while maintaining quality
- Caching of location mappings

## Integration Examples

### Manual Story Enrichment
```javascript
import StoryEnrichmentPipeline from './scripts/story_enrichment_pipeline.js';

const pipeline = new StoryEnrichmentPipeline();
await pipeline.init();

// Enrich specific story
await pipeline.enrichStoryWithPerplexity(
  { id: 'story-id', title: 'Story Title', summary: 'Story summary...' },
  ['location', 'themes']
);
```

### MCP Server Usage
```javascript
// Use MCP tools programmatically
const result = await mcpServer.enrichStoryWithAI({
  story_id: 'story-id',
  force_refresh: false
});
```

## Monitoring Dashboard

The system provides real-time monitoring through:

### Enrichment Status
- Total stories vs. enriched stories
- Completion percentage
- Critical missing locations count

### Geographic Coverage
- Stories by country/region
- Location distribution analytics
- Coverage gaps identification

### Theme Analysis
- Theme distribution across stories
- Popular themes identification
- Theme coverage statistics

## Future Enhancements

### Planned Features
- Advanced geographic search with radius queries
- Automated theme suggestion based on content analysis
- Integration with additional AI models for cross-validation
- Enhanced location extraction using NLP libraries
- Automated quality scoring for enriched metadata

### Scalability Improvements
- Distributed processing for large datasets
- Advanced caching strategies
- Parallel API calls with intelligent queuing
- Database optimization for large-scale operations

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error logs in `data/enrichment_logs/`
3. Use debug mode for detailed information
4. Validate your environment configuration

## License

This enrichment system is part of the StoryMap project and follows the same licensing terms. 