import React from 'react';
import { Link } from 'react-router-dom';

/* =========================================================================
   MONOCHROME BRAND SVG ICONS
   ========================================================================= */

function XTwitterIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function DiscordIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* =========================================================================
   DEFAULT DATA CONSTANTS
   ========================================================================= */

const DEFAULT_LEGAL_LINKS = [
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Product Security', href: '/product-security' },
  { label: 'Terms of Use', href: '/terms-of-use' },
];

const DEFAULT_SOCIAL_LINKS = [
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: XTwitterIcon,
    ariaLabel: 'Follow cradle. on X (Twitter)',
  },
  {
    name: 'Linkedin',
    href: 'https://linkedin.com',
    icon: LinkedinIcon,
    ariaLabel: 'Connect with cradle. on LinkedIn',
  },
  {
    name: 'Discord',
    href: 'https://discord.com',
    icon: DiscordIcon,
    ariaLabel: 'Join cradle. gaming community on Discord',
  },
  {
    name: 'Youtube',
    href: 'https://youtube.com',
    icon: YoutubeIcon,
    ariaLabel: 'Subscribe to cradle. on YouTube',
  },
];

/* =========================================================================
   SUBCOMPONENTS
   ========================================================================= */

export function FooterBrand({ homeHref = '/' }) {
  return (
    <Link
      to={homeHref}
      className="text-[25px] sm:text-[27px] font-black tracking-[-0.04em] text-[#111111] hover:opacity-85 transition-opacity inline-flex items-baseline flex-shrink-0"
      aria-label="cradle. homepage"
    >
      <span>cradle</span>
      <span className="text-[#111111]">.</span>
    </Link>
  );
}

export function FooterLegalLinks({ links = DEFAULT_LEGAL_LINKS }) {
  return (
    <nav aria-label="Legal and Policy Links" className="flex flex-wrap items-center gap-5 sm:gap-7">
      {links.map((item, idx) => (
        <Link
          key={idx}
          to={item.href}
          className="text-[13px] text-[#111111] hover:text-neutral-500 transition-colors whitespace-nowrap focus:outline-none focus:underline"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function FooterSocialLinks({ socials = DEFAULT_SOCIAL_LINKS }) {
  return (
    <div className="flex flex-wrap items-center gap-5 sm:gap-6">
      {socials.map((social, idx) => {
        const Icon = social.icon;
        return (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none focus:underline"
          >
            <span className="text-[#111111] group-hover:text-neutral-500 transition-colors flex items-center justify-center">
              <Icon />
            </span>
            <span>{social.name}</span>
          </a>
        );
      })}
    </div>
  );
}

/* =========================================================================
   MAIN FOOTER COMPONENT
   ========================================================================= */

export default function Footer({
  legalLinks = DEFAULT_LEGAL_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  className = '',
}) {
  return (
    <footer
      className={`w-full bg-white border-t border-[#E5E5E5] text-[#111111] select-none ${className}`}
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-[1720px] mx-auto min-h-[68px] sm:min-h-[72px] md:h-[76px] px-6 sm:px-8 md:px-12 lg:px-16 py-4 md:py-0 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
        {/* Left Section: Brand Logo + Legal Links */}
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 lg:gap-10 w-full md:w-auto text-center sm:text-left">
          <FooterBrand />
          <FooterLegalLinks links={legalLinks} />
        </div>

        {/* Right Section: Social Links */}
        <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
          <FooterSocialLinks socials={socialLinks} />
        </div>
      </div>
    </footer>
  );
}

// Named export for flexibility
export { Footer };
