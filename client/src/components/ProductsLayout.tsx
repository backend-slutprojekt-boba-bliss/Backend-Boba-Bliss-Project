import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Product } from "../data";
import { SmallProductCard } from "./SmallProductCard";

// Three categories: fruit, milk or null (all)
interface ProductsLayoutProps {
  products: Product[];
}

export function ProductsLayout({ products }: ProductsLayoutProps) {
  return (
    <Flex
      gap={[2, 2, 3, 4]}
      my={1}
      direction="row"
      wrap={"wrap"}
      width={["100%", "100%", "100%", "70%"]}
    >
      {/* Iterate through the products and render SmallProductCard components */}
      {products.map((product) => (
        <Box sx={boxStyle} key={product._id}>
          {/* Wrap each SmallProductCard with a link for navigation */}
          <Link key={product._id} to={`/product/${product._id}`}>
            <SmallProductCard product={product} />
          </Link>
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
