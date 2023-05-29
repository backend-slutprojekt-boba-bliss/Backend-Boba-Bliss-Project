import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.";

function LoginPage() {
  const {loginUser} = useContext(AuthContext);
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
      loginUser(email, password);
      setLoginError(null); // Reset the login error if login succeeds
      navigate("/")
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
