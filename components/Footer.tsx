"use client";

import React from "react";
import Link from "next/link";
import { BsBugFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import Image from "next/image";
import { Button, Strong } from "@radix-ui/themes";

const Footer = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <div className="flex flex-col px-4 py-4">
      <div className="flex flex-col justify-start items-start gap-6 px-2">
        <img src="/logo.svg" alt="" width={180} height={180} />
        <p>Raden Alam © 2023</p>
        <p>All Rights Reserved ©</p>
      </div>

      <div>
        <p>
          <Strong>About</Strong>
        </p>
        <p>How it Works</p>
      </div>
    </div>
  );
};

export default Footer;
