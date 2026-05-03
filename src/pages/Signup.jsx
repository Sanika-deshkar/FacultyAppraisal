import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SCHOOL_CONFIG, APP_INFO } from "../constants/formConfig";
import { useAuth } from "../context/AuthContext";

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe 0%, #e2e8f0 55%, #f8fafc 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px",
  },
  card: {
    background: "rgba(15, 23, 42, 0.94)",
    borderRadius: "14px",
    display: "flex",
    width: "100%",
    maxWidth: "920px",
    overflow: "hidden",
    boxShadow: "0 22px 56px rgba(15,23,42,0.28)",
  },
  left: {
    flex: 1,
    padding: "40px 36px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  logoBox: {
    background: "white",
    borderRadius: "6px",
    padding: "10px 14px",
    display: "inline-block",
    width: "fit-content",
  },
  heading: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#f1f5f9",
    lineHeight: 1.4,
    margin: 0,
  },
  desc: {
    fontSize: "12px",
    color: "#94a3b8",
    lineHeight: 1.7,
    margin: 0,
  },
  right: {
    flex: 1.5,
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
  },
  formWrap: {
    padding: "40px 36px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  welcome: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#f1f5f9",
    margin: "0 0 4px",
  },
  sub: {
    fontSize: "12px",
    color: "#64748b",
    margin: "0 0 24px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "7px",
    fontSize: "13px",
    color: "#f1f5f9",
    marginBottom: "16px",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  select: {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(30, 41, 59, 1)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "7px",
    fontSize: "13px",
    color: "#f1f5f9",
    marginBottom: "16px",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
  },
  btn: {
    width: "100%",
    padding: "12px 14px",
    background: "#1a6fe0",
    color: "white",
    border: "none",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.3px",
    fontFamily: "inherit",
    transition: "opacity 0.2s",
    marginBottom: "12px",
  },
  error: {
    background: "rgba(220,50,50,0.18)",
    border: "1px solid rgba(220,50,50,0.4)",
    color: "#fca5a5",
    padding: "9px 12px",
    borderRadius: "5px",
    fontSize: "12px",
    marginBottom: "14px",
    lineHeight: 1.5,
  },
  success: {
    background: "rgba(34,197,94,0.18)",
    border: "1px solid rgba(34,197,94,0.4)",
    color: "#86efac",
    padding: "9px 12px",
    borderRadius: "5px",
    fontSize: "12px",
    marginBottom: "14px",
    lineHeight: 1.5,
  },
  linkBox: {
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center",
    marginTop: "10px",
  },
  link: {
    color: "#1a6fe0",
    textDecoration: "none",
    fontWeight: 600,
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 16px",
  }
};

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "faculty",
    school: Object.keys(SCHOOL_CONFIG)[0],
    department: "",
    facultyId: ""
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { email, password, fullName, role, school, department, facultyId } = formData;
    
    if (!email.trim() || !password.trim() || !fullName.trim() || !department.trim() || !facultyId.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await signup(email.trim(), password, {
        full_name: fullName.trim(),
        role,
        school,
        department: department.trim(),
        faculty_id: facultyId.trim()
      });
      
      setSuccess("Account created successfully! Please check your email for verification.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrap}>
      <div style={s.card}>

        {/* ── LEFT: Branding ───────────────────────────────────────────────── */}
        <div style={s.left}>
          <div style={s.logoBox}>
            <img src="/logo.png" alt="University Logo" style={{ height: "60px" }} />
          </div>
          <h2 style={s.heading}>{APP_INFO.UNIVERSITY_NAME}, {APP_INFO.UNIVERSITY_LOCATION}</h2>
          <p style={s.desc}>Join our faculty portal to manage your appraisals and professional growth efficiently.</p>
        </div>

        {/* ── RIGHT: Signup form ────────────────────────────────────────────── */}
        <div style={s.right}>
          <div style={s.formWrap}>
            <h3 style={s.welcome}>{APP_INFO.PORTAL_NAME}</h3>
            <p style={s.sub}>Create an account to get started</p>

            {error && <div style={s.error}>{error}</div>}
            {success && <div style={s.success}>{success}</div>}

            <label style={s.label}>Full Name</label>
            <input
              style={s.input}
              type="text"
              name="fullName"
              placeholder="Dr. John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />

            <div style={s.grid}>
              <div>
                <label style={s.label}>Email Address</label>
                <input
                  style={s.input}
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={s.label}>Password</label>
                <input
                  style={s.input}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={s.grid}>
              <div>
                <label style={s.label}>Employee / Faculty ID</label>
                <input
                  style={s.input}
                  type="text"
                  name="facultyId"
                  placeholder="EMP-123"
                  value={formData.facultyId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={s.label}>Role</label>
                <select 
                  style={s.select} 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                >
                  <option value="faculty">Faculty</option>
                  <option value="hod">HOD</option>
                  <option value="dean">Dean</option>
                  <option value="director">Director</option>
                  <option value="vc">VC</option>
                </select>
              </div>
            </div>

            <label style={s.label}>School / Faculty</label>
            <select 
              style={s.select} 
              name="school" 
              value={formData.school} 
              onChange={handleChange}
            >
              {Object.keys(SCHOOL_CONFIG).map(school => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>

            <label style={s.label}>Department</label>
            <input
              style={s.input}
              type="text"
              name="department"
              placeholder="Computer Science"
              value={formData.department}
              onChange={handleChange}
            />

            <button
              style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <span style={s.spinner}>◌ Creating Account...</span>
              ) : (
                "Create Account →"
              )}
            </button>

            <div style={s.linkBox}>
              Already have an account? <Link to="/login" style={s.link}>Sign In</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
