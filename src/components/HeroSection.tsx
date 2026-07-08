import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function HeroSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col md:flex-row bg-[#111111] overflow-hidden select-none border-b border-white/[0.02]"
      style={{
        background: 'radial-gradient(circle at 60% 50%, #222222 0%, #111111 100%)'
      }}
    >
      {/* Ambient background lightings */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-cyan/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-slate-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Split Layout Container */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-10 min-h-screen pt-28 pb-12 md:py-0">
        
        {/* Left Side: Marketing Copy (Vertically Centered) */}
        <div className="w-full md:w-[48%] flex flex-col justify-center py-6 md:py-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-cyan bg-cyan-950/40 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full inline-block mb-6">
              ET Digital Growth Operating Systems™
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
              Grow With <span className="text-brand-cyan whitespace-nowrap">ET Digital</span>
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Helping businesses engage audiences, convert more customers, and grow through strategic digital marketing powered by creativity, AI, and measurable results.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="group relative inline-flex items-center justify-center bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-[11px] font-black uppercase tracking-widest px-7 py-4 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer shadow-cyan-950/40"
                id="hero-playbook-cta-btn"
              >
                <span className="relative z-10 flex items-center gap-2">
                  LET'S CONNECT
                  <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => handleScrollTo('services')}
                className="group inline-flex items-center justify-center bg-transparent hover:bg-white/[0.03] border border-white/10 hover:border-brand-cyan/30 text-white font-display text-[11px] font-black uppercase tracking-widest px-7 py-4 rounded-xl transition-all active:scale-95 cursor-pointer"
                id="hero-services-cta-btn"
              >
                Explore Services
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Logo Animation (Vertically Centered) */}
        <div className="w-full md:w-[52%] flex items-center justify-center py-8 md:py-0 relative min-h-[40vh] md:min-h-0">
          <motion.div
            className="w-full relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Glow Behind Animation */}
            <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-cyan/[0.04] rounded-full blur-[100px] pointer-events-none" />

            {/* Clean, Borderless Aspect-Square Player Frame with Rounded Corners */}
            <div className="relative w-full aspect-square max-w-[420px] lg:max-w-[480px] rounded-3xl overflow-hidden bg-transparent flex items-center justify-center">
              
              {/* Native HTML5 Video for absolute borderless performance and transparency with rounded corners */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full absolute inset-0 object-cover pointer-events-none select-none mix-blend-screen scale-[1.05] rounded-3xl"
              >
                <source 
                  src="https://res.cloudinary.com/dnpvgq7gt/video/upload/Here_is_my_logo._instructions_202606260400_woxxvs.mp4" 
                  type="video/mp4" 
                />
                <source 
                  src="https://res.cloudinary.com/dnpvgq7gt/video/upload/Here_is_my_logo._instructions_202606260400_woxxvs.webm" 
                  type="video/webm" 
                />
                {/* Fallback to iframe if the native streaming formats are blocked */}
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dnpvgq7gt&public_id=Here_is_my_logo._instructions_202606260400_woxxvs&player[autoplay]=true&player[muted]=true&player[loop]=true&player[controls]=false&player[show_logo]=false&player[skin]=dark"
                  className="w-full h-full absolute inset-0 border-0 pointer-events-none select-none mix-blend-screen scale-[1.05] rounded-3xl"
                  allow="autoplay; encrypted-media"
                  title="ET Digital Brand Logo Animation"
                  referrerPolicy="no-referrer"
                />
              </video>
            </div>

            {/* ENGAGE.CONVERT.GROW. Tagline */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center font-mono text-[9px] tracking-[0.25em] font-black uppercase select-none whitespace-nowrap">
              <span className="text-white">ENGAGE.</span>
              <span className="text-white">CONVERT.</span>
              <span className="text-brand-cyan">GROW.</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
