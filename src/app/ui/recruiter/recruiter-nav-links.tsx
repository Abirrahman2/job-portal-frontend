'use client'
import {
  HomeIcon,
  BriefcaseIcon,
  PlusCircleIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/recruiter/dashboard', icon: HomeIcon },
  { name: 'My Job Posts', href: '/recruiter/jobs', icon: BriefcaseIcon },
  { name: 'Post a New Job', href: '/recruiter/jobs/new', icon: PlusCircleIcon },
  { name: 'My Company', href: '/recruiter/company', icon: BuildingOfficeIcon },
  { name: 'Profile', href: '/recruiter/profile', icon: UserCircleIcon },
  { name: 'Settings', href: '/recruiter/settings', icon: Cog6ToothIcon },
];

export default function RecruiterNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || (link.href !== '/recruiter/dashboard' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3
            ${
              isActive
                ? 'bg-orange-500 text-white'
                : 'bg-gray-50 hover:bg-sky-100 hover:text-orange-500'
            }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}