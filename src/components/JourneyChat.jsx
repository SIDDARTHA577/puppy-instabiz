import React, { useState, useEffect, useRef } from 'react';
import TeddyMascot from './TeddyMascot';

const STEPS = [
  {
    num: 1,
    title: 'Choose your breed',
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    num: 2,
    title: 'Get photos & details',
    text: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.',
  },
  {
    num: 3,
    title: 'Secure & safe delivery',
    text: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.',
  },
];

const BREEDS = [
  { label: 'Maltipoo', href: '/puppies?breed=maltipoo' },
  { label: 'Pomeranian', href: '/puppies?breed=pomeranian' },
  { label: 'Poodle', href: '/puppies?breed=poodle' },
  { label: 'Cavapoo', href: '/puppies?breed=cavapoo' },
  { label: 'Shih Tzu', href: '/puppies?breed=shih-tzu' },
];

const SHOWROOM_PHOTOS = [
  {
    src: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FFHyoHcIosLZE%2F60f6e7e00a%2F27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg&w=640&q=75',
    alt: 'Showroom puppy 1',
  },
  {
    src: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FVi-kzyvemRl4%2Fe740ed8a24%2F27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg&w=640&q=75',
    alt: 'Showroom puppy 2',
  },
  {
    src: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=640&q=75',
    alt: 'Showroom puppy 3',
  },
];

export default function JourneyChat({ navigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const stepsListRef = useRef(null);
  const prevStepRef = useRef(0);

  useEffect(() => {
    if (!stepsListRef.current) return;
    const items = [...stepsListRef.current.children];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            if (idx !== -1) {
              setActiveStep(idx);
            }
          }
        }
      },
      {
        rootMargin: '-28% 0px -62% 0px',
      }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Show typing indicator on step change
  useEffect(() => {
    if (activeStep > prevStepRef.current) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 750);
      prevStepRef.current = activeStep;
      return () => clearTimeout(timer);
    }
    prevStepRef.current = activeStep;
  }, [activeStep]);

  return (
    <div data-section="journey">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-chat"
        style={{ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' }}
        aria-labelledby="journey-title"
      >
        <div className="tp-chat__grid gutter" data-pin-range="true">
          {/* Story Side: Left Column */}
          <div className="tp-chat__story">
            <h2 id="journey-title" className="font-plush text-huge">
              Your puppy journey
            </h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            <ol ref={stepsListRef} className="tp-chat__steps">
              {STEPS.map((step, idx) => (
                <li
                  key={step.num}
                  className="tp-chat__step"
                  data-active={idx === activeStep ? 'true' : undefined}
                  data-done={idx < activeStep ? 'true' : undefined}
                >
                  <span className="tp-chat__num font-plush" aria-hidden="true">
                    {step.num}
                  </span>
                  <h3 className="font-plush tp-chat__title">{step.title}</h3>
                  <p className="tp-chat__text">{step.text}</p>
                </li>
              ))}
            </ol>

            <button
              onClick={() => navigate('/how-it-works')}
              className="btn btn-ghost tp-chat__cta cursor-pointer"
            >
              How it works
            </button>
          </div>

          {/* Sticky Interactive Phone: Right Column */}
          <div className="tp-chat__side">
            <div
              className="tp-phone"
              aria-label="A WhatsApp conversation with TeddyPups U.A.E."
              role="group"
            >
              {/* Phone Bar */}
              <div className="tp-phone__bar">
                <img
                  src="/brand/logo.png"
                  alt="TeddyPups"
                  className="tp-phone__avatar object-cover"
                />
                <span>
                  <span className="tp-phone__name">TeddyPups U.A.E.</span>
                  <span className="tp-phone__status">online</span>
                </span>
              </div>

              {/* Chat Screen */}
              <div className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">
                  Hi TeddyPups! I'd love to know more about your puppies.
                </p>

                {/* Step 0 Messages: Choose Breed */}
                <div
                  className="tp-msg-group"
                  data-step="0"
                  data-show={activeStep >= 0 ? 'true' : 'false'}
                >
                  <div className="tp-msg tp-msg--them">
                    <p>
                      Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.
                    </p>
                    <ul className="tp-chips" aria-label="Breeds we have now">
                      {BREEDS.map((b) => (
                        <li key={b.label}>
                          <a
                            href={b.href}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(b.href);
                            }}
                          >
                            {b.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step 1 Messages: Photos & Videos */}
                <div
                  className="tp-msg-group"
                  data-step="1"
                  data-show={activeStep >= 1 ? 'true' : 'false'}
                >
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-snaps">
                      {SHOWROOM_PHOTOS.map((photo, i) => (
                        <span key={i} className="tp-snaps__one">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2 Messages: Safe Delivery & Route */}
                <div
                  className="tp-msg-group"
                  data-step="2"
                  data-show={activeStep >= 2 ? 'true' : 'false'}
                >
                  <div className="tp-msg tp-msg--them">
                    <p>
                      Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                    </p>
                    <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                      <path
                        d="M14 52 C 60 6, 120 70, 170 28"
                        className="tp-route__line"
                      />
                      <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                      <path
                        d="M164 32 l12 -12 l12 12 v14 h-24 z"
                        className="tp-route__home"
                      />
                      <path
                        d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
                        className="tp-route__heart"
                      />
                      <path
                        d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
                        transform="translate(70 22) scale(.3) rotate(70 32 32)"
                        className="tp-route__paw"
                      />
                      <path
                        d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
                        transform="translate(104 38) scale(.3) rotate(100 32 32)"
                        className="tp-route__paw"
                      />
                    </svg>
                  </div>
                </div>

                {/* Typing Dots */}
                <p
                  className="tp-typing"
                  data-show={isTyping ? 'true' : 'false'}
                  aria-hidden="true"
                >
                  <span />
                  <span />
                  <span />
                </p>
              </div>

              {/* Compose Link */}
              <a
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
                className="tp-phone__compose"
              >
                <span>Say hello on WhatsApp</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
                </svg>
              </a>
            </div>

            {/* Mascot Sitting Beside Phone */}
            <div
              data-pup-stop="true"
              data-pose="sit"
              data-facing="right"
              className="pup-stop tp-chat__teddy"
            >
              <TeddyMascot pose="sit" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
