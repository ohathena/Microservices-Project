import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Heart,
  Share2,
  Maximize2,
  ShoppingBag,
  Award,
  CheckCircle2
} from 'lucide-react';

/* =========================================================================
   DUMMY PRODUCT DATASET — CANVAS 32Q CURVED GAMING MONITOR
   (Ready to be connected to the backend product API in future phases)
   ========================================================================= */

export const DUMMY_PRODUCT = {
  id: 'prod-canvas-32q',
  name: 'cradle. Canvas 32Q Curved Gaming Monitor',
  subtitle: 'Ultra-Fast 240Hz Fast-IPS Quantum Dot Display with Immersive 1500R Arc',
  price: 549.99,
  originalPrice: 649.99,
  currency: 'US$',
  discountPercentage: 15,
  inStock: true,
  stockCount: 18,
  rating: 4.9,
  reviewCount: 348,
  recommendationRate: 98,
  color: 'Matte Black',

  /* Specific Tags Requested by User */
  tags: {
    category: 'Monitor',
    refreshRate: '240Hz',
    displayType: 'Fast IPS Quantum Dot',
    displaySize: '31.5" (32-Inch Class)',
    brightness: '1,000 Nits (Peak HDR 1000)',
    curvature: '1500R Curved',
    resolution: '2560 x 1440 (QHD)',
    responseTime: '0.5ms GtG',
    colorGamut: '99% sRGB / 95% DCI-P3',
  },

  /* Highlight pill tags for clean, quick scanning */
  highlightPills: [
    'Monitor',
    '240Hz Refresh Rate',
    'Fast IPS Quantum Dot',
    '31.5" QHD (2560x1440)',
    '1,000 Nits HDR',
    '1500R Curved',
    '0.5ms GtG',
  ],

  /* Gallery Images (High-Resolution Studio Shots) */
  images: [
    {
      url: '/images/product_monitor.jpg',
      alt: 'cradle. Canvas 32Q Curved Gaming Monitor - Rear Perspective with Ambient Glow',
      label: 'Angle & Backlight',
    },
    {
      url: '/images/product_monitor_front.jpg',
      alt: 'cradle. Canvas 32Q Curved Gaming Monitor - Front View with Vibrant HDR Display',
      label: 'Front View (1500R Arc)',
    },
    {
      url: '/images/product_monitor_arm.jpg',
      alt: 'cradle. Canvas 32Q mounted on cradle Dual Monitor Arm',
      label: 'Arm Setup',
    },
    {
      url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
      alt: 'cradle. Canvas 32Q in a minimal battlestation studio environment',
      label: 'Desk Setup',
    },
  ],

  /* 5 to 6 Detailed Paragraphs Describing the Product (Requested by User) */
  descriptionParagraphs: [
    'Engineered from the ground up for elite competitive gaming and uncompromising creative workflows, the cradle. Canvas 32Q Curved Gaming Monitor merges raw technical power with architectural design refinement. The deep 1500R curvature mirrors the natural anatomical contour of human peripheral vision, enveloping your entire sightline in fluid, panoramic visual splendor. By bringing the outer edges of the expansive 31.5-inch panel closer to your eyes, the Canvas 32Q drastically reduces strain and refocusing fatigue across grueling marathon battles.',
    'At the heart of the Canvas 32Q is a cutting-edge Fast-IPS panel imbued with Quantum Dot nanoparticle illumination. This proprietary matrix delivers astonishing color accuracy spanning 99% sRGB and 95% cinematic DCI-P3 color spaces. Every digital landscape, twilight cyberpunk skyline, and photorealistic texture explodes with true-to-life vibrancy. Backed by certified VESA DisplayHDR 1000 and 1,000 nits of peak illumination, you will experience ink-black shadow details side-by-side with blinding solar highlights without bloom or clipping.',
    'Speed is non-negotiable in modern esports, and the Canvas 32Q was crafted to deliver unmatched competitive superiority. With a blistering 240Hz native refresh rate and an astonishing 0.5ms Gray-to-Gray response time, motion blur, smearing, and pixel ghosting are thoroughly extinguished. Hardware-level synchronization with NVIDIA G-SYNC and AMD FreeSync Premium Pro guarantees tear-free, butter-smooth frame pacing even when graphics cards push intense variable frame rates in chaotic firefights.',
    'Transform your entire desktop workflow with next-generation single-cable connectivity. The integrated USB-C powerhouse port delivers up to 90W of high-speed Power Delivery, allowing you to charge high-performance laptops and mobile workstations while simultaneously streaming 1440p video at 240Hz and transferring peripheral USB 3.2 data. Accompanied by dual uncompressed HDMI 2.1 ports and a DisplayPort 1.4 connection, transitioning between your custom cradle gaming rig, PlayStation 5, and work MacBook happens instantaneously.',
    'The physical execution of the Canvas 32Q reflects the distinctive minimalist aesthetic of the cradle hardware universe. Supported by an aerospace-grade CNC-milled aluminum stand, the display provides effortless silky-smooth height adjustments up to 120mm, -5° to +20° of ergonomic tilt, and bi-directional swivel. A concealed magnetic rear trunk neatly conceals all power cables and display connectors, ensuring a clean, distraction-free battlestation that looks sublime from every conceivable angle in the room.',
    'Every single Canvas 32Q undergoes rigorous 48-hour color stability burn-in and optical sensor calibration at our manufacturing facility before receiving its individual certificate of inspection. We stand unconditionally behind our engineering standards with the industry-leading cradle 3-Year Zero-Bright-Dot Guarantee: if even a single stuck or bright subpixel appears within three years, we replace your panel with zero hassle and free expedited shipping.',
  ],

  /* Key Specs Table for Spec Grid */
  technicalSpecs: [
    { label: 'Screen Size', value: '31.5 Inches (Diagonal)' },
    { label: 'Curvature', value: '1500R Deep Curve' },
    { label: 'Panel Type', value: 'Fast IPS with Quantum Dot Backlight' },
    { label: 'Native Resolution', value: '2560 x 1440 (QHD / 2K)' },
    { label: 'Refresh Rate', value: '240Hz Native' },
    { label: 'Response Time', value: '0.5ms (GtG with Overdrive)' },
    { label: 'Peak Brightness', value: '1,000 Nits (HDR Peak) / 450 Nits (SDR Typ)' },
    { label: 'HDR Certification', value: 'VESA DisplayHDR 1000 Certified' },
    { label: 'Color Gamut', value: '99% sRGB, 95% DCI-P3, Delta E < 2' },
    { label: 'Viewing Angles', value: '178° Horizontal / 178° Vertical' },
    { label: 'Variable Sync', value: 'NVIDIA G-SYNC Compatible, AMD FreeSync Premium Pro' },
    { label: 'I/O Ports', value: '1x USB-C (90W PD, DP Alt), 2x HDMI 2.1, 1x DP 1.4, 2x USB-A 3.2' },
    { label: 'VESA Compatibility', value: '100 x 100 mm Standard' },
    { label: 'Ergonomic Range', value: '120mm Height, -5° to +20° Tilt, ±25° Swivel' },
    { label: 'Dimensions (w/ Stand)', value: '712.5 x 528.2 x 255.4 mm' },
    { label: 'Weight', value: '7.8 kg (with stand) / 5.2 kg (panel only)' },
  ],

  /* Box Contents */
  boxContents: [
    'cradle. Canvas 32Q Curved Gaming Monitor Panel',
    'Solid Aluminum Ergonomic Stand & Base',
    'DisplayPort 1.4 Braided Cable (1.8m)',
    'HDMI 2.1 Ultra High Speed Cable (1.8m)',
    'USB-C to USB-C 100W PD Video/Data Cable (1.5m)',
    'External Power Supply & Heavy Duty AC Cable',
    'Factory Color Calibration Certificate (Delta E < 2)',
    'Quick Setup Guide & 3-Year Warranty Documentation',
  ],

  /* Verified Reviews Sample */
  reviews: [
    {
      id: 1,
      author: 'David L. - Esports Competitor',
      rating: 5,
      date: '2 weeks ago',
      title: 'The fastest curved display I have ever tested.',
      comment:
        'Coming from an older 144Hz monitor, the leap to 240Hz Fast-IPS is sensational. The 1500R curve wraps around your vision without warping reticles or crosshairs in CS2 and Apex. Zero ghosting and the black equalizer makes spotting enemies in dark corners effortless.',
      verified: true,
    },
    {
      id: 2,
      author: 'Marcus K. - Creative Director',
      rating: 5,
      date: '1 month ago',
      title: 'Astonishing color accuracy + single-cable USB-C dream.',
      comment:
        'I do color grading for game trailers during the day and play sim racing at night. The Quantum Dot panel hits 95% DCI-P3 out of the box. Plugging my MacBook Pro into the 90W USB-C port charges it while driving 240Hz. Best monitor purchase of the decade.',
      verified: true,
    },
    {
      id: 3,
      author: 'Sarah V. - Hardware Enthusiast',
      rating: 5,
      date: '1 month ago',
      title: 'Minimalist industrial design, premium build.',
      comment:
        'The metal stand is rock solid with zero wobble, and the concealed cable channel is genius. It completely matches my cradle Q9 case. Highly recommended!',
      verified: true,
    },
  ],
};

/* =========================================================================
   COMPONENTS: PRODUCT GALLERY WITH THUMBNAILS & CLEAN HOVER TO ZOOM
   ========================================================================= */

function ProductGallery({ images, activeIndex, setActiveIndex }) {
  const activeImage = images[activeIndex] || images[0];
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Large Display Viewport */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#F6F6F4] rounded-2xl md:rounded-3xl border border-neutral-200/60 overflow-hidden flex items-center justify-center cursor-crosshair group shadow-sm"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Subtle Zoom Hint */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-600 border border-neutral-200 rounded-full text-xs font-semibold shadow-sm pointer-events-none transition-opacity duration-200 opacity-70 group-hover:opacity-100">
          <Maximize2 size={13} />
          <span>Hover to zoom</span>
        </div>

        {/* Product Image with Smooth Pan on Hover */}
        <div className="w-full h-full p-6 sm:p-10 flex items-center justify-center overflow-hidden">
          <img
            src={activeImage.url}
            alt={activeImage.alt}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: 'scale(1.75)',
                  }
                : {
                    transform: 'scale(1)',
                  }
            }
            className="w-full h-full object-contain drop-shadow-md transition-transform duration-200 ease-out select-none"
          />
        </div>
      </div>

      {/* Thumbnail Selector Strip */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] bg-[#F6F6F4] rounded-xl border p-2 flex flex-col items-center justify-center transition-all duration-200 overflow-hidden focus:outline-none ${
                isActive
                  ? 'border-black ring-1 ring-black shadow-sm'
                  : 'border-neutral-200/70 hover:border-neutral-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-contain transition-transform duration-200"
              />
              <span className="sr-only">{img.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTS: DESCRIPTION & SPECIFICATION TABS (5-6 PARAGRAPHS)
   ========================================================================= */

function ProductInformationTabs({ product }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews' | 'box'

  return (
    <div className="w-full mt-16 md:mt-24">
      {/* Modern Clean Pill Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-4 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-black text-white shadow-sm'
              : 'bg-[#F6F6F4] text-neutral-600 hover:text-black hover:bg-neutral-200'
          }`}
        >
          Product Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all shrink-0 ${
            activeTab === 'specs'
              ? 'bg-black text-white shadow-sm'
              : 'bg-[#F6F6F4] text-neutral-600 hover:text-black hover:bg-neutral-200'
          }`}
        >
          Technical Specifications
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all shrink-0 ${
            activeTab === 'reviews'
              ? 'bg-black text-white shadow-sm'
              : 'bg-[#F6F6F4] text-neutral-600 hover:text-black hover:bg-neutral-200'
          }`}
        >
          Verified Reviews ({product.reviewCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('box')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all shrink-0 ${
            activeTab === 'box'
              ? 'bg-black text-white shadow-sm'
              : 'bg-[#F6F6F4] text-neutral-600 hover:text-black hover:bg-neutral-200'
          }`}
        >
          In the Box & Warranty
        </button>
      </div>

      {/* Tab Panels */}
      <div className="py-8 sm:py-12">
        {/* TAB 1: OVERVIEW & 5-6 PARAGRAPHS */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Header intro */}
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] mb-3">
                Engineered for Complete Visual Supremacy
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Explore the technical innovation behind the Canvas 32Q Curved Gaming Monitor,
                crafted for demanding competitive players and creators alike.
              </p>
            </div>

            {/* 5-6 Detailed Product Paragraphs in Clean Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {product.descriptionParagraphs.map((paragraph, index) => {
                const paragraphTitles = [
                  '1. Immersive 1500R Curved Panoramic Vision',
                  '2. Fast-IPS Quantum Dot Matrix & HDR 1000',
                  '3. Blistering 240Hz Speed & 0.5ms Response Time',
                  '4. Unified 90W USB-C Docking & High-Speed I/O',
                  '5. Architectural Stand & Concealed Cable Trunk',
                  '6. Zero-Bright-Dot Guarantee & Factory Calibration',
                ];

                return (
                  <div
                    key={index}
                    className="bg-[#F6F6F4] p-7 rounded-2xl border border-neutral-200/50 hover:border-neutral-300 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#111111] tracking-tight mb-2">
                        {paragraphTitles[index] || `Section ${index + 1}`}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        {paragraph}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature Highlights Grid */}
            <div className="w-full bg-[#111111] text-white p-8 sm:p-10 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                  Field of View
                </span>
                <h4 className="text-2xl font-black tracking-tight">1500R Arc</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Wraparound curvature mirrors peripheral vision to reduce eye strain and deepen immersion.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                  Color Precision
                </span>
                <h4 className="text-2xl font-black tracking-tight">95% DCI-P3</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Quantum Dot nanoparticles provide cinema-grade color accuracy out of the box.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                  Esports Latency
                </span>
                <h4 className="text-2xl font-black tracking-tight">240Hz / 0.5ms</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Ultra-fast frame transitions and low input lag give you the split-second edge in competitive play.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TECHNICAL SPECIFICATIONS GRID */}
        {activeTab === 'specs' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-200">
              {product.technicalSpecs.map((spec, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 text-xs sm:text-sm ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#F6F6F4]'
                  }`}
                >
                  <span className="font-bold text-neutral-800">{spec.label}</span>
                  <span className="sm:col-span-2 text-neutral-600 sm:font-medium mt-1 sm:mt-0">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VERIFIED REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Reviews Score Card */}
            <div className="bg-[#F6F6F4] p-6 sm:p-8 rounded-2xl border border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#111111]">
                    {product.rating}
                  </span>
                  <div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" stroke="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-neutral-500">
                      Based on {product.reviewCount} customer reviews
                    </span>
                  </div>
                </div>
                <p className="text-xs font-bold text-emerald-700 mt-2">
                  ✓ {product.recommendationRate}% of customers recommend this monitor
                </p>
              </div>
            </div>

            {/* Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-2xl border border-neutral-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" stroke="currentColor" />
                        ))}
                      </div>
                      <span className="text-[11px] text-neutral-400">{rev.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#111111] mb-2">{rev.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-800">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Check size={12} strokeWidth={3} />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WHAT IS IN THE BOX */}
        {activeTab === 'box' && (
          <div className="bg-[#F6F6F4] p-8 sm:p-10 rounded-2xl border border-neutral-200 animate-in fade-in duration-300">
            <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-2">
              Everything you need for peak performance out of the box.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6 max-w-2xl">
              Includes high-bandwidth cables certified to guarantee 240Hz 1440p HDR throughput.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {product.boxContents.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-neutral-200/80"
                >
                  <CheckCircle2 size={16} className="text-black shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTS: YOU MAY ALSO LIKE / RELATED ACCESSORIES
   ========================================================================= */

function RelatedAccessories() {
  const accessories = [
    {
      name: 'cradle. Monitor Arm (Dual)',
      price: '$169.99',
      image: '/images/product_monitor_arm.jpg',
      tag: 'VESA 100x100',
    },
    {
      name: 'cradle. Lift Wireless Mouse',
      price: '$39.99',
      image: '/images/product_mouse.jpg',
      tag: '8,000Hz Polling',
    },
    {
      name: 'cradle. Function Mechanical Keyboard',
      price: '$99.99',
      image: '/images/product_keyboard.jpg',
      tag: 'Hot-Swappable',
    },
    {
      name: 'cradle. Relay Gaming Headset',
      price: '$99.99',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80',
      tag: 'Hi-Res Audio',
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 border-t border-neutral-200">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111]">
            Complete Your Battlestation
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Curated accessories designed to integrate with your Canvas 32Q monitor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {accessories.map((item, idx) => (
          <div
            key={idx}
            className="group bg-[#F6F6F4] p-5 sm:p-6 rounded-2xl border border-neutral-200/60 hover:border-black transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                {item.tag}
              </span>
              <h4 className="text-sm font-bold text-[#111111] group-hover:underline">
                {item.name}
              </h4>
            </div>

            <div className="aspect-square flex items-center justify-center p-3 my-4">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-[140px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-[#111111]">{item.price}</span>
              <span className="text-[11px] font-bold text-neutral-500 group-hover:text-black">
                View &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   MAIN PRODUCT PAGE COMPONENT (EXPORTED)
   ========================================================================= */

export function Product() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartAlert, setCartAlert] = useState(false);

  const product = DUMMY_PRODUCT;
  const totalPrice = (product.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    setCartAlert(true);
    setTimeout(() => {
      setCartAlert(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] antialiased">
      {/* 1. Header */}
      <Header />

      {/* Floating Add to Cart Toast Notification */}
      {cartAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 border border-neutral-800">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check size={16} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold">Added to Shopping Cart</p>
            <p className="text-[11px] text-neutral-400">
              {quantity}x {product.name}
            </p>
          </div>
        </div>
      )}

      {/* 2. Main Product Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 pb-16">
        {/* Breadcrumb Navigation Bar */}
        <nav
          className="flex items-center justify-between text-xs text-neutral-500 mb-6"
          aria-label="Breadcrumb"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-neutral-400 shrink-0" />
            <Link to="/peripherals" className="hover:text-black transition-colors">
              Peripherals
            </Link>
            <ChevronRight size={12} className="text-neutral-400 shrink-0" />
            <Link to="/monitors" className="hover:text-black transition-colors">
              Monitors
            </Link>
            <ChevronRight size={12} className="text-neutral-400 shrink-0" />
            <span className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-none">
              Canvas 32Q Curved
            </span>
          </div>

          {/* Social / Wishlist actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsWishlisted((prev) => !prev)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`p-2 rounded-full border transition-colors ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:text-black hover:border-black'
              }`}
            >
              <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.name,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Product link copied to clipboard!');
                }
              }}
              aria-label="Share product"
              className="p-2 rounded-full border border-neutral-200 text-neutral-600 hover:text-black hover:border-black transition-colors"
            >
              <Share2 size={14} />
            </button>
          </div>
        </nav>

        {/* =========================================================================
            PRODUCT HERO SECTION (GALLERY LEFT, CLEAN UNCLUTTERED PURCHASE ACTIONS RIGHT)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Gallery with Hover to Zoom (7 Cols) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              activeIndex={activeImageIndex}
              setActiveIndex={setActiveImageIndex}
            />
          </div>

          {/* Right Column: Clean, Minimal, Uncluttered Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6 pt-1">
            {/* 1. Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#111111] leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-normal leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* 2. Rating & Stock */}
            <div className="flex items-center gap-2.5 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" stroke="currentColor" />
                ))}
              </div>
              <span className="font-bold text-neutral-900">{product.rating}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500">{product.reviewCount} customer reviews</span>
              <span className="text-neutral-300">•</span>
              <span className="text-emerald-700 font-semibold">In Stock</span>
            </div>

            {/* 3. Clean Price Display (No heavy card box) */}
            <div className="pt-2 pb-1 border-t border-neutral-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#111111]">
                  {product.currency}{totalPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    {product.currency}{(product.originalPrice * quantity).toFixed(2)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded">
                    Save {product.currency}100
                  </span>
                )}
              </div>
            </div>

            {/* 4. Product Tags (Requested: Monitor, Refresh Rate, Display Type, Size, Brightness, Curved/Flat) */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Specifications
              </span>
              <div className="flex flex-wrap gap-2">
                {product.highlightPills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F6F6F4] text-xs font-semibold text-neutral-800 border border-neutral-200/50"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Finish (Single color, no selector) */}
            <div className="text-xs text-neutral-600 pt-1">
              <span className="font-semibold text-neutral-900">Finish:</span> {product.color}
            </div>

            {/* 6. Quantity Selector & Add to Cart (Only Add to Cart button, no Express Buy) */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-neutral-200 rounded-xl bg-white px-2 h-12 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-black">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.min(product.stockCount, prev + 1))}
                    disabled={quantity >= product.stockCount}
                    className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Single Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Cart • {product.currency}{totalPrice}</span>
                </button>
              </div>
            </div>

            {/* 7. Subtle Assurances (Clean, minimalistic footer icons) */}
            <div className="pt-4 border-t border-neutral-100 grid grid-cols-2 gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-black shrink-0" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-black shrink-0" />
                <span>3-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-black shrink-0" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-black shrink-0" />
                <span>Zero Bright Dot</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DETAILED DESCRIPTION SECTION (5-6 PARAGRAPHS) + SPECS TABS
           ========================================================================= */}
        <ProductInformationTabs product={product} />

        {/* =========================================================================
            RELATED ACCESSORIES SECTION
           ========================================================================= */}
        <RelatedAccessories />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}

export default Product;
