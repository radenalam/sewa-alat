import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { nomoranggota: Number } }
) {
  try {
    const anggota = await prisma.anggota.findUnique({
      where: { nomorAnggota: Number(params.nomoranggota) },
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

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: Number } }
// ) {
//   const body = await req.json();
//   try {
//     // Validate the request body
//     const validation = createProductSchema.safeParse(body);
//     if (!validation.success) {
//       return NextResponse.json(validation.error.format(), { status: 400 });
//     }

//     // Update the project based on the ID
//     const updatedProduct = await prisma.product.update({
//       where: { id: Number(params.id) },
//       data: validation.data,
//     });

//     return NextResponse.json(updatedProduct, { status: 201 });
//   } catch (error) {
//     console.error("Error deleting Product:", error);
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: Number } }
// ) {
//   try {
//     const deletedProduct = await prisma.product.delete({
//       where: { id: Number(params.id) },
//     });

//     if (!deletedProduct) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(deletedProduct, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting Product:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
