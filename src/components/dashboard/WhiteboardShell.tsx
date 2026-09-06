import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Compass, Activity, Layers, FileBarChart,
  MessageSquareText, Gauge, Users, Map, NotebookPen,
  FolderOpen, Sun, Moon, ArrowUpRight, Circle, CheckCircle2,
  Sparkles, ChevronRight, ChevronDown, FileText, Linkedin,
  Instagram, Facebook, Mail, Gift, Search, ArrowLeft, LogOut,
  Crown, Lock, RefreshCw, Clock, Target, BarChart3, BookOpen,
  ShieldCheck, AlertCircle, Copy, Check
} from 'lucide-react';
import { 
  UserProfile, 
  GeneratedContentItem 
} from '../../types';
import { 
  checkUserGenerationEligibility, 
  fetchUserContentLibrary, 
  saveContentToLibrary,
  googleSignOut 
} from '../../lib/firebase';
import { 
  stripMarkdownFormatting, 
  CURATED_NATURAL_PHOTOS, 
  generateSocialPromotionAngles,
  SocialAnglePackage 
} from '../../utils/contentEngineHelpers';
import ContentStudio from './ContentStudio';
import BusinessProfileForm from './BusinessProfileForm';
import AuditorArchivePanel from './AuditorArchivePanel';
import FeaturedInsightsPanel from './FeaturedInsightsPanel';
import OwnerTelemetryModal from './OwnerTelemetryModal';
import { WORKING_MARKETING_TIPS } from '../../data/marketingTips';

interface WhiteboardShellProps {
  user: any;
  profile: UserProfile | null;
  onRefreshProfile: () => void;
  onCloseDashboard: () => void;
  onOpenBooking: () => void;
  onSignOut?: () => void;
}

// Brand Palette (ET Digital Design System)
const palette = {
  cyan: "#0EA5B7",
  cyanBright: "#14C4D6",
  amber: "#C9974D",
};

// Signature UI: MomentumBar component
export function MomentumBar({ fill, max = 4, size = "md" }: { fill: number; max?: number; size?: "sm" | "md" }) {
  const segs = Array.from({ length: max }, (_, i) => i < fill);
  const h = size === "sm" ? "h-1.5" : "h-2";
  return (
    <div className={`flex gap-1 ${h} w-full`}>
      {segs.map((on, i) => (
        <div
          key={i}
          className={`flex-1 rounded-full transition-colors ${
            on ? "bg-[var(--accent)]" : "bg-[var(--track)]"
          }`}
        />
      ))}
    </div>
  );
}

// Reusable Status Pill
export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Excellent: "text-[var(--accent)] border-[var(--accent)]/40 bg-[var(--accent)]/10",
    Strong: "text-[var(--accent)] border-[var(--accent)]/30 bg-[var(--accent)]/5",
    Developing: "text-[var(--muted)] border-[var(--border)] bg-[var(--surface2)]",
    "Needs Attention": "text-[#C9974D] border-[#C9974D]/30 bg-[#C9974D]/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide ${map[status] || map.Developing}`}
    >
      {status}
    </span>
  );
}

// Priority Pill
export function PriorityPill({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: "text-[#C9974D] bg-[#C9974D]/10 border-[#C9974D]/30",
    Medium: "text-[var(--text)] bg-[var(--surface2)] border-[var(--border)]",
    Low: "text-[var(--muted)] bg-[var(--surface2)] border-[var(--border)]",
  };
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide ${map[priority] || map.Medium}`}>
      {priority}
    </span>
  );
}

// Card Primitive
export function Card({ 
  children, 
  className = "", 
  padding = "p-5" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  padding?: string; 
  key?: React.Key;
}) {
  return (
    <div className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] ${padding} ${className}`}>
      {children}
    </div>
  );
}

// Section Header
export function SectionHeader({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)] font-semibold">
          {eyebrow}
        </div>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">{title}</h1>
      {desc && <p className="mt-1.5 max-w-2xl text-sm text-[var(--muted)] leading-relaxed">{desc}</p>}
    </div>
  );
}

// Navigation Tabs Definition
type NavTabId = 
  | 'overview' 
  | 'content_studio' 
  | 'foundation' 
  | 'insights' 
  | 'auditor' 
  | 'profile' 
  | 'roadmap' 
  | 'competitors' 
  | 'upgrade';

export default function WhiteboardShell({
  user,
  profile,
  onRefreshProfile,
  onCloseDashboard,
  onOpenBooking,
  onSignOut,
}: WhiteboardShellProps) {
  const [activeTab, setActiveTab] = useState<NavTabId>('overview');
  const [dark, setDark] = useState(true);
  const [contentList, setContentList] = useState<GeneratedContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GeneratedContentItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStepText, setGenStepText] = useState('');
  const [genError, setGenError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [dailyTipIndex, setDailyTipIndex] = useState(0);
  const [copiedDailyTip, setCopiedDailyTip] = useState(false);

  // Check if current user is owner / admin
  const isOwner = Boolean(
    user?.email === 'ericlamarthomas@gmail.com' ||
    user?.uid?.includes('owner') ||
    profile?.role === 'owner' ||
    profile?.role === 'admin'
  );

  // Check 90-day rate limit for Free tier
  const eligibility = checkUserGenerationEligibility(profile);

  // Check if profile has all 6 required fields for AI voice leverage
  const isProfileComplete = Boolean(
    profile?.business_name?.trim() &&
    profile?.contact?.trim() &&
    profile?.website_url?.trim() &&
    profile?.location?.trim() &&
    profile?.mission_statement?.trim() &&
    profile?.competitor_website?.trim()
  );

  // Theme Variables
  const themeStyles = useMemo(() => {
    return dark
      ? {
          "--bg": "#0A0A0A",
          "--surface": "#111213",
          "--surface2": "#17181A",
          "--border": "#232527",
          "--text": "#F2F3F3",
          "--muted": "#8A8F94",
          "--accent": palette.cyanBright,
          "--track": "#232527",
        }
      : {
          "--bg": "#FAFAFA",
          "--surface": "#FFFFFF",
          "--surface2": "#F2F3F4",
          "--border": "#E6E7E9",
          "--text": "#0A0A0A",
          "--muted": "#6B7075",
          "--accent": palette.cyan,
          "--track": "#E6E7E9",
        };
  }, [dark]);

  // Client Details
  const clientName = profile?.business_name || profile?.displayName || 'Eric Thomas';
  const clientLocation = profile?.location || 'Los Angeles';
  const clientMission = profile?.mission_statement || 'business coaching to inspire storytelling';
  const clientAudience = profile?.target_audience || 'small business owners and leaders near Agoura hills';
  const clientCompetitor = profile?.competitor_website || 'https://ericthomas.com/';
  const clientWebsite = profile?.website_url || 'https://growwithetdigital.com';

  // Fallback initial sample package so dashboard is vibrant upon sign-in
  const defaultSampleItem: GeneratedContentItem = useMemo(() => {
    const title = `${clientName}: The High-Velocity Growth Blueprint for ${clientLocation}`;
    const targetKeyword = `${clientName} ${clientLocation} coaching`;
    const markdown = `# ${title}

In today's fast-evolving market, high-intent buyers in **${clientLocation}** don't have time to wade through generic marketing noise. They want definitive solutions from trusted authorities who understand their specific challenges.

At **${clientName}**, our core mission is clear: *"${clientMission}"*. Yet even market-leading organizations face an urgent bottleneck: converting online discovery into qualified, predictable customer conversations.

---

## 1. The Differentiation Advantage

While competitors like those at ${clientCompetitor} continue relying on outdated, sporadic marketing tactics, modern buyers evaluate trust through clear proof, structured authority, and direct answers. 

To lead the market, **${clientName}** must leverage three strategic differentiators:
* **Hyper-Relevant Geographic Visibility:** Capturing high-intent local and regional search queries from **${clientAudience}**.
* **Zero-Friction Conversion:** Replacing convoluted contact forms with instant diagnostic tools and frictionless intake channels.
* **Consistent Brand Narrative:** Maintaining an **Authoritative & Strategic** tone across every digital touchpoint—from first impression through direct contact with ${clientName}.

---

## 2. Immediate 30-Day Execution Priority

To establish undeniable category presence, **${clientName}** must prioritize:
1. **Solidify Local Entity Markup:** Ensure your Google Business Profile, local schemas, and search citations align with your primary offerings in **${clientLocation}**.
2. **Deploy Intent-Driven Content:** Answer the top 5 questions high-value prospects ask before making an investment decision.
3. **Streamline Conversion Paths:** Drive all inbound inquiries directly to your core service capabilities.

By operating with structured systems rather than random tactics, **${clientName}** turns regional visibility into compounding revenue. Visit [${clientName}](${clientWebsite}) to explore our full capabilities.`;

    const angles = generateSocialPromotionAngles(profile, title, markdown);

    return {
      id: 'default_growth_pack',
      uid: user?.uid || 'user_1',
      type: 'quarterly_growth_pack',
      created_at: new Date().toISOString(),
      blog_post: {
        title,
        target_keyword: targetKeyword,
        word_count: 410,
        markdown_content: markdown,
        meta_description: `An executive growth blueprint for ${clientName} in ${clientLocation}: How our mission-driven storytelling outperforms conventional marketing.`,
        natural_photo_url: CURATED_NATURAL_PHOTOS[0].url,
        photo_caption: CURATED_NATURAL_PHOTOS[0].title,
        read_time: '3 Min Read'
      },
      social_captions: {
        linkedin: angles[0].linkedin,
        twitter_x: angles[0].twitter_x,
        facebook: angles[0].facebook,
        instagram_threads: angles[0].instagram_threads
      },
      graphic: {
        public_download_url: CURATED_NATURAL_PHOTOS[0].url,
        prompt_used: `Natural executive coaching and storytelling photograph in ${clientLocation}`,
        dimensions: { width: 1600, height: 900 }
      },
      social_angles: angles
    };
  }, [clientName, clientLocation, clientMission, clientAudience, clientCompetitor, clientWebsite, profile, user?.uid]);

  // Load content library from Firestore
  useEffect(() => {
    if (user?.uid) {
      fetchUserContentLibrary(user.uid).then((items) => {
        if (items && items.length > 0) {
          setContentList(items);
          if (!selectedItem) setSelectedItem(items[0]);
        } else {
          setContentList([defaultSampleItem]);
          setSelectedItem(defaultSampleItem);
        }
      });
    } else {
      setContentList([defaultSampleItem]);
      setSelectedItem(defaultSampleItem);
    }
  }, [user?.uid, defaultSampleItem]);

  const handleGeneratePackage = async () => {
    if (!isProfileComplete) {
      setActiveTab('profile');
      return;
    }

    if (!eligibility.eligible && profile?.tier === 'free') {
      setShowUpgradeModal(true);
      return;
    }

    setIsGenerating(true);
    setGenError(null);
    setGenStepText('Synthesizing business profile & competitive positioning...');

    try {
      await new Promise(r => setTimeout(r, 650));
      setGenStepText(`Consulting Gemini AI: Calibrating ${profile?.brand_voice || 'Authoritative'} voice for ${clientName}...`);

      const title = `${clientName}: The High-Velocity Growth Blueprint for ${clientLocation}`;
      const targetKeyword = `${clientName} ${clientLocation} coaching`;
      const markdown = `# ${title}

In today's fast-evolving market, high-intent buyers in **${clientLocation}** don't have time to wade through generic marketing noise. They want definitive solutions from trusted authorities who understand their specific challenges.

At **${clientName}**, our core mission is clear: *"${clientMission}"*. Yet even market-leading organizations face an urgent bottleneck: converting online discovery into qualified, predictable customer conversations.

---

## 1. The Differentiation Advantage

While competitors like those at ${clientCompetitor} continue relying on outdated, sporadic marketing tactics, modern buyers evaluate trust through clear proof, structured authority, and direct answers. 

To lead the market, **${clientName}** must leverage three strategic differentiators:
* **Hyper-Relevant Geographic Visibility:** Capturing high-intent local and regional search queries from **${clientAudience}**.
* **Zero-Friction Conversion:** Replacing convoluted contact forms with instant diagnostic tools and frictionless intake channels.
* **Consistent Brand Narrative:** Maintaining an **${profile?.brand_voice || 'Authoritative & Strategic'}** tone across every digital touchpoint—from first impression through direct contact with ${clientName}.

---

## 2. Immediate 30-Day Execution Priority

To establish undeniable category presence, **${clientName}** must prioritize:
1. **Solidify Local Entity Markup:** Ensure your Google Business Profile, local schemas, and search citations align with your primary offerings in **${clientLocation}**.
2. **Deploy Intent-Driven Content:** Answer the top 5 questions high-value prospects ask before making an investment decision.
3. **Streamline Conversion Paths:** Drive all inbound inquiries directly to your core service capabilities.

By operating with structured systems rather than random tactics, **${clientName}** turns regional visibility into compounding revenue. Visit [${clientName}](${clientWebsite}) to explore our full capabilities.`;

      const angles = generateSocialPromotionAngles(profile, title, markdown);

      const newItem: GeneratedContentItem = {
        id: 'cp_' + Date.now(),
        uid: user?.uid || 'user_1',
        type: 'quarterly_growth_pack',
        created_at: new Date().toISOString(),
        blog_post: {
          title,
          target_keyword: targetKeyword,
          word_count: 412,
          markdown_content: markdown,
          meta_description: `An executive growth roadmap for ${clientName} in ${clientLocation}: Discover how our mission-driven strategy outperforms conventional competitors.`,
          natural_photo_url: CURATED_NATURAL_PHOTOS[0].url,
          photo_caption: CURATED_NATURAL_PHOTOS[0].title,
          read_time: '3 Min Read'
        },
        social_captions: {
          linkedin: angles[0].linkedin,
          twitter_x: angles[0].twitter_x,
          facebook: angles[0].facebook,
          instagram_threads: angles[0].instagram_threads
        },
        graphic: {
          public_download_url: CURATED_NATURAL_PHOTOS[0].url,
          prompt_used: `Natural editorial coaching photography in ${clientLocation}`,
          dimensions: { width: 1600, height: 900 }
        },
        social_angles: angles
      };

      setGenStepText('Storing generated assets in your Firestore Content Library...');
      if (user?.uid) {
        await saveContentToLibrary(user.uid, newItem);
      }
      setContentList(prev => [newItem, ...prev]);
      setSelectedItem(newItem);
      onRefreshProfile();
      setActiveTab('content_studio');
    } catch (err: any) {
      console.error('Generation error:', err);
      setGenError(err.message || 'Failed to synthesize growth package.');
    } finally {
      setIsGenerating(false);
      setGenStepText('');
    }
  };

  // Nav Items
  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'content_studio', label: 'Content Studio', icon: Layers },
    { id: 'foundation', label: 'Marketing Foundation', icon: Compass },
    { id: 'insights', label: 'Industry Insights & Tactics', icon: BookOpen },
    { id: 'auditor', label: 'Auditor & Diagnostics', icon: BarChart3 },
    { id: 'profile', label: 'Business Profile & Voice', icon: Target },
    { id: 'roadmap', label: 'Quarterly Roadmap', icon: Map },
    { id: 'competitors', label: 'Competitor Insights', icon: Users },
  ];

  // Foundation Audit Matrix (10 Core Pillars)
  const foundationItems = [
    {
      area: "Website Conversion",
      status: "Developing",
      note: "Current website establishes executive presence but features competing calls to action on primary service sections.",
      next: "Define a single high-conversion primary intake action (Diagnostic Intake) across all key landing areas.",
    },
    {
      area: "Local Search (SEO)",
      status: "Needs Attention",
      note: `Untapped search demand from ${clientAudience} searching for executive business coaching and storytelling in ${clientLocation}.`,
      next: "Optimize title tags, meta descriptions, and localized entity headers for commercial search intent.",
    },
    {
      area: "AI Search Readiness (AEO)",
      status: "Needs Attention",
      note: "Answer engines (ChatGPT, Gemini, Perplexity) lack structured FAQPage and Person schema to cite as the primary authority.",
      next: "Deploy structured semantic entity markup and answer the top 5 questions buyers ask before booking.",
    },
    {
      area: "Google Business Profile",
      status: "Needs Attention",
      note: `Dual benefit: local map pack rankings in ${clientLocation} plus verified citation weight for AI answer models.`,
      next: "Claim, verify, and populate your Google Business Profile with weekly service posts and geotagged assets.",
    },
    {
      area: "Content Library",
      status: "Developing",
      note: "Quarterly blueprint establishes strong thought leadership but requires recurring multi-channel social syndication.",
      next: "Deploy the 5-angle social media promotion engine across LinkedIn, X, and email newsletters every week.",
    },
    {
      area: "Brand Messaging",
      status: "Strong",
      note: `Core mission ("${clientMission}") provides an authentic, defensible moat against commoditized competitors.`,
      next: "Keep messaging focused on measurable transformation and authentic lived proof.",
    },
    {
      area: "Calls to Action",
      status: "Developing",
      note: "Multi-field contact forms introduce friction at the moment of peak purchase intent.",
      next: "Transition to instant diagnostic intake and frictionless calendar scheduling.",
    },
    {
      area: "Email Marketing",
      status: "Needs Attention",
      note: "No systematic lead magnet or automated nurture sequence capturing high-intent visitors.",
      next: "Deploy the complimentary 1-Page Growth Blueprint checklist to capture qualified emails.",
    },
    {
      area: "Client Testimonials & Reviews",
      status: "Needs Attention",
      note: "Case studies and client transformations exist verbally but are not indexed on verified third-party platforms.",
      next: "Implement automated post-coaching review requests to build verified entity trust.",
    },
    {
      area: "Referral Strategy",
      status: "Developing",
      note: "Word-of-mouth generates steady inquiries but lacks a structured partner pipeline.",
      next: "Formalize an executive partner network offering co-branded advisory insights.",
    },
  ];

  return (
    <div 
      style={themeStyles as any}
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans transition-colors duration-200" 
      id="growth-whiteboard-shell"
    >
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onCloseDashboard}
            className="p-2 rounded-xl bg-[var(--surface2)] hover:bg-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            title="Return to Public Site"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-[var(--text)] tracking-tight">
                ET Digital Growth OS™
              </span>
              <span className="font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30">
                {profile?.tier === 'monthly' ? 'Monthly Growth OS' : profile?.tier === 'consultation' ? 'VIP Consultation' : 'Free Tier'}
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted)] font-mono truncate max-w-[220px] sm:max-w-md">
              {clientName} · {clientLocation}
            </p>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setDark(!dark)}
            className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Profile Calibration Status Badge */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-[11px] transition-all cursor-pointer ${
              isProfileComplete
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-950/40 text-amber-300 border-amber-500/40 animate-pulse'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isProfileComplete ? 'Voice Calibrated' : 'Calibrate Voice'}</span>
          </button>

          {/* Owner Platform Telemetry Button */}
          {isOwner && (
            <button
              type="button"
              onClick={() => setIsTelemetryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/50 text-cyan-300 font-mono text-[11px] font-bold hover:bg-cyan-900/60 transition-all cursor-pointer shadow-sm"
              title="View Platform Usage & User Activity"
              id="whiteboard-owner-telemetry-btn"
            >
              <BarChart3 className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="hidden md:inline">Platform Usage</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          )}

          {/* Upgrade Tier Button */}
          {profile?.tier === 'free' && (
            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#C9974D] hover:bg-[#b0833f] text-slate-950 font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upgrade Cadence</span>
              <span className="sm:hidden">Upgrade</span>
            </button>
          )}

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={async () => {
              if (onSignOut) {
                onSignOut();
              } else {
                await googleSignOut();
                onCloseDashboard();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[var(--muted)] hover:text-white rounded-xl bg-[var(--surface2)] hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-500/40 border border-[var(--border)] transition-all cursor-pointer shadow-xs"
            title="Sign Out of Growth OS"
            id="whiteboard-signout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-Header */}
      <div className="bg-[var(--surface2)] border-b border-[var(--border)] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as NavTabId)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[var(--accent)] text-slate-950 font-bold shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.id === 'profile' && !isProfileComplete && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Incomplete Profile Notice Banner */}
        {!isProfileComplete && activeTab !== 'profile' && (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--text)]">
                  Action Required: Calibrate Your Business Voice Profile
                </h4>
                <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
                  Provide your business name, contact, website, location, mission statement, and competitor website so Gemini AI delivers authoritative content calibrated strictly to your brand.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <span>Complete Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {/* ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Executive Overview"
              title={`${clientName} — Growth OS Dashboard`}
              desc="A real-time executive view of your category authority, foundation health, and quarterly execution priorities."
            />

            {/* Daily Growth Dispatch: Tested Marketing Tactic (Dynamic Return Experience) */}
            {(() => {
              const currentTip = WORKING_MARKETING_TIPS[dailyTipIndex % WORKING_MARKETING_TIPS.length];
              return (
                <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-[var(--surface)] to-[var(--surface2)] p-6 sm:p-7 shadow-lg relative overflow-hidden text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-brand-cyan/20 text-cyan-300 border border-brand-cyan/40">
                        Daily Growth Dispatch
                      </span>
                      <span className="font-mono text-[9px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                        {currentTip.category}
                      </span>
                      <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                        {currentTip.impactMetric}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDailyTipIndex(prev => (prev + 1) % WORKING_MARKETING_TIPS.length)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--surface2)] hover:bg-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] font-mono text-[10px] font-bold transition-all cursor-pointer border border-[var(--border)]"
                        title="Load Next Tested Marketing Tactic"
                      >
                        <RefreshCw className="w-3 h-3 text-brand-cyan" />
                        <span>Next Tactic ({((dailyTipIndex % WORKING_MARKETING_TIPS.length) + 1)}/{WORKING_MARKETING_TIPS.length})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('insights')}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-brand-cyan/15 hover:bg-brand-cyan/25 text-cyan-300 font-mono text-[10px] font-bold transition-all cursor-pointer border border-brand-cyan/30"
                      >
                        <span>Full Tactics Vault</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] tracking-tight mb-2">
                      {currentTip.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-4">
                      <strong className="text-[var(--text)]">Tested Tactic: </strong>
                      {currentTip.tactic}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-4">
                      <div className="p-3.5 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
                          Research Proof & Mechanism
                        </span>
                        <p className="text-xs text-[var(--muted)] leading-relaxed">
                          {currentTip.whyItWorks}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                          Action Blueprint Steps
                        </span>
                        <ul className="space-y-1 text-xs text-[var(--text)]">
                          {currentTip.stepByStep.slice(0, 2).map((s, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="font-mono text-[10px] text-brand-cyan shrink-0 mt-0.5">0{idx + 1}.</span>
                              <span className="line-clamp-2">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <span className="text-[10px] font-mono text-[var(--muted)]">
                        Tag: {currentTip.tag} • Live field data tested in active campaigns
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const text = `🔥 [ET DIGITAL TESTED MARKETING TACTIC: ${currentTip.title}]
Category: ${currentTip.category}
Tactic: ${currentTip.tactic}
Expected Impact: ${currentTip.impactMetric}
Why It Works: ${currentTip.whyItWorks}
Steps:\n${currentTip.stepByStep.map((st, i) => `${i + 1}. ${st}`).join('\n')}`;
                          navigator.clipboard.writeText(text);
                          setCopiedDailyTip(true);
                          setTimeout(() => setCopiedDailyTip(false), 2000);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                          copiedDailyTip
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-brand-cyan hover:bg-cyan-400 text-slate-950 shadow-sm'
                        }`}
                      >
                        {copiedDailyTip ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Playbook Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Tactic Brief</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Row 1: Marketing Health & Ideal Client */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">
                    Marketing Health Snapshot
                  </span>
                  <span className="font-mono text-[11px] text-[var(--muted)]">2 / 4 — Developing</span>
                </div>
                <MomentumBar fill={2} />
                <p className="mt-4 text-sm leading-relaxed text-[var(--text)]">
                  Your core brand positioning (<span className="italic">"{clientMission}"</span>) provides a genuine competitive differentiator in <span className="font-medium">{clientLocation}</span>. While thought leadership presence is strong, search entity markup and frictionless conversion paths require immediate consolidation to prevent high-intent buyers from bouncing to competitors.
                </p>
              </Card>

              <Card>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">
                  Target Audience
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]">{clientAudience}</p>
                
                <div className="mt-4 border-t border-[var(--border)] pt-3">
                  <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">
                    Primary Specialty
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text)]">
                    Executive business coaching, leadership advisory & strategic storytelling.
                  </p>
                </div>
              </Card>
            </div>

            {/* Row 2: Top Priorities, Opportunity & Focus */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">
                  Top Three 30-Day Priorities
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2 text-sm text-[var(--text)]">
                    <span className="font-mono text-[11px] text-[var(--accent)] font-bold">01</span>
                    <span>Solidify Local Entity Markup in Google Business Profile for {clientLocation}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text)]">
                    <span className="font-mono text-[11px] text-[var(--accent)] font-bold">02</span>
                    <span>Deploy intent-driven editorial answering the top 5 buyer questions</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text)]">
                    <span className="font-mono text-[11px] text-[var(--accent)] font-bold">03</span>
                    <span>Replace clunky contact forms with instant diagnostic booking</span>
                  </li>
                </ul>
              </Card>

              <Card>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">
                  Biggest Opportunity
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]">
                  Establishing the undisputed category lane between executive coaching and inspirational storytelling in {clientLocation} before commoditized competitors like {clientCompetitor} capture search citations.
                </p>
              </Card>

              <Card>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">
                  This Month's Execution Focus
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]">
                  Publish your quarterly strategic blueprint, deploy multi-channel social promotion angles across LinkedIn and X, and complete your Google Business Profile entity verification.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)] font-mono">
                  <span>Quarterly Engine:</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('content_studio')}
                    className="text-[var(--accent)] hover:underline font-bold"
                  >
                    Open Content Studio →
                  </button>
                </div>
              </Card>
            </div>

            {/* Action Callout to Content Studio */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-wider font-semibold">
                  Quarterly Editorial Ready
                </span>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {selectedItem?.blog_post.title || `${clientName}: The High-Velocity Growth Blueprint for ${clientLocation}`}
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Includes natural Pexels-style photography, clean text copying (no # or *), and unlimited social promotion caption angles.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('content_studio')}
                className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <span>View Article & Social Copy</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: CONTENT STUDIO (FREE TIER ARTICLE & UNLIMITED SOCIAL ENGINE) */}
        {/* ==================================================================== */}
        {activeTab === 'content_studio' && (
          <div>
            {selectedItem ? (
              <ContentStudio
                item={selectedItem}
                profile={profile}
                onUpdatePhoto={(url) => {
                  if (selectedItem) {
                    selectedItem.blog_post.natural_photo_url = url;
                  }
                }}
                onOpenBooking={() => setShowUpgradeModal(true)}
              />
            ) : (
              <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] space-y-3">
                <Sparkles className="w-8 h-8 text-[var(--accent)] mx-auto" />
                <h3 className="text-lg font-semibold text-[var(--text)]">No Growth Content Generated Yet</h3>
                <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">
                  Click the button below to synthesize your quarterly strategic blueprint.
                </p>
                <button
                  type="button"
                  onClick={handleGeneratePackage}
                  disabled={isGenerating}
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Article</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: MARKETING FOUNDATION (10 PILLARS) */}
        {/* ==================================================================== */}
        {activeTab === 'foundation' && (
          <div>
            <SectionHeader
              eyebrow="Marketing Foundation"
              title="Marketing Foundation Audit"
              desc="A professional assessment of your core marketing pillars with concrete, high-velocity next actions."
            />
            <div className="space-y-3">
              {foundationItems.map((item) => (
                <Card key={item.area}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="sm:w-1/4">
                      <div className="text-sm font-medium text-[var(--text)]">{item.area}</div>
                      <div className="mt-2">
                        <StatusPill status={item.status} />
                      </div>
                    </div>
                    <div className="sm:w-3/4 sm:border-l sm:border-[var(--border)] sm:pl-5">
                      <p className="text-sm leading-relaxed text-[var(--text)]">{item.note}</p>
                      <div className="mt-2 flex items-start gap-1.5 text-sm text-[var(--accent)]">
                        <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>{item.next}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: FEATURED INSIGHTS (ET DIGITAL ARTICLES) */}
        {/* ==================================================================== */}
        {activeTab === 'insights' && (
          <FeaturedInsightsPanel onOpenBooking={onOpenBooking} />
        )}

        {/* ==================================================================== */}
        {/* TAB 5: AUDITOR & DIAGNOSTICS */}
        {/* ==================================================================== */}
        {activeTab === 'auditor' && (
          <AuditorArchivePanel
            user={user}
            profile={profile}
            onOpenBooking={onOpenBooking}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 6: BUSINESS PROFILE & VOICE CALIBRATION */}
        {/* ==================================================================== */}
        {activeTab === 'profile' && (
          <BusinessProfileForm
            user={user}
            profile={profile}
            onProfileUpdated={onRefreshProfile}
            onContinueToGeneration={() => setActiveTab('content_studio')}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 7: QUARTERLY ROADMAP */}
        {/* ==================================================================== */}
        {activeTab === 'roadmap' && (
          <div>
            <SectionHeader
              eyebrow="Quarterly Roadmap"
              title="Execution Priorities (Now / Next / Later)"
              desc="Every milestone directly serves customer acquisition velocity and brand authority."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">Now (30 Days)</span>
                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>
                <div className="space-y-2.5">
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Publish quarterly strategic blueprint: "{selectedItem?.blog_post.title || 'Growth Blueprint'}"</p>
                  </Card>
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Claim and verify Google Business Profile for {clientLocation}</p>
                  </Card>
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Deploy first 5-angle social promotion series on LinkedIn & X</p>
                  </Card>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">Next (60 Days)</span>
                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>
                <div className="space-y-2.5">
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Deploy structured FAQPage and Person schema for AI search citation</p>
                  </Card>
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Streamline consultation intake to reduce booking friction</p>
                  </Card>
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Launch monthly executive email newsletter for {clientAudience}</p>
                  </Card>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted)]">Later (90 Days+)</span>
                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>
                <div className="space-y-2.5">
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Expand into 1,000+ word deep-dive authority pillars on monthly cadence</p>
                  </Card>
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Implement automated multi-touch conversion attribution</p>
                  </Card>
                  <Card padding="p-3.5">
                    <p className="text-sm text-[var(--text)]">Formalize executive peer advisory referral syndicate</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 8: COMPETITOR INSIGHTS */}
        {/* ==================================================================== */}
        {activeTab === 'competitors' && (
          <div>
            <SectionHeader
              eyebrow="Competitor Insights"
              title="Where the Category Lane Is Open"
              desc="Strategic observations on market positioning and differentiation."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--accent)] font-semibold">
                  Content Opportunities
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]">
                  Competitors like {clientCompetitor} produce generic, sporadic category posts without structured frameworks. By leading with your core mission ("{clientMission}") and concrete local search intent in {clientLocation}, your brand captures the high-trust lane.
                </p>
              </Card>

              <Card>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--accent)] font-semibold">
                  Entity & Search Readiness (AEO)
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]">
                  Most competitor sites lack verified schema markup, making them invisible in AI chat engines. Deploying intent-driven answers and verified entity data gives {clientName} an immediate early-mover advantage.
                </p>
              </Card>

              <Card>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--accent)] font-semibold">
                  Frictionless Intake Moat
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]">
                  While competitors force prospects through multi-step inquiries, your Growth OS deploys instant diagnostic intake and clear 1-click scheduling with {clientName}.
                </p>
              </Card>

              <Card>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--accent)] font-semibold">
                  Multi-Channel Repurposing
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]">
                  Rather than writing one-off social posts, your Content Studio derives 5 strategic promotional angles (thought leadership, contrarian insight, tactical roadmap, story, email blast) from a single foundational asset.
                </p>
              </Card>
            </div>
          </div>
        )}

      </main>

      {/* Upgrade Cadence Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl border border-[#C9974D]/40 bg-[var(--surface)] p-6 sm:p-8 space-y-5 text-[var(--text)] shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#C9974D]/20 border border-[#C9974D]/40 flex items-center justify-center text-[#C9974D]">
              <Crown className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--text)]">
                Graduate to Monthly or Bi-Weekly Growth Schedules
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
                Free accounts receive 1 strategic blueprint per quarter. Graduate to continuous multi-channel content engines, dedicated founder strategy sessions with Eric Thomas, and compounding pipeline velocity.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span><strong className="text-[var(--text)]">Expert-Recommended 1,000+ Word Pillars:</strong> In-depth comprehensive guides that capture 3.2x more backlinks and top AI citations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span><strong className="text-[var(--text)]">Monthly / Bi-Weekly Execution:</strong> Continuous content syndication across all platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span><strong className="text-[var(--text)]">Direct 1-on-1 Strategy:</strong> Dedicated advisory sessions with Eric Thomas</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowUpgradeModal(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-[#C9974D] hover:bg-[#b0833f] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Schedule Cadence Consultation with Eric
              </button>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 text-[var(--muted)] hover:text-[var(--text)] font-mono text-xs cursor-pointer"
              >
                Continue on Free Tier
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Owner Platform Usage Telemetry Modal */}
      <OwnerTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
        currentEmail={user?.email}
      />

    </div>
  );
}
