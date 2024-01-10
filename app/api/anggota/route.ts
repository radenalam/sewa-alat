import prisma from "@/prisma/client";
import { Anggota } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const anggota = await prisma.anggota.findMany();
  return NextResponse.json(anggota, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = Anggota.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newSewa = await prisma.anggota.create({
    data: validation.data,
  });
  return NextResponse.json(newSewa, { status: 201 });
}
