// /home/admincmx/projects/casametrix-ui/src/components/PrivateRoute.tsx

import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type PrivateRouteProps = {
  children: ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // On redirige vers /login en conservant l’URL d’origine
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
