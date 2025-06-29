'use client';
import React from 'react';
import { Application } from '@/lib/types';
import { DocumentArrowDownIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface ApplicantsTableProps {
  applications: Application[];
}

export default function ApplicantsTable({ applications }: ApplicantsTableProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center bg-base-100 p-10 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold">No Applicants Yet</h3>
        <p className="text-gray-500 mt-2">Check back later to see who has applied for this position.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Contact</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th className="text-center">Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="hover">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-orange-200 text-orange-700 rounded-full w-12">
                      <span>{app.user.firstName.charAt(0)}{app.user.lastName.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{app.user.firstName} {app.user.lastName}</div>
                  </div>
                </div>
              </td>
              <td>{app.user.email}</td>
              <td>
                <div className="flex items-center gap-1 text-sm">
                    <CalendarDaysIcon className="h-4 w-4 opacity-60" />
                    {new Date(app.appliedAt).toLocaleDateString()}
                </div>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm capitalize">{app.status}</span>
              </td>
              <th className="text-center">
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white"
                >
                  <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                  View
                </a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}