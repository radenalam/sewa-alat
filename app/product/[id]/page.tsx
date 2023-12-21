"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductProps } from "@/types/index";
import Image from "next/image";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Tabs,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const { handleSubmit, register } = useForm<ProductProps>({});
  const [product, setProduct] = useState<ProductProps | null>(null);

  useEffect(() => {
    axios.get(`/api/product/${params.id}`).then((res) => {
      setProduct(res.data.products);
      console.log(res.data.products);
    });
  }, [params.id]); // Include params.id as a dependency

  return (
    <>
      <Navbar />
      <div className="flex mx-14 my-5 bg-gray-200 border px-2 py-2 rounded-xl">
        <div className="w-1/2 bg-red-100 flex flex-col items-center">
          {product && (
            <div>
              <Image
                className=""
                src={product.image ?? "/default_camera.png"}
                alt={product.name}
                width={400}
                height={400}
              />

              <p>Name: {product.name}</p>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Image: {product.image}</p>
            </div>
          )}
        </div>

        <div className="w-1/2 bg-blue-100 flex flex-col justify-center items-center">
          <div className="flex flex-row items-center">
            <label className="mr-2">Nama</label>
            <TextField.Input
              placeholder="Nama"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="mr-2">Alamat</label>
            <TextField.Input
              placeholder="Alamat"
              {...register("name", { required: "alamat is required" })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
