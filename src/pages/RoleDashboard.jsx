import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard"; // Faculty
import HODDashboard from "./HODDashboard";
import DeanDashboard from "./DeanDashboard";
import DirectorDashboard from "./DirectorDashboard";
import VCDashboard from "./VCDashboard";

export default function RoleDashboard() {
  const role = (localStorage.getItem("role") || "").toLowerCase();

  switch (role) {
    case "faculty":
      return <Dashboard />;
    case "hod":
      return <HODDashboard />;
    case "dean":
      return <DeanDashboard />;
    case "director":
      return <DirectorDashboard />;
    case "vc":
      return <VCDashboard />;
    default:
      return <Navigate to="/login" />;
  }
}