/*import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { inter } from '@/app/ui/fonts';
export const metadata: Metadata = {
  title: "Job Portal",
  description: "Find jobs and hire talent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}*/

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import { AuthProvider } from "@/context/AuthContext";
import { getSessionUser } from "@/lib/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Khuji",
  description: "Your next job is here",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const user = await getSessionUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
