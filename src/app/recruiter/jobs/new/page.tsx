'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
interface JobFormData {
  title: string;
  description: string;
  location: string;
  jobType: string;
}

export default function PostNewJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    jobType: 'Full-time', 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!user?.companyId) {
        setError("Your company profile is not yet approved or linked. You cannot post jobs until an admin approves your company.");
        return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      
      const response = await api.post('/jobs/create', formData);
      setSuccess('Job posted successfully! Redirecting to your job posts...');
      setTimeout(() => {
        router.push('/recruiter/jobs');
      }, 2000);
    } catch (err: any) {
      console.error("Failed to post job:", err);
      setError(err.response?.data?.message || 'An error occurred while posting the job.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
      return (
          <div className="text-center py-20">
              <div className="alert alert-success max-w-lg mx-auto">
                  <span>{success}</span>
              </div>
          </div>
      );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/recruiter/jobs" className="btn btn-ghost">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to My Job Posts
        </Link>
      </div>
      
      <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="card-body p-8 md:p-10">
          <h1 className="card-title text-3xl font-bold">Post a New Job Opening</h1>
          <p className="text-gray-500">You are posting on behalf of: <span className="font-semibold text-orange-600">{user?.company?.name || 'Your Company'}</span></p>

          <div className="divider"></div>

          {error && <div className="alert alert-error"><span>{error}</span></div>}

          <div className="space-y-6">
            
            <h3 className="font-bold text-lg">Job Details</h3>
            <label className="form-control w-full">
                <div className="label"><span className="label-text">Job Title</span></div>
                <input name="title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" placeholder="Senior Frontend Developer" required />
            </label>
            <label className="form-control w-full">
                <div className="label"><span className="label-text">Job Description</span></div>
                <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered h-32" placeholder="Describe the role, responsibilities, and requirements" required></textarea>
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="form-control w-full">
                    <div className="label"><span className="label-text">Location</span></div>
                    <input name="location" value={formData.location} onChange={handleChange} className="input input-bordered w-full" placeholder="e.g., Dhaka or Remote" required />
                </label>
                <label className="form-control w-full">
                    <div className="label"><span className="label-text">Job Type</span></div>
                    <select name="jobType" value={formData.jobType} onChange={handleChange} className="select select-bordered">
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                    </select>
                </label>
            </div>
          </div>
          
          <div className="card-actions justify-end mt-8">
            <button type="submit" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white text-lg" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}