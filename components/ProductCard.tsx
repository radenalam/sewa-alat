"use client";

import { Button } from "./ui/button";
import React, { useState } from "react";

const ProductCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" group car-card bg-slate-100 rounded-lg items-center pb-1 hover:shadow-md">
      <div className="mx-5 my-5">
        <div className=" rounded-lg ">
          <h2 className="text-[22px] leading-[26px] font-bold capitalize pt-4">
            Canon
          </h2>
        </div>

        <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
          <span className="self-start text-[14px] leading-[17px] font-semibold">
            Rp
          </span>
          35.000
          <span className="self-end text-[14px] leading-[17px] font-medium">
            /day
          </span>
        </p>

        <div className="flex w-full h-50 my-3 object-contain justify-center">
          <img
            src="/nikon.png"
            alt="car model"
            className="object-contain"
            width={200}
          />
        </div>

        <div className="">
          <Button
            onClick={() => setOpen(!open)}
            className="w-full bg-rounded-lg"
            color="orange"
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
