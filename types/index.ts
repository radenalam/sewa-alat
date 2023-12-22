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
  userId: number;
  tgl_mulai: Date;
  tgl_selesai: Date;
}
