import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nama Barang harus di isi.").max(255),
  description: z.string().nullable(),
  price: z.number().min(1, "Harga harus di isi."),
  image: z.string().nullable(),
});

export const Anggota = z.object({
  nama: z.string().min(1, "Produk harus dipilih."),
  nomorAnggota: z.number().min(1, "User harus dipilih."),
  angkatan: z.number(),
  alamat: z.string(),
  no_telp: z.number(),
});

export const Sewa = z.object({
  productId: z.number().min(1, "Produk harus dipilih."),
  anggotaId: z.number().min(1, "User harus dipilih."),
  tgl_mulai: z.date().or(z.string()),
  tgl_selesai: z.date().or(z.string()),
});

export const UploadImage = z.object({
  file: z.any().refine((file) => file !== null, "File harus di isi."),
});
