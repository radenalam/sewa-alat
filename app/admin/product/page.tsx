"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import EditProductForm from "@/components/product/EditProductForm";
import AddProductForm from "@/components/product/AddProductForm";
import DeleteProductForm from "@/components/product/DeleteProductForm";
import { ProductProps } from "@/types/index";
import Image from "next/image";

const productPage = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);

  useEffect(() => {
    axios
      .get("/api/product")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProduct(response.data);
        } else {
          console.error("Invalid response data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-right py-4 px-4">
        <AddProductForm />
      </div>
      <div className="mx-6 my-6 border rounded-md shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="text-secondary-foreground text-center w-1/12">
                ID
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Nama Barang
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Deskripsi
              </TableHead>
              <TableHead className="text-secondary-foreground">Harga</TableHead>
              <TableHead className="text-secondary-foreground text-center">
                Image
              </TableHead>
              <TableHead className="text-secondary-foreground text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.map((product, i) => (
              <TableRow key={i}>
                <TableCell className="text-center">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>

                <TableCell align="center">
                  <img
                    src={
                      product.image
                        ? `/uploads/${product.image}`
                        : "/default_camera.png"
                    }
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                </TableCell>

                <TableCell align="right">
                  <div className="float-right space-x-0.5 flex flex-row">
                    <EditProductForm product={product} />
                    <DeleteProductForm product={product} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default productPage;
