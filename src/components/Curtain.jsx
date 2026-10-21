import React from 'react';
import TeddyMascot from './TeddyMascot';

export default function Curtain({ active }) {
  if (!active) return null;

  return (
    <div 
      className="tp-curtain fixed inset-0 z-50 flex items-center justify-center overflow-hidden animate-fadeIn select-none"
      aria-hidden="true"
    >
      <div className="tp-curtain__blanket relative w-full h-full bg-[#fbe3b4] flex flex-col justify-between items-center">
        {/* Top Scallop Edge */}
        <svg className="w-full h-10 flex-shrink-0" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-curtain-scallop-top" width="76" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fffdf8" />
              <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
              <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop-top)" />
        </svg>

        {/* Center Stage: Prints, Runner, Note */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-xl px-4">
          {/* Animated Running Mascot */}
          <div className="w-48 sm:w-60 mb-2">
            <TeddyMascot pose="runner" className="w-full h-auto drop-shadow-md animate-pulse" />
          </div>

          {/* Paw Prints Trail */}
          <div className="flex items-center gap-4 text-cocoa/60 my-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg 
                key={i} 
                viewBox="0 0 64 64" 
                className="w-5 h-5 fill-current animate-bounce"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            ))}
          </div>

          <p className="font-scrawl text-2xl sm:text-3xl font-bold text-cocoa tracking-wide mt-2">
            every puppy is family
          </p>
        </div>

        {/* Bottom Scallop Edge */}
        <svg className="w-full h-10 flex-shrink-0" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-curtain-scallop-bottom" width="76" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0V13A38 25 0 0 0 76 13V0Z" fill="#fffdf8" />
              <path d="M0 13A38 25 0 0 0 76 13" fill="none" stroke="#2a170e" strokeWidth="3" />
              <path d="M11 7A27 19 0 0 0 65 7" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop-bottom)" />
        </svg>
      </div>
    </div>
  );
}
