import React, { useState, useEffect, useRef } from 'react';
import { Lock, X } from 'lucide-react';

export default function Header({ currentPath, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      setScrolled(curY > 8);

      const diff = Math.abs(curY - lastScrollYRef.current);
      if (diff > 6) {
        if (curY > lastScrollYRef.current && curY > 220) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollYRef.current = curY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Puppies', path: '/puppies' },
    { label: 'Happy families', path: '/happy-families' },
    { label: 'How it works', path: '/how-it-works' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Visit & contact', path: '/contact' },
  ];

  const handleNav = (path, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header 
      id="site-header"
      data-scrolled={scrolled}
      data-hidden={hidden}
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'bg-[#fffdf8]/95 backdrop-blur-md shadow-[0_4px_20px_-4px_#2a170e1a]' : 'bg-[#fffdf8]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a 
            href="/" 
            onClick={(e) => handleNav('/', e)}
            className="flex items-center gap-3 group select-none"
            aria-label="TeddyPups U.A.E. — home"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-toffee/30 shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 bg-honey/20 flex items-center justify-center">
              <img 
                src="/brand/logo.png" 
                alt="TeddyPups Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/icon.png';
                }}
              />
            </div>
            <span className="font-plush text-2xl sm:text-3xl font-black text-cocoa tracking-tight leading-none group-hover:text-toffee transition-colors">
              TeddyPups
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Main" className="hidden lg:flex items-center gap-1 xl:gap-2">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = item.path === '/' 
                  ? currentPath === '/' 
                  : currentPath.startsWith(item.path);

                return (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => handleNav(item.path, e)}
                      data-active={isActive}
                      className={`relative px-3.5 py-2 text-[0.98rem] font-bold transition-all duration-200 flex flex-col items-center justify-center group ${
                        isActive 
                          ? 'text-toffee-deep' 
                          : 'text-cocoa hover:text-toffee-ink'
                      }`}
                    >
                      <span className="relative">
                        {item.label}
                        <span className={`block h-[2px] bg-toffee transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} />
                      </span>
                      {isActive && (
                        <span className="text-toffee text-xs mt-0.5 leading-none select-none animate-bounce" aria-hidden="true">
                          🐾
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action: WhatsApp & Staff Access */}
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies." 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#1b6b45] hover:bg-[#155a39] text-white font-bold text-sm shadow-[0_3px_0_#0f4228] transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <span>WhatsApp us</span>
            </a>

            <button
              onClick={() => handleNav('/admin')}
              title="Staff Portal"
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                currentPath === '/admin' 
                  ? 'bg-toffee text-white' 
                  : 'text-cocoa-soft/60 hover:text-cocoa hover:bg-honey/20'
              }`}
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-3.5 text-sm font-bold text-cocoa transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <>
                  <svg viewBox="0 0 64 64" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                  </svg>
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scalloped Hem SVG Pattern from reference */}
      <svg aria-hidden="true" className="w-full h-3.5 fill-current text-milk drop-shadow-xs" preserveAspectRatio="none">
        <defs>
          <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0H44V2A22 11 0 0 1 0 2Z" fill="#fffdf8" />
            <path d="M0 2A22 11 0 0 0 44 2" fill="none" stroke="#2a170e" strokeWidth="1.6" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tp-hem)" />
      </svg>

      {/* Mobile Menu Dialog */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-honey z-40 p-6 flex flex-col justify-between overflow-y-auto animate-fadeIn">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-cocoa/20">
              <span className="font-scrawl text-xl text-cocoa">where to, friend?</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="h-10 px-4 rounded-full bg-cocoa text-milk font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

            <nav className="mt-6">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => handleNav(item.path, e)}
                      className="font-plush block py-2 text-3xl font-bold text-cocoa hover:text-toffee transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="pt-6 border-t border-cocoa/20 space-y-3">
            <a
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-bold text-center block shadow"
            >
              WhatsApp us
            </a>
            <p className="text-center text-sm font-semibold text-cocoa">+971 54 167 6733</p>
          </div>
        </div>
      )}
    </header>
  );
}
