import {
  Box,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../data";
import { CartCard } from "./CartCard";
import { ProductsLayout } from "./ProductsLayout";

export interface Category {
  _id: string;
  name: string;
}

export function Products() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Fetch categories
  useEffect(() => {
    axios
      .get("/api/products/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Fetch products of selected category when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      const url =
        selectedCategory === "all"
          ? "/api/products"
          : `/api/products/category/${selectedCategory}`;
      axios
        .get(url)
        .then((res) => {
          setSelectedProducts(res.data);
        })
        .catch((error) => console.error(error));
    } else {
      setSelectedProducts([]);
    }
  }, [selectedCategory]);

  return (
    <Container maxWidth="container.xl" my=".3rem">
      <Heading mt="1rem" color={"darkBrownText"}>
        Our Drinks
      </Heading>
      <Tabs
        borderRadius=".6rem"
        variant="unstyled"
        boxShadow="2px 2px 2px rgb(0,0,0, 0.2)"
        bg={"white"}
        my={5}
        width={["100%", "100%", "100%", "63.5%"]}
        isFitted
        onChange={(index) => {
          setSelectedCategory(
            index === 0 ? "all" : categories[index - 1]?._id || null
          );
        }}
      >
        <TabList>
          <Tab
            fontSize={[".6rem", ".8rem", "1rem"]}
            borderRadius=".6rem"
            _selected={{ color: "white", bg: "pinkCardButton" }}
          >
            ALL TEAS
          </Tab>
          {categories.map((category) => (
            <Tab
              fontSize={[".6rem", ".8rem", "1rem"]}
              borderRadius=".6rem"
              _selected={{ color: "white", bg: "pinkCardButton" }}
              textTransform="uppercase"
              name="categories"
              key={category._id}
              value={category._id}
            >
              {category.name}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <Flex
        direction={["column", "column", "column", "row"]}
        justify={["center", "center", "center", "space-between"]}
        gap={1}
      >
        <ProductsLayout products={selectedProducts} />

        <Box
          as="aside"
          width={["100%", "100%", "100%", "40%"]}
          position="sticky"
          top="4.3rem"
          maxHeight="calc(100vh - 3rem)"
          overflowY="auto"
        >
          <CartCard checkOutPage={false} />
        </Box>
      </Flex>
    </Container>
  );
}
