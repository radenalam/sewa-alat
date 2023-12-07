import { NextRequest, NextResponse } from "next/server";
import { createProductSchema } from "../../validationSchema";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createProductSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newProduct = await prisma.products.create({
    data: validation.data,
  });

  return NextResponse.json(newProduct["name"] + " Berhasil di tambah", {
    status: 201,
  });
}

export async function GET() {
  const products = await prisma.products.findMany();

  return NextResponse.json(products, { status: 200 });
}
