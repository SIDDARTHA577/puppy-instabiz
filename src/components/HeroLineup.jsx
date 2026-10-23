import React, { useState, useEffect, useRef } from 'react';
import TeddyMascot from './TeddyMascot';

const SEATS = [
  {
    x: '9%',
    w: '8.6rem',
    peek: 0.62,
    tilt: -5,
    name: 'Max',
    slug: 'maltipoo-max-male',
    img: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=3840&q=75',
  },
  {
    x: '22.5%',
    w: '10.4rem',
    peek: 0.8,
    tilt: 3,
    name: 'Korean Teacup Maltipoo',
    slug: 'korean-teacup-maltipoo-female',
    img: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=3840&q=75',
  },
  {
    x: '35%',
    w: '9.2rem',
    peek: 0.7,
    tilt: -2,
    name: 'Korean Teacup Poodle',
    slug: 'korean-teacup-poodle-female',
    img: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=3840&q=75',
  },
  {
    x: '65%',
    w: '9.4rem',
    peek: 0.74,
    tilt: 3,
    name: 'Maltipoo & Cavapoo',
    slug: 'maltipoo-cavapoo-male',
    img: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=3840&q=75',
  },
  {
    x: '77.5%',
    w: '10.6rem',
    peek: 0.82,
    tilt: -3,
    name: 'Maltipoo',
    slug: 'toy-poodle-male-female',
    img: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FvMu0BPvkAZ-j%2Fc65e53967d%2Fb942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg&w=3840&q=75',
  },
  {
    x: '91%',
    w: '8.4rem',
    peek: 0.6,
    tilt: 4,
    name: 'Maltipoo',
    slug: 'maltipoo-female-2',
    img: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3WJNmn6VVgVu%2F732f779474%2Fb942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg&w=3840&q=75',
  },
];

const CUTE_SAYINGS = ['woof!', 'wheee!', 'boing!', 'I like you!', 'achoo!', 'yip!'];

export default function HeroLineup({ navigate }) {
  const [hovered, setHovered] = useState(null);
  const [autoTag, setAutoTag] = useState(4); // default active on Maltipoo arch like in user screenshot
  const [pupStates, setPupStates] = useState({});
  const [teddyState, setTeddyState] = useState({
    duck: false,
    jolt: false,
    bubble: false,
    bubbleText: 'peekaboo!',
  });
  const [hearts, setHearts] = useState([]);
  const timerRef = useRef([]);

  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timerRef.current.push(id);
    return id;
  };

  useEffect(() => {
    // Initial mascot peekaboo entrance on homepage load
    addTimeout(() => {
      setTeddyState((prev) => ({ ...prev, duck: true }));
    }, 120);

    addTimeout(() => {
      setTeddyState((prev) => ({
        ...prev,
        duck: false,
        jolt: true,
        bubble: true,
        bubbleText: 'peekaboo!',
      }));
    }, 550);

    addTimeout(() => {
      setTeddyState((prev) => ({ ...prev, jolt: false }));
    }, 1100);

    addTimeout(() => {
      setTeddyState((prev) => ({ ...prev, bubble: false }));
    }, 2500);

    // Arch lineup peekaboo sequence
    let seatQueue = [1, 3, 0, 4, 2, 5];
    let queueIdx = 0;

    const playPeekaboo = () => {
      const seat = seatQueue[queueIdx % seatQueue.length];
      queueIdx++;

      // Duck down
      setPupStates((prev) => ({ ...prev, [seat]: 'duck' }));

      addTimeout(() => {
        // Pop back up
        setPupStates((prev) => ({ ...prev, [seat]: 'pop' }));
        setAutoTag(seat);

        // Hide tag after a moment
        addTimeout(() => {
          setAutoTag((curr) => (curr === seat ? null : curr));
        }, 2200);

        // Clear pop state
        addTimeout(() => {
          setPupStates((prev) => ({ ...prev, [seat]: undefined }));
        }, 700);
      }, 360);

      // Schedule next peekaboo
      addTimeout(playPeekaboo, 3800 + Math.random() * 1500);
    };

    const initialTimer = addTimeout(playPeekaboo, 1500);

    return () => {
      clearTimeout(initialTimer);
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
    };
  }, []);

  const handleTeddyClick = (e) => {
    e.stopPropagation();
    const randSaying = CUTE_SAYINGS[Math.floor(Math.random() * CUTE_SAYINGS.length)];
    setTeddyState({
      duck: false,
      jolt: true,
      bubble: true,
      bubbleText: randSaying,
    });

    const rect = e.currentTarget.getBoundingClientRect();
    setHearts((prev) => [
      ...prev.slice(-3),
      {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        icon: Math.random() > 0.5 ? '❤️' : '🐾',
      },
    ]);

    addTimeout(() => {
      setTeddyState((prev) => ({ ...prev, jolt: false }));
    }, 450);

    addTimeout(() => {
      setTeddyState((prev) => ({ ...prev, bubble: false }));
    }, 2000);
  };

  return (
    <div 
      className="tp-hero__stage"
      style={{
        '--quilt-h': 'clamp(4.5rem, 12vh, 8rem)',
        '--tw': 'clamp(15rem, min(30vw, 46vh), 27rem)',
        '--rise': 'clamp(.75rem, 2.4vh, 1.75rem)',
      }}
    >
      {/* 1. Puppy Photo Arches */}
      <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
        {SEATS.map((seat, i) => (
          <li
            key={i}
            className="tp-lineup__seat"
            style={{
              '--x': seat.x,
              '--w': seat.w,
              '--peek': seat.peek,
              '--tilt': `${seat.tilt}deg`,
              '--i': i,
            }}
          >
            <a
              href={`/puppies/${seat.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/puppies/${seat.slug}`);
              }}
              className="tp-lineup__pup"
              data-pup-friend="true"
              data-state={pupStates[i]}
              aria-label={`Meet ${seat.name}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered((h) => (h === i ? null : h))}
            >
              <span className="tp-lineup__photo">
                <img
                  src={seat.img}
                  alt={seat.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* 2. Floating Breed/Name Tag Stickers */}
      <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
        {SEATS.map((seat, i) => {
          const isShow = hovered === i || (hovered === null && autoTag === i);
          return (
            <li
              key={i}
              className="tp-lineup__seat"
              style={{
                '--x': seat.x,
                '--w': seat.w,
                '--peek': seat.peek,
                '--tilt': `${seat.tilt}deg`,
                '--i': i,
              }}
            >
              <span 
                className="tp-lineup__ghost" 
                data-tag={isShow ? 'show' : undefined}
              >
                <span className="tp-lineup__name font-scrawl font-bold">{seat.name}</span>
              </span>
            </li>
          );
        })}
      </ul>

      {/* 3. Peeking Mascot in Center of Arches */}
      <div
        data-pup-stop="true"
        data-pose="peek"
        data-facing="right"
        data-act="peekaboo"
        data-behind="true"
        data-lane="true"
        onClick={handleTeddyClick}
        style={{
          left: 'calc(50% - var(--tw, 20rem) * .7067)',
          bottom: 'calc(var(--quilt-h, 6rem) + 30px - var(--tw, 20rem) * .2733)',
          width: 'var(--tw, 20rem)',
        }}
        className="pup-stop tp-hero__teddy cursor-pointer select-none"
      >
        <div
          className={`pup-buddy relative transition-transform duration-300 ease-out ${
            teddyState.duck
              ? 'translate-y-3 scale-95 opacity-80'
              : teddyState.jolt
              ? '-translate-y-2 scale-105 opacity-100'
              : 'translate-y-0 scale-100 opacity-100'
          }`}
          data-facing="right"
        >
          <TeddyMascot pose="peek" />

          {/* Floating Interactive Hearts on Click */}
          {hearts.map((h) => (
            <span
              key={h.id}
              className="pup-heart animate-float-fade"
              style={{
                left: `${h.x}px`,
                top: `${h.y}px`,
              }}
            >
              {h.icon}
            </span>
          ))}

          {/* Interactive Mascot Speech Bubble */}
          <span
            aria-hidden="true"
            className="pup-bubble font-scrawl font-bold"
            data-show={teddyState.bubble ? 'true' : 'false'}
          >
            {teddyState.bubbleText}
          </span>
        </div>
      </div>

      {/* 4. Quilted Blanket Covering Bottom of Arches */}
      <div aria-hidden="true" className="tp-quilt">
        <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt, #fff1d8)' }} />
              <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
              <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-scallop)" />
        </svg>
      </div>
    </div>
  );
}
