'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { User } from '@/lib/types';
import api from '@/lib/api';
import UsersTable from './UserTable';

type Tab = 'users' | 'recruiters';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [recruiters, setRecruiters] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, recruitersRes] = await Promise.all([
        api.get('/users/user'),
        api.get('/users/recruiter'),
      ]);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setRecruiters(Array.isArray(recruitersRes.data) ? recruitersRes.data : []);

    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Could not load user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderContent = () => {
    if (loading) {
      return <div className="p-6 text-center">Loading...</div>;
    }
    if (error) {
      return <div className="p-6 text-center text-red-600">{error}</div>;
    }
    if (activeTab === 'users') {
      return <UsersTable users={users} title="Registered Users" refetch={fetchData} />;
    }
    if (activeTab === 'recruiters') {
      return <UsersTable users={recruiters} title="Registered Recruiters" refetch={fetchData} />;
    }
  };
  
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">User Management</h1>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('recruiters')}
            className={`${
              activeTab === 'recruiters'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Recruiters ({recruiters.length})
          </button>
        </nav>
      </div>

      {renderContent()}
    </div>
  );
}
