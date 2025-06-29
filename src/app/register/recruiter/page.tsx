'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RecruiterRegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', userEmail: '', password: '', address: '',
        companyName: '', companyType: '', companyEmail: '', companyAddress: '', website: '', tinNumber: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await api.post('/auth/signup/recruiter', formData);
            setSuccess(response.data.message + " You will be redirected to the login page shortly.");
            setTimeout(() => {
                router.push('/login');
            }, 4000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {success ? (
                    <div className="card bg-base-100 shadow-xl p-10 text-center">
                        <div className="alert alert-success flex flex-col gap-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-10 w-10" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           <h3 className="text-xl font-bold">Success!</h3>
                           <span className="text-center">{success}</span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-8 space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800">Recruiter Registration</h1>
                            <p className="text-gray-500 mt-2">Create your account and register your company for approval.</p>
                        </div>

                        {error && <div className="alert alert-error text-sm"><span>{error}</span></div>}
                        
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="font-bold text-lg mb-4 text-orange-600">Your Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="form-control w-full">
                                    <div className="label"><span className="label-text">First Name</span></div>
                                    <input name="firstName" onChange={handleChange} className="input input-bordered w-full" required />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label"><span className="label-text">Last Name</span></div>
                                    <input name="lastName" onChange={handleChange} className="input input-bordered w-full" required />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label"><span className="label-text">Your Email</span></div>
                                    <input name="userEmail" type="email" onChange={handleChange} className="input input-bordered w-full" required />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label"><span className="label-text">Password</span></div>
                                    <input name="password" type="password" onChange={handleChange} className="input input-bordered w-full" required />
                                </label>
                                <label className="form-control w-full md:col-span-2">
                                    <div className="label"><span className="label-text">Your Address</span></div>
                                    <input name="address" onChange={handleChange} className="input input-bordered w-full" required />
                                </label>
                            </div>
                        </div>

                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="font-bold text-lg mb-4 text-blue-600">Company Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="form-control w-full"><div className="label"><span className="label-text">Company Name</span></div><input name="companyName" onChange={handleChange} className="input input-bordered w-full" required /></label>
                                <label className="form-control w-full"><div className="label"><span className="label-text">Company Type</span></div><input name="companyType" onChange={handleChange} placeholder="e.g., Technology, Finance" className="input input-bordered w-full" required /></label>
                                <label className="form-control w-full"><div className="label"><span className="label-text">Company Email</span></div><input name="companyEmail" type="email" onChange={handleChange} className="input input-bordered w-full" required /></label>
                                <label className="form-control w-full"><div className="label"><span className="label-text">Company Website (Optional)</span></div><input name="website" onChange={handleChange} className="input input-bordered w-full" /></label>
                                <label className="form-control w-full md:col-span-2"><div className="label"><span className="label-text">Company Address</span></div><input name="companyAddress" onChange={handleChange} className="input input-bordered w-full" required /></label>
                                <label className="form-control w-full md:col-span-2"><div className="label"><span className="label-text">Company TIN Number (12 Digits)</span></div><input name="tinNumber" onChange={handleChange} className="input input-bordered w-full" required /></label>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none w-full text-white text-lg" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : "Create Account & Submit for Approval"}
                            </button>
                        </div>
                        <p className="text-center text-sm mt-4">Already registered? <Link href="/login" className="link link-hover text-orange-600">Log in</Link></p>
                    </form>
                )}
            </div>
        </div>
    );
}