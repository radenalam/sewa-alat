import { Sewa } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Received data:", body);

  // tgl_mulai: '2023-12-22T12:30:00.000Z',
  //   tgl_selesai: '2023-12-23T15:45:00.000Z'

  const validation = Sewa.safeParse(body);

  if (!validation.success) {
    console.error("Validation error:", validation.error.format());
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newSewa = await prisma.sewa.create({
    data: validation.data,
  });

  return NextResponse.json(newSewa, { status: 201 });
}
