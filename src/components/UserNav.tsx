'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BriefcaseIcon, DocumentTextIcon, UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import AcmeLogo from '@/app/ui/acme-logo';

export default function UserNavbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-30">
      <div className="flex-1">
        <Link href="/jobs" className="btn btn-ghost text-xl text-orange-500 normal-case">
          <AcmeLogo />
        </Link>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/jobs">
                <BriefcaseIcon className="h-4 w-4" /> Find Jobs
              </Link>
            </li>
            <li>
              <Link href="/user/applications">
                <DocumentTextIcon className="h-4 w-4" /> My Applications
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ring-orange-500">
              <span className="text-xl font-bold text-orange-500">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li className="p-2 font-semibold">
              Hi, {user?.firstName}!
            </li>
            <div className="divider my-0"></div>
            <li>
              <Link href="/user/profile">
                <UserCircleIcon className="h-4 w-4" /> Profile
              </Link>
            </li>
            <li>
              <button onClick={logout}>
                <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link href="/jobs"><BriefcaseIcon className="h-4 w-4" /> Find Jobs</Link></li>
                <li><Link href="/user/applications"><DocumentTextIcon className="h-4 w-4" /> My Applications</Link></li>
            </ul>
        </div>
      </div>
    </div>
  );
}