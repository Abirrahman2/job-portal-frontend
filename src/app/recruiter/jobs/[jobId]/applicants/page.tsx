'use client';
import React, { useState, useEffect } from 'react';
import { Application, Job } from '@/lib/types';
import api from '@/lib/api';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ApplicantsTable from './ApplicantsTable';

export default function ViewApplicantsPage({ params }: { params: { jobId: string } }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { jobId } = params;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [jobRes, appsRes] = await Promise.all([
          api.get<Job>(`/jobs/${jobId}`),
          api.get<Application[]>(`/applications/job/${jobId}`),
        ]);

        setJob(jobRes.data);
        setApplications(appsRes.data);
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
            setError("You are not authorized to view these applicants.");
        } else {
            setError("Could not load applicant data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  return (
    <div>
      <div className="mb-6">
        <Link href="/recruiter/jobs" className="btn btn-ghost">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to My Job Posts
        </Link>
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-500">Showing applicants for</p>
        <h1 className="text-3xl font-bold text-gray-800">
          {loading ? 'Loading job title...' : job?.title || 'Job Post'}
        </h1>
      </div>

      {loading && (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      
      {!loading && !error && (
        <ApplicantsTable applications={applications} />
      )}
    </div>
  );
}