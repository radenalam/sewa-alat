import prisma from "@/prisma/client";
import { NonAnggota } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const sewa = await prisma.nonAnggota.findMany();
  return NextResponse.json(sewa, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = NonAnggota.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const data = await prisma.nonAnggota.create({
    data: validation.data,
  });
  return NextResponse.json(data.id, { status: 201 });
}
