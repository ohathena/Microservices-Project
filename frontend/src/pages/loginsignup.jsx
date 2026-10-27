import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  User as UserIcon,
  Check,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

/* =========================================================================
   GOOGLE SVG ICON
   ========================================================================= */

function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

/* =========================================================================
   LOGIN & SIGNUP COMPONENT
   ========================================================================= */

export function Login() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    if (mode === 'signup' && !agreeTerms) {
      setNotification({ type: 'error', message: 'Please agree to the Terms of Use.' });
      return;
    }

    setNotification({
      type: 'success',
      message: mode === 'signin' 
        ? 'Signed in successfully! (Frontend demo)' 
        : 'Account created successfully! (Frontend demo)',
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleGoogleAuth = () => {
    setNotification({
      type: 'success',
      message: 'Google authentication initiated (OAuth frontend demo).',
    });
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] antialiased">
      {/* Top Navigation Bar: Minimal Brand + Back Link */}
      <header className="w-full bg-white border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto h-20 px-6 sm:px-8 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-[#111111] hover:opacity-85 transition-opacity"
            aria-label="cradle. homepage"
          >
            cradle.
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
        <div className="w-full max-w-md">
          {/* Notification Alert */}
          {notification && (
            <div
              className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
                notification.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <Check size={16} />
              <span>{notification.message}</span>
            </div>
          )}

          {/* Authentication Card */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-xl shadow-black/[0.03] p-7 sm:p-9 transition-all">
            {/* Header Titles */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] mb-2">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                {mode === 'signin'
                  ? 'Access your orders, saved PC configurations & warranty'
                  : 'Join cradle. to customize high-end gaming rigs & track gear'}
              </p>
            </div>

            {/* Animated Tab Switcher */}
            <div className="relative p-1 bg-neutral-100 rounded-xl flex items-center mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setNotification(null);
                }}
                className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                  mode === 'signin' ? 'text-white' : 'text-neutral-500 hover:text-black'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setNotification(null);
                }}
                className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                  mode === 'signup' ? 'text-white' : 'text-neutral-500 hover:text-black'
                }`}
              >
                Create Account
              </button>

              {/* Sliding Background Indicator */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-lg transition-transform duration-300 ease-out ${
                  mode === 'signin' ? 'translate-x-0' : 'translate-x-[calc(100%+8px)]'
                }`}
              />
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-neutral-300 rounded-xl text-xs sm:text-sm font-semibold text-[#111111] bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all active:scale-[0.99] shadow-sm mb-5"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="w-full border-t border-neutral-200" />
              <span className="absolute bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (Sign Up only) */}
              {mode === 'signup' && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Alex Mercer"
                      className="w-full pl-10 pr-3.5 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="gamer@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() =>
                        setNotification({
                          type: 'success',
                          message: 'Password reset link sent to your email (Demo).',
                        })
                      }
                      className="text-[11px] font-semibold text-neutral-500 hover:text-black transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up only) */}
              {mode === 'signup' && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black p-0.5"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me / Terms Checkboxes */}
              {mode === 'signin' ? (
                <div className="flex items-center pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                    />
                    <span className="text-xs text-neutral-600">Remember this device</span>
                  </label>
                </div>
              ) : (
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-neutral-600 cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms-of-use" className="font-semibold text-black underline">
                      Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="font-semibold text-black underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {/* Bottom Toggle Prompt */}
            <div className="pt-6 mt-6 border-t border-neutral-100 text-center">
              {mode === 'signin' ? (
                <p className="text-xs text-neutral-500">
                  Don't have a cradle. account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setNotification(null);
                    }}
                    className="font-bold text-black hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-xs text-neutral-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setNotification(null);
                    }}
                    className="font-bold text-black hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Security Assurance Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
            <ShieldCheck size={14} className="text-neutral-500" />
            <span>256-bit SSL encrypted • Official cradle. Hardware Account</span>
          </div>
        </div>
      </main>

      {/* Footer component at bottom */}
      <Footer />
    </div>
  );
}

export default Login;
