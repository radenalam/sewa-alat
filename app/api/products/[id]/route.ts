import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createProductSchema } from "@/app/validationSchema";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const products = await prisma.products.findUnique({
      where: { id: Number(params.id) },
    });

    if (!products) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching Product details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  const body = await req.json();
  try {
    // Validate the request body
    const validation = createProductSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Update the project based on the ID
    const updatedProduct = await prisma.products.update({
      where: { id: Number(params.id) },
      data: validation.data,
    });

    return NextResponse.json(updatedProduct, { status: 201 });
  } catch (error) {}
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const deletedProduct = await prisma.products.delete({
      where: { id: Number(params.id) },
    });

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}