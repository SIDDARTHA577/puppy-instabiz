import React from 'react';
import { Lock } from 'lucide-react';
import TeddyMascot from './TeddyMascot';

export default function Footer({ navigate }) {
  const handleNav = (path, e) => {
    if (e) e.preventDefault();
    navigate(path);
  };

  const stars = [
    { left: '6%', top: '18%', width: '12px', delay: '0s' },
    { left: '14%', top: '42%', width: '8px', delay: '0.4s' },
    { left: '23%', top: '12%', width: '10px', delay: '0.8s' },
    { left: '31%', top: '30%', width: '7px', delay: '1.2s' },
    { left: '44%', top: '9%', width: '11px', delay: '1.6s' },
    { left: '52%', top: '36%', width: '8px', delay: '2.0s' },
    { left: '63%', top: '15%', width: '10px', delay: '2.4s' },
    { left: '71%', top: '40%', width: '7px', delay: '2.8s' },
  ];

  return (
    <footer 
      data-pup-scene="true" 
      data-tone="dark" 
      className="tp-scene tp-footer relative bg-[#24130b] text-milk overflow-hidden pb-10"
    >
      {/* Top Rolling Hill Contour from Reference */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16 text-[#24130b] fill-current -mt-1 block"
      >
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" fill="#24130b" />
      </svg>

      {/* Starry Night Sky Elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div className="absolute inset-0">
          {stars.map((star, idx) => (
            <svg
              key={idx}
              viewBox="0 0 40 40"
              className="absolute text-honey animate-pulse"
              style={{
                left: star.left,
                top: star.top,
                width: star.width,
                animationDelay: star.delay,
                animationDuration: '3s',
              }}
              aria-hidden="true"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>
      </div>

      <div className="max-w-[110rem] mx-auto px-6 sm:px-8 lg:px-12 pt-16 md:pt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-x-12 md:gap-y-8">
          {/* Column 1: Brand & Bio + Sleeping Teddy in Basket */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-plush text-4xl sm:text-5xl font-black text-[#fbe3b4]">
                Home, at last.
              </p>
              <p className="mt-4 max-w-md text-[#fffdf8]/85 text-base leading-relaxed">
                TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
              </p>
            </div>

            {/* Woven Basket with Sleeping Teddy Mascot */}
            <div className="mt-8 relative w-60 h-44">
              {/* Basket Back Rim & Hollow */}
              <svg aria-hidden="true" viewBox="0 0 300 240" className="absolute inset-0 w-full h-full">
                <ellipse cx="212" cy="145" rx="96" ry="12" fill="#1b0e07" />
                <path d="M116 145 A96 12 0 0 1 308 145" stroke="#1b0e07" strokeWidth="3" fill="none" />
                <path d="M116 145 A96 12 0 0 1 308 145" stroke="#d38f45" strokeWidth="5" fill="none" />
              </svg>

              {/* Teddy Snug inside */}
              <div 
                data-pup-stop="true" 
                data-pose="snug" 
                data-facing="right" 
                data-act="basket" 
                data-behind="true" 
                data-lane="true"
                className="pup-stop tp-basket__pup absolute inset-0 flex items-center justify-center transform -translate-y-2"
              >
                <TeddyMascot pose="snug" className="w-52 h-auto" />
              </div>

              {/* Basket Front Weave & Rim */}
              <svg aria-hidden="true" viewBox="0 0 300 240" className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z"
                  fill="#b8742f"
                  stroke="#2a170e"
                  strokeWidth="3.5"
                />
                <path d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" fill="none" stroke="#2a170e" strokeWidth="2.5" />
                <path d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230" fill="none" stroke="#2a170e" strokeWidth="2.5" />
                <path d="M116 145 A96 12 0 0 0 308 145" fill="none" stroke="#2a170e" strokeWidth="3.5" />
              </svg>
            </div>
          </div>

          {/* Column 2: Explore Navigation Links */}
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="font-scrawl text-2xl text-[#f2be6b] font-bold">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm sm:text-base">
              <li>
                <a
                  href="/puppies"
                  onClick={(e) => handleNav('/puppies', e)}
                  className="font-semibold text-[#fffdf8]/90 underline-offset-4 hover:text-[#f2be6b] hover:underline transition-colors"
                >
                  Available puppies
                </a>
              </li>
              <li>
                <a
                  href="/puppies?status=adopted"
                  onClick={(e) => handleNav('/puppies?status=adopted', e)}
                  className="font-semibold text-[#fffdf8]/90 underline-offset-4 hover:text-[#f2be6b] hover:underline transition-colors"
                >
                  Gone home
                </a>
              </li>
              <li>
                <a
                  href="/happy-families"
                  onClick={(e) => handleNav('/happy-families', e)}
                  className="font-semibold text-[#fffdf8]/90 underline-offset-4 hover:text-[#f2be6b] hover:underline transition-colors"
                >
                  Happy families
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  onClick={(e) => handleNav('/how-it-works', e)}
                  className="font-semibold text-[#fffdf8]/90 underline-offset-4 hover:text-[#f2be6b] hover:underline transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works#delivery"
                  onClick={(e) => handleNav('/how-it-works', e)}
                  className="font-semibold text-[#fffdf8]/90 underline-offset-4 hover:text-[#f2be6b] hover:underline transition-colors"
                >
                  Delivery & collection
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleNav('/faq', e)}
                  className="font-semibold text-[#fffdf8]/90 underline-offset-4 hover:text-[#f2be6b] hover:underline transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav('/contact', e)}
                  className="font-semibold text-[#fffdf8]/90 underline-offset-4 hover:text-[#f2be6b] hover:underline transition-colors"
                >
                  Visit & contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3: Say Hello (Contact & Social) */}
          <div className="md:col-span-3">
            <h2 className="font-scrawl text-2xl text-[#f2be6b] font-bold">Say hello</h2>
            <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-[#fffdf8]/90">
              <li>
                <a
                  href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-[#f2be6b] transition-colors"
                >
                  WhatsApp +971 54 167 6733
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@teddypups.com"
                  className="hover:text-[#f2be6b] transition-colors"
                >
                  hello@teddypups.com
                </a>
              </li>
              <li className="text-[#fffdf8]/75">
                Downtown Dubai, United Arab Emirates
              </li>
            </ul>

            {/* Social Media Rounded Pill Links */}
            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Social media">
              <li>
                <a
                  href="https://www.instagram.com/teddypups.worldwide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full border border-[#fffdf8]/30 px-4 text-xs font-semibold hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@teddypupsuae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full border border-[#fffdf8]/30 px-4 text-xs font-semibold hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61567496944539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full border border-[#fffdf8]/30 px-4 text-xs font-semibold hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching Reference */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-milk/15 pt-6 text-sm text-milk/60">
          <span className="flex items-center gap-3">
            <img
              src="/brand/logo.png"
              alt="TeddyPups U.A.E."
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => { e.target.src = '/icon.png'; }}
            />
            <span>© 2026 TeddyPups U.A.E.</span>
          </span>

          <div className="flex items-center gap-4">
            <span className="font-scrawl text-base text-honey/80">
              every puppy is family
            </span>
            <button
              onClick={() => handleNav('/admin')}
              title="Staff Portal"
              className="opacity-20 hover:opacity-100 transition-opacity p-1 text-honey"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
