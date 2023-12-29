"use client";

import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ProductProps } from "@/types";
import axios from "axios";

const Home = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  useEffect(() => {
    axios
      .get("/api/product")
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
    <>
      <NavBar />
      <div>
        <Hero />
        <div className="flex flex-col min-h-screen">
          <div className="px-20 flex-grow">
            <h1 className="pt-20 text-3xl font-bold">Kamera Katalog</h1>
            <p className="pt-1">Explore out camera you might like</p>

            <div className=" py-10 max-w-sm">
              <Input placeholder="Kamera" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {product.map((product, i) => (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image ?? "/default_camera.png"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
