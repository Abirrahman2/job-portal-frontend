'use client'
import Link from 'next/link';
import RecruiterNavLinks from './recruiter-nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';

export default function RecruiterSideNav() {
  const { logout } = useAuth();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-orange-500 p-4 md:h-40"
        href="/recruiter/dashboard"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <RecruiterNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={logout}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-orange-500 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}