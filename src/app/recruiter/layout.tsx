'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RecruiterSideNav from '@/app/ui/recruiter/recruiter-sidenav';
import UserHeader from '@/components/UserHeader'; 

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'recruiter') {
      router.push('/login'); 
      return;
    }
  }, [user, loading, router]);
  if (loading || !user || user.role !== 'recruiter') {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-lg text-orange-500"></span>
      </div>
    );
  }
  return (
    <div className="drawer lg:drawer-open bg-base-200">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4">
          <UserHeader />
          <main className="flex-1 bg-base-100 rounded-box mt-4 p-6">
            {children}
          </main>
      </div> 

      <div className="drawer-side z-30">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <div className="w-64 min-h-full bg-base-200">
            <RecruiterSideNav />
        </div>
      </div>
    </div>
  );
}