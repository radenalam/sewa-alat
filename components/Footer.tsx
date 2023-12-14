"use client";

import React from "react";
import Link from "next/link";
import { BsBugFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import Image from "next/image";
import { Button } from "@radix-ui/themes";

const Footer = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex">
        <img src="/logo.svg" alt="" width={180} height={180} />
        <p>Raden Alam © 2023</p>
      </div>
    </div>
  );
};

export default Footer;
