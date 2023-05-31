import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { Product } from "../data";

interface SmallProductCardProps {
  product: Product;
}

export function SmallProductCard({ product }: SmallProductCardProps) {
  const { addToCart } = useCart();
  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToCart(product, 1);
  };

  const roundBG = {
    backgroundColor: product.bgColor,
    height: "auto",
    width: "90%",
    aspectRatio: "1",
    borderRadius: "50%",
    mt: ["5%"],
    mb: [".3rem", ".5rem", "0rem", "1rem"],
    position: "relative",
    boxShadow: "1px 5px 5px gray",
  };

  const stockMessage = product?.inStock ?? 0 > 0 ? "In stock" : "Out of stock";
  const stockIcon =
    product?.inStock ?? 0 > 0 ? (
      <CheckIcon color="green.500" />
    ) : (
      <CloseIcon color="red.500" />
    );

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {})
      .catch((error) => console.error(error));
  }, []);

  return (
    <Card data-cy="product" align="center" sx={cardStyle}>
      <Box sx={roundBG}>
        <Image
          sx={imageStyle}
          src={"/api/file/" + product.image}
          alt={product.imageAlt}
        />
      </Box>
      <Text data-cy="product-title" as="h6" sx={headerStyle}>
        {product.title}
      </Text>
      <Text data-cy="product-price" sx={textStyle}>
        ${product.price.toFixed(2)}
      </Text>
      <Box>
        <Flex
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            fontSize: ".8rem",
          }}
        >
          {stockMessage}
          {stockIcon}
        </Flex>
      </Box>
      <Button
        data-cy="product-buy-button"
        sx={buttonStyle}
        onClick={handleAddToCartClick}
        isDisabled={
          product?.inStock === 0
        }
      >
        Add to cart{" "}
      </Button>
    </Card>
  );
}

// Style object for the card
const cardStyle = {
  backgroundColor: "lightYellow",
  boxShadow: "3px 3px 5px gray",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  overflow: "hidden",
  transition: "0.3s ease-in-out",
  ":hover": {
    backgroundColor: "#f3e5d7",
    transform: "scale(0.98)",
  },
};

// Style object for header text
const headerStyle = {
  textAlign: "center",
  color: "darkBrownText",
  margin: ".5rem",
  fontSize: ["1rem", "1rem", "1.4rem"],
};

// Style object for price text
const textStyle = {
  textAlign: "center",
  color: "lightBrownText",
  fontSize: ["1rem", "1rem", "1.4rem"],
};

// Style object for Add to Cart button
const buttonStyle = {
  margin: "5%",
  backgroundColor: "pinkCardButton",
  color: "lightBrownText",
  _hover: {
    backgroundColor: "darkPinkButton",
    color: "white",
  },
};

// Style object for product image
const imageStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  objectFit: "cover",
  width: "35%",
};
