import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext.";
import LoginButton from "./LoginButton";



export function Header() {
  const { isAdmin } = useContext(AuthContext);
  const { totalItems, cartList } = useCart();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobileView, setIsMobileView] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
      onClose();
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
        onClose();
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    onClose();
  };


  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "DELETE",
      });
  
      // Handle the response as needed
      if (response.ok) {
        // Logout was successful
        // Perform any additional actions after logout
      } else {
        // Handle error cases
        // ...
      }
    } catch (error) {
      console.error(error);
      // Handle error cases
      // ...
    }
  };

  return (
    <Container as="header" sx={containerStyle}>
      <Flex as="nav" sx={flexStyle}>
        {/* LOGO */}
        <HStack>
          <ChakraLink as={RouterLink} to="/" sx={linkStyles}>
            <Image src="/images/bobablissiconupdate.png" alt="Logo" sx={logo} />
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/" sx={linkStyles}>
            <Image
              src="/images/bobablisstextlogotest.png"
              alt="Logo"
              sx={logoText}
            />
          </ChakraLink>
        </HStack>
        <Spacer />

        {/* LINKS */}
        {!isMobileView ? (
          <Box>
            <HStack spacing="1rem" whiteSpace="nowrap">
              <LoginButton></LoginButton>
              <ChakraLink as={RouterLink} to="/">
                <Icon
                  verticalAlign="sub"
                  width="1.8em"
                  height="1.8em"
                  as={AiFillHome}
                  _hover={{ color: "#c8a59b" }}
                />
              </ChakraLink>
              {isAdmin && (
                <ChakraLink data-cy="admin-link" as={RouterLink} to="/admin">
                <Icon
                  verticalAlign="sub"
                  width="1.8em"
                  height="1.8em"
                  as={RiAdminFill}
                  _hover={{ color: "#c8a59b" }}
                />
              </ChakraLink>
              )}
              
              <ChakraLink
                data-cy="cart-link"
                as={RouterLink}
                to="/checkout"
                sx={{
                  linkStyles,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon
                  verticalAlign="sub"
                  width="1.8em"
                  height="1.8em"
                  as={IoMdCart}
                  _hover={{ color: "#c8a59b" }}
                />
                <Text data-cy="cart-items-count-badge">({totalItems})</Text>
              </ChakraLink>
            </HStack>
          </Box>
        ) : (
          /* HAMBURGER MENU */
          <HStack>
            <ChakraLink
              data-cy="cart-link"
              as={RouterLink}
              to="/checkout"
              sx={{
                linkStyles,
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleLinkClick}
            >
              <Icon
                verticalAlign="sub"
                width="1.8em"
                height="1.8em"
                as={IoMdCart}
              />
              <Text data-cy="cart-items-count-badge">({totalItems})</Text>
            </ChakraLink>
            <IconButton
              aria-label="Hamburger menu"
              variant="ghost"
              icon={<HamburgerIcon />}
              size="lg"
              onClick={onOpen}
              _hover={{ backgroundColor: "darkPinkButton", color: "white" }}
            />
          </HStack>
        )}
      </Flex>

      {/* HAMBURGER MENU DRAWER */}
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent sx={hamburgerMenuStyling}>
          <DrawerCloseButton />
          <Box py="4">
            <ChakraLink
              as={RouterLink}
              to="/"
              display="block"
              mx="4"
              my="2"
              onClick={handleLinkClick}
            >
              Home
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/admin"
              display="block"
              mx="4"
              my="2"
              onClick={handleLinkClick}
            >
              Admin
            </ChakraLink>
            <ChakraLink
              data-cy="cart-link"
              as={RouterLink}
              to="/checkout"
              display="flex"
              mx="4"
              my="2"
              onClick={handleLinkClick}
            >
              <Icon
                verticalAlign="sub"
                width="1.8em"
                height="1.8em"
                as={IoMdCart}
              />
              <Text data-cy="cart-items-count-badge">({totalItems})</Text>
            </ChakraLink>
          </Box>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

const containerStyle = {
  position: "fixed",
  zIndex: "1000",
  top: 0,
  maxWidth: "100%",
  backgroundColor: "pink",
  color: "lightBrownText",
  height: ["4.3rem"],
};

const linkStyles = {
  _hover: {
    color: "white",
  },
};

const flexStyle = {
  p: ".5rem",
  alignItems: "center",
  justifyContent: "center",
  height: ["4.3rem"],
};

const logo = {
  width: ["3.5rem"],
};

const logoText = {
  width: ["6rem", "6rem", "9rem"],
  ml: [".5rem", ".5rem"],
};

const hamburgerMenuStyling = {
  zIndex: "3000",
  color: "lightBrownText",
  backgroundColor: "pink",
};
