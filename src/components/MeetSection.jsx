import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import TeddyMascot from './TeddyMascot';

const PUPPIES = [
  {
    id: 1,
    name: "Max",
    meta: "Maltipoo, boy, 3 months, with video",
    slug: "maltipoo-max-male",
    color: "#a24a1a",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=3840&q=75"
  },
  {
    id: 2,
    name: "Korean Teacup Maltipoo",
    meta: "girl, 2 months, with video",
    slug: "korean-teacup-maltipoo-female",
    color: "#5a3a28",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=3840&q=75"
  },
  {
    id: 3,
    name: "Korean Teacup Poodle",
    meta: "girl, 2 months",
    slug: "korean-teacup-poodle-female",
    color: "#d4893f",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=3840&q=75"
  },
  {
    id: 4,
    name: "Maltipoo & Cavapoo",
    meta: "boy, 3 months Maltipoo & 2 months Cavapoo, with video",
    slug: "maltipoo-cavapoo-male",
    color: "#b8644a",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=3840&q=75"
  },
  {
    id: 5,
    name: "Toy Poodle",
    meta: "boy & girl, 2 months",
    slug: "toy-poodle-male-female",
    color: "#7a4a2e",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FvMu0BPvkAZ-j%2Fc65e53967d%2Fb942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg&w=3840&q=75"
  },
  {
    id: 6,
    name: "Maltipoo",
    meta: "girl, 3 months, with video",
    slug: "maltipoo-female-2",
    color: "#a24a1a",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3WJNmn6VVgVu%2F732f779474%2Fb942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg&w=3840&q=75"
  },
  {
    id: 7,
    name: "Pomeranian",
    meta: "girl, 2 months",
    slug: "pomeranian-female",
    color: "#5a3a28",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3yOfnmoyPooH%2F81e0c7e00c%2Fb942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg&w=3840&q=75"
  },
  {
    id: 8,
    name: "Copper",
    meta: "Cavapoo, boy, 3 months",
    slug: "copper-male",
    color: "#d4893f",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FO-6w4FYqE10j%2Fbe76f399cc%2Fb942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg&w=3840&q=75"
  },
  {
    id: 9,
    name: "Shih Tzu",
    meta: "girl, 2 months",
    slug: "shitzu-female",
    color: "#b8644a",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FqNrTCSrsYyzY%2F168fa8c4ff%2Fb942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg&w=3840&q=75"
  },
  {
    id: 10,
    name: "Shih Tzu",
    meta: "boy, 2 months",
    slug: "shitzu-male",
    color: "#7a4a2e",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fcrgs9ih6as_M%2Fe37bafb1bf%2Fb942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg&w=3840&q=75"
  },
  {
    id: 11,
    name: "Maltipoo",
    meta: "girl, 2.5 months",
    slug: "maltipoo-female-1",
    color: "#a24a1a",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F98fJm69D6wXm%2Fcbba549924%2Fb942a5_fa2bca8fa1b44ec4a87c10b77b10fa78-mv2.jpg&w=3840&q=75"
  },
  {
    id: 12,
    name: "Maltipoo",
    meta: "girl, 3 months",
    slug: "maltipoo-female",
    color: "#5a3a28",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FPw-fK93zLp_k%2F3b47f48b81%2Fb942a5_ae2d19ee1a6a43dfbb8006b0d9516616-mv2.jpg&w=3840&q=75"
  },
  {
    id: 13,
    name: "Korean Teacup Pomeranian",
    meta: "girl, 2 months",
    slug: "korean-teacup-pomeranian-1",
    color: "#d4893f",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F_8nQ2y-bWnS3%2Fbe2b251fc2%2Fb942a5_fca9eb8eb43e4939b4b0e51be9b93a90-mv2.jpg&w=3840&q=75"
  },
  {
    id: 14,
    name: "Korean Teacup Pomeranian",
    meta: "girl, 2.5 months",
    slug: "korean-teacup-pomeranian",
    color: "#b8644a",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FWGvhL0mS68gq%2F1fe9a01fbf%2Fb942a5_82c611ce517f41e5a5ea1bbd43f05d52-mv2.jpg&w=3840&q=75"
  },
  {
    id: 15,
    name: "Korean Teacup Pomeranian",
    meta: "boy, 2 months",
    slug: "korean-teacup-pomeranian-male",
    color: "#7a4a2e",
    tag: "Available",
    img: "https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fd4Yv0wG9p0aT%2Fd6ec22bf76%2Fb942a5_01e74fa0ee7d4924a350033d59e355f6-mv2.jpg&w=3840&q=75"
  }
];

export default function MeetSection({ navigate }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const hallRef = useRef(null);

  const [maxScroll, setMaxScroll] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  // Responsive pinned state and door dimension calculation matching reference
  useLayoutEffect(() => {
    const updateDimensions = () => {
      const desktop = window.matchMedia('(min-width: 1024px)').matches;
      setIsPinned(desktop);

      const track = trackRef.current;
      const hall = hallRef.current;
      if (hall && track && desktop) {
        const stage = hall.parentElement;
        const head = stage?.querySelector('.tp-meet__head');
        const plates = [...track.querySelectorAll('.tp-door__plate')];
        const plateHeight = Math.max(64, ...plates.map((el) => el.offsetHeight || 0));
        const floorHeight = hall.querySelector('.tp-meet__floor')?.offsetHeight || 0;
        const availableHeight = stage ? stage.clientHeight - (head ? head.offsetTop + head.offsetHeight : 0) - floorHeight - plateHeight - 40 : 250;
        const doorW = Math.max(128, Math.min(256, 0.15 * window.innerWidth, availableHeight / 1.3));
        hall.style.setProperty('--door-w', `${doorW.toFixed(0)}px`);
      } else {
        hall?.style.removeProperty('--door-w');
      }

      setMaxScroll(track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    if (trackRef.current) ro.observe(trackRef.current);
    if (hallRef.current?.parentElement) ro.observe(hallRef.current.parentElement);
    window.addEventListener('resize', updateDimensions);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Scroll tracking across pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring physics matching reference Next.js implementation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 170, damping: 32, mass: 0.35 });
  const trackX = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);

  // Progressive door opening & floor movement as track translates
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!isPinned || !track) return;

    const handleScroll = (currentX) => {
      hallRef.current?.style.setProperty('--floor-x', `${currentX.toFixed(1)}px`);
      const focalThreshold = Math.max(0.48 * window.innerWidth, 560);

      for (const door of track.children) {
        const doorLeft = door.offsetLeft + currentX;
        // Door opens when it reaches or passes the focal threshold
        const isOpen = doorLeft < focalThreshold;
        if (door.dataset.open !== String(isOpen)) {
          door.dataset.open = String(isOpen);
        }
      }
    };

    handleScroll(trackX.get());
    const unsub = trackX.on('change', handleScroll);
    return () => unsub();
  }, [isPinned, trackX]);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-meet relative"
      data-pinned={isPinned ? 'true' : undefined}
      style={{
        background: 'linear-gradient(to bottom, #fff1d8, #fbe3b4)',
        '--sky-top': '#fff1d8',
        '--sky-bottom': '#fbe3b4',
      }}
      aria-labelledby="meet-title"
    >
      <div
        ref={containerRef}
        data-pin-range="true"
        style={{
          height: isPinned ? `calc(100vh + ${Math.round(0.85 * maxScroll)}px)` : undefined,
          '--pinned': isPinned ? 1 : 0,
        }}
      >
        <div className="tp-meet__stage">
          {/* Header Bar */}
          <header className="tp-meet__head gutter">
            <div>
              <h2 id="meet-title" className="font-plush text-huge text-[#2a170e] font-black">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[#5a3a28] font-medium">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <a
              href="/puppies"
              onClick={(e) => {
                e.preventDefault();
                navigate('/puppies');
              }}
              className="btn-primary shrink-0 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 active:translate-y-0.5"
            >
              See all available puppies
            </a>
          </header>

          {/* Hall with Door Track & Wooden Floor */}
          <div ref={hallRef} className="tp-meet__hall">
            <motion.ol
              ref={trackRef}
              style={isPinned ? { x: trackX } : undefined}
              className="tp-meet__track"
              data-treadmill="true"
              aria-label="Puppies looking for a family"
            >
              {PUPPIES.map((pup, idx) => (
                <li
                  key={pup.id}
                  className="tp-door cursor-pointer"
                  data-open={isPinned ? 'false' : 'true'}
                >
                  <a
                    href={`/puppies/${pup.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/puppies/${pup.slug}`);
                    }}
                    className="tp-door__link block"
                    style={{ '--door': pup.color }}
                  >
                    {/* Plate with Name & Meta */}
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name font-bold">{pup.name}</span>
                      <span className="tp-door__meta">{pup.meta}</span>
                    </span>

                    {/* Arched Door Frame */}
                    <span className="tp-door__frame">
                      {/* Puppy Room Image behind leaf */}
                      <span className="tp-door__room">
                        <img
                          src={pup.img}
                          alt={pup.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </span>

                      {/* 3D Revolving Door Leaf */}
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          {/* Paw Peephole */}
                          <svg
                            viewBox="0 0 64 64"
                            className="tp-door__peephole fill-current"
                            aria-hidden="true"
                          >
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob" />
                        </span>
                      </span>

                      {/* Available Tag Sticker */}
                      <span className="tp-door__tag font-scrawl font-bold">
                        {pup.tag}
                      </span>
                    </span>
                  </a>
                </li>
              ))}

              {/* Final "Meet them all" Door */}
              <li className="tp-door tp-door--all" data-open="true">
                <a
                  href="/puppies"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/puppies');
                  }}
                  className="tp-door__link"
                >
                  <span className="tp-door__frame tp-door__frame--all">
                    <span className="font-plush tp-door__all text-[#9a491e] font-black">
                      Meet them all
                    </span>
                  </span>
                </a>
              </li>
            </motion.ol>

            {/* Wooden Floor with Plank Seams */}
            <div aria-hidden="true" className="tp-meet__floor" />

            {/* Mascot on Floor Watching Conveyor */}
            <div
              data-pup-stop="true"
              data-pose="walk"
              data-facing="right"
              data-act="treadmill"
              className="pup-stop tp-meet__teddy"
            >
              <TeddyMascot
                pose={isPinned ? 'walk' : 'sit'}
                act={isPinned ? 'treadmill' : undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
