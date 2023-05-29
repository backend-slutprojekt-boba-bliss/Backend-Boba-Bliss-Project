import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

async function registerUser(
  email: string,
  password: string,
  navigate: Function,
  setEmailAlreadyRegistered: (error: string) => void
) {
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
    } else if (response.status === 409) {
      const data = await response.json();
      setEmailAlreadyRegistered("Email already registered");
      console.log("Email already registered");
    } else {
      console.log("Registration failed");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

function validateEmail(email: string): string | null {
  // Validate email format using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return null;
}

function validatePassword(password: string): string | null {
  // Validate password complexity
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  }
  return null;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
    setEmailError(""); // Reset email error

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    setPasswordError(""); // Reset password error
    registerUser(email, password, navigate, setEmailAlreadyRegistered);
  };

  return (
    <Center minHeight="80vh" minWidth="100vw" bgColor="inherit">
      <Form onSubmit={handleFormSubmit}>
        <Heading as="h1" size="lg">
          Register
        </Heading>

        <FormControl isInvalid={!!emailError || !!emailAlreadyRegistered}>
          <FormLabel>Email</FormLabel>
          <Input id="email" name="email" type="text" />
          <FormErrorMessage>
            {emailError || emailAlreadyRegistered || " "}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!passwordError}>
          <FormLabel>Password</FormLabel>
          <Input id="password" name="password" type="password" />
          <FormErrorMessage width="17rem">
            {passwordError || " "}
          </FormErrorMessage>
        </FormControl>

        <Box display={"Flex"} flexDirection={"column"}>
          <Button width="full" type="submit" marginTop={"1em"}>
            Register
          </Button>
          <Box display={"block"}>
            <h2>
              Already have an account? <Link to="/loginPage">Login</Link>
            </h2>
          </Box>
        </Box>
      </Form>
    </Center>
  );
}
export default RegisterPage;
