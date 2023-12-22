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

type AnggotaProps = {
  id: string;
  nama: string;
  alamat: string;
  nomorAnggota: number;
  no_telp: number;
  angkatan: number;
};

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const { register, handleSubmit, getValues } = useForm<AnggotaProps>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [bisaPesan, setBisaPesan] = useState<boolean>(false);
  const [anggota, setAnggota] = useState<AnggotaProps | null>(null);

  useEffect(() => {
    axios.get(`/api/product/${params.id}`).then((res) => {
      setProduct(res.data.products);
    });
  }, [params.id]); // Include params.id as a dependency

  const cekAnggota = () => {
    setBisaPesan(false);
    const nomorAnggotaValue = getValues("nomorAnggota");

    axios.get(`/api/anggota/${nomorAnggotaValue}`).then((res) => {
      if (res.data.anggota) {
        setAnggota(res.data.anggota);
        console.log(anggota);
        setBisaPesan(true);
      } else {
        setBisaPesan(false);
      }
    });
  };

  const handlePesan = () => {
    console.log(anggota?.id);
    console.log(product?.id);
    // buat variable anggota dan product
    axios.post("/api/sewa", anggota).then((res) => {
      if (res.status === 201) {
        console.log(res.data);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex mx-14 my-5 bg-gray-200 border px-8 py-8 rounded-xl shadow-2xl shadow-grey-500">
        {/* Kiri */}
        <div className="w-1/2  flex flex-col items-center">
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
            </div>
          )}
        </div>
        {/* Kanan */}
        <div className="bg-slate-300 rounded-md w-1/2 flex flex-col px-8 py-4 gap-3">
          <p className="text-center mt-4 mb-8 text-2xl bg-orange-600 items-center rounded-md text-white py-2">
            Pinjam Barang
          </p>
          <div className="flex flex-row items-center justify-between ">
            <p className="mr-2">Nomor Anggota</p>
            <TextField.Root>
              <TextField.Input
                placeholder="Nomor Anggota"
                style={{ width: 190 }}
                {...register("nomorAnggota")}
              />
              <Button className="px-1 py-1 relative" onClick={cekAnggota}>
                Cek Anggota
              </Button>
            </TextField.Root>
          </div>
          {/* Detail anggota */}
          <div hidden={bisaPesan ? false : true}>
            <div className="flex flex-row items-center justify-between">
              <p>Nama</p>
              <TextField.Input
                disabled
                defaultValue={anggota?.nama}
                style={{ width: 300 }}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Alamat</p>
              <TextField.Input
                defaultValue={anggota?.alamat}
                disabled
                style={{ width: 300 }}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>No Telp</p>
              <TextField.Input
                disabled
                defaultValue={anggota?.no_telp}
                style={{ width: 300 }}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Angkatan</p>
              <TextField.Input
                disabled
                defaultValue={anggota?.angkatan}
                style={{ width: 300 }}
              />
            </div>
          </div>
          {/* SEWA */}
          <p className="text-center pt-4 text-xl">Detail Sewa</p>
          <div className="flex flex-row items-center justify-between">
            <p>Barang</p>
            <TextField.Input
              disabled
              defaultValue={product?.name}
              style={{ width: 300 }}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Harga</p>
            <TextField.Input
              disabled
              defaultValue={product?.price}
              style={{ width: 300 }}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Tanggal Mulai</p>
            <TextField.Input style={{ width: 300 }} />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Tanggal Selesai</p>
            <TextField.Input style={{ width: 300 }} />
          </div>

          <Button disabled={!bisaPesan} onClick={handleSubmit(handlePesan)}>
            Pesan
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
