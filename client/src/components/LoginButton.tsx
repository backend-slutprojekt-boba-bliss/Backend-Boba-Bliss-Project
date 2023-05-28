import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.";

const LoginButton = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoggedIn, fetchLoggedInStatus } = authContext;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isLoggedIn) {
      fetch("/api/users/logout", {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            fetchLoggedInStatus();
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
    <button onClick={handleClick}>
      {isLoggedIn ? "Log Out" : "Log In"}
    </button>
  );
};

export default LoginButton;
