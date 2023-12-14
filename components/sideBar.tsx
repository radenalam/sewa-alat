"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaDesktop,
  FaBookOpen,
  FaProjectDiagram,
  FaTasks,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(true);

  const links = [
    { label: "Dashboard", href: "/admin", icon: <FaDesktop /> },
    { label: "Barang", href: "/admin/products", icon: <FaProjectDiagram /> },
    { label: "Sewa", href: "/admin/sewa", icon: <FaTasks /> },
    { label: "Event", href: "/admin/events", icon: <FaCalendarAlt /> },
    { label: "Daftar Anggota", href: "/admin/anggota", icon: <FaUsers /> },
  ];
  return (
    <div
      className={`flex flex-col ${
        open ? "w-72" : "w-23"
      } h-screen px-4 py-8 bg-white border-r dark:bg-gray-100 dark:border-gray-600 `}
    >
      <div
        className="flex mx-4 space-x-2 mb-2 items-center"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <FaBookOpen />
        {open && <h1 className="text-xl">Sewa Serufo</h1>}
      </div>

      <nav className="">
        <ul className="flex flex-col pt-3">
          {links.map((link) => (
            <Link
              style={{ marginBottom: "8px" }}
              key={link.href}
              className={classnames({
                "text-zinc-200 bg-slate-400 px-2 py-2 rounded-md":
                  link.href === currentPath, //To change the color of the current page
                "text-zinc-500 px-2 py-2": link.href !== currentPath, //To change the color of the other pages
                "hover:text-zinc-300 hover:bg-slate-600 hover:px-2 hover:py-2 hover:rounded-md transition-colors":
                  true, //To change the color of the other pages when hovered
              })}
              href={link.href}
            >
              <div className="flex items-center text-xl px-2 py-1">
                {link.icon}
                {open && <span className="ml-4">{link.label}</span>}
              </div>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
