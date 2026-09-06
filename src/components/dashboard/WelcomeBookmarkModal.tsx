import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Smartphone, Monitor, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { updateUserWelcomeFlag } from '../../lib/firebase';

interface WelcomeBookmarkModalProps {
  uid: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeBookmarkModal({ uid, isOpen, onClose }: WelcomeBookmarkModalProps) {
  if (!isOpen) return null;

  const handleDismiss = async () => {
    try {
      if (uid) {
        await updateUserWelcomeFlag(uid, true);
      }
    } catch (err) {
      console.error('Failed to update welcome flag in Firestore:', err);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-brand-cyan/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 shadow-cyan-950/40"
        id="welcome-bookmark-modal"
      >
        {/* Glow and Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-inner">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-brand-cyan bg-cyan-950 px-2 py-0.5 rounded border border-brand-cyan/20">
              Setup Step 1 of 1
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
              Growth Operating System Initialized
            </h3>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Congratulations! Welcome to your Growth Operating System.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
            Please bookmark this page and add it to your desktop or mobile home screen for easy on-the-go access to your marketing campaigns, SEO generator, and diagnostic whiteboard.
          </p>
        </div>

        {/* Instructions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-750 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-brand-cyan font-display text-xs font-bold uppercase tracking-wider">
              <Monitor className="w-4 h-4" />
              <span>Desktop Browser</span>
            </div>
            <p className="font-sans text-xs text-slate-300">
              Press <kbd className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-white font-mono text-[11px]">Cmd + D</kbd> (Mac) or <kbd className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-white font-mono text-[11px]">Ctrl + D</kbd> (PC) to bookmark your personal URL.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-750 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-brand-cyan font-display text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-4 h-4" />
              <span>Mobile Phone</span>
            </div>
            <p className="font-sans text-xs text-slate-300">
              Tap the browser <strong className="text-white">Share</strong> icon, then select <strong className="text-brand-cyan">"Add to Home Screen"</strong> for direct 1-tap app launching.
            </p>
          </div>
        </div>

        {/* Call to action dismissal */}
        <button
          type="button"
          onClick={handleDismiss}
          className="w-full py-4 bg-brand-cyan hover:bg-cyan-400 active:scale-98 text-slate-950 font-display text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer"
          id="dismiss-welcome-btn"
        >
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>I've Bookmarked It — Enter My Whiteboard</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </motion.div>
    </div>
  );
}
