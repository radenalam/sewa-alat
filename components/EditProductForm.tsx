import { ProductProps } from "@/types";
import { Button, Dialog, Flex, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

type EditProductFormProps = {
  onEdit: SubmitHandler<ProductProps>;
  product?: ProductProps;
};

const EditProduct = ({ onEdit, product }: EditProductFormProps) => {
  const { handleSubmit, register } = useForm<ProductProps>();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit Barang </Button>
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
            defaultValue={product?.name}
            {...register("name", { required: "Title is required" })}
          />
          <TextArea
            mb="1"
            placeholder="Description"
            defaultValue={product?.description}
            {...register("description")}
          />
          <TextField.Input
            mb="1"
            placeholder="Price"
            defaultValue={product?.price}
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
