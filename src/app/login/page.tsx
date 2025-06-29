/*'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        'http://localhost:3000/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const role = res.data.role;

      if (role === 'admin') router.push('admin/dashboard');
      else if (role === 'recruiter') router.push('/dashboard/recruiter');
      else router.push('/dashboard/user');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40">
      <h2 className="text-2xl text-orange-500 font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full bg-orange-500 text-white hover:bg-orange-600 hover:text-black">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;*/
/*'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">Login to Job Khuji</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:bg-orange-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}*/
'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 relative bg-white">
        <div className="absolute top-6 left-6">
            <Link href="/home" className="btn btn-ghost text-gray-500 hover:bg-gray-100">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Home
            </Link>
        </div>
        
        <div className="w-full max-w-md">
          <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                  <div role="alert" className="alert alert-error text-sm p-3">
                      <span>{error}</span>
                  </div>
              )}
              
              <label className="form-control w-full">
                  <div className="label"><span className="label-text">Email Address</span></div>
                  <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full" 
                      required 
                  />
              </label>

              <label className="form-control w-full">
                  <div className="label">
                      <span className="label-text">Password</span>
                      <Link href="/forgot-password" tabIndex={-1} className="label-text-alt link link-hover text-orange-600">Forgot password?</Link>
                      
                  </div>
                  <input 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full" 
                      required 
                  />
              </label>

              <div className="pt-2">
                  <button type="submit" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white w-full text-lg" disabled={loading}>
                      {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
                  </button>
              </div>
          </form>

          <p className="text-center text-gray-600 mt-8">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-orange-600 hover:underline">
                  Sign up
              </Link>
          </p>
        </div>
      </div>

     <div 
       className="hidden lg:block bg-cover bg-center bg-[url('https://www.google.com/imgres?q=login%20image&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fcyber-security-password-login-online-260nw-2194098833.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Flogin-page&docid=GKYxKL1TZmnztM&tbnid=dgpp4swPQLqSXM&vet=12ahUKEwip0uHespeOAxWYTWwGHc8IHjIQM3oECGIQAA..i&w=444&h=280&hcb=2&ved=2ahUKEwip0uHespeOAxWYTWwGHc8IHjIQM3oECGIQAA')]"
      >
        <div className="h-full w-full bg-black bg-opacity-40 flex items-end p-12">
            <div>
                <h2 className="text-4xl font-bold text-white leading-tight">Your next career move is just a few clicks away.</h2>
                <p className="text-lg text-white/80 mt-4">Join a community of top professionals and leading companies.</p>
            </div>
        </div>
      </div>
      
    </div> 
  );
}