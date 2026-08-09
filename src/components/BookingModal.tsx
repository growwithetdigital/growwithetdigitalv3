import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Mail, Copy, Check, ExternalLink } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'hello@growwithetdigital.com';
  const mailtoUrl = `mailto:${emailAddress}?subject=Re:%20Let's%20Connect`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl text-left overflow-hidden z-10 my-auto flex flex-col"
            id="booking-form-modal"
          >
            {/* Background cyan glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-brand-cyan/30 text-brand-cyan shadow-sm">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                    Let's Connect
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">DIRECT EMAIL INQUIRY DISPATCH</p>
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

            {/* Body */}
            <div className="py-6 space-y-5 relative z-10">
              <div className="text-center sm:text-left">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Send a direct email to our strategy team at ET Digital. We respond within 24 hours.
                </p>
              </div>

              {/* Email details card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">To Email:</span>
                  <span className="text-brand-cyan font-bold font-mono text-xs">{emailAddress}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-2.5">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">Subject Line:</span>
                  <span className="text-white font-semibold font-mono text-xs">Re: Let's Connect</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={mailtoUrl}
                  onClick={() => {
                    // Give mailto a slight moment before closing if user opened client
                  }}
                  className="w-full bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest py-4 px-6 rounded-xl transition-all shadow-lg shadow-cyan-950/50 cursor-pointer flex items-center justify-center gap-2.5 group"
                >
                  <Mail className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Open Email Client</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-slate-700/80"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Email Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800/80 shrink-0 flex items-center justify-between relative z-10">
              <span className="text-[11px] text-slate-400">
                hello@growwithetdigital.com
              </span>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 cursor-pointer"
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
