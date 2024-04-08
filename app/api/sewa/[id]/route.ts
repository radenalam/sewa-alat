import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const sewa = await prisma.sewa.findMany({
      where: { productId: Number(params.id) },
      select: { tgl_mulai: true, tgl_selesai: true },
    });

    if (sewa.length === 0) {
      return NextResponse.json({ status: 200 });
    }

    return NextResponse.json({ sewa });
  } catch (error) {
    console.error("Error fetching Product details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const deletedSewa = await prisma.sewa.delete({
      where: { id: Number(params.id) },
    });

    if (!deletedSewa) {
      return NextResponse.json({ error: "Sewa not found" }, { status: 404 });
    }
    return NextResponse.json(deletedSewa, { status: 201 });
  } catch (error) {
    console.error("Error deleting Product:", error);
  }
}
