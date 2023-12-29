"use client";

import { ProductProps } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";

const ProductCard = ({ id, name, price, description, image }: ProductProps) => {
  return (
    <div className=" group car-card bg-slate-200 rounded-lg items-center pb-1 hover:shadow-md">
      <div className="mx-5 my-5">
        <div className=" rounded-lg ">
          <h2 className="text-[28px] leading-[26px] font-bold capitalize pt-4">
            {name}
          </h2>
        </div>

        <p className="flex mt-6 text-[22px] leading-[38px] font-extrabold">
          <span className="self-start text-[14px] leading-[17px] font-semibold">
            Rp
          </span>
          {price}
          <span className="self-end text-[14px] leading-[17px] font-medium">
            /day
          </span>
        </p>

        <div className="flex w-full h-50 my-3 object-contain justify-center">
          <img
            src={image as string}
            alt={image as string}
            className="object-contain"
            width={200}
            height={200}
          />
        </div>
        <div>
          <p className="py-3 ">{description}</p>
        </div>

        <div className="">
          <Link href={`/product/${id}`}>
            <Button className="w-full bg-rounded-lg bg-slate-800">
              View More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
