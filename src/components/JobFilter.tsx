'use client';

import React from 'react';
import { Search, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { useJobs } from '@/context/JobContext';

interface JobFilterProps {
  onCloseMobile?: () => void;
}

const JOB_TYPES = ['Full Time', 'Part Time', 'Internship', 'Remote'];
const CATEGORIES = ['All', 'Frontend', 'Backend', 'UI/UX', 'Data Science'];
const SORT_OPTIONS = [
  'Newest',
  'Salary (High to Low)',
  'Salary (Low to High)',
];

export default function JobFilter({ onCloseMobile }: JobFilterProps) {
  const {
    filters,
    setSearch,
    toggleType,
    setCategory,
    setLocation,
    setSortBy,
    clearFilters,
    availableLocations,
  } = useJobs();

  return (
    <aside className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Clear All
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Job Type Checkboxes */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Job Type
        </label>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => {
            const isChecked = filters.types.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleType(type)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-all">
                  {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Category
        </label>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="job-category"
                  checked={isSelected}
                  onChange={() => setCategory(cat)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 peer-checked:border-blue-600 flex items-center justify-center transition-all">
                  {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <span>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Location Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Location
        </label>
        <div className="relative">
          <select
            value={filters.location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full appearance-none pl-3 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {availableLocations.map((loc) => (
              <option key={loc} value={loc} className="dark:bg-slate-900">
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Sort By
        </label>
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none pl-3 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="dark:bg-slate-900">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Mobile Close Button */}
      {onCloseMobile && (
        <div className="pt-2">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
}
