import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

async function registerUser(email: string, password: string) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Registration successful");
    } else {
      console.log("Registration failed");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
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
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    setPasswordError(""); // Reset password error
    registerUser(email, password);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input id="email" name="email" type="text" />
        </FormControl>

        <FormControl isInvalid={!!passwordError}>
          <FormLabel>Password</FormLabel>
          <Input id="password" name="password" type="password" />
          <FormErrorMessage>{passwordError || " "}</FormErrorMessage>
        </FormControl>

        <Button type="submit">Register</Button>
      </form>
    </>
  );
}

export default RegisterPage;
