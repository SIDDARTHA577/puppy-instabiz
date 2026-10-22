import React, { useState, useEffect, useRef } from 'react';
import TeddyMascot from './TeddyMascot';

const PAW_PATH =
  'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z';

const CUTE_SAYINGS = ['woof!', 'wheee!', 'boing!', 'I like you!', 'achoo!', 'yip!'];

export default function PupRunner() {
  const [actorState, setActorState] = useState({
    x: 0,
    y: 0,
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

  const measureStops = () => {
    const els = [...document.querySelectorAll('[data-pup-stop]')].filter(
      (el) => el.offsetParent !== null || el.getClientRects().length > 0
    );

    if (els.length === 0) return [];

    const stops = els.map((el) => {
      const rect = el.getBoundingClientRect();
      const docTop = rect.top + window.scrollY;
      const docLeft = rect.left + window.scrollX;
      const pose = el.dataset.pose || 'sit';
      const facing = el.dataset.facing === 'left' ? -1 : 1;
      const behind = el.dataset.behind === 'true';
      const act = el.dataset.act || '';
      const scale = Math.max(0.35, Math.min(1.1, rect.width / 260 || 0.65));

      return {
        el,
        x: docLeft,
        y: docTop,
        scale,
        facing,
        pose,
        behind,
        act,
        triggerScroll: Math.max(0, docTop - window.innerHeight * 0.55),
      };
    });

    stops.sort((a, b) => a.y - b.y);
    return stops;
  };

  useEffect(() => {
    document.documentElement.dataset.pup = 'live';

    const update = () => {
      const stops = measureStops();
      stopsRef.current = stops;
      if (stops.length === 0) return;

      const currentScroll = window.scrollY;
      const isScrolling = Math.abs(currentScroll - lastScrollY.current) > 1.5;
      lastScrollY.current = currentScroll;

      // Find current stop interval
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

      if (currIdx < stops.length - 1) {
        const range = Math.max(1, nextStop.triggerScroll - currentStop.triggerScroll);
        const progress = Math.max(0, Math.min(1, (currentScroll - currentStop.triggerScroll) / range));

        if (progress > 0.05 && progress < 0.95 && isScrolling) {
          // Mascot is running between stops!
          pose = 'runner';
          facing = nextStop.x >= currentStop.x ? 1 : -1;

          // S-curve interpolation
          const easeProgress = progress * progress * (3 - 2 * progress);
          x = currentStop.x + (nextStop.x - currentStop.x) * easeProgress;
          docY = currentStop.y + (nextStop.y - currentStop.y) * easeProgress;
          scale = currentStop.scale + (nextStop.scale - currentStop.scale) * easeProgress;
          behind = progress > 0.5 ? nextStop.behind : currentStop.behind;

          // Drop paw prints along trail
          const dist = Math.hypot(x - lastPrintPos.current.x, docY - lastPrintPos.current.y);
          if (dist > 65) {
            const angle = Math.atan2(docY - lastPrintPos.current.y, x - lastPrintPos.current.x);
            lastPrintPos.current = { x, y: docY };
            setPrints((prev) => [
              ...prev.slice(-20),
              {
                id: Date.now() + Math.random(),
                x: x + 60 * scale,
                y: docY + 80 * scale,
                angle,
                s: 14 * scale,
              },
            ]);
          }
        } else if (progress >= 0.95) {
          x = nextStop.x;
          docY = nextStop.y;
          scale = nextStop.scale;
          facing = nextStop.facing;
          pose = nextStop.pose;
          behind = nextStop.behind;
        }
      }

      // Convert docY to fixed viewport coordinate
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

      // Reset to idle pose when scrolling stops
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setActorState((prev) => ({
          ...prev,
          pose: stopsRef.current[currIdx]?.pose || 'sit',
        }));
      }, 160);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    // Initial positioning after DOM is ready
    const initTimer = setTimeout(update, 200);

    return () => {
      delete document.documentElement.dataset.pup;
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      clearTimeout(initTimer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  const handleActorClick = (e) => {
    e.stopPropagation();
    const randSaying = CUTE_SAYINGS[Math.floor(Math.random() * CUTE_SAYINGS.length)];
    say(randSaying);

    // Spawn hearts
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
              transform: `translate(${p.x}px, ${p.y}px) rotate(${p.angle}rad)`,
              fill: 'var(--color-toffee)',
              opacity: 0.45,
              pointerEvents: 'none',
              transition: 'opacity 2.5s ease-out',
            }}
          >
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pup-heart animate-bounce"
          style={{
            position: 'fixed',
            left: `${h.x}px`,
            top: `${h.y}px`,
            zIndex: 45,
            pointerEvents: 'none',
          }}
          onAnimationEnd={() =>
            setHearts((prev) => prev.filter((item) => item.id !== h.id))
          }
        >
          {h.icon}
        </span>
      ))}

      {/* Single Fixed Page-Wide Puppy Actor */}
      <div
        aria-hidden="true"
        className="pup-layer"
        data-front={actorState.behind ? 'false' : 'true'}
      >
        <div
          className="pup-actor"
          style={{
            transform: `translate3d(${actorState.x.toFixed(1)}px, ${actorState.y.toFixed(1)}px, 0)`,
          }}
          onClick={handleActorClick}
        >
          <div
            className="pup-actor__body"
            style={{
              transform: `scale(${actorState.scale * (actorState.facing < 0 ? -1 : 1)}, ${actorState.scale})`,
              transformOrigin: '150px 228px',
            }}
          >
            <TeddyMascot pose={actorState.pose} />
          </div>

          {/* Speech Bubble */}
          <span className="pup-bubble-at">
            <span
              className="pup-bubble"
              data-show={bubble.show ? 'true' : 'false'}
            >
              {bubble.text}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
