import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPuppies, fetchHappyFamilies } from '../lib/supabase';
import TeddyMascot from '../components/TeddyMascot';
import Flight from '../components/Flight';
import JourneyChat from '../components/JourneyChat';

export default function Home({ navigate }) {
  const [puppies, setPuppies] = useState([]);
  const [polaroids, setPolaroids] = useState([]);
  const [openDoors, setOpenDoors] = useState({ 0: true, 1: true, 2: false, 3: false });
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    async function loadData() {
      const p = await fetchPuppies();
      setPuppies(p);
      const fams = await fetchHappyFamilies();
      setPolaroids(fams.slice(0, 8));
    }
    loadData();
  }, []);

  const toggleDoor = (idx) => {
    setOpenDoors(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getPup = (slug) => puppies.find(p => p.slug === slug);
  const pupMax = getPup('maltipoo-max-male');
  const pupMaltipoo = getPup('korean-teacup-maltipoo-female');
  const pupPoodle = getPup('korean-teacup-poodle-female');
  const pupCavapoo = getPup('maltipoo-cavapoo-male');
  const pupToyPoodle = getPup('toy-poodle-male-female');
  const pupMaltipoo2 = getPup('maltipoo-female-2');

  const heroLineupPups = [
    {
      name: 'Max',
      breed: 'Maltipoo',
      img: pupMax?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=3840&q=75',
      slug: 'maltipoo-max-male',
      tag: 'Max'
    },
    {
      name: 'Korean Teacup Maltipoo',
      breed: 'Maltipoo',
      img: pupMaltipoo?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=3840&q=75',
      slug: 'korean-teacup-maltipoo-female',
      tag: 'Korean Teacup Maltipoo'
    },
    {
      name: 'Korean Teacup Poodle',
      breed: 'Poodle',
      img: pupPoodle?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=3840&q=75',
      slug: 'korean-teacup-poodle-female',
      tag: 'Korean Teacup Poodle'
    },
    {
      name: 'Maltipoo & Cavapoo',
      breed: 'Cavapoo',
      img: pupCavapoo?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=3840&q=75',
      slug: 'maltipoo-cavapoo-male',
      tag: 'Maltipoo & Cavapoo'
    },
    {
      name: 'Toy Poodle',
      breed: 'Poodle',
      img: pupToyPoodle?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FvMu0BPvkAZ-j%2Fc65e53967d%2Fb942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg&w=3840&q=75',
      slug: 'toy-poodle-male-female',
      tag: 'Toy Poodle'
    },
    {
      name: 'Maltipoo',
      breed: 'Maltipoo',
      img: pupMaltipoo2?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3WJNmn6VVgVu%2F732f779474%2Fb942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg&w=3840&q=75',
      slug: 'maltipoo-female-2',
      tag: 'Maltipoo'
    },
  ];

  const doorItems = [
    {
      name: 'Max',
      meta: 'Maltipoo, boy, 3 months, with video',
      img: pupMax?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=3840&q=75',
      slug: 'maltipoo-max-male',
      color: '#a24a1a'
    },
    {
      name: 'Korean Teacup Maltipoo',
      meta: 'girl, 2 months, with video',
      img: pupMaltipoo?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=3840&q=75',
      slug: 'korean-teacup-maltipoo-female',
      color: '#5a3a28'
    },
    {
      name: 'Korean Teacup Poodle',
      meta: 'girl, 2 months',
      img: pupPoodle?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=3840&q=75',
      slug: 'korean-teacup-poodle-female',
      color: '#d4893f'
    },
    {
      name: 'Maltipoo & Cavapoo',
      meta: 'boy, 3 months Maltipoo & 2 months Cavapoo, with video',
      img: pupCavapoo?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=3840&q=75',
      slug: 'maltipoo-cavapoo-male',
      color: '#b8644a'
    }
  ];

  return (
    <div className="min-h-screen bg-milk overflow-x-hidden pt-20 select-none">
      {/* =========================================================================
          1. HERO SECTION (tp-hero)
          ========================================================================= */}
      <section 
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-hero relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fffdf8] to-[#fff1d8] overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Note with Squiggle Underline SVG */}
          <div className="inline-block relative mb-4">
            <p className="font-scrawl text-xl sm:text-2xl text-toffee font-bold tracking-wide">
              every puppy is family
            </p>
            <svg viewBox="0 0 220 24" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-2.5 w-full text-toffee" aria-hidden="true">
              <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 id="hero-title" className="font-plush text-5xl sm:text-7xl md:text-8xl font-black text-cocoa tracking-tight leading-[1.05] mt-3">
            <span className="block">Premium teacup</span>
            <span className="block">puppies in Dubai</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-cocoa-soft/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/puppies')}
              className="px-8 py-4 rounded-full bg-[#8a421d] hover:bg-[#743515] text-white font-bold text-base border-2 border-[#52230d] shadow-[0_4px_0_#52230d] transition-all transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none cursor-pointer"
            >
              View available puppies
            </button>
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#fff8ea] hover:bg-honey/20 border-2 border-cocoa text-cocoa font-bold text-base shadow-[0_2px_0_#2a170e] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Hero Lineup Stage: 6 Arches with Center Mascot Peeking Over Quilt */}
        <div className="tp-hero__stage">
          {/* Floating Sticker Pill */}
          <div className="text-right max-w-4xl mx-auto pr-8 -mb-4 relative z-20">
            <span className="inline-block font-scrawl text-sm font-bold px-4 py-1.5 rounded-full bg-white border-2 border-cocoa text-cocoa shadow-sm transform rotate-2">
              Korean Teacup Maltipoo
            </span>
          </div>

          <ul className="tp-lineup">
            {/* Arch 1 */}
            <li className="tp-lineup__seat" onClick={() => navigate(`/puppies/${heroLineupPups[0].slug}`)}>
              <span className="tp-lineup__photo w-20 sm:w-28 md:w-36 h-28 sm:h-38 md:h-46">
                <img src={heroLineupPups[0].img} alt="" className="w-full h-full object-cover" />
              </span>
            </li>

            {/* Arch 2 */}
            <li className="tp-lineup__seat" onClick={() => navigate(`/puppies/${heroLineupPups[1].slug}`)}>
              <span className="tp-lineup__photo w-20 sm:w-28 md:w-36 h-32 sm:h-42 md:h-52">
                <img src={heroLineupPups[1].img} alt="" className="w-full h-full object-cover" />
              </span>
            </li>

            {/* Arch 3 with "Max" Tag on top */}
            <li className="tp-lineup__seat relative" onClick={() => navigate(`/puppies/${heroLineupPups[0].slug}`)}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-scrawl text-xs font-bold px-3 py-0.5 rounded-full bg-white border border-cocoa text-cocoa shadow-xs z-20">
                Max
              </span>
              <span className="tp-lineup__photo w-24 sm:w-32 md:w-42 h-36 sm:h-48 md:h-60">
                <img src={heroLineupPups[0].img} alt="" className="w-full h-full object-cover" />
              </span>
            </li>

            {/* CENTER ARCH: Teddy Cartoon Mascot Peeking Over the Quilt */}
            <li className="tp-lineup__seat z-20 -mx-2 sm:-mx-4 flex flex-col items-center">
              <div className="w-32 sm:w-44 md:w-56 drop-shadow-lg transform translate-y-3">
                <TeddyMascot pose="peek" className="w-full h-auto" />
              </div>
            </li>

            {/* Arch 4 */}
            <li className="tp-lineup__seat" onClick={() => navigate(`/puppies/${heroLineupPups[2].slug}`)}>
              <span className="tp-lineup__photo w-24 sm:w-32 md:w-42 h-36 sm:h-48 md:h-60">
                <img src={heroLineupPups[2].img} alt="" className="w-full h-full object-cover" />
              </span>
            </li>

            {/* Arch 5 */}
            <li className="tp-lineup__seat" onClick={() => navigate(`/puppies/${heroLineupPups[3].slug}`)}>
              <span className="tp-lineup__photo w-20 sm:w-28 md:w-36 h-32 sm:h-42 md:h-52">
                <img src={heroLineupPups[3].img} alt="" className="w-full h-full object-cover" />
              </span>
            </li>

            {/* Arch 6 */}
            <li className="tp-lineup__seat" onClick={() => navigate(`/puppies/${heroLineupPups[4].slug}`)}>
              <span className="tp-lineup__photo w-20 sm:w-28 md:w-36 h-28 sm:h-38 md:h-46">
                <img src={heroLineupPups[4].img} alt="" className="w-full h-full object-cover" />
              </span>
            </li>
          </ul>

          {/* Peeking Teddy Mascot Stop */}
          <div data-pup-stop="true" data-pose="peek" data-facing="right" data-act="peekaboo" data-behind="true" data-lane="true" className="pup-stop tp-hero__teddy">
            <TeddyMascot pose="peek" />
          </div>

          {/* Quilted Blanket Covering Bottom of Arches */}
          <div className="tp-quilt">
            {/* Scalloped Quilt Top Hem Border */}
            <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="tp-quilt__scallop text-[#fcf1dd] fill-current">
              <defs>
                <pattern id="quilt-scallop-pat" width="48" height="24" patternUnits="userSpaceOnUse">
                  <path d="M0 24C12 24 16 0 24 0C32 0 36 24 48 24Z" fill="#fcf1dd" />
                  <path d="M0 24C12 24 16 0 24 0C32 0 36 24 48 24" fill="none" stroke="#2a170e" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.25" />
                </pattern>
              </defs>
              <rect width="100%" height="24" fill="url(#quilt-scallop-pat)" />
            </svg>

            {/* Diamond Quilted Blanket Surface */}
            <div className="tp-quilt__body" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MEET THE PUPS (tp-meet) WITH 3D DOORS & WOODEN FLOOR
          ========================================================================= */}
      <section 
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-meet pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fff1d8] to-[#fbe3b4] relative"
        aria-labelledby="meet-title"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 id="meet-title" className="font-plush text-5xl sm:text-6xl md:text-7xl font-black text-cocoa leading-tight">
                Meet the pups
              </h2>
              <p className="mt-2 text-base sm:text-lg text-cocoa-soft/85 max-w-md font-medium">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <button
              onClick={() => navigate('/puppies')}
              className="px-7 py-3.5 rounded-full bg-[#8a421d] hover:bg-[#743515] text-white font-bold text-sm shadow-[0_3px_0_#52230d] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
            >
              See all available puppies
            </button>
          </div>

          {/* Hall of Nursery Doors with Mascot on Floor */}
          <div className="tp-meet__hall">
            <ol className="tp-meet__track">
              {doorItems.map((pup, idx) => {
                const isOpen = openDoors[idx];

                return (
                  <li 
                    key={idx} 
                    className="tp-door"
                    data-open={isOpen ? 'true' : 'false'}
                  >
                    <div 
                      className="tp-door__link"
                      onClick={() => toggleDoor(idx)}
                    >
                      {/* Door Plate: Name & Metadata ABOVE the door */}
                      <span className="tp-door__plate">
                        <span className="font-plush tp-door__name">
                          {pup.name}
                        </span>
                        <span className="tp-door__meta">
                          {pup.meta}
                        </span>
                      </span>

                      {/* Arch Door Frame */}
                      <span className="tp-door__frame" style={{ '--door': pup.color }}>
                        {/* Puppy Room Image behind leaf */}
                        <span className="tp-door__room">
                          <img src={pup.img} alt={pup.name} />
                        </span>

                        {/* Door Way with 3D Leaf */}
                        <span aria-hidden="true" className="tp-door__way">
                          <span className="tp-door__leaf">
                            {/* Paw Peephole SVG */}
                            <svg viewBox="0 0 64 64" className="tp-door__peephole fill-current" aria-hidden="true">
                              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                            </svg>
                            {/* Brass Doorknob */}
                            <span className="tp-door__knob" />
                          </span>
                        </span>

                        {/* Available Tag Sticker */}
                        <span className="tp-door__tag">Available</span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Wooden Floor Shelf with Mascot Sitting On It */}
            <div aria-hidden="true" className="tp-meet__floor" />
            <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-meet__teddy">
              <TeddyMascot pose="sit" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. TWO WAYS TO MEET YOUR PUPPY (tp-paths with Signpost & Mascot)
          ========================================================================= */}
      <section 
        className="tp-scene tp-paths py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fbe3b4] to-[#f7d18d] relative"
        style={{ "--sky-top": "#fbe3b4", "--sky-bottom": "#f7d18d" }}
        aria-labelledby="paths-title"
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <h2 id="paths-title" className="tp-paths__title font-plush text-huge">
            <span className="block">Two Ways to</span>
            <span className="block">Meet Your Puppy</span>
          </h2>

          <div className="tp-fork">
            {/* Center Wooden Post */}
            <div aria-hidden="true" className="tp-fork__post" />

            {/* Left Column: Puppies in Dubai */}
            <article className="tp-way tp-way--left" aria-labelledby="way-local">
              <h3 id="way-local" className="tp-sign tp-sign--left font-plush">
                Puppies in Dubai
              </h3>

              <div className="tp-way__scene">
                {/* Dubai Skyline Outline SVG */}
                <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                  <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Showroom Window with Striped Awning */}
                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <img 
                      src={puppies[1]?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FFHyoHcIosLZE%2F60f6e7e00a%2F27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg&w=1200&q=75'} 
                      alt="Showroom Puppy" 
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <figcaption className="font-scrawl">In our showroom</figcaption>
                </figure>
              </div>

              <p className="tp-way__text">
                See them, love them, take them home. Come meet our locally available puppies before you decide.
              </p>

              <button
                onClick={() => navigate('/puppies?origin=local')}
                className="btn btn-primary"
              >
                Meet local puppies
              </button>
            </article>

            {/* Mascot Standing in the Center */}
            <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-fork__teddy">
              <TeddyMascot pose="runner" className="w-full h-auto drop-shadow-md" />
            </div>

            {/* Right Column: Imported for you */}
            <article className="tp-way tp-way--right" aria-labelledby="way-imported">
              <h3 id="way-imported" className="tp-sign tp-sign--right font-plush">
                Imported for you
              </h3>

              <div className="tp-way__scene">
                {/* Airplane Bezier Flight Route with Scroll Animation */}
                <Flight 
                  photo={pupMaltipoo?.cover_image || 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=128&q=75'}
                  label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
                />
              </div>

              <p className="tp-way__text">
                Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.
              </p>

              <button
                onClick={() => navigate('/puppies?origin=imported')}
                className="btn btn-primary"
              >
                See imported puppies
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. YOUR PUPPY JOURNEY & WHATSAPP PHONE (tp-chat)
      {/* =========================================================================
          4. YOUR PUPPY JOURNEY & WHATSAPP PHONE (tp-chat with pinned phone)
          ========================================================================= */}
      <JourneyChat navigate={navigate} />

      {/* =========================================================================
          5. PUPPY PASSPORT / WHY FAMILIES TRUST TEDDYPUPS (tp-passport)
          ========================================================================= */}
      <section 
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-passport px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f0b866] to-[#a65a30] relative"
        aria-labelledby="trust-title"
      >
        <div className="max-w-6xl mx-auto">
          {/* Opened Booklet */}
          <div className="tp-book">
            {/* Left Page: Title & Mascot */}
            <div className="tp-book__page tp-book__page--left">
              <div>
                <p className="tp-book__kicker font-scrawl">puppy passport</p>
                <h2 id="trust-title" className="font-plush tp-book__title">
                  Why families trust TeddyPups
                </h2>
              </div>
              <div 
                data-pup-stop="true" 
                data-pose="sit" 
                data-facing="right" 
                className="pup-stop tp-book__teddy w-36 sm:w-48 mx-auto mt-6"
              >
                <TeddyMascot pose="sit" className="w-full h-auto drop-shadow-sm" />
              </div>
            </div>

            {/* Right Page: 4 Passport Stamps */}
            <ul className="tp-book__page tp-book__page--right">
              {/* Stamp 1 */}
              <li className="tp-entry" style={{ '--ink-stamp': '#a24a1a', '--tilt': '-6deg' }}>
                <span className="tp-stamp tp-stamp--round">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 30h7l3-7 4 13 3-6h7" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className="tp-stamp__title font-plush">Vet-checked & healthy</span>
                </span>
                <p className="tp-entry__text">Every puppy comes vaccinated, dewormed, and with a verified health certificate.</p>
              </li>

              {/* Stamp 2 */}
              <li className="tp-entry" style={{ '--ink-stamp': '#1f6b45', '--tilt': '5deg' }}>
                <span className="tp-stamp tp-stamp--ticket">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 50c10 4 20 4 30 0" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 3" />
                  </svg>
                  <span className="tp-stamp__title font-plush">Korea to Dubai, safely</span>
                </span>
                <p className="tp-entry__text">Trusted breeders, safe travel, and premium care from start to finish.</p>
              </li>

              {/* Stamp 3 */}
              <li className="tp-entry" style={{ '--ink-stamp': '#5a3a28', '--tilt': '-4deg' }}>
                <span className="tp-stamp tp-stamp--oval">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <path d="M10 14h44v28H30l-12 10v-10h-8z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="22" cy="28" r="2" fill="currentColor" />
                    <circle cx="32" cy="28" r="2" fill="currentColor" />
                    <circle cx="42" cy="28" r="2" fill="currentColor" />
                  </svg>
                  <span className="tp-stamp__title font-plush">Support 24/7</span>
                </span>
                <p className="tp-entry__text">Always here to help, from choosing your puppy to post-delivery support.</p>
              </li>

              {/* Stamp 4 */}
              <li className="tp-entry" style={{ '--ink-stamp': '#c2622b', '--tilt': '6deg' }}>
                <span className="tp-stamp tp-stamp--scallop">
                  <svg viewBox="0 0 64 64" className="tp-stamp__icon" aria-hidden="true">
                    <circle cx="32" cy="32" r="22" strokeWidth="3" />
                    <path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" strokeWidth="2.5" />
                  </svg>
                  <span className="tp-stamp__title font-plush">Trusted worldwide</span>
                </span>
                <p className="tp-entry__text">Puppies delivered to loving homes all around the world.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. HAPPY FAMILIES & PUPPIES (tp-dusk)
          ========================================================================= */}
      <section 
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-dusk py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#a65a30] to-[#4d2b19] text-white relative"
        aria-labelledby="dusk-title"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-scrawl text-lg text-honey font-bold">
                happy endings
              </p>
              <h2 id="dusk-title" className="font-plush text-5xl sm:text-6xl font-black text-white mt-1 leading-tight">
                Happy families & puppies
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/80 max-w-md font-normal">
                Over 64 moments and counting. Each polaroid is a life changed.
              </p>
            </div>
            <button
              onClick={() => navigate('/happy-families')}
              className="px-7 py-3.5 rounded-full bg-honey hover:bg-honey/80 text-cocoa font-bold text-sm shadow transition-all cursor-pointer"
            >
              View all 64 moments
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {polaroids.map((fam, idx) => {
              const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
              const tilt = tilts[idx % tilts.length];

              return (
                <div
                  key={fam.id || idx}
                  onClick={() => navigate('/happy-families')}
                  className={`bg-white p-3 pb-5 rounded-lg shadow-xl border border-black/10 cursor-pointer transform ${tilt} hover:rotate-0 hover:scale-105 transition-all duration-300`}
                >
                  <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-3 border border-black/5">
                    <img
                      src={fam.image_url || fam.photo_url || ''}
                      alt={fam.caption || 'Happy family'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-scrawl text-cocoa text-sm font-bold text-center line-clamp-1">
                    {fam.caption || 'Forever home ❤️'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dusk Mascot Stop */}
          <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-dusk__teddy hidden">
            <TeddyMascot pose="sit" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. QUESTIONS, ANSWERED (tp-night corkboard)
          ========================================================================= */}
      <section 
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-night py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#4d2b19] to-[#2f1a10] text-white relative"
        aria-labelledby="questions-title"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="questions-title" className="font-plush text-5xl sm:text-6xl font-black text-white leading-tight">
              Questions, answered
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/80 font-normal">
              Everything you need to know about adopting your new family member.
            </p>
          </div>

          {/* Night Mascot Stop */}
          <div data-pup-stop="true" data-pose="sit" data-facing="right" data-act="tilt" className="pup-stop tp-night__teddy hidden">
            <TeddyMascot pose="sit" />
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Are the puppies vaccinated and microchipped?',
                a: 'Yes, 100%. Every single puppy comes with up-to-date vaccinations according to international protocols, an ISO-compliant microchip, and full veterinary health certification.'
              },
              {
                q: 'Can I visit the nursery to meet the puppies in person?',
                a: 'Absolutely! Our serene showroom lounge is located in Downtown Dubai. You can book a private 30-minute nursery session to bond with the puppies before making your decision.'
              },
              {
                q: 'How does the imported puppy process work?',
                a: 'We partner with elite, vetted ethical breeders in Korea and Europe. We handle all MOCCAE UAE import permits, blood tests, and in-cabin flight nanny transport directly to you.'
              },
              {
                q: 'What is included in the homecoming starter pack?',
                a: 'Every puppy leaves with an organic nutrition starter pack, comfort plush toy with nursery scent, harness, leash, custom bed, and our comprehensive 24/7 puppy parenting guide.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-white/15 bg-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-plush text-lg sm:text-xl font-bold text-white">
                      {faq.q}
                    </span>
                    <span className="text-xl text-honey shrink-0 font-mono">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm sm:text-base text-white/80 leading-relaxed font-normal border-t border-white/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. READY TO MEET YOUR NEW BEST FRIEND? (tp-home CTA)
          ========================================================================= */}
      <section 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#2f1a10] to-[#24130b] text-white text-center relative"
        aria-labelledby="cta-title"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 id="cta-title" className="font-plush text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight">
            Ready to meet your new best friend?
          </h2>
          <p className="text-base sm:text-lg text-white/85 font-normal max-w-xl mx-auto leading-relaxed">
            Message us on WhatsApp to check puppy availability, book a private showroom cuddle, or request a bespoke import.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/puppies')}
              className="px-8 py-4 rounded-full bg-honey hover:bg-honey/90 text-cocoa font-bold text-base shadow-lg transition-all cursor-pointer"
            >
              View available puppies
            </button>
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20adopt%20a%20puppy."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#1b6b45] hover:bg-[#155a39] text-white font-bold text-base shadow-lg transition-all cursor-pointer"
            >
              WhatsApp +971 54 167 6733
            </a>
          </div>
        </div>

        {/* Sunset Horizon with Dubai Skyline Silhouette */}
        <div className="tp-horizon mt-16">
          <span className="tp-horizon__sun" />
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="tp-horizon__city">
            <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
          </svg>
        </div>
      </section>
    </div>
  );
}
