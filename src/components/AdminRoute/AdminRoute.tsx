import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const rol = localStorage.getItem("rol");

  if (rol !== "admin") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
