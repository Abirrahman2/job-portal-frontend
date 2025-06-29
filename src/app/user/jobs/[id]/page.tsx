'use client'; 
import React, { useState, useEffect } from 'react'; 
import { Job } from '@/lib/types';
import api from '@/lib/api';
import { MapPinIcon, BriefcaseIcon, BuildingOfficeIcon, CalendarIcon, ArrowLeftIcon} from '@heroicons/react/24/outline';
import ApplyButton from './ApplyButton';
import Link from 'next/link';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const {id}=params;
  useEffect(() => {
    const getJobDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get<Job>(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error(`Failed to fetch job ${id}:`, error);
        setJob(null); 
      } finally {
        setLoading(false);
      }
    };

    getJobDetails();
  }, [id]); 

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <p className="text-gray-500">The position you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  const postDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
     <div>
      <Link href="/user/jobs" className="btn btn-ghost mb-6">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Jobs
      </Link>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8 md:p-10">
          <p className="text-base font-semibold text-orange-600">{job!.jobType}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{job!.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-gray-500">
            <p className="flex items-center"><BuildingOfficeIcon className="mr-1.5 h-5 w-5" />{job!.company.name}</p>
            <p className="flex items-center"><MapPinIcon className="mr-1.5 h-5 w-5" />{job!.location}</p>
            <p className="flex items-center"><CalendarIcon className="mr-1.5 h-5 w-5" />Posted on {postDate}</p>
          </div>

          <div className="divider my-8"></div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2>Job Description</h2>
            <p>{job!.description}</p>
          </div>

          <div className="card-actions justify-center mt-10">
            <ApplyButton jobId={job!.id} />
          </div>
        </div>
      </div>
    </div>
  );
}