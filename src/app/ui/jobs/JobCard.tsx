import React from 'react';
import Link from 'next/link';
import { MapPinIcon, BriefcaseIcon, BuildingOfficeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Job } from '@/lib/types';

export default function JobCard({ job }: { job: Job }) {
  const postDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const jobDetailsUrl=`/user/jobs/${job.id}`;

  return (
    <div className="card card-compact w-full bg-base-100 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-orange-500">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="card-title text-lg font-bold text-gray-800 hover:text-orange-600">
              <Link href={jobDetailsUrl}>{job.title}</Link>
            </h2>
            <Link href={`/company/${job.company.id}`} className="flex items-center text-sm font-medium text-gray-600 hover:underline">
              <BuildingOfficeIcon className="mr-1.5 h-4 w-4" />
              {job.company.name}
            </Link>
          </div>
          <div className="badge badge-outline border-orange-500 text-orange-600 py-3 text-xs font-semibold">
            {job.jobType}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPinIcon className="mr-1.5 h-4 w-4 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <CalendarDaysIcon className="mr-1.5 h-4 w-4 text-gray-400" />
            <span>Posted {postDate}</span>
          </div>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <Link href={jobDetailsUrl} className="btn btn-primary btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white">
            View Details
            <BriefcaseIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}