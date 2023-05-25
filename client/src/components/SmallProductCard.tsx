import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import { useCart } from "../contexts/CartContext";
import { Product } from "../data";

interface SmallProductCardProps {
  product: Product;
}

export function SmallProductCard({ product }: SmallProductCardProps) {
  // Get addToCart function from useCart custom hook
  const { addToCart } = useCart();

  // Handles the Add to Cart button click
  // Add to Cart adds the product to the cart with a quantity of 1
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
      <Button
        data-cy="product-buy-button"
        sx={buttonStyle}
        onClick={handleAddToCartClick}
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
    transform: "scale(0.96)",
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
