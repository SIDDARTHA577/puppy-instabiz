import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Curtain from './components/Curtain';
import PawCursor from './components/PawCursor';
import PawTrailCanvas from './components/PawTrailCanvas';
import SmoothScroll from './components/SmoothScroll';
import PupRunner from './components/PupRunner';

import Home from './pages/Home';
import Puppies from './pages/Puppies';
import PuppyDetail from './pages/PuppyDetail';
import HappyFamilies from './pages/HappyFamilies';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path === currentPath) return;
    setIsTransitioning(true);
    setTimeout(() => {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, 250);
    }, 150);
  };

  // Route matching
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <Home navigate={navigate} />;
    }
    if (currentPath === '/puppies' || currentPath === '/puppies/') {
      return <Puppies navigate={navigate} />;
    }
    if (currentPath.startsWith('/puppies/')) {
      const slug = currentPath.replace('/puppies/', '').replace(/\/$/, '');
      return <PuppyDetail slug={slug} navigate={navigate} />;
    }
    if (currentPath.startsWith('/puppy/')) {
      const slug = currentPath.replace('/puppy/', '').replace(/\/$/, '');
      return <PuppyDetail slug={slug} navigate={navigate} />;
    }
    if (currentPath === '/happy-families' || currentPath === '/happy-families/') {
      return <HappyFamilies navigate={navigate} />;
    }
    if (currentPath === '/how-it-works' || currentPath === '/how-it-works/') {
      return <HowItWorks navigate={navigate} />;
    }
    if (currentPath === '/faq' || currentPath === '/faq/') {
      return <FAQ navigate={navigate} />;
    }
    if (currentPath === '/contact' || currentPath === '/contact/') {
      return <Contact navigate={navigate} />;
    }
    if (currentPath === '/admin' || currentPath === '/admin/') {
      return <Admin navigate={navigate} />;
    }
    // Default fallback to Home
    return <Home navigate={navigate} />;
  };

  const isAdminPage = currentPath.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#f2be6b] selection:text-[#2a170e]">
      {/* Smooth scrolling with Lenis */}
      <SmoothScroll currentPath={currentPath} />

      {/* Global Interactive Mouse Trail Canvas */}
      <PawTrailCanvas />

      {/* Custom Paw Cursor */}
      <PawCursor />

      {/* Page-Wide Puppy Mascot Scroll Runner */}
      {!isAdminPage && (currentPath === '/' || currentPath === '') && <PupRunner />}

      {/* Page Curtain Transition */}
      <Curtain active={isTransitioning} />
      
      {/* Header */}
      {!isAdminPage && <Header currentPath={currentPath} navigate={navigate} />}
      
      {/* Main Page Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      {!isAdminPage && <Footer navigate={navigate} />}
    </div>
  );
}
