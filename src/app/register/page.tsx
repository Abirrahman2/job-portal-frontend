'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, UserIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import AcmeLogo from '@/app/ui/acme-logo';

export default function RegisterChoicePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-10">
        <div className="inline-block">
          <AcmeLogo />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mt-4">Join Our Community</h1>
        <p className="text-lg text-gray-600 mt-2">Choose your path and let's get started.</p>
      </div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <Link href="/register/user">
          <div className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body items-center text-center p-10">
              <div className="p-5 bg-orange-100 rounded-full mb-4">
                <UserIcon className="h-12 w-12 text-orange-600" />
              </div>
              <h2 className="card-title text-2xl font-bold">I'm a Job Seeker</h2>
              <p className="text-gray-500 mt-2">Create a profile, browse jobs, and find your next career opportunity.</p>
              <div className="card-actions mt-6">
                <span className="btn btn-link text-orange-600 no-underline group-hover:underline">
                  Create Account <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </Link>
    
        <Link href="/register/recruiter">
          <div className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="card-body items-center text-center p-10">
              <div className="p-5 bg-blue-100 rounded-full mb-4">
                <BuildingOffice2Icon className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="card-title text-2xl font-bold">I'm a Recruiter</h2>
              <p className="text-gray-500 mt-2">Post job openings, manage your company profile, and find top talent.</p>
              <div className="card-actions mt-6">
                <span className="btn btn-link text-blue-600 no-underline group-hover:underline">
                  Register Company <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-orange-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}