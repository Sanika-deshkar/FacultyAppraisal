import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, userRole, loading } = useAuth();
  const validRoles = ["faculty", "hod", "dean", "director", "vc"];

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        background: "linear-gradient(135deg, #dbeafe 0%, #e2e8f0 55%, #f8fafc 100%)",
        color: "#1e293b",
        fontFamily: "inherit"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            display: "inline-block", 
            width: "40px", 
            height: "40px", 
            border: "3px solid rgba(26, 111, 224, 0.2)", 
            borderTopColor: "#1a6fe0", 
            borderRadius: "50%", 
            animation: "spin 1s linear infinite",
            marginBottom: "16px"
          }}></div>
          <div style={{ fontSize: "14px", fontWeight: 600 }}>Verifying Session...</div>
        </div>
      </div>
    );
  }

  if (!user || !userRole || !validRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
