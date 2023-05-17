import { ArrowBackIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useOutsideClick
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../client/data";
import { useCart } from "../CartContext";

interface BigProductCardProps {
  product: Product;
  backgroundUrl: string;
  backgroundAlt: string;
}

export function BigProductCard({
  product,
  backgroundUrl,
  backgroundAlt,
}: BigProductCardProps) {
  // Access cart-related functions from the CartContext
  const { addToCart, removeFromCart, cartList } = useCart();

  // Set up quantity state and handlers for increasing and decreasing quantity by 1
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity == 1) {
      return false;
    } else {
      setQuantity(quantity - 1);
    }
  };

  // Set up the card reference and navigate function
  const cardRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Set up visible state and the handleClose function to hide the card and navigate to the home page
  const [visible, setVisible] = useState(true);
  const closeButtonSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  // Style object for the whole container
  const cardStyle = {
    height: "85vh",
    width: "100%",
    bgGradient: `linear(${product.bgColor} 30%, yellow.50 90%)`,
  };

  // Style object for round background
  const roundBG = {
    marginTop: ".5rem",
    backgroundColor: `${product.bgColor}`,
    height: ["20rem", "20rem", "18.5rem", "25rem", "28rem"],
    width: ["20rem", "20rem", "18.5rem", "25rem", "28rem"],
    borderRadius: "50%",
    border: "2px solid darkBrownText",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const backgroundImageWrapper = {
    ...roundBG,
    overflow: "hidden",
    zIndex: "100",
  };

  // Style object for background image
  const imageStyleBackground = (backgroundUrl: string) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    zIndex: "100",
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  // Hide the card and navigates back to home page
  const handleClose = () => {
    navigate("/");
  };

  // Detect clicks outside the card and triggers the handleClose function
  useOutsideClick({
    ref: cardRef,
    handler: () => handleClose(),
  });

  return (
    <Box ref={cardRef} sx={cardStyle}>
      <Breadcrumb
        sx={breadcrumbStyle}
        spacing="8px"
        separator={<ChevronRightIcon color="black.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/" onClick={() => navigate("/")}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/" onClick={() => navigate("/")}>
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{product.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <IconButton
        sx={xButton}
        size={closeButtonSize}
        aria-label="Back"
        icon={<ArrowBackIcon />}
        onClick={handleClose}
      />
      <Flex
        w={"100%"}
        h={"100%"}
        direction={["column-reverse", "column-reverse", "row", "row"]}
        justify={"center"}
        alignItems={"center"}
        padding={"1%"}
        marginTop={"-2rem"}
      >
        <Flex
          direction={["column-reverse", "column-reverse", "row", "row"]}
          textAlign={["center", "center", "left"]}
          justifyContent={[
            "space-evenly",
            "space-evenly",
            "space-between",
            "space-around",
          ]}
          alignItems={["center", "center", "space-evenly", "space-evenly"]}
          sx={boxStyling}
          h={["50%", "50%", "80%"]}
          w={["80%", "70%", "60%", "60%"]}
          marginTop={"-2rem"}
        >
          <Flex
            direction={"column"}
            h={"100%"}
            justifyContent={"center"}
            gap={[0, 1, 3, 4]}
            marginTop={"-2rem"}
          >
            <Heading
              data-cy="product-title"
              fontSize={["1.5rem", "1.7rem", "2rem", "2.5rem"]}
            >
              {product.title}
            </Heading>
            <Heading
              data-cy="product-price"
              fontSize={["1.5rem", "1.7rem", "1.7rem", "2rem"]}
            >
              ${product.price}
            </Heading>
            <Text data-cy="product-description">{product.description}</Text>
            <Box>
              <Flex>
                <Button sx={buttonStyle} onClick={decreaseQuantity}>
                  -
                </Button>
                <Text sx={quantityStyling}>{quantity}</Text>
                <Button sx={buttonStyle} onClick={increaseQuantity}>
                  +
                </Button>
                <Button
                  data-cy="product-buy-button"
                  sx={addButtonStyle}
                  onClick={() => addToCart(product, quantity)}
                >
                  <Icon sx={addToCartButtonStyle} as={FaCartPlus}></Icon>
                </Button>
              </Flex>
            </Box>
          </Flex>
          {/* <Box display={["none", "none", "none"]}>
            <Text>Allergens:</Text>
            <Flex direction="column" align={["center", "center", "left"]}>
              <Text sx={inputText}>{product.allergens}</Text>
            </Flex>
            <Text>Ingredients:</Text>
            <Flex direction="column" align={["center", "center", "left"]}>
              <Text sx={inputText}>{product.ingredients}</Text>
            </Flex>
          </Box> */}
        </Flex>
        <Box
          sx={boxStyling}
          h={["70%", "50%", "80%", "80%"]}
          w={["80%", "70%", "40%", "45%"]}
        >
          <Box sx={roundBG}>
            <Box as="div" sx={backgroundImageWrapper}>
              <Box as="div" sx={imageStyleBackground(backgroundUrl)}></Box>
              <Image
                sx={imageStyle}
                src={product.image}
                alt={product.imageAlt}
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

//Style object for breadcrumbs
const breadcrumbStyle = {
  padding: "1rem",
};

// Style object for product image
const imageStyle = {
  position: "absolute",
  top: ["40%", "40%", "40%", "40%"],
  left: "50%",
  transform: "translate(-50%, -50%)",
  objectFit: "cover",
  width: ["40%", "40%", "40%", "40%"],
  zIndex: "200",
};

// Style object for close button
const xButton = {
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  size: ["sm", "md", "lg"],
  background: "pink",
  color: "darkBrownText",
  _hover: {
    backgroundColor: "darkPinkButton",
    color: "white",
  },
};

// Style object for padding
const boxStyling = {
  padding: "3%",
};

// Styled object for the quantity between the -decrease +increase buttons
const quantityStyling = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "1.5rem",
  mx: "1rem",
};


// Styled object for -decrease +increase buttons
const buttonStyle = {
  backgroundColor: "darkGreenButton",
  color: "white",
  borderRadius: "4rem",
  mx: "1rem",
};

// Styled object for add to cart button
const addButtonStyle = {
  backgroundColor: "yellowButton",
  borderRadius: "4rem",
  width: "5rem",
};

// Styled object for cart icon
const addToCartButtonStyle = {
  height: "1.5rem",
  width: "1.5rem",
  color: "lightBrownText",
};
