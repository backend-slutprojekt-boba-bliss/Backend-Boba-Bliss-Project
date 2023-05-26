import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAdmin: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

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
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
