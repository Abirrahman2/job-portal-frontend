'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CreateUserDto } from '@/lib/types';

export default function UserRegisterPage() {
    const [formData, setFormData] = useState<Omit<CreateUserDto, 'role' | 'isActive'>>({
        firstName: '', lastName: '', email: '', password: '', address: '', age: 0,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'age' ? parseInt(value, 10) || 0 : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await api.post('/users/addUser', {
                ...formData,
                role: 'user',
            });
            setSuccess(response.data.message + " Redirecting to login...");
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {success ? (
                     <div className="alert alert-success"><span>{success}</span></div>
                ) : (
                    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
                            <p className="text-gray-500 mt-2">Find your dream job today.</p>
                        </div>
                        {error && <div className="alert alert-error text-sm"><span>{error}</span></div>}

                        <label className="form-control w-full">
                            <div className="label"><span className="label-text">First Name</span></div>
                            <input name="firstName" onChange={handleChange} className="input input-bordered w-full" required />
                        </label>
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text">Last Name</span></div>
                            <input name="lastName" onChange={handleChange} className="input input-bordered w-full" required />
                        </label>
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text">Email Address</span></div>
                            <input name="email" type="email" onChange={handleChange} className="input input-bordered w-full" required />
                        </label>
                         <label className="form-control w-full">
                            <div className="label"><span className="label-text">Password</span></div>
                            <input name="password" type="password" onChange={handleChange} className="input input-bordered w-full" required />
                        </label>
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text">Address</span></div>
                            <input name="address" onChange={handleChange} className="input input-bordered w-full" required />
                        </label>
                         <label className="form-control w-full">
                            <div className="label"><span className="label-text">Age</span></div>
                            <input name="age" type="number" onChange={handleChange} className="input input-bordered w-full" required />
                        </label>

                        <button type="submit" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none w-full text-white text-lg" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                        </button>

                        <p className="text-center text-sm mt-4">Already have an account? <Link href="/login" className="link link-hover text-orange-600">Log In</Link></p>
                    </form>
                )}
            </div>
        </div>
    );
}