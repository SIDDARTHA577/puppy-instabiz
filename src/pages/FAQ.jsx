import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Search, 
  MessageCircle,
} from 'lucide-react';
import faqsData from '../data/faqs.json';

export default function FAQ({ navigate }) {
  const [openIds, setOpenIds] = useState(['faq-1']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleOpen = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqsData.filter(f => {
    const q = searchQuery.toLowerCase();
    return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#8a421d] text-white pt-24 pb-28 relative select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <h1 className="font-plush text-6xl sm:text-7xl md:text-8xl font-black text-[#fffdf8] tracking-tight leading-none mb-4">
            Questions <br />
            & answers
          </h1>
          <p className="text-base sm:text-lg text-[#faebd0]/90 max-w-xl font-normal leading-relaxed">
            Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
          </p>
        </motion.div>

        {/* 2-Columns Layout: Left Search / Info, Right Cork Board with Pinned Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (4 cols): Search and WhatsApp */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <label htmlFor="faq-search" className="font-scrawl text-sm text-[#faebd0] font-bold block mb-2">
                sniff out a question
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-cocoa/50" />
                <input
                  id="faq-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="delivery, Korea, vaccinated..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white border-2 border-cocoa shadow-md text-cocoa text-sm focus:outline-none placeholder-cocoa/40 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cocoa font-bold hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <p className="font-scrawl text-sm text-[#faebd0]/80 font-bold">
              {filteredFaqs.length} notes on the board
            </p>

            {/* Quick WhatsApp Support Box */}
            <div className="bg-[#6b3112] rounded-3xl p-6 border-2 border-[#52230d] shadow-md space-y-3">
              <span className="font-scrawl text-sm font-bold text-[#faebd0] block">
                prefer instant human chat?
              </span>
              <p className="text-xs text-[#faebd0]/80 leading-relaxed">
                Our Dubai nursery team is always online to answer questions regarding temperament, size, or travel arrangements.
              </p>
              <a
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20have%20a%20question%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1b6b45] hover:bg-[#155a39] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column (8 cols): The Cork Board with Pinned Notes */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl border-8 border-[#52230d] bg-[#d9a56e] p-6 sm:p-8 shadow-2xl">
              {/* Cork texture noise overlay */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(#52230d 1px, transparent 1px)',
                  backgroundSize: '8px 8px'
                }}
              />

              <div className="relative z-10 space-y-5">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openIds.includes(faq.id);
                  const pinColors = ['#c2622b', '#2f6e9e', '#1b6b45', '#d4893f', '#a24a1a'];
                  const pinColor = pinColors[idx % pinColors.length];

                  return (
                    <motion.div
                      key={faq.id || idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="relative bg-[#fffdf8] text-cocoa rounded-xl border border-cocoa/20 shadow-md transition-all duration-300"
                    >
                      {/* Pushpin at top center */}
                      <div 
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-cocoa shadow-md z-20"
                        style={{ backgroundColor: pinColor }}
                      />

                      {/* Question Header Button */}
                      <button
                        onClick={() => toggleOpen(faq.id)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                      >
                        <h3 className="font-plush text-lg sm:text-xl font-bold text-cocoa leading-snug">
                          {faq.question}
                        </h3>
                        <ChevronDown 
                          className={`w-5 h-5 text-cocoa shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>

                      {/* Expandable Answer with Smooth Framer Motion */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 text-sm text-cocoa-soft font-normal leading-relaxed border-t border-cocoa/10">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
