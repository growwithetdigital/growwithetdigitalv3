import React from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfwtjXUwkk1oNy7P3HweXWfpylVhR8ZDpOOANUyJwZ-Z9dg5Q/viewform?embedded=true';
  const directFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfwtjXUwkk1oNy7P3HweXWfpylVhR8ZDpOOANUyJwZ-Z9dg5Q/viewform';

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 transition-all duration-150 ${
        isOpen 
          ? 'opacity-100 pointer-events-auto visible' 
          : 'opacity-0 pointer-events-none invisible'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay background */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-150 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        id="booking-modal-overlay"
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl text-left overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] transition-all duration-150 transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'
        }`}
        id="lets-connect-modal"
      >
        {/* Background cyan glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800/80 shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-950/90 border border-brand-cyan/30 text-brand-cyan shadow-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-xl font-black text-white uppercase tracking-wider">
                Let's Connect
              </h3>
              <p className="text-[10px] font-mono text-slate-400">DIRECT INQUIRY & STRATEGY REQUEST</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            id="close-connect-modal-btn"
            title="Close Window"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto py-3 my-1 scrollbar-thin scrollbar-thumb-slate-800 relative z-10">
          <div className="rounded-xl bg-white border border-slate-800/80 overflow-hidden min-h-[500px]">
            <iframe
              src={formUrl}
              width="100%"
              height="556"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full h-[556px] rounded-xl border-0 bg-white"
              title="ET Digital Connect Form"
              loading="eager"
            >
              Loading Form...
            </iframe>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800/80 shrink-0 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-sans">
            <a 
              href={directFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-cyan flex items-center gap-1 font-mono text-slate-400 hover:underline transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>Close Window</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
