import { ArrowBackIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Product } from "../data";

interface BigProductCardProps {
  product: Product;
  backgroundUrl: string;
}

export function BigProductCard({
  product,
  backgroundUrl,
}: BigProductCardProps) {
  const { addToCart } = useCart();

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

  const closeButtonSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  // Style object for the whole container
  const cardStyle = {
    height: "90vh",
    width: "100%",
    display: "flex",
    position: "relative",
    bgGradient: `linear(${product.bgColor} 30%, yellow.50 90%)`,
  };

  // Style object for round background
  const roundBG = {
    backgroundColor: `${product.bgColor}`,
    height: ["15rem", "16rem", "17rem", "25rem", "25rem"],
    width: ["15rem", "16rem", "17rem", "25rem", "25rem"],
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

  const handleClose = () => {
    navigate("/products");
  };

  useOutsideClick({
    ref: cardRef,
    handler: () => handleClose(),
  });

  const buttonStyle = {
    color: "darkChocolateBrown",
    borderRadius: "4rem",
    _hover: {
      bgGradient: `linear(${product.bgColor} 10%, yellow.50 100%)`,
    },
  };

  return (
    <Box
      ref={cardRef}
      sx={cardStyle}
      justifyContent={["flex-end", "center"]}
      alignItems={["flex-end", "flex-end", "center"]}
      pb={5}
    >
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
          <BreadcrumbLink
            as={Link}
            to="/products"
            onClick={() => navigate("/products")}
          >
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
      <Container
        w={["90%"]}
        maxW={"80rem"}
        h={["90%", "90%", "65%", "85%"]}
        display={"flex"}
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"#fffdf9"}
        borderRadius={"1rem"}
        boxShadow="1px 5px 5px gray"
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
          h={["40%", "50%", "80%"]}
          w={["80%", "70%", "60%", "60%"]}
        >
          <Flex
            direction={"column"}
            h={"100%"}
            justifyContent={"center"}
            gap={[2, 2, 4, 4]}
            maxW={"25rem"}
          >
            <Heading
              data-cy="product-title"
              fontSize={["1.3rem", "1.7rem", "2rem", "2.5rem"]}
            >
              {product.title}
            </Heading>
            <Heading
              data-cy="product-price"
              fontSize={["1.5rem", "1.7rem", "1.7rem", "2rem"]}
            >
              ${product.price}
            </Heading>
            <Box>
              <Text data-cy="product-description" mb={1}>
                {product.description}
              </Text>
              <Text fontSize="xs">
                {product.inStock === 0
                  ? "Out of Stock!"
                  : `Hurry! Only: ${product.inStock} in Stock!`}
              </Text>
            </Box>
            <Box>
              <Flex justify={["center", "center", "flex-start"]}>
                <Flex justify={"space-between"} w={["50%", "50%", "30%"]}>
                  <Button
                    sx={buttonStyle}
                    onClick={decreaseQuantity}
                    bg={product.bgColor}
                  >
                    -
                  </Button>
                  <Text sx={quantityStyling}>{quantity}</Text>
                  <Button
                    sx={buttonStyle}
                    onClick={increaseQuantity}
                    bg={product.bgColor}
                  >
                    +
                  </Button>
                </Flex>
                <Button
                  data-cy="product-buy-button"
                  sx={addButtonStyle}
                  marginLeft={5}
                  onClick={() => addToCart(product, quantity)}
                  isDisabled={
                    product?.inStock === 0 || quantity > (product?.inStock || 0)
                  }
                >
                  <Icon sx={addToCartButtonStyle} as={FaCartPlus}></Icon>
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Box
          sx={boxStyling}
          h={["50%", "45%", "80%", "80%"]}
          w={["70%", "70%", "40%", "45%"]}
        >
          <Box sx={roundBG}>
            <Box as="div" sx={backgroundImageWrapper}>
              <Box as="div" sx={imageStyleBackground(backgroundUrl)}></Box>
              <Image
                sx={imageStyle}
                src={"/api/file/" + product.image}
                alt={product.imageAlt}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

//Style object for breadcrumbs
const breadcrumbStyle = {
  padding: "1rem",
  position: "absolute",
  top: "0",
  left: "0",
};

// Style object for product image
const imageStyle = {
  position: "absolute",
  top: ["45%", "45%", "45%", "45%"],
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["40%", "40%", "40%", "45%"],
  zIndex: "5000",
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

const boxStyling = {
  padding: "3%",
};

// Styled object for the quantity between the -decrease +increase buttons
const quantityStyling = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "1.5rem",
};


// Styled object for add to cart button
const addButtonStyle = {
  backgroundColor: "yellowButton",
  borderRadius: "4rem",
  width: "5rem",
  _hover: {
    backgroundColor: "#ffdda6",
    color: "black",
  },
  _active: {
    backgroundColor: "#ffefd6",
    color: "black",
  },
};

// Styled object for cart icon
const addToCartButtonStyle = {
  height: "1.5rem",
  width: "1.5rem",
  color: "lightBrownText",
};
