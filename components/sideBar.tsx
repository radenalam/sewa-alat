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
import Login from "@/components/Login";

const Sidebar = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(true);

  const links = [
    { label: "Dashboard", href: "/admin", icon: <FaDesktop /> },
    { label: "Barang", href: "/admin/product", icon: <FaProjectDiagram /> },
    { label: "Daftar Sewa", href: "/admin/sewa", icon: <FaTasks /> },
    { label: "Daftar Anggota", href: "/admin/anggota", icon: <FaUsers /> },
    { label: "Home", href: "/", icon: <FaUsers /> },
  ];
  return (
    <div
      className={`flex flex-col ${
        open ? "w-72" : "w-23"
      } h-screen px-4 py-8 bg-primary-foreground `}
    >
      <div
        className="flex mx-4 space-x-2 mb-2 items-center"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <FaBookOpen />
        {open && <h1 className="text-xl">Admin Rental</h1>}
      </div>

      <nav className="">
        <ul className="flex flex-col pt-3">
          {links.map((link) => (
            <Link
              style={{ marginBottom: "8px" }}
              key={link.href}
              className={classnames({
                "text-background bg-accent-foreground px-2 py-2 rounded-md":
                  link.href === currentPath, //Current
                " px-2 py-2": link.href !== currentPath, //Other
                "text-foregound hover:bg-accent hover:px-2 hover:py-2 hover:rounded-md transition-colors":
                  true, //Hover
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
        <ul>
          <div className="px-2 py-2 rounded-md">
            <Login />
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
