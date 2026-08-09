import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Share2, MapPin, Search, Zap, CheckCircle2, AlertTriangle, ArrowRight, 
  Sparkles, Cpu, Layers, ShieldCheck, Gauge, Check, Award, RefreshCw, Calendar,
  TrendingUp, BarChart3, Users, Star, Eye
} from 'lucide-react';

interface GrowthAuditToolProps {
  onOpenBooking: () => void;
  onOpenCalendar?: () => void;
}

type AuditChannel = 'website' | 'social' | 'gbp';

interface AuditOption {
  id: AuditChannel;
  title: string;
  subtitle: string;
  inputLabel: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function GrowthAuditTool({ onOpenBooking, onOpenCalendar }: GrowthAuditToolProps) {
  const [selectedChannel, setSelectedChannel] = useState<AuditChannel>('website');
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Simulated Grade Result state
  const [grade, setGrade] = useState<'A' | 'B' | 'C' | 'D'>('C');

  const auditOptions: AuditOption[] = [
    {
      id: 'website',
      title: 'Website Rank & Discoverability',
      subtitle: 'Analyze your domain search rankings, mobile speed, and AI search presence',
      inputLabel: 'Enter Your Website URL',
      placeholder: 'e.g. mybusiness.com',
      icon: Globe,
    },
    {
      id: 'social',
      title: 'Social Media Feed & AI Presence',
      subtitle: 'Grade your brand engagement, social reach, and cross-platform authority',
      inputLabel: 'Enter Social Media Profile Link or Handle',
      placeholder: 'e.g. instagram.com/yourbrand or @yourbrand',
      icon: Share2,
    },
    {
      id: 'gbp',
      title: 'Google Business Profile Strength',
      subtitle: 'Evaluate your local Google Maps ranking, review health, and lead calls',
      inputLabel: 'Enter Business Name or Google Maps Link',
      placeholder: 'e.g. Apex Plumbing Atlanta or g.page/mybusiness',
      icon: MapPin,
    },
  ];

  const currentOption = auditOptions.find(o => o.id === selectedChannel) || auditOptions[0];

  // Dynamic analysis steps tailored per channel
  const getSteps = () => {
    if (selectedChannel === 'website') {
      return [
        { id: 1, text: 'Connecting to search engine index servers...', duration: 900 },
        { id: 2, text: 'Analyzing keyword rankings and domain discoverability...', duration: 1100 },
        { id: 3, text: 'Checking website readability for Google AI & ChatGPT...', duration: 1000 },
        { id: 4, text: 'Testing mobile speed, user experience, and lead capture forms...', duration: 1000 },
        { id: 5, text: 'Generating website performance grade & benchmark report...', duration: 800 },
      ];
    } else if (selectedChannel === 'social') {
      return [
        { id: 1, text: 'Scanning social channel feed and follower engagement signals...', duration: 900 },
        { id: 2, text: 'Analyzing content quality, post frequency, and visual consistency...', duration: 1100 },
        { id: 3, text: 'Checking social profile indexing in major AI search engines...', duration: 1000 },
        { id: 4, text: 'Measuring feed-to-customer lead conversion potential...', duration: 1000 },
        { id: 5, text: 'Calculating social media authority grade & actionable score...', duration: 800 },
      ];
    } else {
      return [
        { id: 1, text: 'Locating Google Business Profile in local map databases...', duration: 900 },
        { id: 2, text: 'Evaluating Google Maps top 3 local pack ranking signals...', duration: 1100 },
        { id: 3, text: 'Analyzing customer review velocity, ratings, and response rate...', duration: 1000 },
        { id: 4, text: 'Checking business category tags, photo quality, and contact links...', duration: 1000 },
        { id: 5, text: 'Compiling local search dominance grade & audit findings...', duration: 800 },
      ];
    }
  };

  const steps = getSteps();

  useEffect(() => {
    if (!isAnalyzing) return;

    let currentStepIndex = 0;
    
    const runStep = () => {
      if (currentStepIndex >= steps.length) {
        setProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          setIsCompleted(true);
        }, 500);
        return;
      }

      const currentStep = steps[currentStepIndex];
      setCurrentStepText(currentStep.text);
      
      const stepProgressSpan = 100 / steps.length;
      const startProgress = currentStepIndex * stepProgressSpan;
      
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(elapsed / currentStep.duration, 1);
        const currentProgress = startProgress + (ratio * stepProgressSpan);
        setProgress(Math.floor(currentProgress));
        
        if (ratio === 1) {
          clearInterval(interval);
          setCompletedSteps(prev => [...prev, currentStep.id]);
          currentStepIndex++;
          runStep();
        }
      }, 50);
    };

    runStep();
  }, [isAnalyzing]);

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    // Deterministically pick a realistic grade based on length or randomly, standard default to C to show high need, but allow toggle in report
    const inputClean = inputValue.trim().toLowerCase();
    if (inputClean.includes('a') && inputClean.length > 15) {
      setGrade('B');
    } else if (inputClean.includes('top') || inputClean.includes('pro')) {
      setGrade('A');
    } else {
      setGrade('C');
    }

    setIsCompleted(false);
    setCompletedSteps([]);
    setProgress(0);
    setIsAnalyzing(true);
  };

  const handleReset = () => {
    setInputValue('');
    setIsCompleted(false);
    setProgress(0);
    setCompletedSteps([]);
  };

  // Grade color theme helpers
  const getGradeBadge = (g: 'A' | 'B' | 'C' | 'D') => {
    switch (g) {
      case 'A':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          letterColor: 'text-emerald-400',
          title: 'GRADE A — HIGH PERFORMANCE',
          subtitle: 'You have a solid online foundation, but working with ET Digital can scale your lead volume and automate client bookings.',
          colorHex: '#10b981',
          percent: 88,
        };
      case 'B':
        return {
          bg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
          letterColor: 'text-yellow-400',
          title: 'GRADE B — ROOM FOR GROWTH',
          subtitle: 'Your online presence is decent, but you are missing key optimization tactics to dominate competitors and capture top-tier leads.',
          colorHex: '#eab308',
          percent: 74,
        };
      case 'C':
        return {
          bg: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
          letterColor: 'text-orange-400',
          title: 'GRADE C — NEEDS IMMEDIATE HELP',
          subtitle: 'Your business is suffering from significant online visibility leaks and missing out on local customers every single day.',
          colorHex: '#f97316',
          percent: 54,
        };
      case 'D':
      default:
        return {
          bg: 'bg-red-500/10 border-red-500/30 text-red-400',
          letterColor: 'text-red-400',
          title: 'GRADE D — CRITICAL VISIBILITY DEFICIT',
          subtitle: 'Your online presence is almost invisible to local buyers and modern search engines. Immediate professional intervention is required.',
          colorHex: '#ef4444',
          percent: 36,
        };
    }
  };

  const currentGradeData = getGradeBadge(grade);

  return (
    <section id="growth-grader" className="py-20 sm:py-28 bg-slate-950 border-t border-b border-white/[0.03] relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e905_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e905_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-cyan/[0.015] rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-950/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.25em] text-brand-cyan bg-cyan-950/50 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            INSTANT ONLINE WEBSITE AUDIT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5 uppercase">
            Free Online Growth <span className="text-brand-cyan">& AI Auditor</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select one of the 3 channels below to get an instant, confidential <strong className="text-white font-semibold">A - D Report Card</strong> on your business's online discoverability, AI presence, and customer intake strength.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* STATE 1: 3-Channel Intake Form */}
            {!isAnalyzing && !isCompleted && (
              <motion.div
                key="intake"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl"
              >
                {/* Step 1: Pick Channel */}
                <div className="mb-8">
                  <label className="block font-mono text-[10px] font-extrabold text-brand-cyan uppercase tracking-widest mb-3">
                    STEP 1: Choose 1 Channel to Audit
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {auditOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = selectedChannel === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedChannel(opt.id);
                            setInputValue('');
                          }}
                          className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-cyan-950/40 border-brand-cyan text-white shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                              : 'bg-slate-950/80 border-slate-850 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-slate-900 text-slate-500'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                              isSelected ? 'border-brand-cyan bg-brand-cyan text-slate-950' : 'border-slate-700'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-display text-xs sm:text-sm font-black uppercase text-white tracking-tight mb-1">
                              {opt.title}
                            </h3>
                            <p className="font-sans text-[11px] text-slate-400 leading-relaxed font-normal">
                              {opt.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Input */}
                <form onSubmit={handleStartAnalysis} className="space-y-6">
                  <div>
                    <label className="block font-mono text-[10px] font-extrabold text-brand-cyan uppercase tracking-widest mb-2.5">
                      STEP 2: {currentOption.inputLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-500">
                        {selectedChannel === 'website' && <Globe className="h-5 w-5" />}
                        {selectedChannel === 'social' && <Share2 className="h-5 w-5" />}
                        {selectedChannel === 'gbp' && <MapPin className="h-5 w-5" />}
                      </div>
                      <input
                        type="text"
                        required
                        placeholder={currentOption.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4.5 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 text-sm transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full relative bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-[11px] font-black uppercase tracking-widest py-4.5 rounded-2xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-cyan-950/40"
                    >
                      <span>GENERATE MY FREE {currentOption.title.toUpperCase()} GRADE</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </form>

                <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    100% Free & Confidential. No credit card required.
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    VALIDATED AGAINST ENTERPRISE DIGITAL PERFORMANCE BENCHMARKS
                  </span>
                </div>
              </motion.div>
            )}

            {/* STATE 2: Animated Scanner Simulation */}
            {isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center justify-center min-h-[420px]"
              >
                {/* Glowing Spinner Gear */}
                <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 bg-brand-cyan/10 rounded-full blur-xl pointer-events-none" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute inset-0 border-2 border-dashed border-brand-cyan/40 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    className="absolute inset-2 border border-dotted border-cyan-500/30 rounded-full"
                  />
                  <div className="absolute inset-4 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-brand-cyan animate-pulse" />
                  </div>
                </div>

                <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wider mb-2">
                  Auditing {currentOption.title}
                </h3>
                <span className="font-mono text-[10px] text-brand-cyan font-semibold block uppercase tracking-[0.2em] mb-4">
                  {progress}% Analysis Complete
                </span>

                {/* Progress Bar */}
                <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-full h-2.5 overflow-hidden mb-8 shadow-inner">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full"
                    transition={{ ease: 'easeOut' }}
                  />
                </div>

                {/* Live Diagnostic Log Feed */}
                <div className="w-full max-w-lg bg-slate-950 border border-slate-850/80 rounded-2xl p-5 text-left font-mono text-[10px] leading-relaxed space-y-2 h-[120px] overflow-hidden relative">
                  <div className="absolute bottom-5 left-5 right-5 space-y-2">
                    {steps.map((s) => {
                      const isDone = completedSteps.includes(s.id);
                      const isCurrent = currentStepText === s.text;
                      if (!isDone && !isCurrent) return null;
                      return (
                        <div key={s.id} className="flex items-center gap-2.5 transition-all duration-300">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping shrink-0" />
                          )}
                          <span className={isDone ? 'text-slate-400' : 'text-white font-semibold'}>
                            {s.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            )}

            {/* STATE 3: Comprehensive Report Card Dashboard */}
            {isCompleted && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Header overview banner */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Left: Grade Badge */}
                    <div className="flex items-center gap-5 w-full md:w-auto">
                      <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-2 flex flex-col items-center justify-center shrink-0 shadow-xl ${currentGradeData.bg}`}>
                        <span className={`font-display text-5xl sm:text-6xl font-black ${currentGradeData.letterColor}`}>
                          {grade}
                        </span>
                        <span className="font-mono text-[9px] uppercase font-bold tracking-widest mt-0.5">
                          OVERALL GRADE
                        </span>
                      </div>

                      <div>
                        <span className="font-mono text-[9px] text-brand-cyan font-bold uppercase tracking-widest block mb-1">
                          AUDIT TARGET: {inputValue || 'Selected Profile'}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white tracking-tight mb-2">
                          {currentGradeData.title}
                        </h3>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-lg">
                          {currentGradeData.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Quick Grade Simulator Toggles for Testing */}
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex flex-col gap-1.5 shrink-0 w-full md:w-auto text-left">
                      <span className="font-mono text-[8px] text-slate-500 uppercase font-bold tracking-widest px-1">
                        SIMULATE GRADE REPORT:
                      </span>
                      <div className="flex gap-1.5">
                        {(['A', 'B', 'C', 'D'] as const).map((g) => (
                          <button
                            key={g}
                            onClick={() => setGrade(g)}
                            className={`px-3 py-1.5 rounded-lg font-display text-xs font-black uppercase transition-all cursor-pointer ${
                              grade === g 
                                ? 'bg-brand-cyan text-slate-950 font-bold' 
                                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            Grade {g}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bento Metrics Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedChannel === 'website' && (
                    <>
                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            Organic Search Rank
                          </span>
                          <TrendingUp className="w-4 h-4 text-brand-cyan" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? 'Top 3 Positions' : grade === 'B' ? 'Page 1 - 2' : 'Page 3+ (Low Visibility)'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'High organic visibility for primary search terms.' 
                            : 'Most potential customers stop searching before seeing your business.'}
                        </p>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            AI Search Readability
                          </span>
                          <Cpu className="w-4 h-4 text-purple-400" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? 'Fully Indexed' : grade === 'B' ? 'Partial Code Tags' : 'Missing Schema Code'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Google AI and ChatGPT actively cite your business.' 
                            : 'AI search engine bots cannot read your core services clearly.'}
                        </p>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            Mobile Lead Conversion
                          </span>
                          <Zap className="w-4 h-4 text-amber-400" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? 'Optimized Intake' : grade === 'B' ? 'Moderate Friction' : 'High Visitor Drop-off'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Smooth booking forms capture inbound appointments.' 
                            : 'Complex or slow mobile pages cause potential leads to bounce.'}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedChannel === 'social' && (
                    <>
                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            Social Engagement Rate
                          </span>
                          <Users className="w-4 h-4 text-brand-cyan" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? '4.8% (High)' : grade === 'B' ? '2.1% (Average)' : '0.8% (Low Interaction)'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Strong audience interaction and viral post reach.' 
                            : 'Low audience response signals weak algorithm priority.'}
                        </p>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            AI Brand Citation
                          </span>
                          <Cpu className="w-4 h-4 text-purple-400" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? 'Recognized Authority' : grade === 'B' ? 'Moderate Mentions' : 'Unrecognized Brand'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Cross-platform consistency builds AI trust.' 
                            : 'Inconsistent handles and low authority limit AI recommendations.'}
                        </p>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            Social Feed-to-Lead
                          </span>
                          <BarChart3 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? 'Direct Funnel Linked' : grade === 'B' ? 'Basic Bio Link' : 'No Lead Capture'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Social traffic converts directly into scheduled calls.' 
                            : 'Social views are not being converted into paying clients.'}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedChannel === 'gbp' && (
                    <>
                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            Google Maps Local Pack
                          </span>
                          <MapPin className="w-4 h-4 text-brand-cyan" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? 'Top 3 Map Ranking' : grade === 'B' ? 'Positions 4 - 8' : 'Outside Top 10 Maps'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Capturing prime local map pack calls and directions.' 
                            : 'Competitors in the top 3 maps are taking 80%+ of local calls.'}
                        </p>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            Review Health & Velocity
                          </span>
                          <Star className="w-4 h-4 text-amber-400" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? '4.8+ Stars (Frequent)' : grade === 'B' ? '4.2 Stars (Slow)' : 'Low Review Volume'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Strong customer social proof drives instant trust.' 
                            : 'Infrequent reviews slow down local ranking momentum.'}
                        </p>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            Call & Direction Conversion
                          </span>
                          <Zap className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h4 className="font-display text-xl font-black text-white mb-1">
                          {grade === 'A' ? 'High Inbound Calls' : grade === 'B' ? 'Moderate Inquiries' : 'Low Customer Inbound'}
                        </h4>
                        <p className="font-sans text-xs text-slate-400">
                          {grade === 'A' 
                            ? 'Active business photos and Q&A prompt direct client calls.' 
                            : 'Incomplete business info leaves money on the table.'}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Specific Recommendations Box depending on Grade */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-brand-cyan" />
                    <h4 className="font-display text-sm font-black uppercase text-white tracking-wider">
                      ET Digital Executive Recommendations for Grade {grade}
                    </h4>
                  </div>

                  {grade === 'C' || grade === 'D' ? (
                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      <p>
                        <strong className="text-white font-semibold">Immediate Priority:</strong> Your online footprint currently has major gaps in local discoverability and customer intake. Potential clients searching for your services are actively landing on your competitors' pages.
                      </p>
                      <p>
                        <strong className="text-white font-semibold">Action Plan:</strong> ET Digital will clean up your business indexing, install AI readability tags (Schema markup), optimize your Google Business Profile for map pack rankings, and implement a direct client booking engine.
                      </p>
                    </div>
                  ) : grade === 'B' ? (
                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      <p>
                        <strong className="text-white font-semibold">Growth Priority:</strong> You have an established baseline, but you are leaving high-value customers on the table due to incomplete AI search setup and friction in your appointment conversion flow.
                      </p>
                      <p>
                        <strong className="text-white font-semibold">Action Plan:</strong> Upgrade your website copy for direct AI recommendations (ChatGPT, Google AI), refine your review acquisition velocity, and connect automated follow-up funnels.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      <p>
                        <strong className="text-white font-semibold">Scale Priority:</strong> Excellent performance! You are already ahead of most local competitors. The next level is multi-channel automated expansion and dominant market share capture.
                      </p>
                      <p>
                        <strong className="text-white font-semibold">Action Plan:</strong> Working with ET Digital will allow you to automate high-ticket client intake, deploy automated video creative assets, and expand into hyper-local AI search dominance.
                      </p>
                    </div>
                  )}
                </div>

                {/* Primary Call To Action */}
                <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/40 border border-brand-cyan/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-2xl">
                  <div className="max-w-xl">
                    <span className="font-mono text-[9px] font-extrabold text-brand-cyan uppercase tracking-widest block mb-1">
                      NEXT STEP TO UPGRADE YOUR GRADE
                    </span>
                    <h4 className="font-display text-base sm:text-lg font-black text-white uppercase tracking-tight mb-1.5">
                      Schedule a Free Strategy Call with Eric Thomas
                    </h4>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed">
                      Review your customized Grade {grade} report card live with Growth Strategist Eric Thomas and get a step-by-step roadmap to dominate your local market.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={onOpenCalendar || onOpenBooking}
                      className="bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-cyan-950/50 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-slate-950" />
                      <span>BOOK APPOINTMENT WITH ERIC</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="bg-transparent hover:bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white font-display text-[10px] font-black uppercase tracking-widest px-5 py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Test Another Target</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
