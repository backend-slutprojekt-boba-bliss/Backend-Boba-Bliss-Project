import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
    <>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input id="email" name="email" type="text" />
        </FormControl>

        <FormControl isInvalid={!!loginError}>
          <FormLabel>Password</FormLabel>
          <Input id="password" name="password" type="password" />
          <FormErrorMessage>{loginError || " "}</FormErrorMessage>
        </FormControl>

        <Button type="submit">Log In</Button>
      </form>
    </>
  );
}

export default LoginPage;
