import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CUTE_SAYINGS = [
  'Looking for a teacup pup? 🐾',
  'All pups are vet-certified! 🩺',
  'Visit our Dubai nursery! 🏡',
  'Korea import available upon request ✈️',
  'Tap me for love! ❤️',
  'Sniffing around? Ask us anything! 🐶',
];

export default function PupCompanion() {
  const [saying, setSaying] = useState('Welcome to TeddyPups UAE! 🐾');
  const [showBubble, setShowBubble] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [pupPose, setPupPose] = useState('sit'); // 'sit', 'stand', 'peek'
  const [headTilt, setHeadTilt] = useState(0);
  const [facingRight, setFacingRight] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const bubbleTimeoutRef = useRef(null);

  // Trigger speech bubble
  const speak = (msg, duration = 3200) => {
    setSaying(msg);
    setShowBubble(true);
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setShowBubble(false);
    }, duration);
  };

  // Periodic random chatter
  useEffect(() => {
    // Initial welcome after 2.5 seconds
    const initialTimer = setTimeout(() => {
      speak('Hi friend! Tap me anytime 🐾', 3600);
    }, 2500);

    const interval = setInterval(() => {
      if (Math.random() > 0.45 && !showBubble) {
        const randSaying = CUTE_SAYINGS[Math.floor(Math.random() * CUTE_SAYINGS.length)];
        speak(randSaying, 3200);
      }
    }, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, [showBubble]);

  // Track pointer and interactive element hovering
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (e.clientX < window.innerWidth / 2) {
        setFacingRight(false);
      } else {
        setFacingRight(true);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.matches('a, button, input, textarea, select, [role="button"]')
      ) {
        setHeadTilt(-8);
        setPupPose('peek');
        setTimeout(() => setHeadTilt(0), 1200);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Spawn heart on click
  const handlePupClick = (e) => {
    e.stopPropagation();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 50,
      icon: Math.random() > 0.5 ? '❤️' : '🐾',
    };
    setHearts((prev) => [...prev.slice(-6), newHeart]);

    const reactions = [
      'Woof! Love you! ❤️',
      '*Happy tail wags!* 🐕',
      'Yay! Playtime! 🎾',
      'Belly rubs please! ✨',
    ];
    speak(reactions[Math.floor(Math.random() * reactions.length)], 2800);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-40 select-none pointer-events-auto">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 5 }}
            transition={{ type: 'spring', damping: 15 }}
            className="absolute bottom-[108%] right-2 md:right-4 z-50 pointer-events-none"
          >
            <div className="pup-bubble font-hand text-[0.95rem] md:text-[1.05rem] font-bold py-2 px-3.5 bg-[#fffdf8] border-[2.5px] border-[#2a170e] text-[#2a170e] rounded-2xl rounded-br-sm shadow-[3px_4px_0_#2a170e24] whitespace-nowrap">
              {saying}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pup-heart"
          style={{
            left: '50%',
            top: '20%',
            '--hx': `${h.x}px`,
          }}
          onAnimationEnd={() =>
            setHearts((prev) => prev.filter((item) => item.id !== h.id))
          }
        >
          {h.icon}
        </span>
      ))}

      {/* Mascot SVG Avatar */}
      <motion.button
        type="button"
        onClick={handlePupClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative group cursor-pointer p-1.5 focus:outline-none"
        title="I'm Teddy! Click me!"
      >
        <svg
          viewBox="0 0 320 280"
          className="w-24 h-20 md:w-32 md:h-26 drop-shadow-md transition-transform duration-300"
          style={{
            transform: `${facingRight ? 'scaleX(-1)' : 'scaleX(1)'} rotate(${headTilt}deg)`,
          }}
        >
          {/* Shadow */}
          <ellipse cx="160" cy="245" rx="90" ry="18" fill="#2a170e" opacity="0.18" />

          {/* Body */}
          <ellipse cx="160" cy="180" rx="72" ry="60" fill="#c2622b" stroke="#2a170e" strokeWidth="6" />

          {/* Ears */}
          <g className="pup-ear-twitch">
            {/* Left ear */}
            <path
              d="M75 90 C 40 100, 30 160, 65 175 C 90 185, 100 135, 85 95 Z"
              fill="#a24a1a"
              stroke="#2a170e"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Right ear */}
            <path
              d="M245 90 C 280 100, 290 160, 255 175 C 230 185, 220 135, 235 95 Z"
              fill="#a24a1a"
              stroke="#2a170e"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </g>

          {/* Head */}
          <circle
            cx="160"
            cy="120"
            r="70"
            fill="#c2622b"
            stroke="#2a170e"
            strokeWidth="6"
          />

          {/* Cheeks */}
          <ellipse cx="115" cy="138" rx="14" ry="9" fill="#f9cdbf" opacity="0.65" />
          <ellipse cx="205" cy="138" rx="14" ry="9" fill="#f9cdbf" opacity="0.65" />

          {/* Big Sparkly Eyes */}
          <g className="pup-blink-open">
            <ellipse cx="130" cy="112" rx="11" ry="14" fill="#2a170e" />
            <circle cx="134" cy="107" r="4.5" fill="#ffffff" />
            <circle cx="127" cy="118" r="2" fill="#ffffff" />

            <ellipse cx="190" cy="112" rx="11" ry="14" fill="#2a170e" />
            <circle cx="194" cy="107" r="4.5" fill="#ffffff" />
            <circle cx="187" cy="118" r="2" fill="#ffffff" />
          </g>

          {/* Snout */}
          <ellipse cx="160" cy="138" rx="24" ry="17" fill="#fbe3b4" stroke="#2a170e" strokeWidth="4" />
          {/* Nose */}
          <path d="M152 130 C 152 126, 168 126, 168 130 C 168 138, 152 138, 152 130 Z" fill="#2a170e" />
          {/* Mouth smile */}
          <path d="M152 142 Q 160 148 168 142" fill="none" stroke="#2a170e" strokeWidth="3.5" strokeLinecap="round" />

          {/* Paws Resting on Ground */}
          <ellipse cx="125" cy="230" rx="20" ry="14" fill="#fffdf8" stroke="#2a170e" strokeWidth="5" />
          <ellipse cx="195" cy="230" rx="20" ry="14" fill="#fffdf8" stroke="#2a170e" strokeWidth="5" />

          {/* Collar with Gold Bell */}
          <path d="M125 174 Q 160 190 195 174" fill="none" stroke="#a24a1a" strokeWidth="8" strokeLinecap="round" />
          <circle cx="160" cy="186" r="9" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
        </svg>

        {/* Small badge saying "Meet Teddy" */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#2a170e] text-[#fffdf8] font-hand font-bold text-[0.72rem] px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm group-hover:bg-[#c2622b] transition-colors">
          Teddy 🐾
        </span>
      </motion.button>
    </div>
  );
}
