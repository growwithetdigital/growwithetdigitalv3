import React from 'react';

export default function SocialProofTicker() {
  const logos = [
    { name: 'AD AGE', industry: 'Advertising' },
    { name: 'ADWEEK', industry: 'Media' },
    { name: 'MARKETING WEEK', industry: 'Strategy' },
    { name: 'DIGIDAY', industry: 'Digital' },
    { name: 'HARVARD BUSINESS REVIEW', industry: 'Leadership' },
    { name: 'THINK WITH GOOGLE', industry: 'Insights' },
  ];

  // Duplicate for seamless infinite loop scroll
  const scrollLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section id="social-ticker" className="py-12 bg-[#0d0d0d] border-y border-white/[0.02] overflow-hidden relative select-none">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col items-center text-center gap-1.5">
        <div className="flex items-center gap-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          <h2 className="font-display text-xs font-black uppercase tracking-[0.25em] text-slate-100">
            Staying Current
          </h2>
        </div>
        <p className="font-sans text-[11px] text-slate-400 tracking-wide max-w-xl leading-relaxed">
          The publications I read every week to stay ahead of what's actually working in marketing.
        </p>
      </div>

      <div className="flex overflow-hidden">
        <div className="flex gap-16 items-center whitespace-nowrap animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] py-3 cursor-pointer">
          {scrollLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0 group">
              <span className="font-display text-sm sm:text-base font-black tracking-[0.25em] text-slate-600 group-hover:text-white transition-colors duration-300">
                {logo.name}
              </span>
              <span className="font-mono text-[8px] font-bold text-slate-500 border border-slate-900 rounded px-1.5 py-0.5 bg-slate-900/50 shadow-sm group-hover:border-brand-cyan/30 group-hover:text-brand-cyan transition-colors duration-300">
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
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
