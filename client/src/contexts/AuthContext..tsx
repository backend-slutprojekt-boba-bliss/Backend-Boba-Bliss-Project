import axios from "axios";
import { ReactNode, createContext, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";


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
    axios
      .get("/api/users/session", )
      .then((res) => {
        if (res.status === 200)  {
          console.log(res.data.user.isAdmin)
          setIsLoggedIn(true);
          if (res.data.user.isAdmin) {
            setIsAdmin(true);
            return
          }
          return
        }else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => console.error(error));
  }, [isLoggedIn]);

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
          
           if(response.data.userData.isAdmin === true){
            setIsAdmin(true) 
            console.log("isAdmin: " + isAdmin)
           }
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
            setIsAdmin(false);
            
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


