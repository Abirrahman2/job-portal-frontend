/*import React from 'react';

const Companies = () => {
    return (
        <div>
            this is companies...
        </div>
    );
};

export default Companies;*/
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import ApprovedCompaniesTable, { Company } from './ApprovedCompaniesTable';
import PendingRequestsTable, { CompanyRequest } from './PendingRequestsTable';

type Tab = 'approved' | 'pending';

export default function CompanyManagementPage() {
  const [approved, setApproved] = useState<Company[]>([]);
  const [pending, setPending] = useState<CompanyRequest[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('approved');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [approvedRes, pendingRes] = await Promise.all([
        api.get('/company/companyAll'),
        api.get('/company/requests/pending'),
      ]);
      setApproved(Array.isArray(approvedRes.data) ? approvedRes.data : []);
      setPending(pendingRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Loading companies...</p>;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Company Management</h1>
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('approved')} className={`${activeTab === 'approved' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500'} ...`}>Approved ({approved.length})</button>
            <button onClick={() => setActiveTab('pending')} className={`${activeTab === 'pending' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500'} ...`}>Pending ({pending.length})</button>
        </nav>
      </div>
      {activeTab === 'approved' 
        ? <ApprovedCompaniesTable companies={approved} /> 
        : <PendingRequestsTable requests={pending} refetch={fetchData} />
      }
    </div>
  );
}