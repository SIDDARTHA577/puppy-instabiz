import { useRef, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export default function Flight({ label = 'Puppy travel flight from Korea to Dubai' }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 25%'],
  });

  // Calculate motion along bezier path
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="tp-flight relative w-full h-[220px] md:h-[280px] overflow-visible my-8">
      <svg
        viewBox="0 0 660 300"
        role="img"
        aria-label={label}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <clipPath id="flight-window">
            <circle cx="95" cy="56" r="14" />
          </clipPath>
        </defs>

        {/* Flight route dashed bezier curve */}
        <path
          ref={pathRef}
          d="M40 250 C 170 40, 470 20, 620 168"
          fill="none"
          stroke="var(--color-toffee-deep)"
          strokeWidth="3.5"
          strokeDasharray="4 12"
          strokeLinecap="round"
          className="opacity-75"
        />

        {/* Origin dot & label: Korea */}
        <circle cx="40" cy="250" r="7" fill="var(--color-toffee-deep)" />
        <circle cx="40" cy="250" r="14" fill="none" stroke="var(--color-toffee)" strokeWidth="1.5" className="animate-ping opacity-30" />
        <text
          x="40"
          y="282"
          textAnchor="middle"
          className="font-scrawl text-[1.2rem] font-bold fill-[#2a170e]"
        >
          🇰🇷 Seoul, Korea
        </text>

        {/* Destination dot & label: Dubai */}
        <circle cx="620" cy="168" r="7" fill="var(--color-toffee-deep)" />
        <circle cx="620" cy="168" r="14" fill="none" stroke="var(--color-toffee)" strokeWidth="1.5" className="animate-ping opacity-30" />
        <text
          x="620"
          y="202"
          textAnchor="middle"
          className="font-scrawl text-[1.2rem] font-bold fill-[#2a170e]"
        >
          🇦🇪 Dubai, UAE
        </text>

        {/* Moving Airplane on Route */}
        <FlightAirplane scrollProgress={progress} pathRef={pathRef} />
      </svg>
    </div>
  );
}

function FlightAirplane({ scrollProgress, pathRef }) {
  const planeGroupRef = useRef(null);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latest) => {
      const path = pathRef.current;
      const group = planeGroupRef.current;
      if (!path || !group) return;

      const totalLen = path.getTotalLength();
      const curLen = Math.min(totalLen, Math.max(0, latest * totalLen));
      const pt = path.getPointAtLength(curLen);
      const nextPt = path.getPointAtLength(Math.min(totalLen, curLen + 1));
      const prevPt = path.getPointAtLength(Math.max(0, curLen - 1));
      const angle = (180 * Math.atan2(nextPt.y - prevPt.y, nextPt.x - prevPt.x)) / Math.PI;

      group.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
      group.style.opacity = String(Math.min(1, Math.max(0, (latest - 0.05) / 0.1)));
    });

    return () => unsubscribe();
  }, [scrollProgress, pathRef]);

  return (
    <g
      ref={planeGroupRef}
      transform="translate(40 250) rotate(-35)"
      className="transition-opacity duration-300 pointer-events-none"
    >
      <g transform="translate(-65 -32) scale(0.65)">
        {/* Airplane Far Wing */}
        <path
          d="M60 20 L80 -10 L100 -10 L92 20 Z"
          fill="var(--color-toffee-deep)"
          stroke="#2a170e"
          strokeWidth="3"
        />
        {/* Airplane Fuselage */}
        <path
          d="M10 38 C10 18 36 12 70 12 L110 12 C135 12 150 24 150 38 C150 52 135 64 110 64 L70 64 C36 64 10 58 10 38 Z"
          fill="#fffdf8"
          stroke="#2a170e"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Cabin Window with Teacup Pup */}
        <circle cx="118" cy="38" r="14" fill="#bfddf5" stroke="#2a170e" strokeWidth="2" />
        <text x="118" y="43" textAnchor="middle" fontSize="16">🐶</text>

        {/* Near Wing */}
        <path
          d="M62 48 L44 95 L68 95 L98 48 Z"
          fill="var(--color-toffee)"
          stroke="#2a170e"
          strokeWidth="3"
        />
        {/* Tail Fin */}
        <path
          d="M18 16 L0 -16 L22 -16 L36 16 Z"
          fill="var(--color-honey)"
          stroke="#2a170e"
          strokeWidth="3"
        />
      </g>
    </g>
  );
}
