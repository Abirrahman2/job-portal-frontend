'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  address: string;
  age: number;
  adminDetails?: { dashboardAccess: boolean; manageUsers: boolean; manageCompanies: boolean };
  recruiterDetails?: { companyManagement: boolean; jobPosting: boolean };
  userDetails?: { jobApplications: any[] };
}
const page = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/profile', {
          withCredentials: true,
        });
        if (response.data.role !== 'admin') {
          router.push('/profile');
        } else {
          setProfile(response.data);
        }
      } catch (err) {
        setError('Failed to fetch profile. Please log in.');
        router.push('/login');
      }
    };
    fetchProfile();
  }, [router]);

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  if (!profile) {
    return <div className="p-6">Loading...</div>;
  }
   return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Admin Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Age:</strong> {profile.age}</p>

        {profile.adminDetails && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Admin Permissions</h2>
            <p><strong>Dashboard Access:</strong> {profile.adminDetails.dashboardAccess ? 'Yes' : 'No'}</p>
            <p><strong>Manage Users:</strong> {profile.adminDetails.manageUsers ? 'Yes' : 'No'}</p>
            <p><strong>Manage Companies:</strong> {profile.adminDetails.manageCompanies ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;