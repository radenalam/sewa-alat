"use client";
import { AnggotaProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { EditAnggotaProps } from "./EditAnggota";

export const EditAnggota = ({ anggota }: EditAnggotaProps) => {
  const { handleSubmit, register } = useForm<AnggotaProps>();
  console.log(anggota?.id);
  const [anggotas, setAnggotas] = useState<AnggotaProps[]>([]);

  const onEdit = (anggota: AnggotaProps) => {
    anggota.no_telp = Number(anggota?.no_telp);
    anggota.nomorAnggota = Number(anggota?.nomorAnggota);
    anggota.angkatan = Number(anggota?.angkatan);
    axios.put(`/api/anggota/id/${anggota?.id}`, anggota).then((response) => {
      console.log("Response:", response);
      if (response.status === 201) {
        window.location.reload();
      }
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <FaEdit />
        </DialogTrigger>

        <DialogContent style={{ maxWidth: 450 }}>
          <DialogTitle>Edit Anggota {anggota?.nama}</DialogTitle>
          <DialogDescription>Ubah data Anggota</DialogDescription>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Nama"
              defaultValue={anggota?.nama}
              {...register("nama", { required: "Nama is required" })}
            />
            <Input
              placeholder="Alamat"
              defaultValue={anggota?.alamat}
              {...register("alamat", { required: "Alamat is required" })}
            />
            <Input
              placeholder="Nomor Telepon"
              defaultValue={anggota?.no_telp}
              {...register("no_telp", { required: "No Telpon is required" })}
            />
            <Input
              placeholder="Nomor Anggota"
              defaultValue={anggota?.nomorAnggota}
              {...register("nomorAnggota", {
                required: "Nomor Anggota is required",
              })}
            />
            <Input
              placeholder="Angkatan"
              defaultValue={anggota?.angkatan}
              {...register("angkatan", { required: "Angkatan is required" })}
            />
            <div>
              <Button onClick={handleSubmit(onEdit)}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};