#!/usr/bin/env python3
"""
Script to validate the enhanced discovery features in the StoryMap application.
This script tests the Supabase database functions and views for the discovery features.
"""

import os
import sys
import json
from supabase import create_client

# Supabase credentials
SUPABASE_URL = "https://cvcjjwrorvgvptkckzml.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2pqd3JvcnZndnB0a2Nrem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU5MDMsImV4cCI6MjA2NDE3MTkwM30.AG1a5N49igWn9tOznj7A7Gzhvf0AynYbf9Ozo-1ny2g"

def validate_discovery_features():
    """Validate that the enhanced discovery features are working properly."""
    try:
        # Initialize Supabase client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        validation_results = {
            "metadata": {},
            "search": {},
            "recommendations": {},
            "filters": {}
        }
        
        # Test 1: Fetch metadata for filters
        print("Testing metadata retrieval...")
        try:
            # Fetch themes
            themes_response = supabase.table('themes').select('id, name').execute()
            validation_results["metadata"]["themes"] = {
                "status": "Success" if themes_response.data else "No data",
                "count": len(themes_response.data) if themes_response.data else 0
            }
            
            # Fetch tags
            tags_response = supabase.table('tags').select('id, name, category').execute()
            validation_results["metadata"]["tags"] = {
                "status": "Success" if tags_response.data else "No data",
                "count": len(tags_response.data) if tags_response.data else 0
            }
            
            # Fetch time periods
            time_periods_response = supabase.table('time_periods').select('id, name, start_year, end_year').execute()
            validation_results["metadata"]["time_periods"] = {
                "status": "Success" if time_periods_response.data else "No data",
                "count": len(time_periods_response.data) if time_periods_response.data else 0
            }
            
            # Fetch reading levels
            reading_levels_response = supabase.table('reading_levels').select('id, name').execute()
            validation_results["metadata"]["reading_levels"] = {
                "status": "Success" if reading_levels_response.data else "No data",
                "count": len(reading_levels_response.data) if reading_levels_response.data else 0
            }
        except Exception as e:
            validation_results["metadata"]["error"] = str(e)
        
        # Test 2: Test search functionality
        print("Testing search functionality...")
        try:
            # Test basic search
            search_response = supabase.rpc(
                'search_stories',
                {
                    'p_query': 'heart',
                    'p_themes': None,
                    'p_tags': None,
                    'p_time_periods': None,
                    'p_regions': None,
                    'p_reading_level': None,
                    'p_min_year': None,
                    'p_max_year': None,
                    'p_limit': 5
                }
            ).execute()
            
            validation_results["search"]["basic_search"] = {
                "status": "Success" if search_response.data else "No results",
                "count": len(search_response.data) if search_response.data else 0
            }
            
            # Test filtered search
            filtered_search_response = supabase.rpc(
                'search_stories',
                {
                    'p_query': None,
                    'p_themes': ['Mythical'],
                    'p_tags': None,
                    'p_time_periods': None,
                    'p_regions': None,
                    'p_reading_level': None,
                    'p_min_year': 1800,
                    'p_max_year': 1900,
                    'p_limit': 5
                }
            ).execute()
            
            validation_results["search"]["filtered_search"] = {
                "status": "Success" if filtered_search_response.data else "No results",
                "count": len(filtered_search_response.data) if filtered_search_response.data else 0
            }
        except Exception as e:
            validation_results["search"]["error"] = str(e)
        
        # Test 3: Test recommendation functionality
        print("Testing recommendation functionality...")
        try:
            # Get a story ID to test with
            stories_response = supabase.table('stories').select('id').limit(1).execute()
            if stories_response.data and len(stories_response.data) > 0:
                test_story_id = stories_response.data[0]['id']
                
                # Test similar stories function
                similar_stories_response = supabase.rpc(
                    'find_similar_stories',
                    {
                        'p_story_id': test_story_id,
                        'p_limit': 3
                    }
                ).execute()
                
                validation_results["recommendations"]["similar_stories"] = {
                    "status": "Success" if similar_stories_response.data else "No results",
                    "count": len(similar_stories_response.data) if similar_stories_response.data else 0,
                    "test_story_id": test_story_id
                }
            else:
                validation_results["recommendations"]["similar_stories"] = {
                    "status": "Failed - No stories found for testing"
                }
        except Exception as e:
            validation_results["recommendations"]["error"] = str(e)
        
        # Test 4: Test filter combinations
        print("Testing filter combinations...")
        try:
            # Test multi-select filters
            multi_filter_response = supabase.table('stories').select("""
                *,
                story_themes!inner(
                    theme:themes!inner(name)
                ),
                story_tags!inner(
                    tag:tags!inner(name, category)
                )
            """).eq('story_themes.theme.name', 'Urban').eq('story_tags.tag.category', 'mood').execute()
            
            validation_results["filters"]["multi_filter"] = {
                "status": "Success" if multi_filter_response.data else "No results",
                "count": len(multi_filter_response.data) if multi_filter_response.data else 0
            }
            
            # Test metadata view
            view_response = supabase.table('view_stories_with_metadata').select('*').limit(5).execute()
            
            validation_results["filters"]["metadata_view"] = {
                "status": "Success" if view_response.data else "No results",
                "count": len(view_response.data) if view_response.data else 0
            }
        except Exception as e:
            validation_results["filters"]["error"] = str(e)
        
        return validation_results
    
    except Exception as e:
        return {"error": str(e)}

def main():
    """Main function to validate discovery features and print results."""
    print("Validating enhanced discovery features...")
    results = validate_discovery_features()
    
    print("\nValidation Results:")
    print(json.dumps(results, indent=2))
    
    # Save results to file
    with open('discovery_validation_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print("\nResults saved to discovery_validation_results.json")

if __name__ == "__main__":
    main()
