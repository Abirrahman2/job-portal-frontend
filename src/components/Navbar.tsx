"use client";
import Link from "next/link";

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
}
