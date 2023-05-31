import { useState } from "react";
import { AdminOrders } from "./AdminOrders";
import {
  Box,
  Button,
  Card,
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
          <AdminOrders />
          <Box
            as="aside"
            width={["100%", "100%", "96%", "40%"]}
            position="sticky"
          >
            <AdminCard />
            <Card sx={cartStyle}>
              <Button sx={orderButtonStyle} onClick={handleButtonOnClick}>
                See Orders
              </Button>
            </Card>
          </Box>
        </Flex>
      </Container>
    );
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
        <AdminProductsLayout />
        <Box
          as="aside"
          width={["100%", "100%", "96%", "40%"]}
          position="sticky"
        >
          <AdminCard />
          <Card sx={cartStyle}>
            <Button sx={orderButtonStyle} onClick={handleButtonOnClick}>
              See Orders
            </Button>
          </Card>
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
  marginTop: "1.1rem",
};

const cartStyle: SystemStyleObject = {
  marginTop: "var(--chakra-space-1)",
  bg: "#FFF9F4",
  border: "1px solid rgb(0, 0, 0, 0.2)",
  borderRadius: "0.625rem",
  px: "1rem",
  position: "relative",
  paddingBottom: "1.1rem",
};
