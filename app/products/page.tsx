"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Link,
  Table,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";

type Product = {
  id: number;
  name: String;
  description: String | null;
  price: number;
  image: String | null;
};

const productPage = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const { register, handleSubmit } = useForm<Product>({});
  const onSubmit = (data: Product) => {
    data.price = Number(data.price);
    if (!data.image) {
      data.image = null;
    }
    axios
      .post("/api/products", data)
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 201) {
          setProduct([...product, response.data]);
        }
      })
      .catch((error) => console.error("Error creating project:", error));
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
    <Container>
      <DialogRoot>
        <DialogTrigger>
          <Button className="float-right" mx="3" my="3">
            Tambah Barang
          </Button>
        </DialogTrigger>

        <DialogContent style={{ maxWidth: 500 }}>
          <DialogTitle>Add Project</DialogTitle>
          <TextField.Input
            mb="2"
            placeholder="Title"
            {...register("name", { required: "Title is required" })}
          />
          <TextArea
            mb="2"
            placeholder="Description"
            {...register("description")}
          />
          <TextField.Input
            mb="2"
            placeholder="Price"
            {...register("price", { required: "Price is required" })}
          />
          <DialogClose>
            <Button onClick={handleSubmit(onSubmit)} className="float-right">
              Save
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className="float-right">Close</Button>
          </DialogClose>
        </DialogContent>
      </DialogRoot>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Nama Barang</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Deskripsi</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Harga</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {product.map((product, i) => (
            <Table.Row key={i}>
              <Table.RowHeaderCell>
                <Link href={`/product/${product.id}`}>{product.id}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Link href={`/product/${product.id}`}>{product.name}</Link>
              </Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.id}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
};

export default productPage;
