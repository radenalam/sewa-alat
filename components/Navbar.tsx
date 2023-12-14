"use client";

import React from "react";
import Link from "next/link";
import { BsBugFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import Image from "next/image";
import { Button } from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <div className="flex items-center space-x-2">
        <Link
          href={"/admin"}
          className="text bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-300 hover:px-3 hover:py-2 hover:rounded-md transition"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
