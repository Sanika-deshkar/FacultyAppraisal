import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { SCHOOL_CONFIG } from "../constants/formConfig";
import { useAuth } from "../context/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";

const Dashboard = React.lazy(() => import("./Dashboard"));
const HODDashboard = React.lazy(() => import("./HODDashboard"));
const DeanDashboard = React.lazy(() => import("./DeanDashboard"));
const DirectorDashboard = React.lazy(() => import("./DirectorDashboard"));
const VCDashboard = React.lazy(() => import("./VCDashboard"));

export default function RoleDashboard() {
  const { userRole, userData } = useAuth();
  const role = userRole ? userRole.toLowerCase() : "";
  const school = userData.school || "";

  const renderDashboard = () => {
    switch (role) {
      case "faculty":
        return <Dashboard />;
      
      case "hod": {
        const hasHod = SCHOOL_CONFIG[school]?.hasHod ?? true;
        if (!hasHod) {
          // If school has no HOD, redirect HOD user to Director (though normally HOD wouldn't exist)
          return <DirectorDashboard />;
        }
        return <HODDashboard />;
      }

      case "director":
        return <DirectorDashboard />;
        
      case "dean":
        return <DeanDashboard />;
        
      case "vc":
        return <VCDashboard />;
        
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Georgia, serif", color: "#1e293b", fontSize: "1.2rem" }}>Loading Dashboard...</div>}>
        {renderDashboard()}
      </Suspense>
    </ErrorBoundary>
  );
}
