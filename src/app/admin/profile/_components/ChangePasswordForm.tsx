'use client';
import React, { useState } from 'react';
import api from '@/lib/api';

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (formData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    setLoading(true);
    try {
      await api.put('/auth/changePassword', {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password. Please check your old password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className="card-title text-xl font-semibold">Change Your Password</h2>
        <p className="text-sm text-gray-500 mb-6">Choose a strong, unique password that you're not using for other accounts.</p>
        
        {message && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{message.text}</span>
          </div>
        )}

        <label className="form-control w-full">
            <div className="label"><span className="label-text">Current Password</span></div>
            <input name="oldPassword" type="password" value={formData.oldPassword} onChange={handleChange} className="input input-bordered w-full" required />
        </label>
        <label className="form-control w-full">
            <div className="label"><span className="label-text">New Password</span></div>
            <input name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} className="input input-bordered w-full" required />
        </label>
        <label className="form-control w-full">
            <div className="label"><span className="label-text">Confirm New Password</span></div>
            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="input input-bordered w-full" required />
        </label>
        
        <div className="card-actions justify-end mt-4">
          <button type="submit" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}