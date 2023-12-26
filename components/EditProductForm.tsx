"use client";

import { ProductProps } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

type EditProductFormProps = {
  product?: ProductProps;
};

const EditProduct = ({ product }: EditProductFormProps) => {
  const { handleSubmit, register } = useForm<ProductProps>({
    defaultValues: product,
  });
  const onEdit = (product: ProductProps) => {
    product.price = Number(product.price);
    if (!product.image) {
      product.image = null;
    }
    axios.put(`/api/product/${product?.id}`, product).then((response) => {
      console.log("Response:", response);
      if (response.status === 201) {
        window.location.reload();
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <FaEdit />
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 450 }}>
        <DialogTitle>Edit Barang {product?.name}</DialogTitle>
        <DialogDescription>Ubah data Produk</DialogDescription>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Title"
            {...register("name", { required: "Title is required" })}
          />
          <Input placeholder="Description" {...register("description")} />
          <Input
            placeholder="Price"
            {...register("price", { required: "Price is required" })}
          />
          <div>
            <Button onClick={handleSubmit(onEdit)}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
