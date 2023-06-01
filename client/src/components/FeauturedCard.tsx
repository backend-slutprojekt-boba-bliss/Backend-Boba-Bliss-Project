import {
    Box,
    Container
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../data";
import { FeauturedProductsLayout } from "./FeauturedproductsLayout";

export function FeauturedCard() {

    const [products, setSelectedProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios
          .get("/api/products")
          .then((res) => {
            setSelectedProducts(res.data);
          })
          .catch((error) => console.error(error));
      }, []);

    return (
            <Box bg={"transparent"} h={["22rem","22rem","24rem", "24rem"]} w={"100%"}>
              <Container
                maxW={"100%"}
                h={"100%"}
                my={4}
                py={3}
                display={"flex"}
              >
                <FeauturedProductsLayout products={products} ></FeauturedProductsLayout>
              </Container>
            </Box>
    );
  }