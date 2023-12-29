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
import ImageUploader from "@/components/product/ImageUploader";
import { useState } from "react";

type AddProductFormProps = {
  product?: ProductProps;
};

const ProductForm = (product: AddProductFormProps) => {
  const { handleSubmit, register, setValue } = useForm<ProductProps>({});
  const [fileName, setFileName] = useState<string>("");

  const handleImageUploadComplete = (filename: any) => {
    setFileName(filename);

    // Juga, jika perlu, Anda dapat menambahkannya ke dalam nilai form
    setValue("image", filename);
  };
  const onSubmit = (product: ProductProps) => {
    product.price = Number(product.price);
    if (!product.image) {
      product.image = null;
    }
    if (!product.description) {
      product.description = null;
    }
    product.image = `/${fileName}`;

    console.log(product.image);
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
        {" "}
        <DialogTrigger className="text-white bg-slate-500 px-3 py-2 rounded-md">
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
            <ImageUploader uploadSelesai={handleImageUploadComplete} />
          </div>

          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
