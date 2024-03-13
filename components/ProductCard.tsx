"use client";

import { ProductProps } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";

const ProductCard = ({ id, name, price, description, image }: ProductProps) => {
  return (
    <div className=" group bg-secondary rounded-lg items-center pb-1 shadow-md">
      <div className="mx-5 my-5 flex flex-col justify-between h-full pb-10">
        <div>
          <div className="square">
            <img
              src={image as string}
              alt={image as string}
              className="backdrop-brightness-95 shadow-lg inner-image rounded-sm"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-bold capitalize pt-4">{name}</h2>

            <p className="flex mt-2 text-[22px] font-extrabold">
              <span className="self-start text-sm font-semibold">Rp</span>
              {price.toLocaleString("id-ID")}
              <span className="self-end text-sm font-medium">/hari</span>
            </p>

            <p className="py-3">{description}</p>
          </div>
        </div>
        <Link href={`/product/${id}`}>
          <Button className="w-full rounded-lg bg-accent-foreground">
            View More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
