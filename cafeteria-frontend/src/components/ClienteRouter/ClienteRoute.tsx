import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ClienteRoute = ({ children }: Props) => {
  const rol = localStorage.getItem("rol");

  if (!["alumno", "profesor", "personal"].includes(rol || "")) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ClienteRoute;
