'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Job, JobFilterState, JobContextType } from '@/types/job.type';

const JobContext = createContext<JobContextType | undefined>(undefined);

const PAGE_SIZE = 6;

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<JobFilterState>({
    search: '',
    types: [],
    category: 'All',
    location: 'All Locations',
    sortBy: 'Newest',
  });

  // Fetch jobs from /jobs.json
  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/jobs.json');
        if (!res.ok) {
          throw new Error(`Failed to load jobs (status: ${res.status})`);
        }
        const data = await res.json();
        setJobs(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error fetching jobs data');
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  // Load Saved Jobs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('jobfinder_saved_jobs');
      if (stored) {
        setSavedJobIds(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage read errors
    }
    setIsHydrated(true);
  }, []);

  // Sync Saved Jobs with localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('jobfinder_saved_jobs', JSON.stringify(savedJobIds));
      } catch {
        // Ignore localStorage write errors
      }
    }
  }, [savedJobIds, isHydrated]);

  const toggleSaveJob = useCallback((id: string) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const isJobSaved = useCallback(
    (id: string) => savedJobIds.includes(id),
    [savedJobIds]
  );

  const setSearch = useCallback((search: string) => {
    setFilters((p) => ({ ...p, search }));
    setPage(1);
  }, []);

  const toggleType = useCallback((type: string) => {
    setFilters((p) => {
      const exists = p.types.includes(type);
      const updatedTypes = exists
        ? p.types.filter((t) => t !== type)
        : [...p.types, type];
      return { ...p, types: updatedTypes };
    });
    setPage(1);
  }, []);

  const setCategory = useCallback((category: string) => {
    setFilters((p) => ({ ...p, category }));
    setPage(1);
  }, []);

  const setLocation = useCallback((location: string) => {
    setFilters((p) => ({ ...p, location }));
    setPage(1);
  }, []);

  const setSortBy = useCallback((sortBy: string) => {
    setFilters((p) => ({ ...p, sortBy }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      types: [],
      category: 'All',
      location: 'All Locations',
      sortBy: 'Newest',
    });
    setPage(1);
  }, []);

  // Dynamic filter lists from data
  const availableLocations = useMemo(() => {
    const locs = new Set<string>();
    jobs.forEach((j) => {
      if (j.location) locs.add(j.location);
    });
    return ['All Locations', ...Array.from(locs)];
  }, [jobs]);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    jobs.forEach((j) => {
      if (j.category) cats.add(j.category);
    });
    return ['All', ...Array.from(cats)];
  }, [jobs]);

  // Filter & Sort calculation
  const filteredJobs = useMemo(() => {
    const result = jobs.filter((job) => {
      // Search filter (title, company, description, requirements)
      const query = filters.search.toLowerCase().trim();
      const matchSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.requirements.some((r) => r.toLowerCase().includes(query));

      // Job Type filter
      const matchType =
        filters.types.length === 0 || filters.types.includes(job.type);

      // Category filter
      const matchCategory =
        filters.category === 'All' ||
        job.category.toLowerCase() === filters.category.toLowerCase();

      // Location filter
      const matchLocation =
        filters.location === 'All Locations' ||
        job.location.toLowerCase() === filters.location.toLowerCase();

      return matchSearch && matchType && matchCategory && matchLocation;
    });

    // Sorting
    return result.sort((a, b) => {
      if (filters.sortBy === 'Newest') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      }
      if (filters.sortBy === 'Salary (High to Low)' || filters.sortBy === 'Salary: High to Low') {
        return b.salaryMax - a.salaryMax;
      }
      if (filters.sortBy === 'Salary (Low to High)' || filters.sortBy === 'Salary: Low to High') {
        return a.salaryMin - b.salaryMin;
      }
      return 0;
    });
  }, [jobs, filters]);

  // Saved Jobs list
  const savedJobs = useMemo(() => {
    return jobs.filter((j) => savedJobIds.includes(j.id));
  }, [jobs, savedJobIds]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));

  useEffect(() => {
    setPage((currentPage) => Math.min(Math.max(1, currentPage), totalPages));
  }, [totalPages]);

  const setPageSafe = useCallback((nextPage: number) => {
    setPage(() => Math.min(Math.max(1, nextPage), totalPages));
  }, [totalPages]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        savedJobIds,
        savedJobs,
        loading,
        error,
        page,
        totalPages,
        totalJobsCount: filteredJobs.length,
        pageSize: PAGE_SIZE,
        setPage: setPageSafe,
        toggleSaveJob,
        isJobSaved,
        filters,
        setSearch,
        toggleType,
        setCategory,
        setLocation,
        setSortBy,
        clearFilters,
        availableLocations,
        availableCategories,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}