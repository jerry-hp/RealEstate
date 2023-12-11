import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRoute() {
  const user = useSelector((state: any) => state.auth.user.user);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
