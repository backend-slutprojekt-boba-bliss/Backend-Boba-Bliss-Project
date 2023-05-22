import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
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
      console.log("Register successful");
    } else {
      throw new Error("Register failed");
    }
  } catch (error) {
    throw new Error("An error occurred");
  }
}

function RegisterPage() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    return "";
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
    setPasswordTouched(true);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;

    if (passwordError || !passwordTouched) {
      return; // Don't proceed with registration if there is a password error or if the password field has not been touched
    }

    try {
      await registerUser(email, password);
      // Registration successful
      console.log("Register successful");
    } catch (error) {
      // Registration failed
      console.log("Register failed:", error.message);
    }
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
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        </FormControl>

        <Button type="submit">Register</Button>
      </form>
    </>
  );
}

export default RegisterPage;
