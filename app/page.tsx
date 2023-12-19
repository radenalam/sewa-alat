import {
  Box,
  Card,
  Container,
  Grid,
  Inset,
  Strong,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import Hero from "@/components/Hero";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";

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
              <TextFieldRoot>
                <TextFieldSlot>
                  <FaMagnifyingGlass />
                </TextFieldSlot>
                <TextFieldInput placeholder="Kamera" />
              </TextFieldRoot>
            </div>

            <div className="">
              <Grid columns="3" gap="5" width="auto" height="max-content">
                <Box height="9">
                  <ProductCard />
                </Box>
                <Box height="9">
                  <ProductCard />
                </Box>
                <Box height="9">
                  <ProductCard />
                </Box>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
