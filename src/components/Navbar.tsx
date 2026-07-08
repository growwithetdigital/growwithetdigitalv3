import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, ArrowUpRight, Settings } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenBooking: () => void;
  onOpenWorkspaceHub: () => void;
  onOpenCaseStudies: () => void;
  onOpenTestimonials: () => void;
}

export default function Navbar({ 
  activeSection, 
  onOpenBooking, 
  onOpenWorkspaceHub,
  onOpenCaseStudies,
  onOpenTestimonials
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const beehiivUrl = "https://growwithetdigital.beehiiv.com";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-md py-3'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left aligned logo */}
        <div onClick={() => handleNavClick('home')} className="cursor-pointer flex items-center gap-3 group">
          <Logo />
          <div className="hidden lg:flex flex-col border-l border-slate-200 pl-3 py-0.5 text-left transition-colors duration-300">
            <span className="font-display text-[9px] font-black uppercase tracking-wider text-slate-900 leading-none">
              ET Digital
            </span>
            <span className="font-mono text-[7px] font-bold uppercase tracking-widest text-slate-400 leading-none mt-1">
              Growth Operating Systems™
            </span>
          </div>
        </div>

        {/* Centered navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className={`font-sans text-xs font-bold uppercase tracking-wider transition-colors hover:text-cyan-650 cursor-pointer ${
              activeSection === 'hero' ? 'text-cyan-650 font-extrabold' : 'text-slate-500'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`font-sans text-xs font-bold uppercase tracking-wider transition-colors hover:text-cyan-650 cursor-pointer ${
              activeSection === 'about' ? 'text-cyan-650 font-extrabold' : 'text-slate-500'
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`font-sans text-xs font-bold uppercase tracking-wider transition-colors hover:text-cyan-650 cursor-pointer ${
              activeSection === 'services' ? 'text-cyan-650 font-extrabold' : 'text-slate-500'
            }`}
          >
            Services
          </button>
          <button
            onClick={onOpenCaseStudies}
            className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-cyan-650 transition-colors cursor-pointer"
          >
            Case Studies
          </button>
          <button
            onClick={onOpenTestimonials}
            className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-cyan-650 transition-colors cursor-pointer"
          >
            Testimonials
          </button>
          <button
            onClick={() => handleNavClick('instagram-feed')}
            className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-cyan-650 inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            Social Feed
          </button>
          <a
            href={beehiivUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-cyan-650 inline-flex items-center gap-1 transition-colors"
          >
            Newsletter
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>
        </nav>

        {/* Right aligned call to action */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="group relative inline-flex items-center justify-center bg-slate-950 hover:bg-slate-900 text-white font-display text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 rounded-xl overflow-hidden transition-all shadow-md active:scale-95 cursor-pointer"
            id="navbar-booking-btn"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Book a Free Session
              <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile menu triggers */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl py-6 px-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left font-sans text-sm font-semibold py-2 border-b border-slate-100 text-slate-700 hover:text-cyan-600 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left font-sans text-sm font-semibold py-2 border-b border-slate-100 text-slate-700 hover:text-cyan-600 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left font-sans text-sm font-semibold py-2 border-b border-slate-100 text-slate-700 hover:text-cyan-600 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCaseStudies();
              }}
              className="text-left font-sans text-sm font-semibold py-2 border-b border-slate-100 text-slate-700 hover:text-cyan-600 cursor-pointer animate-none"
            >
              Case Studies
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestimonials();
              }}
              className="text-left font-sans text-sm font-semibold py-2 border-b border-slate-100 text-slate-700 hover:text-cyan-600 cursor-pointer animate-none"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleNavClick('instagram-feed')}
              className="text-left font-sans text-sm font-semibold py-2 border-b border-slate-100 text-slate-700 hover:text-cyan-600 cursor-pointer"
            >
              Social Feed
            </button>
            <a
              href={beehiivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-semibold py-2 border-b border-slate-100 text-slate-700 hover:text-cyan-600 flex justify-between items-center"
            >
              Newsletter
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 w-full bg-slate-950 text-white font-display text-xs font-extrabold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer shadow-md"
              id="navbar-mobile-booking-btn"
            >
              Book a Free Session
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
