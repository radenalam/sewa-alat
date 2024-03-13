"use client";

import {
  AnggotaProps,
  NonAnggotaProps,
  ProductProps,
  SewaProps,
} from "@/types";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CalendarIcon, HeightIcon } from "@radix-ui/react-icons";
import { NonAnggota } from "@/app/validationSchema";
import moment from "moment";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { format, isSameDay } from "date-fns";

const AddSewa = () => {
  const { handleSubmit, register, setValue } = useForm<SewaProps>();
  const [productOpen, setProductOpen] = useState(false);
  const [anggotaOpen, setAnggotaOpen] = useState(false);
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [anggota, setAnggota] = useState<AnggotaProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );
  const [selectedAnggota, setSelectedAnggota] = useState<AnggotaProps | null>(
    null
  );

  const [isAnggota, setIsAnggota] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bisaPesan, setBisaPesan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [datesBooked, setDatesBooked] = useState([]);
  const [date, setDate] = useState<DateRange | undefined>();

  const cekJadwal = async (id: number) => {
    setDatesBooked([]);
    axios
      .get(`/api/sewa/${id}`)
      .then((res) => {
        if (res.data && res.data.sewa && Array.isArray(res.data.sewa)) {
          const tanggalBooked = res.data.sewa.reduce((acc: any, sewa: any) => {
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
          setDatesBooked(tanggalBooked);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error, misalnya menetapkan state untuk menampilkan pesan kesalahan ke pengguna
      });
  };

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

  useEffect(() => {
    if (date?.from && date?.to) {
      const start = new Date(date.from);
      const end = new Date(date.to);
      const difference =
        Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1; // Tambahkan 1 untuk memasukkan hari pertama
      if (selectedProduct?.price) {
        const total = difference * selectedProduct?.price;
        setTotalPrice(total);
      }
    }
  }, [date, selectedProduct?.price]);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    if (date < today && !isSameDay(date, today)) {
      return true;
    }

    return datesBooked.some((bookedDate) => isSameDay(date, bookedDate));
  };
  useEffect(() => {
    if (selectedProduct) {
      setValue("productId", selectedProduct.id);
      cekJadwal(selectedProduct.id);
    }
    if (selectedAnggota) {
      setValue("anggotaId", selectedAnggota.id);
    }
  }, [selectedProduct, anggota, setValue]);

  useEffect(() => {
    axios
      .get("/api/product")
      .then((response) => {
        if (Array.isArray(response.data.products)) {
          setProduct(response.data.products);
        } else {
          console.error(
            "Invalid response data format:",
            response.data.products
          );
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  useEffect(() => {
    axios
      .get("/api/anggota")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAnggota(response?.data);
        } else {
          console.error("Invalid response data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  const handleAnggota = () => {
    const sewa = {
      anggotaId: selectedAnggota?.id,
      nonAnggotaId: null,
      productId: selectedProduct?.id,
      tgl_mulai: moment(date?.from).utcOffset(0, true).format(),
      tgl_selesai: moment(date?.to).utcOffset(0, true).format(),
      total_harga: totalPrice, // Anda mungkin ingin menggunakan nilai totalPrice yang sudah Anda hitung
    };

    onSubmit(sewa);
  };

  const handleNonAnggota = () => {
    const nonAnggota = {
      nama: getValuesNonAnggota("nama"),
      alamat: getValuesNonAnggota("alamat"),
      no_telp: Number(getValuesNonAnggota("no_telp")),
    };
    console.log(nonAnggota);
    axios.post("/api/nonanggota", nonAnggota).then((response) => {
      console.log("Response:", response.data);
      if (response.status === 201) {
        const sewa = {
          anggotaId: null,
          nonAnggotaId: response.data,
          productId: selectedProduct?.id,
          tgl_mulai: moment(date?.from).utcOffset(0, true).format(),
          tgl_selesai: moment(date?.to).utcOffset(0, true).format(),
          total_harga: totalPrice, // Anda mungkin ingin menggunakan nilai totalPrice yang sudah Anda hitung
        };
        onSubmit(sewa);
      }
    });
  };

  const onSubmit = (data: any) => {
    axios
      .post("/api/sewa", data)
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 201) {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error creating project:", error));
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-primary rounded-md px-2 py-2 my-2">
        Tambah Sewa
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Sewa Manual</DialogTitle>
          <DialogDescription>Masukan Data peminjaman</DialogDescription>
        </DialogHeader>

        <Popover open={productOpen} onOpenChange={setProductOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={productOpen}
              className="w-full justify-between"
            >
              {selectedProduct
                ? selectedProduct.name +
                  " - " +
                  selectedProduct.price.toLocaleString("id-ID") +
                  "/hari"
                : "Select product..."}
              <HeightIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search product..." />
              <CommandEmpty>No product found.</CommandEmpty>
              <CommandGroup>
                {product.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => {
                      setSelectedProduct(product);
                      setBisaPesan(true);
                      setProductOpen(false);
                    }}
                  >
                    {product.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Tabs defaultValue="anggota">
          <TabsList className="flex flex-row w-full space-x-2 ">
            <TabsTrigger
              className="mx-auto bg-primary-foreground text-inherit w-full"
              onClick={() => setIsAnggota(true)}
              value="anggota"
            >
              Anggota
            </TabsTrigger>
            <TabsTrigger
              className="mx-auto bg-primary-foreground text-inherit w-full"
              onClick={() => setIsAnggota(false)}
              value="nonanggota"
            >
              Non Anggota
            </TabsTrigger>
          </TabsList>

          {/* ANGGOTA */}

          <TabsContent value="anggota">
            <Popover open={anggotaOpen} onOpenChange={setAnggotaOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={anggotaOpen}
                  className="w-full justify-between"
                >
                  {selectedAnggota
                    ? selectedAnggota?.nama +
                      " - " +
                      selectedAnggota?.nomorAnggota
                    : "Select anggota..."}
                  <HeightIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search anggota..." />
                  <CommandEmpty>No anggota found.</CommandEmpty>
                  <CommandGroup>
                    {anggota.map((anggota) => (
                      <CommandItem
                        key={anggota.id}
                        value={anggota.nama}
                        onSelect={() => {
                          setSelectedAnggota(anggota);
                          setAnggotaOpen(false);
                        }}
                      >
                        {anggota.nama + " - " + anggota.nomorAnggota}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </TabsContent>

          {/* NON ANGGOTA */}

          <TabsContent value="nonanggota">
            <TabsContent value="nonanggota">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                  <p>Nama</p>
                  <Input
                    placeholder="Nama"
                    className="border-2-accent w-2/3"
                    {...registerNonAnggota("nama")}
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p>Alamat</p>
                  <Input
                    placeholder="Alamat"
                    className="border-2-accent w-2/3"
                    {...registerNonAnggota("alamat")}
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p>No Telp</p>
                  <Input
                    placeholder="No Telp"
                    className="border-2-accent w-2/3"
                    {...registerNonAnggota("no_telp")}
                  />
                </div>
              </div>
            </TabsContent>
          </TabsContent>
        </Tabs>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
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
                <span>Pick a date</span>
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

        <Input
          placeholder="total_harga"
          disabled
          value={totalPrice.toLocaleString("id-ID")}
          {...register("total_harga")}
        />

        <Button onClick={isAnggota ? handleAnggota : handleNonAnggota}>
          Simpan
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddSewa;
