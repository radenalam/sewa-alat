import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AnggotaProps } from "@/types";

type AddAnggotaFormProps = {
  anggota?: AnggotaProps;
};

const AddAnggota = (anggota: AddAnggotaFormProps) => {
  const { handleSubmit, register } = useForm<AnggotaProps>();

  const onSubmit = (anggota: AnggotaProps) => {
    console.log(anggota);
    anggota.angkatan = Number(anggota.angkatan);
    anggota.no_telp = Number(anggota.no_telp);
    anggota.nomorAnggota = Number(anggota.nomorAnggota);
    axios
      .post("/api/anggota", anggota)
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 201) {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error creating project:", error));
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className=" bg-primary px-3 py-2 my-3 rounded-md">
          Tambah Anggota
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Tambah Anggota</DialogTitle>
          <DialogDescription>Masukan data anggota</DialogDescription>
          <Input placeholder="Nama Lengkap" {...register("nama")} />
          <Input placeholder="Nomor Anggota" {...register("nomorAnggota")} />
          <Input placeholder="Angkatan" {...register("angkatan")} />
          <Input placeholder="Alamat" {...register("alamat")} />
          <Input placeholder="No Telepon" {...register("no_telp")} />
          <Button onClick={handleSubmit(onSubmit)}>Simpan</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAnggota;
