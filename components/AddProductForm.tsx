"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { ProductProps } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";

type AddProductFormProps = {
  product?: ProductProps;
};

const ProductForm = () => {
  const { handleSubmit, register } = useForm<ProductProps>({});

  const onSubmit = (product: ProductProps) => {
    product.price = Number(product.price);
    if (!product.image) {
      product.image = null;
    }
    if (!product.description) {
      product.description = null;
    }
    axios
      .post("/api/product", product)
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 201) {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error creating project:", error));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="textwhite bg-slate-500 px-3 py-2 rounded-md">
          Tambah Barang
        </DialogTrigger>

        <DialogContent style={{ maxWidth: 450 }}>
          <DialogTitle>Tambah Barang</DialogTitle>
          <DialogDescription>Masukan data produk</DialogDescription>

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
            <ImageUploader />
          </div>

          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
