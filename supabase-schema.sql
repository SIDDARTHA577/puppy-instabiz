-- ==========================================================
-- TEDDYPUPS U.A.E. SUPABASE DATABASE SCHEMA & INITIAL SEED
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Puppies Table
CREATE TABLE IF NOT EXISTS public.puppies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    breed TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('Boy', 'Girl', 'boy', 'girl')),
    age TEXT NOT NULL,
    location_type TEXT NOT NULL DEFAULT 'local' CHECK (location_type IN ('local', 'imported')),
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'gone_home')),
    price TEXT DEFAULT 'Price on inquiry',
    wash TEXT DEFAULT '#f2be6b',
    tilt TEXT DEFAULT '0deg',
    cover_image TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    features TEXT[] DEFAULT ARRAY['Vaccinated', 'Dewormed', 'Verified health certificate from licensed vets', 'Thoroughly checked before joining your family'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Puppy Additional Media Table
CREATE TABLE IF NOT EXISTS public.puppy_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    puppy_id UUID REFERENCES public.puppies(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Happy Families Table
CREATE TABLE IF NOT EXISTS public.happy_families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    client_name TEXT NOT NULL,
    location TEXT DEFAULT 'Dubai, UAE',
    story TEXT,
    image_url TEXT NOT NULL,
    puppy_name TEXT,
    breed TEXT,
    tilt TEXT DEFAULT '0deg',
    tape TEXT DEFAULT '#f6d79a',
    date TEXT DEFAULT '2026',
    is_featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    puppy_id UUID REFERENCES public.puppies(id) ON DELETE SET NULL,
    puppy_name TEXT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    area TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

ALTER TABLE public.puppies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.puppy_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.happy_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read available puppies, happy families, and settings
CREATE POLICY "Public puppies read access" ON public.puppies
    FOR SELECT USING (true);

CREATE POLICY "Public puppy media read access" ON public.puppy_media
    FOR SELECT USING (true);

CREATE POLICY "Public happy families read access" ON public.happy_families
    FOR SELECT USING (true);

CREATE POLICY "Public site settings read access" ON public.site_settings
    FOR SELECT USING (true);

-- Anyone can submit an enquiry form
CREATE POLICY "Public insert enquiries" ON public.enquiries
    FOR INSERT WITH CHECK (true);

-- Authenticated Admin full access to everything
CREATE POLICY "Admin full access puppies" ON public.puppies
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access puppy_media" ON public.puppy_media
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access happy_families" ON public.happy_families
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access enquiries" ON public.enquiries
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access site_settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- STORAGE BUCKETS SETUP
-- ==========================================================

-- Insert storage bucket 'media' for puppy photos and happy family memories
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage public read policy
CREATE POLICY "Public can view media bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'media');

-- Public and authenticated upload policy for media bucket
CREATE POLICY "Anyone can upload to media bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'media');

CREATE POLICY "Admin can update media bucket" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'media');

CREATE POLICY "Admin can delete from media bucket" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'media');

-- ==========================================================
-- DEFAULT SITE SETTINGS SEED
-- ==========================================================

INSERT INTO public.site_settings (key, value) VALUES
('contact_info', '{
    "phone": "+971541676733",
    "whatsapp": "+971541676733",
    "email": "teddypupsadmin@gmail.com",
    "address": "Downtown Dubai, United Arab Emirates",
    "hours": "Open 7 Days a week: 10:00 AM - 10:00 PM"
}'::jsonb),
('social_links', '{
    "instagram": "https://www.instagram.com/teddypups.worldwide/",
    "tiktok": "https://www.tiktok.com/@teddypupsuae",
    "facebook": "https://www.facebook.com/profile.php?id=61567496944539"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
