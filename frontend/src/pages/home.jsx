import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

/* =========================================================================
   REUSABLE SECTION INTRO COMPONENT
   ========================================================================= */

function SectionIntro({ title, description }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-6">
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[14px] sm:text-[15px] text-neutral-700 max-w-xl leading-relaxed md:text-left">
            {description}
          </p>
        )}
      </div>
      <div className="w-full h-px border-b border-neutral-200" />
    </div>
  );
}

/* =========================================================================
   1. HERO BANNER — Q9 SERIES
   ========================================================================= */

function HeroBanner() {
  return (
    <section className="w-full pt-4 pb-16 md:pb-24">
      <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-b from-[#e3edf7] via-[#ebf4fa] to-[#d8e7f5] border border-blue-100/60 shadow-sm flex flex-col items-center justify-between text-center pt-12 md:pt-16 pb-8 md:pb-12 px-6">
        {/* Soft atmospheric lighting overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent pointer-events-none" />

        {/* Hero Title & Subtitle */}
        <div className="relative z-10 max-w-2xl mx-auto mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111111] mb-3">
            Q9 Series
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium text-neutral-800 tracking-normal">
            Dual-Chamber Mid-Tower Cases
          </p>
        </div>

        {/* Hero Product Image */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <img
            src="/images/q9_hero.jpg"
            alt="cradle. Q9 Series Dual-Chamber Mid-Tower Case"
            className="w-full h-auto object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   2. MEET THE Q9 SERIES (Q9 FLOW & Q9 ELITE CARDS)
   ========================================================================= */

function MeetQ9Series() {
  return (
    <section className="w-full py-12 md:py-20">
      <SectionIntro
        title="Meet the Q9 Series"
        description="The Q9 keeps things clean and simple while supporting powerful builds. Two versions are available, the Q9 Flow and the Q9 Elite."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
        {/* Card A: Q9 Flow */}
        <div className="bg-[#F6F6F4] p-8 sm:p-10 lg:p-12 rounded-xl flex flex-col justify-between border border-neutral-200/50 hover:border-neutral-300 transition-colors">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] mb-3">
              Q9 Flow
            </h3>
            <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed max-w-md">
              The Q9 Flow features a perforated top panel, room for up to 10 fans, and multiple radiator mounting options for increased cooling.
            </p>
          </div>
          <div className="mt-8 pt-4 flex items-center justify-center">
            <img
              src="/images/q9_flow_top.jpg"
              alt="Q9 Flow Top Perforated Mesh Panel"
              className="w-full h-auto object-contain rounded-lg drop-shadow-md"
            />
          </div>
        </div>

        {/* Card B: Q9 Elite */}
        <div className="bg-[#F6F6F4] p-8 sm:p-10 lg:p-12 rounded-xl flex flex-col justify-between border border-neutral-200/50 hover:border-neutral-300 transition-colors">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] mb-3">
              Q9 Elite
            </h3>
            <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed max-w-md">
              The Q9 Elite features a tempered glass top panel with a uniquely clear radiator mounting bracket and a built-in RGB and Fan Controller for enhanced lighting customization.
            </p>
          </div>
          <div className="mt-8 pt-4 flex items-center justify-center">
            <img
              src="/images/q9_elite_top.jpg"
              alt="Q9 Elite Glass Top Panel with RGB Fans"
              className="w-full h-auto object-contain rounded-lg drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   3. SUIT YOUR SPACE (COLOR SHOWCASE)
   ========================================================================= */

function SuitYourSpace() {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="w-full bg-[#F6F6F4] py-14 sm:py-20 px-6 sm:px-10 lg:px-14 rounded-2xl border border-neutral-200/50 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#111111] mb-3">
          Suit Your Space
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto mb-12 sm:mb-16">
          The Q9 Flow and Elite are available in All-White and All-Black
        </p>

        {/* 4 Cases on shared ground plane */}
        <div className="max-w-5xl mx-auto">
          <img
            src="/images/q9_suit_space.jpg"
            alt="cradle. Q9 Series in All-White and All-Black finishes"
            className="w-full h-auto object-contain drop-shadow-sm rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. SIMPLIFIED BUILDING (ASYMMETRICAL FEATURE CARDS)
   ========================================================================= */

function SimplifiedBuilding() {
  return (
    <section className="w-full py-12 md:py-20">
      <SectionIntro
        title="Simplified Building"
        description="The Q9 is easy to build in, with cable routing, a unique SSD hinge, and a dual-chamber design with plenty of space for premium components."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-8 items-stretch">
        {/* Feature A: Dual-Chamber Design (2/3 width) */}
        <div className="lg:col-span-8 bg-[#F6F6F4] p-8 sm:p-10 lg:p-12 rounded-xl flex flex-col justify-between border border-neutral-200/50">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] mb-3">
              Dual-Chamber Design
            </h3>
            <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed max-w-xl mb-8">
              Utilizing a dual-chamber design, the Q9 separates the aesthetically pleasing components from the wires and cables that can clutter up a build while keeping things clean and cool by allowing more airflow options.
            </p>
          </div>
          <div className="flex items-center justify-center pt-2">
            <img
              src="/images/q9_dual_chamber.jpg"
              alt="Rear Chamber with PSU and 4-SSD Hinge Mechanism"
              className="w-full max-h-[520px] object-contain rounded-lg drop-shadow-md"
            />
          </div>
        </div>

        {/* Feature B: Space for Powerful Components (1/3 width) */}
        <div className="lg:col-span-4 bg-[#F6F6F4] p-8 sm:p-10 rounded-xl flex flex-col justify-between border border-neutral-200/50">
          <div className="flex-1 flex items-center justify-center py-4">
            <img
              src="/images/q9_exploded.jpg"
              alt="Exploded view of Q9 chassis showing component clearance"
              className="w-full max-h-[420px] object-contain rounded-lg drop-shadow-md"
            />
          </div>
          <div className="pt-6">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#111111] mb-2">
              Space for Powerful Components
            </h3>
            <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed">
              The Q9 has plenty of space for premium components, numerous radiator mounting options, and the ability to vertically mount a GPU.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. CLEAR RADIATOR BRACKET & 3 FEATURE CARDS
   ========================================================================= */

function ClearRadiatorAndFeatures() {
  return (
    <section className="w-full py-12 md:py-20">
      {/* Clear Radiator Bracket Full-Width Card */}
      <div className="bg-[#F6F6F4] p-8 sm:p-10 lg:p-12 rounded-xl border border-neutral-200/50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        <div className="lg:col-span-5">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#111111] mb-4">
            Clear Radiator Bracket
          </h3>
          <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed">
            The Q9 features a unique clear radiator bracket, offering sight into the interior and showing off the new dual-sided LEDs on the F120 RGB Duo fans in all their glory — getting you the most out of the Elite's glass top panel.
          </p>
        </div>
        <div className="lg:col-span-7 flex items-center justify-center">
          <img
            src="/images/q9_elite_top.jpg"
            alt="Clear Radiator Bracket with RGB Fans Mounted"
            className="w-full max-h-[380px] object-contain rounded-lg drop-shadow-md"
          />
        </div>
      </div>

      {/* Row of 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Card 1: SSD Hinge */}
        <div className="bg-[#F6F6F4] p-8 rounded-xl border border-neutral-200/50 flex flex-col justify-between">
          <div className="aspect-[4/3] flex items-center justify-center p-2">
            <img
              src="/images/q9_ssd_hinge.jpg"
              alt="M.2 NVMe SSD"
              className="max-h-[180px] w-auto object-contain drop-shadow"
            />
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-200/60">
            <h4 className="text-xl font-black tracking-tight text-[#111111] mb-2">
              SSD Hinge
            </h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              The Q9's unique hinged door design offers easy access and installation for up to 4 SSDs.
            </p>
          </div>
        </div>

        {/* Card 2: Dual-Chamber Layout */}
        <div className="bg-[#F6F6F4] p-8 rounded-xl border border-neutral-200/50 flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-black tracking-tight text-[#111111] mb-2">
              Dual-Chamber Layout
            </h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed mb-6">
              The dual-chamber layout allows for radiator and fan mounting on the bottom grill with plenty of clearance.
            </p>
          </div>
          <div className="aspect-[4/3] flex items-center justify-center">
            <img
              src="/images/q9_flow_top.jpg"
              alt="Dual-Chamber Layout bottom and top grill clearance"
              className="max-h-[180px] w-auto object-contain rounded drop-shadow"
            />
          </div>
        </div>

        {/* Card 3: Cool Your Way */}
        <div className="bg-[#F6F6F4] p-8 rounded-xl border border-neutral-200/50 flex flex-col justify-between">
          <div className="aspect-[4/3] flex items-center justify-center p-2">
            <img
              src="/images/q9_aio_cooler.jpg"
              alt="360mm Liquid AIO Radiator with 3 RGB Fans"
              className="max-h-[180px] w-auto object-contain drop-shadow"
            />
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-200/60">
            <h4 className="text-xl font-black tracking-tight text-[#111111] mb-2">
              Cool Your Way
            </h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              The Q9 offers plenty of room for numerous radiator mounting options and sizes up to 360mm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   6. FOCUS YOUR COOLING (AIRFLOW DIAGRAMS)
   ========================================================================= */

function FocusYourCooling() {
  return (
    <section className="w-full py-12 md:py-20">
      <SectionIntro
        title="Focus Your Cooling"
        description="Configure the Q9 for optimized CPU or GPU cooling depending on fan and radiator placement."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
        {/* CPU Cooling Card */}
        <div className="bg-[#F6F6F4] p-8 sm:p-10 rounded-xl border border-neutral-200/50 flex flex-col justify-between relative">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-[#111111] mb-2">
              CPU Cooling
            </h3>
            <p className="text-[13px] text-neutral-500 mb-6">
              Optimized top radiator exhaust with fresh bottom/side intake
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden my-4">
            <img
              src="/images/cooling_cpu.jpg"
              alt="Q9 Flow CPU Cooling Airflow Diagram"
              className="w-full h-auto object-contain rounded"
            />
            <span className="absolute bottom-3 right-3 text-[11px] font-bold text-neutral-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-neutral-200">
              Q9 Flow
            </span>
          </div>
        </div>

        {/* GPU Cooling Card */}
        <div className="bg-[#F6F6F4] p-8 sm:p-10 rounded-xl border border-neutral-200/50 flex flex-col justify-between relative">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-[#111111] mb-2">
              GPU Cooling
            </h3>
            <p className="text-[13px] text-neutral-500 mb-6">
              Direct high-pressure cold air intake blasting onto graphics card
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden my-4">
            <img
              src="/images/cooling_gpu.jpg"
              alt="Q9 Flow GPU Cooling Airflow Diagram"
              className="w-full h-auto object-contain rounded"
            />
            <span className="absolute bottom-3 right-3 text-[11px] font-bold text-neutral-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-neutral-200">
              Q9 Flow
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   7. YOU MAY ALSO LIKE (RECOMMENDED ACCESSORIES)
   ========================================================================= */

function YouMayAlsoLike() {
  const products = [
    {
      name: 'Canvas 27Q',
      price: 'US$99.99',
      image: '/images/product_keyboard.jpg',
      colors: ['#FFFFFF', '#111111'],
    },
    {
      name: 'Lift',
      price: 'US$39.99',
      image: '/images/product_mouse.jpg',
      colors: ['#FFFFFF', '#A855F7', '#06B6D4', '#111111'],
    },
    {
      name: 'Monitor Arm (Dual)',
      price: 'US$169.99',
      image: '/images/product_monitor_arm.jpg',
      colors: [],
    },
    {
      name: 'Relay Headset',
      price: 'US$99.99',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80',
      colors: ['#FFFFFF', '#111111'],
    },
  ];

  return (
    <section className="w-full py-12 md:py-24">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] pb-4">
          You may also like
        </h2>
        <div className="w-full h-px border-b border-neutral-200" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((item, idx) => (
          <div
            key={idx}
            className="group bg-[#F6F6F4] p-5 sm:p-6 rounded-xl border border-neutral-200/50 flex flex-col justify-between hover:border-black transition-all cursor-pointer"
          >
            {/* Header: Name and optional color circles */}
            <div className="flex items-start justify-between gap-2 mb-4">
              <h4 className="text-sm sm:text-base font-bold text-[#111111] group-hover:underline">
                {item.name}
              </h4>
              {item.colors.length > 0 && (
                <div className="flex items-center gap-1 flex-shrink-0 mt-1">
                  {item.colors.map((color, cIdx) => (
                    <span
                      key={cIdx}
                      className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Image */}
            <div className="aspect-square flex items-center justify-center p-3 my-2">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-[160px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Price */}
            <div className="pt-3 border-t border-neutral-200/60 mt-2">
              <span className="text-xs sm:text-sm font-bold text-[#111111]">
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   MAIN HOME COMPONENT (EXPORTED)
   ========================================================================= */

export function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111]">
      {/* 1. Header component */}
      <Header />

      {/* 2. Main Landing Page Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <HeroBanner />
        <MeetQ9Series />
        <SuitYourSpace />
        <SimplifiedBuilding />
        <ClearRadiatorAndFeatures />
        <FocusYourCooling />
        <YouMayAlsoLike />
      </main>

      {/* 3. Footer component */}
      <Footer />
    </div>
  );
}

// Default export for flexibility
export default Home;
