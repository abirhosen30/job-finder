'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Bookmark,
  Code2,
  Database,
  Palette,
  BarChart3,
  Layers,
  Atom,
  Terminal,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { Job } from '@/types/job.type';
import { useJobs } from '@/context/JobContext';

interface JobCardProps {
  job: Job;
  showStar?: boolean;
}

export default function JobCard({ job, showStar = false }: JobCardProps) {
  const { isJobSaved, toggleSaveJob } = useJobs();
  const saved = isJobSaved(job.id);

  // Pick category icon & styling
  const renderIcon = () => {
    switch (job.category) {
      case 'Frontend':
        if (job.title.toLowerCase().includes('react')) {
          return (
            <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-100 dark:border-cyan-900/50">
              <Atom className="w-6 h-6" />
            </div>
          );
        }
        if (job.company.toLowerCase().includes('nextgen')) {
          return (
            <div className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-lg border border-slate-700">
              N
            </div>
          );
        }
        return (
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
            <Code2 className="w-6 h-6" />
          </div>
        );

      case 'Backend':
        return (
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/50">
            <Database className="w-6 h-6" />
          </div>
        );

      case 'UI/UX':
        return (
          <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-900/50">
            <Palette className="w-6 h-6" />
          </div>
        );

      case 'Data Science':
        return (
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900/50">
            <BarChart3 className="w-6 h-6" />
          </div>
        );

      default:
        return (
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
            <Briefcase className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left side: Icon & Job Info */}
      <div className="flex items-start gap-4">
        {renderIcon()}

        <div className="space-y-1">
          <Link
            href={`/jobs/${job.id}`}
            className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 text-base sm:text-lg transition-colors block"
          >
            {job.title}
          </Link>
          <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            {job.company}
          </div>

          {/* Metadata badges: Location, Salary, Type */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {job.location}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {job.salary}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {job.type}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Save button & View Details button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
        {/* Bookmark Button */}
        <button
          onClick={() => toggleSaveJob(job.id)}
          aria-label={saved ? 'Remove from saved' : 'Save job'}
          title={saved ? 'Remove from saved' : 'Save job'}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            saved
              ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark
            className="w-5 h-5 transition-transform active:scale-90"
            fill={saved ? 'currentColor' : 'none'}
            strokeWidth={1.8}
          />
        </button>

        {/* View Details Link */}
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-sm shadow-blue-500/20 transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
