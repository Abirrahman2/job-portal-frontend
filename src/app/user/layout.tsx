'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserSideNav from '../ui/user/user-sidenav';
import UserHeader from '@/components/UserHeader';
export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (user.role !== 'user') {
      router.push('/'); 
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-dots loading-lg text-orange-500"></span>
      </div>
    );
  }

   return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center p-4">
          <div className="w-full max-w-7xl">
              <UserHeader />
              <main className="mt-6">
                {children}
              </main>
          </div>
      </div> 
      
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <div className="w-64 min-h-full bg-base-200">
            <UserSideNav />
        </div>
      </div>
    </div>
  );
}