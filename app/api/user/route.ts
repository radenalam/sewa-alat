import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.user.findMany();

  return NextResponse.json(products, { status: 200 });
}
