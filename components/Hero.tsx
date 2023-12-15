// components/HeroSection.js
import React from "react";
import { Button } from "@radix-ui/themes";

const HeroSection = () => {
  return (
    <div className="h-max flex">
      <div className="hero-section text-black flex-1 flex items-center">
        <div className=" max-w-2xl px-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Cari, Booking, rental kamera—cepat and mudah!
          </h1>
          <p className="mb-5">
            Streamline your camera rental experience with our effortless booking
            process.
          </p>
          <Button
            size="3"
            color="orange"
            className="bg-white text-blue-500 px-4 py-2 rounded-full font-medium  shadow-md transition duration-300 hover:bg-blue-500 hover:text-white mt-4"
          >
            Explore
          </Button>
        </div>
        <div className="flex items-center">
          <img
            src="/camera.png"
            alt="hero-image"
            className="max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
