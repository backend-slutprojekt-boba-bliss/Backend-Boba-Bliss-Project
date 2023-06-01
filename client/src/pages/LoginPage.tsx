import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,Text
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.";

function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  function navigateToRegister() {
    navigate("/registerPage");
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      console.log(email, password);
      setLoginError(null);
      navigate("/");
    } catch (error: any) {
      setLoginError(error.message);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") {
      setLoginError(null);
    }
  };

  return (
    <Center minHeight="90vh" minWidth="100vw"bg={["inherit"]}transition={"300ms ease"}>
      <Center
        w={["35rem"]}
        h={["92vh"]}
        bgImage={["none","url('/images/111.png')"]}
        transition={"300ms ease"}
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPosition="center"

      >
        <Center>
          <Center
            bg={["#54383E","#ACCDB5"]}
            border={"2px"}
            borderColor={"#54383E"}
            transition={"300ms ease"}
            w={"20rem"}
            h={"20rem"}
            borderRadius={"100%"}
            mt={[0,10]}
            p={10}
          >
            <Form onSubmit={handleFormSubmit}>
              <Heading
                as="h1"
                size="lg"
                textAlign={"center"}
                pb={2}
                color={["white", "#54383E"]}
              >
                Log In
              </Heading>

              <FormControl pb={3} isInvalid={!!loginError}>
                <FormLabel color={["white", "#54383E"]}>Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  bg={"white"}
                  size={"sm"}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isInvalid={!!loginError && loginError.trim() !== ""}>
                <FormLabel color={["white", "#54383E"]}>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  bg={"white"}
                  size={"sm"}
                  onChange={handleInputChange}
                />
                <FormErrorMessage>{loginError || " "}</FormErrorMessage>
              </FormControl>

              <Box display={"Flex"} justifyContent={"space-evenly"}>
                <Button
                  width="half"
                  type="submit"
                  marginTop="1em"
                  size={"sm"}
                  bg={"#FEE5BE"}
                  _hover={{ bg: "#ffefd5" }} // Apply hover color style
                  _active={{ bg: "#ffdfab" }} // Apply active color style
                >
                  Log In
                </Button>
                <Text fontSize={"xs"} pt={3}  w={"50%"} color={["white", "#54383E"]}>
                    Already have an account? <Link to="/registerPage">Register</Link>
                </Text>
              </Box>
            </Form>
          </Center>
        </Center>
      </Center>
    </Center>
  );
}

export default LoginPage;
