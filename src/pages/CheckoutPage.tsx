import { Container, SystemStyleObject } from "@chakra-ui/react";
import { CartCard } from "../components/CartCard";
import { CheckoutForm } from "../components/CheckoutForm";

export function CheckoutPage() {
  return (
    <Container sx={checkoutContainer} maxW="container.md">
      <CartCard checkOutPage={true} />
      <CheckoutForm />
    </Container>
  );
}

const checkoutContainer: SystemStyleObject = {
  mt: "5rem",
  mb: "2rem",
  borderRadius: "0.625rem",
  py: "1rem",
  bg: "lightYellow",
};
