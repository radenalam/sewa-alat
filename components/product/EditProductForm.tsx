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
  const { handleSubmit, register } = useForm<ProductProps>();
  const onEdit = (formData: ProductProps) => {
    const updatedProduct = {
      ...formData,
      price: Number(formData.price),
    };
    axios
      .patch(`/api/product/${product?.id}`, updatedProduct)
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 201) {
          window.location.reload();
        }
      });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <FaEdit className="h-6 w-6" />
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 450 }}>
        <DialogTitle>Edit Barang {product?.name}</DialogTitle>
        <DialogDescription>Ubah data Produk</DialogDescription>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Title"
            defaultValue={product?.name}
            {...register("name", { required: "Title is required" })}
          />
          <Input
            placeholder="Description"
            defaultValue={product?.description ?? ""}
            {...register("description")}
          />
          <Input
            placeholder="Price"
            defaultValue={product?.price}
            {...register("price", { required: "Price is required" })}
          />
          <img
            src={
              product?.image
                ? `/uploads/${product.image}`
                : "/default_camera.png"
            }
            alt="Product Image"
            width={250}
            height={250}
            style={{ margin: "auto" }}
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
