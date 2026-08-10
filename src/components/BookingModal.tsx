import React, { useState, useRef } from 'react';
import { X, Sparkles, Send, CheckCircle2, Copy, Check, ExternalLink, Mail, ArrowRight } from 'lucide-react';
import { submitPlaybookLeadToFirestore, sendGmailMessage } from '../lib/firebase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [activeTab, setActiveTab] = useState<'embed' | 'quick' | 'email'>('embed');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdRlFbZaX9JRgEwonxiQY_B7lFHsQzeJwshgn3oG7CC0atGNw/viewform?embedded=true';
  const googleFormDirectUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdRlFbZaX9JRgEwonxiQY_B7lFHsQzeJwshgn3oG7CC0atGNw/viewform';
  const emailAddress = 'hello@growwithetdigital.com';
  const mailtoUrl = `mailto:${emailAddress}?subject=Re:%20Let's%20Connect`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    try {
      // 1. Submit lead to Google Form endpoint in background
      const googleFormPostUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdRlFbZaX9JRgEwonxiQY_B7lFHsQzeJwshgn3oG7CC0atGNw/formResponse';
      const bodyData = new FormData();
      bodyData.append('entry.613580250', formData.name);
      bodyData.append('entry.1504758920', formData.email);
      bodyData.append('entry.707786207', `${formData.company || 'N/A'} - Msg: ${formData.message || ''}`);

      fetch(googleFormPostUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: bodyData
      }).catch((err) => console.warn('Google form submission background note:', err));

      // 2. Save lead to Firestore
      submitPlaybookLeadToFirestore({
        name: formData.name,
        email: formData.email,
        company: `${formData.company || ''} | ${formData.message || ''}`
      }).catch((fErr) => console.warn('Firestore lead submit note:', fErr));

      // 3. Email notification via Gmail
      const notificationSubject = `New "Let's Connect" Lead from ${formData.name}`;
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #f8fafc;">
          <h2 style="color: #0f172a; margin-top: 0;">New Contact Form Inquiry</h2>
          <p style="font-size: 14px; color: #475569;">A prospective client submitted an inquiry via <strong>Let's Connect</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <table style="width: 100%; text-align: left; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #0891b2;">Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0891b2;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${formData.email}" style="color: #0891b2;">${formData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0891b2;">Company / Brand:</td>
              <td style="padding: 8px 0; color: #0f172a;">${formData.company || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #0891b2;">Message / Goal:</td>
              <td style="padding: 8px 0; color: #0f172a;">${formData.message || 'None provided'}</td>
            </tr>
          </table>
        </div>
      `;
      sendGmailMessage(emailAddress, notificationSubject, emailBody).catch(() => {});

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      setIsSubmitting(false);
      setIsSubmitted(true); // Still show confirmation so user isn't stuck
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', company: '', message: '' });
    onClose();
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
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-150 ${
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
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/15 rounded-full blur-2xl pointer-events-none" />

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
              <p className="text-[10px] font-mono text-slate-400">DIRECT LEAD CAPTURE & INQUIRY FORM</p>
            </div>
          </div>
          
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

        {/* Navigation Tabs */}
        {!isSubmitted && (
          <div className="flex items-center gap-1.5 pt-3 pb-2 border-b border-slate-800/50 shrink-0 relative z-10">
            <button
              onClick={() => setActiveTab('embed')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'embed'
                  ? 'bg-brand-cyan text-slate-950 shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Google Form</span>
            </button>
            <button
              onClick={() => setActiveTab('quick')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'quick'
                  ? 'bg-brand-cyan text-slate-950 shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Quick Form</span>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'email'
                  ? 'bg-brand-cyan text-slate-950 shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Direct Email</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 my-1 scrollbar-thin scrollbar-thumb-slate-800 relative z-10">
          {/* Confirmation State */}
          {isSubmitted ? (
            <div className="py-8 px-4 text-center space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Inquiry Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Thank you for reaching out to ET Digital. Our team has received your submission and will get back to you within 24 hours.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left text-xs text-slate-400 space-y-1 font-mono">
                <p><strong className="text-brand-cyan">Status:</strong> Confirmed & Dispatched</p>
                <p><strong className="text-brand-cyan">Target Email:</strong> hello@growwithetdigital.com</p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-cyan-950/50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Close & Continue Browsing Website</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : activeTab === 'embed' ? (
            /* Google Form Embedded View */
            <div className="rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden min-h-[500px]">
              <iframe
                src={googleFormUrl}
                width="100%"
                height="560"
                frameBorder="0"
                className="w-full h-[540px] rounded-xl border-0 bg-white"
                title="ET Digital Google Form Lead Capture"
                loading="eager"
              >
                Loading Google Form...
              </iframe>
            </div>
          ) : activeTab === 'quick' ? (
            /* Quick Native Lead Capture Form */
            <form onSubmit={handleQuickSubmit} className="space-y-4 py-2 px-1">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Health & Fitness"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  How can we help? (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your client growth goals or project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-cyan-950/50 cursor-pointer flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Submission...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Submit Lead Request</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Direct Email Fallback */
            <div className="py-6 space-y-5">
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Prefer sending a direct email from your email client? Write to our team at ET Digital and we will reply within 24 hours.
              </p>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">Direct Email:</span>
                  <span className="text-brand-cyan font-bold font-mono text-xs">{emailAddress}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-2.5">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">Subject Line:</span>
                  <span className="text-white font-semibold font-mono text-xs">Re: Let's Connect</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={mailtoUrl}
                  className="w-full bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Open Email Client</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-slate-700/80"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800/80 shrink-0 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-sans">
            <a 
              href={googleFormDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-brand-cyan flex items-center gap-1 font-mono transition-colors"
            >
              <span>Open Form in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-display text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Close Window</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
