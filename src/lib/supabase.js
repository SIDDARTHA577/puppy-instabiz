import { createClient } from '@supabase/supabase-js';
import initialPuppies from '../data/puppies.json';
import initialFamilies from '../data/happy-families.json';
import initialFaqs from '../data/faqs.json';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('xyzcompany')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage Keys for local fallback mode
const STORAGE_KEYS = {
  PUPPIES: 'teddypups_puppies',
  FAMILIES: 'teddypups_families',
  ENQUIRIES: 'teddypups_enquiries',
  FAQS: 'teddypups_faqs',
  ADMIN_SESSION: 'teddypups_admin_session'
};

// Initialize localStorage fallback with parsed live data
function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PUPPIES)) {
    localStorage.setItem(STORAGE_KEYS.PUPPIES, JSON.stringify(initialPuppies));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAMILIES)) {
    localStorage.setItem(STORAGE_KEYS.FAMILIES, JSON.stringify(initialFamilies));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAQS)) {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(initialFaqs));
  }
}

initLocalStorage();

// ==========================================
// PUPPY API METHODS
// ==========================================

export async function getPuppies({ breed, gender, location_type, status, search } = {}) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('puppies').select('*').order('created_at', { ascending: false });
      if (breed && breed !== 'all') query = query.ilike('breed', `%${breed}%`);
      if (gender && gender !== 'all') query = query.ilike('gender', gender);
      if (location_type && location_type !== 'all') query = query.eq('location_type', location_type);
      if (status && status !== 'all') query = query.eq('status', status);
      if (search) query = query.or(`name.ilike.%${search}%,breed.ilike.%${search}%`);

      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
      if (error) console.warn('Supabase getPuppies query error, falling back to local data:', error);
    } catch (err) {
      console.warn('Supabase query failed, falling back to local data:', err);
    }
  }

  // Local fallback
  let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUPPIES) || '[]');
  if (!list.length) list = initialPuppies;

  if (breed && breed !== 'all') {
    list = list.filter(p => p.breed?.toLowerCase().includes(breed.toLowerCase()) || p.name?.toLowerCase().includes(breed.toLowerCase()));
  }
  if (gender && gender !== 'all') {
    list = list.filter(p => p.gender?.toLowerCase() === gender.toLowerCase());
  }
  if (location_type && location_type !== 'all') {
    list = list.filter(p => p.location_type === location_type);
  }
  if (status && status !== 'all') {
    list = list.filter(p => p.status === status);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => p.name?.toLowerCase().includes(s) || p.breed?.toLowerCase().includes(s));
  }

  return list;
}

export async function getPuppyBySlug(slug) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('puppies')
        .select('*, puppy_media(*)')
        .eq('slug', slug)
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase getPuppyBySlug failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUPPIES) || '[]');
  return list.find(p => p.slug === slug || p.id === slug) || initialPuppies.find(p => p.slug === slug || p.id === slug) || null;
}

export async function createPuppy(puppyData) {
  const newPuppy = {
    ...puppyData,
    slug: puppyData.slug || puppyData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('puppies').insert([newPuppy]).select().single();
      if (!error && data) return data;
      console.error('Supabase createPuppy error:', error);
    } catch (err) {
      console.error('Supabase createPuppy failed:', err);
    }
  }

  // Fallback to local
  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUPPIES) || '[]');
  newPuppy.id = newPuppy.slug;
  list.unshift(newPuppy);
  localStorage.setItem(STORAGE_KEYS.PUPPIES, JSON.stringify(list));
  return newPuppy;
}

export async function updatePuppy(id, updates) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('puppies')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.error('Supabase updatePuppy failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUPPIES) || '[]');
  const idx = list.findIndex(p => p.id === id || p.slug === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates, updated_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.PUPPIES, JSON.stringify(list));
    return list[idx];
  }
  return null;
}

export async function deletePuppy(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('puppies').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase deletePuppy failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUPPIES) || '[]');
  const filtered = list.filter(p => p.id !== id && p.slug !== id);
  localStorage.setItem(STORAGE_KEYS.PUPPIES, JSON.stringify(filtered));
  return true;
}

// ==========================================
// HAPPY FAMILIES API METHODS
// ==========================================

export async function getHappyFamilies() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('happy_families')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Supabase getHappyFamilies failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAMILIES) || '[]');
  return list.length ? list : initialFamilies;
}

export async function createHappyFamily(familyData) {
  const newFamily = {
    ...familyData,
    date: familyData.date || '2026',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('happy_families').insert([newFamily]).select().single();
      if (!error && data) return data;
    } catch (err) {
      console.error('Supabase createHappyFamily failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAMILIES) || '[]');
  newFamily.id = 'family-' + Date.now();
  list.unshift(newFamily);
  localStorage.setItem(STORAGE_KEYS.FAMILIES, JSON.stringify(list));
  return newFamily;
}

export async function deleteHappyFamily(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('happy_families').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase deleteHappyFamily failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAMILIES) || '[]');
  const filtered = list.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEYS.FAMILIES, JSON.stringify(filtered));
  return true;
}

// ==========================================
// ENQUIRIES API METHODS
// ==========================================

export async function createEnquiry(enquiryData) {
  const newEnquiry = {
    ...enquiryData,
    status: 'new',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      // Try invoking the edge function first
      const { data: fnData, error: fnError } = await supabase.functions.invoke('handle-enquiry', {
        body: enquiryData
      });
      if (!fnError && fnData?.enquiry) {
        return fnData.enquiry;
      }

      // Direct Supabase table insert
      const { data, error } = await supabase.from('enquiries').insert([newEnquiry]).select().single();
      if (!error && data) return data;
      if (error) console.warn('Direct enquiries table insert error:', error);
    } catch (err) {
      console.error('Supabase createEnquiry failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
  newEnquiry.id = 'enquiry-' + Date.now();
  list.unshift(newEnquiry);
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
  return newEnquiry;
}

export async function getEnquiries() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase getEnquiries failed:', err);
    }
  }

  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
}

export async function updateEnquiryStatus(id, status) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    } catch (err) {
      console.error('Supabase updateEnquiryStatus failed:', err);
    }
  }

  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
  const idx = list.findIndex(e => e.id === id);
  if (idx !== -1) {
    list[idx].status = status;
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
    return list[idx];
  }
  return null;
}

// ==========================================
// MEDIA STORAGE UPLOAD
// ==========================================

export async function uploadMedia(file, bucket = 'media') {
  if (isSupabaseConfigured && supabase) {
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return publicUrlData.publicUrl;
      }
      console.warn('Supabase upload error, using local FileReader:', error);
    } catch (err) {
      console.warn('Supabase upload failed, using local FileReader:', err);
    }
  }

  // Fallback to Base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

export async function loginAdmin(email, password) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (!error && data.session) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(data.session));
        return { success: true, session: data.session };
      }
      return { success: false, error: error?.message || 'Login failed' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // Fallback demo admin authentication
  if ((email === 'admin@teddypups.com' || email === 'teddypupsadmin@gmail.com') && password === 'admin123') {
    const mockSession = {
      user: { email, role: 'admin', id: 'admin-demo-id' },
      access_token: 'mock-token-demo'
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(mockSession));
    return { success: true, session: mockSession };
  }

  return { success: false, error: 'Invalid admin credentials. Use admin@teddypups.com / admin123 for demo mode.' };
}

export async function logoutAdmin() {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
  }
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  return true;
}

export function getAdminSession() {
  const sessionStr = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  if (!sessionStr) return null;
  try {
    return JSON.parse(sessionStr);
  } catch (e) {
    return null;
  }
}

// Convenience alias exports matching page imports
export const fetchPuppies = getPuppies;
export const fetchPuppyBySlug = getPuppyBySlug;
export const fetchHappyFamilies = getHappyFamilies;
export const submitEnquiry = createEnquiry;
export const fetchEnquiries = getEnquiries;
export const signInAdmin = loginAdmin;
export const signOutAdmin = logoutAdmin;
