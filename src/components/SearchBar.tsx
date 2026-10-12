'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useJobs } from '@/context/JobContext';

interface SearchBarProps {
  redirectOnSubmit?: boolean;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  redirectOnSubmit = false,
  placeholder = 'Search job title, company, or keyword...',
  className = '',
}: SearchBarProps) {
  const router = useRouter();
  const { filters, setSearch } = useJobs();
  const [localQuery, setLocalQuery] = useState(filters.search);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(localQuery);
    if (redirectOnSubmit) {
      router.push('/jobs');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    if (!redirectOnSubmit) {
      setSearch(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all ${className}`}
    >
      <div className="pl-3.5 pr-2 text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={localQuery}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none py-2 pr-3"
      />
      <button
        type="submit"
        className="shrink-0 px-5 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
