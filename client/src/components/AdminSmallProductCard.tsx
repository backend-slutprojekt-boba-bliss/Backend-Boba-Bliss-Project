import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  Flex,
  Image,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../client/data";
import { useProduct } from "../ProductContext";

interface SmallProductCardProps {
  product: Product;
  id: string;
}

export function AdminSmallProductCard({ product, id }: SmallProductCardProps) {
  // Manage the state of the AlertDialog component for confirming product deletion
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Cancel button reference in the AlertDialog
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Get the removeProduct and editProduct functions from the ProductContext
  const { removeProduct, editProduct } = useProduct();

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

  // Handle the product deletion process
  const handleDelete = () => {
    removeProduct(product.id);
    onClose();
  };

  const handleEdit = () => {
    editProduct(product);
  };

  return (
    <Card data-cy="product" align="center" sx={cardStyle}>
      <Text data-cy="product-id">{id}</Text>
      <Box sx={roundBG}>
        <Image sx={imageStyle} src={product.image} alt={product.imageAlt} />
      </Box>
      <Text data-cy="product-title" sx={headerStyle}>
        {product.title}
      </Text>
      <Text data-cy="product-price" sx={textStyle}>
        ${product.price.toFixed(2)}
      </Text>
      <Flex alignItems="center">
        <Link to={`product/${product.id}`}>
          <Button
            data-cy="admin-edit-product"
            onClick={handleEdit}
            sx={buttonStyle}
          >
            Edit
          </Button>
        </Link>
        <Button
          data-cy="admin-remove-product"
          sx={deleteButtonStyle}
          onClick={onOpen}
        >
          Delete
        </Button>

        <AlertDialog
          isCentered
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Product
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  data-cy="confirm-delete-button"
                  colorScheme="red"
                  onClick={handleDelete}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Card>
  );
}

// Style object for card
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
  },
};

// Style object for header
const headerStyle = {
  textAlign: "center",
  color: "darkBrownText",
  margin: ".5rem",
  fontSize: ["1rem", "1rem", "1.4rem"],
};

// Style object for price
const textStyle = {
  textAlign: "center",
  color: "lightBrownText",
  fontSize: ["1rem", "1rem", "1.4rem"],
};

// Style object for button
const buttonStyle = {
  margin: "5%",
  backgroundColor: "#f5c945",
  color: "white",
  _hover: {
    backgroundColor: "darkPinkButton",
    color: "white",
  },
};

// Style object for delete button
const deleteButtonStyle = {
  margin: "5%",
  backgroundColor: "#eb3f3f",
  color: "white",
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
