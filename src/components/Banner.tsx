'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Code2,
  Database,
  Palette,
  BarChart3,
  MapPin,
  Clock,
  ChevronRight,
  Search,
  DollarSign,
} from 'lucide-react';
import { useJobs } from '@/context/JobContext';

const CATEGORIES = [
  {
    name: 'Frontend',
    jobsCount: '12+ jobs',
    icon: Code2,
    badgeBg: 'bg-blue-500/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    cardBg: 'bg-blue-50/50 hover:bg-blue-50 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 border-blue-100 dark:border-blue-900/50',
  },
  {
    name: 'Backend',
    jobsCount: '18+ jobs',
    icon: Database,
    badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    cardBg: 'bg-emerald-50/50 hover:bg-emerald-50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50',
  },
  {
    name: 'UI/UX',
    jobsCount: '10+ jobs',
    icon: Palette,
    badgeBg: 'bg-purple-500/10 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    cardBg: 'bg-purple-50/50 hover:bg-purple-50 dark:bg-purple-950/20 dark:hover:bg-purple-950/40 border-purple-100 dark:border-purple-900/50',
  },
  {
    name: 'Data Science',
    jobsCount: '8+ jobs',
    icon: BarChart3,
    badgeBg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    cardBg: 'bg-amber-50/50 hover:bg-amber-50 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border-amber-100 dark:border-amber-900/50',
  },
];

const FEATURED_JOBS = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    location: 'Dhaka',
    salary: '40k - 60k',
    type: 'Full Time',
    icon: Code2,
    iconBg: 'bg-blue-600 text-white',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'SoftTech',
    location: 'Remote',
    salary: '50k - 80k',
    type: 'Full Time',
    icon: Database,
    iconBg: 'bg-emerald-600 text-white',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Dhaka',
    salary: '30k - 50k',
    type: 'Part Time',
    icon: Palette,
    iconBg: 'bg-purple-600 text-white',
  },
];

export default function Banner() {
  const router = useRouter();
  const { setSearch, setCategory } = useJobs();
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(query);
    router.push('/jobs');
  };

  const handleCategoryClick = (categoryName: string) => {
    setCategory(categoryName);
    router.push('/jobs');
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-4 md:py-8">
      {/* ================= HERO TOP SECTION ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Text & Search Input */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Find Your <br />
              <span className="text-blue-600 dark:text-blue-500">Dream Job</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-lg font-normal leading-relaxed">
              Search thousands of jobs and find your next opportunity.
            </p>
          </div>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all max-w-xl"
          >
            <div className="flex items-center flex-1 px-3">
              <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search job title, company, or keyword..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-sm shadow-blue-500/25 cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right: Vector Illustration */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center">
            {/* Background Blob / Glow */}
            <div className="absolute inset-0 bg-blue-100/60 dark:bg-blue-950/40 rounded-full blur-3xl -z-10 transform scale-90" />

            {/* SVG Illustration Matching Screenshot */}
            <svg
              viewBox="0 0 450 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-sm select-none"
            >
              {/* Soft background clouds & shapes */}
              <circle cx="340" cy="180" r="140" fill="#EBF3FE" className="dark:opacity-20" />
              <path d="M70 290 Q60 210 110 200 Q160 210 150 290 Z" fill="#75C6DE" opacity="0.4" />
              <path d="M50 290 Q35 240 85 230 Q130 240 120 290 Z" fill="#4AA4C8" opacity="0.6" />

              {/* Plant Pot & Baseline */}
              <path d="M75 270 L80 300 L110 300 L115 270 Z" fill="#E2E8F0" />
              <line x1="40" y1="300" x2="410" y2="300" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" className="dark:stroke-slate-700" />

              {/* Big Job Application Board */}
              <rect x="220" y="50" width="130" height="170" rx="14" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" className="dark:fill-slate-800" />
              {/* Clipboard clip */}
              <rect x="260" y="42" width="50" height="16" rx="5" fill="#3B82F6" />
              <circle cx="285" cy="50" r="4" fill="#FFFFFF" />
              {/* JOB text & placeholder lines */}
              <text x="285" y="85" textAnchor="middle" fill="#1D4ED8" fontSize="16" fontWeight="bold" fontFamily="sans-serif">JOB</text>
              <rect x="240" y="100" width="90" height="5" rx="2.5" fill="#E2E8F0" className="dark:fill-slate-700" />
              <rect x="240" y="112" width="70" height="5" rx="2.5" fill="#E2E8F0" className="dark:fill-slate-700" />
              <rect x="240" y="124" width="85" height="5" rx="2.5" fill="#E2E8F0" className="dark:fill-slate-700" />
              <rect x="240" y="136" width="55" height="5" rx="2.5" fill="#E2E8F0" className="dark:fill-slate-700" />

              {/* Magnifying Glass */}
              <circle cx="280" cy="165" r="18" stroke="#2563EB" strokeWidth="4" fill="#FFFFFF" className="dark:fill-slate-800" />
              <line x1="293" y1="178" x2="310" y2="195" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />

              {/* Character sitting with laptop */}
              <path d="M190 280 Q215 250 250 275 L350 285 L360 270 L280 255 Q240 240 220 275 Z" fill="#1E3A8A" />
              <path d="M250 275 Q280 285 365 285 Q375 270 340 250 L270 255 Z" fill="#172554" />
              {/* Torso / Shirt */}
              <path d="M295 185 C285 185 270 205 270 245 L340 245 C340 205 325 185 315 185 Z" fill="#2563EB" />
              {/* Arms */}
              <path d="M285 190 Q270 215 295 240 L315 235 Q300 210 300 190 Z" fill="#2563EB" />
              <circle cx="310" cy="240" r="8" fill="#FBCFE8" />
              {/* Head & Neck */}
              <path d="M297 170 L307 170 L307 185 L297 185 Z" fill="#FBCFE8" />
              <circle cx="302" cy="155" r="16" fill="#FBCFE8" />
              {/* Hair */}
              <path d="M290 152 Q295 138 312 140 Q320 144 316 155 Q308 147 296 150 Q288 155 290 152 Z" fill="#1E293B" />
              {/* Laptop */}
              <path d="M245 238 L290 238 L280 205 L255 205 Z" fill="#0F172A" />
              <rect x="240" y="238" width="60" height="4" rx="2" fill="#334155" />
            </svg>
          </div>
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] ${cat.cardBg}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cat.badgeBg}`}
                >
                  <Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {cat.jobsCount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Jobs
          </h2>
          <Link
            href="/jobs"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Browse all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_JOBS.map((job) => {
            const Icon = job.icon;
            return (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all flex flex-col justify-between group"
              >
                {/* Job Title & Icon */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${job.iconBg} shadow-sm`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pt-1">
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </div>

                {/* Metadata */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Jobs CTA */}
        <div className="flex justify-center pt-4">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center px-8 py-3 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all rounded-xl shadow-sm shadow-blue-500/25"
          >
            View All Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}