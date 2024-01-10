"use client";

import { AnggotaProps } from "@/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

type DeleteAnggotaProps = {
  anggota?: AnggotaProps;
};

const DeleteAnggota = ({ anggota }: DeleteAnggotaProps) => {
  const onDelete = (id: number) => {
    axios.delete(`/api/anggota/id/${anggota?.id}`).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <FaRegTrashAlt className="h-6 w-6" />
        </AlertDialogTrigger>
        <AlertDialogContent style={{ maxWidth: 450 }}>
          <AlertDialogTitle>Delete {anggota?.nama}</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin menghapus {anggota?.nama} ?
          </AlertDialogDescription>

          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={() => onDelete(anggota?.id as number)}>
              Hapus Anggota
            </Button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAnggota;
