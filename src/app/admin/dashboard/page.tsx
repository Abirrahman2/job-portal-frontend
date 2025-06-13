'use client';
import React from 'react';
import { inter } from '@/app/ui/fonts';
import { EnvelopeIcon, BellIcon, UserCircleIcon, CogIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  return (
    <div className={`${inter.className} flex-1 p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-orange-50 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Welcome To JOB KHUJI</h1>
          <span className="text-lg font-semibold text-gray-700">ABIR</span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <EnvelopeIcon className="h-6 w-6 text-gray-600" />
          <BellIcon className="h-6 w-6 text-gray-600" />
          <UserCircleIcon className="h-6 w-6 text-gray-600" />
          <CogIcon className="h-6 w-6 text-gray-600" />
        </div>
      </div>

      {/* Overview Tabs */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm text-gray-500">OVERVIEW</span>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Monthly</button>
        <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Weekly</button>
        <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-md">Today</button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-sm text-gray-500">Total Companies</h3>
          <p className="text-2xl font-bold text-gray-900">502</p>
          <p className="text-sm text-green-500">+2.5%</p>
          <div className="h-16 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M 10 50 Q 30 20, 50 50 T 90 50" fill="none" stroke="orange" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">10,104</p>
          <p className="text-sm text-green-500">+2.5%</p>
          <div className="h-16 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M 10 50 Q 30 20, 50 50 T 90 50" fill="none" stroke="orange" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-sm text-gray-500">Job Posts</h3>
          <p className="text-2xl font-bold text-gray-900">1,344</p>
          <p className="text-sm text-green-500">+2.5%</p>
          <div className="h-16 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M 10 50 Q 30 20, 50 50 T 90 50" fill="none" stroke="orange" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-sm text-gray-500">No of Hirings</h3>
          <p className="text-2xl font-bold text-gray-900">1,122</p>
          <p className="text-sm text-green-500">+4%</p>
          <div className="h-16 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M 10 50 Q 30 20, 50 50 T 90 50" fill="none" stroke="orange" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Visitors Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Visitors Info</h3>
          <div className="flex items-center justify-center h-48">
            <svg className="w-3/4 h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="10" strokeDasharray="251.2 251.2" strokeDashoffset="188.4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="10" strokeDasharray="251.2 251.2" strokeDashoffset="188.4" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" strokeWidth="10" strokeDasharray="251.2 251.2" strokeDashoffset="125.6" transform="rotate(-90 50 50)" />
              <text x="50" y="50" textAnchor="middle" dy="0.3em" fill="#000" fontSize="12">3986</text>
              <text x="50" y="60" textAnchor="middle" dy="0.3em" fill="#666" fontSize="8">Visitors</text>
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">User</button>
          <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">Recruiter</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;