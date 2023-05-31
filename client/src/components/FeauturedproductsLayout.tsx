import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Product } from "../data";
import { FeauturedSmallProductCard } from "./FeauturedSmallProductCard";

interface ProductsLayoutProps {
  products: Product[];
}

interface ProductsLayoutProps {
  products: Product[];
}

export function FeauturedProductsLayout({ products }: ProductsLayoutProps) {
    return (
        <Flex
          gap={[5, 5, 5, 8]}
          p={3}
          direction="row"
          width={["100%"]}
          display="flex"
          overflowX="auto" // Enable horizontal scrolling
          css={{
            "&::-webkit-scrollbar": {
              height: "8px",
              backgroundColor: "pink.600",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "pink.600",
              borderRadius: "4px",
            },
          }}
        >
          {products.map((product) => (
            <Box sx={boxStyle} key={product._id}>
              <Link to={`/product/${product._id}`}>
                <FeauturedSmallProductCard product={product} />
              </Link>
            </Box>
          ))}
        </Flex>
      );
      
          }
const boxStyle = {
  width: [
  ],
};
