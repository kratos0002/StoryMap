#!/usr/bin/env python3
"""
Audit script to check which stories in Supabase have full content and which ones need updating.
This script connects to the Supabase database and checks each story's content status.
"""

import os
import sys
import json
from datetime import datetime
from supabase import create_client

# Supabase credentials
SUPABASE_URL = "https://cvcjjwrorvgvptkckzml.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2pqd3JvcnZndnB0a2Nrem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU5MDMsImV4cCI6MjA2NDE3MTkwM30.AG1a5N49igWn9tOznj7A7Gzhvf0AynYbf9Ozo-1ny2g"

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def audit_stories():
    """
    Audit all stories in the database to check for full content.
    Returns a dictionary with complete and incomplete stories.
    """
    print("Connecting to Supabase database...")
    
    try:
        # Fetch all stories with their content
        response = supabase.table('stories').select('*').execute()
        stories = response.data
        
        if not stories:
            print("No stories found in the database.")
            return None
        
        print(f"Found {len(stories)} stories in the database.")
        
        # Categorize stories based on content completeness
        complete_stories = []
        incomplete_stories = []
        
        for story in stories:
            story_id = story['id']
            title = story['title']
            original_text = story.get('original_text', '')
            
            # Check if the story has substantial content
            # (This is a simple heuristic - adjust based on your specific needs)
            if original_text and len(original_text) > 500:  # Assuming stories should be longer than 500 chars
                complete_stories.append({
                    'id': story_id,
                    'title': title,
                    'content_length': len(original_text),
                    'status': 'complete'
                })
            else:
                incomplete_stories.append({
                    'id': story_id,
                    'title': title,
                    'content_length': len(original_text) if original_text else 0,
                    'status': 'incomplete'
                })
        
        # Create audit report
        audit_result = {
            'timestamp': datetime.now().isoformat(),
            'total_stories': len(stories),
            'complete_stories': len(complete_stories),
            'incomplete_stories': len(incomplete_stories),
            'complete_story_details': complete_stories,
            'incomplete_story_details': incomplete_stories
        }
        
        # Save audit report to file
        with open('story_content_audit.json', 'w') as f:
            json.dump(audit_result, f, indent=2)
        
        print(f"Audit complete. Found {len(complete_stories)} complete stories and {len(incomplete_stories)} incomplete stories.")
        print(f"Audit report saved to 'story_content_audit.json'")
        
        return audit_result
    
    except Exception as e:
        print(f"Error during audit: {str(e)}")
        return None

if __name__ == "__main__":
    audit_stories()
