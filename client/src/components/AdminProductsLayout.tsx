import { Box, Flex } from "@chakra-ui/react";
import { useProduct } from "../ProductContext";
import { AdminSmallProductCard } from "./AdminSmallProductCard";

export function AdminProductsLayout() {
  // Get the productsList from the ProductContext
  const { productList } = useProduct();
  return (
    <Flex
      gap={[2, 2, 3, 4]}
      my={1}
      direction="row"
      wrap={"wrap"}
      width={["100%", "100%", "100%", "70%"]}
    >
      {/* Map over the productList and render an AdminSmallProductCard component for each product */}
      {productList.map((product) => (
        <Box sx={boxStyle} key={product.id}>
          <AdminSmallProductCard product={product} id={product.id} />
        </Box>
      ))}
    </Flex>
  );
}

// Custom style for box component
const boxStyle = {
  width: [
    "calc(100%/2.08)",
    "calc(100%/3.13)",
    "calc(100%/3.2)",
    "calc(100%/3.2)",
  ],
};
