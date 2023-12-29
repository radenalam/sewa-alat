"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductProps, SewaProps } from "@/types/index";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { format, isSameDay } from "date-fns";
import { FaCalendarMinus } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { Sewa } from "@prisma/client";

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
  const [anggota, setAnggota] = useState<AnggotaProps | null>(null);
  const [bisaPesan, setBisaPesan] = useState<boolean>(false);
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();
  const [datesBooked, setDatesBooked] = useState([]);

  useEffect(() => {
    axios.get("/api/sewa").then((res) => {
      const datesBooked = res.data.reduce((acc: any, sewa: SewaProps) => {
        const start = new Date(sewa.tgl_mulai);
        const end = new Date(sewa.tgl_selesai);

        // Menambahkan setiap tanggal dalam rentang ke dalam array
        const rangeDates = [];
        let currentDate = new Date(start);

        while (currentDate <= end) {
          rangeDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return [...acc, ...rangeDates];
      }, []);

      console.log(datesBooked);
      setDatesBooked(datesBooked);
    });
  }, []);

  const isDateDisabled = (date: Date) => {
    // Menonaktifkan hari sebelum hari ini
    const today = new Date();
    if (date < today && !isSameDay(date, today)) {
      return true;
    }

    // Menonaktifkan hari yang sudah tersewa
    return datesBooked.some((bookedDate) => isSameDay(date, bookedDate));
  };

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
    console.log(moment(dateStart).format());

    const requestData = {
      anggotaId: anggota?.id,
      productId: product?.id,
      tgl_mulai: moment(dateStart).utcOffset(0, true).format(),
      tgl_selesai: moment(dateEnd).utcOffset(0, true).format(),
    };

    axios.post("/api/sewa", requestData).then((res) => {
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
          <p className="text-center mt-4 mb-8 text-2xl bg-gray-700 items-center rounded-md text-white py-2">
            Pinjam Barang
          </p>
          <div className="flex flex-row items-center justify-between ">
            <p className="mr-2">Nomor Anggota</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder="Nomor Anggota"
                {...register("nomorAnggota")}
                className="bg-white"
              />
              <Button className="bg-gray-700" onClick={cekAnggota}>
                Cek Anggota
              </Button>
            </div>
          </div>

          {/* Detail anggota */}
          <div
            hidden={bisaPesan ? false : true}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-row items-center justify-between">
              <p>Nama</p>
              <Input
                className="bg-white w-80"
                disabled
                defaultValue={anggota?.nama}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Alamat</p>
              <Input
                defaultValue={anggota?.alamat}
                disabled
                className="bg-white w-80"
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>No Telp</p>
              <Input
                disabled
                defaultValue={anggota?.no_telp}
                className="bg-white w-80"
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <p>Angkatan</p>
              <Input
                disabled
                defaultValue={anggota?.angkatan}
                className="bg-white w-80"
              />
            </div>
          </div>

          {/* SEWA */}
          <p className="text-center pt-4 text-xl">Detail Sewa</p>
          <div className="flex flex-row items-center justify-between">
            <p>Barang</p>
            <Input
              disabled
              defaultValue={product?.name}
              className="bg-white w-80"
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Harga</p>
            <Input
              disabled
              defaultValue={product?.price}
              className="bg-white w-80"
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Tanggal Mulai</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    " justify-start text-left font-normal bg-white w-80",
                    !dateStart && "text-muted-foreground"
                  )}
                >
                  <FaCalendarMinus className="mr-2 h-4 w-4" />
                  {dateStart ? (
                    format(dateStart, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateStart}
                  onSelect={setDateStart}
                  initialFocus
                  disabled={isDateDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p>Tanggal Selesai</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    " justify-start text-left font-normal bg-white w-80",
                    !dateEnd && "text-muted-foreground"
                  )}
                >
                  <FaCalendarMinus className="mr-2 h-4 w-4" />
                  {dateEnd ? format(dateEnd, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateEnd}
                  onSelect={setDateEnd}
                  initialFocus
                  disabled={isDateDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            className="bg-gray-700"
            disabled={!bisaPesan}
            onClick={handleSubmit(handlePesan)}
          >
            Pesan
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
