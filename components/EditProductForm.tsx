"use client";

import { ProductProps } from "@/types";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

type EditProductFormProps = {
  // onEdit: SubmitHandler<ProductProps>;
  product?: ProductProps;
};

const EditProduct = ({ product }: EditProductFormProps) => {
  const { handleSubmit, register } = useForm<ProductProps>({
    defaultValues: product,
  });
  const onEdit = (product: ProductProps) => {
    product.price = Number(product.price);
    if (!product.image) {
      product.image = null;
    }
    axios.put(`/api/products/${product?.id}`, product).then((response) => {
      console.log("Response:", response);
      if (response.status === 201) {
        window.location.reload();
      }
    });
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>
          <FaEdit width="10" height="10" />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit Barang {product?.name}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Ubah data Produk
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <TextField.Input
            mb="1"
            placeholder="Title"
            {...register("name", { required: "Title is required" })}
          />
          <TextArea
            mb="1"
            placeholder="Description"
            {...register("description")}
          />
          <TextField.Input
            mb="1"
            placeholder="Price"
            {...register("price", { required: "Price is required" })}
          />
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit(onEdit)}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditProduct;
