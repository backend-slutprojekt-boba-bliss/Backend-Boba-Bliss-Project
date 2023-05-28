import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAdmin: boolean;
  isLoggedIn: boolean;
  fetchLoggedInStatus: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const deafultContextValue: AuthContextType = {
  isAdmin: false,
  isLoggedIn: false,
  fetchLoggedInStatus: () => {}
}

export const AuthContext = createContext<AuthContextType>(deafultContextValue);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/users/session");
        const data = await response.json();
        setIsAdmin(data.user && data.user.isAdmin);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSession();
    fetchLoggedInStatus();
  }, []);

  const fetchLoggedInStatus = () => {
    // Fetch logged-in status and update isLoggedIn
    fetch("/api/users/isLoggedin")
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch((error) => {
        console.error("Failed to fetch logged-in status:", error);
      });
  };

  const contextValue: AuthContextType = {
    isAdmin,
    isLoggedIn,
    fetchLoggedInStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
