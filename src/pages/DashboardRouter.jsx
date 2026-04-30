import DirectorDashboard from "./DirectorDashboard";
import DeanDashboard from "./DeanDashboard";
import VCDashboard from "./VCDashboard";
import FacultyDashboard from "./Dashboard";
import HodDashboard from "./HodDashboard";

export default function DashboardRouter() {
  const role = localStorage.getItem("role");

  switch (role) {
    case "faculty":
      return <FacultyDashboard />;
    case "hod":
      return <HodDashboard />;
    case "director":
      return <DirectorDashboard />;
    case "dean":
      return <DeanDashboard />;
    case "vc":
      return <VCDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
}