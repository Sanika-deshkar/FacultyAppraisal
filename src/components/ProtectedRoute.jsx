function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role");
  return role ? children : <Navigate to="/login" />;
}