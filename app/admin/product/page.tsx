"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  Button,
  Container,
  Flex,
  IconButton,
  Link,
  Table,
} from "@radix-ui/themes";
import axios from "axios";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import EditProductForm from "@/components/EditProductForm";
import AddProductForm from "@/components/AddProductForm";
import DeleteProductForm from "@/components/DeleteProductForm";

type Product = {
  id: number;
  name: String;
  description: String | null;
  price: number;
  image: String | null;
};

const productPage = () => {
  const [product, setProduct] = useState<Product[]>([]);

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
    <div>
      <Container className="flex flex-col">
        <div className="px-4 py-4">
          <div className="float-right py-4 px-4">
            <AddProductForm />
          </div>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Nama Barang</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Deskripsi</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Harga</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell justify={"center"}>
                  Image
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width={100} justify={"end"}>
                  Action
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {product.map((product, i) => (
                <Table.Row align="center" key={i}>
                  <Table.RowHeaderCell width={50}>
                    {product.id}
                  </Table.RowHeaderCell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>

                  <Table.Cell align="center">
                    {product.image ? (
                      <img
                        src={`${product.image}`}
                        alt={`${product.name}`}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <img
                        src="/default_camera.png" // Ganti dengan path gambar default yang sesuai
                        alt={`${product.name}`}
                        width={50}
                        height={50}
                      />
                    )}
                  </Table.Cell>

                  <Table.Cell align="right">
                    <div className="float-right space-x-0.5 flex flex-row">
                      <EditProductForm product={product} />
                      <DeleteProductForm product={product} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </Container>
    </div>
  );
};

export default productPage;
