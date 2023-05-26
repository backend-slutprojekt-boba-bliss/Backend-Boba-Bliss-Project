import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchLoggedInStatus = () => {
    fetch("/api/isLoggedin")
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch((error) => {
        console.error("Failed to fetch logged-in status:", error);
      });
  };
  

  useEffect(() => {
    fetchLoggedInStatus();
    const interval = setInterval(fetchLoggedInStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      fetch("/api/logout")
        .then(() => {
          setIsLoggedIn(false);
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
