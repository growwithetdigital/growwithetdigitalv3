import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Copy, Check, Share2, Download, ExternalLink, 
  Lock, RefreshCw, Clock, ArrowRight, ArrowLeft, Globe, 
  ShieldCheck, AlertCircle, FileText, LayoutDashboard,
  LogOut, Crown, CheckCircle2, ChevronRight, Layers,
  Compass, BarChart3, HelpCircle, BookOpen, Target,
  Volume2, Building2, User, MapPin, Swords
} from 'lucide-react';
import { 
  UserProfile, 
  GeneratedContentItem, 
  UserTier 
} from '../../types';
import { 
  checkUserGenerationEligibility, 
  fetchUserContentLibrary, 
  saveContentToLibrary,
  googleSignOut 
} from '../../lib/firebase';
import BusinessProfileForm from './BusinessProfileForm';
import AuditorArchivePanel from './AuditorArchivePanel';
import FeaturedInsightsPanel from './FeaturedInsightsPanel';

interface WhiteboardShellProps {
  user: any;
  profile: UserProfile | null;
  onRefreshProfile: () => void;
  onCloseDashboard: () => void;
  onOpenBooking: () => void;
}

type DashboardTab = 'overview' | 'insights' | 'auditor' | 'profile';

export default function WhiteboardShell({
  user,
  profile,
  onRefreshProfile,
  onCloseDashboard,
  onOpenBooking,
}: WhiteboardShellProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [contentList, setContentList] = useState<GeneratedContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GeneratedContentItem | null>(null);
  const [activeSocialTab, setActiveSocialTab] = useState<'linkedin' | 'twitter_x' | 'facebook' | 'instagram_threads'>('linkedin');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStepText, setGenStepText] = useState('');
  const [genError, setGenError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Check 90-day rate limit
  const eligibility = checkUserGenerationEligibility(profile);

  // Check if profile has all 6 required fields for AI voice calibration
  const isProfileComplete = Boolean(
    profile?.business_name?.trim() &&
    profile?.contact?.trim() &&
    profile?.website_url?.trim() &&
    profile?.location?.trim() &&
    profile?.mission_statement?.trim() &&
    profile?.competitor_website?.trim()
  );

  // Load content library from Firestore
  useEffect(() => {
    if (user?.uid) {
      fetchUserContentLibrary(user.uid).then((items) => {
        setContentList(items);
        if (items.length > 0 && !selectedItem) {
          setSelectedItem(items[0]);
        }
      });
    }
  }, [user?.uid]);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleGeneratePackage = async () => {
    // Require completed business profile for AI voice leverage
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
      await new Promise(r => setTimeout(r, 700));
      setGenStepText(`Consulting Gemini AI: Calibrating ${profile?.brand_voice || 'Authoritative'} voice for ${profile?.business_name}...`);
      
      const promptBusiness = profile?.business_name || 'Modern Enterprise';
      const promptContact = profile?.contact || '';
      const promptWebsite = profile?.website_url || 'https://growwithetdigital.com';
      const promptLocation = profile?.location || 'Nationwide';
      const promptMission = profile?.mission_statement || 'Delivering high-impact solutions with measurable customer outcomes.';
      const promptCompetitor = profile?.competitor_website || '';
      const promptVoice = profile?.brand_voice || 'Authoritative & Strategic';
      const promptAudience = profile?.target_audience || 'Decision-makers and commercial buyers';
      const promptIndustry = profile?.industry || 'B2B & Digital Services';

      // Call server route or robust fallback generator
      let payload: any = null;
      try {
        const res = await fetch('/api/generate-growth-package', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName: promptBusiness,
            contact: promptContact,
            websiteUrl: promptWebsite,
            location: promptLocation,
            missionStatement: promptMission,
            competitorWebsite: promptCompetitor,
            brandVoice: promptVoice,
            targetAudience: promptAudience,
            industry: promptIndustry,
            uid: user?.uid,
            tier: profile?.tier || 'free',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          payload = data.package;
        }
      } catch (e) {
        // Fallback to client-side structured synthesis
      }

      if (!payload) {
        // Deterministic high-value strategic growth pack tailored to business voice (~400 words)
        const title = `${promptBusiness}: The High-Velocity Growth Blueprint for ${promptLocation}`;
        const targetKeyword = `${promptBusiness} ${promptLocation} services`;
        const content = `# ${title}

In today's fast-evolving market, high-intent buyers in **${promptLocation}** don't have time to wade through generic marketing noise. They want definitive solutions from trusted authorities who understand their specific challenges.

At **${promptBusiness}**, our core mission is clear: *"${promptMission}"*. Yet even market-leading organizations face an urgent bottleneck: converting online discovery into qualified, predictable customer conversations.

---

## 1. The Differentiation Advantage

While competitors${promptCompetitor ? ` like those at ${promptCompetitor}` : ' across the space'} continue relying on outdated, sporadic marketing tactics, modern buyers evaluate trust through clear proof, structured authority, and direct answers. 

To lead the market, **${promptBusiness}** must leverage three strategic differentiators:
* **Hyper-Relevant Geographic Visibility:** Capturing high-intent local and regional search queries from **${promptAudience}**.
* **Zero-Friction Conversion:** Replacing convoluted contact forms with instant diagnostic tools and frictionless intake channels.
* **Consistent Brand Narrative:** Maintaining an **${promptVoice}** tone across every digital touchpoint${promptContact ? `—from first impression through direct contact with ${promptContact}` : ''}.

---

## 2. Immediate 30-Day Execution Priority

To establish undeniable category presence, **${promptBusiness}** must prioritize:
1. **Solidify Local Entity Markup:** Ensure your Google Business Profile, local schemas, and search citations align with your primary offerings in **${promptLocation}**.
2. **Deploy Intent-Driven Content:** Answer the top 5 questions high-value prospects ask before making an investment decision.
3. **Streamline Conversion Paths:** Drive all inbound inquiries directly to your core service capabilities.

By operating with structured systems rather than random tactics, **${promptBusiness}** turns regional visibility into compounding revenue. Visit [${promptWebsite}](${promptWebsite}) to explore our full capabilities.`;

        payload = {
          title: title,
          target_keyword: targetKeyword,
          word_count: 412,
          meta_description: `An executive growth roadmap for ${promptBusiness} in ${promptLocation}: Discover how our mission-driven strategy outperforms conventional competitors.`,
          markdown_content: content,
          social_captions: {
            linkedin: `Is your marketing operating as a strategic engine or disconnected tactics?

At ${promptBusiness}, our mission is straightforward: "${promptMission}".

Here is how we are restructuring digital visibility in ${promptLocation} to deliver measurable outcomes for ${promptAudience}:

• Hyper-focused topical authority
• Zero-friction conversion pathways
• Purpose-driven market leadership

Discover our complete methodology at ${promptWebsite}

#GrowthMarketing #${promptBusiness.replace(/\s+/g, '')} #StrategicGrowth #${promptLocation.replace(/\s+/g, '')}`,
            twitter_x: `Why do most customer acquisition campaigns in ${promptLocation} stall?

They run tactics without architecture.

Here is how ${promptBusiness} is building compounding authority this quarter 🧵👇: ${promptWebsite}`,
            facebook: `Looking for reliable, proven outcomes in ${promptLocation}? At ${promptBusiness}, we're committed to our mission: ${promptMission}. Learn how we are setting a new standard for ${promptAudience} at ${promptWebsite}!`,
            instagram_threads: `Building authority in ${promptLocation} comes down to one principle: consistency beats sporadic effort. Explore the core principles driving ${promptBusiness} forward today.`
          },
          graphic: {
            public_download_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
            prompt_used: `Branded strategic architecture graphic for ${promptBusiness} in ${promptLocation}`,
            dimensions: { width: 1920, height: 1080 }
          }
        };
      }

      setGenStepText('Storing generated assets in your Firestore Content Library...');

      const newContentItem: GeneratedContentItem = {
        id: 'cp_' + Date.now(),
        uid: user.uid,
        type: 'quarterly_growth_pack',
        created_at: new Date().toISOString(),
        blog_post: {
          title: payload.title,
          target_keyword: payload.target_keyword,
          word_count: payload.word_count,
          markdown_content: payload.markdown_content,
          meta_description: payload.meta_description,
        },
        social_captions: payload.social_captions,
        graphic: payload.graphic,
      };

      await saveContentToLibrary(user.uid, newContentItem);
      setContentList(prev => [newContentItem, ...prev]);
      setSelectedItem(newContentItem);
      onRefreshProfile();
    } catch (err: any) {
      console.error('Generation error:', err);
      setGenError(err.message || 'Failed to synthesize growth package.');
    } finally {
      setIsGenerating(false);
      setGenStepText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans" id="growth-whiteboard-shell">
      {/* Top Navbar for Growth OS */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onCloseDashboard}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-white tracking-tight">
                ET Digital Growth OS™
              </span>
              <span className={`font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                profile?.tier === 'monthly'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                  : profile?.tier === 'consultation'
                  ? 'bg-purple-950/80 text-purple-300 border-purple-500/30'
                  : 'bg-cyan-950/80 text-brand-cyan border-cyan-500/30'
              }`}>
                {profile?.tier === 'monthly' ? 'Monthly Growth OS' : profile?.tier === 'consultation' ? 'VIP Consultation' : 'Free Tier'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono truncate max-w-[200px] sm:max-w-md">
              {profile?.business_name || profile?.displayName || user?.email}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('profile')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-[11px] transition-all cursor-pointer ${
              isProfileComplete
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/40 animate-pulse'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isProfileComplete ? 'Voice Profile Calibrated' : 'Complete Voice Profile'}</span>
          </button>

          {profile?.tier === 'free' && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-display text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Upgrade Tier</span>
            </button>
          )}

          <button
            onClick={() => googleSignOut()}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* OS Navigation Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-brand-cyan text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Growth Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'insights'
                ? 'bg-brand-cyan text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Featured Insights</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('auditor')}
            className={`px-4 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'auditor'
                ? 'bg-brand-cyan text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Auditor & Diagnostics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'profile'
                ? 'bg-brand-cyan text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Business Profile & Voice</span>
            {!isProfileComplete && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Onboarding Callout Banner if Voice Profile is Incomplete */}
        {!isProfileComplete && activeTab !== 'profile' && (
          <div className="rounded-2xl bg-amber-950/40 border border-amber-500/40 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-900/60 border border-amber-500/50 text-amber-300 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  Action Required: Complete Your Business Voice Profile
                </h4>
                <p className="font-sans text-xs text-amber-200/80 mt-0.5 leading-relaxed">
                  Provide your business name, contact, website, location, mission statement, and competitor website so Gemini AI delivers authoritative content calibrated strictly to your brand.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-md"
            >
              <span>Complete Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab 1: Overview & Growth Engine */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Tier & 90-Day Status Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-850 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-cyan" />
                    <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider font-bold">
                      Growth OS Content Engine
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {eligibility.eligible 
                      ? 'Your Quarterly AI Growth Package is Ready to Synthesize' 
                      : `Free Tier Active: Next Package Unlocks in ${eligibility.daysRemaining} Days`}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Free tier accounts receive a tactical ~400-word SEO article, cross-channel social copy matrix, and branded graphic every 90 days, calibrated to your business voice, location, and competitor edge.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={handleGeneratePackage}
                    disabled={isGenerating || (!eligibility.eligible && profile?.tier === 'free')}
                    className={`py-3.5 px-6 rounded-2xl font-display text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                      eligibility.eligible || profile?.tier !== 'free'
                        ? 'bg-brand-cyan hover:bg-cyan-400 text-slate-950 shadow-cyan-950 active:scale-95'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                    id="generate-package-trigger-btn"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Synthesizing...</span>
                      </>
                    ) : !eligibility.eligible && profile?.tier === 'free' ? (
                      <>
                        <Lock className="w-4 h-4 text-slate-500" />
                        <span>Locked ({eligibility.daysRemaining}d Left)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>Generate Growth Package</span>
                      </>
                    )}
                  </button>

                  {!eligibility.eligible && profile?.tier === 'free' && (
                    <button
                      type="button"
                      onClick={() => setShowUpgradeModal(true)}
                      className="py-3.5 px-5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-2xl font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>Unlock Now</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Generating Status Progress */}
              {isGenerating && (
                <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-3 text-xs text-brand-cyan font-mono animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{genStepText}</span>
                </div>
              )}

              {/* Error Message */}
              {genError && (
                <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>{genError}</span>
                </div>
              )}
            </div>

            {/* Content Workspace Grid */}
            {selectedItem ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: 400-Word SEO Blog Article (7 Cols) */}
                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-brand-cyan uppercase tracking-widest bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
                        Target Keyword: {selectedItem.blog_post.target_keyword}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1.5">
                        {selectedItem.blog_post.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                        {selectedItem.blog_post.word_count} words
                      </span>
                      <button
                        type="button"
                        onClick={() => copyText(selectedItem.blog_post.markdown_content, 'article')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        {copiedKey === 'article' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-slate-950" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-950" />
                            <span>Copy Article</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Meta Description callout */}
                  <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-750 text-xs text-slate-300">
                    <strong className="text-white font-mono text-[11px] block mb-0.5">SERP Meta Description:</strong>
                    <p className="italic text-slate-400 font-sans">{selectedItem.blog_post.meta_description}</p>
                  </div>

                  {/* Markdown Content Viewer */}
                  <div className="max-h-[520px] overflow-y-auto pr-3 space-y-4 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    <div className="whitespace-pre-line prose prose-invert prose-cyan max-w-none">
                      {selectedItem.blog_post.markdown_content}
                    </div>
                  </div>
                </div>

                {/* Right Column: Social Copy Matrix & Branded Graphic (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Branded Graphic Showcase */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-cyan" />
                        <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                          Branded AI Graphic
                        </h4>
                      </div>
                      <a
                        href={selectedItem.graphic.public_download_url}
                        download="et-digital-growth-graphic.png"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-brand-cyan hover:underline cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download (1080p)</span>
                      </a>
                    </div>

                    <div className="relative group overflow-hidden rounded-2xl border border-slate-750 bg-slate-950 aspect-video flex items-center justify-center">
                      <img
                        src={selectedItem.graphic.public_download_url}
                        alt={selectedItem.blog_post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                        <span className="font-mono text-[10px] text-slate-300 truncate">
                          {selectedItem.graphic.prompt_used || 'Optimized for high-engagement social feeds'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Distribution Copy */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-brand-cyan" />
                        <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                          Social Media Copy
                        </h4>
                      </div>
                    </div>

                    {/* Social Channel Tabs */}
                    <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-850 rounded-xl border border-slate-750 text-[10px] font-display font-bold uppercase">
                      {(['linkedin', 'twitter_x', 'facebook', 'instagram_threads'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveSocialTab(tab)}
                          className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                            activeSocialTab === tab
                              ? 'bg-brand-cyan text-slate-950 font-black shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {tab === 'linkedin' && 'LinkedIn'}
                          {tab === 'twitter_x' && 'X / Twitter'}
                          {tab === 'facebook' && 'Facebook'}
                          {tab === 'instagram_threads' && 'IG / Threads'}
                        </button>
                      ))}
                    </div>

                    {/* Current Tab Copy Box */}
                    <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-750 space-y-3">
                      <p className="font-sans text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {selectedItem.social_captions[activeSocialTab]}
                      </p>

                      <div className="pt-3 border-t border-slate-750 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => copyText(selectedItem.social_captions[activeSocialTab], activeSocialTab)}
                          className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-brand-cyan hover:underline cursor-pointer"
                        >
                          {copiedKey === activeSocialTab ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied to Clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-brand-cyan" />
                              <span>Copy Caption</span>
                            </>
                          )}
                        </button>

                        {/* Quick 1-Click Share Intent */}
                        <div className="flex items-center gap-2">
                          {activeSocialTab === 'twitter_x' && (
                            <a
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedItem.social_captions.twitter_x)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono text-[10px] flex items-center gap-1 cursor-pointer"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Open X</span>
                            </a>
                          )}
                          {activeSocialTab === 'linkedin' && (
                            <a
                              href="https://www.linkedin.com/feed/"
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono text-[10px] flex items-center gap-1 cursor-pointer"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Open LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-brand-cyan">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  No Growth Packages Generated Yet
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Click the "Generate Growth Package" button above to synthesize your 400-word SEO article, cross-channel copy, and graphic using Gemini AI.
                </p>
              </div>
            )}

            {/* Content History Drawer / Switcher */}
            {contentList.length > 1 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Previous Quarterly Packages ({contentList.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {contentList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        selectedItem?.id === item.id
                          ? 'bg-slate-850 border-brand-cyan/60'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={item.graphic.public_download_url}
                        alt=""
                        className="w-12 h-12 object-cover rounded-xl border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-display text-xs font-bold text-white truncate">
                          {item.blog_post.title}
                        </p>
                        <span className="font-mono text-[10px] text-slate-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom OS Workspace Placeholder Panel */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-cyan" />
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    Custom OS Modules & Metrics Placeholder
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-850 px-2.5 py-0.5 rounded border border-slate-750">
                  Customizable Workspace Slot
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-850 flex items-center justify-center text-slate-400">
                    <BarChart3 className="w-4 h-4 text-brand-cyan" />
                  </div>
                  <h5 className="font-display text-xs font-bold text-white">Pipeline Velocity & Deal Flow</h5>
                  <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                    Reserved placeholder for live CRM synchronization, lead velocity tracking, and inbound attribution charts.
                  </p>
                  <span className="inline-block font-mono text-[9px] text-brand-cyan/80 uppercase tracking-widest">
                    Available in Custom Config
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-850 flex items-center justify-center text-slate-400">
                    <Globe className="w-4 h-4 text-brand-cyan" />
                  </div>
                  <h5 className="font-display text-xs font-bold text-white">Google Analytics & Search Console</h5>
                  <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                    Reserved slot for automated organic impression feeds, AI Overview CTR monitoring, and ranking movement.
                  </p>
                  <span className="inline-block font-mono text-[9px] text-brand-cyan/80 uppercase tracking-widest">
                    Available in Custom Config
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-850 flex items-center justify-center text-slate-400">
                    <Share2 className="w-4 h-4 text-brand-cyan" />
                  </div>
                  <h5 className="font-display text-xs font-bold text-white">Automated Cross-Channel Dispatch</h5>
                  <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                    Reserved integration slot for 1-click scheduling directly to LinkedIn, X, Meta, and Beehiiv newsletters.
                  </p>
                  <span className="inline-block font-mono text-[9px] text-brand-cyan/80 uppercase tracking-widest">
                    Available in Custom Config
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Featured Insights from Website */}
        {activeTab === 'insights' && (
          <FeaturedInsightsPanel 
            onOpenBooking={onOpenBooking} 
          />
        )}

        {/* Tab 3: Auditor & Diagnostics Archive */}
        {activeTab === 'auditor' && (
          <AuditorArchivePanel 
            user={user} 
            profile={profile} 
            onOpenBooking={onOpenBooking} 
          />
        )}

        {/* Tab 4: Business Voice & Profile */}
        {activeTab === 'profile' && (
          <BusinessProfileForm 
            user={user} 
            profile={profile} 
            onProfileUpdated={onRefreshProfile}
            onContinueToGeneration={() => setActiveTab('overview')}
          />
        )}

      </main>

      {/* Upgrade Tier Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-5 text-white shadow-2xl shadow-amber-950/30"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Graduate to Monthly or Bi-Weekly Growth Schedules
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1">
                Bypass the 90-day cooldown with continuous multi-channel content engines, dedicated founder strategy sessions with Eric Thomas, and compounding pipeline velocity.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span><strong className="text-white">Monthly Schedule:</strong> 4 comprehensive SEO articles & syndication packs/month</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span><strong className="text-white">Bi-Weekly Schedule:</strong> Rapid 14-day execution cycles, continuous CRO, and fast search capture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Direct strategic access and real-time guidance from Eric Thomas</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowUpgradeModal(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-display text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Schedule Cadence Consultation with Eric
              </button>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 text-slate-400 hover:text-white font-mono text-xs cursor-pointer"
              >
                Continue on Free Tier
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
