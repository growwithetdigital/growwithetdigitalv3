import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Mail, Lock, User as UserIcon, ArrowRight, 
  Sparkles, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, KeyRound
} from 'lucide-react';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  resetPasswordEmail, 
  googleSignInWithProfile 
} from '../../lib/firebase';
import { UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  initialMode?: 'signin' | 'signup' | 'forgot';
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialMode = 'signin' 
}: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Check if there is an unattached audit in session
  const hasPendingAudit = typeof window !== 'undefined' && Boolean(localStorage.getItem('et_pending_audit'));

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (!displayName.trim()) {
          throw new Error('Please enter your full name or business name.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }

        const { user, verificationSent } = await signUpWithEmail(email.trim(), password, displayName.trim());
        if (verificationSent) {
          setSuccessMsg(`Account created! A verification link was sent to ${email.trim()}.`);
        }
        onSuccess(user);
        setTimeout(() => onClose(), 1200);
      } else if (mode === 'signin') {
        const user = await signInWithEmail(email.trim(), password);
        onSuccess(user);
        onClose();
      } else if (mode === 'forgot') {
        await resetPasswordEmail(email.trim());
        setSuccessMsg(`Password reset instructions sent from hello@growwithetdigital.com to ${email.trim()}.`);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication failed. Please check your credentials.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'An account already exists for this email address. Please sign in or use password reset.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/user-not-found') {
        msg = 'No account found with this email. Please sign up for free.';
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await googleSignInWithProfile();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Google auth error:', err);
      setError(err.message || 'Google sign-in could not be completed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8"
        id="auth-portal-modal"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="space-y-1.5 text-left mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-brand-cyan bg-cyan-950/60 px-2 py-0.5 rounded border border-brand-cyan/20">
              ET Digital Growth OS™
            </span>
            {hasPendingAudit && (
              <span className="font-mono text-[9px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
                Audit Linked
              </span>
            )}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {mode === 'signin' && 'Sign In to Growth Operating System'}
            {mode === 'signup' && 'Create Your Growth OS Account'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400">
            {mode === 'signin' && 'Access your strategic whiteboard, diagnostic records, and digital roadmap.'}
            {mode === 'signup' && 'Get instant access to your digital whiteboard and real-time diagnostic vault.'}
            {mode === 'forgot' && 'Enter your email to receive a secure recovery link.'}
          </p>
        </div>

        {/* Pre-audit handoff notice */}
        {hasPendingAudit && mode === 'signup' && (
          <div className="mb-5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-cyan-300">
            <Sparkles className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <span>
              Your website diagnostic data will be automatically attached to your new profile immediately upon registration.
            </span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google Sign In (Only for signin / signup) */}
        {mode !== 'forgot' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-750 active:scale-98 border border-slate-700 hover:border-slate-600 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-slate-200 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm"
              id="google-auth-btn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 19.9 7.4 23 12 23z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                or with email
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name / Brand Representative
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-slate-850 border border-slate-750 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-slate-850 border border-slate-750 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-brand-cyan hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-850 border border-slate-750 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-brand-cyan hover:bg-cyan-400 active:scale-98 disabled:opacity-60 text-slate-950 font-display text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <>
                <span>
                  {mode === 'signin' && 'Sign In to Growth Operating System'}
                  {mode === 'signup' && 'Create Growth OS Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security / reCAPTCHA badge */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>reCAPTCHA Enterprise & 256-bit TLS</span>
          </div>
          <span>1 Account / Unique Email</span>
        </div>

        {/* Switch Modes footer */}
        <div className="mt-4 text-center text-xs text-slate-400">
          {mode === 'signin' ? (
            <p>
              Don't have a Growth OS account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-brand-cyan font-bold hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-brand-cyan font-bold hover:underline cursor-pointer"
              >
                Sign in to Growth OS
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
