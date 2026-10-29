import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

export function News() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] antialiased">
      <Header />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            cradle. Editorial & Updates
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111111] mb-4">
            News & Stories
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Latest hardware announcements, engineering insights, and gaming dispatches from the cradle. team.
          </p>
        </div>

        {/* Clean minimal placeholder area */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="py-20 text-center bg-[#F6F6F4] rounded-2xl border border-neutral-200/50">
            <p className="text-sm font-semibold text-neutral-700">Upcoming stories and articles will be published here.</p>
            <p className="text-xs text-neutral-400 mt-1">Stay tuned for hardware reviews, benchmarks, and build guides.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default News;
