import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text
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
  function navigateToLogin() {
    navigate("/loginPage");
  }

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
            bg={["#54383E","#ffd1da"]}
            border={"2px"}
            borderColor={"#54383E"}
            transition={"300ms ease"}
            w={"20rem"}
            h={"20rem"}
            borderRadius={"50%"}
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
                Register
              </Heading>

              <FormControl pb={3} isInvalid={!!emailError || !!emailAlreadyRegistered}>
                <FormLabel color={["white", "#54383E"]}>Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  bg={"white"}
                  size={"sm"}

                />
                <FormErrorMessage>
            {emailError || emailAlreadyRegistered || " "}
          </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!passwordError} >
                <FormLabel color={["white", "#54383E"]}>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  bg={"white"}
                  size={"sm"}
                />
                <FormErrorMessage>{passwordError || " "}</FormErrorMessage>
              </FormControl>

              <Box display={"Flex"} justifyContent={"space-evenly"} alignItems={"center"}>

                <Text fontSize={"xs"} pt={3} pl={2} w={"50%"} color={["white", "#54383E"]}>
                    Already have an account? <Link to="/loginPage">Login</Link>
                </Text>

  
            
                <Button
                  width="half"
                  type="submit"
                  marginTop={"1em"}
                  size={"sm"}
                  bg={"#EEA6B4"}
                  _hover={{ bg: "#eca0af" }} // Apply hover color style
                  _active={{ bg: "#f3b9c5" }} // Apply active color style
                >
                  Register
                </Button>

              </Box>
            </Form>
          </Center>
        </Center>
      </Center>
    </Center>
  );
}
export default RegisterPage;
