import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
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
  AlertCircle,
  Loader2,
  CheckCircle2,
  LogOut,
  UserCheck
} from 'lucide-react';

/* =========================================================================
   LOGIN & SIGNUP COMPONENT WITH REAL BACKEND & GOOGLE OAUTH
   ========================================================================= */

const API_URL = import.meta.env.VITE_CUSTOMER_API_URL || 'http://localhost:8001';

export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [notification, setNotification] = useState(null);

  // Check if already logged in or remembered email
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('cradle_user');
      const token = localStorage.getItem('cradle_token');
      if (savedUser && token) {
        setCurrentUser(JSON.parse(savedUser));
      }

      const rememberedEmail = localStorage.getItem('cradle_remember_email');
      if (rememberedEmail) {
        setFormData((prev) => ({ ...prev, email: rememberedEmail }));
        setRememberMe(true);
      }
    } catch (e) {
      console.error('Error loading stored auth:', e);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignOut = () => {
    localStorage.removeItem('cradle_token');
    localStorage.removeItem('cradle_user');
    setCurrentUser(null);
    setNotification({
      type: 'success',
      message: 'You have signed out successfully.',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // Email / Password Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setNotification({ type: 'error', message: 'Passwords do not match.' });
        return;
      }
      if (formData.password.length < 6) {
        setNotification({
          type: 'error',
          message: 'Password must be at least 6 characters long.',
        });
        return;
      }
      if (!agreeTerms) {
        setNotification({
          type: 'error',
          message: 'Please agree to the Terms of Use and Privacy Policy.',
        });
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = mode === 'signin' ? `${API_URL}/login` : `${API_URL}/signup`;
      const payload =
        mode === 'signin'
          ? { email: formData.email.trim(), password: formData.password }
          : {
              name: formData.name.trim(),
              email: formData.email.trim(),
              password: formData.password,
              phone: '',
            };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Authentication failed. Please verify your details.');
      }

      // Persist auth token and user
      if (data.token) {
        localStorage.setItem('cradle_token', data.token);
      }
      const userObj = {
        id: data.id,
        name: data.name || formData.name || 'Cradle Member',
        email: data.email || formData.email,
        picture: data.picture || null,
      };
      localStorage.setItem('cradle_user', JSON.stringify(userObj));
      setCurrentUser(userObj);

      if (rememberMe) {
        localStorage.setItem('cradle_remember_email', formData.email);
      } else {
        localStorage.removeItem('cradle_remember_email');
      }

      setNotification({
        type: 'success',
        message:
          mode === 'signin'
            ? `Welcome back, ${userObj.name}! Redirecting to store...`
            : `Account created successfully! Welcome, ${userObj.name}! Redirecting...`,
      });

      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      console.error('Auth request error:', err);
      setNotification({
        type: 'error',
        message:
          err.message || 'Unable to connect to the authentication server. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Success
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setNotification(null);

    try {
      const { credential } = credentialResponse;
      if (!credential) {
        throw new Error('Google credential token was not received.');
      }

      const res = await fetch(`${API_URL}/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Google authentication failed on server.');
      }

      // Persist auth token and user
      if (data.token) {
        localStorage.setItem('cradle_token', data.token);
      }
      const userObj = {
        id: data.id,
        name: data.name || 'Google User',
        email: data.email,
        picture: data.picture || null,
      };
      localStorage.setItem('cradle_user', JSON.stringify(userObj));
      setCurrentUser(userObj);

      setNotification({
        type: 'success',
        message: `Welcome, ${userObj.name}! Signed in via Google. Redirecting...`,
      });

      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      console.error('Google Sign-in error:', err);
      setNotification({
        type: 'error',
        message:
          err.message || 'Google authentication could not be completed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setNotification({
      type: 'error',
      message: 'Google Sign-in was cancelled or encountered an error.',
    });
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
              className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-start gap-2.5 transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
                notification.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
              )}
              <span className="flex-1 leading-relaxed">{notification.message}</span>
            </div>
          )}

          {/* If already signed in, display member card with quick actions */}
          {currentUser ? (
            <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-xl shadow-black/[0.03] p-7 sm:p-9 text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white font-bold text-xl mx-auto flex items-center justify-center mb-4 shadow-sm">
                {currentUser.picture ? (
                  <img
                    src={currentUser.picture}
                    alt={currentUser.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  (currentUser.name || 'U').charAt(0).toUpperCase()
                )}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-semibold text-neutral-700 mb-2">
                <UserCheck size={12} className="text-black" />
                <span>Signed In</span>
              </div>
              <h2 className="text-xl font-bold text-[#111111]">{currentUser.name}</h2>
              <p className="text-xs text-neutral-500 mb-6">{currentUser.email}</p>

              <div className="space-y-3">
                <Link
                  to="/"
                  className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Continue to Store</span>
                  <ArrowRight size={14} />
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full py-3 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Sign Out of cradle.</span>
                </button>
              </div>
            </div>
          ) : (
            /* Authentication Card */
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

              {/* Official Google OAuth Container */}
              <div className="w-full flex justify-center mb-5 [&>div]:w-full [&>div>iframe]:!w-full [&>div>div]:!w-full [&_iframe]:rounded-xl">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  text="continue_with"
                  width="100%"
                />
              </div>

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
                            message:
                              'Password reset link will be sent if an account exists for this email.',
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
                  disabled={loading}
                  className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
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
          )}

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
