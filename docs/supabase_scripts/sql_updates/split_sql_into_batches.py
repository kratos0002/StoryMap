#!/usr/bin/env python3
"""
Script to split the large SQL update file into smaller batches.
This script creates multiple smaller SQL files that can be executed individually.
"""

import os
import sys
import json
from pathlib import Path

# Path to extraction results and SQL files
CONTENT_DIR = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/story_content')
RESULTS_FILE = CONTENT_DIR / 'extraction_results.json'
SQL_DIR = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/sql_updates/batches')
STORIES_PER_BATCH = 3  # Number of stories per batch file

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

def generate_update_sql(story_id, title, content):
    """Generate SQL update statement for a story."""
    # Escape content for SQL
    escaped_content = escape_sql_string(content)
    
    # Generate SQL statement
    sql = [
        f"-- Update content for '{title}'",
        f"UPDATE stories SET original_text = {escaped_content} WHERE id = '{story_id}';"
    ]
    return sql

def main():
    """Main function to split SQL update statements into batches."""
    # Load extraction results
    results = load_extraction_results()
    successful_stories = results.get('successful', [])
    
    if not successful_stories:
        print("No successfully extracted stories found.")
        return
    
    print(f"Splitting SQL update statements for {len(successful_stories)} stories into batches of {STORIES_PER_BATCH}.")
    
    # Calculate number of batches
    num_batches = (len(successful_stories) + STORIES_PER_BATCH - 1) // STORIES_PER_BATCH
    print(f"Will create {num_batches} batch files.")
    
    # Process each batch
    for batch_num in range(num_batches):
        start_idx = batch_num * STORIES_PER_BATCH
        end_idx = min(start_idx + STORIES_PER_BATCH, len(successful_stories))
        batch_stories = successful_stories[start_idx:end_idx]
        
        # Start with a transaction
        sql_statements = [
            f"-- SQL Batch {batch_num + 1} of {num_batches}",
            "-- Run this in the Supabase SQL Editor with admin privileges",
            "",
            "BEGIN;"
        ]
        
        # Generate update statements for each story in this batch
        for story in batch_stories:
            story_id = story['id']
            title = story['title']
            file_path = story['file_path']
            
            print(f"Processing '{title}' (ID: {story_id}) for batch {batch_num + 1}...")
            
            try:
                # Read the content from file
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Some content might be too large, so we'll truncate if necessary
                # Supabase SQL Editor has a limit on statement size
                if len(content) > 500000:  # More conservative limit for SQL Editor
                    print(f"Warning: Content for story {story_id} is very large ({len(content)} chars). Truncating...")
                    content = content[:500000] + "\n\n[Content truncated due to size limitations]"
                
                # Generate and add the SQL statements
                sql = generate_update_sql(story_id, title, content)
                sql_statements.extend(sql)
                sql_statements.append("")  # Add a blank line for readability
                
            except Exception as e:
                print(f"Error processing '{title}': {str(e)}")
        
        # End the transaction
        sql_statements.append("COMMIT;")
        
        # Write SQL to batch file
        batch_file = SQL_DIR / f"batch_{batch_num + 1:02d}.sql"
        with open(batch_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(sql_statements))
        
        print(f"Created batch file: {batch_file}")
    
    # Create an index file listing all batches
    index_content = [
        "# Story Content Update - Batch Files",
        "",
        "The following SQL batch files have been created to update story content in the Supabase database:",
        ""
    ]
    
    for batch_num in range(num_batches):
        batch_file = f"batch_{batch_num + 1:02d}.sql"
        start_idx = batch_num * STORIES_PER_BATCH
        end_idx = min(start_idx + STORIES_PER_BATCH, len(successful_stories))
        story_titles = [story['title'] for story in successful_stories[start_idx:end_idx]]
        story_list = ", ".join(story_titles)
        
        index_content.append(f"## Batch {batch_num + 1}: {batch_file}")
        index_content.append(f"Stories: {story_list}")
        index_content.append("")
    
    index_content.extend([
        "## Instructions",
        "",
        "1. Go to your Supabase dashboard",
        "2. Navigate to the SQL Editor",
        "3. Execute each batch file in sequence, waiting for each to complete before running the next",
        "4. If any batch fails, note the error and continue with the next batch",
        "",
        "After executing all batches, run a verification query to confirm the updates."
    ])
    
    with open(SQL_DIR / "README.md", 'w', encoding='utf-8') as f:
        f.write('\n'.join(index_content))
    
    print(f"\nBatch file creation complete.")
    print(f"Created {num_batches} batch files in {SQL_DIR}")
    print(f"See {SQL_DIR / 'README.md'} for instructions.")

if __name__ == "__main__":
    main()
