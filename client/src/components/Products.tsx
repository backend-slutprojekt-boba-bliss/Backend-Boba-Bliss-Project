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
import { CartCard } from "./CartCard";
import { ProductsLayout } from "./ProductsLayout";

export interface Category {
  _id: string;
  name: string;
}

export function Products() {
  const [categories, setCategories] = useState<Category[]>([]);

  // OLD LOGIC
  const [selectedCategory, setSelectedCategory] = useState<
    "fruit" | "milk" | null
  >(null);

  useEffect(() => {
    axios
      .get("/api/products/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

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
        width={["100%", "100%", "98%", "62.5%"]}
        isFitted
        onChange={(index) => {
          if (index === 0) setSelectedCategory(null);
          if (index === 1) setSelectedCategory("fruit");
          if (index === 2) setSelectedCategory("milk");
        }}
      >
        <TabList>
          <Tab
            fontSize={[".8rem", ".9rem", "1rem"]}
            borderRadius=".6rem"
            _selected={{ color: "white", bg: "pinkCardButton" }}
          >
            ALL TEAS
          </Tab>
          {categories.map((category) => (
            <Tab
              fontSize={[".8rem", ".9rem", "1rem"]}
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
        <ProductsLayout filterCategory={selectedCategory} />

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
