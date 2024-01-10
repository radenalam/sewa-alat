"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const Navbar = () => {
  const currentPath = usePathname();
  const { theme, setTheme } = useTheme();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className=" flex justify-between items-center px-8 bg-transparent h-24 ">
      <Link href="/">
        <Image src="/serufo.png" alt="logo" width={250} height={10} />
      </Link>
      <div className="flex items-center space-x-2">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="mr-6"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-6 w-6 rotate-0 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <a href="/admin">
          <Button>Admin</Button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
