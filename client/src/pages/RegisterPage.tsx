import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  color,
} from "@chakra-ui/react";import { useState } from "react";

import { Form, Link, useNavigate } from "react-router-dom";

async function registerUser(email: string, password: string, navigate: Function) {
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 201) {
      console.log("Registration successful");
      // Redirect the user to the login page
      navigate("/loginPage");
    } else {
      console.log("Registration failed");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

function validatePassword(password: string): string | null {
  // Validate password complexity
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  }
  return null;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
    }

    setPasswordError(""); // Reset password error
    registerUser(email, password, navigate)
  };

  return (
    <Center minHeight="80vh" minWidth="100vw" bgColor="inherit">
      <Form onSubmit={handleFormSubmit}>
        <Heading as="h1" size="lg">
          Register
        </Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input id="email" name="email" type="text" />
        </FormControl>

        <FormControl isInvalid={!!passwordError}>
          <FormLabel>Password</FormLabel>
          <Input id="password" name="password" type="password" />
          <FormErrorMessage>{passwordError || " "}</FormErrorMessage>
        </FormControl>

        <Box display={"Flex"} flexDirection={"column"}>
          <Button width="full" type="submit" marginTop={"1em"}>
            Register
          </Button>
          <Box display={"block"}> 
      <h2>
      Already have an account? <Link to="/loginPage" >Login</Link>
      </h2>
      </Box>
        </Box>
      </Form>
     
     
     
    </Center>
    
  );
}
export default RegisterPage;
