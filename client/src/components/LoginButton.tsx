import { Button, Flex, Text} from "@chakra-ui/react";
import React, { useContext } from "react";
import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.";

const LoginButton = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoggedIn, logOutUser} = authContext;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isLoggedIn) {
      fetch("/api/users/logout", {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            logOutUser()
            navigate("/")
          }
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    } else {
      navigate("/loginPage");
    }
  };

  return (
    <Button onClick={handleClick} variant={"outline"} color={"darkChocolateBrown"} sx={loginbtn}>
      {isLoggedIn ? (
        <Flex justify={"center"} align= {"center"}>
          <Text>log out</Text>
          <BiExit size="1.4rem" />
          
        </Flex>
      ) : (
        <span>Log In</span>
      )}
    </Button>
  );
};


const loginbtn = {
  border: "2px solid #412D2D"
};

export default LoginButton;
