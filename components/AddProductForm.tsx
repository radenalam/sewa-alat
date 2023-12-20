"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { ProductProps } from "@/types";
import { Button, Dialog, Flex, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";

type AddProductFormProps = {
  // onSubmit: SubmitHandler<ProductProps>;
  product?: ProductProps;
};

const ProductForm = () => {
  const { handleSubmit, register } = useForm<ProductProps>({});

  const onSubmit = (product: ProductProps) => {
    product.price = Number(product.price);
    if (!product.image) {
      product.image = null;
    }
    if (!product.description) {
      product.description = null;
    }
    axios
      .post("/api/product", product)
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
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Tambah Barang</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Tambah Barang</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Masukan data produk
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
            <ImageUploader />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSubmit(onSubmit)}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ProductForm;
