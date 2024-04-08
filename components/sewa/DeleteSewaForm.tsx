import { SewaProps } from "@/types";
import axios from "axios";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

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

type DeleteSewaFormProps = {
  sewa?: SewaProps;
};

const DeleteSewaForm = ({ sewa }: DeleteSewaFormProps) => {
  const onDelete = (id: number) => {
    axios
      .delete(`/api/sewa/${sewa?.id}`)
      .then((response) => {
        if (response.status === 201) {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error deleting project:", error));
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <FaRegTrashAlt className="h-6 w-6" />
        </AlertDialogTrigger>
        <AlertDialogContent style={{ maxWidth: 450 }}>
          <AlertDialogTitle>Delete {sewa?.id}</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin menghapus {sewa?.id} ?
          </AlertDialogDescription>

          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={() => onDelete(sewa?.id as number)}>
              Delete Product
            </Button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteSewaForm;
