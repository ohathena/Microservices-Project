import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { FileText, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export function TermsOfUse() {
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
            <FileText size={12} />
            <span>Legal Agreements</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-3">
            Terms of Use
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
            These terms govern your purchase of cradle. hardware systems, peripheral devices, software
            utilities, and use of our web platform.
          </p>
          <p className="text-xs text-neutral-400 mt-4">
            Last updated: October 24, 2026 • Please read carefully before purchasing
          </p>
        </header>

        {/* Policy Content */}
        <div className="py-10 space-y-12 text-sm sm:text-[15px] text-neutral-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing cradle. websites, creating an account, or placing an order for computers,
              cases, monitors, or accessories, you agree to be bound by these Terms of Use and our
              accompanying Privacy Policy. If you do not accept these terms in full, please do not use
              our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              2. User Accounts & Security
            </h2>
            <p>
              When establishing an account with cradle., you must provide accurate and verifiable
              information. You are solely responsible for maintaining the confidentiality of your
              credentials and password, and you assume responsibility for all activities that transpire
              under your account.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              3. Orders, Pricing & Custom PC Builds
            </h2>
            <p>
              All prices are listed in US Dollars unless specifically configured otherwise. cradle. reserves
              the right to correct typographical errors or cancel orders resulting from inadvertent pricing
              discrepancies.
            </p>
            <p>
              For custom-configured PC orders (such as Q9 chassis builds), component allocation and assembly
              commence upon successful payment authorization. We perform an exhaustive 24-hour hardware burn-in
              test prior to dispatching your unit.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              4. 3-Year Limited Hardware Warranty
            </h2>
            <p>
              cradle. prebuilt systems and Canvas gaming monitors are protected by our comprehensive
              <strong> 3-Year Limited Hardware Warranty</strong>. This covers defects in materials, assembly,
              and component failure during standard consumer operation.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-600">
              <li>Includes our signature Zero-Bright-Dot panel replacement guarantee on monitors.</li>
              <li>Free round-trip shipping for warranty service during the first year of ownership.</li>
              <li>Warranty does not cover accidental liquid damage, unauthorized hardware tampering, or extreme overvolting outside manufacturer parameters.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              5. Shipping, Risk of Loss & Returns
            </h2>
            <p>
              All purchases are shipped via insured commercial couriers. Risk of loss and title for items
              pass to you upon carrier delivery confirmation. You may return unopened, undamaged items within
              <strong> 30 calendar days</strong> of delivery for a refund, subject to our standard return policy.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              6. Intellectual Property
            </h2>
            <p>
              The cradle. name, logo, custom chassis CAD designs, industrial trademarks, and website content
              are the exclusive intellectual property of cradle. Hardware Technologies Inc. and are protected
              by applicable trademark and copyright laws.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              7. Contact Information
            </h2>
            <p>
              For legal notices, warranty claims, or questions regarding these terms, please contact:
            </p>
            <div className="p-4 bg-[#F6F6F4] rounded-xl border border-neutral-200/60 inline-block text-xs sm:text-sm font-medium">
              <p>Email: <a href="mailto:legal@cradle.com" className="font-bold text-black underline">legal@cradle.com</a></p>
              <p className="text-neutral-500 mt-0.5">cradle. Hardware Technologies Inc., Legal Affairs Department</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfUse;
