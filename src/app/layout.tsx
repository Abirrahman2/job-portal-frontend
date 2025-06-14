import "./globals.css";
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
}
