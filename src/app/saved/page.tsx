'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, Briefcase, ArrowRight } from 'lucide-react';
import { useJobs } from '@/context/JobContext';
import JobCard from '@/components/JobCard';

export default function SavedJobsPage() {
  const { savedJobs, loading } = useJobs();

  return (
    <div className="py-4 md:py-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          My Saved Jobs
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your favorite jobs are saved here.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && savedJobs.length === 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 sm:p-16 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400 flex items-center justify-center">
            <Bookmark className="w-8 h-8" strokeWidth={1.8} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No saved jobs yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Save jobs you are interested in by clicking the bookmark icon on any job card.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              Browse Available Jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Saved Jobs List */}
      {!loading && savedJobs.length > 0 && (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} showStar />
          ))}
        </div>
      )}
    </div>
  );
}
