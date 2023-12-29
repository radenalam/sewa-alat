import { ProductProps } from "@/types";
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

type DeleteProductFormProps = {
  product?: ProductProps;
};

const DeleteProductForm = ({ product }: DeleteProductFormProps) => {
  const onDelete = (id: number) => {
    axios
      .delete(`/api/product/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error deleting project:", error));
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <FaRegTrashAlt width="10" height="10" />
        </AlertDialogTrigger>
        <AlertDialogContent style={{ maxWidth: 450 }}>
          <AlertDialogTitle>Delete {product?.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin menghapus {product?.name} ?
          </AlertDialogDescription>

          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button color="red" onClick={() => onDelete(product?.id as number)}>
              Delete Product
            </Button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteProductForm;
