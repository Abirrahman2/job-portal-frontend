'use client';
import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
export default function ApplyButton({ jobId }: { jobId: number }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleApply = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (user?.role !== 'user') {
      alert("Only users can apply for jobs.");
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await api.post('/upload/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const relativePath = uploadResponse.data.file.path.replace(/\\/g, '/');
     // const resumeUrl = `http://localhost:3000/${uploadResponse.data.file.path}`; 
      const resumeUrl=`${api.defaults.baseURL}/${relativePath}`;
      await api.post('/applications/apply', { jobId, resumeUrl });
      
      setSuccess('Application submitted successfully!');

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return <div className="alert alert-success">{success}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleApply}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
      <button
        onClick={handleFileSelect}
        disabled={isLoading}
        className="btn btn-lg btn-primary bg-orange-600 hover:bg-orange-700 border-none text-white"
      >
        {isLoading ? <span className="loading loading-spinner"></span> : 'Upload Resume & Apply'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}