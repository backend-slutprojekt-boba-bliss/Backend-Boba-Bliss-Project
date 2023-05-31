import { Box } from "@chakra-ui/react";
import { Products } from "../components/Products";

export function SuperProductsPage() {
  return (
    <Box sx={bigGradient}>
      <Products />
    </Box>
  );
}

const bigGradient = {
  backgroundImage: "linear-gradient(to bottom, transparent 22%, #FED3D4)",
  backgroundColor: "#fffaf4",
};

