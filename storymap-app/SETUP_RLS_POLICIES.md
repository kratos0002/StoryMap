# Supabase RLS Policy Setup for HyperBrowser Story Collection

To allow the HyperBrowser story collection script to insert data into your Supabase database, you need to create RLS policies that allow the `anon` role to insert data.

## 🔧 **How to Apply These Policies:**

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the SQL commands below
4. Click **Run** to execute them

## 📝 **SQL Commands to Run:**

```sql
-- Allow anon users to insert and select stories
CREATE POLICY "Allow anon insert stories" ON public.stories
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon select stories" ON public.stories
FOR SELECT TO anon
USING (true);

-- Allow anon users to insert and select authors
CREATE POLICY "Allow anon insert authors" ON public.authors
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon select authors" ON public.authors
FOR SELECT TO anon
USING (true);

-- Allow anon users to insert and select locations
CREATE POLICY "Allow anon insert locations" ON public.locations
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon select locations" ON public.locations
FOR SELECT TO anon
USING (true);

-- Allow anon users to insert and select themes
CREATE POLICY "Allow anon insert themes" ON public.themes
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon select themes" ON public.themes
FOR SELECT TO anon
USING (true);

-- Allow anon users to insert relationship tables
CREATE POLICY "Allow anon insert story_authors" ON public.story_authors
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon insert story_locations" ON public.story_locations
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon insert story_themes" ON public.story_themes
FOR INSERT TO anon
WITH CHECK (true);

-- Allow anon users to select relationship tables
CREATE POLICY "Allow anon select story_authors" ON public.story_authors
FOR SELECT TO anon
USING (true);

CREATE POLICY "Allow anon select story_locations" ON public.story_locations
FOR SELECT TO anon
USING (true);

CREATE POLICY "Allow anon select story_themes" ON public.story_themes
FOR SELECT TO anon
USING (true);
```

## ⚠️ **Security Note:**

These policies allow anonymous users to insert data into your database. This is fine for the story collection script, but you may want to:

1. **Restrict by IP** (if possible) to only allow your collection script
2. **Add time-based restrictions** to only allow insertions during collection periods
3. **Remove these policies** after collection is complete and add more restrictive ones

## 🧪 **Test the Setup:**

After applying these policies, run:

```bash
npm run collect:test
```

The test should now pass without RLS errors.

## 🚀 **Run Collection:**

Once the policies are applied, run:

```bash
npm run collect:stories
```

The stories should now be successfully stored in your database! 