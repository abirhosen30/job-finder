import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { JobProvider } from '@/context/JobContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'JobFinder - Find Your Dream Job',
  description: 'A modern job finding platform with search, filters, bookmarks, and dynamic details.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased flex flex-col transition-colors">
        <JobProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4">{children}</main>
        </JobProvider>
      </body>
    </html>
  );
}