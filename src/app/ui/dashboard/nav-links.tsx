'use client'
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  DocumentCheckIcon,
  NewspaperIcon,
  CogIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },
  { name: 'Companies', href: '/dashboard/companies', icon: BuildingOfficeIcon },
  { name: 'Job States', href: '/dashboard/job-states', icon: BriefcaseIcon },
  { name: 'Mails', href: '/dashboard/mails', icon: EnvelopeIcon },
  { name: 'Applications', href: '/dashboard/applications', icon: DocumentCheckIcon },
  { name: 'Newsletter', href: '/dashboard/newsletter', icon: NewspaperIcon },
  { name: 'Actions', href: '/dashboard/actions', icon: CogIcon },
  { name: 'Privacy Policy', href: '/dashboard/privacy-policy', icon: ShieldCheckIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <a
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${
              isActive
                ? 'bg-orange-500 text-white'
                : 'bg-gray-50 hover:bg-sky-100 hover:text-orange-500'
            }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}