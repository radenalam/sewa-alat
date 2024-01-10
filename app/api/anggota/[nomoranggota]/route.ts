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
      return NextResponse.json({ error: "Anggota not found" }, { status: 404 });
    }

    return NextResponse.json({ anggota });
  } catch (error) {
    console.error("Error fetching anggota details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
