export type JobType = 'Full Time' | 'Part Time' | 'Internship' | 'Remote';

export type JobCategory = 'Frontend' | 'Backend' | 'UI/UX' | 'Data Science' | 'All';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyBio: string;
  website: string;
  employees: string;
  location: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  type: JobType | string;
  category: JobCategory | string;
  experience: string;
  postedDate: string;
  icon: string;
  badgeColor?: string;
  description: string;
  requirements: string[];
}

export interface JobFilterState {
  search: string;
  types: string[];
  category: string;
  location: string;
  sortBy: string;
}

export interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  savedJobIds: string[];
  savedJobs: Job[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalJobsCount: number;
  pageSize: number;
  setPage: (page: number) => void;
  toggleSaveJob: (id: string) => void;
  isJobSaved: (id: string) => boolean;
  filters: JobFilterState;
  setSearch: (query: string) => void;
  toggleType: (type: string) => void;
  setCategory: (category: string) => void;
  setLocation: (location: string) => void;
  setSortBy: (sortBy: string) => void;
  clearFilters: () => void;
  availableLocations: string[];
  availableCategories: string[];
}
