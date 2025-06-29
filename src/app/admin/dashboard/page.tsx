'use client';
import React, { useEffect, useState } from 'react';
import StatCard from '@/app/ui/dashboard/StatCard';
import { UserGroupIcon, BuildingOfficeIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import api from '@/lib/api';

interface DashboardStats {
  totalUsers: number;
  totalRecruiters: number;
  totalCompanies: number;
  totalJobs: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          usersRes,
          recruitersRes,
          companiesRes,
        //  jobsRes
        ] = await Promise.all([
          api.get('/users/userCount/user'),
          api.get('/users/userCount/recruiter'),
          api.get('/company/countcompany'),
         // api.get('/jobs/admin/count')
        ]);

        setStats({
          totalUsers: usersRes.data,
          totalRecruiters: recruitersRes.data,
          totalCompanies: companiesRes.data.count,
          totalJobs: 0,
        });

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {error && <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          loading={loading}
          icon={<UserIcon className="h-6 w-6" />}
        />
        <StatCard 
          title="Total Recruiters"
          value={stats?.totalRecruiters ?? 0}
          loading={loading}
          icon={<UserGroupIcon className="h-6 w-6" />}
        />
        <StatCard 
          title="Total Companies"
          value={stats?.totalCompanies ?? 0}
          loading={loading}
          icon={<BuildingOfficeIcon className="h-6 w-6" />}
        />
        <StatCard 
          title="Total Job Posts"
          value={stats?.totalJobs ?? 0}
          loading={loading}
          icon={<BriefcaseIcon className="h-6 w-6" />}
        />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700">Recent Activity</h2>
        <div className="mt-4 rounded-lg bg-white p-6 shadow-md">
          <p className="text-gray-500">Charts and recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;