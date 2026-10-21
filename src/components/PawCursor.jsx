import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function PawCursor() {
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pawPrints, setPawPrints] = useState([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on mouse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = (e) => {
      setIsPressed(true);
      const newPrint = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        tilt: (Math.random() - 0.5) * 30,
      };
      setPawPrints((prev) => [...prev.slice(-10), newPrint]);
    };

    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Click Paw Trails */}
      {pawPrints.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.6, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-5 h-5 text-toffee/40 fill-current"
          style={{
            left: p.x - 10,
            top: p.y - 10,
            transform: `rotate(${p.tilt}deg)`,
          }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full fill-current">
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        </motion.div>
      ))}

      {/* Main Cursor Paw */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-20%',
          translateY: '-20%',
        }}
        animate={{
          scale: isPressed ? 0.85 : 1,
          rotate: isPressed ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <img
          src={isPressed ? '/cursor/paw-press.svg' : '/cursor/paw.svg'}
          alt=""
          className="w-full h-full drop-shadow-sm select-none"
          draggable="false"
        />
      </motion.div>
    </div>
  );
}
