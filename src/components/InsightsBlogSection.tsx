import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, Calendar, Clock, Eye, CheckCircle, CheckCircle2, Mail } from 'lucide-react';

export default function InsightsBlogSection() {
  const beehiivUrl = "https://growwithetdigital.beehiiv.com/subscribe";

  const articles = [
    {
      id: 'linkedin-b2b-conversions',
      title: 'These are the three things you should be doing on LinkedIn to get more high-ticket conversations',
      summary: 'Stop wasting time on vanity impressions. We outline the exact three LinkedIn copywriting shifts and template structures that force target B2B buyers to start organic chat threads.',
      date: 'Jun 28, 2026',
      readTime: '4 Min Read',
      views: '2.8K Views',
      category: 'LINKEDIN STRATEGY',
      imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
      mailSubject: 'Request LinkedIn Strategy Insight'
    },
    {
      id: 'instagram-algorithm-shift',
      title: 'This is why Instagram is changing (and how to adjust your content engine for qualified reach)',
      summary: 'Instagram’s visual graph is moving from social connections to recommendation models. Here is how we build high-fidelity, scroll-stopping visual grids that gain immediate interest.',
      date: 'Jun 14, 2026',
      readTime: '6 Min Read',
      views: '3.4K Views',
      category: 'INSTAGRAM STUDIO',
      imageUrl: 'https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&cs=tinysrgb&w=600',
      mailSubject: 'Request Instagram Growth Insight'
    },
    {
      id: 'pinterest-dark-secret',
      title: 'Why Pinterest is the most slept-on dark secret that will help you find compounding business success',
      summary: 'Unlike transient social feeds, Pinterest functions as a permanent, high-intent visual search engine. We reveal the evergreen distribution systems that scale search-to-lead conversions on autopilot.',
      date: 'May 30, 2026',
      readTime: '8 Min Read',
      views: '4.1K Views',
      category: 'PINTEREST SECRETS',
      imageUrl: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600',
      mailSubject: 'Request Pinterest Secret Insight'
    }
  ];

  return (
    <section id="insights-blog" className="py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 max-w-6xl mx-auto">
          <div className="max-w-xl text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan bg-cyan-50 border border-cyan-100/80 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Operational Intelligence
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900">
              Featured Insights
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              We don’t write fluff. We document systems, algorithmic shifts, and real-world execution metrics from active client operating systems.
            </p>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 items-stretch">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/80 p-5 transition-all duration-300 hover:shadow-2xl hover:border-slate-300 h-full"
              id={article.id}
            >
              <div className="flex flex-col flex-1">
                {/* Featured Photo with Text Overlay */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-5 shadow-sm border border-slate-100 select-none">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Text Overlay inside graphic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 flex flex-col justify-between p-4 text-white">
                    <span className="font-mono text-[8px] font-bold tracking-wider text-brand-cyan bg-slate-950/85 border border-brand-cyan/20 px-2 py-0.5 rounded self-start">
                      {article.category}
                    </span>
                    
                    <div>
                      <span className="font-mono text-[7px] text-slate-300 font-bold tracking-widest uppercase block">
                        FEATURED GRAPHIC
                      </span>
                      <h4 className="font-display text-[11px] font-black tracking-tight leading-snug mt-0.5 text-white/95 truncate">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 font-mono text-[9px] text-slate-400 font-semibold mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-300" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-300" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-300" />
                    {article.views}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-brand-cyan transition-colors mb-3">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-xs text-slate-500 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              {/* See Post Button (pushed to the absolute bottom of the card) */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <a 
                  href={`mailto:contactetdigital@gmail.com?subject=Requesting article: ${encodeURIComponent(article.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-display font-black uppercase tracking-widest text-slate-900 hover:text-brand-cyan transition-colors"
                >
                  See Post
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 10: Sleek Single-Cell Banner Module over soft background break */}
        <div className="mt-20 max-w-5xl mx-auto bg-slate-950 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 via-transparent to-slate-950 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-cyan-500" />
          
          <div className="text-left max-w-2xl relative z-10">
            <div>
              <span className="font-mono text-[9px] font-extrabold text-brand-cyan bg-cyan-950/80 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full inline-block mb-3 uppercase tracking-[0.25em]">
                The ET Digital Weekly
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Stay Ahead of What’s Next in Digital Marketing
              </h3>
              <p className="font-sans text-sm text-slate-300 mt-4 leading-relaxed">
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
              className="group relative inline-flex items-center justify-center bg-brand-cyan hover:bg-cyan-500 text-slate-950 font-display text-xs font-black uppercase tracking-widest px-8 py-5 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer w-full lg:w-auto text-center"
            >
              <span className="flex items-center justify-center gap-2">
                Join the ET Digital Weekly
                <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider text-center lg:text-right mt-3">
              Get the Next Issue Free
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
