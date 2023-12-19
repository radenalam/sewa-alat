"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Inset, Strong } from "@radix-ui/themes";

type Product = {
  id: number;
  name: string; // Use lowercase 'string' instead of 'String'
  description: string | null;
  price: number;
  image: string | null;
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | undefined>(); // Specify 'undefined' here

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/${params.id}`
        );
        setProduct(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [params.id]);

  return (
    <div>
      <Card size="2" style={{ maxWidth: 240 }}>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={
              product?.image ||
              "https://cdn.pixabay.com/photo/2016/06/14/04/51/bag-1455765_1280.jpg"
            }
            alt={product?.name}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Strong>{product?.name} </Strong>
        <h2>Price: {product?.price}</h2>
        <h2>{product?.description}</h2>
      </Card>
    </div>
  );
}
