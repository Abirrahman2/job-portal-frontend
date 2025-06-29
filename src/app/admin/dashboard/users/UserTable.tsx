'use client';
import React from 'react';
import { User } from '@/lib/types';
import api from '@/lib/api';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface UsersTableProps {
  users: User[];
  title: string;
  refetch: () => void;
}

export default function UsersTable({ users, title, refetch }: UsersTableProps) {

  const handleDelete = async (userId: number, userName: string) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      try {
        await api.delete(`/users/delete/${userId}`);
        alert('User deleted successfully.');
        refetch();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.address}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id, `${user.firstName} ${user.lastName}`)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}