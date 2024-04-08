import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { nomoranggota: Number } }
) {
  try {
    const anggota = await prisma.anggota.findUnique({
      where: { nomorAnggota: Number(params.nomoranggota) },
    });

    if (!anggota) {
      // Instead of just returning a 404 status, return a JSON object with a clear indication
      return NextResponse.json(
        { error: true, message: "Anggota not found" },
        { status: 404 }
      );
    }

    // Return the found anggota with a success status code (optional)
    return NextResponse.json({ anggota }, { status: 200 });
  } catch (error) {
    console.error("Error fetching anggota details:", error);
    return NextResponse.json(
      { error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
