import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Sparkles, Database, FileSpreadsheet, FileText, Mail, Loader2 
} from 'lucide-react';
import { 
  submitBookingToFirestore, 
  appendRowToGoogleSheet, 
  uploadBriefToGoogleDrive, 
  sendGmailMessage, 
  getAccessToken 
} from '../lib/firebase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    objective: 'SEO & Search Authority',
    notes: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    firestore: 'idle', // 'idle' | 'running' | 'success' | 'error'
    sheets: 'idle',
    drive: 'idle',
    gmail: 'idle',
    complete: false,
    error: null as string | null
  });

  const objectivesList = [
    'SEO & Search Authority',
    'Content Marketing Authority',
    'High-Conversion Web Experience',
    'Custom Growth Operating System',
    'AI & Automation Strategy'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.objective) {
      setStatus(prev => ({ ...prev, error: 'Please fill in all required fields.' }));
      return;
    }

    setStatus({
      submitting: true,
      firestore: 'running',
      sheets: 'idle',
      drive: 'idle',
      gmail: 'idle',
      complete: false,
      error: null
    });

    try {
      // 1. Write lead to Firestore (Required Firebase Task)
      const bookingId = await submitBookingToFirestore({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        objective: formData.objective,
        notes: formData.notes,
      });

      setStatus(prev => ({ ...prev, firestore: 'success' }));

      // 2. Check if Google OAuth credentials exist on client to sync Workspace APIs in real-time
      const token = await getAccessToken();
      if (token) {
        // (a) Sync Google Sheets
        setStatus(prev => ({ ...prev, sheets: 'running' }));
        try {
          const storedSpreadsheetId = localStorage.getItem('et_digital_sheet_id');
          if (storedSpreadsheetId) {
            await appendRowToGoogleSheet(storedSpreadsheetId, 'Sheet1', [
              [
                new Date().toLocaleString(),
                formData.name,
                formData.email,
                formData.company,
                formData.objective,
                formData.notes || 'N/A',
                bookingId
              ]
            ]);
            setStatus(prev => ({ ...prev, sheets: 'success' }));
          } else {
            setStatus(prev => ({ ...prev, sheets: 'idle' })); // No sheet bound
          }
        } catch (err) {
          console.error('Sheets Sync Error:', err);
          setStatus(prev => ({ ...prev, sheets: 'error' }));
        }

        // (b) Sync Google Drive
        setStatus(prev => ({ ...prev, drive: 'running' }));
        try {
          const briefContent = `
ET Digital Growth Strategy Brief
==================================
Submitted At: ${new Date().toLocaleString()}
Booking ID: ${bookingId}

Prospect Information:
---------------------
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}

Growth Profile:
---------------
Primary Objective: ${formData.objective}

Client Strategy Notes:
----------------------
${formData.notes || 'No extra notes provided.'}
          `.trim();
          
          await uploadBriefToGoogleDrive(
            `Prospect_Brief_${formData.name.replace(/\s+/g, '_')}.txt`,
            briefContent
          );
          setStatus(prev => ({ ...prev, drive: 'success' }));
        } catch (err) {
          console.error('Drive Sync Error:', err);
          setStatus(prev => ({ ...prev, drive: 'error' }));
        }

        // (c) Sync Gmail
        setStatus(prev => ({ ...prev, gmail: 'running' }));
        try {
          const emailBody = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <h2 style="color: #06b6d4; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; font-weight: 800;">ET DIGITAL GROWTH STRATEGY</h2>
              <p style="font-size: 16px; color: #1e293b;">Hello <strong>${formData.name}</strong>,</p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                Thank you for initiating your inquiry with ET Digital. We have received your submission and initialized your custom profile.
              </p>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Your Profile:</h3>
                <ul style="list-style: none; padding-left: 0; margin-bottom: 0;">
                  <li style="margin-bottom: 8px;"><strong>Company:</strong> ${formData.company}</li>
                  <li style="margin-bottom: 8px;"><strong>Primary Growth Track:</strong> ${formData.objective}</li>
                </ul>
              </div>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                Our team will analyze your digital footprint and reach out to schedule our live execution deep dive.
              </p>
              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 25px 0;" />
              <p style="font-size: 12px; color: #94a3b8; text-align: center;">
                ET Digital Inc. &bull; Los Angeles, CA &bull; contactetdigital@gmail.com
              </p>
            </div>
          `.trim();
          
          await sendGmailMessage(
            formData.email,
            'Your ET Digital Growth Inquiry is Initiated',
            emailBody
          );
          setStatus(prev => ({ ...prev, gmail: 'success' }));
        } catch (err) {
          console.error('Gmail Sync Error:', err);
          setStatus(prev => ({ ...prev, gmail: 'error' }));
        }
      }

      setStatus(prev => ({ ...prev, complete: true, submitting: false }));
    } catch (err: any) {
      console.error('Booking submission failed:', err);
      setStatus(prev => ({ 
        ...prev, 
        submitting: false, 
        error: err.message || 'An error occurred while submitting your strategy booking.' 
      }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            id="modal-overlay"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden z-10"
            id="booking-form-modal"
          >
            {/* Background cyan glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-950 border border-brand-cyan/20">
                  <Sparkles className="w-5 h-5 text-brand-cyan animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black text-white uppercase tracking-wider">
                    Work with Us
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">ET DIGITAL BRANDED INTAKE</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
                id="close-booking-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {status.complete ? (
              /* Success View */
              <div className="text-center py-6 relative z-10">
                <div className="w-16 h-16 bg-cyan-950 border border-brand-cyan/30 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-cyan shadow-lg shadow-cyan-950/50">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">
                  Inquiry Initiated!
                </h4>
                <p className="text-sm text-slate-300 mb-6 max-w-sm mx-auto">
                  Thank you, {formData.name}. Your strategy profile has been registered successfully. We are reviewing your footprint.
                </p>

                {/* Real-time synchronization pipeline trace */}
                <div className="bg-slate-950/75 border border-slate-800/80 rounded-xl p-4 text-left font-mono text-[10px] space-y-2.5 max-w-sm mx-auto">
                  <span className="text-slate-500 block uppercase tracking-wider font-extrabold text-[9px] mb-1">
                    System Integration Pipeline:
                  </span>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Database className="w-3.5 h-3.5 text-cyan-400" />
                      Cloud Firestore
                    </span>
                    <span className="text-brand-cyan font-bold">● SYNCHRONIZED</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      Google Sheets
                    </span>
                    {status.sheets === 'success' ? (
                      <span className="text-emerald-400 font-bold">● ROW APPENDED</span>
                    ) : status.sheets === 'running' ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" /> SYNCING
                      </span>
                    ) : (
                      <span className="text-slate-600">● LOCAL ONLY</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      Google Drive
                    </span>
                    {status.drive === 'success' ? (
                      <span className="text-blue-400 font-bold">● BRIEF SAVED</span>
                    ) : status.drive === 'running' ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" /> SYNCING
                      </span>
                    ) : (
                      <span className="text-slate-600">● LOCAL ONLY</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-rose-400" />
                      Gmail API Mailer
                    </span>
                    {status.gmail === 'success' ? (
                      <span className="text-rose-400 font-bold">● CONFIRMATION SENT</span>
                    ) : status.gmail === 'running' ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" /> SENDING
                      </span>
                    ) : (
                      <span className="text-slate-600">● UNLINKED</span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="mt-6 w-full bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
                  id="success-dismiss-btn"
                >
                  Return to Hub
                </button>
              </div>
            ) : (
              /* Input Form View */
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10" id="booking-form-element">
                {status.error && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-xs text-center">
                    {status.error}
                  </div>
                )}

                <div>
                  <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    disabled={status.submitting}
                    placeholder="Eric Thomas"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan/50 transition-colors disabled:opacity-50"
                    id="booking-input-name"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Business Email *
                  </label>
                  <input 
                    type="email"
                    required
                    disabled={status.submitting}
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan/50 transition-colors disabled:opacity-50"
                    id="booking-input-email"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Company / Brand Name *
                  </label>
                  <input 
                    type="text"
                    required
                    disabled={status.submitting}
                    placeholder="ET Digital Agency"
                    value={formData.company}
                    onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan/50 transition-colors disabled:opacity-50"
                    id="booking-input-company"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Primary Growth Objective *
                  </label>
                  <select
                    disabled={status.submitting}
                    value={formData.objective}
                    onChange={e => setFormData(p => ({ ...p, objective: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan/50 transition-colors cursor-pointer disabled:opacity-50"
                    id="booking-select-objective"
                  >
                    {objectivesList.map((obj, idx) => (
                      <option key={idx} value={obj} className="bg-slate-950">{obj}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Tell us about your current marketing setup (Optional)
                  </label>
                  <textarea 
                    rows={3}
                    disabled={status.submitting}
                    placeholder="We currently struggle with organic SEO traffic and want to establish our brand as an authority on Google answers..."
                    value={formData.notes}
                    onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan/50 transition-colors resize-none disabled:opacity-50"
                    id="booking-textarea-notes"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status.submitting}
                  className="w-full relative mt-2 bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  id="booking-submit-btn"
                >
                  {status.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      Deploying Growth Strategy Pipeline...
                    </>
                  ) : (
                    <>
                      Confirm & Connect
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
