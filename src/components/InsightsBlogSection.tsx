import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, Calendar, Clock, Search, Sparkles, MessageSquare, 
  TrendingUp, DollarSign, Heart, Eye, Users, Layers, Cpu, Share2, Activity,
  Grid
} from 'lucide-react';

export default function InsightsBlogSection() {
  const beehiivUrl = "https://growwithetdigital.beehiiv.com";

  return (
    <section id="insights-blog" className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 max-w-6xl mx-auto">
          <div className="max-w-xl text-left">
            <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-cyan-700 bg-cyan-100/80 border border-cyan-300 px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-sm">
              Operational Intelligence
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Featured Insights
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-700 mt-3 leading-relaxed font-normal">
              We don’t write fluff. We document growth operating systems, algorithmic shifts, and real-world execution metrics from active client campaigns.
            </p>
          </div>

          <a
            href={beehiivUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display text-xs font-black uppercase tracking-widest text-slate-950 hover:text-cyan-700 transition-colors bg-white border border-slate-300 shadow-sm px-5 py-3 rounded-xl hover:border-cyan-500"
          >
            <span>Explore All Publications</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-600" />
          </a>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 items-stretch">
          
          {/* ARTICLE 1: AI SEARCH SHIFT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col justify-between bg-white rounded-3xl border-2 border-slate-200/90 p-5 transition-all duration-300 hover:shadow-2xl hover:border-brand-cyan hover:-translate-y-1 h-full shadow-md"
          >
            <div className="flex flex-col flex-1">
              {/* Bespoke Graphic Card 1: AI Search Shift */}
              <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-5 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-4 border border-slate-800 shadow-inner flex flex-col justify-between select-none">
                
                {/* Top Bar Label */}
                <div className="flex items-center justify-between z-10">
                  <span className="font-mono text-[9px] font-black tracking-wider text-brand-cyan bg-cyan-950/90 border border-brand-cyan/40 px-2.5 py-1 rounded-md uppercase">
                    AI SEARCH SHIFT
                  </span>
                  <span className="font-mono text-[10px] font-black text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    AEO INDEX
                  </span>
                </div>

                {/* Center Visual: Fragmented Search Bar turning into AI Chat Bubbles */}
                <div className="relative my-auto flex flex-col items-center justify-center py-2">
                  {/* Fragmented Search Bar */}
                  <div className="w-full max-w-[220px] bg-slate-900/90 border border-cyan-500/40 rounded-xl p-2.5 flex items-center justify-between shadow-lg shadow-cyan-950/50 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Search className="w-3.5 h-3.5 text-brand-cyan" />
                      <span className="font-sans text-[10px] text-slate-400 font-mono line-through decoration-rose-500 decoration-2">
                        google.com/search
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />

                    {/* Crack effect SVG overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-brand-cyan/60 stroke-[1.5]" viewBox="0 0 200 40">
                      <path d="M 40 0 L 55 20 L 70 12 L 95 40" />
                      <path d="M 120 0 L 135 25 L 150 15 L 170 40" />
                    </svg>
                  </div>

                  {/* Scattered Floating AI Bubbles */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1 bg-cyan-950/80 border border-brand-cyan/50 text-brand-cyan px-2 py-1 rounded-lg text-[9px] font-mono font-bold shadow-md shadow-cyan-950/60 animate-bounce">
                      <Sparkles className="w-3 h-3 text-brand-cyan" />
                      <span>ChatGPT</span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-900 border border-cyan-400/40 text-cyan-300 px-2 py-1 rounded-lg text-[9px] font-mono font-bold shadow-md">
                      <MessageSquare className="w-3 h-3 text-cyan-300" />
                      <span>Gemini</span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-900 border border-emerald-500/40 text-emerald-400 px-2 py-1 rounded-lg text-[9px] font-mono font-bold shadow-md">
                      <Cpu className="w-3 h-3 text-emerald-400" />
                      <span>AI Overviews</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 z-10">
                  <span className="font-serif italic text-[11px] text-slate-300 font-semibold">
                    Answer Engine Era
                  </span>
                  <span className="font-mono text-[9px] font-bold text-brand-cyan">
                    40%+ SEARCH DISRUPTION
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500 font-bold mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Jul 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  5 Min Read
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-black text-slate-950 tracking-tight leading-snug group-hover:text-cyan-700 transition-colors mb-3">
                Google Isn't Where Your Customers Are Searching Anymore
              </h3>

              {/* Summary */}
              <p className="font-sans text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                AI answer engines are replacing the search bar as the first place buyers look for recommendations — and most websites are invisible to them. We break down what's actually driving visibility in the answer engine era, and the one structural fix most sites are missing.
              </p>
            </div>

            {/* See Post Button */}
            <div className="pt-4 border-t border-slate-100 mt-auto">
              <a 
                href={beehiivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full text-xs font-display font-black uppercase tracking-widest text-slate-950 hover:text-cyan-700 transition-colors group-hover:translate-x-0.5"
              >
                <span>See Post</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>


          {/* ARTICLE 2: GROWTH MEASUREMENT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex flex-col justify-between bg-white rounded-3xl border-2 border-slate-200/90 p-5 transition-all duration-300 hover:shadow-2xl hover:border-brand-cyan hover:-translate-y-1 h-full shadow-md"
          >
            <div className="flex flex-col flex-1">
              {/* Bespoke Graphic Card 2: Growth Measurement */}
              <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-5 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-4 border border-slate-800 shadow-inner flex flex-col justify-between select-none">
                
                {/* Top Bar Label */}
                <div className="flex items-center justify-between z-10">
                  <span className="font-mono text-[9px] font-black tracking-wider text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 rounded-md uppercase">
                    GROWTH MEASUREMENT
                  </span>
                  <span className="font-mono text-[10px] font-black text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    REAL PIPELINE
                  </span>
                </div>

                {/* Center Visual: Faded Vanity Metrics vs Bold Glowing Revenue Chart */}
                <div className="relative my-auto w-full py-2">
                  {/* Grayed-out background vanity metrics */}
                  <div className="flex items-center justify-center gap-4 opacity-25 grayscale mb-2">
                    <span className="flex items-center gap-1 font-mono text-[9px] text-slate-400 line-through">
                      <Heart className="w-3 h-3" /> 12.4K
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[9px] text-slate-400 line-through">
                      <Eye className="w-3 h-3" /> 150K Views
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[9px] text-slate-400 line-through">
                      <Users className="w-3 h-3" /> 45K Followers
                    </span>
                  </div>

                  {/* Bold Cyan Line Chart with Glowing Revenue Signal */}
                  <div className="relative bg-slate-900/90 border border-brand-cyan/50 rounded-xl p-3 shadow-lg shadow-cyan-950/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] font-extrabold text-slate-300 uppercase tracking-wider">
                        GOS REVENUE SIGNAL
                      </span>
                      <span className="font-mono text-xs font-black text-brand-cyan bg-cyan-950 border border-brand-cyan/40 px-2 py-0.5 rounded">
                        +$280k PIPELINE
                      </span>
                    </div>

                    {/* SVG Sparkline */}
                    <svg className="w-full h-10 overflow-visible" viewBox="0 0 200 40">
                      <path 
                        d="M 0 35 Q 40 32, 80 25 T 140 18 T 200 4" 
                        fill="none" 
                        stroke="#06b6d4" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                      <circle cx="200" cy="4" r="5" fill="#06b6d4" className="animate-ping" />
                      <circle cx="200" cy="4" r="4" fill="#ffffff" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 z-10">
                  <span className="font-serif italic text-[11px] text-slate-300 font-semibold">
                    Signal Over Noise
                  </span>
                  <span className="font-mono text-[9px] font-bold text-emerald-400">
                    QUALIFIED DEALS ONLY
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500 font-bold mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Jul 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  4 Min Read
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-black text-slate-950 tracking-tight leading-snug group-hover:text-cyan-700 transition-colors mb-3">
                Stop Measuring Impressions. Measure What Pays Your Bills.
              </h3>

              {/* Summary */}
              <p className="font-sans text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                Impressions and follower counts feel productive but rarely move revenue. We walk through the single metric inside every GOS client dashboard that actually predicts pipeline — and why most reporting hides it.
              </p>
            </div>

            {/* See Post Button */}
            <div className="pt-4 border-t border-slate-100 mt-auto">
              <a 
                href={beehiivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full text-xs font-display font-black uppercase tracking-widest text-slate-950 hover:text-cyan-700 transition-colors group-hover:translate-x-0.5"
              >
                <span>See Post</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>


          {/* ARTICLE 3: GROWTH SYSTEMS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group flex flex-col justify-between bg-white rounded-3xl border-2 border-slate-200/90 p-5 transition-all duration-300 hover:shadow-2xl hover:border-brand-cyan hover:-translate-y-1 h-full shadow-md"
          >
            <div className="flex flex-col flex-1">
              {/* Bespoke Graphic Card 3: Growth Systems */}
              <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-5 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-4 border border-slate-800 shadow-inner flex flex-col justify-between select-none">
                
                {/* Top Bar Label */}
                <div className="flex items-center justify-between z-10">
                  <span className="font-mono text-[9px] font-black tracking-wider text-cyan-300 bg-cyan-950/90 border border-cyan-400/40 px-2.5 py-1 rounded-md uppercase">
                    GROWTH SYSTEMS
                  </span>
                  <span className="font-mono text-[10px] font-black text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    SYSTEM VS TACTICS
                  </span>
                </div>

                {/* Center Visual: Interlocking GOS Engine Grid vs Scattered Content Icons */}
                <div className="relative my-auto w-full py-1">
                  {/* Faded background chaotic content icons */}
                  <div className="absolute inset-0 flex items-center justify-around opacity-15 pointer-events-none">
                    <span className="font-mono text-[8px] text-slate-400">post_1.png</span>
                    <span className="font-mono text-[8px] text-slate-400">story_draft.mov</span>
                    <span className="font-mono text-[8px] text-slate-400">reel_3.mp4</span>
                  </div>

                  {/* Interlocking 6-Node GOS System Grid */}
                  <div className="relative bg-slate-900/95 border border-brand-cyan/40 rounded-xl p-2.5 shadow-xl shadow-cyan-950/60">
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { name: 'POSITION', active: true },
                        { name: 'AEO INDEX', active: true },
                        { name: 'FUNNELS', active: true },
                        { name: 'CONTENT', active: true },
                        { name: 'AUTOMATION', active: true },
                        { name: 'PIPELINE', active: true }
                      ].map((node, i) => (
                        <div 
                          key={i} 
                          className="bg-slate-950 border border-brand-cyan/40 rounded-lg p-1.5 text-center flex flex-col items-center justify-center shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mb-1 animate-pulse" />
                          <span className="font-mono text-[7px] font-extrabold text-slate-200 tracking-tighter">
                            {node.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 z-10">
                  <span className="font-serif italic text-[11px] text-slate-300 font-semibold">
                    Engine Architecture
                  </span>
                  <span className="font-mono text-[9px] font-bold text-brand-cyan">
                    6-MODULE INTEGRATION
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500 font-bold mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Jul 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  6 Min Read
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-black text-slate-950 tracking-tight leading-snug group-hover:text-cyan-700 transition-colors mb-3">
                Stop Building Content. Start Building a System.
              </h3>

              {/* Summary */}
              <p className="font-sans text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                Posting more is not a strategy — it's a treadmill. We outline the difference between a content calendar and an actual growth system, and the one architectural shift that stops the "post and pray" cycle for good.
              </p>
            </div>

            {/* See Post Button */}
            <div className="pt-4 border-t border-slate-100 mt-auto">
              <a 
                href={beehiivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full text-xs font-display font-black uppercase tracking-widest text-slate-950 hover:text-cyan-700 transition-colors group-hover:translate-x-0.5"
              >
                <span>See Post</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Weekly Newsletter Banner Module */}
        <div className="mt-20 max-w-5xl mx-auto bg-slate-950 rounded-3xl p-8 md:p-12 border-2 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 via-transparent to-slate-950 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-cyan via-cyan-300 to-brand-cyan" />
          
          <div className="text-left max-w-2xl relative z-10">
            <div>
              <span className="font-mono text-[9px] font-extrabold text-brand-cyan bg-cyan-950/90 border border-brand-cyan/30 px-3.5 py-1.5 rounded-full inline-block mb-3 uppercase tracking-[0.25em]">
                The ET Digital Weekly
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Stay Ahead of What’s Next in Digital Marketing
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-normal">
                Join business owners, marketers, and leaders who want practical digital marketing insights—without the jargon. Every week you’ll receive actionable strategies, emerging AI tools, marketing trends, real-world case studies, and free resources to help your business grow with confidence.
              </p>
            </div>
          </div>

          {/* Join Newsletter Button directly opening Beehiiv */}
          <div className="relative z-10 shrink-0 w-full lg:w-auto text-center lg:text-right">
            <a 
              href={beehiivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest px-8 py-5 rounded-xl transition-all shadow-xl shadow-cyan-950/60 active:scale-95 cursor-pointer w-full lg:w-auto text-center"
            >
              <span className="flex items-center justify-center gap-2">
                Join the ET Digital Weekly
                <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
            <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider text-center lg:text-right mt-3 font-semibold">
              Get the Next Issue Free
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

