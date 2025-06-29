'use client';
import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/lib/types';

export default function ProfileInfoForm() {
  const { user, setUser } = useAuth(); 
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMessage(null);

    try {
      const response=await api.patch('users/profile/update',formData)
      setUser(response.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className="card-title text-xl font-semibold">Update Your Information</h2>
        <p className="text-sm text-gray-500 mb-6">Changes to your name and address will be reflected across the platform.</p>

        {message && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="form-control w-full">
            <div className="label"><span className="label-text">First Name</span></div>
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="input input-bordered w-full" required />
          </label>
          <label className="form-control w-full">
            <div className="label"><span className="label-text">Last Name</span></div>
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="input input-bordered w-full" required />
          </label>
        </div>
        <label className="form-control w-full">
            <div className="label"><span className="label-text">Email Address</span></div>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full" required />
        </label>
        <label className="form-control w-full">
            <div className="label"><span className="label-text">Address</span></div>
            <input name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <div className="card-actions justify-end mt-4">
          <button type="submit" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}