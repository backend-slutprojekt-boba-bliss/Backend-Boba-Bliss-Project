import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link as ChakraLink,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export function CartCard({ checkOutPage = true }) {
  const { addToCart, removeFromCart, cartList, clearCart } = useCart();

  const totalPrice = cartList.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.price;
  }, 0);

  const cardBodyFontSize = useBreakpointValue({ base: "1rem", sm: "1.2rem" });
  const cardFooterFontSize = useBreakpointValue({ base: "1rem", sm: "1.2rem" });

  return (
    <Card sx={cartStyle}>
      <Flex sx={flexStyle}>
        <CardHeader w="100%" display="flex" p="5px">
          <Heading size="lg">{checkOutPage ? "Your Cart" : "Cart"}</Heading>
          <Spacer />
          <IconButton
            sx={buttonStyle}
            aria-label="Clear cart"
            icon={<DeleteIcon />}
            onClick={() => clearCart(cartList)}
          />
        </CardHeader>
        <CardBody fontSize={cardBodyFontSize} width="100%" p="0">
          {cartList.length > 0 ? (
            <UnorderedList listStyleType="none" marginInlineStart="0">
              {cartList.map((cartItem) => (
                <ListItem data-cy="cart-item" key={cartItem._id}>
                  <Flex sx={cartItemStyle}>
                    {checkOutPage && (
                      <Image
                        sx={thumbNailStyle}
                        src={"/api/file/" + cartItem.image}
                        alt={cartItem.imageAlt}
                      />
                    )}
                    <HStack paddingTop="10px" marginRight="0.5rem">
                      <Button
                        data-cy="decrease-quantity-button"
                        sx={incrementButtonStyle}
                        onClick={() => removeFromCart(cartItem._id)}
                      >
                        -
                      </Button>
                      <Text data-cy="product-quantity" sx={quantityStyle}>
                        {/* input is cypress-fix */}
                        <input
                          disabled
                          value={cartItem.quantity}
                          onChange={(e) =>
                            addToCart(
                              cartItem,
                              parseInt(e.target.value) - cartItem.quantity
                            )
                          }
                          style={{
                            position: "absolute",
                            width: "1px",
                            height: "1px",
                          }}
                        />
                        {cartItem.quantity}
                      </Text>
                      <Button
                        data-cy="increase-quantity-button"
                        sx={incrementButtonStyle}
                        onClick={() => addToCart(cartItem, 1)}
                      >
                        +
                      </Button>
                    </HStack>
                    <Text
                      data-cy="product-title"
                      paddingTop="10px"
                      flex={1}
                      textAlign="left"
                    >
                      {cartItem.title}
                    </Text>
                    <Text data-cy="product-price" paddingTop="10px">
                      ${cartItem.quantity * cartItem.price}
                    </Text>
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
          ) : (
            <Heading textAlign="center" size="md">
              Your cart is empty!
            </Heading>
          )}
        </CardBody>
        <CardFooter fontSize={cardFooterFontSize} sx={cardFooterStyle}>
          <Divider bg="gray" opacity="1" />
          <Flex my="0.625rem" width="100%" justifyContent="space-between">
            <Text>Total:</Text>
            <Text data-cy="total-price">${totalPrice}</Text>
          </Flex>
          {!checkOutPage && (
            <ChakraLink as={RouterLink} to="/checkout">
              <Button sx={orderButtonStyle}>Order</Button>
            </ChakraLink>
          )}
        </CardFooter>
      </Flex>
    </Card>
  );
}

const cartStyle = {
  marginTop: "var(--chakra-space-1)",
  bg: "#FFF9F4",
  border: "1px solid rgb(0,0,0, 0.2)",
  borderRadius: "0.625rem",
  padding: "1rem",
  position: "relative",
};

const thumbNailStyle = {
  width: "2rem",
  marginRight: "1rem",
};

const flexStyle = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "1.25rem",
};

const buttonStyle = {
  background: "red.400",
  _hover: {
    background: "red",
  },
  color: "white",
};

const cartItemStyle = {
  alignItems: "center",
  my: "0.625rem",
};

const incrementButtonStyle = {
  bg: "pinkCardButton",
  marginStart: "0!important",
  marginEnd: "0!important",
};

const quantityStyle = {
  m: "0",
  w: "2rem",
  textAlign: "center",
  marginStart: "0!important",
};

export const orderButtonStyle = {
  width: "100%",
  bg: "lightGreenButton",
  _hover: {
    background: "#96b59e",
  },
  color: "black",
  fontSize: "1.2rem",
};

const cardFooterStyle = {
  width: "100%",
  display: "block",
  p: "0",
};
