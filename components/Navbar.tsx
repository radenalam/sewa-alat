"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className=" mx-auto flex justify-between items-center sm:px-16 px-2 py-4 bg-transparent">
      <Link href={"/"}>
        <Image src="/logo.svg" alt="logo" width={180} height={180} />
      </Link>
      <div className="flex items-center space-x-2">
        <Link
          href="/admin"
          replace
          className="text bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-300 hover:px-3 hover:py-2 hover:rounded-md transition"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
