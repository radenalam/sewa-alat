import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const sewa = await prisma.sewa.findMany({
      where: { productId: Number(params.id) },
      select: { tgl_mulai: true, tgl_selesai: true },
    });

    if (sewa.length === 0) {
      return NextResponse.json({ status: 200 });
    }

    return NextResponse.json({ sewa });
  } catch (error) {
    console.error("Error fetching Product details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
