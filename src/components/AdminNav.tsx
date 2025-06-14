"use client";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/home">
          <span className="btn btn-ghost text-xl text-orange-500">JOB KHUJI</span>
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto border-orange-300 focus:border-orange-500 focus:outline-none text-orange-500 placeholder-orange-400"
        />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/admin/profile">
                <span className="justify-between text-orange-500 hover:bg-orange-100">
                  Profile <span className="badge badge-warning text-white">Upgrade</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/settings">
                <span className="text-orange-500 hover:bg-orange-100">Settings</span>
              </Link>
            </li>
            <li>
              <Link href="/logout">
                <span className="text-orange-500 hover:bg-orange-100">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
