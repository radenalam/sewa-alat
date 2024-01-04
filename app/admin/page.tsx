"use client";

import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession, signIn } from "next-auth/react";

const AdminDashboardPage = () => {
  return (
    <div className="flex mx-5 my-5 border bg-slate-400 h-96 items-center justify-center ">
      {/* Selamat Datang Admin {JSON.stringify(session?.user?.name)} */}
    </div>
  );
};

export default AdminDashboardPage;
