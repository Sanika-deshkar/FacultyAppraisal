import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const FacultyProfile = React.lazy(() => import("./pages/FacultyProfile"));
const RoleDashboard = React.lazy(() => import("./pages/RoleDashboard"));

// ─── Mock users (replace with API or User Metadata later) ──────────────────────
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
  const { user, userRole } = useAuth();
  
  // Use metadata if available, otherwise fallback to mock
  const meta = user?.user_metadata || {};
  const role = userRole || "faculty";
  
  const displayUser = {
    employeeId: meta.faculty_id || MOCK_USERS[role].employeeId,
    name: meta.full_name || user?.email || MOCK_USERS[role].name,
    designation: meta.designation || MOCK_USERS[role].designation,
    department: meta.department || MOCK_USERS[role].department,
    school: meta.school || MOCK_USERS[role].school,
    role: role,
    avatar: meta.full_name ? meta.full_name.split(' ').map(n => n[0]).join('') : MOCK_USERS[role].avatar,
    qualification: meta.qualification || "Ph.D",
    experience: meta.experience || "10 Years",
    phone: meta.phone || "+91 98765 43210",
    ay: "2025-26"
  };

  return (
    <FacultyProfile
      user={displayUser}
      onProceed={() => navigate("/dashboard")}
    />
  );
}

// ─── App Routes ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Georgia, serif", color: "#1e293b", fontSize: "1.2rem" }}>Loading Application...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

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
      </Suspense>
    </BrowserRouter>
  );
}
