# Supabase Setup Instructions for StoryMap

This guide will walk you through setting up a Supabase project for the StoryMap application and executing the SQL scripts to create the database schema.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Click "New Project" to create a new project
3. Fill in the project details:
   - **Name**: StoryMap
   - **Database Password**: Create a secure password
   - **Region**: Choose a region closest to your target audience
4. Click "Create new project" and wait for the project to be created (this may take a few minutes)

## 2. Access SQL Editor

1. Once your project is created, navigate to the "SQL Editor" section in the left sidebar
2. You'll use this interface to execute the SQL scripts

## 3. Execute SQL Scripts

Execute the scripts in the following order:

### 3.1. Create Tables

1. Open the SQL Editor
2. Copy the contents of `/home/ubuntu/StoryMapProject/docs/supabase_scripts/01_tables.sql`
3. Paste into the SQL Editor
4. Click "Run" to execute the script
5. Verify in the "Table Editor" that all 12 tables have been created

### 3.2. Create Indexes

1. Open a new SQL Editor tab
2. Copy the contents of `/home/ubuntu/StoryMapProject/docs/supabase_scripts/02_indexes.sql`
3. Paste into the SQL Editor
4. Click "Run" to execute the script
5. Note: If you encounter an error about PostGIS extension, you may need to enable it first:
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   ```

### 3.3. Set Up Row Level Security Policies

1. Open a new SQL Editor tab
2. Copy the contents of `/home/ubuntu/StoryMapProject/docs/supabase_scripts/03_rls_policies.sql`
3. Paste into the SQL Editor
4. Click "Run" to execute the script

### 3.4. Create Functions and Triggers

1. Open a new SQL Editor tab
2. Copy the contents of `/home/ubuntu/StoryMapProject/docs/supabase_scripts/04_functions_triggers.sql`
3. Paste into the SQL Editor
4. Click "Run" to execute the script

## 4. Verify Schema Setup

1. Navigate to the "Table Editor" in the left sidebar
2. Verify that all tables are created with the correct columns
3. Check that RLS is enabled on all tables (indicated by a shield icon)
4. Verify indexes by running:
   ```sql
   SELECT tablename, indexname, indexdef
   FROM pg_indexes
   WHERE schemaname = 'public'
   ORDER BY tablename, indexname;
   ```

## 5. Set Up API Access

1. Navigate to the "Settings" → "API" section
2. Note your API URL and anon/public key
3. These will be used to configure the Supabase client in your application

## 6. Configure Authentication (Optional)

If you plan to use user authentication:

1. Navigate to the "Authentication" section
2. Configure authentication providers as needed
3. Set up email templates and redirect URLs

## 7. Set Up Storage Buckets (Optional)

For storing images:

1. Navigate to the "Storage" section
2. Create a new bucket called "story-images"
3. Set up appropriate bucket policies

## 8. Connect Your Application

Update your application to use Supabase by:

1. Installing the Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Initializing the client in your application:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = 'YOUR_SUPABASE_URL'
   const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
   const supabase = createClient(supabaseUrl, supabaseKey)
   ```

3. Using the client to query data:
   ```typescript
   const { data, error } = await supabase
     .from('stories')
     .select('*')
   ```

## 9. Migrate Existing Data

After setting up the schema, you'll need to migrate your existing story data:

1. Create a migration script to convert your current JSON/TypeScript data to SQL inserts
2. Execute the migration script to populate the database
3. Verify the data has been correctly migrated

## 10. Troubleshooting

If you encounter any issues:

- Check the Supabase logs in the "Logs" section
- Verify that all extensions are properly enabled
- Ensure your SQL scripts executed without errors
- Check that your application has the correct API credentials
