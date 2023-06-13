import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = UseAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
