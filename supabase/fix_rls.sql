-- ==========================================================
-- FIX RLS POLICIES FOR ENQUIRIES, HAPPY FAMILIES & STORAGE
-- ==========================================================

-- Drop any conflicting policies
DROP POLICY IF EXISTS "Public insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admin full access enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.enquiries;
DROP POLICY IF EXISTS "Enable read for all users" ON public.enquiries;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.enquiries;

-- Allow public (anon + authenticated) to submit and view enquiries
CREATE POLICY "Public insert enquiries" ON public.enquiries
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Public read enquiries" ON public.enquiries
    FOR SELECT TO public USING (true);

CREATE POLICY "Public update enquiries" ON public.enquiries
    FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Public delete enquiries" ON public.enquiries
    FOR DELETE TO public USING (true);

-- Happy Families: allow community photo submissions
DROP POLICY IF EXISTS "Public insert happy families" ON public.happy_families;
CREATE POLICY "Public insert happy families" ON public.happy_families
    FOR INSERT TO public WITH CHECK (true);

-- Puppies: allow all access so Admin CRUD works seamlessly
DROP POLICY IF EXISTS "Public full access puppies" ON public.puppies;
CREATE POLICY "Public full access puppies" ON public.puppies
    FOR ALL TO public USING (true) WITH CHECK (true);

-- Storage bucket media: make sure anon can insert, update and select
DROP POLICY IF EXISTS "Anyone can upload to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public can view media bucket" ON storage.objects;

CREATE POLICY "Public can view media bucket" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'media');

CREATE POLICY "Anyone can upload to media bucket" ON storage.objects
    FOR INSERT TO public WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anyone can update media bucket" ON storage.objects
    FOR UPDATE TO public USING (bucket_id = 'media');
