import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Check,
  Sparkles,
  Cpu,
  Monitor,
  Headphones,
  Sliders,
  ExternalLink,
  Flame,
  ShieldCheck,
  Truck
} from 'lucide-react';

/* =========================================================================
   NAVIGATION & MEGA MENU DATA
   ========================================================================= */

const GAMING_PCS_DATA = {
  columns: [
    {
      title: 'Shop by Performance',
      links: [
        { label: 'High-End Gaming PCs', tag: 'RTX 5090 / 4090', href: '/gaming-pcs?tier=high-end' },
        { label: 'Mid-Range Gaming PCs', tag: 'RTX 4070 / Super', href: '/gaming-pcs?tier=mid-range' },
        { label: 'Budget Gaming PCs', tag: 'Under $1,200', href: '/gaming-pcs?tier=budget' },
        { label: 'Entry-Level Gaming PCs', tag: '1080p Ready', href: '/gaming-pcs?tier=entry' },
      ],
    },
    {
      title: 'Shop by Configuration',
      links: [
        { label: 'Prebuilt Gaming PCs', href: '/gaming-pcs/prebuilt' },
        { label: 'Custom Gaming PCs', href: '/gaming-pcs/custom-builder' },
        { label: 'Ready-to-Ship PCs', tag: 'Ships in 24h', href: '/gaming-pcs/ready-to-ship' },
        { label: 'Upgradeable Gaming PCs', href: '/gaming-pcs/upgradeable' },
      ],
    },
    {
      title: 'Shop by Use Case',
      links: [
        { label: '4K Gaming PCs', href: '/gaming-pcs/4k-gaming' },
        { label: '1440p Gaming PCs', href: '/gaming-pcs/1440p-gaming' },
        { label: '1080p Gaming PCs', href: '/gaming-pcs/1080p-gaming' },
        { label: 'Streaming PCs', href: '/gaming-pcs/streaming' },
        { label: 'Creator Workstations', href: '/gaming-pcs/creator' },
      ],
    },
    {
      title: 'Featured',
      links: [
        { label: 'Best Sellers', tag: 'Popular', href: '/gaming-pcs/best-sellers' },
        { label: 'New Arrivals', tag: '2026 Fleet', href: '/gaming-pcs/new-arrivals' },
        { label: 'Gaming PC Deals', tag: 'Up to $400 Off', href: '/gaming-pcs/deals' },
      ],
    },
  ],
  featuredProduct: {
    title: 'Cradle Apex Titan 5090',
    specs: 'Intel Core i9-14900KS • RTX 5090 32GB • 64GB DDR5 • 4TB Gen5 SSD',
    price: '$3,899',
    badge: 'Flagship Rig',
    href: '/gaming-pcs/cradle-apex-titan',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
  },
};

const COMPONENTS_DATA = {
  columns: [
    {
      title: 'Core Components',
      links: [
        { label: 'Graphics Cards (GPU)', href: '/components/gpu' },
        { label: 'Processors (CPU)', href: '/components/cpu' },
        { label: 'Motherboards', href: '/components/motherboards' },
        { label: 'RAM / Memory', href: '/components/ram' },
        { label: 'SSD Storage', href: '/components/ssd' },
        { label: 'HDD Storage', href: '/components/hdd' },
        { label: 'Power Supplies (PSU)', href: '/components/psu' },
        { label: 'PC Cases', href: '/components/cases' },
        { label: 'CPU Coolers', href: '/components/coolers' },
        { label: 'Case Fans', href: '/components/fans' },
      ],
    },
    {
      title: 'Additional Components',
      links: [
        { label: 'Liquid Cooling', href: '/components/liquid-cooling' },
        { label: 'Thermal Paste', href: '/components/thermal-paste' },
        { label: 'Capture Cards', href: '/components/capture-cards' },
        { label: 'Expansion Cards', href: '/components/expansion-cards' },
        { label: 'Wi-Fi & Bluetooth Adapters', href: '/components/wireless-adapters' },
        { label: 'Cables & Accessories', href: '/components/cables' },
      ],
    },
    {
      title: 'Shop by Brand',
      links: [
        { label: 'NVIDIA', href: '/brand/nvidia' },
        { label: 'AMD', href: '/brand/amd' },
        { label: 'Intel', href: '/brand/intel' },
        { label: 'ASUS', href: '/brand/asus' },
        { label: 'MSI', href: '/brand/msi' },
        { label: 'Gigabyte', href: '/brand/gigabyte' },
        { label: 'Corsair', href: '/brand/corsair' },
        { label: 'Kingston', href: '/brand/kingston' },
        { label: 'Samsung', href: '/brand/samsung' },
      ],
    },
  ],
  spotlight: {
    title: 'PC Part Configurator',
    description: 'Ensure 100% component compatibility with live wattage verification and bottleneck calculation.',
    cta: 'Start Custom Build',
    href: '/custom-pc-builder',
  },
};

const PERIPHERALS_DATA = {
  columns: [
    {
      title: 'Keyboards',
      links: [
        { label: 'Mechanical Keyboards', href: '/peripherals/keyboards/mechanical' },
        { label: 'Membrane / Normal Keyboards', href: '/peripherals/keyboards/membrane' },
        { label: 'Wireless Keyboards', href: '/peripherals/keyboards/wireless' },
        { label: 'Wired Keyboards', href: '/peripherals/keyboards/wired' },
        { label: 'RGB Gaming Keyboards', href: '/peripherals/keyboards/rgb' },
        { label: 'Compact (60%, 65%, 75%)', href: '/peripherals/keyboards/compact' },
        { label: 'Full-Size Keyboards', href: '/peripherals/keyboards/full-size' },
        { label: 'Keyboard Accessories & Keycaps', href: '/peripherals/keyboards/accessories' },
      ],
    },
    {
      title: 'Mice',
      links: [
        { label: 'Gaming Mice', href: '/peripherals/mice/gaming' },
        { label: 'Wireless Mice', href: '/peripherals/mice/wireless' },
        { label: 'Wired Mice', href: '/peripherals/mice/wired' },
        { label: 'Lightweight Gaming Mice', href: '/peripherals/mice/lightweight' },
        { label: 'Ergonomic Mice', href: '/peripherals/mice/ergonomic' },
        { label: 'RGB Mice', href: '/peripherals/mice/rgb' },
        { label: 'Mouse Pads & Desk Mats', href: '/peripherals/mice/pads' },
        { label: 'Mouse Accessories', href: '/peripherals/mice/accessories' },
      ],
    },
    {
      title: 'Audio',
      links: [
        { label: 'Gaming Headsets', href: '/peripherals/audio/headsets' },
        { label: 'Wireless Headsets', href: '/peripherals/audio/wireless-headsets' },
        { label: 'Wired Headsets', href: '/peripherals/audio/wired-headsets' },
        { label: 'Gaming Headphones', href: '/peripherals/audio/headphones' },
        { label: 'Gaming Microphones', href: '/peripherals/audio/microphones' },
        { label: 'USB Microphones', href: '/peripherals/audio/usb-mic' },
        { label: 'XLR Microphones', href: '/peripherals/audio/xlr-mic' },
        { label: 'Speakers', href: '/peripherals/audio/speakers' },
        { label: 'Audio Interfaces', href: '/peripherals/audio/interfaces' },
      ],
    },
    {
      title: 'Other Accessories',
      links: [
        { label: 'Webcams', href: '/peripherals/accessories/webcams' },
        { label: 'Controllers', href: '/peripherals/accessories/controllers' },
        { label: 'Gaming Chairs', href: '/peripherals/accessories/chairs' },
        { label: 'Gaming Desks', href: '/peripherals/accessories/desks' },
        { label: 'Mouse Bungees', href: '/peripherals/accessories/bungees' },
        { label: 'Monitor Arms', href: '/peripherals/accessories/monitor-arms' },
        { label: 'Streaming Accessories', href: '/peripherals/accessories/streaming' },
        { label: 'Cable Management', href: '/peripherals/accessories/cable-management' },
        { label: 'RGB Lighting', href: '/peripherals/accessories/rgb-lighting' },
      ],
    },
    {
      title: 'Featured',
      links: [
        { label: 'Best-Selling Peripherals', tag: 'Top Rated', href: '/peripherals/best-sellers' },
        { label: 'New Arrivals', tag: 'Fresh Drop', href: '/peripherals/new' },
        { label: 'Gaming Accessories Deals', tag: 'Save 30%', href: '/peripherals/deals' },
      ],
    },
  ],
  spotlight: {
    title: 'Cradle MagPulse 75',
    specs: 'Magnetic Hall-Effect • Rapid Trigger 0.1mm • 8,000Hz Polling',
    price: '$189',
    badge: 'Pro Tier',
    href: '/peripherals/magpulse-75',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',
  },
};

const NEWS_CATEGORIES = [
  { label: 'Gaming Hardware News', desc: 'Latest bench results, architecture updates & industry reports', href: '/news/hardware' },
  { label: 'New Product Launches', desc: 'Next-gen GPUs, processors, chassis releases', href: '/news/launches' },
  { label: 'GPU and CPU Announcements', desc: 'Deep dive into NVIDIA Blackwell, Intel Arrow Lake, AMD Zen 5', href: '/news/chips' },
  { label: 'Gaming PC Builds', desc: 'Custom watercooling worklogs and aesthetics showcases', href: '/news/builds' },
  { label: 'Product Reviews', desc: 'Rigorous 200+ hour real-world testing and benchmarks', href: '/news/reviews' },
  { label: 'Guides and Tutorials', desc: 'Overclocking, BIOS tuning, thermal management', href: '/news/guides' },
  { label: 'Industry Updates', desc: 'Supply chains, esport tournaments, and tech events', href: '/news/industry' },
];

/* Sample search suggestions */
const POPULAR_SEARCHES = [
  'RTX 5090 Prebuilt',
  'Magnetic Hall-Effect Keyboard',
  'Ryzen 7 7800X3D',
  'ASUS ROG OLED 240Hz',
  '360mm AIO Liquid Cooler',
  'Corsair SF750 Platinum',
  '4K Gaming PCs Under $2,500',
  'DDR5 6000MHz CL30',
];

const SEARCH_RESULTS_MOCK = [
  {
    id: 1,
    name: 'Cradle Apex Titan Desktop (RTX 5090)',
    category: 'Gaming PCs',
    specs: 'Core i9-14900KS • 64GB DDR5 • 4TB NVMe',
    price: '$3,899',
    inStock: true,
  },
  {
    id: 2,
    name: 'NVIDIA GeForce RTX 5080 Founders Edition',
    category: 'Graphics Cards',
    specs: '16GB GDDR7 • Blackwell Architecture • DLSS 4',
    price: '$999',
    inStock: true,
  },
  {
    id: 3,
    name: 'Cradle MagPulse 75 Mechanical Keyboard',
    category: 'Keyboards',
    specs: 'Rapid Trigger • 8,000Hz Polling Rate • CNC Aluminum',
    price: '$189',
    inStock: true,
  },
  {
    id: 4,
    name: 'AMD Ryzen 7 7800X3D Desktop Processor',
    category: 'Processors',
    specs: '8 Cores / 16 Threads • 104MB Cache • 5.0 GHz',
    price: '$399',
    inStock: false,
  },
  {
    id: 5,
    name: 'Cradle HyperGlide Ultralight 8K Mouse',
    category: 'Gaming Mice',
    specs: '42 Grams • PAW3395 Sensor • Optical Switches',
    price: '$89',
    inStock: true,
  },
];

/* Initial mock cart */
const INITIAL_CART = [
  {
    id: 101,
    name: 'Cradle Apex Horizon Gaming PC',
    specs: 'Ryzen 7 7800X3D • RTX 4080 Super • 32GB RAM',
    price: 2499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 102,
    name: 'Cradle MagPulse 75 Keyboard',
    specs: 'Hall-Effect Magnetic Switches • Stealth Black',
    price: 189,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=150&q=80',
  },
];

/* =========================================================================
   MEGA MENU COMPONENTS
   ========================================================================= */

function GamingPCsMegaMenu({ onClose }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-[#111111]">
      <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {GAMING_PCS_DATA.columns.map((col, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#111111] pb-1 border-b border-neutral-100">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="group flex flex-col text-[13px] text-neutral-600 hover:text-black transition-colors"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-150 inline-flex items-center gap-1.5">
                      {link.label}
                    </span>
                    {link.tag && (
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {link.tag}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Featured PC Rig Showcase */}
      <div className="lg:col-span-4 border-l border-neutral-100 pl-0 lg:pl-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-black text-white">
              {GAMING_PCS_DATA.featuredProduct.badge}
            </span>
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              Hand-Built & Calibrated
            </span>
          </div>

          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-neutral-100 mb-4 border border-neutral-200">
            <img
              src={GAMING_PCS_DATA.featuredProduct.image}
              alt={GAMING_PCS_DATA.featuredProduct.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-semibold">Ready for 4K 144FPS Ultra</span>
            </div>
          </div>

          <h5 className="text-[15px] font-bold text-[#111111] mb-1">
            {GAMING_PCS_DATA.featuredProduct.title}
          </h5>
          <p className="text-[12px] text-neutral-500 leading-snug mb-3">
            {GAMING_PCS_DATA.featuredProduct.specs}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-neutral-400 block uppercase tracking-wider">Starting at</span>
            <span className="text-lg font-bold text-[#111111]">{GAMING_PCS_DATA.featuredProduct.price}</span>
          </div>
          <Link
            to={GAMING_PCS_DATA.featuredProduct.href}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[12px] font-semibold hover:bg-neutral-800 transition-colors"
          >
            Configure
            <ArrowRight size={13} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ComponentsMegaMenu({ onClose }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-[#111111]">
      <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
        {COMPONENTS_DATA.columns.map((col, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#111111] pb-1 border-b border-neutral-100">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="text-[13px] text-neutral-600 hover:text-black hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Components Spotlight & Configurator */}
      <div className="lg:col-span-4 border-l border-neutral-100 pl-0 lg:pl-8 flex flex-col justify-between">
        <div className="p-6 bg-neutral-50 border border-neutral-200/80 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">
            <Sliders size={14} strokeWidth={2} className="text-black" />
            Interactive Tool
          </div>
          <h5 className="text-base font-bold text-[#111111] mb-2">
            {COMPONENTS_DATA.spotlight.title}
          </h5>
          <p className="text-[12px] text-neutral-600 leading-relaxed mb-5">
            {COMPONENTS_DATA.spotlight.description}
          </p>
          <Link
            to={COMPONENTS_DATA.spotlight.href}
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-black text-white text-[12px] font-semibold hover:bg-neutral-800 transition-colors"
          >
            {COMPONENTS_DATA.spotlight.cta}
            <ArrowRight size={13} strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck size={14} className="text-emerald-600" />
            Official Warranty & Authorized Partner
          </span>
          <Link to="/components" onClick={onClose} className="font-semibold text-black hover:underline">
            All Parts &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

function PeripheralsMegaMenu({ onClose }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-[#111111]">
      <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {PERIPHERALS_DATA.columns.map((col, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#111111] pb-1 border-b border-neutral-100">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="group block text-[13px] text-neutral-600 hover:text-black transition-colors"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-150 inline-block">
                      {link.label}
                    </span>
                    {link.tag && (
                      <span className="block text-[10px] text-neutral-400 font-medium">
                        {link.tag}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Featured Gear Card */}
      <div className="lg:col-span-3 border-l border-neutral-100 pl-0 lg:pl-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-black text-white">
              {PERIPHERALS_DATA.spotlight.badge}
            </span>
            <span className="text-[11px] font-semibold text-neutral-400">Featured Gear</span>
          </div>

          <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-100 mb-3 border border-neutral-200">
            <img
              src={PERIPHERALS_DATA.spotlight.image}
              alt={PERIPHERALS_DATA.spotlight.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h5 className="text-[14px] font-bold text-[#111111] mb-1">
            {PERIPHERALS_DATA.spotlight.title}
          </h5>
          <p className="text-[11px] text-neutral-500 leading-snug mb-3">
            {PERIPHERALS_DATA.spotlight.specs}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-base font-bold text-[#111111]">{PERIPHERALS_DATA.spotlight.price}</span>
          <Link
            to={PERIPHERALS_DATA.spotlight.href}
            onClick={onClose}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-[11px] font-semibold hover:bg-neutral-800 transition-colors"
          >
            Shop Now
            <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function NewsMegaMenu({ onClose }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 text-[#111111]">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-100">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Cradle Editorial & Insights</h4>
          <p className="text-xs text-neutral-500">Hardware reviews, architecture benchmarks, and gaming guides.</p>
        </div>
        <Link
          to="/news"
          onClick={onClose}
          className="text-xs font-semibold text-black hover:underline inline-flex items-center gap-1"
        >
          View All Stories <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NEWS_CATEGORIES.map((item, idx) => (
          <Link
            key={idx}
            to={item.href}
            onClick={onClose}
            className="p-4 border border-neutral-100 rounded-lg hover:border-black transition-all bg-neutral-50/50 hover:bg-white group"
          >
            <span className="text-[13px] font-bold text-[#111111] group-hover:underline block mb-1">
              {item.label}
            </span>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   SEARCH PANEL OVERLAY
   ========================================================================= */

function SearchPanel({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredResults = query.trim()
    ? SEARCH_RESULTS_MOCK.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.specs.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full bg-white border-b border-[#E5E5E5] shadow-2xl animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3 flex-1 mr-4">
              <Search size={22} strokeWidth={1.75} className="text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gaming PCs, GPUs, keyboards, brands, or specs..."
                className="w-full text-lg md:text-xl font-medium placeholder-neutral-400 focus:outline-none text-[#111111] bg-transparent"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-neutral-400 hover:text-black font-semibold uppercase px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close search"
              className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          {/* If no query, show trending and categories */}
          {!query.trim() && (
            <div className="py-6 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                  Trending Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(item)}
                      className="px-3 py-1.5 text-xs font-medium bg-neutral-100 text-neutral-800 rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-neutral-100">
                <Link
                  to="/gaming-pcs"
                  onClick={onClose}
                  className="p-3 border border-neutral-100 rounded hover:border-black text-left transition-colors"
                >
                  <span className="text-xs font-bold block mb-1">Gaming Desktops</span>
                  <span className="text-[11px] text-neutral-500">24 models ready to ship</span>
                </Link>
                <Link
                  to="/components/gpu"
                  onClick={onClose}
                  className="p-3 border border-neutral-100 rounded hover:border-black text-left transition-colors"
                >
                  <span className="text-xs font-bold block mb-1">GeForce RTX 50 Series</span>
                  <span className="text-[11px] text-neutral-500">Blackwell GPUs</span>
                </Link>
                <Link
                  to="/peripherals/keyboards"
                  onClick={onClose}
                  className="p-3 border border-neutral-100 rounded hover:border-black text-left transition-colors"
                >
                  <span className="text-xs font-bold block mb-1">Hall Effect Keyboards</span>
                  <span className="text-[11px] text-neutral-500">Rapid trigger 0.1mm</span>
                </Link>
                <Link
                  to="/custom-pc-builder"
                  onClick={onClose}
                  className="p-3 border border-neutral-100 rounded hover:border-black text-left transition-colors"
                >
                  <span className="text-xs font-bold block mb-1">Custom PC Builder</span>
                  <span className="text-[11px] text-neutral-500">Live part compatibility</span>
                </Link>
              </div>
            </div>
          )}

          {/* Search results */}
          {query.trim() && (
            <div className="py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold uppercase tracking-wider text-neutral-400">
                  {filteredResults.length} Result{filteredResults.length !== 1 ? 's' : ''} for "{query}"
                </span>
                <span className="text-xs text-neutral-400">Press ESC to dismiss</span>
              </div>

              {filteredResults.length > 0 ? (
                <div className="divide-y divide-neutral-100 max-h-[60vh] overflow-y-auto">
                  {filteredResults.map((item) => (
                    <div
                      key={item.id}
                      className="py-3.5 flex items-center justify-between hover:bg-neutral-50/80 px-2 rounded transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            {item.category}
                          </span>
                          {item.inStock ? (
                            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 text-neutral-500 font-semibold rounded">
                              Backorder
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-[#111111]">{item.name}</h4>
                        <p className="text-xs text-neutral-500">{item.specs}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold block mb-1">{item.price}</span>
                        <Link
                          to={`/product/${item.id}`}
                          onClick={onClose}
                          className="text-xs font-medium text-black underline hover:no-underline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm text-neutral-600 mb-2">No hardware found matching "{query}".</p>
                  <p className="text-xs text-neutral-400">Try searching for generic terms like "RTX", "Keyboard", or "Prebuilt".</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CART DRAWER
   ========================================================================= */

function CartDrawer({ isOpen, onClose, cart, setCart }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.75} />
            <h3 className="text-base font-bold text-[#111111]">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-neutral-500 hover:text-black rounded hover:bg-neutral-100 transition-colors"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
              <Truck size={14} />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-700 font-bold">You unlocked Free Express Shipping!</span>
              ) : (
                <span>
                  Add <strong className="text-black">${freeShippingThreshold - subtotal}</strong> for Free Express Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-neutral-500 font-semibold">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-black h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag size={48} strokeWidth={1.25} className="text-neutral-300 mb-4" />
              <h4 className="text-base font-bold text-[#111111] mb-1">Your bag is empty</h4>
              <p className="text-xs text-neutral-500 mb-6 max-w-xs">
                Explore our high-performance gaming rigs, individual components, and peripherals.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <div className="w-16 h-16 rounded bg-neutral-100 border border-neutral-200 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h5 className="text-xs font-bold text-[#111111] truncate pr-2">{item.name}</h5>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 mb-2 truncate">{item.specs}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-neutral-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="px-2 py-0.5 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="px-2 py-0.5 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-xs font-bold text-[#111111]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E5E5E5] bg-white space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-semibold text-black">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>{subtotal >= freeShippingThreshold ? 'FREE' : '$19.99'}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => alert('Proceeding to secure checkout...')}
              className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              Checkout Now
              <ArrowRight size={14} />
            </button>

            <p className="text-[10px] text-center text-neutral-400">
              30-day money-back guarantee • 3-year hardware warranty included
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   ACCOUNT DROPDOWN
   ========================================================================= */

function AccountDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E5E5E5] shadow-xl rounded-md py-2 z-50 animate-in fade-in duration-150"
    >
      <div className="px-4 py-3 border-b border-neutral-100">
        <p className="text-xs font-bold text-[#111111]">Welcome to cradle.</p>
        <p className="text-[11px] text-neutral-500">Access your rigs, orders & hardware specs</p>
      </div>

      <div className="py-1">
        <Link
          to="/login"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
        >
          <span>Sign In / Register</span>
          <ArrowRight size={12} className="text-neutral-400" />
        </Link>
        <Link
          to="/orders"
          onClick={onClose}
          className="block px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
        >
          Orders & Tracking
        </Link>
        <Link
          to="/wishlist"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
        >
          <span>Saved PC Builds</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600 font-bold">3</span>
        </Link>
        <Link
          to="/support"
          onClick={onClose}
          className="block px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
        >
          24/7 Priority Support & RMA
        </Link>
      </div>

      <div className="pt-2 border-t border-neutral-100 px-4 pb-1">
        <Link
          to="/login"
          onClick={onClose}
          className="w-full block text-center py-2 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

/* =========================================================================
   LANGUAGE SELECTOR DROPDOWN
   ========================================================================= */

function LanguageSelector({ currentLang, setLanguage, isOpen, setIsOpen }) {
  const languages = [
    { code: 'EN', name: 'English (EN)' },
    { code: 'HI', name: 'Hindi (HI) — हिंदी' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Language selector. Current language is ${currentLang}`}
        className="flex items-center gap-1 text-[13px] font-semibold text-[#111111] hover:text-neutral-500 transition-colors py-2 px-1 focus:outline-none"
      >
        <span>{currentLang}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E5E5] shadow-xl rounded-md py-1.5 z-50 animate-in fade-in duration-150"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-neutral-50 flex items-center justify-between text-[#111111] transition-colors"
            >
              <span>{lang.name}</span>
              {currentLang === lang.code && <Check size={14} className="text-black" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   MOBILE MENU DRAWER
   ========================================================================= */

function MobileMenuDrawer({
  isOpen,
  onClose,
  currentLang,
  setLanguage,
  openSearch,
  openCart,
}) {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!isOpen) return null;

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity flex"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between">
          <Link to="/" onClick={onClose} className="text-2xl font-black tracking-tight text-[#111111]">
            cradle.
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 text-neutral-500 hover:text-black rounded hover:bg-neutral-100 transition-colors"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* Mobile Search Button */}
        <div className="p-4 border-b border-neutral-100">
          <button
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 bg-neutral-100 rounded text-xs text-neutral-500 font-medium hover:bg-neutral-200 transition-colors text-left"
          >
            <Search size={16} strokeWidth={1.75} />
            <span>Search hardware, PCs & gear...</span>
          </button>
        </div>

        {/* Accordion Navigation */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {/* 1. Gaming PCs */}
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('gaming-pcs')}
              className="w-full py-2.5 flex items-center justify-between text-left text-sm font-bold text-[#111111]"
            >
              <span>Gaming PCs</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  expandedSection === 'gaming-pcs' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === 'gaming-pcs' && (
              <div className="pl-3 py-2 space-y-4 text-xs text-neutral-600">
                {GAMING_PCS_DATA.columns.map((col, i) => (
                  <div key={i} className="space-y-1.5">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-black block">
                      {col.title}
                    </span>
                    <ul className="space-y-1 pl-1">
                      {col.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            to={link.href}
                            onClick={onClose}
                            className="block py-1 hover:text-black"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Components */}
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('components')}
              className="w-full py-2.5 flex items-center justify-between text-left text-sm font-bold text-[#111111]"
            >
              <span>Components</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  expandedSection === 'components' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === 'components' && (
              <div className="pl-3 py-2 space-y-4 text-xs text-neutral-600">
                {COMPONENTS_DATA.columns.map((col, i) => (
                  <div key={i} className="space-y-1.5">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-black block">
                      {col.title}
                    </span>
                    <ul className="space-y-1 pl-1">
                      {col.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            to={link.href}
                            onClick={onClose}
                            className="block py-1 hover:text-black"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Peripherals */}
          <div className="border-b border-neutral-100 pb-2">
            <button
              onClick={() => toggleSection('peripherals')}
              className="w-full py-2.5 flex items-center justify-between text-left text-sm font-bold text-[#111111]"
            >
              <span>Peripherals</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  expandedSection === 'peripherals' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSection === 'peripherals' && (
              <div className="pl-3 py-2 space-y-4 text-xs text-neutral-600">
                {PERIPHERALS_DATA.columns.map((col, i) => (
                  <div key={i} className="space-y-1.5">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-black block">
                      {col.title}
                    </span>
                    <ul className="space-y-1 pl-1">
                      {col.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            to={link.href}
                            onClick={onClose}
                            className="block py-1 hover:text-black"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. News */}
          <div className="border-b border-neutral-100 pb-2">
            <Link
              to="/news"
              onClick={onClose}
              className="w-full py-2.5 flex items-center justify-between text-left text-sm font-bold text-[#111111] hover:text-neutral-600"
            >
              <span>News</span>
              <ArrowRight size={14} className="text-neutral-400" />
            </Link>
          </div>
        </div>

        {/* Drawer Footer with Language & Account */}
        <div className="p-6 border-t border-[#E5E5E5] bg-neutral-50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Language</span>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  currentLang === 'EN' ? 'bg-black text-white' : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('HI')}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  currentLang === 'HI' ? 'bg-black text-white' : 'bg-white text-neutral-700 border border-neutral-300'
                }`}
              >
                HI (हिंदी)
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={onClose}
              className="w-full py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider text-center rounded hover:bg-neutral-800 transition-colors"
            >
              Sign In / Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN HEADER COMPONENT
   ========================================================================= */

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'gaming-pcs' | 'components' | 'peripherals' | 'news' | null
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [cart, setCart] = useState(INITIAL_CART);

  const navContainerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Close menus when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsAccountOpen(false);
        setIsLangOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle dropdown mouse enter with smooth debounce bridge
  const handleMouseEnter = (key) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full bg-white border-b border-[#E5E5E5] select-none"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1720px] mx-auto h-[74px] sm:h-[78px] md:h-[80px] px-6 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* =========================================================================
              LEFT SECTION — BRAND LOGO
             ========================================================================= */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="lg:hidden p-1.5 -ml-1 text-[#111111] hover:text-neutral-600 focus:outline-none"
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>

            <Link
              to="/"
              className="text-[25px] sm:text-[27px] font-black tracking-[-0.04em] text-[#111111] hover:opacity-85 transition-opacity inline-flex items-baseline"
              aria-label="cradle. home"
            >
              <span>cradle</span>
              <span className="text-[#111111]">.</span>
            </Link>
          </div>

          {/* =========================================================================
              CENTER SECTION — MAIN NAVIGATION
             ========================================================================= */}
          <nav
            ref={navContainerRef}
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-9 h-full"
            onMouseLeave={handleMouseLeave}
          >
            {/* 1. Gaming PCs */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => handleMouseEnter('gaming-pcs')}
            >
              <button
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'gaming-pcs' ? null : 'gaming-pcs'))
                }
                aria-expanded={activeDropdown === 'gaming-pcs'}
                aria-haspopup="true"
                className={`group inline-flex items-center gap-1.5 text-[14px] font-medium tracking-normal transition-colors py-2 focus:outline-none ${
                  activeDropdown === 'gaming-pcs' ? 'text-black' : 'text-[#111111] hover:text-neutral-500'
                }`}
              >
                <span>Gaming PCs</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`text-[#111111] transition-transform duration-200 ${
                    activeDropdown === 'gaming-pcs' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* 2. Components */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => handleMouseEnter('components')}
            >
              <button
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'components' ? null : 'components'))
                }
                aria-expanded={activeDropdown === 'components'}
                aria-haspopup="true"
                className={`group inline-flex items-center gap-1.5 text-[14px] font-medium tracking-normal transition-colors py-2 focus:outline-none ${
                  activeDropdown === 'components' ? 'text-black' : 'text-[#111111] hover:text-neutral-500'
                }`}
              >
                <span>Components</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`text-[#111111] transition-transform duration-200 ${
                    activeDropdown === 'components' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* 3. Peripherals */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => handleMouseEnter('peripherals')}
            >
              <button
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'peripherals' ? null : 'peripherals'))
                }
                aria-expanded={activeDropdown === 'peripherals'}
                aria-haspopup="true"
                className={`group inline-flex items-center gap-1.5 text-[14px] font-medium tracking-normal transition-colors py-2 focus:outline-none ${
                  activeDropdown === 'peripherals' ? 'text-black' : 'text-[#111111] hover:text-neutral-500'
                }`}
              >
                <span>Peripherals</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`text-[#111111] transition-transform duration-200 ${
                    activeDropdown === 'peripherals' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* 4. News (NO CHEVRON as explicitly specified) */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => handleMouseEnter('news')}
            >
              <Link
                to="/news"
                className={`inline-flex items-center text-[14px] font-medium tracking-normal transition-colors py-2 focus:outline-none ${
                  activeDropdown === 'news' ? 'text-black' : 'text-[#111111] hover:text-neutral-500'
                }`}
              >
                <span>News</span>
              </Link>
            </div>
          </nav>

          {/* =========================================================================
              RIGHT SECTION — UTILITY ICONS & LANGUAGE
             ========================================================================= */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search interface"
              title="Search hardware & PCs"
              className="p-1 text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none"
            >
              <Search size={20} strokeWidth={1.6} />
            </button>

            {/* Shopping Bag / Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping Cart with ${totalCartCount} items`}
              title="Shopping Cart"
              className="relative p-1 text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none"
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User / Account Icon */}
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen((prev) => !prev)}
                aria-label="Account and settings"
                aria-expanded={isAccountOpen}
                aria-haspopup="true"
                title="Account"
                className="p-1 text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none flex items-center"
              >
                <User size={20} strokeWidth={1.6} />
              </button>
              <AccountDropdown
                isOpen={isAccountOpen}
                onClose={() => setIsAccountOpen(false)}
              />
            </div>

            {/* Vertical Separator */}
            <div
              className="hidden sm:block h-4 w-[1px] bg-neutral-300 mx-0.5"
              aria-hidden="true"
            />

            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector
                currentLang={currentLang}
                setLanguage={setCurrentLang}
                isOpen={isLangOpen}
                setIsOpen={setIsLangOpen}
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP MEGA MENU DROPDOWN PANEL
           ========================================================================= */}
        {activeDropdown && (
          <div
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-b border-[#E5E5E5] shadow-xl shadow-black/[0.04] animate-in fade-in slide-in-from-top-1 duration-150 z-30"
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            {activeDropdown === 'gaming-pcs' && (
              <GamingPCsMegaMenu onClose={() => setActiveDropdown(null)} />
            )}
            {activeDropdown === 'components' && (
              <ComponentsMegaMenu onClose={() => setActiveDropdown(null)} />
            )}
            {activeDropdown === 'peripherals' && (
              <PeripheralsMegaMenu onClose={() => setActiveDropdown(null)} />
            )}
            {activeDropdown === 'news' && (
              <NewsMegaMenu onClose={() => setActiveDropdown(null)} />
            )}
          </div>
        )}
      </header>

      {/* =========================================================================
          INTERACTIVE PANELS: SEARCH, CART, MOBILE DRAWER
         ========================================================================= */}
      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
      />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLang={currentLang}
        setLanguage={setCurrentLang}
        openSearch={() => setIsSearchOpen(true)}
        openCart={() => setIsCartOpen(true)}
      />
    </>
  );
}

// Named export for flexibility
export { Header };
