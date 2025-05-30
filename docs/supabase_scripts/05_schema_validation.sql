-- StoryMap Supabase Schema Validation
-- This script validates that all tables, indexes, and policies are correctly set up

-- Check if all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN (
  'stories', 'authors', 'story_authors', 'locations', 
  'story_locations', 'translations', 'themes', 'story_themes', 
  'cultural_contexts', 'images', 'user_profiles', 'user_interactions'
);

-- Check if PostGIS extension is enabled
SELECT extname, extversion 
FROM pg_extension 
WHERE extname = 'postgis';

-- Check if all indexes exist
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Check if RLS is enabled on all tables
SELECT table_name, has_row_level_security
FROM information_schema.tables t
JOIN pg_tables pt ON pt.tablename = t.table_name
JOIN pg_class pc ON pc.relname = t.table_name
WHERE t.table_schema = 'public'
AND t.table_name IN (
  'stories', 'authors', 'story_authors', 'locations', 
  'story_locations', 'translations', 'themes', 'story_themes', 
  'cultural_contexts', 'images', 'user_profiles', 'user_interactions'
);

-- Check if all RLS policies exist
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check if all triggers exist
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- Check if all functions exist
SELECT routine_name, routine_type, data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'update_modified_column', 'update_geo_point', 
  'generate_slug', 'set_story_slug', 
  'calculate_reading_time', 'set_reading_time'
);

-- Validate foreign key relationships
SELECT
    tc.table_schema, 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;
