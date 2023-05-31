import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
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
            fontWeight={600}
            fontSize={["1.5rem", "1.3rem", "1.6rem", "1.6rem"]}
            color={"lightBrownText"}
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
          ></Stack>
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

      <TimeForTeaCard />
    </Box>
  );
}

const gradientBackground = {
  background: "#FED3D4",
  width: "100%",
  height: "20rem",
  color: "lightBrownText",
  fontFamily: "Inconsolata",
};

const bigGradient = {
  backgroundImage: "linear-gradient(to bottom, transparent 90%, #FED3D4)",
  backgroundColor: "#fffaf4",
};
