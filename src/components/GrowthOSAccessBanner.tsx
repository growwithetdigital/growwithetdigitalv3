import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Calendar, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Layers,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface GrowthOSAccessBannerProps {
  user?: any;
  profile?: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenDashboard: () => void;
  onOpenBooking: () => void;
  onOpenCalendar?: () => void;
}

export default function GrowthOSAccessBanner({
  user,
  profile,
  onOpenAuthModal,
  onOpenDashboard,
  onOpenBooking,
  onOpenCalendar
}: GrowthOSAccessBannerProps) {
  const tiers = [
    {
      id: 'free',
      badge: 'Free Tier Baseline',
      badgeColor: 'text-brand-cyan border-brand-cyan/30 bg-cyan-950/40',
      title: 'Free 90-Day Growth OS',
      cadence: 'Quarterly Cadence',
      cadenceDetail: '1 Asset Pack Every 90 Days',
      description: 'Ideal for early baseline benchmarking and testing our search intelligence models.',
      price: '$0',
      period: 'free forever',
      features: [
        '1 1,000-word SEO-optimized pillar article every 90 days',
        'Cross-platform social captions (LinkedIn, X, IG, FB)',
        '1 branded 1080p high-resolution report graphic',
        'Digital Growth Whiteboard & Diagnostic Vault',
        'Algorithmic channel benchmark updates',
      ],
      ctaText: user ? 'Launch My Growth OS' : 'Sign In to Growth Operating System',
      ctaAction: user ? onOpenDashboard : onOpenAuthModal,
      isPrimary: false,
      popular: false,
    },
    {
      id: 'monthly',
      badge: 'Steady Pipeline Compounding',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      title: 'Monthly Growth Schedule',
      cadence: 'Monthly Execution',
      cadenceDetail: '4 Sprints / Month',
      description: 'Systematic authority building designed for established teams seeking consistent organic pipeline.',
      price: 'Custom',
      period: 'tailored retainer',
      features: [
        '4 comprehensive SEO & AI search articles per month',
        'Full multi-platform social syndication matrix',
        'Weekly authority graphics & carousel slide decks',
        'Ongoing AEO (Answer Engine) & keyword ranking optimization',
        'Monthly 1-on-1 strategy sprint with Eric Thomas',
      ],
      ctaText: 'Schedule Monthly Consultation',
      ctaAction: onOpenCalendar || onOpenBooking,
      isPrimary: false,
      popular: false,
    },
    {
      id: 'biweekly',
      badge: 'Maximum Velocity',
      badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-950/40',
      title: 'Bi-Weekly Growth Schedule',
      cadence: 'Bi-Weekly Rapid Sprints',
      cadenceDetail: 'Continuous 14-Day Cycles',
      description: 'High-frequency growth sprints to outpace competitors and capture dominant market category share.',
      price: 'High-Impact',
      period: 'dedicated sprint',
      features: [
        'Rapid 14-day production & deployment cycles',
        'High-velocity content matrix & reactive search capture',
        'Continuous conversion rate optimization (CRO) testing',
        'Full brand creative suite & dynamic visual assets',
        'Direct founder Slack channel & bi-weekly executive syncs',
      ],
      ctaText: 'Book Bi-Weekly Strategy Call',
      ctaAction: onOpenCalendar || onOpenBooking,
      isPrimary: true,
      popular: true,
    }
  ];

  return (
    <section id="growth-os-access" className="py-24 bg-[#070b14] border-b border-slate-900 relative overflow-hidden">
      {/* Background radial accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-cyan/[0.03] blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.02] blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.25em] text-brand-cyan bg-cyan-950/50 border border-brand-cyan/25 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span>The Operating Engine Behind Every Client</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6">
            The ET Digital Growth Operating System™
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every business starts with our free 90-day baseline engine. When you are ready to compound your revenue and outrank competitors, graduate into our high-velocity Monthly or Bi-Weekly dedicated execution schedules.
          </p>

          {/* Quick Sign-In Bridge Pill */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-xs text-slate-400 font-sans">
              Already have an account?
            </span>
            {user ? (
              <button
                type="button"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
              >
                <span>Launch your Whiteboard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                id="services-growth-os-signin-link"
              >
                <span>Sign In to Growth Operating System</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Cadence Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular 
                  ? 'bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 border-2 border-brand-cyan/50 shadow-2xl shadow-cyan-950/40 ring-1 ring-brand-cyan/30' 
                  : 'bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 hover:border-slate-700 shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-cyan text-slate-950 font-display text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Flame className="w-3 h-3 text-slate-950 fill-slate-950" />
                  <span>Fastest Pipeline Growth</span>
                </div>
              )}

              <div>
                {/* Badge & Cadence */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`font-mono text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {tier.cadence}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  {tier.title}
                </h3>
                
                <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6 min-h-[48px]">
                  {tier.description}
                </p>

                {/* Price / Cadence Details */}
                <div className="pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-black text-white">
                      {tier.price}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      / {tier.period}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-cyan mt-1 block">
                    {tier.cadenceDetail}
                  </span>
                </div>

                {/* Feature checklist */}
                <div className="space-y-3 mb-8">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                        <Check className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={tier.ctaAction}
                className={`w-full py-4 rounded-xl font-display text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  tier.popular
                    ? 'bg-brand-cyan hover:bg-cyan-400 text-slate-950 shadow-cyan-950/50 hover:shadow-lg'
                    : tier.id === 'free'
                    ? 'bg-cyan-950/80 hover:bg-cyan-900 border border-brand-cyan/40 text-brand-cyan hover:text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700'
                }`}
                id={`growth-os-tier-btn-${tier.id}`}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/20 text-brand-cyan shrink-0 hidden sm:block">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-white">
                How We Transition Free Tier Users Into Ongoing Sprints
              </h4>
              <p className="font-sans text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                Start with your free diagnostic audit and 90-day content pack. As we identify conversion gaps and organic opportunities, we will map out an exact bi-weekly or monthly schedule with clear ROI milestones.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCalendar || onOpenBooking}
              className="inline-flex items-center gap-2 bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-[10px] font-black uppercase tracking-widest px-5 py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950" />
              <span>Book Strategy Call</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
