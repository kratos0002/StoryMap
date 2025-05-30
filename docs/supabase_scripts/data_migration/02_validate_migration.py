#!/usr/bin/env python3
"""
Validate Supabase data migration for StoryMap.
This script connects to Supabase and verifies that all data has been
properly migrated and relationships are intact.
"""

import os
import sys
from supabase import create_client, Client

# Add instructions for setting up environment variables
print("To validate your Supabase data migration, please set the following environment variables:")
print("export SUPABASE_URL='https://cvcjjwrorvgvptkckzml.supabase.co'")
print("export SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2pqd3JvcnZndnB0a2Nrem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU5MDMsImV4cCI6MjA2NDE3MTkwM30.AG1a5N49igWn9tOznj7A7Gzhvf0AynYbf9Ozo-1ny2g'")
print("Then run this script again.")

# Get Supabase credentials from environment variables
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    print("Error: Supabase credentials not found in environment variables.")
    print("Please set SUPABASE_URL and SUPABASE_KEY environment variables.")
    sys.exit(1)

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

def validate_authors():
    """Validate authors table data"""
    print("\nValidating authors table...")
    response = supabase.table("authors").select("*").execute()
    authors = response.data
    
    if not authors:
        print("❌ No authors found in the database.")
        return False
    
    print(f"✅ Found {len(authors)} authors in the database.")
    print(f"Sample authors: {', '.join([author['name'] for author in authors[:5]])}")
    return True

def validate_stories():
    """Validate stories table data"""
    print("\nValidating stories table...")
    response = supabase.table("stories").select("*").execute()
    stories = response.data
    
    if not stories:
        print("❌ No stories found in the database.")
        return False
    
    print(f"✅ Found {len(stories)} stories in the database.")
    print(f"Sample stories: {', '.join([story['title'] for story in stories[:5]])}")
    
    # Check for full text content
    has_full_text = all(story['original_text'] for story in stories)
    if has_full_text:
        print("✅ All stories have original text content.")
    else:
        print("⚠️ Some stories may be missing original text content.")
    
    return True

def validate_themes():
    """Validate themes table data"""
    print("\nValidating themes table...")
    response = supabase.table("themes").select("*").execute()
    themes = response.data
    
    if not themes:
        print("❌ No themes found in the database.")
        return False
    
    print(f"✅ Found {len(themes)} themes in the database.")
    print(f"Sample themes: {', '.join([theme['name'] for theme in themes[:5]])}")
    return True

def validate_locations():
    """Validate locations table data"""
    print("\nValidating locations table...")
    response = supabase.table("locations").select("*").execute()
    locations = response.data
    
    if not locations:
        print("❌ No locations found in the database.")
        return False
    
    print(f"✅ Found {len(locations)} locations in the database.")
    print(f"Sample locations: {', '.join([location['name'] for location in locations[:5]])}")
    return True

def validate_relationships():
    """Validate relationship tables"""
    print("\nValidating relationships...")
    
    # Check story_authors
    response = supabase.table("story_authors").select("*").execute()
    story_authors = response.data
    if not story_authors:
        print("❌ No story-author relationships found.")
    else:
        print(f"✅ Found {len(story_authors)} story-author relationships.")
    
    # Check story_locations
    response = supabase.table("story_locations").select("*").execute()
    story_locations = response.data
    if not story_locations:
        print("❌ No story-location relationships found.")
    else:
        print(f"✅ Found {len(story_locations)} story-location relationships.")
    
    # Check story_themes
    response = supabase.table("story_themes").select("*").execute()
    story_themes = response.data
    if not story_themes:
        print("❌ No story-theme relationships found.")
    else:
        print(f"✅ Found {len(story_themes)} story-theme relationships.")
    
    # Check cultural_contexts
    response = supabase.table("cultural_contexts").select("*").execute()
    cultural_contexts = response.data
    if not cultural_contexts:
        print("⚠️ No cultural contexts found.")
    else:
        print(f"✅ Found {len(cultural_contexts)} cultural contexts.")
    
    # Check images
    response = supabase.table("images").select("*").execute()
    images = response.data
    if not images:
        print("⚠️ No images found.")
    else:
        print(f"✅ Found {len(images)} images.")
    
    return True

def validate_complex_query():
    """Validate a complex query that joins multiple tables"""
    print("\nValidating complex query capability...")
    
    try:
        # Query a story with its author, location, and themes
        response = supabase.table("stories").select("""
            *,
            story_authors(author:authors(*)),
            story_locations(location:locations(*)),
            story_themes(theme:themes(*))
        """).limit(1).execute()
        
        story = response.data[0] if response.data else None
        
        if not story:
            print("❌ Complex query returned no results.")
            return False
        
        print("✅ Complex query successful.")
        print(f"Retrieved story '{story['title']}' with:")
        
        # Check if relationships were properly retrieved
        if story.get('story_authors') and story['story_authors'][0].get('author'):
            print(f"  - Author: {story['story_authors'][0]['author']['name']}")
        
        if story.get('story_locations') and story['story_locations'][0].get('location'):
            print(f"  - Location: {story['story_locations'][0]['location']['name']}")
        
        if story.get('story_themes'):
            themes = [st['theme']['name'] for st in story['story_themes'] if st.get('theme')]
            print(f"  - Themes: {', '.join(themes)}")
        
        return True
    except Exception as e:
        print(f"❌ Complex query failed: {str(e)}")
        return False

def main():
    """Main validation function"""
    print("=== StoryMap Supabase Data Validation ===")
    print(f"Connecting to Supabase at: {supabase_url}")
    
    # Run validation checks
    authors_valid = validate_authors()
    stories_valid = validate_stories()
    themes_valid = validate_themes()
    locations_valid = validate_locations()
    relationships_valid = validate_relationships()
    complex_query_valid = validate_complex_query()
    
    # Summarize results
    print("\n=== Validation Summary ===")
    all_valid = all([
        authors_valid, 
        stories_valid, 
        themes_valid, 
        locations_valid, 
        relationships_valid,
        complex_query_valid
    ])
    
    if all_valid:
        print("✅ All validation checks passed! Your data migration was successful.")
        print("Your StoryMap application is ready to use the Supabase database.")
    else:
        print("⚠️ Some validation checks failed. Please review the issues above.")
    
    # Provide next steps
    print("\n=== Next Steps ===")
    print("1. Update your application to use the Supabase client for data retrieval")
    print("2. Test the application with the new database backend")
    print("3. Follow the workflow in 'adding_new_stories_to_supabase.md' for adding new content")

if __name__ == "__main__":
    main()
