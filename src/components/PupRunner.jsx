import React, { useState, useEffect, useRef } from 'react';
import TeddyMascot from './TeddyMascot';

const CUTE_SAYINGS = ['woof!', 'wheee!', 'boing!', 'I like you!', 'achoo!', 'yip!'];

export default function PupRunner() {
  const [actorState, setActorState] = useState({
    x: 0,
    y: -200,
    scale: 0.7,
    facing: 1,
    pose: 'peek',
    behind: false,
    visible: false,
  });

  const [bubble, setBubble] = useState({ show: false, text: '' });
  const [hearts, setHearts] = useState([]);
  const [prints, setPrints] = useState([]);

  const stopsRef = useRef([]);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const bubbleTimerRef = useRef(null);
  const lastPrintPos = useRef({ x: 0, y: 0 });

  const say = (text, duration = 2000) => {
    setBubble({ show: true, text });
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setBubble({ show: false, text: '' });
    }, duration);
  };

  // Measure stable document positions of all data-pup-stop elements
  const measureStops = () => {
    const els = [...document.querySelectorAll('[data-pup-stop]')].filter(
      (el) => el.offsetParent !== null || el.getClientRects().length > 0
    );

    if (els.length === 0) return [];

    const stops = els.map((el, idx) => {
      // Find parent section or scene to get stable document offset
      const scene = el.closest('.tp-scene') || el.closest('section') || el.closest('header') || el.closest('footer');
      const rect = el.getBoundingClientRect();
      
      // Calculate stable document Y
      let docTop = 0;
      let docLeft = 0;
      if (scene) {
        let curr = scene;
        let sceneTop = 0;
        let sceneLeft = 0;
        while (curr) {
          sceneTop += curr.offsetTop || 0;
          sceneLeft += curr.offsetLeft || 0;
          curr = curr.offsetParent;
        }
        const sceneRect = scene.getBoundingClientRect();
        const relTop = rect.top - sceneRect.top;
        const relLeft = rect.left - sceneRect.left;
        docTop = sceneTop + relTop;
        docLeft = sceneLeft + relLeft;
      } else {
        docTop = rect.top + window.scrollY;
        docLeft = rect.left + window.scrollX;
      }

      const pose = el.dataset.pose || 'sit';
      const facing = el.dataset.facing === 'left' ? -1 : 1;
      const behind = el.dataset.behind === 'true';
      const act = el.dataset.act || '';
      const scale = Math.max(0.4, Math.min(1.05, rect.width / 260 || 0.65));

      return {
        id: idx,
        el,
        x: docLeft,
        y: docTop,
        scale,
        facing,
        pose,
        behind,
        act,
        triggerScroll: Math.max(0, docTop - window.innerHeight * 0.45),
      };
    });

    // Sort strictly by stable document top once
    stops.sort((a, b) => a.y - b.y);
    return stops;
  };

  useEffect(() => {
    const updateStops = () => {
      stopsRef.current = measureStops();
    };

    updateStops();

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const isNearTop = currentScroll <= 15;

      // When at the very top of the homepage, let HeroLineup's static mascot render natively
      if (isNearTop) {
        if (document.documentElement.dataset.pup) {
          delete document.documentElement.dataset.pup;
        }
        setActorState((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        lastScrollY.current = currentScroll;
        return;
      }

      // Past the top hero stop: runner takes over
      if (document.documentElement.dataset.pup !== 'live') {
        document.documentElement.dataset.pup = 'live';
      }

      const stops = stopsRef.current;
      if (!stops || stops.length === 0) {
        updateStops();
        return;
      }

      const isMoving = Math.abs(currentScroll - lastScrollY.current) > 2;
      lastScrollY.current = currentScroll;

      // Find active interval
      let currIdx = 0;
      for (let i = 0; i < stops.length; i++) {
        if (currentScroll >= stops[i].triggerScroll) {
          currIdx = i;
        } else {
          break;
        }
      }

      const currentStop = stops[currIdx];
      const nextStop = stops[Math.min(stops.length - 1, currIdx + 1)];

      let x = currentStop.x;
      let docY = currentStop.y;
      let scale = currentStop.scale;
      let facing = currentStop.facing;
      let pose = currentStop.pose;
      let behind = currentStop.behind;

      if (currIdx < stops.length - 1 && nextStop.triggerScroll > currentStop.triggerScroll) {
        const range = nextStop.triggerScroll - currentStop.triggerScroll;
        const progress = Math.max(0, Math.min(1, (currentScroll - currentStop.triggerScroll) / range));

        if (progress > 0.08 && progress < 0.92 && isMoving) {
          pose = 'runner';
          facing = nextStop.x >= currentStop.x ? 1 : -1;

          // Smooth hermite ease
          const t = progress * progress * (3 - 2 * progress);
          x = currentStop.x + (nextStop.x - currentStop.x) * t;
          docY = currentStop.y + (nextStop.y - currentStop.y) * t;
          scale = currentStop.scale + (nextStop.scale - currentStop.scale) * t;
          behind = progress > 0.5 ? nextStop.behind : currentStop.behind;

          // Drop paw prints along trail
          const dist = Math.hypot(x - lastPrintPos.current.x, docY - lastPrintPos.current.y);
          if (dist > 75) {
            const angle = Math.atan2(docY - lastPrintPos.current.y, x - lastPrintPos.current.x);
            lastPrintPos.current = { x, y: docY };
            setPrints((prev) => [
              ...prev.slice(-18),
              {
                id: Date.now() + Math.random(),
                x: x + 50 * scale,
                y: docY + 70 * scale,
                angle,
                s: 13 * scale,
              },
            ]);
          }
        } else if (progress >= 0.92) {
          x = nextStop.x;
          docY = nextStop.y;
          scale = nextStop.scale;
          facing = nextStop.facing;
          pose = nextStop.pose;
          behind = nextStop.behind;
        }
      }

      const screenY = docY - currentScroll;

      setActorState({
        x,
        y: screenY,
        scale,
        facing,
        pose,
        behind,
        visible: true,
      });

      // Reset to idle dock pose when scroll pauses
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setActorState((prev) => ({
          ...prev,
          pose: stopsRef.current[currIdx]?.pose || 'sit',
        }));
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateStops();
      onScroll();
    }, { passive: true });

    // Initial measurement
    updateStops();
    onScroll();

    const t1 = setTimeout(() => {
      updateStops();
      onScroll();
    }, 200);

    const t2 = setTimeout(() => {
      updateStops();
      onScroll();
    }, 600);

    return () => {
      delete document.documentElement.dataset.pup;
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  const handleActorClick = (e) => {
    e.stopPropagation();
    const randSaying = CUTE_SAYINGS[Math.floor(Math.random() * CUTE_SAYINGS.length)];
    say(randSaying);

    setHearts((prev) => [
      ...prev.slice(-4),
      {
        id: Date.now() + Math.random(),
        x: actorState.x + (Math.random() - 0.5) * 40,
        y: actorState.y - 30,
        icon: Math.random() > 0.5 ? '❤️' : '🐾',
      },
    ]);
  };

  if (!actorState.visible) return null;

  return (
    <>
      {/* Hidden probe */}
      <div aria-hidden="true" className="pup-probe" />

      {/* Trailing Paw Prints on Document */}
      <div aria-hidden="true" className="pup-prints">
        {prints.map((p) => (
          <svg
            key={p.id}
            viewBox="0 0 64 64"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${p.s}px`,
              height: `${p.s}px`,
              transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.angle}rad)`,
              fill: 'currentColor',
            }}
            className="text-cocoa/20 animate-fade-out"
          >
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        ))}
      </div>

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

      {/* Fixed Mascot Layer on Top of Document */}
      <div
        className="pup-layer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: actorState.behind ? 20 : 35,
        }}
      >
        <div
          className="pup-actor cursor-pointer"
          onClick={handleActorClick}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'auto',
            transform: `translate3d(${actorState.x}px, ${actorState.y}px, 0) scale(${actorState.scale}) scaleX(${actorState.facing})`,
            transformOrigin: 'bottom center',
            transition: 'transform 0.08s linear',
          }}
        >
          <TeddyMascot pose={actorState.pose} className="w-56 h-auto drop-shadow-md select-none" />

          {/* Interactive Speech Bubble */}
          <span
            aria-hidden="true"
            className="pup-bubble font-scrawl font-bold"
            data-show={bubble.show ? 'true' : 'false'}
            style={{
              position: 'absolute',
              top: '-2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {bubble.text}
          </span>
        </div>
      </div>
    </>
  );
}
