import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}