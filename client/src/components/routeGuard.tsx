import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.";

const AdminRouteGuard = <P extends object>(Component: React.ComponentType<P>) => {
  const { isAdmin } = useContext(AuthContext);

  const WrappedComponent: React.FC<P> = (props) => {
    if (!isAdmin) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default AdminRouteGuard;
