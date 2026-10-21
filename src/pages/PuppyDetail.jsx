import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Award, 
  FileText, 
  Send, 
  ChevronLeft,
  ChevronRight,
  Package,
  Activity,
  UserCheck
} from 'lucide-react';
import { fetchPuppyBySlug, fetchPuppies, submitEnquiry } from '../lib/supabase';

export default function PuppyDetail({ slug, navigate }) {
  const [puppy, setPuppy] = useState(null);
  const [similarPuppies, setSimilarPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    visitDate: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchPuppyBySlug(slug);
    setPuppy(data);

    const all = await fetchPuppies();
    setSimilarPuppies(all.filter(p => p.slug !== slug).slice(0, 3));
    setLoading(false);
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.email) return;
    setSubmitting(true);

    try {
      await submitEnquiry({
        puppy_id: puppy?.id,
        name: enquiryForm.name,
        email: enquiryForm.email,
        phone: enquiryForm.phone,
        enquiry_type: 'puppy_adoption',
        message: `Inquiry for ${puppy?.name} (${puppy?.breed}). Requested Visit Date: ${enquiryForm.visitDate || 'Flexible'}. Notes: ${enquiryForm.message}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send enquiry. Please contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-milk flex flex-col items-center justify-center p-8">
        <div className="text-5xl animate-bounce mb-3">🐶</div>
        <p className="font-plush text-xl text-cocoa">Waking up the puppy...</p>
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="min-h-screen bg-milk flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-plush text-3xl font-bold text-cocoa mb-3">Puppy Not Found</h2>
        <p className="text-cocoa-soft mb-6">This puppy might have found their forever family or the link is expired.</p>
        <button
          onClick={() => navigate('/puppies')}
          className="px-6 py-3 rounded-full bg-toffee text-white font-bold"
        >
          Browse All Available Puppies
        </button>
      </div>
    );
  }

  // Build media gallery list
  const mediaList = puppy.puppy_media && puppy.puppy_media.length > 0
    ? puppy.puppy_media.map(m => m.media_url)
    : [puppy.cover_image];

  return (
    <div className="min-h-screen bg-[#fffdf8] pt-24 pb-28 relative select-none">
      {/* Top Breadcrumb with Amber Bookmark Ribbon */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2">
          {/* Bookmark Ribbon */}
          <div className="w-5 h-8 bg-[#a24a1a] shadow-xs mr-2 -mt-4 rounded-b-xs" />
          <nav className="font-scrawl text-sm text-cocoa-soft/80 flex items-center gap-2">
            <button onClick={() => navigate('/puppies')} className="hover:text-toffee underline font-bold">
              Available puppies
            </button>
            <span>/</span>
            <span className="font-bold text-cocoa">{puppy.name}</span>
          </nav>
        </div>

        {/* Section Numbered Badge: ① hello, it's me */}
        <div className="flex items-center gap-2 mt-4">
          <span className="w-7 h-7 rounded-full border-2 border-cocoa flex items-center justify-center font-scrawl text-sm font-bold text-cocoa">
            1
          </span>
          <span className="font-scrawl text-lg font-bold text-cocoa">
            hello, it's me
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Columns Layout: Left Stacked Photo Album, Right Sticky Adoption Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Stacked Sketchbook Photo Frame */}
          <div className="lg:col-span-7 space-y-10">
            {/* Stacked Album Photo Frame */}
            <div className="relative">
              {/* Backing paper page 2 */}
              <div className="absolute inset-0 border-2 border-cocoa rounded-3xl bg-white transform translate-x-2 translate-y-2 pointer-events-none" />
              {/* Backing paper page 1 */}
              <div className="absolute inset-0 border-2 border-cocoa rounded-3xl bg-[#fffcf5] transform translate-x-1 translate-y-1 pointer-events-none" />

              {/* Main Top Frame */}
              <div className="relative border-2 border-cocoa rounded-3xl overflow-hidden bg-white p-3 sm:p-4 shadow-sm z-10">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-cocoa/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeMediaIndex}
                      initial={{ opacity: 0.2, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      src={mediaList[activeMediaIndex] || puppy.cover_image}
                      alt={puppy.name}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

                {/* Thumbnail Strip */}
                {mediaList.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pt-3">
                    {mediaList.map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveMediaIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                          activeMediaIndex === idx 
                            ? 'border-toffee scale-95 shadow-xs' 
                            : 'border-cocoa/20 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={m} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chapter 1: Nursery Diary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cocoa/20 shadow-xs">
              <span className="font-scrawl text-xs font-bold text-toffee uppercase tracking-wider block mb-1">
                Chapter 1: Nursery Diary
              </span>
              <h2 className="font-plush text-3xl font-black text-cocoa mb-3">
                About {puppy.name}
              </h2>
              <p className="text-cocoa-soft/90 leading-relaxed text-base sm:text-lg mb-6 font-normal">
                {puppy.description || `Meet ${puppy.name}: an adorable, healthy, and cheerful ${puppy.breed} puppy. Vaccinated, dewormed, and with full vet check documentation.`}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-cocoa/10">
                <div className="bg-[#faebd0]/40 rounded-2xl p-3 text-center">
                  <span className="text-xl block mb-0.5">🧸</span>
                  <span className="font-bold text-xs text-cocoa block">Super Cuddly</span>
                </div>
                <div className="bg-[#faebd0]/40 rounded-2xl p-3 text-center">
                  <span className="text-xl block mb-0.5">👶</span>
                  <span className="font-bold text-xs text-cocoa block">Kid Friendly</span>
                </div>
                <div className="bg-[#faebd0]/40 rounded-2xl p-3 text-center">
                  <span className="text-xl block mb-0.5">🎾</span>
                  <span className="font-bold text-xs text-cocoa block">Playful</span>
                </div>
              </div>
            </div>

            {/* Chapter 2: Certified Health Dossier */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cocoa/20 shadow-xs">
              <span className="font-scrawl text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Chapter 2: Certified Health Dossier
              </span>
              <h2 className="font-plush text-2xl font-black text-cocoa mb-4">
                Veterinary Check & Genetic Safety
              </h2>

              <div className="space-y-3">
                {[
                  { title: "Core Vaccinations", desc: "Up-to-date with DHPP / Parvo / Distemper vaccines" },
                  { title: "ISO Standard Microchip", desc: "15-digit international microchip with registration certificate" },
                  { title: "Deworming Protocol", desc: "Broad-spectrum deworming completed in 2-week intervals" },
                  { title: "Official Health Certificate", desc: "Certified physical examination by licensed UAE veterinarians" },
                  { title: "10-Year Genetic Warranty", desc: "Full replacement guarantee against severe hereditary defects" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-honey/10 border border-honey/30">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-cocoa">{item.title}</h4>
                      <p className="text-xs text-cocoa-soft">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Adoption Card Matching Reference */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative bg-white rounded-3xl border-2 border-cocoa p-6 sm:p-8 shadow-[0_4px_0_#2a170e]">
                {/* Coin Badge on Top Left */}
                <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-[#f2be6b] border-2 border-cocoa flex items-center justify-center font-bold text-xs text-cocoa shadow-xs">
                  -
                </div>

                {/* Peeking Mascot Puppy on Top Right */}
                <div className="absolute -top-7 right-6 pointer-events-none">
                  <TeddyMascot pose="peek" className="w-16 h-16 drop-shadow-xs" />
                </div>

                {/* Dashed Inner Border */}
                <div className="border border-dashed border-cocoa/30 rounded-2xl p-5">
                  {/* Available Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdecd2] text-cocoa font-scrawl text-xs font-bold mb-3">
                    <span>🐾</span>
                    <span>Available</span>
                  </div>

                  {/* Puppy Name in Bold Retro Serif */}
                  <h1 className="font-plush text-4xl sm:text-5xl font-black text-cocoa leading-none">
                    {puppy.name}
                  </h1>
                  <p className="font-scrawl text-base text-cocoa-soft mt-1">
                    {puppy.breed}
                  </p>

                  {/* 2x2 Specs Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 my-6 pt-4 border-t border-cocoa/15 text-sm">
                    <div>
                      <span className="text-xs text-cocoa-soft/70 block">Breed</span>
                      <span className="font-bold text-cocoa text-sm">{puppy.breed}</span>
                    </div>
                    <div>
                      <span className="text-xs text-cocoa-soft/70 block">Boy or girl</span>
                      <span className="font-bold text-cocoa text-sm">{puppy.gender || 'Boy'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-cocoa-soft/70 block">Age</span>
                      <span className="font-bold text-cocoa text-sm">{puppy.age || '3 months'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-cocoa-soft/70 block">Where</span>
                      <span className="font-bold text-cocoa text-sm">
                        {puppy.location_type === 'imported' ? 'Imported for you' : 'In Dubai nursery'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'm%20asking%20about%20${encodeURIComponent(puppy.name)}%20(${puppy.breed}).%20Could%20you%20share%20current%20photos%20and%20details?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-full bg-[#1b6b45] hover:bg-[#155a39] text-white font-bold text-sm shadow-[0_3px_0_#0f4228] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0.5"
                    >
                      <span>Ask about {puppy.name} on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        const el = document.getElementById('visit-form-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 rounded-full bg-[#fff8eb] hover:bg-honey/20 border-2 border-cocoa text-cocoa font-bold text-sm shadow-[0_2px_0_#2a170e] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5"
                    >
                      Book a nursery visit
                    </button>
                  </div>
                </div>

                {/* Nursery Visit Letterform Section */}
                <div id="visit-form-section" className="mt-6 pt-5 border-t border-cocoa/15">
                  <h3 className="font-plush text-lg font-bold text-cocoa mb-1">
                    Book a Nursery Meet & Greet
                  </h3>
                  <p className="text-xs text-cocoa-soft mb-3">
                    Meet {puppy.name} in person at our Dubai nursery showroom.
                  </p>

                  {submitted ? (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                      <span className="text-2xl block mb-1">💌</span>
                      <h4 className="font-bold text-sm text-emerald-800">Visit Request Received!</h4>
                      <p className="text-xs text-emerald-600 mt-1">Our team will confirm your slot shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-2.5">
                      <input
                        type="text"
                        required
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your Full Name *"
                        className="w-full px-3.5 py-2 rounded-xl border border-cocoa/30 text-xs text-cocoa focus:border-toffee focus:outline-none bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="email"
                          required
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm(p => ({ ...p, email: e.target.value }))}
                          placeholder="Email Address *"
                          className="w-full px-3.5 py-2 rounded-xl border border-cocoa/30 text-xs text-cocoa focus:border-toffee focus:outline-none bg-white"
                        />
                        <input
                          type="tel"
                          required
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="Phone / WhatsApp *"
                          className="w-full px-3.5 py-2 rounded-xl border border-cocoa/30 text-xs text-cocoa focus:border-toffee focus:outline-none bg-white"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 rounded-full bg-toffee text-white font-bold text-xs shadow-xs hover:bg-toffee-deep transition-all"
                      >
                        {submitting ? 'Submitting...' : 'Confirm Nursery Visit Request'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Puppies Carousel */}
        {similarPuppies.length > 0 && (
          <div className="mt-20 pt-12 border-t border-honey/30">
            <h3 className="font-plush text-2xl font-bold text-cocoa mb-6">
              More Little Paws Looking For Love
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarPuppies.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => navigate(`/puppies/${sim.slug}`)}
                  className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-cocoa/5">
                    <img
                      src={sim.cover_image}
                      alt={sim.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-bold text-toffee uppercase">{sim.breed}</span>
                    <h4 className="font-plush text-lg font-bold text-cocoa group-hover:text-toffee">{sim.name}</h4>
                    <p className="text-xs text-cocoa-soft/80 mt-1 line-clamp-1">{sim.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
