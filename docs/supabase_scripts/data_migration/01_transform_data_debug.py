#!/usr/bin/env python3
"""
Transform StoryMap static data to Supabase schema format.
This script extracts data from the TypeScript files and transforms it
into SQL insert statements for the Supabase database.
"""

import os
import re
import uuid
from datetime import datetime

# Output directory for SQL files
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# Function to extract stories data from TypeScript file
def extract_stories_from_ts(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the stories array using regex
    stories_match = re.search(r'export const stories: Story\[\] = \[(.*?)\];', content, re.DOTALL)
    if not stories_match:
        print("Could not find stories array in the TypeScript file")
        return []
    
    stories_str = stories_match.group(1)
    
    # Extract individual story objects
    story_objects = []
    # Find the start of each story object
    story_starts = [m.start() for m in re.finditer(r'\s*\{\s*id:', stories_str)]
    
    # For each start position, extract the complete story object
    for i, start in enumerate(story_starts):
        # If this is the last story, extract until the end of the stories array
        if i == len(story_starts) - 1:
            story_str = stories_str[start:]
        else:
            # Otherwise, extract until the start of the next story
            story_str = stories_str[start:story_starts[i+1]]
        
        story_objects.append(story_str)
    
    stories = []
    for story_str in story_objects:
        # Extract each field using regex
        id_match = re.search(r'id:\s*"([^"]+)"', story_str)
        title_match = re.search(r'title:\s*"([^"]+)"', story_str)
        author_match = re.search(r'author:\s*"([^"]+)"', story_str)
        country_match = re.search(r'country:\s*"([^"]+)"', story_str)
        country_code_match = re.search(r'countryCode:\s*"([^"]+)"', story_str)
        region_match = re.search(r'region:\s*"([^"]+)"', story_str)
        
        # Extract coordinates
        lat_match = re.search(r'lat:\s*([\d.-]+)', story_str)
        lng_match = re.search(r'lng:\s*([\d.-]+)', story_str)
        
        reading_time_match = re.search(r'readingTimeMinutes:\s*(\d+)', story_str)
        
        # Extract themes array - this is more complex as it's an array
        themes = []
        themes_match = re.search(r'themes:\s*\[(.*?)\]', story_str, re.DOTALL)
        if themes_match:
            themes_str = themes_match.group(1)
            # Extract each theme string from the array
            theme_matches = re.findall(r'"([^"]+)"', themes_str)
            themes = theme_matches
        
        mood_match = re.search(r'mood:\s*"([^"]+)"', story_str)
        preview_text_match = re.search(r'previewText:\s*"([^"]+)"', story_str)
        
        # Extract full text - this is complex as it can contain quotes and newlines
        full_text = ""
        full_text_match = re.search(r'fullText:\s*"(.*?)(?:(?<!\\)")', story_str, re.DOTALL)
        if full_text_match:
            full_text = full_text_match.group(1)
        else:
            # Try with backticks for multiline strings
            full_text_match = re.search(r'fullText:\s*`(.*?)`', story_str, re.DOTALL)
            if full_text_match:
                full_text = full_text_match.group(1)
        
        # Extract cultural context
        cultural_context = ""
        cultural_context_match = re.search(r'culturalContext:\s*"(.*?)(?:(?<!\\)")', story_str, re.DOTALL)
        if cultural_context_match:
            cultural_context = cultural_context_match.group(1)
        else:
            # Try with backticks
            cultural_context_match = re.search(r'culturalContext:\s*`(.*?)`', story_str, re.DOTALL)
            if cultural_context_match:
                cultural_context = cultural_context_match.group(1)
        
        # Extract image URL if present
        image_url = None
        image_url_match = re.search(r'imageUrl:\s*"([^"]+)"', story_str)
        if image_url_match:
            image_url = image_url_match.group(1)
        
        # Create story object
        story = {
            'id': id_match.group(1) if id_match else '',
            'title': title_match.group(1) if title_match else '',
            'author': author_match.group(1) if author_match else '',
            'country': country_match.group(1) if country_match else '',
            'countryCode': country_code_match.group(1) if country_code_match else '',
            'region': region_match.group(1) if region_match else '',
            'coordinates': {
                'lat': float(lat_match.group(1)) if lat_match else 0,
                'lng': float(lng_match.group(1)) if lng_match else 0
            },
            'readingTimeMinutes': int(reading_time_match.group(1)) if reading_time_match else 0,
            'themes': themes,
            'mood': mood_match.group(1) if mood_match else '',
            'previewText': preview_text_match.group(1) if preview_text_match else '',
            'fullText': full_text,
            'culturalContext': cultural_context,
            'imageUrl': image_url
        }
        
        stories.append(story)
    
    print(f"Extracted {len(stories)} stories")
    
    # Debug output to verify extraction
    for i, story in enumerate(stories):
        print(f"Story {i+1}: {story['title']}")
        print(f"  Themes: {story['themes']}")
        print(f"  Has cultural context: {'Yes' if story['culturalContext'] else 'No'}")
        print(f"  Has image URL: {'Yes' if story['imageUrl'] else 'No'}")
    
    return stories

# Function to extract embedded text content
def extract_embedded_text(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the text content using regex
    text_match = re.search(r'const \w+Text = `(.*?)`', content, re.DOTALL)
    if text_match:
        return text_match.group(1)
    return None

# Function to generate SQL for authors table
def generate_authors_sql(stories):
    authors = {}
    for story in stories:
        if story['author'] not in authors:
            authors[story['author']] = {
                'id': str(uuid.uuid4()),
                'name': story['author'],
                # Default values for fields we don't have
                'birth_year': None,
                'death_year': None,
                'nationality': None,
                'bio': None
            }
    
    sql = "-- Insert authors\n"
    sql += "INSERT INTO authors (id, name, birth_year, death_year, nationality, bio) VALUES\n"
    
    values = []
    for author_id, author in authors.items():
        name = author['name'].replace("'", "''")
        value = f"('{author['id']}', '{name}', "
        value += f"{author['birth_year'] if author['birth_year'] else 'NULL'}, "
        value += f"{author['death_year'] if author['death_year'] else 'NULL'}, "
        value += f"NULL, "
        value += f"NULL)"
        values.append(value)
    
    sql += ",\n".join(values) + ";\n\n"
    return sql, authors

# Function to generate SQL for locations table
def generate_locations_sql(stories):
    locations = {}
    for story in stories:
        location_key = f"{story['country']}_{story['coordinates']['lat']}_{story['coordinates']['lng']}"
        if location_key not in locations:
            locations[location_key] = {
                'id': str(uuid.uuid4()),
                'name': story['country'],
                'latitude': story['coordinates']['lat'],
                'longitude': story['coordinates']['lng'],
                'location_type': 'real',  # Default to 'real'
                'country_code': story['countryCode'],
                'region': story['region'],
                'description': None  # We don't have this in the original data
            }
    
    sql = "-- Insert locations\n"
    sql += "INSERT INTO locations (id, name, latitude, longitude, location_type, country_code, region, description) VALUES\n"
    
    values = []
    for location_key, location in locations.items():
        name = location['name'].replace("'", "''")
        region = location['region'].replace("'", "''") if location['region'] else ''
        value = f"('{location['id']}', '{name}', "
        value += f"{location['latitude']}, {location['longitude']}, "
        value += f"'{location['location_type']}', '{location['country_code']}', "
        value += f"'{region}', "
        value += f"NULL)"
        values.append(value)
    
    sql += ",\n".join(values) + ";\n\n"
    return sql, locations

# Function to generate SQL for themes table
def generate_themes_sql(stories):
    all_themes = set()
    for story in stories:
        for theme in story['themes']:
            all_themes.add(theme)
    
    themes = {}
    for theme in all_themes:
        themes[theme] = {
            'id': str(uuid.uuid4()),
            'name': theme,
            'description': None  # We don't have descriptions in the original data
        }
    
    # Check if we have any themes before generating SQL
    if not themes:
        print("Warning: No themes found in stories data")
        return "", {}
    
    sql = "-- Insert themes\n"
    sql += "INSERT INTO themes (id, name, description) VALUES\n"
    
    values = []
    for theme_name, theme in themes.items():
        name = theme_name.replace("'", "''")
        value = f"('{theme['id']}', '{name}', NULL)"
        values.append(value)
    
    sql += ",\n".join(values) + ";\n\n"
    return sql, themes

# Function to generate SQL for stories table
def generate_stories_sql(stories, embedded_texts):
    sql = "-- Insert stories\n"
    sql += "INSERT INTO stories (id, title, slug, original_language, original_text, summary, reading_time_minutes, publication_year, is_public_domain, source_url) VALUES\n"
    
    values = []
    for story in stories:
        # Check if we have embedded text for this story
        full_text = story['fullText']
        if story['id'] in embedded_texts:
            full_text = embedded_texts[story['id']]
        elif full_text.startswith("For the full text, please visit:"):
            # For stories with external links, we'll need to fetch the content later
            full_text = f"External source: {full_text}"
        
        # Generate a slug from the title
        slug = story['title'].lower().replace(' ', '-').replace("'", "")
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        
        title = story['title'].replace("'", "''")
        text = full_text.replace("'", "''")
        summary = story['previewText'].replace("'", "''")
        
        value = f"('{story['id']}', '{title}', "
        value += f"'{slug}', 'en', "  # Assuming English as the original language
        value += f"'{text}', "
        value += f"'{summary}', "
        value += f"{story['readingTimeMinutes']}, "
        value += f"NULL, "  # We don't have publication year in the original data
        value += f"true, "  # Assuming all stories are public domain
        value += f"NULL)"  # We don't have source URLs in the original data
        values.append(value)
    
    sql += ",\n".join(values) + ";\n\n"
    return sql

# Function to generate SQL for story_authors table
def generate_story_authors_sql(stories, authors):
    sql = "-- Insert story_authors relationships\n"
    sql += "INSERT INTO story_authors (id, story_id, author_id) VALUES\n"
    
    values = []
    for story in stories:
        author_id = authors[story['author']]['id']
        value = f"('{str(uuid.uuid4())}', '{story['id']}', '{author_id}')"
        values.append(value)
    
    sql += ",\n".join(values) + ";\n\n"
    return sql

# Function to generate SQL for story_locations table
def generate_story_locations_sql(stories, locations):
    sql = "-- Insert story_locations relationships\n"
    sql += "INSERT INTO story_locations (id, story_id, location_id, location_role) VALUES\n"
    
    values = []
    for story in stories:
        location_key = f"{story['country']}_{story['coordinates']['lat']}_{story['coordinates']['lng']}"
        location_id = locations[location_key]['id']
        value = f"('{str(uuid.uuid4())}', '{story['id']}', '{location_id}', 'setting')"
        values.append(value)
    
    sql += ",\n".join(values) + ";\n\n"
    return sql

# Function to generate SQL for story_themes table
def generate_story_themes_sql(stories, themes):
    # Check if we have any themes before generating SQL
    if not themes:
        print("Warning: No themes found, skipping story_themes relationships")
        return ""
    
    sql = "-- Insert story_themes relationships\n"
    sql += "INSERT INTO story_themes (id, story_id, theme_id) VALUES\n"
    
    values = []
    for story in stories:
        for theme in story['themes']:
            if theme in themes:  # Make sure the theme exists in our themes dictionary
                theme_id = themes[theme]['id']
                value = f"('{str(uuid.uuid4())}', '{story['id']}', '{theme_id}')"
                values.append(value)
    
    if not values:
        print("Warning: No story-theme relationships found")
        return ""
        
    sql += ",\n".join(values) + ";\n\n"
    return sql

# Function to generate SQL for cultural_contexts table
def generate_cultural_contexts_sql(stories):
    values = []
    for story in stories:
        if story['culturalContext']:
            context = story['culturalContext'].replace("'", "''")
            value = f"('{str(uuid.uuid4())}', '{story['id']}', "
            value += f"'{context}', 'en')"
            values.append(value)
    
    if not values:
        print("Warning: No cultural contexts found")
        return ""
    
    sql = "-- Insert cultural_contexts\n"
    sql += "INSERT INTO cultural_contexts (id, story_id, context_text, language_code) VALUES\n"
    sql += ",\n".join(values) + ";\n\n"
    return sql

# Function to generate SQL for images table
def generate_images_sql(stories):
    values = []
    for story in stories:
        if story['imageUrl']:
            title = story['title'].replace("'", "''")
            value = f"('{str(uuid.uuid4())}', '{story['id']}', "
            value += f"'{story['imageUrl']}', 'cover', "
            value += f"'Cover image for {title}', "
            value += f"'Unsplash')"  # Assuming Unsplash as the source
            values.append(value)
    
    if not values:
        print("Warning: No images found")
        return ""
    
    sql = "-- Insert images\n"
    sql += "INSERT INTO images (id, story_id, image_url, image_type, alt_text, attribution) VALUES\n"
    sql += ",\n".join(values) + ";\n\n"
    return sql

def main():
    # Paths to source files
    stories_ts_path = "/home/ubuntu/StoryMapProject/storymap-app/src/data/stories.ts"
    tell_tale_heart_path = "/home/ubuntu/StoryMapProject/storymap-app/src/data/tellTaleHeartText.ts"
    gift_of_magi_path = "/home/ubuntu/StoryMapProject/storymap-app/src/data/giftOfTheMagiText.ts"
    
    # Extract stories from TypeScript
    stories = extract_stories_from_ts(stories_ts_path)
    if not stories:
        print("Failed to extract stories data")
        return
    
    print(f"Successfully extracted {len(stories)} stories from TypeScript file")
    
    # Extract embedded texts
    embedded_texts = {}
    tell_tale_heart_text = extract_embedded_text(tell_tale_heart_path)
    if tell_tale_heart_text:
        embedded_texts['tell-tale-heart'] = tell_tale_heart_text
        print("Extracted The Tell-Tale Heart text")
    
    gift_of_magi_text = extract_embedded_text(gift_of_magi_path)
    if gift_of_magi_text:
        embedded_texts['gift-of-the-magi'] = gift_of_magi_text
        print("Extracted The Gift of the Magi text")
    
    # Generate SQL for each table
    authors_sql, authors = generate_authors_sql(stories)
    locations_sql, locations = generate_locations_sql(stories)
    themes_sql, themes = generate_themes_sql(stories)
    stories_sql = generate_stories_sql(stories, embedded_texts)
    story_authors_sql = generate_story_authors_sql(stories, authors)
    story_locations_sql = generate_story_locations_sql(stories, locations)
    story_themes_sql = generate_story_themes_sql(stories, themes)
    cultural_contexts_sql = generate_cultural_contexts_sql(stories)
    images_sql = generate_images_sql(stories)
    
    # Combine all SQL
    full_sql = "-- StoryMap Data Migration\n"
    full_sql += f"-- Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    full_sql += authors_sql
    full_sql += locations_sql
    
    # Only add themes SQL if we have themes
    if themes_sql:
        full_sql += themes_sql
    
    full_sql += stories_sql
    full_sql += story_authors_sql
    full_sql += story_locations_sql
    
    # Only add story_themes SQL if we have themes
    if story_themes_sql:
        full_sql += story_themes_sql
    
    # Only add cultural_contexts SQL if we have any
    if cultural_contexts_sql:
        full_sql += cultural_contexts_sql
    
    # Only add images SQL if we have any
    if images_sql:
        full_sql += images_sql
    
    # Write SQL to file
    output_path = os.path.join(OUTPUT_DIR, "storymap_data_migration.sql")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_sql)
    
    print(f"Generated SQL migration script at {output_path}")

if __name__ == "__main__":
    main()
