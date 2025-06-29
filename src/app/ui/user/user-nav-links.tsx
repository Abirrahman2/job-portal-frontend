'use client'
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentCheckIcon,
  AcademicCapIcon,
  CreditCardIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/user/dashboard', icon: HomeIcon },
  { name: 'Find Jobs', href: '/user/jobs', icon: BriefcaseIcon },
  { name: 'My Applications', href: '/user/applications', icon: DocumentCheckIcon },
  { name: 'Courses', href: '/user/courses', icon: AcademicCapIcon },
  { name: 'My Courses', href: '/user/my-courses', icon:AcademicCapIcon},
  { name: 'Billing', href: '/user/billing', icon: CreditCardIcon },
  { name: 'Profile', href: '/user/profile', icon: UserCircleIcon },
];

export default function UserNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || (link.href !== '/user/dashboard' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.name}
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