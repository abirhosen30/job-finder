'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Bookmark,
  CheckCircle2,
  Globe,
  Users,
  Code2,
  Database,
  Palette,
  BarChart3,
  Atom,
  ChevronRight,
  ExternalLink,
  Check,
  Send,
  X,
} from 'lucide-react';
import { Job } from '@/types/job.type';
import { useJobs } from '@/context/JobContext';

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { jobs, loading, isJobSaved, toggleSaveJob } = useJobs();
  const [job, setJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  // Find job from Context or fetch /jobs.json directly
  useEffect(() => {
    if (jobs.length > 0) {
      const found = jobs.find((j) => j.id === resolvedParams.id);
      if (found) {
        setJob(found);
      }
    } else {
      fetch('/jobs.json')
        .then((res) => res.json())
        .then((data: Job[]) => {
          const found = data.find((j) => j.id === resolvedParams.id);
          if (found) setJob(found);
        })
        .catch(() => {});
    }
  }, [jobs, resolvedParams.id]);

  if (!loading && jobs.length > 0 && !job) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Job Not Found</h2>
        <p className="text-slate-500">The job posting you are looking for does not exist.</p>
        <Link
          href="/jobs"
          className="inline-flex px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-12 space-y-6">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
      </div>
    );
  }

  const saved = isJobSaved(job.id);

  // Similar jobs in same category, excluding current job
  const similarJobs = jobs
    .filter((j) => j.id !== job.id && (j.category === job.category || j.type === job.type))
    .slice(0, 3);

  const renderIcon = () => {
    switch (job.category) {
      case 'Frontend':
        if (job.title.toLowerCase().includes('react')) {
          return (
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-100 dark:border-cyan-900/50">
              <Atom className="w-8 h-8" />
            </div>
          );
        }
        return (
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
            <Code2 className="w-8 h-8" />
          </div>
        );
      case 'Backend':
        return (
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/50">
            <Database className="w-8 h-8" />
          </div>
        );
      case 'UI/UX':
        return (
          <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-900/50">
            <Palette className="w-8 h-8" />
          </div>
        );
      case 'Data Science':
        return (
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900/50">
            <BarChart3 className="w-8 h-8" />
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
            <Briefcase className="w-8 h-8" />
          </div>
        );
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasApplied(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
    }, 2000);
  };

  return (
    <div className="py-4 md:py-6 space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>
      </div>

      {/* Main Grid: Details (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Job Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {renderIcon()}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h1>
                  <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
                    {job.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Badges metadata */}
            <div className="flex flex-wrap items-center gap-3 pt-2 pb-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium">
                <MapPin className="w-4 h-4 text-slate-400" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-blue-600 dark:text-blue-400">
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                {job.type}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium">
                <Briefcase className="w-4 h-4 text-slate-400" />
                {job.experience}
              </span>
            </div>

            {/* Action Buttons: Apply Now & Save Job */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Apply Now
              </button>

              <button
                onClick={() => toggleSaveJob(job.id)}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 border rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  saved
                    ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved' : 'Save Job'}
              </button>
            </div>
          </div>

          {/* Job Description Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job Description</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {job.description}
            </p>
          </div>

          {/* Requirements Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: About Company & Similar Jobs */}
        <div className="lg:col-span-4 space-y-6">
          {/* About Company Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              About Company
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-base">
                {job.company.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {job.company}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {job.companyBio}
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium truncate"
                >
                  Website <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{job.location}, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{job.employees}</span>
              </div>
            </div>
          </div>

          {/* Similar Jobs Card */}
          {similarJobs.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Similar Jobs
              </h3>

              <div className="space-y-3">
                {similarJobs.map((sim) => (
                  <Link
                    key={sim.id}
                    href={`/jobs/${sim.id}`}
                    className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                        {sim.title.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {sim.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {sim.company}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {hasApplied ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Application Submitted!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Thank you for applying to <span className="font-semibold">{job.company}</span>. They will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Apply for {job.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    at {job.company} • {job.location}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Resume / Portfolio Link
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/... or drive link"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
