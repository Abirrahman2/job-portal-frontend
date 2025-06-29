'use client';
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Job } from '@/lib/types';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface RecruiterJob extends Job {
  
   applicationCount: number; 
}

export default function MyJobPostsPage() {
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<RecruiterJob[]>('/jobs/my-post');
        setJobs(response.data);
      } catch (err: any) {
        console.error("Failed to fetch job posts:", err);
        setError("Could not load your job posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Job Posts</h1>
        <Link href="/recruiter/jobs/new" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white">
          <PlusIcon className="h-5 w-5 mr-1" />
          Post a New Job
        </Link>
      </div>

      {loading && (
        <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-orange-500"></span></div>
      )}

      {error && (
        <div className="alert alert-error"><span>{error}</span></div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Position</th>
                <th>Location & Type</th>
                <th>Date Posted</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? jobs.map((job) => (
                <tr key={job.id} className="hover">
                  <td>
                    <div className="font-bold">{job.title}</div>
                    <div className="text-sm opacity-70">{job.company.name}</div>
                  </td>
                  <td>
                    {job.location}
                    <br/>
                    <span className="badge badge-ghost badge-sm">{job.jobType}</span>
                  </td>
                  <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="font-semibold text-center">
                    {job.applicationCount}
                  </td>
                  <td className="flex items-center gap-2">
                    <Link 
                      href={`/recruiter/jobs/${job.id}/applicants`}
                      className="btn btn-ghost btn-xs"
                      title="View Applicants"
                    >
                      <EyeIcon className="h-4 w-4 text-blue-500" />
                    </Link>
                    <button className="btn btn-ghost btn-xs" title="Edit Job">
                      <PencilIcon className="h-4 w-4 text-green-500" />
                    </button>
                     <button className="btn btn-ghost btn-xs" title="Delete Job">
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    You haven't posted any jobs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}