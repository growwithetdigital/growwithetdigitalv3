import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import googleSearchShiftImg from '../assets/images/google_search_shift_1786291751268.jpg';
import revenueMetricsImg from '../assets/images/revenue_metrics_1786291769449.jpg';
import growthSystemEngineImg from '../assets/images/stop_content_system_clean_1786293327281.jpg';

export default function InsightsBlogSection() {
  const beehiivUrl = "https://growwithetdigital.beehiiv.com";

  const articles = [
    {
      id: 'ai-search-shift',
      category: 'AI SEARCH SHIFT',
      tagBadge: 'AEO INDEX',
      title: "Google Isn't Where Your Customers Are Searching Anymore",
      summary: "AI answer engines are replacing the search bar as the first place buyers look for recommendations — and most websites are invisible to them. We break down what's actually driving visibility in the answer engine era, and the one structural fix most sites are missing.",
      date: 'Jul 2026',
      readTime: '5 Min Read',
      imageUrl: googleSearchShiftImg,
      badgeColor: 'text-brand-cyan bg-slate-950/90 border-brand-cyan/40'
    },
    {
      id: 'growth-measurement',
      category: 'GROWTH MEASUREMENT',
      tagBadge: 'REAL PIPELINE',
      title: 'Stop Measuring Impressions. Measure What Pays Your Bills.',
      summary: 'Impressions and follower counts feel productive but rarely move revenue. We walk through the single metric inside every GOS client dashboard that actually predicts pipeline — and why most reporting hides it.',
      date: 'Jul 2026',
      readTime: '4 Min Read',
      imageUrl: revenueMetricsImg,
      badgeColor: 'text-emerald-400 bg-slate-950/90 border-emerald-500/40'
    },
    {
      id: 'growth-systems',
      category: 'GROWTH SYSTEMS',
      tagBadge: 'SYSTEM ENGINE',
      title: 'Stop Building Content. Start Building a System.',
      summary: 'Posting more is not a strategy — it\'s a treadmill. We outline the difference between a content calendar and an actual growth system, and the one architectural shift that stops the "post and pray" cycle for good.',
      date: 'Jul 2026',
      readTime: '6 Min Read',
      imageUrl: growthSystemEngineImg,
      badgeColor: 'text-cyan-300 bg-slate-950/90 border-cyan-400/40'
    }
  ];

  return (
    <section id="insights-blog" className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 max-w-6xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 items-stretch">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group flex flex-col justify-between bg-white rounded-3xl border-2 border-slate-200/90 p-5 transition-all duration-300 hover:shadow-2xl hover:border-brand-cyan hover:-translate-y-1 h-full shadow-md"
            >
              <div className="flex flex-col flex-1">
                
                {/* Clean, uncluttered photographic featured image */}
                <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-5 shadow-sm border border-slate-200 select-none group-hover:shadow-md transition-all">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Category Badge & Metadata Row */}
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-slate-500 font-bold mb-3">
                  <span className="font-mono text-[9px] font-black tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200/80 px-2.5 py-1 rounded-md uppercase">
                    {article.category}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-black text-slate-950 tracking-tight leading-snug group-hover:text-cyan-700 transition-colors mb-2.5">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                  {article.summary}
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
          ))}
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
                Get Practical Marketing Systems Delivered Straight To Your Inbox
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-normal">
                Join business owners, marketers, and leaders who want practical digital marketing insights—without the jargon. Every week you’ll receive actionable strategies, emerging AI tools, marketing trends, real-world case studies, and free resources to help your business grow with confidence.
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full lg:w-auto shrink-0">
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
