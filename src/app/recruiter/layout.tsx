import SideNav from '@/app/ui/dashboard/sidenav';
import AdminNavbar from '@/components/AdminNav';

export default function Layout({ children }: { children: React.ReactNode }) {
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