import React from 'react';
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  loading: boolean;
}

export default function StatCard({ title, value, icon, loading }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-center">
        <div className="rounded-full bg-orange-100 p-3 text-orange-500">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {loading ? (
            <div className="mt-1 h-7 w-24 animate-pulse rounded-md bg-gray-200"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}