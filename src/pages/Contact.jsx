import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle,
} from 'lucide-react';
import { submitEnquiry } from '../lib/supabase';

export default function Contact({ navigate }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [curiousAbout, setCuriousAbout] = useState('any puppy (not sure yet)');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number so we can reach you.');
      return;
    }
    setSubmitting(true);

    try {
      await submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        area: area ? area.trim() : null,
        message: `Inquiry via letter stationery: Curious about ${curiousAbout}. Resident area: ${area || 'UAE'}.`,
        puppy_name: curiousAbout.includes('not sure') ? 'General Nursery Inquiry' : curiousAbout
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send letter. Please contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] pt-24 pb-28 relative select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12"
        >
          <h1 className="font-plush text-6xl sm:text-7xl md:text-8xl font-black text-cocoa tracking-tight leading-[0.95]">
            Get in touch <br />
            with us
          </h1>

          <p className="text-base sm:text-lg text-cocoa-soft/85 max-w-md font-normal leading-relaxed">
            Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!
          </p>
        </motion.div>

        {/* 2-Columns Grid: Left Direct Channels, Right Stationery Letter Pad */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          {/* Left Column (4 cols): Direct WhatsApp and Call Links */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-8"
          >
            <div>
              <a
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20get%20in%20touch."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#1b6b45] hover:bg-[#155a39] text-white font-bold text-sm shadow-[0_3px_0_#0f4228] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp +971 54 167 6733</span>
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-scrawl text-sm text-cocoa-soft font-bold block">
                call us
              </span>
              <a 
                href="tel:+971541676733" 
                className="font-scrawl text-xl font-bold text-toffee hover:underline inline-block cursor-pointer"
              >
                +971 54 167 6733
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-scrawl text-sm text-cocoa-soft font-bold block">
                email
              </span>
              <a 
                href="mailto:teddypupsadmin@gmail.com" 
                className="font-scrawl text-lg font-bold text-toffee hover:underline inline-block cursor-pointer"
              >
                teddypupsadmin@gmail.com
              </a>
            </div>

            <div className="pt-6 border-t border-cocoa/15 space-y-2">
              <span className="font-scrawl text-sm text-cocoa-soft font-bold block">
                showroom location
              </span>
              <p className="text-sm text-cocoa font-semibold">
                Downtown Dubai, United Arab Emirates
              </p>
              <p className="text-xs text-cocoa-soft">
                Visiting hours: 10:00 AM – 8:00 PM daily by private appointment
              </p>
            </div>
          </motion.div>

          {/* Right Column (8 cols): The Letter Stationery Writing Pad */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <div className="relative bg-white rounded-3xl border-2 border-cocoa p-8 sm:p-12 shadow-[0_5px_0_#2a170e]">
              {/* Postage Stamp on Top Right */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-14 h-18 sm:w-16 sm:h-20 rounded-md border-2 border-dashed border-[#8a421d] bg-[#faebd0] flex flex-col items-center justify-center shadow-xs transform rotate-2">
                <span className="text-xl sm:text-2xl block select-none">🐾</span>
                <span className="text-[9px] font-bold tracking-widest text-[#8a421d] uppercase mt-1">UAE</span>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <span className="text-5xl block animate-bounce">💌</span>
                  <h3 className="font-plush text-3xl font-black text-cocoa">
                    Letter Received!
                  </h3>
                  <p className="text-sm text-cocoa-soft max-w-md mx-auto leading-relaxed">
                    Thank you, {name}! Your letter has landed on Teddy's nursery desk. We will WhatsApp or call you on <strong className="text-toffee">{phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setArea('');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-honey/40 border-2 border-cocoa text-cocoa font-bold text-xs hover:bg-honey/60 cursor-pointer"
                  >
                    Write another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                  <h2 className="font-scrawl text-2xl sm:text-3xl font-bold text-toffee">
                    Dear TeddyPups,
                  </h2>

                  {/* Fill in the blanks sentence */}
                  <div className="font-scrawl text-lg sm:text-xl text-cocoa leading-loose space-y-4">
                    <div>
                      <span>my name is </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="your name"
                        className="inline-block min-w-[200px] border-b-2 border-dashed border-cocoa/40 focus:border-toffee bg-transparent px-2 py-0.5 outline-none text-cocoa font-bold text-lg"
                      />
                      <span> , and you can reach me on </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="inline-block min-w-[190px] border-b-2 border-dashed border-cocoa/40 focus:border-toffee bg-transparent px-2 py-0.5 outline-none text-cocoa font-bold text-lg"
                      />
                    </div>

                    <div>
                      <span>or by email at </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="optional"
                        className="inline-block min-w-[200px] border-b-2 border-dashed border-cocoa/40 focus:border-toffee bg-transparent px-2 py-0.5 outline-none text-cocoa font-bold text-lg"
                      />
                      <span> .</span>
                    </div>

                    <div>
                      <span>I live in </span>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Dubai Marina"
                        className="inline-block min-w-[180px] border-b-2 border-dashed border-cocoa/40 focus:border-toffee bg-transparent px-2 py-0.5 outline-none text-cocoa font-bold text-lg"
                      />
                      <span> , and I'm curious about </span>
                      <select
                        value={curiousAbout}
                        onChange={(e) => setCuriousAbout(e.target.value)}
                        className="inline-block border-b-2 border-dashed border-cocoa/40 bg-transparent px-2 py-0.5 outline-none text-cocoa font-bold text-lg cursor-pointer"
                      >
                        <option value="any puppy (not sure yet)">any puppy (not sure yet)</option>
                        <option value="Teacup Maltipoo">Teacup Maltipoo</option>
                        <option value="Micro Poodle">Micro Poodle</option>
                        <option value="Toy Pomeranian">Toy Pomeranian</option>
                        <option value="Korean Imported Breeds">Korean Imported Breeds</option>
                        <option value="Visiting the Dubai Nursery">Visiting the Dubai Nursery</option>
                      </select>
                      <span> .</span>
                    </div>

                    <div>
                      <span>Hope to hear from you soon! 🐾</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-cocoa/15 flex items-center justify-between">
                    <span className="font-scrawl text-xs text-cocoa-soft">
                      * We respect your privacy & never spam
                    </span>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 rounded-full bg-[#8a421d] hover:bg-[#743515] text-white font-bold text-sm shadow-[0_3px_0_#52230d] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? 'Sending letter...' : 'Post letter to Teddy 📮'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
