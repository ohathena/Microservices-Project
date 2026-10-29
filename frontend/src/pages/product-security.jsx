import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { Shield, ArrowLeft, Cpu, AlertTriangle, Key } from 'lucide-react';

export function ProductSecurity() {
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
            <Shield size={12} />
            <span>Trust & Hardware Integrity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-3">
            Product Security
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
            Our approach to hardware defense, cryptographic firmware signing, and coordinated vulnerability
            disclosure across all cradle. gaming PCs, components, and displays.
          </p>
          <p className="text-xs text-neutral-400 mt-4">
            Last updated: October 24, 2026 • Security Bulletin & Policies
          </p>
        </header>

        {/* Policy Content */}
        <div className="py-10 space-y-12 text-sm sm:text-[15px] text-neutral-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              1. Security by Design
            </h2>
            <p>
              Security at cradle. is not an afterthought; it is baked directly into our schematics and printed circuit boards. Every PC chassis controller, RGB hub, liquid cooler pump head, and monitor firmware module incorporates:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-600">
              <li>
                <strong>Cryptographically Signed Firmware:</strong> Hardware devices will only execute microcode binaries authenticated with cradle. private root keys, blocking malicious peripheral firmware flashing.
              </li>
              <li>
                <strong>Isolated Controller Architecture:</strong> Fan and RGB microcontrollers communicate over sandboxed USB protocol channels with strict memory bounds checking.
              </li>
              <li>
                <strong>Component Provenance:</strong> Every GPU, memory module, and storage drive sourced for cradle. prebuilt systems is acquired strictly from authorized original manufacturers with verifiable supply chain traceability.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              2. Coordinated Vulnerability Disclosure (CVD)
            </h2>
            <p>
              We enthusiastically welcome security researchers, white-hat ethical hackers, and customers to review our products and software utilities. If you discover a potential vulnerability in any cradle. hardware or web infrastructure, we encourage prompt and responsible disclosure.
            </p>
            <div className="bg-[#F6F6F4] p-5 rounded-xl border border-neutral-200/60 mt-3 space-y-2">
              <h3 className="font-bold text-[#111111] text-sm">Our Commitments to Security Researchers:</h3>
              <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-600 space-y-1">
                <li>We will acknowledge receipt of your vulnerability report within <strong>24 business hours</strong>.</li>
                <li>We provide a dedicated engineering contact to validate and reproduce the findings.</li>
                <li>We commit to transparent remediation timelines and will not pursue legal action against researchers acting in good faith under Safe Harbor guidelines.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              3. Scope & Safe Harbor
            </h2>
            <p>
              Qualifying research targets include our web services, store APIs, customer portals, companion desktop software, and cradle.-manufactured hardware controllers.
            </p>
            <p className="text-xs text-neutral-500">
              Out of scope: Denial of Service (DoS/DDoS) attacks, social engineering of cradle. staff, physical attacks on fulfillment warehouses, or disclosure of non-security bugs.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              4. Reporting a Security Issue
            </h2>
            <p>
              Please submit encrypted security reports directly to our Product Security Incident Response Team (PSIRT) via:
            </p>
            <div className="p-4 bg-[#F6F6F4] rounded-xl border border-neutral-200/60 inline-block text-xs sm:text-sm font-medium">
              <p>Email: <a href="mailto:security@cradle.com" className="font-bold text-black underline">security@cradle.com</a></p>
              <p className="text-neutral-500 mt-1">PGP Fingerprint: <span className="font-mono text-neutral-700 text-xs">8B24 E719 3F02 91A5 D9C1 5683 440F B1E7</span></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductSecurity;
