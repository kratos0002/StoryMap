#!/usr/bin/env python3
"""
Script to extract full story content from public domain sources for incomplete stories.
This script will fetch content for stories identified as incomplete in the audit.
"""

import os
import sys
import json
import requests
import time
from bs4 import BeautifulSoup
from pathlib import Path

# Create directory for story content
CONTENT_DIR = Path('/home/ubuntu/StoryMapProject/docs/supabase_scripts/story_content')
CONTENT_DIR.mkdir(exist_ok=True)

# Load the audit results
try:
    with open('story_content_audit.json', 'r') as f:
        audit_data = json.load(f)
    
    incomplete_stories = audit_data['incomplete_story_details']
    print(f"Loaded {len(incomplete_stories)} incomplete stories from audit report.")
except Exception as e:
    print(f"Error loading audit data: {str(e)}")
    sys.exit(1)

# Dictionary mapping story titles to known public domain sources
STORY_SOURCES = {
    "The Legend of Sleepy Hollow": "https://www.gutenberg.org/files/41/41-h/41-h.htm",
    "Rip Van Winkle": "https://www.gutenberg.org/files/41/41-h/41-h.htm",
    "The Yellow Wallpaper": "https://www.gutenberg.org/files/1952/1952-h/1952-h.htm",
    "The Birthmark": "https://www.gutenberg.org/files/512/512-h/512-h.htm",
    "To Build a Fire": "https://www.gutenberg.org/files/910/910-h/910-h.htm",
    "The Most Dangerous Game": "https://www.gutenberg.org/files/58873/58873-h/58873-h.htm",
    "The Monkey's Paw": "https://www.gutenberg.org/files/12122/12122-h/12122-h.htm",
    "The Story of the Late Mr. Elvesham": "https://www.gutenberg.org/files/11870/11870-h/11870-h.htm",
    "The Open Window": "https://www.gutenberg.org/files/269/269-h/269-h.htm",
    "The Signal-Man": "https://www.gutenberg.org/files/1289/1289-h/1289-h.htm",
    "The Lady with the Dog": "https://www.gutenberg.org/files/13415/13415-h/13415-h.htm",
    "The Nose": "https://www.gutenberg.org/files/36238/36238-h/36238-h.htm",
    "The Queen of Spades": "https://www.gutenberg.org/files/55024/55024-h/55024-h.htm",
    "The Overcoat": "https://www.gutenberg.org/files/36238/36238-h/36238-h.htm",
    "The Necklace": "https://www.gutenberg.org/files/3090/3090-h/3090-h.htm",
    "Ball of Fat": "https://www.gutenberg.org/files/3090/3090-h/3090-h.htm",
    "The Last Lesson": "https://www.gutenberg.org/files/13173/13173-h/13173-h.htm",
    "A Hunger Artist": "https://www.gutenberg.org/files/48969/48969-h/48969-h.htm",
    "The Metamorphosis": "https://www.gutenberg.org/files/5200/5200-h/5200-h.htm",
    "In a Grove": "https://www.gutenberg.org/files/1926/1926-h/1926-h.htm",
    "Rashomon": "https://www.gutenberg.org/files/1926/1926-h/1926-h.htm",
    "The True Story of Ah Q": "https://www.gutenberg.org/files/26522/26522-h/26522-h.htm",
    "The Arabian Nights (Selected Tales)": "https://www.gutenberg.org/files/128/128-h/128-h.htm",
    "Why the Sun and the Moon Live in the Sky": "https://americanliterature.com/childrens-stories/why-the-sun-and-the-moon-live-in-the-sky"
}

# Custom extraction functions for specific stories that need special handling
def extract_sleepy_hollow(soup):
    """Extract The Legend of Sleepy Hollow from the soup."""
    # Find the story section
    start_marker = soup.find('h2', string='THE LEGEND OF SLEEPY HOLLOW')
    if not start_marker:
        return None
    
    # Get all content until the next h2 or end
    content = []
    current = start_marker.find_next()
    while current and current.name != 'h2':
        if current.name == 'p':
            content.append(current.get_text())
        current = current.find_next()
    
    return '\n\n'.join(content)

def extract_rip_van_winkle(soup):
    """Extract Rip Van Winkle from the soup."""
    # Find the story section
    start_marker = soup.find('h2', string='RIP VAN WINKLE')
    if not start_marker:
        return None
    
    # Get all content until the next h2
    content = []
    current = start_marker.find_next()
    while current and current.name != 'h2':
        if current.name == 'p':
            content.append(current.get_text())
        current = current.find_next()
    
    return '\n\n'.join(content)

# Dictionary mapping story titles to custom extraction functions
CUSTOM_EXTRACTORS = {
    "The Legend of Sleepy Hollow": extract_sleepy_hollow,
    "Rip Van Winkle": extract_rip_van_winkle,
    # Add more custom extractors as needed
}

def fetch_story_content(title, url):
    """
    Fetch and extract story content from the given URL.
    Returns the extracted text content.
    """
    print(f"Fetching content for '{title}' from {url}")
    
    try:
        # Add a delay to avoid overwhelming the server
        time.sleep(1)
        
        # Fetch the page
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Check if we have a custom extractor for this story
        if title in CUSTOM_EXTRACTORS:
            content = CUSTOM_EXTRACTORS[title](soup)
            if content:
                return content
        
        # Default extraction logic - look for the story content
        # This is a simplified approach and may need adjustment for specific sources
        content = []
        
        # Try to find the main content area
        main_content = soup.find('div', class_='chapter') or soup.find('div', id='content')
        
        if main_content:
            # Extract paragraphs from the main content
            paragraphs = main_content.find_all('p')
            for p in paragraphs:
                text = p.get_text().strip()
                if text:
                    content.append(text)
        else:
            # Fallback: try to extract all paragraphs and filter
            paragraphs = soup.find_all('p')
            for p in paragraphs:
                text = p.get_text().strip()
                if len(text) > 100:  # Only include substantial paragraphs
                    content.append(text)
        
        if not content:
            print(f"Warning: Could not extract content for '{title}'")
            return None
        
        return '\n\n'.join(content)
    
    except Exception as e:
        print(f"Error fetching content for '{title}': {str(e)}")
        return None

def main():
    """
    Main function to extract content for all incomplete stories.
    """
    results = {
        "successful": [],
        "failed": []
    }
    
    for story in incomplete_stories:
        story_id = story['id']
        title = story['title']
        
        # Check if we have a source for this story
        if title not in STORY_SOURCES:
            print(f"No source URL defined for '{title}'")
            results["failed"].append({"id": story_id, "title": title, "reason": "No source URL defined"})
            continue
        
        # Fetch content
        content = fetch_story_content(title, STORY_SOURCES[title])
        
        if not content:
            results["failed"].append({"id": story_id, "title": title, "reason": "Content extraction failed"})
            continue
        
        # Save content to file
        filename = f"{story_id}.txt"
        filepath = CONTENT_DIR / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Successfully extracted and saved content for '{title}' ({len(content)} characters)")
        results["successful"].append({
            "id": story_id,
            "title": title,
            "content_length": len(content),
            "file_path": str(filepath)
        })
    
    # Save results
    with open(CONTENT_DIR / 'extraction_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nExtraction complete.")
    print(f"Successfully extracted content for {len(results['successful'])} stories.")
    print(f"Failed to extract content for {len(results['failed'])} stories.")
    print(f"Results saved to {CONTENT_DIR / 'extraction_results.json'}")

if __name__ == "__main__":
    main()
