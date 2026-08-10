import React, { useState } from 'react';
import { X, Sparkles, Mail, Copy, Check, ExternalLink, ShieldCheck, RotateCcw, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'custom' | 'google'>('custom');
  const [iframeKey, setIframeKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Growth Operating System (GOS)');
  const [message, setMessage] = useState('');

  const emailAddress = 'hello@growwithetdigital.com';
  const mailtoUrl = "mailto:hello@growwithetdigital.com?subject=Re%3A%20Let's%20Connect";

  // Clean embedded Google Form URL
  const formEmbedUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfwtjXUwkk1oNy7P3HweXWfpylVhR8ZDpOOANUyJwZ-Z9dg5Q/viewform?embedded=true';
  const directFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfwtjXUwkk1oNy7P3HweXWfpylVhR8ZDpOOANUyJwZ-Z9dg5Q/viewform';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setSubmitted(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct pre-filled mailto URL
    const bodyContent = `Hello ET Digital Team,\n\n${message}\n\n---\nSender Details:\nName: ${fullName}\nEmail: ${email}\nCompany/Website: ${company || 'N/A'}\nInterested In: ${service}`;
    const encodedBody = encodeURIComponent(bodyContent);
    const customMailto = `mailto:${emailAddress}?subject=${encodeURIComponent("Re: Let's Connect - " + (company || fullName))}&body=${encodedBody}`;

    // Open native mail app in new window/tab
    window.open(customMailto, '_blank');
    setSubmitted(true);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 transition-all duration-150 ${
        isOpen 
          ? 'opacity-100 pointer-events-auto visible' 
          : 'opacity-0 pointer-events-none invisible'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay background */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity duration-150 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        id="booking-modal-overlay"
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl text-left overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] transition-all duration-150 transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'
        }`}
        id="lets-connect-modal"
      >
        {/* Background cyan glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-cyan/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800/80 shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-950/90 border border-brand-cyan/30 text-brand-cyan shadow-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-xl font-black text-white uppercase tracking-wider">
                Let's Connect
              </h3>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                DIRECT STRATEGY INQUIRY & CONTACT FORM
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {submitted && (
              <button
                onClick={handleResetForm}
                title="Send another message"
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-brand-cyan transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Message</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              id="close-connect-modal-btn"
              title="Close Window"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher: Quick Form vs Google Form */}
        <div className="flex items-center gap-2 pt-3 pb-1 border-b border-slate-800/50 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-brand-cyan text-slate-950 shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Interactive Contact Form</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'google'
                ? 'bg-brand-cyan text-slate-950 shadow-md'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Form View</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto py-3 my-1 scrollbar-thin scrollbar-thumb-slate-800 relative z-10 space-y-4">
          
          {activeTab === 'custom' ? (
            /* Custom Interactive Form */
            <div className="space-y-4">
              {submitted ? (
                /* Success Confirmation State */
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-brand-cyan/40 text-center space-y-4 my-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-950 border border-brand-cyan/50 text-brand-cyan mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-black text-white uppercase tracking-wider">
                    Native Email Launched!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your default email application was opened with your message pre-filled. If it didn't open automatically, click below to open your native email client directly.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={mailtoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open Default Mail App</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form Fields */
                <form onSubmit={handleFormSubmit} className="space-y-3 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Your Full Name <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Work Email Address <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="s.jenkins@company.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Company or Website URL
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="yourcompany.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Primary Interest
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan transition-colors cursor-pointer"
                      >
                        <option value="Growth Operating System (GOS)">Growth Operating System (GOS)</option>
                        <option value="AI Search & AEO Optimization">AI Search & AEO Optimization</option>
                        <option value="Full Audit & Strategy Call">Full Audit & Strategy Call</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
                      How Can We Help You Grow? <span className="text-brand-cyan">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your current growth goals, marketing challenges, or timeline..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                      <span>100% Confidential • Response &lt; 2 Hours</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiry via Email</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Embedded Google Form View */
            <div className="rounded-xl bg-white border border-slate-800/80 overflow-hidden min-h-[480px] shadow-inner">
              <iframe
                key={iframeKey}
                src={formEmbedUrl}
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full h-[500px] rounded-xl border-0 bg-white"
                title="ET Digital Connect Form"
                loading="eager"
              >
                Loading Form...
              </iframe>
            </div>
          )}

          {/* Direct Native Mail App Trigger Banner - Uses requested mailto URL */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
            <div className="flex items-center gap-2 text-xs text-slate-300 text-center sm:text-left">
              <Mail className="w-4 h-4 text-brand-cyan shrink-0 hidden sm:block" />
              <span>
                Direct Email: <strong className="text-white font-mono">{emailAddress}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider py-2 px-3.5 rounded-lg transition-all flex items-center justify-center gap-1.5 border border-slate-700/80"
              >
                <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Open Native Mail</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider py-2 px-3.5 rounded-lg transition-all flex items-center justify-center gap-1.5 border border-slate-700/80 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800/80 shrink-0 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3 text-slate-400 text-[11px] font-sans">
            <a 
              href={directFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-cyan flex items-center gap-1 font-mono text-slate-400 hover:underline transition-colors"
            >
              <span>Google Form Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={handleResetForm}
              className="hover:text-white font-mono text-slate-400 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-brand-cyan" />
              <span>Reset Form</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>Close Window</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

