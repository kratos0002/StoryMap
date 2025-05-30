#!/usr/bin/env python3
"""
Script to create individual SQL files for each story.
This script creates one SQL file per story to ensure they can be executed in the SQL Editor.
"""

import os
import sys
import json
from pathlib import Path

# Path to extraction results and SQL files
CONTENT_DIR = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/story_content')
RESULTS_FILE = CONTENT_DIR / 'extraction_results.json'
SQL_DIR = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/sql_updates/individual')
SQL_DIR.mkdir(exist_ok=True)

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
    
    # Generate SQL statement with transaction
    sql = [
        f"-- Update content for '{title}'",
        "BEGIN;",
        f"UPDATE stories SET original_text = {escaped_content} WHERE id = '{story_id}';",
        "COMMIT;"
    ]
    return '\n'.join(sql)

def main():
    """Main function to create individual SQL files for each story."""
    # Load extraction results
    results = load_extraction_results()
    successful_stories = results.get('successful', [])
    
    if not successful_stories:
        print("No successfully extracted stories found.")
        return
    
    print(f"Creating individual SQL files for {len(successful_stories)} stories.")
    
    # Create a README file
    readme_content = [
        "# Story Content Update - Individual SQL Files",
        "",
        "The following SQL files have been created to update story content in the Supabase database:",
        ""
    ]
    
    # Process each story
    for idx, story in enumerate(successful_stories):
        story_id = story['id']
        title = story['title']
        file_path = story['file_path']
        
        print(f"Processing {idx+1}/{len(successful_stories)}: '{title}' (ID: {story_id})...")
        
        try:
            # Read the content from file
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # For very large stories, create multiple files with content chunks
            if len(content) > 100000:  # Conservative limit for SQL Editor
                print(f"Content for story {story_id} is very large ({len(content)} chars). Creating chunks...")
                
                # Split content into chunks
                chunk_size = 80000  # Even more conservative for safety
                chunks = [content[i:i+chunk_size] for i in range(0, len(content), chunk_size)]
                
                # Create a file for each chunk
                chunk_files = []
                for chunk_idx, chunk in enumerate(chunks):
                    # For first chunk, clear the content
                    if chunk_idx == 0:
                        sql = [
                            f"-- Update content for '{title}' (Chunk {chunk_idx+1}/{len(chunks)})",
                            "BEGIN;",
                            f"-- First clear existing content",
                            f"UPDATE stories SET original_text = '' WHERE id = '{story_id}';",
                            f"-- Then add first chunk",
                            f"UPDATE stories SET original_text = {escape_sql_string(chunk)} WHERE id = '{story_id}';",
                            "COMMIT;"
                        ]
                    else:
                        # For subsequent chunks, append to existing content
                        sql = [
                            f"-- Update content for '{title}' (Chunk {chunk_idx+1}/{len(chunks)})",
                            "BEGIN;",
                            f"-- Append next chunk",
                            f"UPDATE stories SET original_text = original_text || {escape_sql_string(chunk)} WHERE id = '{story_id}';",
                            "COMMIT;"
                        ]
                    
                    # Write SQL to file
                    chunk_file = SQL_DIR / f"{story_id}_chunk_{chunk_idx+1:02d}.sql"
                    with open(chunk_file, 'w', encoding='utf-8') as f:
                        f.write('\n'.join(sql))
                    
                    chunk_files.append(str(chunk_file.name))
                    print(f"Created chunk file: {chunk_file}")
                
                # Add to README
                readme_content.append(f"## {title}")
                readme_content.append(f"ID: {story_id}")
                readme_content.append(f"Files: {', '.join(chunk_files)} (execute in order)")
                readme_content.append("")
                
            else:
                # Generate SQL for the story
                sql = generate_update_sql(story_id, title, content)
                
                # Write SQL to file
                sql_file = SQL_DIR / f"{story_id}.sql"
                with open(sql_file, 'w', encoding='utf-8') as f:
                    f.write(sql)
                
                print(f"Created SQL file: {sql_file}")
                
                # Add to README
                readme_content.append(f"## {title}")
                readme_content.append(f"ID: {story_id}")
                readme_content.append(f"File: {story_id}.sql")
                readme_content.append("")
            
        except Exception as e:
            print(f"Error processing '{title}': {str(e)}")
    
    # Add instructions to README
    readme_content.extend([
        "## Instructions",
        "",
        "1. Go to your Supabase dashboard",
        "2. Navigate to the SQL Editor",
        "3. Execute each SQL file individually",
        "4. For stories with multiple chunks, execute the chunks in numerical order",
        "5. If any file fails, note the error and continue with the next file",
        "",
        "After executing all files, run a verification query to confirm the updates."
    ])
    
    # Write README
    with open(SQL_DIR / "README.md", 'w', encoding='utf-8') as f:
        f.write('\n'.join(readme_content))
    
    print(f"\nSQL file creation complete.")
    print(f"Created individual SQL files in {SQL_DIR}")
    print(f"See {SQL_DIR / 'README.md'} for instructions.")

if __name__ == "__main__":
    main()
