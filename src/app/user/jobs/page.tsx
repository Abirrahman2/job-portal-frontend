'use client';
import React, { useState, useEffect } from 'react';
import JobCard from '@/app/ui/jobs/JobCard';
import { Job } from '@/lib/types';
import api from '@/lib/api';
import Pagination from '@/app/ui/common/Pagination';
import { useSearchParams } from 'next/navigation';

interface PaginatedJobsData {
  data: Job[];
  total: number;
  page: number;
  lastPage: number;
}

export default function FindJobsPage() {
  const [jobsData, setJobsData] = useState<PaginatedJobsData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const page = searchParams.get('page') || '1';
      const limit = '6';

      try {
        const response = await api.get<PaginatedJobsData>('/jobs', {
          params: { page, limit },
        });
        setJobsData(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchParams]);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Find Your Next Job</h1>

      {loading ? (
        <div className="text-center mt-12">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
        </div>
      ) : jobsData && jobsData.data.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobsData.data.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Pagination
            currentPage={jobsData.page}
            lastPage={jobsData.lastPage}
            total={jobsData.total}
          />
        </>
      ) : (
        <div className="mt-12 text-center text-gray-500">
          <p>No open positions found. Please check back later!</p>
        </div>
      )}
    </div>
  );
}