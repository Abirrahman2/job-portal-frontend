'use client';
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import Pagination from '@/app/ui/common/Pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { MagnifyingGlassIcon, UserCircleIcon, BuildingOfficeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useDebounce } from 'use-debounce';
interface AdminJob {
  id: number;
  title: string;
  location: string;
  createdAt: string;
  applicationCount: number;
  company: { name: string };
  recruiter: { firstName: string, lastName: string };
}

interface AdminPaginatedJobs {
  data: AdminJob[];
  total: number;
  page: number;
  lastPage: number;
}

export default function AdminJobStatsPage() {
  const [jobsData, setJobsData] = useState<AdminPaginatedJobs | null>(null);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set('page', searchParams.get('page') || '1');
      params.set('limit', '10');
      
      if (debouncedSearchTerm) {
        params.set('search', debouncedSearchTerm);
      } else {
        params.delete('search');
      }

      router.replace(`${pathname}?${params.toString()}`);

      try {
        const response = await api.get('/jobs/admin/all', { params });
        setJobsData(response.data);
      } catch (error) {
        console.error("Failed to fetch admin jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [debouncedSearchTerm, searchParams.get('page')]);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Job Post Management</h1>
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by job title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-10 focus:border-orange-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company & Recruiter</th>
              <th>Applications</th>
              <th>Posted On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-10"><span className="loading loading-spinner text-orange-500"></span></td></tr>
            ) : jobsData?.data.map((job) => (
              <tr key={job.id} className="hover">
                <td>
                  <div className="font-bold">{job.title}</div>
                  <div className="text-sm opacity-50">{job.location}</div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <BuildingOfficeIcon className="h-4 w-4 opacity-70" /> {job.company.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-60">
                     <UserCircleIcon className="h-4 w-4" /> Posted by {job.recruiter.firstName} {job.recruiter.lastName}
                  </div>
                </td>
                <td className="font-semibold text-center">
                    <div className="flex items-center justify-center gap-1">
                        <DocumentTextIcon className="h-5 w-5 text-orange-500" /> {job.applicationCount}
                    </div>
                </td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {jobsData && <Pagination currentPage={jobsData.page} lastPage={jobsData.lastPage} total={jobsData.total} />}
    </div>
  );
}