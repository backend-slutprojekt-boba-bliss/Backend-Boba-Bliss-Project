import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";

async function loginUser(email: string, password: string, navigate: Function) {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Successful login logic
      console.log("Login successful");
      navigate("/");
    } else {
      // Handle login error
      console.log("Login failed");
      throw new Error("Wrong password or Email");
    }
  } catch (error) {
    console.log("An error occurred:", error);
    throw error; // Rethrow the error to be caught by the catch block in handleFormSubmit
  }
}


function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  function navigateToRegister(){
    navigate("/registerPage");
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password, navigate);
      setLoginError(null); // Reset the login error if login succeeds
    } catch (error) {
      setLoginError("Wrong password or Email");
    }
  };

  return (
    <Center minHeight="80vh" minWidth="100vw" bgColor="inherit">
      <Form onSubmit={handleFormSubmit}>
        <Heading as="h1" size="lg">
          Log In
        </Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input id="email" name="email" type="text" />
        </FormControl>

        <FormControl isInvalid={!!loginError}>
          <FormLabel>Password</FormLabel>
          <Input id="password" name="password" type="password" />
          <FormErrorMessage>{loginError || " "}</FormErrorMessage>
        </FormControl>

        <Box display={"Flex"} justifyContent={"space-evenly"}>
          <Button width="half" type="submit" marginTop={"1em"}>
            Log In
          </Button>
          <Button width="half" onClick={navigateToRegister} marginTop={"1em"}>
            Register
          </Button>
        </Box>
      </Form>
    </Center>
  );
}

export default LoginPage;
