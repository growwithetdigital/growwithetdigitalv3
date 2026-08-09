import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Overlay background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            id="modal-overlay"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl text-left overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
            id="booking-form-modal"
          >
            {/* Background cyan glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-brand-cyan/30 text-brand-cyan shadow-sm">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                    Let's Connect
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">OFFICIAL ET DIGITAL CONTACT FORM</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                id="close-booking-modal-btn"
                title="Close Window"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Iframe Body */}
            <div className="flex-1 overflow-y-auto py-3 my-2 scrollbar-thin scrollbar-thumb-slate-800 rounded-xl bg-slate-950 border border-slate-800/80">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfwtjXUwkk1oNy7P3HweXWfpylVhR8ZDpOOANUyJwZ-Z9dg5Q/viewform?embedded=true"
                width="100%"
                height="691"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full rounded-xl min-h-[640px] border-0"
                title="ET Digital Let's Connect Contact Form"
              >
                Loading form...
              </iframe>
            </div>

            {/* Footer with Close Button */}
            <div className="pt-3 border-t border-slate-800/80 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-sans">
                <Send className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                <span>Form submits directly to ET Digital. Click close when complete.</span>
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Close Window</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
