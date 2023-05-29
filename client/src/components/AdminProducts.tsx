import { useState } from "react";
import { AdminOrders } from "./AdminOrders";
import {
  Box,
  Button,
  Container,
  Flex,
  SystemStyleObject,
} from "@chakra-ui/react";
import { AdminProductsLayout } from "./AdminProductsLayout";
import { AdminCard } from "./AdminCard";
// ...

export function AdminProducts() {
  const [showOrders, setShowOrders] = useState(false);

  const handleButtonOnClick = () => {
    setShowOrders(true);
  };
  
  if (showOrders) {
    return <AdminOrders />;
  }

  return (
    <Container maxWidth="container.xl" my=".3rem">
      <Flex
        direction={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
        ]}
        justify={["center", "center", "center", "space-between"]}
        gap={1}
      >
        {/* Renders a list of product cards in a grid layout. Displays products managed by an admin */}
        <AdminProductsLayout />
        <Box as="aside" width={["100%", "100%", "96%", "40%"]}>
          <AdminCard />
          <Box sx={orderButtonBoxStyle}>
            <Button sx={orderButtonStyle} onClick={handleButtonOnClick}>
              See Orders
            </Button>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

const orderButtonStyle: SystemStyleObject = {
  mt: "1.1rem",
  width: "100%",
  bg: "lightGreenButton",
  color: "black",
};


const orderButtonBoxStyle: SystemStyleObject = {
	
  };
