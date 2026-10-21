import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeddyMascot from '../components/TeddyMascot';
import Flight from '../components/Flight';

export default function HowItWorks({ navigate }) {
  const [activeMode, setActiveMode] = useState('dubai'); // 'dubai' | 'imported'

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -90 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] pt-24 pb-28 relative select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-cocoa/15"
        >
          <h1 className="font-plush text-6xl sm:text-7xl md:text-8xl font-black text-cocoa tracking-tight leading-none">
            How it works
          </h1>
          <p className="text-base sm:text-lg text-cocoa-soft/85 max-w-md font-normal leading-relaxed">
            Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
          </p>
        </motion.div>

        {/* Quick Nav Jump Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-3 py-8 border-b border-cocoa/15"
        >
          {[
            { id: 'two-ways', label: '1 Two ways home' },
            { id: 'puppy-promise', label: '2 Our premium puppy promise' },
            { id: 'delivery', label: '3 Delivery & collection' },
            { id: 'why-choose-us', label: '4 Why choose us' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => jumpTo(item.id)}
              className="px-5 py-2.5 rounded-full border-2 border-cocoa bg-white hover:bg-honey/20 text-cocoa font-scrawl text-sm font-bold shadow-[0_2px_0_#2a170e] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Section 1: Two Ways Home */}
        <motion.section 
          id="two-ways" 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="pt-14 pb-16"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div>
              <p className="font-scrawl text-base text-toffee font-bold">
                choose your way
              </p>
              <h2 className="font-plush text-4xl sm:text-5xl font-black text-cocoa mt-1">
                Two ways home
              </h2>
            </div>

            {/* Segmented Toggle with Mascot sitting on the right */}
            <div className="flex items-center gap-4">
              <div className="inline-flex p-1.5 rounded-full border-2 border-cocoa bg-white shadow-[0_3px_0_#2a170e]">
                <button
                  onClick={() => setActiveMode('dubai')}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeMode === 'dubai'
                      ? 'bg-[#8a421d] text-white shadow-xs'
                      : 'text-cocoa hover:text-toffee'
                  }`}
                >
                  <span className="block font-plush text-sm">In Dubai</span>
                  <span className="block text-[10px] font-normal opacity-85">meet in person</span>
                </button>

                <button
                  onClick={() => setActiveMode('imported')}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeMode === 'imported'
                      ? 'bg-[#8a421d] text-white shadow-xs'
                      : 'text-cocoa hover:text-toffee'
                  }`}
                >
                  <span className="block font-plush text-sm">Imported</span>
                  <span className="block text-[10px] font-normal opacity-85">order upon request</span>
                </button>
              </div>

              {/* Sitting Mascot */}
              <div className="shrink-0 hidden sm:block">
                <TeddyMascot pose="sit" className="w-16 h-16" />
              </div>
            </div>
          </div>

          {/* Mode Card Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            {activeMode === 'dubai' ? (
              <motion.div 
                key="dubai"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-[#fffcf5] rounded-3xl border-2 border-cocoa p-8 sm:p-12 shadow-[0_4px_0_#2a170e]"
              >
                <span className="font-scrawl text-sm font-bold text-toffee block mb-2">
                  Downtown Dubai Showroom
                </span>
                <h3 className="font-plush text-3xl sm:text-4xl font-black text-cocoa mb-4">
                  Meet your puppy in person
                </h3>
                <p className="text-cocoa-soft/90 max-w-2xl text-base sm:text-lg mb-8 leading-relaxed">
                  Visit our serene nursery lounge in Dubai. Bond with the puppies in a relaxed, hygienic setting with your family before choosing your soul companion.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border-2 border-cocoa/20 p-5 shadow-xs">
                    <span className="font-scrawl text-lg font-bold text-toffee block mb-1">Step 01</span>
                    <h4 className="font-plush text-lg font-bold text-cocoa mb-1">Pick Your Favorite</h4>
                    <p className="text-xs text-cocoa-soft">Browse available pups online or let our team curate options based on your lifestyle.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border-2 border-cocoa/20 p-5 shadow-xs">
                    <span className="font-scrawl text-lg font-bold text-toffee block mb-1">Step 02</span>
                    <h4 className="font-plush text-lg font-bold text-cocoa mb-1">Private Nursery Cuddle</h4>
                    <p className="text-xs text-cocoa-soft">Book a 30-minute private nursery session. Interact with the pup and inspect vet paperwork.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border-2 border-cocoa/20 p-5 shadow-xs">
                    <span className="font-scrawl text-lg font-bold text-toffee block mb-1">Step 03</span>
                    <h4 className="font-plush text-lg font-bold text-cocoa mb-1">Same-Day Homecoming</h4>
                    <p className="text-xs text-cocoa-soft">Take your puppy home immediately with their complete starter kit and health passport.</p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="imported"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-[#f0f8ff] rounded-3xl border-2 border-cocoa p-8 sm:p-12 shadow-[0_4px_0_#2a170e]"
              >
                <span className="font-scrawl text-sm font-bold text-sky-800 block mb-2">
                  Global Ethical Import Program
                </span>
                <h3 className="font-plush text-3xl sm:text-4xl font-black text-cocoa mb-4">
                  Bespoke Rare Breeds Delivered
                </h3>
                <p className="text-cocoa-soft/90 max-w-2xl text-base sm:text-lg mb-4 leading-relaxed">
                  Looking for a Korean Teacup Maltipoo, Micro Poodle, or specific pedigree? We handle 100% of the selection, health clearance, and in-cabin flight travel.
                </p>

                {/* Animated Flight Path from Korea to Dubai */}
                <Flight />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border-2 border-cocoa/20 p-5 shadow-xs">
                    <span className="font-scrawl text-lg font-bold text-sky-700 block mb-1">Step 01</span>
                    <h4 className="font-plush text-lg font-bold text-cocoa mb-1">Live Video Matching</h4>
                    <p className="text-xs text-cocoa-soft">Connect via video call with our international ethical partner breeders in Korea & Europe.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border-2 border-cocoa/20 p-5 shadow-xs">
                    <span className="font-scrawl text-lg font-bold text-sky-700 block mb-1">Step 02</span>
                    <h4 className="font-plush text-lg font-bold text-cocoa mb-1">UAE Ministry Permits</h4>
                    <p className="text-xs text-cocoa-soft">We secure official MOCCAE import permits, rabies antibody tests, and health clearance.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border-2 border-cocoa/20 p-5 shadow-xs">
                    <span className="font-scrawl text-lg font-bold text-sky-700 block mb-1">Step 03</span>
                    <h4 className="font-plush text-lg font-bold text-cocoa mb-1">In-Cabin Flight Nanny</h4>
                    <p className="text-xs text-cocoa-soft">Never cargo. Held safely in-cabin by our dedicated nanny until hand delivery to your door.</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Section 2: Puppy Promise */}
        <motion.section 
          id="puppy-promise" 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="py-14 border-t border-cocoa/15"
        >
          <p className="font-scrawl text-base text-toffee font-bold">
            uncompromised safety
          </p>
          <h2 className="font-plush text-4xl sm:text-5xl font-black text-cocoa mt-1 mb-8">
            Our premium puppy promise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Licensed Vet Exam", desc: "Every pup is examined by approved UAE veterinarians with formal signed certificates." },
              { title: "ISO Microchipped", desc: "15-digit global microchip registered to your name upon homecoming." },
              { title: "Complete Vaccines", desc: "Full puppy vaccination series completed according to age protocols." },
              { title: "10-Year Genetic Warranty", desc: "Comprehensive guarantee against hereditary and genetic conditions." },
            ].map((p, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -6, rotate: i % 2 === 0 ? 1 : -1 }}
                className="bg-white rounded-2xl border-2 border-cocoa p-6 shadow-[0_3px_0_#2a170e]"
              >
                <span className="text-2xl block mb-2">🛡️</span>
                <h4 className="font-plush text-lg font-bold text-cocoa mb-1">{p.title}</h4>
                <p className="text-xs text-cocoa-soft leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Delivery & Collection */}
        <motion.section 
          id="delivery" 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="py-14 border-t border-cocoa/15"
        >
          <p className="font-scrawl text-base text-toffee font-bold">
            smooth transitions
          </p>
          <h2 className="font-plush text-4xl sm:text-5xl font-black text-cocoa mt-1 mb-4">
            Delivery & collection
          </h2>
          <p className="text-cocoa-soft/85 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
            Choose either luxury chauffeur delivery directly to your home anywhere in the UAE, or collect your pup directly from our private nursery lounge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl border-2 border-cocoa p-8 shadow-[0_4px_0_#2a170e]">
              <span className="text-3xl block mb-3">🚗</span>
              <h3 className="font-plush text-2xl font-bold text-cocoa mb-2">Door-to-Door UAE Chauffeur</h3>
              <p className="text-sm text-cocoa-soft leading-relaxed mb-4">
                Our air-conditioned nursery vehicle safely transports your puppy directly to your villa or apartment in Dubai, Abu Dhabi, Sharjah, or Al Ain.
              </p>
              <span className="font-scrawl text-xs font-bold text-toffee">Includes full handover orientation</span>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl border-2 border-cocoa p-8 shadow-[0_4px_0_#2a170e]">
              <span className="text-3xl block mb-3">🏡</span>
              <h3 className="font-plush text-2xl font-bold text-cocoa mb-2">Nursery Lounge Pickup</h3>
              <p className="text-sm text-cocoa-soft leading-relaxed mb-4">
                Celebrate your official Gotcha Day in our private nursery lounge. Take commemorative polaroid photos and receive your homecoming kit in person.
              </p>
              <span className="font-scrawl text-xs font-bold text-toffee">Complimentary tea & coffee for the family</span>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 4: Why Choose Us */}
        <motion.section 
          id="why-choose-us" 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="py-14 border-t border-cocoa/15"
        >
          <p className="font-scrawl text-base text-toffee font-bold">
            the teddypups difference
          </p>
          <h2 className="font-plush text-4xl sm:text-5xl font-black text-cocoa mt-1 mb-8">
            Why families choose us
          </h2>

          <div className="bg-[#fff1d8] rounded-3xl border-2 border-cocoa p-8 sm:p-12 shadow-[0_4px_0_#2a170e] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h3 className="font-plush text-2xl sm:text-3xl font-black text-cocoa">
                Over 1,200+ healthy pups placed in loving homes
              </h3>
              <p className="text-sm sm:text-base text-cocoa-soft leading-relaxed">
                We never compromise on puppy welfare. From prenatal nutrition to gentle human handling and 24/7 lifetime WhatsApp support, you are never alone on your parenting journey.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/puppies')}
                  className="px-8 py-3.5 rounded-full bg-[#8a421d] hover:bg-[#743515] text-white font-bold text-sm shadow-[0_3px_0_#52230d] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  Explore Available Puppies
                </button>
              </div>
            </div>

            <div className="shrink-0">
              <TeddyMascot pose="runner" className="w-48" />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
