import React from 'react';
import api from '@/lib/api';
export interface CompanyRequest {
  id: number;
  recId: number;
  name: string;
  email: string;
  address: string;
  tinNumber: string;
  status: string;
}

interface PendingRequestsTableProps {
  requests: CompanyRequest[];
  refetch: () => void;
}

export default function PendingRequestsTable({ requests, refetch }: PendingRequestsTableProps) {
  const handleApprove = async (requestId: number) => {
    try {
      await api.post(`/company/acceptRequestById/${requestId}`);
      alert('Request approved successfully!');
      refetch();
    } catch (error) {
      alert('Failed to approve request.');
    }
  };

  const handleReject = async (requestId: number) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      try {
        await api.delete(`/company/requests/reject/${requestId}`);
        alert('Request rejected.');
        refetch();
      } catch (error) {
        alert('Failed to reject request.');
      }
    }
  };

  return (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">TIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
             {requests.map((request) => (
              <tr key={request.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{request.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{request.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{request.tinNumber}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                        <button onClick={() => handleApprove(request.id)} className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-green-600">Approve</button>
                        <button onClick={() => handleReject(request.id)} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">Reject</button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}