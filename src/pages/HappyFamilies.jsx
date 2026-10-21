import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  Calendar,
  MapPin,
  Smile
} from 'lucide-react';
import { fetchHappyFamilies, createHappyFamily, uploadMedia } from '../lib/supabase';

export default function HappyFamilies({ navigate }) {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lightbox state
  const [activePhoto, setActivePhoto] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(-1);

  // Submission Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [form, setForm] = useState({
    client_name: '',
    puppy_name: '',
    location: 'Dubai, UAE',
    caption: '',
    image_url: '',
    file: null,
  });

  useEffect(() => {
    loadFamilies();
  }, []);

  const loadFamilies = async () => {
    setLoading(false);
    const data = await fetchHappyFamilies();
    setFamilies(data);
  };

  const filteredFamilies = families.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.client_name && item.client_name.toLowerCase().includes(q)) ||
      (item.caption && item.caption.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q))
    );
  });

  const openLightbox = (item, index) => {
    setActivePhoto(item);
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
    setActivePhotoIndex(-1);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex < filteredFamilies.length - 1) {
      const nextIndex = activePhotoIndex + 1;
      setActivePhotoIndex(nextIndex);
      setActivePhoto(filteredFamilies[nextIndex]);
    } else {
      setActivePhotoIndex(0);
      setActivePhoto(filteredFamilies[0]);
    }
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex > 0) {
      const prevIndex = activePhotoIndex - 1;
      setActivePhotoIndex(prevIndex);
      setActivePhoto(filteredFamilies[prevIndex]);
    } else {
      const lastIndex = filteredFamilies.length - 1;
      setActivePhotoIndex(lastIndex);
      setActivePhoto(filteredFamilies[lastIndex]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, file, image_url: URL.createObjectURL(file) }));
    }
  };

  const handleSubmitFamily = async (e) => {
    e.preventDefault();
    if (!form.client_name) return;
    setSubmitting(true);

    try {
      let finalImageUrl = form.image_url;
      if (form.file) {
        const uploaded = await uploadMedia(form.file, 'happy-families');
        if (uploaded) finalImageUrl = uploaded;
      }

      const randomTilts = ['-2deg', '1.5deg', '-1.2deg', '2.4deg', '-3deg', '1deg'];
      const randomTapes = ['#f6d79a', '#f9cdbf', '#cfe5f6', '#e8d5b5'];

      const newEntry = {
        title: `${form.client_name} & ${form.puppy_name || 'Puppy'}`,
        client_name: form.client_name,
        location: form.location || 'Dubai, UAE',
        caption: form.caption || `Forever home moment with ${form.puppy_name || 'our new family member'}! ❤️`,
        image_url: finalImageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
        tilt: randomTilts[Math.floor(Math.random() * randomTilts.length)],
        tape: randomTapes[Math.floor(Math.random() * randomTapes.length)],
        date: new Date().getFullYear().toString(),
        is_featured: true,
      };

      await createHappyFamily(newEntry);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setModalOpen(false);
        setForm({ client_name: '', puppy_name: '', location: 'Dubai, UAE', caption: '', image_url: '', file: null });
        loadFamilies();
      }, 1800);
    } catch (err) {
      console.error(err);
      alert('Failed to submit photo. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] pt-24 pb-28 relative select-none">
      {/* Subtle Vertical Wallpaper Pinstripes Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25" 
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #2a170e 0, #2a170e 1px, transparent 1px, transparent 40px)'
        }}
      />

      {/* Header Section: Left Title & Description, Right Taped Testimonial Note */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Title & Subtitle */}
          <div className="lg:col-span-7">
            <p className="font-scrawl text-lg text-toffee font-bold mb-2">
              our wall of happy endings
            </p>

            <h1 className="font-plush text-6xl sm:text-7xl md:text-8xl font-black text-cocoa tracking-tight leading-[0.95] flex flex-wrap items-baseline gap-4">
              <span>Happy</span>
              <span className="flex items-center gap-3">
                families 
                <span className="text-toffee font-normal text-5xl sm:text-6xl select-none">♡</span>
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-cocoa-soft/85 font-normal leading-relaxed max-w-xl">
              Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
            </p>

            <p className="mt-4 font-scrawl text-xl font-bold text-toffee">
              {families.length} moments and counting
            </p>

            {/* Action Button */}
            <div className="mt-6">
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[#8a421d] hover:bg-[#743515] text-white font-bold text-xs shadow-[0_3px_0_#52230d] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 inline-flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Add Your Gotcha Day Photo</span>
              </button>
            </div>
          </div>

          {/* Right: Taped Testimonial Sticky Note */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm bg-white rounded-xl border border-cocoa/20 p-6 shadow-md transform rotate-1">
              {/* Cyan Washi Tape at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#bfddf5]/85 border border-sky-400/40 shadow-xs transform -rotate-1 opacity-90" />

              {/* Lined paper texture lines */}
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #2a170e 28px)'
                }}
              />

              <p className="relative z-10 text-xs sm:text-sm text-cocoa leading-relaxed font-serif italic">
                “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
              </p>
              <p className="relative z-10 font-scrawl text-xs font-bold text-cocoa-soft mt-4">
                Sarah M., Dubai, UAE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Polaroid Masonry Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {loading ? (
          <div className="py-20 text-center">
            <div className="text-4xl animate-bounce mb-3">🐶</div>
            <p className="font-plush text-lg text-cocoa">Developing your polaroids...</p>
          </div>
        ) : filteredFamilies.length === 0 ? (
          <div className="py-20 text-center bg-honey/10 rounded-3xl border border-dashed border-honey max-w-md mx-auto p-8">
            <Smile className="w-12 h-12 text-toffee mx-auto mb-3" />
            <h3 className="font-plush text-xl font-bold text-cocoa">No memories found</h3>
            <p className="text-sm text-cocoa-soft mt-1">Try adjusting your search terms or be the first to share one!</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-full bg-toffee text-white text-xs font-bold"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:gap-10">
            {filteredFamilies.map((item, index) => {
              const tiltDegree = item.tilt || (index % 2 === 0 ? -1.8 : 1.8);
              const tapeColor = item.tape || '#f6d79a';

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
                  whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
                  onClick={() => openLightbox(item, index)}
                  className="group relative cursor-pointer select-none"
                  style={{
                    rotate: `${tiltDegree}deg`,
                  }}
                >
                  {/* Realistic Polaroid Card */}
                  <div className="bg-white p-4 pb-6 rounded-lg shadow-md group-hover:shadow-2xl border border-black/5 transition-all duration-300">
                    {/* Washi Tape Strip */}
                    <div 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-xs opacity-85 shadow-sm transform -rotate-1 group-hover:rotate-0 transition-transform pointer-events-none"
                      style={{ backgroundColor: tapeColor }}
                    />

                    {/* Photo Container with Square/4:3 Aspect */}
                    <div className="relative aspect-square w-full bg-cocoa/5 rounded overflow-hidden mb-3.5 border border-black/5">
                      <img
                        src={item.image_url || item.photo_url}
                        alt={item.title || item.client_name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                        <span className="p-1.5 rounded-full bg-white/90 text-cocoa shadow-sm">
                          <Camera className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Handwritten Polaroid Caption */}
                    <div className="text-center px-1">
                      <p className="font-scrawl text-cocoa font-bold text-base leading-snug tracking-wide group-hover:text-toffee transition-colors">
                        {item.client_name || item.title || "Gotcha Day Moment"}
                      </p>
                      
                      <div className="mt-1 flex items-center justify-center gap-2 text-[11px] text-cocoa-soft/70">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-toffee" />
                          <span>{item.location || 'Dubai, UAE'}</span>
                        </span>
                        <span>•</span>
                        <span>{item.date || '2026'}</span>
                      </div>

                      {item.caption && (
                        <p className="mt-2 text-xs text-cocoa-soft/80 italic line-clamp-2 font-sans font-normal border-t border-honey/20 pt-1.5">
                          "{item.caption}"
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox Viewer Modal */}
      {activePhoto && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          {/* Controls */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Polaroid Preview In Lightbox */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 sm:p-6 pb-8 rounded-xl max-w-xl w-full shadow-2xl relative animate-scaleUp"
          >
            <div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 rounded opacity-90 shadow"
              style={{ backgroundColor: activePhoto.tape || '#f6d79a' }}
            />

            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-lg overflow-hidden bg-cocoa/10 mb-4 border border-black/5">
              <img
                src={activePhoto.image_url || activePhoto.photo_url}
                alt={activePhoto.title}
                className="w-full h-full object-contain bg-black/5"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80';
                }}
              />
            </div>

            <div className="text-center space-y-2">
              <h2 className="font-scrawl text-2xl font-bold text-cocoa">
                {activePhoto.client_name || activePhoto.title}
              </h2>
              
              <div className="flex items-center justify-center gap-3 text-xs text-cocoa-soft/80 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-toffee" />
                  <span>{activePhoto.location || 'Dubai, UAE'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-toffee" />
                  <span>Gotcha Day {activePhoto.date || '2026'}</span>
                </span>
              </div>

              {activePhoto.caption && (
                <p className="text-sm text-cocoa-soft italic font-sans max-w-md mx-auto pt-2 border-t border-honey/20">
                  "{activePhoto.caption}"
                </p>
              )}

              <div className="pt-4 flex items-center justify-center gap-3">
                <a
                  href={`https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20saw%20this%20photo%20of%20${encodeURIComponent(activePhoto.client_name || 'Happy Family')}%20and%20would%20love%20to%20find%20a%20similar%20puppy!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow"
                >
                  <span>Inquire About Similar Puppies</span>
                  <span>🐾</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Your Moment Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-2 border-honey/40 animate-scaleUp">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-cocoa-soft hover:bg-honey/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="inline-block p-3 rounded-full bg-honey/20 text-toffee mb-2">
                <Camera className="w-6 h-6" />
              </span>
              <h3 className="font-plush text-2xl font-bold text-cocoa">Share Your Gotcha Moment</h3>
              <p className="text-xs sm:text-sm text-cocoa-soft/80 mt-1">
                Pin your puppy's homecoming polaroid to the official Puppy Club Wall of Joy!
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-plush text-xl font-bold text-cocoa">Photo Pinned to the Wall!</h4>
                <p className="text-sm text-cocoa-soft">Thank you for sharing your love story with us! 🐾</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFamily} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                    Your Name / Family Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.client_name}
                    onChange={(e) => setForm(p => ({ ...p, client_name: e.target.value }))}
                    placeholder="e.g. The Anderson Family or Sarah M."
                    className="w-full px-4 py-2.5 rounded-xl border border-honey/50 focus:border-toffee focus:outline-none text-sm text-cocoa"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                      Puppy Name
                    </label>
                    <input
                      type="text"
                      value={form.puppy_name}
                      onChange={(e) => setForm(p => ({ ...p, puppy_name: e.target.value }))}
                      placeholder="e.g. Milo"
                      className="w-full px-4 py-2.5 rounded-xl border border-honey/50 focus:border-toffee focus:outline-none text-sm text-cocoa"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))}
                      placeholder="e.g. Dubai Marina"
                      className="w-full px-4 py-2.5 rounded-xl border border-honey/50 focus:border-toffee focus:outline-none text-sm text-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                    Upload Photo or Paste Image URL *
                  </label>
                  <div className="flex gap-2">
                    <label className="flex-1 border-2 border-dashed border-honey/60 hover:border-toffee rounded-xl p-3 text-center cursor-pointer transition-colors flex items-center justify-center gap-2 bg-honey/5">
                      <Upload className="w-4 h-4 text-toffee" />
                      <span className="text-xs font-semibold text-cocoa truncate">
                        {form.file ? form.file.name : "Select Image File"}
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={form.image_url.startsWith('blob:') ? '' : form.image_url}
                    onChange={(e) => setForm(p => ({ ...p, image_url: e.target.value }))}
                    placeholder="Or paste an image URL..."
                    className="w-full px-3 py-1.5 mt-2 rounded-lg border border-honey/40 text-xs text-cocoa focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-1">
                    Caption / Memory
                  </label>
                  <textarea
                    rows={2}
                    value={form.caption}
                    onChange={(e) => setForm(p => ({ ...p, caption: e.target.value }))}
                    placeholder="Tell us a sweet detail about your puppy's first days at home..."
                    className="w-full px-4 py-2 rounded-xl border border-honey/50 focus:border-toffee focus:outline-none text-sm text-cocoa resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-toffee hover:bg-toffee-deep text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Taping your photo to the wall...</span>
                  ) : (
                    <>
                      <span>Submit Polaroid Memory</span>
                      <span>🐾</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
