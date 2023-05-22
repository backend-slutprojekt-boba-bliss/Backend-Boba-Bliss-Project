import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

type LoginType = "user" | "admin";

function LoginPage() {
  const [loginType, setLoginType] = useState<LoginType>("user");

  const handleLoginChange = (type: LoginType) => {
    setLoginType(type);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your login logic here
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            <Input
              type="radio"
              value="user"
              checked={loginType === "user"}
              onChange={() => handleLoginChange("user")}
            />
            User
          </label>
          <label>
            <Input
              type="radio"
              value="admin"
              checked={loginType === "admin"}
              onChange={() => handleLoginChange("admin")}
            />
            Admin
          </label>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input id="email" name="email" type="text" />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input id="password" name="password" type="password" />
        </FormControl>

        <Button type="submit">Log In</Button>
      </form>
    </>
  );
}

export default LoginPage;
