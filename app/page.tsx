"use client";

import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ProductProps } from "@/types";
import axios from "axios";
import Loading from "./loading";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Home = () => {
  // Di awal komponen
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fungsi untuk mengganti halaman
  const changePage = (newPage: any) => {
    setCurrentPage(newPage);
  };
  const [product, setProduct] = useState<ProductProps[]>([]);
  useEffect(() => {
    axios
      .get(`/api/product?page=${currentPage}&limit=8`)
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data.products)) {
          setProduct(response.data.products);
          setTotalPages(response.data.totalPages); // Menyimpan total halaman
        } else {
          console.error(
            "Invalid response data format:",
            response.data.products
          );
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [currentPage]); // Tambahkan currentPage sebagai dependency
  return (
    <>
      <NavBar />
      <div>
        <Hero />
        <div className="flex flex-col min-h-screen">
          <div className="px-8 md:px-20 flex-grow">
            <h1 className="pt-20 text-3xl font-bold">Kamera Katalog</h1>
            <p className="pt-1">Explore out camera you might like</p>

            <div className=" py-10 max-w-sm">
              <Input placeholder="Kamera" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
              {product.map((product, i) => (
                <ProductCard
                  key={i}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={
                    product.image
                      ? `/uploads/${product.image}`
                      : "/default_camera.png"
                  }
                />
              ))}
            </div>
            <div className="pt-4 flex items-center space-x-3 justify-center">
              {currentPage > 1 && (
                <Button onClick={() => changePage(currentPage - 1)}>
                  Sebelumnya
                </Button>
              )}
              <span>
                Halaman {currentPage} dari {totalPages}
              </span>
              {currentPage < totalPages && (
                <Button onClick={() => changePage(currentPage + 1)}>
                  Berikutnya
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
