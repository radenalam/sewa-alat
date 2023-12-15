import { useForm, SubmitHandler } from "react-hook-form";
import { ProductProps } from "@/types";
import { Button, Dialog, Flex, TextArea, TextField } from "@radix-ui/themes";

type ProductFormProps = {
  onSubmit: SubmitHandler<ProductProps>;
  product?: ProductProps;
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, product }) => {
  const { handleSubmit, register } = useForm<ProductProps>({
    defaultValues: product,
  });

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
