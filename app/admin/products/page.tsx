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

type Product = {
  id: number;
  name: String;
  description: String | null;
  price: number;
  image: String | null;
};

const productPage = () => {
  const [product, setProduct] = useState<Product[]>([]);

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(product.filter((item) => item.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting project:", error));
  };

  useEffect(() => {
    axios
      .get("/api/products")
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
      <Container>
        <div className="float-right">
          <AddProductForm />
        </div>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nama Barang</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Deskripsi</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Harga</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-right">
                Action
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {product.map((product, i) => (
              <Table.Row key={i}>
                <Table.RowHeaderCell>
                  <Link href={`/products/${product.id}`}>{product.id}</Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>

                <Table.Cell>
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
                      width={30}
                      height={30}
                    />
                  )}
                </Table.Cell>

                <Table.Cell className="text-right space-x-0.5">
                  <EditProductForm product={product} />

                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <IconButton color="red">
                        <FaRegTrashAlt width="10" height="10" />
                      </IconButton>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content style={{ maxWidth: 450 }}>
                      <AlertDialog.Title>
                        Delete {product.name}
                      </AlertDialog.Title>
                      <AlertDialog.Description size="2">
                        Apakah anda yakin menghapus {product.name} ?
                      </AlertDialog.Description>

                      <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                          <Button
                            variant="solid"
                            color="red"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete Product
                          </Button>
                        </AlertDialog.Action>
                      </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </div>
  );
};

export default productPage;
