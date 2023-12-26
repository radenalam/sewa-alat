"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

  return <div></div>;
}
