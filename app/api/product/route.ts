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

export async function GET(req: NextRequest) {
  // Parsing URL untuk mendapatkan query parameters
  const url = new URL(req.url);
  let page = parseInt(url.searchParams.get("page") || "1", 10);
  let limit = parseInt(url.searchParams.get("limit") || "10", 10);
  let searchQuery = url.searchParams.get("search") || "";

  // Menghitung jumlah skip
  let skip = (page - 1) * limit;

  // Membuat filter pencarian
  let filter = {};
  if (searchQuery) {
    filter = {
      OR: [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ],
    };
  }

  // Query ke database dengan pagination dan filter pencarian
  const products = await prisma.product.findMany({
    take: limit,
    skip: skip,
    where: filter,
  });

  // Opsi: Hitung total produk untuk informasi pagination
  const totalProducts = await prisma.product.count({ where: filter });
  const totalPages = Math.ceil(totalProducts / limit);

  // Mengembalikan produk dengan status 200
  return NextResponse.json({ products, totalPages }, { status: 200 });
}
