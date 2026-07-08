import React from 'react';

export default function SocialProofTicker() {
  const logos = [
    { name: 'FORBES', industry: 'Business' },
    { name: 'TECHCRUNCH', industry: 'Technology' },
    { name: 'FAST COMPANY', industry: 'Innovation' },
    { name: 'WIRED', industry: 'Tech Trends' },
    { name: 'THE NEXT WEB', industry: 'Digital' },
    { name: 'INC. 5000', industry: 'Enterprise' },
    { name: 'BLOOMBERG', industry: 'Finance' },
    { name: 'HARVARD BIZ', industry: 'Strategy' },
  ];

  // Duplicate for seamless infinite loop scroll
  const scrollLogos = [...logos, ...logos, ...logos];

  return (
    <section id="social-ticker" className="py-10 bg-slate-950 border-y border-slate-900/60 overflow-hidden relative select-none">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
          Trusted Authority Channels & Network Distribution
        </span>
      </div>

      <div className="flex overflow-hidden">
        <div className="flex gap-16 items-center whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] py-3 cursor-pointer">
          {scrollLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0 group">
              <span className="font-display text-base font-black tracking-[0.25em] text-slate-500 group-hover:text-white transition-colors duration-300">
                {logo.name}
              </span>
              <span className="font-mono text-[8px] font-bold text-slate-400 border border-slate-900 rounded px-1.5 py-0.5 bg-slate-900/50 shadow-sm group-hover:border-brand-cyan/30 group-hover:text-brand-cyan transition-colors duration-300">
                {logo.industry}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom keyframe styles in line or class as needed, let's inject it into tailwind @keyframes in code */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
