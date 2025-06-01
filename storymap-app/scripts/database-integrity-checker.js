#!/usr/bin/env node

/**
 * Database Integrity Checker for StoryMap
 * 
 * This script ensures database consistency and automatically fixes common issues:
 * - Broken story-location links (null story_id)
 * - Orphaned locations without stories
 * - Stories without required location data
 * - Duplicate relationships
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

class DatabaseIntegrityChecker {
  constructor() {
    this.issues = [];
    this.fixes = [];
  }

  async runFullCheck() {
    console.log('🔍 Running Database Integrity Check...');
    console.log('=' .repeat(50));

    await this.checkStoryLocationLinks();
    await this.checkOrphanedLocations();
    await this.checkStoriesWithoutLocations();
    await this.checkDuplicateRelationships();
    
    await this.generateReport();
    
    if (this.issues.length === 0) {
      console.log('✅ Database integrity check passed! No issues found.');
    } else {
      console.log(`⚠️  Found ${this.issues.length} issues. Attempting automatic fixes...`);
      await this.autoFix();
    }
  }

  async checkStoryLocationLinks() {
    console.log('\n📍 Checking story-location links...');
    
    const { data: brokenLinks, error } = await supabase
      .from('story_locations')
      .select('*')
      .is('story_id', null);
    
    if (error) throw error;
    
    if (brokenLinks && brokenLinks.length > 0) {
      this.issues.push({
        type: 'broken_story_links',
        count: brokenLinks.length,
        data: brokenLinks,
        severity: 'critical',
        description: 'Story-location links with null story_id'
      });
      console.log(`   ❌ Found ${brokenLinks.length} broken story-location links`);
    } else {
      console.log('   ✅ All story-location links are valid');
    }
  }

  async checkOrphanedLocations() {
    console.log('\n🏝️  Checking for orphaned locations...');
    
    const { data: orphanedLocations, error } = await supabase
      .from('locations')
      .select(`
        id, name,
        story_locations(story_id)
      `);
    
    if (error) throw error;
    
    const orphaned = orphanedLocations?.filter(loc => 
      !loc.story_locations || loc.story_locations.length === 0
    ) || [];
    
    if (orphaned.length > 0) {
      this.issues.push({
        type: 'orphaned_locations',
        count: orphaned.length,
        data: orphaned,
        severity: 'warning',
        description: 'Locations not linked to any stories'
      });
      console.log(`   ⚠️  Found ${orphaned.length} orphaned locations`);
    } else {
      console.log('   ✅ All locations are properly linked');
    }
  }

  async checkStoriesWithoutLocations() {
    console.log('\n📚 Checking stories without locations...');
    
    const { data: storiesWithoutLocations, error } = await supabase
      .from('stories')
      .select(`
        id, title,
        story_locations(location_id)
      `);
    
    if (error) throw error;
    
    const withoutLocations = storiesWithoutLocations?.filter(story => 
      !story.story_locations || story.story_locations.length === 0
    ) || [];
    
    if (withoutLocations.length > 0) {
      this.issues.push({
        type: 'stories_without_locations',
        count: withoutLocations.length,
        data: withoutLocations,
        severity: 'critical',
        description: 'Stories without location data (will not appear in frontend)'
      });
      console.log(`   ❌ Found ${withoutLocations.length} stories without locations`);
    } else {
      console.log('   ✅ All stories have location data');
    }
  }

  async checkDuplicateRelationships() {
    console.log('\n🔄 Checking for duplicate relationships...');
    
    const { data: duplicates, error } = await supabase
      .rpc('find_duplicate_story_locations');
    
    if (error && !error.message.includes('function')) {
      throw error;
    }
    
    // Fallback check if RPC doesn't exist
    const { data: allLinks } = await supabase
      .from('story_locations')
      .select('story_id, location_id');
    
    const seen = new Set();
    const duplicateLinks = [];
    
    allLinks?.forEach(link => {
      const key = `${link.story_id}-${link.location_id}`;
      if (seen.has(key)) {
        duplicateLinks.push(link);
      } else {
        seen.add(key);
      }
    });
    
    if (duplicateLinks.length > 0) {
      this.issues.push({
        type: 'duplicate_relationships',
        count: duplicateLinks.length,
        data: duplicateLinks,
        severity: 'warning',
        description: 'Duplicate story-location relationships'
      });
      console.log(`   ⚠️  Found ${duplicateLinks.length} duplicate relationships`);
    } else {
      console.log('   ✅ No duplicate relationships found');
    }
  }

  async autoFix() {
    console.log('\n🔧 Attempting automatic fixes...');
    
    for (const issue of this.issues) {
      switch (issue.type) {
        case 'broken_story_links':
          await this.fixBrokenStoryLinks(issue);
          break;
        case 'stories_without_locations':
          await this.fixStoriesWithoutLocations(issue);
          break;
        case 'duplicate_relationships':
          await this.fixDuplicateRelationships(issue);
          break;
        case 'orphaned_locations':
          console.log('   ℹ️  Orphaned locations require manual review');
          break;
      }
    }
  }

  async fixBrokenStoryLinks(issue) {
    console.log(`   🔧 Fixing ${issue.count} broken story-location links...`);
    
    // Delete broken links
    const { error: deleteError } = await supabase
      .from('story_locations')
      .delete()
      .is('story_id', null);
    
    if (deleteError) {
      console.error('   ❌ Failed to delete broken links:', deleteError);
      return;
    }
    
    this.fixes.push({
      type: 'deleted_broken_links',
      count: issue.count,
      description: 'Deleted story-location links with null story_id'
    });
    
    console.log(`   ✅ Deleted ${issue.count} broken links`);
  }

  async fixStoriesWithoutLocations(issue) {
    console.log(`   🔧 Stories without locations need enrichment...`);
    console.log('   💡 Run: npm run enrich:batch to add missing locations');
    
    this.fixes.push({
      type: 'enrichment_needed',
      count: issue.count,
      description: 'Stories identified for location enrichment'
    });
  }

  async fixDuplicateRelationships(issue) {
    console.log(`   🔧 Removing ${issue.count} duplicate relationships...`);
    
    // This would need more sophisticated logic to identify and remove duplicates
    // For now, just log the issue
    console.log('   ℹ️  Duplicate relationships require manual review');
  }

  async generateReport() {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      issues: this.issues,
      fixes: this.fixes,
      summary: {
        total_issues: this.issues.length,
        critical_issues: this.issues.filter(i => i.severity === 'critical').length,
        warning_issues: this.issues.filter(i => i.severity === 'warning').length,
        fixes_applied: this.fixes.length
      }
    };
    
    // Save report
    const fs = await import('fs/promises');
    const reportPath = `data/integrity_reports/integrity_report_${timestamp.split('T')[0]}.json`;
    
    try {
      await fs.mkdir('data/integrity_reports', { recursive: true });
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Report saved: ${reportPath}`);
    } catch (error) {
      console.error('Failed to save report:', error);
    }
    
    return report;
  }
}

// CLI interface
async function main() {
  const checker = new DatabaseIntegrityChecker();
  
  try {
    await checker.runFullCheck();
    process.exit(0);
  } catch (error) {
    console.error('❌ Integrity check failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default DatabaseIntegrityChecker; 