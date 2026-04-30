import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import FacultyProfile from "./pages/FacultyProfile";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleDashboard from "./pages/RoleDashboard";
import { useNavigate } from "react-router-dom";

// ─── Mock users (replace with API later) ─────────────────────────────────────
const MOCK_USERS = {
  faculty: {
    employeeId: "EMP-2025-001",
    name: "Dr. Priya Sharma",
    designation: "Assistant Professor",
    department: "CSE",
    school: "SoCSEA",
    role: "faculty",
    avatar: "PS",
  },
  hod: {
    employeeId: "EMP-2025-010",
    name: "Prof. Rajesh Kulkarni",
    designation: "Professor & Head",
    department: "CSE",
    school: "SoCSEA",
    role: "hod",
    avatar: "RK",
  },
  dean: {
    employeeId: "EMP-2025-020",
    name: "Prof. Suresh Patil",
    designation: "Dean",
    department: "Engineering",
    school: "SoEMR",
    role: "dean",
    avatar: "SP",
  },
  director: {
    employeeId: "EMP-2025-030",
    name: "Dr. Mehta",
    designation: "Director",
    department: "Administration",
    school: "University",
    role: "director",
    avatar: "DM",
  },
  vc: {
    employeeId: "EMP-2025-000",
    name: "Prof. Anil Deshmukh",
    designation: "Vice Chancellor",
    department: "Administration",
    school: "University",
    role: "vc",
    avatar: "AD",
  },
};

// ─── Profile Loader ───────────────────────────────────────────────────────────
function ProfileLoader() {
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") || "faculty").toLowerCase();
  const user = MOCK_USERS[role] || MOCK_USERS.faculty;

  return (
    <FacultyProfile
      user={user}
      onProceed={() => navigate("/dashboard")}
    />
  );
}

// ─── App Routes ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileLoader />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/hod-dashboard" element={<Navigate to="/dashboard" replace />} />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}