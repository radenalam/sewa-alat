// file: /pages/api/dashboard.js
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize the time to the start of the day.

    const sewaList = await prisma.sewa.findMany({
      select: {
        tgl_mulai: true,
        tgl_selesai: true,
      },
    });

    const dashboardData = sewaList.reduce(
      (acc, sewa) => {
        const startDate = new Date(sewa.tgl_mulai);
        const endDate = new Date(sewa.tgl_selesai);

        if (startDate > today) {
          acc.pinjamanBaru += 1;
        } else if (
          startDate <= today &&
          (!sewa.tgl_selesai || endDate >= today)
        ) {
          acc.sedangDipinjam += 1;
        } else if (sewa.tgl_selesai && endDate < today) {
          acc.pinjamanSelesai += 1;
        }

        return acc;
      },
      { pinjamanBaru: 0, sedangDipinjam: 0, pinjamanSelesai: 0 }
    );

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
