// components/HeroSection.js
import React from "react";
import { Button } from "@radix-ui/themes";

const HeroSection = () => {
  return (
    <div className="h-max flex mb-36">
      <div className="hero-section text-black flex-1 flex items-center">
        <div className=" max-w-2xl px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find, book, rent a camera—quick and super easy!
          </h1>
          <p className="mb-5">
            Streamline your camera rental experience with our effortless booking
            process.
          </p>
          <Button className="bg-white text-blue-500 px-6 py-2 rounded-full font-medium text-lg shadow-md transition duration-300 hover:bg-blue-500 hover:text-white mt-4">
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
