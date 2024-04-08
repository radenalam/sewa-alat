import React from "react";
import { SewaProps } from "@/types";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { Input } from "../ui/input";
import Image from "next/image";
import axios from "axios";
import { Button } from "../ui/button";

type EditSewaFormProps = {
  sewa?: SewaProps;
};
const EditSewa = ({ sewa }: EditSewaFormProps) => {
  const { handleSubmit, register } = useForm<SewaProps>();
  const onEdit = (formData: SewaProps) => {
    const updatedSewa = {
      ...formData,
    };
    axios.patch(`/api/sewa/${sewa?.id}`, updatedSewa).then((response) => {
      console.log("Response:", updatedSewa);
      if (response.status === 201) {
        window.location.reload();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaEdit className="h-6 w-6" />
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 450 }}>
        <DialogTitle>Edit Barang {sewa?.anggotaId}</DialogTitle>
        <DialogDescription>Ubah data Produk</DialogDescription>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Title"
            {...register("anggotaId", { required: "Title is required" })}
          />
          <div>
            <Button onClick={handleSubmit(onEdit)}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSewa;
