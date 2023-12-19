import { ProductProps } from "@/types";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

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
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <IconButton color="red">
            <FaRegTrashAlt width="10" height="10" />
          </IconButton>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete {product?.name}</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Apakah anda yakin menghapus {product?.name} ?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => onDelete(product?.id as number)}
              >
                Delete Product
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteProductForm;
