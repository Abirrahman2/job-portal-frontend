'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

export default function UserHeader() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-box sticky top-4 z-20">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
          <Bars3Icon className="h-6 w-6" />
        </label>
      </div>

      <div className="flex-1 px-2">
         <div className="form-control hidden md:block">
            <input type="text" placeholder="Search..." className="input input-bordered w-full md:w-auto focus:border-orange-400" />
        </div>
      </div>

      <div className="flex-none gap-4">

        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BellIcon className="h-6 w-6 text-orange-500" />
            <span className="badge badge-xs badge-primary bg-orange-500 border-none indicator-item"></span>
          </div>
        </button>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2">
              <span className="text-xl font-bold text-orange-500 flex items-center justify-center h-full">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="p-2 font-semibold text-orange-600">
              Hi, {user?.firstName}!
            </li>
            <div className="divider my-0"></div>
            <li>
              <Link href="/user/profile" className="justify-between text-gray-700 
              hover:text-orange-500">
                <UserCircleIcon className="h-4 w-4" /> Profile
              </Link>
            </li>
            <li>
              <Link href="/user/settings"  className="text-gray-700 hover:text-orange-500">
                 <Cog6ToothIcon className="h-4 w-4" /> Settings
              </Link>
            </li>
            <div className="divider my-0"></div>
            <li>
              <button onClick={logout} className="text-gray-700 hover:text-orange-500 w-full text-left">
                <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}