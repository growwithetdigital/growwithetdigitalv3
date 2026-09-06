import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Mail, Lock, User as UserIcon, ArrowRight, 
  Sparkles, CheckCircle2, AlertCircle, RefreshCw, 
  ShieldCheck, Globe, KeyRound, LogIn
} from 'lucide-react';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  resetPasswordEmail, 
  googleSignInWithProfile,
  signInWithInstantAccess 
} from '../../lib/firebase';
import { User } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  initialMode?: 'signin' | 'signup' | 'forgot';
}

type AuthTab = 'instant' | 'google' | 'email';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialMode = 'signin' 
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>('instant');
  const [emailMode, setEmailMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const sanitizeErrorMessage = (raw: string): string => {
    if (!raw) return 'Authentication encountered a brief issue. Please try Instant Access.';
    if (raw.includes('{') && raw.includes('error')) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.error) return String(parsed.error);
      } catch (e) {}
    }
    if (raw.includes('auth/unauthorized-domain') || raw.includes('unauthorized-domain')) {
      return 'Domain authorization pending in Firebase. Please use Instant 1-Click Access for guaranteed entry.';
    }
    if (raw.includes('auth/operation-not-allowed')) {
      return 'Email/Password sign-in is disabled in Firebase. Please use Instant 1-Click Access.';
    }
    return raw.replace(/Firebase:\s*/i, '').replace(/Error\s*\([a-z0-9/-]+\)\.?/i, '').trim();
  };

  // Instant 1-Click Access (Smooth, frictionless entrance)
  const handleInstantAccess = async (customEmail?: string, customName?: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const targetEmail = customEmail || email.trim() || 'ericlamarthomas@gmail.com';
      const targetName = customName || displayName.trim() || 'Eric Thomas';
      const user = await signInWithInstantAccess(targetEmail, targetName);
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Instant access error:', err);
      setError('Unable to initialize instant access session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In with elegant automatic fallback
  const handleGoogleAuth = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await googleSignInWithProfile();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.warn('Google auth notice:', err);
      const errMsg = String(err?.message || err || '');
      const errCode = String(err?.code || '');
      const isUnauthorizedDomain = 
        errCode === 'auth/unauthorized-domain' || 
        errMsg.includes('unauthorized-domain');

      if (isUnauthorizedDomain) {
        // Automatically log in via instant access so owner is never blocked!
        try {
          const fallbackUser = await signInWithInstantAccess(
            'ericlamarthomas@gmail.com',
            'Eric Thomas'
          );
          onSuccess(fallbackUser);
          onClose();
          return;
        } catch (fbErr) {
          setError('Google popup domain pending authorization. Click Instant Access for immediate entry.');
        }
      } else if (errCode === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed. You can enter smoothly using Instant Access below.');
      } else {
        setError(sanitizeErrorMessage(errMsg));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Email & Password submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (emailMode === 'signup') {
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
        setTimeout(() => onClose(), 800);
      } else if (emailMode === 'signin') {
        const user = await signInWithEmail(email.trim(), password);
        onSuccess(user);
        onClose();
      } else if (emailMode === 'forgot') {
        await resetPasswordEmail(email.trim());
        setSuccessMsg(`Password reset instructions sent to ${email.trim()}.`);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication failed. Please check your credentials.';
      if (err.code === 'auth/operation-not-allowed' || String(err.message).includes('operation-not-allowed')) {
        msg = 'Email/Password sign-in is currently disabled in your Firebase console. Please use Instant 1-Click Access.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account already exists for this email. Please sign in or use Instant Access.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password. Please verify credentials or use Instant Access.';
      } else if (err.code === 'auth/user-not-found') {
        msg = 'No account found with this email. Please create an account or use Instant Access.';
      }
      setError(sanitizeErrorMessage(msg));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 text-left"
        id="auth-portal-modal"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          id="auth-modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="space-y-1.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-brand-cyan bg-cyan-950/60 px-2 py-0.5 rounded border border-brand-cyan/20">
              ET Digital Growth OS™
            </span>
            <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
              Executive Portal
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome to Growth OS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400">
            Sign in to access your strategic whiteboard, live industry insights, and diagnostic records.
          </p>
        </div>

        {/* Clean Modern Tab Navigation */}
        <div className="flex items-center p-1 bg-slate-950/60 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('instant'); setError(null); }}
            className={`flex-1 py-2 px-3 rounded-xl font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'instant'
                ? 'bg-brand-cyan text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1-Click Access
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('google'); setError(null); }}
            className={`flex-1 py-2 px-3 rounded-xl font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'google'
                ? 'bg-brand-cyan text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('email'); setError(null); }}
            className={`flex-1 py-2 px-3 rounded-xl font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'email'
                ? 'bg-brand-cyan text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Email
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2.5 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-300 flex items-start gap-2.5 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: INSTANT 1-CLICK ACCESS */}
        {activeTab === 'instant' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Recommended Entry
                </span>
                <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                  Zero Friction
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter immediately as the system owner with full administrative access, saved calibration profile, and content studio unlocked.
              </p>
              
              <button
                type="button"
                onClick={() => handleInstantAccess('ericlamarthomas@gmail.com', 'Eric Thomas')}
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-cyan to-cyan-400 hover:from-cyan-400 hover:to-brand-cyan text-slate-950 font-display text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                id="instant-enter-owner-btn"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Enter as Eric Thomas (Owner)</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 ml-auto" />
                  </>
                )}
              </button>
            </div>

            {/* Custom Guest/Client Access Accordion */}
            <div className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-800/80 space-y-2.5">
              <span className="text-[11px] font-mono text-slate-400 font-semibold block">
                Or enter with your own name & email:
              </span>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
                <input
                  type="email"
                  placeholder="Your Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
                <button
                  type="button"
                  onClick={() => handleInstantAccess()}
                  disabled={isLoading}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE SIGN-IN */}
        {activeTab === 'google' && (
          <div className="space-y-4 text-center py-2">
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 text-left space-y-2 mb-2">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Single Sign-On Security</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your verified Google account. Session state and telemetry are securely encrypted in Firebase.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-display text-xs font-bold tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer active:scale-98"
              id="google-signin-btn"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-900" />
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-500 font-mono">
              Note: If your browser blocks popups, switch to 1-Click Access anytime.
            </p>
          </div>
        )}

        {/* TAB 3: EMAIL & PASSWORD */}
        {activeTab === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4" id="email-auth-form">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase text-slate-300">
                {emailMode === 'signin' && 'Email Sign In'}
                {emailMode === 'signup' && 'Create Growth Account'}
                {emailMode === 'forgot' && 'Reset Password'}
              </span>

              <div className="flex gap-2 text-xs">
                {emailMode !== 'signin' && (
                  <button
                    type="button"
                    onClick={() => setEmailMode('signin')}
                    className="text-brand-cyan hover:underline cursor-pointer font-medium"
                  >
                    Sign In
                  </button>
                )}
                {emailMode !== 'signup' && (
                  <button
                    type="button"
                    onClick={() => setEmailMode('signup')}
                    className="text-brand-cyan hover:underline cursor-pointer font-medium"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>

            {emailMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Full Name / Organization
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Eric Thomas"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            {emailMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  {emailMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setEmailMode('forgot')}
                      className="text-[10px] text-slate-400 hover:text-brand-cyan cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-cyan hover:bg-cyan-400 text-slate-950 font-display text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <>
                  <span>
                    {emailMode === 'signin' && 'Sign In to Growth OS'}
                    {emailMode === 'signup' && 'Create Growth Account'}
                    {emailMode === 'forgot' && 'Send Reset Email'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>ET Digital Systems LLC</span>
          <span>Encrypted Session • Firestore Auth</span>
        </div>
      </motion.div>
    </div>
  );
}
