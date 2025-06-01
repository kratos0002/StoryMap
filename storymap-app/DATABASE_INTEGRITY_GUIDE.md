# Database Integrity Guide for StoryMap

## 🎯 **Problem Solved: Null Story-Location Links**

This guide documents the permanent solution to prevent stories from disappearing from the frontend due to broken database relationships.

## 🔍 **Root Cause Analysis**

**The Issue**: Stories were not appearing in the frontend because:
1. The enrichment pipeline created locations but failed to properly link them to stories
2. `story_locations` table had entries with `story_id: null`
3. Frontend filters out stories without valid location data (correct behavior for StoryMap)

**Why It Happened**: 
- The `story.id` was undefined when passed to `applyEnrichmentToStory()`
- No validation existed to catch null/undefined story IDs
- Database allowed null foreign keys without constraints

## ✅ **Permanent Solution Implemented**

### 1. **Enhanced Enrichment Pipeline Validation**

**File**: `scripts/story_enrichment_pipeline.js`

**Changes Made**:
```javascript
// Added validation in enrichStoryWithPerplexity()
if (!story.id) {
  throw new Error(`Story "${story.title}" has no ID - cannot proceed with enrichment`);
}

// Added validation in addLocationToStory()
if (!storyId) {
  throw new Error(`Cannot add location: story ID is null/undefined`);
}

// Final validation before database insert
if (!storyId || !locationId) {
  throw new Error(`Cannot create story-location link: storyId=${storyId}, locationId=${locationId}`);
}
```

### 2. **Database Integrity Checker**

**File**: `scripts/database-integrity-checker.js`

**Features**:
- ✅ Detects broken story-location links (null story_id)
- ✅ Identifies orphaned locations
- ✅ Finds stories without location data
- ✅ Checks for duplicate relationships
- ✅ Automatic fixing of common issues
- ✅ Detailed reporting with timestamps

### 3. **New NPM Scripts for Maintenance**

```bash
# Check database integrity
npm run db:check

# Check and auto-fix issues
npm run db:fix

# Complete health check
npm run db:health

# Full maintenance routine
npm run maintenance
```

## 🛠️ **How to Use the Solution**

### **Daily Maintenance** (Recommended)
```bash
npm run maintenance
```
This runs integrity checks and enrichment analysis to ensure everything is working.

### **After Adding New Stories**
```bash
npm run db:health
```
This verifies new stories have proper location data.

### **If Frontend Shows "No Stories Found"**
```bash
npm run db:check
npm run enrich:analyze
```
This will identify and help fix the issue.

### **Emergency Fix**
```bash
npm run db:fix
npm run enrich:single  # If stories need location data
```

## 📊 **Monitoring and Alerts**

### **Key Metrics to Watch**:
1. **Stories with locations**: Should be 100% for frontend visibility
2. **Broken links**: Should always be 0
3. **Orphaned locations**: Acceptable but should be reviewed periodically

### **Reports Location**:
- Integrity reports: `data/integrity_reports/`
- Enrichment reports: `data/enrichment_logs/`

## 🚨 **Prevention Checklist**

### **Before Running Enrichment**:
- [ ] Run `npm run db:check` to ensure clean state
- [ ] Verify all stories have valid IDs
- [ ] Check Perplexity API key is working

### **After Running Enrichment**:
- [ ] Run `npm run db:check` to verify no broken links
- [ ] Run `npm run enrich:analyze` to confirm all stories have locations
- [ ] Test frontend to ensure stories appear

### **Weekly Maintenance**:
- [ ] Review orphaned locations
- [ ] Check integrity reports for patterns
- [ ] Verify frontend is showing all expected stories

## 🔧 **Troubleshooting Common Issues**

### **Issue**: Stories still not appearing in frontend
**Solution**:
```bash
npm run db:check
# Look for "Stories without locations" 
npm run enrich:batch  # Add missing locations
```

### **Issue**: Broken story-location links detected
**Solution**:
```bash
npm run db:fix  # Automatically removes broken links
# Then re-run enrichment to recreate proper links
npm run enrich:batch
```

### **Issue**: Enrichment pipeline fails with "no ID" error
**Solution**:
- Check the story data source
- Ensure stories have valid UUIDs before enrichment
- Review the story collection process

## 📋 **Database Schema Recommendations**

### **Future Improvements**:
1. Add NOT NULL constraints to foreign keys
2. Add database triggers to prevent orphaned records
3. Implement cascade deletes for cleanup
4. Add indexes for performance

### **Monitoring Queries**:
```sql
-- Check for broken links
SELECT COUNT(*) FROM story_locations WHERE story_id IS NULL;

-- Check stories without locations
SELECT s.id, s.title 
FROM stories s 
LEFT JOIN story_locations sl ON s.id = sl.story_id 
WHERE sl.story_id IS NULL;

-- Check orphaned locations
SELECT l.id, l.name 
FROM locations l 
LEFT JOIN story_locations sl ON l.id = sl.location_id 
WHERE sl.location_id IS NULL;
```

## 🎉 **Success Metrics**

**The solution is working when**:
- ✅ `npm run db:check` shows no critical issues
- ✅ `npm run enrich:analyze` shows 100% location coverage
- ✅ Frontend displays all stories correctly
- ✅ No "No stories found" messages
- ✅ Map shows story markers properly

## 🔄 **Integration with MCP Server**

**Remember**: Always use the MCP server for database operations when possible:
- Start MCP server: `npm run mcp:start`
- Use MCP tools through Cursor for database queries
- MCP server provides the primary interface for Supabase operations

## 📞 **Support**

If issues persist:
1. Check the integrity reports in `data/integrity_reports/`
2. Review enrichment logs in `data/enrichment_logs/`
3. Run `npm run db:health` for comprehensive diagnostics
4. Use MCP server tools for advanced database operations

---

**Last Updated**: 2025-06-01  
**Version**: 1.0  
**Status**: ✅ Implemented and Tested 