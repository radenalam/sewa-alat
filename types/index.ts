export interface ProductProps {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
}

export interface SewaProps {
  id: number;
  productId: number;
  anggotaId: number | null;
  nonAnggotaId: number | null;
  tgl_mulai: Date;
  tgl_selesai: Date;
  total_harga: number;
}

export interface AnggotaProps {
  id: string;
  nama: string;
  alamat: string;
  nomorAnggota: number;
  no_telp: number;
  angkatan: number;
}

export interface NonAnggotaProps {
  id: string;
  nama: string;
  alamat: string;
  no_telp: number;
}

export interface UserProps {
  id: string;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
}
