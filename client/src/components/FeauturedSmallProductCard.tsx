import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Card, Center, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { Product } from "../data";

interface SmallProductCardProps {
  product: Product;
}

export function FeauturedSmallProductCard({ product }: SmallProductCardProps) {
  const { addToCart } = useCart();
  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToCart(product, 1);
  };

  const roundBG = {
    backgroundColor: "transparent",
    height: "auto",
    width: "90%",
    aspectRatio: "1",
    borderRadius: "50%",
    mt: ["5%"],
    position: "relative",
  };
  const cardStyle = {
    backgroundColor: product.bgColor,
    boxShadow: "3px 3px 5px gray",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    width: ["13rem","13rem","14rem"],
    overflow: "hidden",
    borderRadius: "2rem",
    transition: "0.3s ease-in-out",
    ":hover": {
      transform: "scale(0.98)",
    },
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
      <Center sx={priceStyle}>
        ${product.price.toFixed(2)}
      </Center>

      <Text data-cy="product-title" as="h6" sx={headerStyle}>
        {product.title}
      </Text>
      <Button
        data-cy="product-buy-button"
        sx={buttonStyle}
        onClick={handleAddToCartClick}
        isDisabled={
          product?.inStock === 0
        }
      >
        <FaCartPlus size={"1.2rem"}></FaCartPlus>{" "}
      </Button>


      
    </Card>
  );
}

// Style object for the card


// Style object for header text
const headerStyle = {
  textAlign: "center",
  color: "darkBrownText",
  margin: ".5rem",
  fontSize: ["1rem", "1rem", "1.2rem"],
};

// Style object for price text
const textStyle = {
  textAlign: "center",
  color: "lightBrownText",
  fontSize: ["1rem", "1rem", "1.2rem"],
};

// Style object for Add to Cart button
const buttonStyle = {
  marginBottom: "5%",
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
  objectFit: "contain",
  width: "42%",
};

const priceStyle = {
    position: "absolute",
    top: "12%",
    left: "73%",
    transform: "translate(-50%, -50%)",
    width: "3.5rem",
    height: "3.5rem",
    zIndex: "500",
    borderRadius: "50%",
    backgroundColor: "#ff8f96"

}