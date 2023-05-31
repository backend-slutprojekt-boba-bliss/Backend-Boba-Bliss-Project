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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";
import { Product } from "../data";

interface SmallProductCardProps {
  product: Product;
  id: string;
}

export function AdminSmallProductCard({ product, id }: SmallProductCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const { deleteProduct, editProduct } = useProduct();

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

  const handleDelete = () => {
    deleteProduct(product._id);
    onClose();
  };

  const handleEdit = () => {
    editProduct(product);
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
      <Text data-cy="product-title" sx={headerStyle}>
        {product.title}
      </Text>
      <Text data-cy="product-price" sx={textStyle}>
        ${product.price.toFixed(2)}
      </Text>
      <Flex alignItems="center">
        <Link to={`product/${product._id}`}>
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

const buttonStyle = {
  margin: "5%",
  backgroundColor: "#f5c945",
  color: "white",
  _hover: {
    backgroundColor: "darkPinkButton",
    color: "white",
  },
};

const deleteButtonStyle = {
  margin: "5%",
  backgroundColor: "#eb3f3f",
  color: "white",
  _hover: {
    backgroundColor: "darkPinkButton",
    color: "white",
  },
};

const imageStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  objectFit: "cover",
  width: "35%",
};
