import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SocialProofTicker from './components/SocialProofTicker';
import CreativeShowcase from './components/CreativeShowcase';
import InstagramFeedGrid from './components/InstagramFeedGrid';
import FounderBio from './components/FounderBio';
import CaseStudies from './components/CaseStudies';
import ClientTestimonials from './components/ClientTestimonials';
import HowWeBuildGrowth from './components/HowWeBuildGrowth';
import ServiceCardsDeepDive from './components/ServiceCardsDeepDive';
import PlaybookLeadMagnet from './components/PlaybookLeadMagnet';
import FAQSection from './components/FAQSection';
import InsightsBlogSection from './components/InsightsBlogSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import WorkspaceHub from './components/WorkspaceHub';
import LegalModals from './components/LegalModals';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'security'>('privacy');
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleOpenLegal = (type: 'privacy' | 'security') => {
    setLegalType(type);
    setIsLegalOpen(true);
  };

  const triggerToast = (title: string, message: string) => {
    setToast({ title, message });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Track active section for navbar highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'insights-blog'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-cyan/25 selection:text-slate-950 font-sans relative antialiased">
      
      {/* SECTION 1: Sticky Editorial Navigation */}
      <Navbar 
        activeSection={activeSection} 
        onOpenBooking={handleOpenBooking}
        onOpenWorkspaceHub={() => setIsWorkspaceOpen(true)}
        onOpenCaseStudies={() => triggerToast("Case Studies Portfolio", "Our comprehensive client success metrics are currently undergoing verified compilation for our next release. Let's discuss your brand's growth plan directly.")}
        onOpenTestimonials={() => triggerToast("Client Testimonials", "We are currently refresh-syncing our client review vault with Q1/Q2 partner letters. Work with us to learn about our verified results.")}
      />

      {/* SECTION 2: Hero Engine */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* SECTION 4: Horizontal Social Proof Ticker */}
      <SocialProofTicker />

      {/* SECTION 6: High-Fidelity Creative Showcase (Dynamic Media Module) */}
      <CreativeShowcase />

      {/* SECTION 6.5: Instagram Content Feed Grid */}
      <InstagramFeedGrid onOpenBooking={handleOpenBooking} />

      {/* SECTION 7: Editorial Founder Bio (About Section) */}
      <FounderBio />

      {/* SECTION 7.5: How We Build Growth (Four-step process) */}
      <HowWeBuildGrowth />

      {/* SECTION 8: Service Card Deep-Dive Architecture */}
      <ServiceCardsDeepDive onOpenBooking={handleOpenBooking} />

      {/* SECTION 9: Custom Growth Playbook Lead Magnet */}
      <PlaybookLeadMagnet onOpenBooking={handleOpenBooking} />

      {/* SECTION 9.5: Interactive 2026 Marketing FAQs Accordion */}
      <FAQSection />

      {/* SECTION 10: Strategic Insights & Newsletter Capture */}
      <InsightsBlogSection />

      {/* SECTION 11: The Enterprise Hub (Footer) */}
      <Footer 
        onOpenBooking={handleOpenBooking} 
        onOpenPrivacy={() => handleOpenLegal('privacy')}
        onOpenSecurity={() => handleOpenLegal('security')}
      />

      {/* INTEGRATIONS & PORTAL POPUPS */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <WorkspaceHub isOpen={isWorkspaceOpen} onClose={() => setIsWorkspaceOpen(false)} />
      
      {/* Dynamic Legal Modals */}
      <LegalModals 
        isOpen={isLegalOpen} 
        onClose={() => setIsLegalOpen(false)} 
        type={legalType} 
      />

      {/* Interactive Toast Notification Panel */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-2xl flex flex-col gap-3 text-left"
          >
            <div>
              <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-brand-cyan">
                {toast.title}
              </h4>
              <p className="font-sans text-xs text-slate-300 mt-1.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setToast(null);
                  handleOpenBooking();
                }}
                className="bg-brand-cyan hover:bg-cyan-500 text-slate-950 font-display text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Work with Us
              </button>
              <button
                onClick={() => setToast(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-display text-[9px] font-extrabold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
