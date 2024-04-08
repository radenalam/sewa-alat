"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AnggotaProps,
  NonAnggotaProps,
  ProductProps,
  SewaProps,
} from "@/types/index";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { addDays, format, isSameDay } from "date-fns";

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
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const ProductDetails = (
  { params }: { params: { id: string } },
  { className }: React.HTMLAttributes<HTMLDivElement>
) => {
  const {
    register: registerAnggota,
    handleSubmit: handleSubmitAnggota,
    getValues: getValuesAnggota,
    // ... other methods you might need for Anggota
  } = useForm<AnggotaProps>();

  const {
    register: registerNonAnggota,
    handleSubmit: handleSubmitNonAnggota,
    getValues: getValuesNonAnggota,
    watch: watchNonAnggota,
    // ... other methods you might need for Non Anggota
  } = useForm<NonAnggotaProps>();

  const [product, setProduct] = useState<ProductProps | null>(null);
  const [anggota, setAnggota] = useState<AnggotaProps | null>(null);
  const [bisaPesan, setBisaPesan] = useState<boolean>(false);
  const [datesBooked, setDatesBooked] = useState([]);
  const [date, setDate] = useState<DateRange | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnggota, setIsAnggota] = useState(true);
  const NonAnggotaFields = watchNonAnggota(["no_telp", "alamat", "nama"]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (date?.from && date?.to) {
      const start = new Date(date.from);
      const end = new Date(date.to);
      const difference =
        Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1; // Tambahkan 1 untuk memasukkan hari pertama
      if (product?.price) {
        const total = difference * product?.price;
        setTotalPrice(total);
      }
    }
  }, [date, product?.price]);

  useEffect(() => {
    const [nama, alamat, no_telp] = NonAnggotaFields;
    if (nama && alamat && no_telp) {
      setBisaPesan(true);
    }
  }, [NonAnggotaFields]);

  useEffect(() => {
    axios
      .get(`/api/sewa/${params.id}`)
      .then((res) => {
        if (res.data && res.data.sewa && Array.isArray(res.data.sewa)) {
          const datesBooked = res.data.sewa.reduce((acc: any, sewa: any) => {
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
          setDatesBooked(datesBooked);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error, misalnya menetapkan state untuk menampilkan pesan kesalahan ke pengguna
      });
  }, [params.id]);

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
    // Initialize toast
    const nomorAnggotaValue = getValuesAnggota("nomorAnggota");

    axios
      .get(`/api/anggota/${nomorAnggotaValue}`)
      .then((res) => {
        if (res.data.anggota) {
          setAnggota(res.data.anggota);
          console.log(res.data.anggota);
          setBisaPesan(true);
        } else {
          // Check if the error key exists and is true, then display the toast
          setBisaPesan(false);
        }
      })
      .catch((error) => {
        // Handle network or other axios-specific errors
        console.error("Error fetching data:", error);
        toast({
          title: `Anggota Tidak Ditemukan`,
          description: `Nomor Anggota tidak ditemukan.`,

          duration: 5000,
        });
      });
  };

  const handlePesanAnggota = () => {
    setIsLoading(true);

    const anggotaSewa: any = {
      // data anggota yang akan dikirim
      productId: product?.id,
      anggotaId: anggota?.id,
      nonAnggotaId: null,
      tgl_mulai: moment(date?.from).utcOffset(0, true).format(),
      tgl_selesai: moment(date?.to).utcOffset(0, true).format(),
      total_harga: 0,
    };

    SimpanSewa(anggotaSewa);
  };

  const handlePesanNonAnggota = () => {
    setIsLoading(true);

    const no_telp = Number(getValuesNonAnggota("no_telp"));
    const dataNonAnggota: any = {
      // data non anggota yang akan dikirim
      nama: getValuesNonAnggota("nama"),
      alamat: getValuesNonAnggota("alamat"),
      no_telp: no_telp,
    };
    axios.post("/api/nonanggota", dataNonAnggota).then((res) => {
      if (res.status === 201) {
        const nonAnggotaSewa: any = {
          productId: product?.id,
          anggotaId: null,
          nonAnggotaId: res.data,
          tgl_mulai: moment(date?.from).utcOffset(0, true).format(),
          tgl_selesai: moment(date?.to).utcOffset(0, true).format(),
          total_harga: Number(totalPrice),
        };
        SimpanSewa(nonAnggotaSewa);
      }
    });
  };

  const SimpanSewa = (data: any) => {
    axios.post("/api/sewa", data).then((res) => {
      if (res.status === 201) {
        toast({
          title: `Booked: ${product?.name}`,
          description: `Tanggal ${data.tgl_mulai} - ${data.tgl_selesai}`,
        });
        setBisaPesan(false);
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row md:mx-14 md:my-5 bg-primary-foreground border-muted px-8 py-8 rounded-xl shadow-2xl">
        {/* Kiri */}
        <div className="flex flex-col">
          {product && (
            <div className=" h-full w-full px-8">
              <p className="text-center px-3 py-3 text-3xl font-semibold">
                {product.name}
              </p>
              <Image
                src={
                  product.image
                    ? `/uploads/${product.image}`
                    : "/default_camera.png"
                }
                alt="Product Image"
                width={250}
                height={250}
                className="items-center mx-auto w-full px-8"
              />

              <p className=" text-xl text-secondary-foreground">
                {product.description}
              </p>
              <p>Price: {product.price.toLocaleString("id-ID")}</p>
            </div>
          )}
        </div>
        {/* Kanan */}
        <div className="bg-secondary rounded-md flex flex-col px-8 py-4 gap-3">
          <p className="font-extrabold text-center mt-4 mb-2 text-2xl bg-secondary items-center rounded-md py-2">
            Pinjam Barang
          </p>
          <Tabs defaultValue="anggota">
            <TabsList className="flex flex-row w-full space-x-2 py-2 ">
              <TabsTrigger
                className="mx-auto bg-primary-foreground text-inherit text-lg w-full"
                onClick={() => {
                  setIsAnggota(true), console.log(isAnggota);
                }}
                value="anggota"
              >
                Anggota
              </TabsTrigger>
              <TabsTrigger
                className="mx-auto bg-primary-foreground text-inherit text-lg w-full"
                onClick={() => {
                  setIsAnggota(false), console.log(isAnggota);
                }}
                value="nonanggota"
              >
                Non Anggota
              </TabsTrigger>
            </TabsList>

            {/* ANGGOTA */}

            <TabsContent value="anggota">
              <div className="flex flex-row items-center justify-between mb-3">
                <p className="mr-2">Nomor Anggota</p>
                <div className="flex w-2/3 items-center space-x-2">
                  <Input
                    placeholder="Nomor Anggota"
                    {...registerAnggota("nomorAnggota")}
                    className="border-2-accent"
                  />
                  <Button className="bg-primary" onClick={cekAnggota}>
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
                    className="border-2-accent w-2/3"
                    disabled
                    value={anggota?.nama}
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p>Alamat</p>
                  <Input
                    value={anggota?.alamat}
                    disabled
                    className="border-2-accent w-2/3"
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p>No Telp</p>
                  <Input
                    disabled
                    value={anggota?.no_telp}
                    className="border-2-accent w-2/3"
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p>Angkatan</p>
                  <Input
                    disabled
                    value={anggota?.angkatan}
                    className="border-2-accent w-2/3"
                  />
                </div>
              </div>
            </TabsContent>

            {/* NON ANGGOTA */}

            <TabsContent value="nonanggota">
              <TabsContent value="nonanggota">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center justify-between">
                    <p>Nama</p>
                    <Input
                      placeholder="Nama"
                      {...registerNonAnggota("nama", {
                        required: "Nama is required",
                      })}
                      className="border-2-accent w-2/3"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p>Alamat</p>
                    <Input
                      placeholder="Alamat"
                      {...registerNonAnggota("alamat", {
                        required: "Alamat is required",
                      })}
                      className="border-2-accent w-2/3"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p>No Telp</p>
                    <Input
                      placeholder="No Telp"
                      {...registerNonAnggota("no_telp", {
                        required: "No Telp is required",
                      })}
                      className="border-2-accent w-2/3"
                    />
                  </div>
                </div>
              </TabsContent>
            </TabsContent>
          </Tabs>

          {/* SEWA */}
          <p className="text-center pt-4 text-xl">Detail Sewa</p>
          <div className="flex flex-row items-center justify-between">
            <p>Barang</p>
            <Input
              disabled
              value={product?.name}
              className="border-2-accent w-2/3"
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Harga</p>
            <Input
              disabled
              value={
                isAnggota
                  ? "0"
                  : totalPrice
                  ? `Rp${totalPrice.toLocaleString("id-ID")}/total`
                  : ""
              }
              className="border-2-accent w-2/3"
            />
          </div>

          <div
            className={cn(
              "grid gap-2",
              (className = "flex flex-row items-center justify-between")
            )}
          >
            <p>Tanggal</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-2/3 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  disabled={!bisaPesan}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pilih Tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={isDateDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            className="bg-foreground"
            disabled={!bisaPesan || isLoading}
            onClick={
              isAnggota
                ? handleSubmitAnggota(handlePesanAnggota)
                : handleSubmitNonAnggota(handlePesanNonAnggota)
            }
          >
            {isLoading ? (
              <div className="flex flex-row gap-2 justify-center items-center">
                <div className="animate-spin">
                  <AiOutlineLoading3Quarters />
                </div>
                Loading
              </div>
            ) : (
              "Pesan"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
