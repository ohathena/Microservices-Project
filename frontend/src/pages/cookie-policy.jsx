import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { Cookie, ShieldCheck, ArrowLeft } from 'lucide-react';

export function CookiePolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] antialiased">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="pb-8 border-b border-neutral-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-3">
            <Cookie size={12} />
            <span>Privacy & Preferences</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-3">
            Cookie Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
            This policy outlines how cradle. uses cookies, local storage, and similar technologies to
            provide, safeguard, and improve our hardware store and web applications.
          </p>
          <p className="text-xs text-neutral-400 mt-4">
            Last updated: October 24, 2026 • Effective immediately
          </p>
        </header>

        {/* Policy Content */}
        <div className="py-10 space-y-12 text-sm sm:text-[15px] text-neutral-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are stored on your computer, tablet, or mobile device
              when you visit a website. They allow the website to recognize your browser, remember your
              login sessions, store items in your cart, and retain your preferences over time.
            </p>
            <p>
              Along with cookies, we may use standard browser technologies such as <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800">localStorage</code> to maintain your active shopping sessions, theme selections, and authentication tokens across page navigation.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              2. Categories of Cookies We Use
            </h2>
            <p>
              We classify cookies and local data storage into three distinct categories:
            </p>

            <div className="space-y-4 pt-2">
              <div className="bg-[#F6F6F4] p-5 rounded-xl border border-neutral-200/60">
                <h3 className="text-sm font-bold text-[#111111] mb-1">
                  A. Strictly Necessary & Essential Cookies
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  These cookies are vital for the core functionality of our platform. They enable user
                  authentication, shopping cart persistence, security measures, and account access.
                  Without these technologies, services like checkout, PC configuration saving, and order
                  tracking cannot operate.
                </p>
              </div>

              <div className="bg-[#F6F6F4] p-5 rounded-xl border border-neutral-200/60">
                <h3 className="text-sm font-bold text-[#111111] mb-1">
                  B. Performance & Analytics Cookies
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  These technologies collect anonymous, aggregated telemetry regarding how visitors
                  navigate our site, which hardware specifications are browsed most frequently, and page
                  load performance. This data helps us optimize store speed and identify technical glitches.
                </p>
              </div>

              <div className="bg-[#F6F6F4] p-5 rounded-xl border border-neutral-200/60">
                <h3 className="text-sm font-bold text-[#111111] mb-1">
                  C. Functionality & Preference Cookies
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  These cookies remember choices you make, such as selected shipping region, preferred
                  language (e.g. English, German), currency display, and remembered email addresses for
                  streamlined sign-in.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              3. Third-Party Integrations
            </h2>
            <p>
              In specific instances, trusted third-party providers set cookies on our behalf to ensure
              seamless functionality:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-600">
              <li>
                <strong>Google Authentication:</strong> Facilitates secure single sign-on (OAuth) without exposing your personal passwords.
              </li>
              <li>
                <strong>Payment Gateways:</strong> Encrypted tokens are utilized during checkout to process payments securely and prevent fraudulent transactions.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              4. Managing Your Cookie Preferences
            </h2>
            <p>
              You possess the right to decide whether to accept or reject cookies. Most web browsers
              automatically accept cookies, but you can alter your browser configuration to decline them
              or alert you when a cookie is placed.
            </p>
            <p>
              Please note that disabling strictly necessary cookies may restrict access to vital features,
              including maintaining items in your shopping bag or accessing your cradle. hardware account.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              5. Contact & Inquiries
            </h2>
            <p>
              If you have any questions regarding our use of cookies or tracking technologies, please
              contact our Data Privacy team at:
            </p>
            <div className="p-4 bg-[#F6F6F4] rounded-xl border border-neutral-200/60 inline-block text-xs sm:text-sm font-medium">
              <p>Email: <a href="mailto:privacy@cradle.com" className="font-bold text-black underline">privacy@cradle.com</a></p>
              <p className="text-neutral-500 mt-0.5">cradle. Hardware Technologies Inc., Attn: Privacy Office</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CookiePolicy;
