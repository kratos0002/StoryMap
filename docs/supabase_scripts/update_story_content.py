#!/usr/bin/env python3
"""
Script to update Supabase database with full story texts.
This script reads the extracted story content and updates the database.
"""

import os
import sys
import json
import time
from pathlib import Path
from supabase import create_client

# Supabase credentials
SUPABASE_URL = "https://cvcjjwrorvgvptkckzml.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2pqd3JvcnZndnB0a2Nrem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU5MDMsImV4cCI6MjA2NDE3MTkwM30.AG1a5N49igWn9tOznj7A7Gzhvf0AynYbf9Ozo-1ny2g"

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Path to extraction results
CONTENT_DIR = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/story_content')
RESULTS_FILE = CONTENT_DIR / 'extraction_results.json'

def load_extraction_results():
    """Load the extraction results from the JSON file."""
    try:
        with open(RESULTS_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading extraction results: {str(e)}")
        sys.exit(1)

def update_story_content(story_id, content_file):
    """Update a story's content in the Supabase database."""
    try:
        # Read the content from file
        with open(content_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Some content might be too large, so we'll truncate if necessary
        # Supabase has a limit on text field size (typically around 1MB)
        if len(content) > 900000:  # Safe limit
            print(f"Warning: Content for story {story_id} is very large ({len(content)} chars). Truncating...")
            content = content[:900000] + "\n\n[Content truncated due to size limitations]"
        
        # Update the story in Supabase
        response = supabase.table('stories').update({
            'original_text': content
        }).eq('id', story_id).execute()
        
        # Check if update was successful
        if response.data and len(response.data) > 0:
            return True, len(content)
        else:
            return False, "No rows updated"
    
    except Exception as e:
        return False, str(e)

def main():
    """Main function to update story content in Supabase."""
    # Load extraction results
    results = load_extraction_results()
    successful_stories = results.get('successful', [])
    
    if not successful_stories:
        print("No successfully extracted stories found.")
        return
    
    print(f"Found {len(successful_stories)} stories to update.")
    
    # Track update results
    update_results = {
        "successful": [],
        "failed": []
    }
    
    # Update each story
    for story in successful_stories:
        story_id = story['id']
        title = story['title']
        file_path = story['file_path']
        
        print(f"Updating content for '{title}' (ID: {story_id})...")
        
        # Add a small delay to avoid overwhelming the database
        time.sleep(0.5)
        
        success, result = update_story_content(story_id, file_path)
        
        if success:
            print(f"Successfully updated '{title}' with {result} characters.")
            update_results["successful"].append({
                "id": story_id,
                "title": title,
                "content_length": result
            })
        else:
            print(f"Failed to update '{title}': {result}")
            update_results["failed"].append({
                "id": story_id,
                "title": title,
                "reason": result
            })
    
    # Save update results
    with open(CONTENT_DIR / 'update_results.json', 'w') as f:
        json.dump(update_results, f, indent=2)
    
    # Print summary
    print("\nUpdate complete.")
    print(f"Successfully updated {len(update_results['successful'])} stories.")
    print(f"Failed to update {len(update_results['failed'])} stories.")
    print(f"Results saved to {CONTENT_DIR / 'update_results.json'}")

if __name__ == "__main__":
    main()
