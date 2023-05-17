import {
  Box, Center,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text
} from "@chakra-ui/react";
import { Products } from "../components/Products";
import { TimeForTeaCard } from "../components/TimeForTeaCard";

export function HomePage() {
  return (
    <Box sx={bigGradient}>
      <Flex
        sx={gradientBackground}
        display={["row", "row", "flex"]}
        paddingTop={["0rem", "0rem", "5rem"]}
        h={"100%"}
        gap={4}
      >
        <Box
          marginLeft={[null, null, "2vw", "4vw", "8vw", "14vw"]}
          marginRight={[null, null, "2vw", "4vw", "5vw"]}
          zIndex={20}
        >
          <Image
            src="/images/showcaseimg.png"
            alt="Image of bubble tea"
            width="auto"
            maxHeight={["auto", "auto", "27rem", "35rem"]}
            display={["none", "none", "flex"]}
          />
        </Box>
        <Container maxWidth={["auto", "25rem", "27rem", "29rem"]}>
          <Heading
            fontSize={["2rem", "2.1rem", "3rem", "3.5rem"]}
            color={"lightBrownText"}
          >
            Boba Bliss
          </Heading>
          <Text
            fontSize={["1.5rem", "1.3rem", "1.6rem", "1.6rem"]}
            color={"lightBrownText"}
            fontWeight="bold"
            display={["none", "none", "flex"]}
          >
            Your ultimate destination for an exquisite bubble tea experience.
          </Text>
          <Text
            fontSize={[".85rem", ".9rem", "1rem", "1rem"]}
            color={"lightBrownText"}
            fontFamily="Comfortaa"
            marginTop="1rem"
            zIndex={"500"}
            position={"relative"}
          >
            Our wide variety of flavors, toppings, and customizable options
            ensure that every visit is a delightful journey.
            <br></br>
            <br></br>
            Savor the perfect blend of quality ingredients, crafted with love
            and expertise, and indulge in the true essence of bubble tea
            paradise.
          </Text>
          <Center>
            <Image
              zIndex={20}
              src="/images/showcaseimg.png"
              alt="Image of bubble tea"
              width="auto"
              maxHeight={["19rem", "20rem", "20rem", "30rem"]}
              display={["flex", "flex", "none"]}
            />
          </Center>
          <Stack
            direction={["column", null, "row"]}
            spacing={4}
            align="center"
            justifyContent="flex-start"
            marginTop="40px"
            display={["none", "none", "none", "flex"]}
          >
          </Stack>
        </Container>
      </Flex>
      <Image
        src="/images/crescent.png"
        alt=""
        width="auto"
        height="auto"
        bg={"pink"}
        marginBottom={["8rem", "8rem", "5rem", "8rem"]}
      />
      <Products />
      <TimeForTeaCard />
    </Box>
  );
}

const gradientBackground = {
  background: "rgb(254, 211, 212)",
  backgroundImage:
    "linear-gradient(0deg, rgba(254, 211, 212, 1) 0%, rgba(255, 241, 221, 1) 47%, rgba(254, 211, 212, 1) 100%, rgba(255, 255, 255, 1) 100%)",
  width: "100%",
  height: "20rem",
  color: "lightBrownText",
  fontFamily: "Inconsolata",
};

const bigGradient = {
  backgroundImage: "linear-gradient(to bottom, transparent 22%, #FED3D4)",
  backgroundColor: "#fffaf4",
};

const buttonStyling = {
  colorScheme: "brown",
  variant: "outline",
  borderRadius: "50px",
  border: "2px",
  padding: "1.5rem",
  fontFamily: "Comfortaa",
  background: "none",
  transition: "all 250ms ease-in-out",
  _hover: {
    color: "white",
  },
  _active: {
    background: "none",
    transform: "scale(0.96)",
  },
};
