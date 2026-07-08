import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, MessageCircle, ArrowUpRight, Check, TrendingUp, BarChart3, 
  Quote, Share2, Compass, Users, Target, Phone, Sparkles, 
  AlertCircle, MessageSquare, ArrowUp, MousePointerClick, Calendar
} from 'lucide-react';

// Custom high-fidelity SVGs for social platforms
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-sky-400" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-rose-400" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-slate-200" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-blue-500" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-red-500" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.289 2C6.617 2 2 6.614 2 12.284c0 4.34 2.695 8.047 6.54 9.613-.092-.81-.174-2.056.036-2.942.19-.8 1.226-5.195 1.226-5.195s-.313-.626-.313-1.55c0-1.45.84-2.537 1.89-2.537.892 0 1.32.67 1.32 1.47 0 .897-.572 2.24-.866 3.485-.246 1.04.52 1.886 1.547 1.886 1.855 0 3.284-1.957 3.284-4.78 0-2.5-1.8-4.248-4.364-4.248-2.972 0-4.718 2.23-4.718 4.533 0 .898.347 1.86.778 2.38.085.103.097.194.072.3-.08.33-.256 1.04-.29 1.18-.046.19-.15.23-.347.14-1.294-.6-2.015-2.5-2.015-4.02 0-3.273 2.378-6.278 6.856-6.278 3.6 0 6.4 2.565 6.4 5.998 0 3.578-2.256 6.454-5.385 6.454-1.05 0-2.04-.546-2.38-1.186l-.646 2.457c-.233.897-.864 2.02-1.284 2.7l1.096.34C18.254 22.01 22 17.58 22 12.284 22 6.614 17.362 2 12.289 2z"/>
  </svg>
);

interface SocialPost {
  id: string;
  platform: 'linkedin' | 'instagram' | 'x' | 'facebook' | 'pinterest' | 'omni';
  platformUser: string;
  category: string;
  heading: string;
  caption: string;
  likes: string;
  comments: string;
  graphicTitle: string;
  graphicSubtitle: string;
  metricLabel: string;
  metricValue: string;
}

interface InstagramFeedGridProps {
  onOpenBooking?: () => void;
}

export default function InstagramFeedGrid({ onOpenBooking }: InstagramFeedGridProps) {
  const instagramUrl = "https://www.instagram.com/growwithetdigital?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr";

  const posts: SocialPost[] = [
    {
      id: 'post-1',
      platform: 'linkedin',
      platformUser: 'growwithetdigital',
      category: 'CLIENT GENERATION',
      heading: 'Stop pitching and start helping. Here is the exact template we use to turn followers into paying clients:',
      graphicTitle: 'FOLLOWERS ➔ PAYING CLIENTS',
      graphicSubtitle: 'A simple conversation playbook for business owners',
      metricLabel: 'Booking Rate Increase',
      metricValue: '+240%',
      likes: '512',
      comments: '42',
      caption: 'When small business owners ask us how to generate leads, we tell them to stop blasting automated pitch messages. Instead, use social media to share real, helpful insights. Your prospects want a trusted partner, not a pushy salesperson.'
    },
    {
      id: 'post-2',
      platform: 'instagram',
      platformUser: 'growwithetdigital',
      category: 'STOP SCROLLING',
      heading: 'How to make your social media posts stand out even in a crowded, noisy feed:',
      graphicTitle: '3 SECRETS TO STOP THE SCROLL',
      graphicSubtitle: 'Captivating your audience instantly',
      metricLabel: 'Viewer Retention Time',
      metricValue: '3X LONGER',
      likes: '342',
      comments: '31',
      caption: 'You do not need a massive production budget to get noticed on social media. You need a compelling hook, a clear design contrast, and a message that answers exactly what your audience is struggling with right now.'
    },
    {
      id: 'post-3',
      platform: 'x',
      platformUser: '@growwithetdigital',
      category: 'LOCAL RESULTS',
      heading: 'How one local business owner doubled their monthly client bookings in exactly 30 days:',
      graphicTitle: 'DOUBLED CLIENTS IN 30 DAYS',
      graphicSubtitle: 'Simple organic tactics that bring results',
      metricLabel: 'Monthly Growth Curve',
      metricValue: '2.0X MORE',
      likes: '912',
      comments: '84',
      caption: 'No expensive software. No complicated ad setups. We cleaned up their profile, started answering direct client questions with short video answers, and added a direct calendar booking link. The result? Completely booked.'
    },
    {
      id: 'post-4',
      platform: 'facebook',
      platformUser: 'growwithetdigital',
      category: 'MARKETING MYTHS',
      heading: 'Why posting on social media every single day is actually hurting your brand reach:',
      graphicTitle: 'QUALITY OVER VOLUME',
      graphicSubtitle: 'The strategic approach to posting content',
      metricLabel: 'Engagement Per Post',
      metricValue: '+185%',
      likes: '286',
      comments: '24',
      caption: 'We see business owners burn out trying to publish content every single day. If your posts are rushed, algorithms will stop showing them. Focus on 2-3 high-value, highly practical posts a week. Your sanity—and your leads—will thank you.'
    },
    {
      id: 'post-5',
      platform: 'pinterest',
      platformUser: 'growwithetdigital',
      category: 'LEAD GENERATION',
      heading: 'The 5 critical mistakes small business owners make on social media (and how to fix them):',
      graphicTitle: '5 CRITICAL SOCIAL MISTAKES',
      graphicSubtitle: 'Are you accidentally losing potential clients?',
      metricLabel: 'Leads Recovered',
      metricValue: '100% FIXED',
      likes: '674',
      comments: '51',
      caption: 'Mistake #1: Not having a clear call to action. If you do not tell your readers exactly what step to take next, they will simply scroll past. We design every post with a single, clear, welcoming path to contact you.'
    },
    {
      id: 'post-6',
      platform: 'omni',
      platformUser: 'growwithetdigital',
      category: 'COPYWRITING TIPS',
      heading: 'Write high-converting captions that naturally get people to ask for your link:',
      graphicTitle: 'CAPTIONS THAT CONVERT',
      graphicSubtitle: 'The friendly copywriting system',
      metricLabel: 'Direct Message Inquiries',
      metricValue: '+320%',
      likes: '419',
      comments: '37',
      caption: 'Great social media copy is written exactly how you speak in real life. Drop the corporate jargon and write like you are sending a helpful text message to a business friend. Clear beats clever every single time.'
    }
  ];

  const renderPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return (
          <span className="flex items-center gap-1.5 bg-sky-950/50 border border-sky-850 text-sky-400 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            <LinkedInIcon />
            LinkedIn
          </span>
        );
      case 'instagram':
        return (
          <span className="flex items-center gap-1.5 bg-rose-950/50 border border-rose-850 text-rose-400 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            <InstagramIcon />
            Instagram
          </span>
        );
      case 'x':
        return (
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-850 text-slate-200 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            <XIcon />
            X (Twitter)
          </span>
        );
      case 'facebook':
        return (
          <span className="flex items-center gap-1.5 bg-blue-950/50 border border-blue-850 text-blue-400 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            <FacebookIcon />
            Facebook
          </span>
        );
      case 'pinterest':
        return (
          <span className="flex items-center gap-1.5 bg-red-950/50 border border-red-850 text-red-400 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            <PinterestIcon />
            Pinterest
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 bg-cyan-950/50 border border-brand-cyan/20 text-brand-cyan px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Omni-Channel
          </span>
        );
    }
  };

  const renderGraphicMedia = (post: SocialPost) => {
    switch (post.id) {
      case 'post-1': // Followers -> Paying Clients (Warm Indigo & Cyan Gradient)
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-between p-6 text-white text-left">
            {/* Grid and neon background overlays */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-25 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-cyan-500 to-violet-500" />
            
            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] font-mono font-extrabold text-brand-cyan bg-cyan-950/90 border border-brand-cyan/40 px-2 py-0.5 rounded-full uppercase tracking-wider">TUTORIAL</span>
            </div>

            <div className="my-auto space-y-4 z-10">
              <div className="space-y-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-violet-400 block uppercase font-bold">Conversion System</span>
                <h3 className="font-display text-xl font-black text-white leading-tight tracking-tight uppercase">
                  Followers <span className="text-brand-cyan">➔</span> <br />
                  <span className="bg-gradient-to-r from-brand-cyan to-cyan-300 bg-clip-text text-transparent">Paying Clients</span>
                </h3>
              </div>

              {/* Graphical representation of the pipeline with people/business nodes */}
              <div className="relative space-y-2 bg-slate-900/80 backdrop-blur border border-slate-800/80 p-3.5 rounded-2xl shadow-xl">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-slate-800 via-brand-cyan/50 to-brand-cyan pointer-events-none" />
                
                <div className="flex items-center gap-3.5 pl-2 relative">
                  <div className="w-4 h-4 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-[7px] font-mono text-slate-400 font-black relative z-10 shadow-md">1</div>
                  <div>
                    <span className="block text-[9px] font-bold text-white uppercase tracking-wide">Share Helpful Insights</span>
                    <span className="block text-[7.5px] text-slate-400">Post high-value answers to client problems</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pl-2 relative">
                  <div className="w-4 h-4 rounded-full bg-cyan-950 border border-brand-cyan/60 flex items-center justify-center text-[7px] font-mono text-brand-cyan font-black relative z-10 shadow-lg shadow-cyan-950/50">2</div>
                  <div>
                    <span className="block text-[9px] font-bold text-cyan-300 uppercase tracking-wide">Start Direct Chats</span>
                    <span className="block text-[7.5px] text-cyan-100/70">Connect warmly with zero sales pressure</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pl-2 relative">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-brand-cyan to-cyan-400 flex items-center justify-center text-[7px] font-mono text-slate-950 font-black relative z-10 shadow-lg shadow-cyan-500/30">3</div>
                  <div>
                    <span className="block text-[9px] font-bold text-white uppercase tracking-wide">Book Strategy Session</span>
                    <span className="block text-[7.5px] text-slate-200">Close the deal naturally with an invitation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 z-10">
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">Inbound Success Index</span>
              <span className="font-display text-[10px] font-black text-brand-cyan bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-brand-cyan/30 shadow-lg shadow-cyan-950/40">+240%</span>
            </div>
          </div>
        );

      case 'post-2': // 3 Secrets to Stop the Scroll (Vibrant Sunset Amber-Orange)
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 flex flex-col justify-between p-6 text-white text-left">
            {/* Cybernetic sunset grids */}
            <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:1rem_1rem] opacity-15 pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500" />

            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] font-mono font-extrabold text-rose-400 bg-rose-950/90 border border-rose-800/40 px-2 py-0.5 rounded-full uppercase tracking-wider">MARKETING PILL</span>
            </div>

            <div className="my-auto space-y-4 z-10">
              <div className="space-y-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-pink-400 block uppercase font-bold">Stop the Scroll</span>
                <h3 className="font-display text-xl font-black text-white leading-tight tracking-tight uppercase">
                  3 Secrets <br />
                  <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">To Stand Out</span>
                </h3>
              </div>

              {/* Graphical representation of standing out */}
              <div className="space-y-2 text-[9px] font-sans">
                <div className="flex items-center gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50 shadow-md">
                  <span className="w-5 h-5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-slate-500 shrink-0">01</span>
                  <div>
                    <span className="block font-bold text-white">Visual Contrast Block</span>
                    <span className="block text-slate-400 text-[8px]">Never use default plain colors</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-rose-950/40 p-2.5 rounded-xl border border-rose-900/30 shadow-md">
                  <span className="w-5 h-5 rounded-lg bg-rose-900/60 border border-rose-700/50 flex items-center justify-center font-mono font-bold text-rose-400 shrink-0">02</span>
                  <div>
                    <span className="block font-bold text-white">Identify One Core Problem</span>
                    <span className="block text-rose-200/80 text-[8px]">Address the viewer's exact pain point</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50 shadow-md">
                  <span className="w-5 h-5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-slate-500 shrink-0">03</span>
                  <div>
                    <span className="block font-bold text-white">Zero Gatekeeping Value</span>
                    <span className="block text-slate-400 text-[8px]">Give away the playbook to build deep trust</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 z-10">
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">Retention Catalyst</span>
              <span className="font-display text-[10px] font-black text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-800/50 shadow-lg shadow-rose-950/40">3X LONGER</span>
            </div>
          </div>
        );

      case 'post-3': // Doubled Bookings in 30 days (Teal Growth Curve)
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex flex-col justify-between p-6 text-white text-left">
            {/* Glowing lines and overlays */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-35 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />

            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] font-mono font-extrabold text-teal-400 bg-teal-950/90 border border-teal-800/40 px-2 py-0.5 rounded-full uppercase tracking-wider">CASE STUDY</span>
            </div>

            <div className="my-auto space-y-4 z-10">
              <div className="space-y-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-teal-400 block uppercase font-bold">Client Booking Breakthrough</span>
                <h3 className="font-display text-xl font-black text-white leading-tight tracking-tight uppercase">
                  Doubled Bookings <br />
                  <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">In 30 Days</span>
                </h3>
              </div>

              {/* Graphic comparing before and after */}
              <div className="flex items-end justify-center gap-8 h-20 pt-4 bg-slate-900/60 backdrop-blur border border-slate-800/50 rounded-2xl p-3 shadow-xl relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[6.5px] font-mono text-slate-500 font-bold uppercase">Metric Audit</div>
                
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-12 h-6 bg-slate-950 rounded-t-lg border border-slate-800 flex items-center justify-center">
                    <span className="text-[8px] font-black text-slate-400">10 calls</span>
                  </div>
                  <span className="text-[7px] font-mono text-slate-500 uppercase mt-1.5 font-bold">Before OS</span>
                </div>
                
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-12 h-14 bg-gradient-to-t from-teal-600 via-teal-500 to-emerald-400 rounded-t-lg border border-teal-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.3)] animate-pulse">
                    <span className="text-[8px] font-black text-slate-950">20 calls</span>
                  </div>
                  <span className="text-[7px] font-mono text-teal-400 font-extrabold uppercase mt-1.5">After OS</span>
                </div>

                {/* Cyber metrics on the side */}
                <div className="flex flex-col gap-1 justify-center h-full text-[7.5px] font-mono text-slate-400 border-l border-slate-800/60 pl-4">
                  <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400" />ROI: +312%</div>
                  <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400" />Cost: -42%</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 z-10">
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">Monthly Inbound Growth</span>
              <span className="font-display text-[10px] font-black text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-900 shadow-lg">2.0X MORE</span>
            </div>
          </div>
        );

      case 'post-4': // Quality Over Volume (Sleek Contrast)
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 flex flex-col justify-between p-6 text-white text-left">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(244,63,94,0.12)_1px,transparent_1px)] [background-size:1.25rem_1.25rem] opacity-25 pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-500/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-400" />

            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] font-mono font-extrabold text-rose-400 bg-rose-950/90 border border-rose-800/40 px-2 py-0.5 rounded-full uppercase tracking-wider">STRATEGY MYTH</span>
            </div>

            <div className="my-auto space-y-4 z-10">
              <div className="space-y-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-slate-400 block uppercase font-bold">The Posting Trap</span>
                <h3 className="font-display text-xl font-black text-white leading-tight tracking-tight uppercase">
                  Quality <br />
                  <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent underline decoration-rose-500/40 underline-offset-4">Over Daily Volume</span>
                </h3>
              </div>

              {/* Representation of the comparison */}
              <div className="grid grid-cols-2 gap-3 text-[8.5px] font-sans">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-850 shadow-md">
                  <div className="flex items-center gap-1.5 font-bold text-red-500 uppercase mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Daily Spam
                  </div>
                  <p className="text-slate-400 leading-relaxed">Rushed, average posts that the algorithm hides from followers.</p>
                </div>
                <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-900/30 shadow-md">
                  <div className="flex items-center gap-1.5 font-bold text-rose-400 uppercase mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    2x Weekly OS
                  </div>
                  <p className="text-rose-100/90 leading-relaxed">Deep, high-value insights people bookmark and save.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 z-10">
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">Average Engagement</span>
              <span className="font-display text-[10px] font-black text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-900 shadow-lg shadow-rose-950/30">+185%</span>
            </div>
          </div>
        );

      case 'post-5': // 5 Critical Mistakes (Purple Slate Checklist)
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 flex flex-col justify-between p-6 text-white text-left">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />

            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] font-mono font-extrabold text-violet-400 bg-violet-950/90 border border-violet-800/40 px-2 py-0.5 rounded-full uppercase tracking-wider">LEAD AUDIT</span>
            </div>

            <div className="my-auto space-y-4 z-10">
              <div className="space-y-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-slate-400 block uppercase font-bold">Hot Lead Loss</span>
                <h3 className="font-display text-xl font-black text-white leading-tight tracking-tight uppercase">
                  5 Mistakes <br />
                  <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">Leaking Leads</span>
                </h3>
              </div>

              {/* Progress and status indicators */}
              <div className="space-y-2 bg-slate-900/60 backdrop-blur border border-slate-800 p-3 rounded-2xl">
                <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-400 font-bold">
                  <span>AUDIT PROGRESS</span>
                  <span className="text-violet-400 animate-pulse">FIXING STAGE</span>
                </div>
                
                <div className="flex gap-1 h-3 items-center">
                  <div className="flex-1 h-1.5 bg-violet-500 rounded-full shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
                  <div className="flex-1 h-1.5 bg-violet-600 rounded-full shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
                  <div className="flex-1 h-1.5 bg-violet-700 rounded-full" />
                  <div className="flex-1 h-1.5 bg-indigo-800 rounded-full" />
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full" />
                </div>
                
                <p className="text-[9px] text-slate-300 font-sans leading-normal">
                  <strong className="text-white">Mistake #1:</strong> Missing a direct, clear CTA. Don't assume readers know how to hire you!
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 z-10">
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">Leads Saved</span>
              <span className="font-display text-[10px] font-black text-violet-400 bg-violet-950/80 px-2.5 py-0.5 rounded-full border border-violet-900 shadow-lg">100% FIXED</span>
            </div>
          </div>
        );

      default: // Captions That Convert (Direct quote/mock chat style)
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-between p-6 text-white text-left">
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:1rem_1rem] opacity-20 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-400" />

            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] font-mono font-extrabold text-emerald-400 bg-emerald-950/90 border border-emerald-800/40 px-2 py-0.5 rounded-full uppercase tracking-wider">COPY CLINIC</span>
            </div>

            <div className="my-auto space-y-4 z-10">
              <div className="space-y-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-emerald-400 block uppercase font-bold">Copywriting System</span>
                <h3 className="font-display text-xl font-black text-white leading-tight tracking-tight uppercase">
                  Captions <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">That Convert</span>
                </h3>
              </div>

              {/* Text message box simulation */}
              <div className="bg-slate-900/85 border border-slate-800/80 rounded-2xl p-3 space-y-2 text-[9px] font-sans shadow-xl">
                <div className="bg-slate-950 p-2.5 rounded-xl text-slate-200 border border-slate-800/50 leading-relaxed">
                  "Struggling to find organic leads? Reply <span className="text-emerald-400 font-bold underline">'STRATEGY'</span> below and I'll send our direct roadmap."
                </div>
                <div className="text-[7.5px] font-mono text-emerald-400/80 text-right pr-1 flex items-center justify-end gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ✓ Sent directly to DM
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-900 z-10">
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">Direct Message Growth</span>
              <span className="font-display text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-900 shadow-lg">+320%</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="instagram-feed" className="py-24 bg-slate-950 text-white relative overflow-hidden select-none border-b border-slate-950">
      {/* Background cybernetics elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-cyan bg-cyan-950/80 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Practical Marketing Insights
          </span>
          <h2 className="font-display text-4xl font-black tracking-tight leading-none mb-6">
            Our Social Feed
          </h2>
          <p className="font-sans text-slate-300 leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
            We share straightforward, everyday marketing strategies to help small business owners stop the scroll and turn casual social media viewers into qualified leads.
          </p>
        </div>

        {/* 3x2 Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-brand-cyan/40"
              id={post.id}
            >
              {/* Post Header */}
              <div className="p-4 border-b border-slate-900 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-cyan to-cyan-500 p-0.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
                      <img
                        src="https://res.cloudinary.com/dnpvgq7gt/image/upload/v1783013238/IMG_6170_pgtrij.png"
                        alt="ET"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="font-sans text-[11px] font-bold tracking-tight text-white block leading-none">{post.platformUser}</span>
                    <span className="font-mono text-[8px] text-brand-cyan font-bold uppercase tracking-wider block mt-1">{post.category}</span>
                  </div>
                </div>
                {renderPlatformBadge(post.platform)}
              </div>

              {/* Rich Visual Custom Graphic Template */}
              <div className="relative aspect-square w-full overflow-hidden border-b border-slate-900 bg-slate-950 select-none">
                {renderGraphicMedia(post)}

                {/* ET Digital Watermark Overlay on every graphic */}
                <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/80 px-2.5 py-1.5 rounded-full flex items-center gap-1.5 select-none shadow-lg">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 border border-brand-cyan/25">
                    <img
                      src="https://res.cloudinary.com/dnpvgq7gt/image/upload/v1783013238/IMG_6170_pgtrij.png"
                      alt="Logo"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-mono text-[8px] font-bold text-white uppercase tracking-wider">ET Digital</span>
                </div>
              </div>

              {/* Simulated UI Actions */}
              <div className="p-4 bg-slate-950 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-slate-400">
                    <button className="hover:text-rose-500 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="hover:text-white transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="hover:text-brand-cyan transition-colors cursor-pointer">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Strategic caption */}
                <div className="space-y-1">
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-white mr-1.5">growwithetdigital</span>
                    {post.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action (Direct Booking Focus instead of Playbook tease) */}
        {onOpenBooking && (
          <div className="max-w-xl mx-auto text-center">
            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center justify-center bg-brand-cyan hover:bg-cyan-500 text-slate-950 font-display text-xs font-black uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer shadow-cyan-950/40"
            >
              <Calendar className="w-4 h-4 mr-2 text-slate-950" />
              <span>Book Your Free Growth Strategy Session</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-2 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
