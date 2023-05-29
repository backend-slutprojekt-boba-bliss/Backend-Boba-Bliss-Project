import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";


interface AuthContextType {
  isAdmin: boolean;
  isLoggedIn: boolean;
  loginUser: (email:string, password:string)=> void;
  logOutUser: () => void
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const deafultContextValue: AuthContextType = {
  isAdmin: false,
  isLoggedIn: false,
  loginUser: (email:string, password:string)=> {},
  logOutUser: ()=> {},
  
}

export const AuthContext = createContext<AuthContextType>(deafultContextValue);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  console.log(isLoggedIn)
    axios
      .get("/api/users/session", )
      .then((res) => {
        console.log(isLoggedIn)
        if (res.status === 200)  {
          console.log(isLoggedIn)
          setIsLoggedIn(true);
          return
        }else {
          console.log(isLoggedIn)
          setIsLoggedIn(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const loginUser = (email: string, password: string) => {
    axios
   
      .post(
        "/api/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          // Successful login logic
          setIsLoggedIn(true);
          console.log("Login successful");
          //navigate("/");
        } else {
          // Handle login error
          console.log("Login failed");
          throw new Error("Wrong password or email");
        }
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        throw error; // Rethrow the error to be caught by the catch block in handleFormSubmit
      });
  };
  const logOutUser = () => {
    if (isLoggedIn) {
      fetch("/api/users/logout", {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            setIsLoggedIn(false); // Update isLoggedIn state in the context
            console.log("Logout successful");
          } else {
            console.log("Logout failed");
          }
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    }
  };
  const contextValue: AuthContextType = {
    isAdmin,
    isLoggedIn,
    loginUser,
    logOutUser,
   
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


