"use client";
import React, { useState, useEffect } from "react";

const Card = ({ title, value }: any) => {
  return (
    <div className="border p-4 flex flex-col justify-between items-center shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl">{value}</p>
    </div>
  );
};

const AdminDashboardPage = () => {
  // State to store dashboard data
  const [dashboardData, setDashboardData] = useState({
    pinjamanBaru: 0,
    sedangDipinjam: 0,
    pinjamanSelesai: 0,
  });

  // Function to fetch dashboard data from the API
  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Fetching dashboard data failed", error);
      // Handle error state here, if necessary
    }
  };

  // UseEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex mx-5 my-5 border bg-secondary h-auto shadow-md rounded-lg p-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
        <Card title="Pesanan Baru" value={dashboardData.pinjamanBaru} />
        <Card title="Sedang dipinjam" value={dashboardData.sedangDipinjam} />
        <Card
          title="Peminjaman Selesai"
          value={dashboardData.pinjamanSelesai}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
