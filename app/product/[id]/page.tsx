"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductProps } from "@/types/index";
import Image from "next/image";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductProps | null>(null);

  useEffect(() => {
    axios.get(`/api/product/${params.id}`).then((res) => {
      setProduct(res.data.products);
      console.log(res.data.products);
    });
  }, [params.id]); // Include params.id as a dependency

  return (
    <div>
      <Navbar />
      <div className="mx-8">Product Details {params.id}</div>
      {product && (
        <div>
          <div>Name: {product.name}</div>
          <div>Description: {product.description}</div>
          <div>Price: {product.price}</div>
          <div>Image: {product.image}</div>
          <Image
            src={product.image ?? "/default_camera.png"}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
