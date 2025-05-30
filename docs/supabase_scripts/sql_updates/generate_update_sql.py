#!/usr/bin/env python3
"""
Script to generate SQL update statements for story content.
This script creates SQL statements that can be run in the Supabase SQL Editor.
"""

import os
import sys
import json
import re
from pathlib import Path

# Path to extraction results
CONTENT_DIR = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/story_content')
RESULTS_FILE = CONTENT_DIR / 'extraction_results.json'
SQL_OUTPUT_FILE = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/sql_updates/update_story_content.sql')

def load_extraction_results():
    """Load the extraction results from the JSON file."""
    try:
        with open(RESULTS_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading extraction results: {str(e)}")
        sys.exit(1)

def escape_sql_string(text):
    """Escape single quotes and backslashes for SQL."""
    if text is None:
        return "NULL"
    # Replace backslashes first, then single quotes
    text = text.replace('\\', '\\\\').replace("'", "''")
    return f"'{text}'"

def generate_update_sql(story_id, content):
    """Generate SQL update statement for a story."""
    # Escape content for SQL
    escaped_content = escape_sql_string(content)
    
    # Generate SQL statement
    sql = f"UPDATE stories SET original_text = {escaped_content} WHERE id = '{story_id}';\n"
    return sql

def main():
    """Main function to generate SQL update statements."""
    # Load extraction results
    results = load_extraction_results()
    successful_stories = results.get('successful', [])
    
    if not successful_stories:
        print("No successfully extracted stories found.")
        return
    
    print(f"Generating SQL update statements for {len(successful_stories)} stories.")
    
    # Start with a transaction
    sql_statements = [
        "-- SQL statements to update story content in Supabase",
        "-- Run this in the Supabase SQL Editor with admin privileges",
        "",
        "BEGIN;",
        ""
    ]
    
    # Generate update statements for each story
    for story in successful_stories:
        story_id = story['id']
        title = story['title']
        file_path = story['file_path']
        
        print(f"Processing '{title}' (ID: {story_id})...")
        
        try:
            # Read the content from file
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Some content might be too large, so we'll truncate if necessary
            # Supabase has a limit on text field size (typically around 1MB)
            if len(content) > 900000:  # Safe limit
                print(f"Warning: Content for story {story_id} is very large ({len(content)} chars). Truncating...")
                content = content[:900000] + "\n\n[Content truncated due to size limitations]"
            
            # Add a comment with the story title
            sql_statements.append(f"-- Update content for '{title}'")
            
            # Generate and add the SQL statement
            sql = generate_update_sql(story_id, content)
            sql_statements.append(sql)
            sql_statements.append("")  # Add a blank line for readability
            
        except Exception as e:
            print(f"Error processing '{title}': {str(e)}")
    
    # End the transaction
    sql_statements.append("COMMIT;")
    
    # Write SQL to file
    with open(SQL_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))
    
    print(f"\nSQL generation complete.")
    print(f"SQL statements saved to {SQL_OUTPUT_FILE}")
    print(f"Run this file in the Supabase SQL Editor to update story content.")

if __name__ == "__main__":
    main()
