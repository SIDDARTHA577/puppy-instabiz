import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPuppies } from '../lib/supabase';
import TeddyMascot from '../components/TeddyMascot';

export default function Puppies({ navigate }) {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWhere, setSelectedWhere] = useState('Everywhere');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchPuppies();
      setPuppies(data);
      setLoading(false);
    }
    load();
  }, []);

  const whereOptions = ['Everywhere', 'Imported', 'Korean Teacup'];
  const breedOptions = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];
  const genderOptions = [
    { label: 'Boys', val: 'Boy' },
    { label: 'Girls', val: 'Girl' }
  ];

  const filtered = puppies.filter((p) => {
    // Where filter
    if (selectedWhere === 'Imported' && p.location_type !== 'imported') return false;
    if (selectedWhere === 'Korean Teacup' && !p.name?.toLowerCase().includes('korean') && !p.breed?.toLowerCase().includes('korean')) return false;

    // Breed filter
    if (selectedBreed && !p.breed?.toLowerCase().includes(selectedBreed.toLowerCase()) && !p.name?.toLowerCase().includes(selectedBreed.toLowerCase())) {
      return false;
    }

    // Gender filter
    if (selectedGender && p.gender?.toLowerCase() !== selectedGender.toLowerCase()) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#fffdf8] pt-24 pb-28 relative select-none">
      {/* Sketchbook Dotted Paper Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30" 
        style={{
          backgroundImage: 'radial-gradient(#2a170e 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Row with Self-Portrait Mascot */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6"
        >
          <div>
            <p className="font-scrawl text-lg text-toffee font-bold">
              from Teddy's sketchbook
            </p>

            <div className="relative inline-block mt-1">
              <h1 className="font-plush text-5xl sm:text-7xl md:text-8xl font-black text-cocoa tracking-tight leading-none">
                Available puppies
              </h1>
              {/* Organic Brush Squiggle Underline */}
              <svg viewBox="0 0 460 26" preserveAspectRatio="none" className="absolute -bottom-3 left-0 w-full h-4 text-toffee">
                <path 
                  d="M6 14C80 20 180 8 280 18C350 24 410 14 454 16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            <p className="mt-7 text-base sm:text-lg text-cocoa-soft/85 max-w-xl font-normal leading-relaxed">
              Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
            </p>
          </div>

          {/* Self-Portrait Drawing Circle */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="hidden md:flex flex-col items-center shrink-0 cursor-pointer"
          >
            <div className="w-32 h-32 rounded-full border-2 border-cocoa bg-[#fff8eb] p-2 flex items-center justify-center shadow-sm">
              <TeddyMascot pose="sit" className="w-24 h-24" />
            </div>
            <span className="font-scrawl text-xs text-toffee font-bold mt-2">
              self-portrait 🐾
            </span>
          </motion.div>
        </motion.div>

        {/* 3-Row Filter Card Mounted with Tan Washi Tape */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative my-8"
        >
          {/* Tan Washi Tape on Top Center */}
          <div 
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#d9c7a7]/80 backdrop-blur-xs border-y border-cocoa/20 z-20 shadow-xs transform -rotate-1 pointer-events-none select-none"
            style={{
              clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 95% 0%, 100% 100%, 95% 0%, 100% 100%, 0% 100%)'
            }}
          />

          <div className="bg-[#fcf8f0] rounded-3xl border-2 border-cocoa p-6 sm:p-8 shadow-[0_4px_0_#2a170e] space-y-5">
            {/* Row 1: Where */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-scrawl text-base text-cocoa font-bold w-20 shrink-0">
                where
              </span>
              <div className="flex flex-wrap gap-2">
                {whereOptions.map((opt) => {
                  const isSelected = selectedWhere === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setSelectedWhere(opt)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1f1f1f] text-white shadow-xs'
                          : 'bg-white hover:bg-honey/20 text-cocoa border-2 border-cocoa'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 2: Breed */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-scrawl text-base text-cocoa font-bold w-20 shrink-0">
                breed
              </span>
              <div className="flex flex-wrap gap-2">
                {breedOptions.map((breed) => {
                  const isSelected = selectedBreed === breed;
                  return (
                    <button
                      key={breed}
                      onClick={() => setSelectedBreed(isSelected ? null : breed)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1f1f1f] text-white shadow-xs'
                          : 'bg-white hover:bg-honey/20 text-cocoa border-2 border-cocoa'
                      }`}
                    >
                      {breed}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Boy or Girl */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-scrawl text-base text-cocoa font-bold w-20 shrink-0">
                boy or girl
              </span>
              <div className="flex flex-wrap gap-2">
                {genderOptions.map((g) => {
                  const isSelected = selectedGender === g.val;
                  return (
                    <button
                      key={g.val}
                      onClick={() => setSelectedGender(isSelected ? null : g.val)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1f1f1f] text-white shadow-xs'
                          : 'bg-white hover:bg-honey/20 text-cocoa border-2 border-cocoa'
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Counter Heading */}
        <p className="font-scrawl text-lg font-bold text-cocoa mb-8">
          {filtered.length} puppies looking for a home
        </p>

        {/* Circular / Organic Sketch Cards Grid with Staggered Scroll Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((pup, idx) => {
            const washColors = ['#f2be6b', '#bfddf5', '#f9cdbf', '#faebd0', '#fbe3b4'];
            const wash = pup.wash || washColors[idx % washColors.length];

            return (
              <motion.div
                key={pup.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                whileHover={{ scale: 1.06 }}
                onClick={() => navigate(`/puppies/${pup.slug || pup.id}`)}
                className="group flex flex-col items-center cursor-pointer transition-transform duration-300"
              >
                {/* Circular Portrait with Watercolor Wash and Doodles */}
                <div className="relative w-40 sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 flex items-center justify-center">
                  {/* Offset Watercolor Wash Background Circle */}
                  <div 
                    className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-105 transform -translate-x-1 translate-y-1.5 opacity-90"
                    style={{ backgroundColor: wash }}
                  />

                  {/* Hand-drawn Doodles around circle */}
                  <div className="absolute -top-1 -left-1 text-toffee text-sm pointer-events-none select-none">
                    🐾
                  </div>
                  <div className="absolute -top-1 right-2 text-cocoa-soft/60 text-xs pointer-events-none select-none">
                    ••
                  </div>
                  <div className="absolute bottom-4 -left-3 text-toffee text-xs pointer-events-none select-none">
                    🌀
                  </div>
                  <div className="absolute -bottom-1 -right-1 text-toffee text-sm pointer-events-none select-none">
                    ✦
                  </div>

                  {/* Main Circular Photo Frame */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cocoa bg-white shadow-sm z-10">
                    <img
                      src={pup.cover_image}
                      alt={pup.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Available Pill Sticker on top-right */}
                    <span className="absolute top-2 right-2 font-scrawl text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-cocoa text-cocoa shadow-xs">
                      Available
                    </span>

                    {/* Video Badge on bottom-left */}
                    {pup.video_url || idx % 2 === 0 ? (
                      <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 font-scrawl text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/80 text-white shadow-xs">
                        <span>▶</span> video
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Name & Subtitle below circle */}
                <div className="mt-4 text-center">
                  <h3 className="font-plush text-xl sm:text-2xl font-black text-cocoa group-hover:text-toffee transition-colors leading-tight">
                    {pup.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cocoa-soft/80 mt-1 font-medium">
                    {pup.breed} · {pup.gender?.toLowerCase() || 'boy'} · {pup.age}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
