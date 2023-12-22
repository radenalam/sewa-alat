import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nama Barang harus di isi.").max(255),
  description: z.string().nullable(),
  price: z.number().min(1, "Harga harus di isi."),
  image: z.string().nullable(),
});

export const Sewa = z.object({
  productId: z.number().min(1, "Produk harus dipilih."),
  anggotaId: z.number().min(1, "User harus dipilih."),
  tgl_mulai: z.date().or(z.string()),
  tgl_selesai: z.date().or(z.string()),
});
