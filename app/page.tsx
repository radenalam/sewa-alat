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
import Hero from "../components/Hero";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Home = () => {
  return (
    <div>
      <Hero />
      <h1 className="px-8 pt-20 text-3xl font-bold">Camera Catalog</h1>
      <p className="px-8">Explore out camera you might like</p>
      <div className="px-8 max-w-xl">
        <TextFieldRoot>
          <TextFieldSlot>
            <FaMagnifyingGlass />
          </TextFieldSlot>
          <TextFieldInput placeholder="Title" />
        </TextFieldRoot>
      </div>

      <Grid columns="3" gap="3" width="auto" height="auto" className="px-8">
        <Box height="9">
          <Card size="2" style={{ maxWidth: 240 }}>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Bold typography"
                style={{
                  display: "block",
                  objectFit: "cover",
                  width: "100%",
                  height: 140,
                  backgroundColor: "var(--gray-5)",
                }}
              />
            </Inset>
            <Strong>Canon</Strong>
            <p>
              is the art and technique of arranging type to make written
              language legible, readable and appealing when displayed.
            </p>
          </Card>
        </Box>
        <Box height="9"></Box>
        <Box height="9"></Box>
        <Box height="9"></Box>
        <Box height="9"></Box>
      </Grid>
      <div className="px-8"></div>
    </div>
  );
};

export default Home;
