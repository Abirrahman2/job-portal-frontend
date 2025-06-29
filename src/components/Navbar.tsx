/*import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white p-4">
      <div className="flex justify-between">
        <div className="text-xl font-bold">
          <Link href="/">JobPortal</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </div>
</nav>
  );
}*/
"use client";
import Link from "next/link";
import AcmeLogo from "@/app/ui/acme-logo";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-40">
      <div className="flex-1">
        <Link href="/home" className="btn btn-ghost text-xl text-orange-500 normal-case">
          <AcmeLogo />
          <span className="ml-2">Job Khuji</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/jobs" className="btn btn-ghost">Browse Jobs</Link></li>
          <li>
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
