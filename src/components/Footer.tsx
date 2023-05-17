import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Icon,
  Image,
  Text
} from "@chakra-ui/react";
import { FaTiktok, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { MdFacebook, MdOutlineLocationOn, MdPhoneIphone } from "react-icons/md";
import { TbCup } from "react-icons/tb";

export function Footer() {
  return (
    <Box as="footer" sx={footerStyle}>
      <Center sx={socialMediaFooter}>
        <Icon w={8} h={8} as={MdFacebook}></Icon>
        <Icon w={8} h={8} as={FiInstagram}></Icon>
        <Icon w={8} h={8} as={FaTiktok}></Icon>
        <Icon w={8} h={8} as={FaTwitter}></Icon>
      </Center>
      <Container sx={containerStyle}>
        <Grid sx={gridStyles}>
          <Flex sx={logo}>
            <Center h="7rem">
              <Image
                src="/images/bobablissicon.png"
                alt="bobasmile"
                height="7rem"
              ></Image>
            </Center>
            <Center>
              <Image src="/images/bobablisstextlogo.png" width="10rem"></Image>
            </Center>
          </Flex>
          <Flex sx={gridItemStyle}>
            <Center sx={leftIconBox}>
              <Icon w={6} h={6} as={TbCup} />
            </Center>
            <Flex
              h="100%"
              w="75%"
              direction={"column"}
              justify={"center"}
              whiteSpace={"nowrap"}
            >
              <Text as="p" fontSize="sm">
                Opening hours:
              </Text>
              <Text as="p" fontSize="sm">
                Monday - Friday: 10:00-20:00
              </Text>
              <Text as="p" fontSize="sm">
                Saturday: 10:00-18:00
              </Text>
              <Text as="p" fontSize="sm">
                Sunday: 11:00-17:00
              </Text>
            </Flex>
          </Flex>
          <Flex sx={gridItemStyle}>
            <Center sx={leftIconBox}>
              <Icon w={6} h={6} as={MdOutlineLocationOn} />
            </Center>
            <Flex sx={rightTextBox}>
              <Text as="address" sx={rightBoxText}>
                Sverigegatan 112
              </Text>
              <Text as="address" sx={rightBoxText}>
                Göteborg 45762
              </Text>
              <Text as="address" sx={rightBoxText}>
                Sweden
              </Text>
            </Flex>
          </Flex>
          <Flex sx={gridItemStyle}>
            <Center sx={leftIconBox}>
              <Icon w={5} h={6} as={MdPhoneIphone} />
            </Center>
            <Flex sx={rightTextBox}>
              <Text as="p" sx={rightBoxText}>
                Contact us:
              </Text>
              <Text as="p" sx={rightBoxText}>
                Boba@email.se
              </Text>
              <Text as="p" sx={rightBoxText}>
                0723-XXXXX
              </Text>
            </Flex>
          </Flex>
        </Grid>
      </Container>
      <Center sx={copyrightMediaFooter}>
        <Text fontSize={[".8rem", ".9rem"]}>BOBA BLISS © || 2021-2023 </Text>
      </Center>
    </Box>
  );
}

const socialMediaFooter = {
  height: "2.5rem",
  background: "beige",
  gap: ["1rem", "2rem", "3rem"],
};
const copyrightMediaFooter = {
  height: ["1.5rem", "1.7rem", "2rem"],
  background: "footerBottom",
  color: "white",
  textAlign: "center",
  FontSize: ["1.2rem", "1.7rem", "2rem"],
};

const logo = {
  flexDirection: ["column"],
  paddingLeft: ["2rem", "-2rem", "1rem"],
  padding: ".5rem",
  paddingBottom: "1rem",
  backgroundColor: "transparent",
  height: ["8.5rem", "10rem", "10rem"],
  width: ["70%", "100%", "100%"],
};

const footerStyle = {
  color: "lightBrownText",
  backgroundColor: "pink",
  maxWidth: "100%",
  height: ["35.5rem", "29.5rem", "18.5rem"],
};

const containerStyle = {
  maxWidth: "70rem",
  height: "100%",
  paddingTop: ["1rem", "2.5rem"],
};

const gridStyles = {
  templateColumns: "repeat(1, 1fr)",
  gap: ["1rem", "0rem", "2rem"],
  gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"],
  placeItems: "center",
};

const gridItemStyle = {
  padding: ".5rem",
  paddingTop: "1.8rem",
  backgroundColor: "transparent",
  height: ["6rem", "10rem", "10rem"],
  width: ["70%", "100%", "100%"],
};

const leftIconBox = {
  width: "20%",
  flexDirection: "column",
};
const rightTextBox = {
  width: "75%",
  flexDirection: "column",
  justifyContent: "center",
  whiteSpace: "nowrap",
};
const rightBoxText = {
  fontSize: "sm",
};
