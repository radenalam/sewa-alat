import { Sewa } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Received data:", body);

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

export async function GET() {
  const sewa = await prisma.sewa.findMany();
  return NextResponse.json(sewa, { status: 200 });
}
