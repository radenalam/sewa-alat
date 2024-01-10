import { Anggota } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const anggota = await prisma.anggota.findUnique({
      where: { id: Number(params.id) },
    });

    if (!anggota) {
      return NextResponse.json({ error: "Anggota not found" }, { status: 404 });
    }

    return NextResponse.json({ anggota });
  } catch (error) {
    console.error("Error fetching anggota details:", error);
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
    const validation = Anggota.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Update the project based on the ID
    const updatedAnggota = await prisma.anggota.update({
      where: { id: Number(params.id) },
      data: validation.data,
    });

    return NextResponse.json(updatedAnggota, { status: 201 });
  } catch (error) {
    console.error("Error deleting Product:", error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: Number } }
) {
  try {
    const deletedAnggota = await prisma.anggota.delete({
      where: { id: Number(params.id) },
    });

    if (!deletedAnggota) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(deletedAnggota, { status: 200 });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
