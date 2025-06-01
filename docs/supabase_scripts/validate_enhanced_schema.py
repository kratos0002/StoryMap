#!/usr/bin/env python3
"""
Script to validate the enhanced discovery schema after applying SQL changes.
This script connects to Supabase and verifies that all new tables, columns, and functions exist.
"""

import os
import sys
import json
from supabase import create_client

# Supabase credentials
SUPABASE_URL = "https://cvcjjwrorvgvptkckzml.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2pqd3JvcnZndnB0a2Nrem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU5MDMsImV4cCI6MjA2NDE3MTkwM30.AG1a5N49igWn9tOznj7A7Gzhvf0AynYbf9Ozo-1ny2g"

def validate_schema():
    """Validate that the enhanced discovery schema has been properly applied."""
    try:
        # Initialize Supabase client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Check for new tables
        tables_to_check = [
            'reading_levels',
            'time_periods',
            'tags',
            'story_reading_levels',
            'story_time_periods',
            'story_tags'
        ]
        
        validation_results = {
            "tables": {},
            "columns": {},
            "functions": {},
            "views": {}
        }
        
        # Check tables
        for table in tables_to_check:
            try:
                # Try to select from the table
                response = supabase.table(table).select('id').limit(1).execute()
                validation_results["tables"][table] = "Exists"
            except Exception as e:
                validation_results["tables"][table] = f"Error: {str(e)}"
        
        # Check new columns in stories table
        columns_to_check = [
            'word_count',
            'popularity_score',
            'writing_era',
            'search_vector'
        ]
        
        for column in columns_to_check:
            try:
                # Try to select the column
                query = f"SELECT {column} FROM stories LIMIT 1"
                response = supabase.rpc('exec_sql', {'sql': query}).execute()
                validation_results["columns"][column] = "Exists"
            except Exception as e:
                validation_results["columns"][column] = f"Error: {str(e)}"
        
        # Check functions
        functions_to_check = [
            'update_story_search_vector',
            'find_similar_stories',
            'search_stories'
        ]
        
        for function in functions_to_check:
            try:
                # Check if function exists
                query = f"SELECT routine_name FROM information_schema.routines WHERE routine_name = '{function}'"
                response = supabase.rpc('exec_sql', {'sql': query}).execute()
                if response.data and len(response.data) > 0:
                    validation_results["functions"][function] = "Exists"
                else:
                    validation_results["functions"][function] = "Not found"
            except Exception as e:
                validation_results["functions"][function] = f"Error: {str(e)}"
        
        # Check views
        views_to_check = [
            'view_stories_with_metadata',
            'view_story_similarity_factors'
        ]
        
        for view in views_to_check:
            try:
                # Check if view exists
                query = f"SELECT table_name FROM information_schema.views WHERE table_name = '{view}'"
                response = supabase.rpc('exec_sql', {'sql': query}).execute()
                if response.data and len(response.data) > 0:
                    validation_results["views"][view] = "Exists"
                else:
                    validation_results["views"][view] = "Not found"
            except Exception as e:
                validation_results["views"][view] = f"Error: {str(e)}"
        
        return validation_results
    
    except Exception as e:
        return {"error": str(e)}

def main():
    """Main function to validate schema and print results."""
    print("Validating enhanced discovery schema...")
    results = validate_schema()
    
    print("\nValidation Results:")
    print(json.dumps(results, indent=2))
    
    # Save results to file
    with open('schema_validation_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print("\nResults saved to schema_validation_results.json")

if __name__ == "__main__":
    main()
