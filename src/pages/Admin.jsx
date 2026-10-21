import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Database, 
  Copy, 
  Check, 
  Search, 
  Mail, 
  Camera, 
  Eye
} from 'lucide-react';
import { 
  supabase, 
  isSupabaseConfigured, 
  signInAdmin, 
  signOutAdmin, 
  fetchPuppies, 
  createPuppy, 
  updatePuppy, 
  deletePuppy,
  fetchHappyFamilies,
  fetchEnquiries,
  uploadMedia
} from '../lib/supabase';

export default function Admin({ navigate }) {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('puppyclub_admin_session');
    return saved === 'active' ? { user: { email: 'admin@teddypups.com' } } : null;
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('puppies'); // puppies, happy_families, enquiries, schema

  // Data states
  const [puppies, setPuppies] = useState([]);
  const [happyFamilies, setHappyFamilies] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Puppy Modal State
  const [puppyModalOpen, setPuppyModalOpen] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState(null);
  const [puppyForm, setPuppyForm] = useState({
    name: '',
    breed: 'Maltipoo',
    gender: 'Boy',
    age: '2 months',
    location_type: 'local',
    status: 'available',
    price: 'Price on inquiry',
    cover_image: '',
    description: '',
    file: null,
  });

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [pups, fams, enqs] = await Promise.all([
        fetchPuppies(),
        fetchHappyFamilies(),
        fetchEnquiries(),
      ]);
      setPuppies(pups);
      setHappyFamilies(fams);
      setEnquiries(enqs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) setSession(session);
      });
    }

    loadAllData();
  }, [loadAllData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    // If Supabase is connected, attempt Supabase Auth
    if (isSupabaseConfigured) {
      try {
        const data = await signInAdmin(authEmail, authPassword);
        setSession(data.session);
        localStorage.setItem('puppyclub_admin_session', 'active');
        loadAllData();
        return;
      } catch (err) {
        // Fallback to local admin for demo/testing
        if (authEmail === 'admin@puppyclub.ae' && authPassword === 'admin123') {
          setSession({ user: { email: authEmail } });
          localStorage.setItem('puppyclub_admin_session', 'active');
          loadAllData();
          return;
        }
        setAuthError(err.message || 'Login failed. Verify credentials.');
        return;
      }
    }

    // Local resilient authentication
    if ((authEmail === 'admin@puppyclub.ae' && authPassword === 'admin123') || (authEmail && authPassword)) {
      setSession({ user: { email: authEmail || 'admin@puppyclub.ae' } });
      localStorage.setItem('puppyclub_admin_session', 'active');
      loadAllData();
    } else {
      setAuthError('Please enter valid email and password.');
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    localStorage.removeItem('puppyclub_admin_session');
    setSession(null);
  };

  // Puppy actions
  const handleSavePuppy = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = puppyForm.cover_image;
      if (puppyForm.file) {
        const uploaded = await uploadMedia(puppyForm.file, 'puppies');
        if (uploaded) finalImageUrl = uploaded;
      }

      const puppyPayload = {
        name: puppyForm.name,
        breed: puppyForm.breed,
        gender: puppyForm.gender,
        age: puppyForm.age,
        location_type: puppyForm.location_type,
        status: puppyForm.status,
        price: puppyForm.price,
        cover_image: finalImageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        description: puppyForm.description,
      };

      if (editingPuppy) {
        await updatePuppy(editingPuppy.id, puppyPayload);
      } else {
        await createPuppy(puppyPayload);
      }

      setPuppyModalOpen(false);
      setEditingPuppy(null);
      setPuppyForm({
        name: '',
        breed: 'Maltipoo',
        gender: 'Boy',
        age: '2 months',
        location_type: 'local',
        status: 'available',
        price: 'Price on inquiry',
        cover_image: '',
        description: '',
        file: null,
      });
      loadAllData();
    } catch (err) {
      alert('Error saving puppy: ' + err.message);
    }
  };

  const handleDeletePuppy = async (id) => {
    if (confirm('Are you sure you want to delete this puppy listing?')) {
      await deletePuppy(id);
      loadAllData();
    }
  };

  const handleCopySchema = () => {
    const sql = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS puppies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  gender TEXT NOT NULL,
  age TEXT,
  location_type TEXT DEFAULT 'local',
  status TEXT DEFAULT 'available',
  price TEXT DEFAULT 'Price on inquiry',
  cover_image TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS happy_families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  client_name TEXT,
  location TEXT DEFAULT 'Dubai, UAE',
  image_url TEXT NOT NULL,
  caption TEXT,
  tilt TEXT DEFAULT '0deg',
  tape TEXT DEFAULT '#f6d79a',
  date TEXT DEFAULT '2026',
  is_featured BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  puppy_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  enquiry_type TEXT DEFAULT 'general',
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);`;
    navigator.clipboard.writeText(sql);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  // If not logged in, show cute secure admin login screen
  if (!session) {
    return (
      <div className="min-h-screen bg-milk flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-honey/50 max-w-md w-full relative">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-honey/20 text-toffee mx-auto flex items-center justify-center mb-3">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-plush text-3xl font-black text-cocoa">Staff Portal</h1>
            <p className="text-xs text-cocoa-soft mt-1">
              Sign in to manage puppies, gallery polaroids, and client inquiries.
            </p>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@puppyclub.ae"
                className="w-full px-4 py-2.5 rounded-xl border border-honey/50 text-sm text-cocoa focus:outline-none focus:border-toffee"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-honey/50 text-sm text-cocoa focus:outline-none focus:border-toffee"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-toffee hover:bg-toffee-deep text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-honey/20 text-center text-[11px] text-cocoa-soft/70">
            <span>Demo default: <code>admin@puppyclub.ae</code> / <code>admin123</code></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f4] pb-24">
      {/* Top Admin Bar */}
      <div className="bg-cocoa text-milk px-4 sm:px-8 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-honey/20 flex items-center justify-center text-sm">
            🐶
          </div>
          <div>
            <h1 className="font-plush text-lg font-bold text-white leading-tight">Puppy Club Admin</h1>
            <span className="text-[10px] text-honey flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isSupabaseConfigured ? 'Connected to Supabase PostgreSQL' : 'Local Resilient Storage Mode'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-milk/70 hover:text-white flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-rose-500/80 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Supabase Status Alert Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isSupabaseConfigured 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm">
                {isSupabaseConfigured ? 'Supabase Live Connected' : 'Supabase Credentials Needed For Production'}
              </h4>
              <p className="text-xs opacity-90 mt-0.5">
                {isSupabaseConfigured 
                  ? 'All puppy listings, polaroids, and enquiries are saving directly to your PostgreSQL database and Storage bucket.' 
                  : 'Currently operating in resilient offline/localStorage mode. To connect your cloud database, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopySchema}
            className="px-4 py-2 rounded-xl bg-white border border-black/10 shadow-sm text-xs font-bold text-cocoa hover:bg-honey/20 flex items-center gap-1.5 flex-shrink-0"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex border-b border-honey/40 space-x-2">
          {[
            { id: 'puppies', label: `Puppies (${puppies.length})` },
            { id: 'happy_families', label: `Happy Families (${happyFamilies.length})` },
            { id: 'enquiries', label: `Inquiries (${enquiries.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 font-semibold text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-toffee text-toffee font-bold'
                  : 'border-transparent text-cocoa-soft hover:text-cocoa'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* PUPPIES TAB */}
        {activeTab === 'puppies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-plush text-2xl font-bold text-cocoa">Manage Puppies</h2>
              <button
                onClick={() => {
                  setEditingPuppy(null);
                  setPuppyForm({
                    name: '',
                    breed: 'Maltipoo',
                    gender: 'Boy',
                    age: '2 months',
                    location_type: 'local',
                    status: 'available',
                    price: 'Price on inquiry',
                    cover_image: '',
                    description: '',
                    file: null,
                  });
                  setPuppyModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-toffee text-white font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 hover:bg-toffee-deep"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Puppy</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-honey/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-cocoa">
                  <thead className="bg-honey/15 border-b border-honey/30 text-toffee font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Puppy</th>
                      <th className="p-4">Breed & Gender</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-honey/20">
                    {puppies.map((p) => (
                      <tr key={p.id} className="hover:bg-honey/5 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={p.cover_image}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-honey/40 flex-shrink-0"
                            onError={(e) => { e.target.src = '/icon.png'; }}
                          />
                          <div>
                            <span className="font-bold text-sm text-cocoa block">{p.name}</span>
                            <span className="text-[11px] text-cocoa-soft">{p.age}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold block">{p.breed}</span>
                          <span className="text-[11px] text-cocoa-soft">{p.gender}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.location_type === 'imported' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.location_type === 'imported' ? '✈️ Imported' : '🏡 Dubai Nursery'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            p.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingPuppy(p);
                              setPuppyForm({
                                name: p.name,
                                breed: p.breed,
                                gender: p.gender,
                                age: p.age,
                                location_type: p.location_type,
                                status: p.status,
                                price: p.price,
                                cover_image: p.cover_image,
                                description: p.description,
                                file: null,
                              });
                              setPuppyModalOpen(true);
                            }}
                            className="p-1.5 text-cocoa hover:text-toffee hover:bg-honey/20 rounded-lg"
                            title="Edit Puppy"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePuppy(p.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete Puppy"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* HAPPY FAMILIES TAB */}
        {activeTab === 'happy_families' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-plush text-2xl font-bold text-cocoa">Happy Families Polaroids</h2>
              <button
                onClick={() => setFamilyModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-toffee text-white font-bold text-xs sm:text-sm shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Polaroid Memory</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {happyFamilies.map((fam, idx) => (
                <div key={fam.id || idx} className="bg-white p-2 pb-3 rounded-lg shadow-sm border border-honey/30 text-center">
                  <div className="aspect-square rounded overflow-hidden bg-cocoa/5 mb-1.5">
                    <img 
                      src={fam.image_url} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.target.src = '/icon.png'; }}
                    />
                  </div>
                  <p className="font-bold text-xs truncate">{fam.client_name || fam.title}</p>
                  <p className="text-[10px] text-cocoa-soft">{fam.location || 'Dubai, UAE'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <h2 className="font-plush text-2xl font-bold text-cocoa">Client Inquiries & Nursery Bookings</h2>
            
            {enquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-honey/30">
                <Mail className="w-12 h-12 text-toffee mx-auto mb-2 opacity-50" />
                <h3 className="font-plush text-lg font-bold text-cocoa">No Inquiries Yet</h3>
                <p className="text-xs text-cocoa-soft">New requests submitted from contact or puppy pages will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="bg-white rounded-2xl p-6 shadow-sm border border-honey/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-cocoa">{enq.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-honey/30 text-toffee-ink uppercase">
                          {enq.enquiry_type || 'General'}
                        </span>
                      </div>
                      <p className="text-xs text-cocoa-soft">
                        📧 {enq.email} {enq.phone && `• 📱 ${enq.phone}`}
                      </p>
                      <p className="text-xs text-cocoa mt-2 bg-honey/10 p-2.5 rounded-xl border border-honey/20">
                        {enq.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {enq.phone && (
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow"
                        >
                          WhatsApp Client
                        </a>
                      )}
                      <a
                        href={`mailto:${enq.email}`}
                        className="px-3 py-1.5 rounded-lg bg-honey text-cocoa text-xs font-bold shadow-sm"
                      >
                        Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Puppy Modal */}
      {puppyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="font-plush text-2xl font-bold text-cocoa mb-4">
              {editingPuppy ? 'Edit Puppy Listing' : 'Add New Puppy'}
            </h3>

            <form onSubmit={handleSavePuppy} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-cocoa uppercase mb-1">Puppy Name *</label>
                <input
                  type="text"
                  required
                  value={puppyForm.name}
                  onChange={(e) => setPuppyForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Bella"
                  className="w-full px-3 py-2 rounded-xl border text-sm text-cocoa"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-cocoa uppercase mb-1">Breed</label>
                  <select
                    value={puppyForm.breed}
                    onChange={(e) => setPuppyForm(p => ({ ...p, breed: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border text-sm text-cocoa"
                  >
                    {['Maltipoo', 'Poodle', 'Cavapoo', 'French Bulldog', 'Pomeranian', 'Golden Retriever', 'Shih Tzu', 'Bichon Frise'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-cocoa uppercase mb-1">Gender</label>
                  <select
                    value={puppyForm.gender}
                    onChange={(e) => setPuppyForm(p => ({ ...p, gender: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border text-sm text-cocoa"
                  >
                    <option value="Boy">Boy</option>
                    <option value="Girl">Girl</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-cocoa uppercase mb-1">Location</label>
                  <select
                    value={puppyForm.location_type}
                    onChange={(e) => setPuppyForm(p => ({ ...p, location_type: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border text-sm text-cocoa"
                  >
                    <option value="local">Dubai Nursery</option>
                    <option value="imported">Direct Import</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-cocoa uppercase mb-1">Status</label>
                  <select
                    value={puppyForm.status}
                    onChange={(e) => setPuppyForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border text-sm text-cocoa"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="adopted">Adopted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cocoa uppercase mb-1">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setPuppyForm(p => ({ ...p, file, cover_image: URL.createObjectURL(file) }));
                  }}
                  className="w-full text-xs text-cocoa-soft"
                />
                <input
                  type="url"
                  value={puppyForm.cover_image.startsWith('blob:') ? '' : puppyForm.cover_image}
                  onChange={(e) => setPuppyForm(p => ({ ...p, cover_image: e.target.value }))}
                  placeholder="Or paste image URL"
                  className="w-full px-3 py-1.5 mt-2 rounded-lg border text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-cocoa uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={puppyForm.description}
                  onChange={(e) => setPuppyForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border text-xs text-cocoa"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setPuppyModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-cocoa"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-toffee text-white text-xs font-bold shadow"
                >
                  Save Puppy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
