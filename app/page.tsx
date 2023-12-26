import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <>
      <NavBar />
      <div>
        <Hero />
        <div className="flex flex-col min-h-screen">
          <div className="px-20 flex-grow">
            <h1 className="pt-20 text-3xl font-bold">Kamera Katalog</h1>
            <p className="pt-1">Explore out camera you might like</p>

            <div className=" py-10 max-w-sm">
              <Input placeholder="Kamera" />
            </div>

            <div className="">
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
