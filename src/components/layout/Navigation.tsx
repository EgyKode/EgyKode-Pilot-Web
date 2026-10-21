import React, { useState, useEffect } from 'react';
import { IconArrowRight } from '../common/Icons';

interface NavigationProps {
  onOpenGetPilot?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenGetPilot }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme - default to light on first visit, or load saved selection
    const savedTheme = localStorage.getItem('pilot_theme_v2');
    const shouldBeDark = savedTheme === 'dark';
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('pilot_theme_v2', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('pilot_theme_v2', 'light');
    }
  };

  const navItems = [
    { label: 'How It Works', href: '#story' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Cost', href: '#cost' },
    { label: 'Features', href: '#features' },
    { label: 'Developers', href: '#blueprint' },
    { label: 'Enterprise', href: '#safety' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#07090b]/85 dark:bg-[#07090b]/85 light:bg-white/85 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo Lockup (Master Brand: EgyKode · Product: Pilot) */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group text-decoration-none">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0e141a] border border-white/10 flex items-center justify-center p-1.5 transition-all group-hover:border-[#22de7e]/50 group-hover:shadow-[0_0_15px_rgba(34,222,126,0.25)] shrink-0">
            <img src="/brand/pilot-mark.png" alt="EgyKode Pilot" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            {/* Master Brand: EgyKode */}
            <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight transition-colors">
              EgyKode
            </span>

            {/* Architectural Hierarchy Separator */}
            <span className="text-gray-500 dark:text-gray-500 font-light text-base select-none">
              /
            </span>

            {/* Service / Product Name: Pilot */}
            <span className="font-display font-bold text-sm sm:text-base text-[#22de7e] tracking-tight">
              Pilot
            </span>

            {/* Service Type Pill */}
            <span className="hidden sm:inline-block font-mono text-[9px] text-[#22de7e] bg-[#22de7e]/10 border border-[#22de7e]/30 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
              Compiler
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0f1316]/70 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs font-medium text-gray-300 hover:text-white px-3 py-1 rounded-full transition-colors hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[#0f1316] border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all"
            aria-label="Toggle Light/Dark Mode"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              // Sun icon for switching to light
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              // Moon icon for switching to dark
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <a
            href="#story"
            onClick={(e) => handleNavClick(e, '#story')}
            className="text-xs font-mono text-gray-400 hover:text-gray-200 transition-colors px-2 py-1"
          >
            See How It Works
          </a>

          <button
            onClick={onOpenGetPilot}
            className="btn-primary text-xs py-2 px-4 shadow-lg shadow-[#22de7e]/10"
          >
            Get Pilot
          </button>
        </div>

        {/* Mobile Actions: Theme Toggle + Menu */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-[#0f1316] border border-white/10 text-gray-300"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-[#0f1316] border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b0e11] border-b border-white/10 px-6 py-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3 mb-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-gray-300 hover:text-[#22de7e] py-1 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenGetPilot) onOpenGetPilot();
              }}
              className="btn-primary w-full text-center justify-center py-2.5"
            >
              Get EgyKode Pilot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
