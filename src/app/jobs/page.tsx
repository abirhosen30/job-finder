'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, Frown } from 'lucide-react';
import { useJobs } from '@/context/JobContext';
import JobCard from '@/components/JobCard';
import JobFilter from '@/components/JobFilter';
import Pagination from '@/components/Pagination';

export default function JobsPage() {
  const {
    filteredJobs,
    loading,
    error,
    page,
    pageSize,
    totalJobsCount,
    filters,
    setSortBy,
    clearFilters,
  } = useJobs();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Paginated slice
  const startIndex = (page - 1) * pageSize;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + pageSize);
  const showingCount = currentJobs.length;

  return (
    <div className="py-4 md:py-6 space-y-6">
      {/* Mobile Filter Trigger & Page Title */}
      <div className="flex md:hidden items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Find Jobs</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {showingCount} of {totalJobsCount} jobs
          </p>
        </div>
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Grid: Sidebar Filters (3 cols) + Job Listing (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24">
          <JobFilter />
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Showing <span className="font-bold text-slate-900 dark:text-white">{showingCount}</span> of{' '}
              <span className="font-bold text-slate-900 dark:text-white">{totalJobsCount}</span> jobs
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                Sort:
              </span>
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-3 pr-8 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <option value="Newest">Newest</option>
                  <option value="Salary (High to Low)">Salary: High to Low</option>
                  <option value="Salary (Low to High)">Salary: Low to High</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-6 text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && currentJobs.length === 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Frown className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No jobs match your search
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Try modifying your keywords, selecting different job categories, or clearing all filters.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Jobs List */}
          {!loading && !error && currentJobs.length > 0 && (
            <div className="space-y-4">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && currentJobs.length > 0 && <Pagination />}
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Slide-over Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filter Jobs</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <JobFilter onCloseMobile={() => setMobileFilterOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}