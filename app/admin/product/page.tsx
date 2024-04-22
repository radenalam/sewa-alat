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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import EditProductForm from "@/components/product/EditProductForm";
import AddProductForm from "@/components/product/AddProductForm";
import DeleteProductForm from "@/components/product/DeleteProductForm";
import { ProductProps } from "@/types/index";
import Image from "next/image";

const ProductPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = (page: number) => {
    axios
      .get(`/api/product?page=${page}&limit=10`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Invalid response data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

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
              <TableHead className="text-secondary-foreground text-end">
                Harga
              </TableHead>
              <TableHead className="text-secondary-foreground text-center">
                Image
              </TableHead>
              <TableHead className="text-secondary-foreground text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => (
              <TableRow key={i}>
                <TableCell className="text-center">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-end">
                  {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell align="center">
                  <Image
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
                <TableCell>
                  <div className="flex flex-row space-x-2">
                    <EditProductForm product={product} />
                    <DeleteProductForm product={product} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="py-4 flex justify-center">
          <Button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
