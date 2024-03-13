// components/HeroSection.js
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="h-max flex">
      <div className="hero-section flex-1 flex flex-col md:flex-row items-center">
        <div className=" max-w-2xl px-8 md:px-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Cari, Booking, rental kamera—cepat dan mudah!
          </h1>
          <p className="mb-5">
            Streamline your camera rental experience with our effortless booking
            process.
          </p>
          <Button>Explore</Button>
        </div>
        <div className="flex items-center px-8 mt-4 md:px-2 ">
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
