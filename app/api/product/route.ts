import { NextRequest, NextResponse } from "next/server";
import { createProductSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createProductSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: validation.data,
  });

  return NextResponse.json(newProduct["name"] + " Berhasil di tambah", {
    status: 201,
  });
}

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(products, { status: 200 });
}
