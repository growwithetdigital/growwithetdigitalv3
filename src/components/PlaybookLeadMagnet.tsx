import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, CheckCircle2, User, Mail, Building2, Sparkles } from 'lucide-react';

interface PlaybookLeadMagnetProps {
  onOpenBooking: () => void;
}

export default function PlaybookLeadMagnet({ onOpenBooking }: PlaybookLeadMagnetProps) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="playbook-download" className="py-24 bg-slate-50 border-t border-b border-slate-200/60 relative overflow-hidden text-center select-none">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Unified Premium Card Container housing header, image, and form in a clean stacked layout */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col items-center">
          
          {/* Header & Caption Section */}
          <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-cyan bg-cyan-50 border border-cyan-100/60 px-3 py-1 rounded-full mb-4">
            A free guide from ET Digital
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none text-center mb-4">
            The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">Growth Playbook</span>
          </h2>

          <p className="font-sans text-base sm:text-lg font-bold text-slate-900 leading-snug text-center mb-4 max-w-xl">
            10 Practical Strategies to Help Your Business Grow with Confidence
          </p>

          <p className="font-sans text-sm text-slate-600 leading-relaxed text-center mb-6 max-w-2xl">
            A practical guide designed for business owners who want to simplify their marketing, attract more customers, and build a stronger digital presence. Inside you’ll discover practical strategies that can be implemented immediately—without expensive software or complicated marketing jargon. Whether you’re just getting started or looking to improve your current marketing efforts, this guide provides a clear roadmap for sustainable business growth.
          </p>

          {/* Playbook Cover Image - Positioned right under description and above the form */}
          <div className="my-8 flex justify-center w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group w-full max-w-[260px]"
            >
              {/* Glow Behind Book */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-cyan-500 rounded-2xl blur-md opacity-20 group-hover:opacity-35 transition-opacity duration-300" />
              
              {/* Premium Book Cover Image - Adjusted to show full mockup without being cut off */}
              <div className="relative select-none group-hover:scale-[1.02] transition-transform duration-500 flex justify-center items-center">
                <img 
                  src="https://res.cloudinary.com/dnpvgq7gt/image/upload/v1783367304/ChatGPT_Image_final_Jul_6_2026_12_45_53_PM_eclb47.png"
                  alt="The Digital Growth Playbook Cover"
                  className="w-full h-auto max-h-[360px] object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* Form Section - Positioned directly underneath the image */}
          <div className="w-full max-w-xl mt-4">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="playbook-form"
                  onSubmit={handleSubmit}
                  className="space-y-4 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/10 rounded-xl py-3.5 pl-10 pr-4 text-xs font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Company Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/10 rounded-xl py-3.5 pl-10 pr-4 text-xs font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="business@company.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/10 rounded-xl py-3.5 pl-10 pr-4 text-xs font-sans text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                    />
                  </div>

                  {/* Single Submit Button */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto group relative inline-flex items-center justify-center bg-slate-950 hover:bg-slate-900 text-white font-display text-xs font-extrabold uppercase tracking-widest px-10 py-4.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-80"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isLoading ? 'Preparing Playbook...' : 'Download Free'}
                        {!isLoading && <Download className="w-4 h-4 text-brand-cyan group-hover:translate-y-0.5 transition-transform" />}
                      </span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="playbook-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl shadow-sm w-full text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-cyan/15 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-black text-slate-950 tracking-tight mb-2">
                        Your Playbook is Ready, {formData.name}!
                      </h4>
                      <p className="font-sans text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                        We have sent **The Digital Growth Playbook** to <strong className="text-slate-950">{formData.email}</strong>. Please check your inbox in the next few minutes to get started with the 10 strategies.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="font-sans text-xs text-slate-400 leading-relaxed mt-8 max-w-lg text-center italic">
            *This guide is structured to provide practical, immediate steps your business can take to grow with clarity and confidence.
          </p>

        </div>

      </div>
    </section>
  );
}
