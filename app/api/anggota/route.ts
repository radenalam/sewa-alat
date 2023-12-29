import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const sewa = await prisma.anggota.findMany();
  return NextResponse.json(sewa, { status: 200 });
}
