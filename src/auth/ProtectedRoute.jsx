import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role");
  const validRoles = ["faculty", "hod", "dean", "director", "vc"];

  if (!role || !validRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}