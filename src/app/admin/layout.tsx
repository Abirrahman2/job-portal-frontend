'use client'
import SideNav from '@/app/ui/dashboard/sidenav';
import AdminNavbar from '@/components/AdminNav';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'admin') {
      
      router.push('/login'); 
      return;
    }
  }, [user, loading, router]);

  
  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 overflow-y-auto bg-gray-100">
          <SideNav />
        </aside>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}