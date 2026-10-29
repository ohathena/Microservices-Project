import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { ShieldCheck, ArrowLeft, Lock, FileText } from 'lucide-react';

export function PrivacyPolicy() {
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
            <Lock size={12} />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
            At cradle., we build high-performance hardware with the core belief that your data privacy
            deserves the same precision and care as our engineering.
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
              1. Information We Collect
            </h2>
            <p>
              We collect information strictly necessary to provide our hardware, accessories, warranty
              coverage, and support services.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-600">
              <li>
                <strong>Account Credentials:</strong> Name, email address, hashed passwords, and optional phone numbers when you register for a cradle. account.
              </li>
              <li>
                <strong>Transaction & Fulfillment Data:</strong> Billing and shipping addresses, order history, and payment token identifiers handled via encrypted payment gateways.
              </li>
              <li>
                <strong>Hardware Diagnostics & Telemetry:</strong> Optional crash reports, firmware build numbers, and peripheral configurations (such as RGB lighting profiles and fan curve presets) saved to your device.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              2. How We Use Your Information
            </h2>
            <p>
              Your data is processed exclusively for lawful, customer-centric objectives:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-600">
              <li>Fulfilling custom PC builds, components, and monitor shipments.</li>
              <li>Administering our 3-Year Zero-Bright-Dot warranty and hardware RMA services.</li>
              <li>Sending critical order confirmations, dispatch tracking, and security alerts.</li>
              <li>Continually refining the reliability of our web store and hardware management software.</li>
            </ul>
            <p className="pt-2">
              <strong>We never sell, rent, or trade your personal information to third-party data brokers.</strong>
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              3. Data Protection & Security
            </h2>
            <p>
              We employ enterprise-grade security protocols, including AES-256 encryption at rest, TLS 1.3
              transmission security, tokenized authentication, and strict least-privilege administrative access
              controls to safeguard your information against unauthorized intrusion or accidental disclosure.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              4. Your Privacy Rights
            </h2>
            <p>
              Regardless of your geographic location, cradle. extends universal data rights to all users:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#F6F6F4] p-4 rounded-xl border border-neutral-200/60">
                <h4 className="font-bold text-[#111111] text-xs sm:text-sm mb-1">Right to Access & Portability</h4>
                <p className="text-xs text-neutral-600">Request a full copy of the personal data held in association with your hardware account.</p>
              </div>
              <div className="bg-[#F6F6F4] p-4 rounded-xl border border-neutral-200/60">
                <h4 className="font-bold text-[#111111] text-xs sm:text-sm mb-1">Right to Erasure (Be Forgotten)</h4>
                <p className="text-xs text-neutral-600">Request complete deletion of your account and personal details, subject to statutory tax retention periods.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              5. Contact Our Privacy Office
            </h2>
            <p>
              To exercise any of your privacy rights or discuss how your data is handled, please get in touch with our Data Protection Officer:
            </p>
            <div className="p-4 bg-[#F6F6F4] rounded-xl border border-neutral-200/60 inline-block text-xs sm:text-sm font-medium">
              <p>Email: <a href="mailto:privacy@cradle.com" className="font-bold text-black underline">privacy@cradle.com</a></p>
              <p className="text-neutral-500 mt-0.5">Response timeframe: within 48 business hours</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
