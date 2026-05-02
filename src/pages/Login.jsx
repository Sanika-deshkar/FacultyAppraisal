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
    flex: 1.3,
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
    flex: 1,
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
  },
  formWrap: {
    padding: "40px 36px",
    width: "100%",
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
  eyeBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    lineHeight: 1,
    padding: "4px",
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
  forgot: {
    fontSize: "12px",
    color: "#64748b",
    textAlign: "right",
    cursor: "pointer",
    textDecoration: "underline",
    marginBottom: "20px",
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email.trim(), password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
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
          <p style={s.desc}>
            To create a vibrant learning environment – fostering innovation and creativity,
            experiential learning, which is inspired by research, and focuses on regionally,
            nationally and globally relevant areas.
          </p>
        </div>

        {/* ── RIGHT: Login form ────────────────────────────────────────────── */}
        <div style={s.right}>
          <div style={s.formWrap}>
            <h3 style={s.welcome}>{APP_INFO.PORTAL_NAME}</h3>
            <p style={s.sub}>Sign in to continue</p>

            {error && <div style={s.error}>{error}</div>}

            <label style={s.label}>Email Address</label>
            <input
              style={s.input}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />

            <label style={s.label}>Password</label>
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <input
                style={{ ...s.input, marginBottom: 0, paddingRight: "44px" }}
                type={showPw ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
              />
              <button
                style={s.eyeBtn}
                onClick={() => setShowPw(v => !v)}
                tabIndex={-1}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "🙈" : "👁"}
              </button>
            </div>

            <button
              style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <span style={s.spinner}>◌ Signing in...</span>
              ) : (
                "Sign In →"
              )}
            </button>

            <div style={s.forgot}>
              <Link to="/forgot-password" style={{ color: "inherit", textDecoration: "inherit" }}>
                Forgot password?
              </Link>
            </div>

            <div style={{ fontSize: "12px", color: "#64748b", textAlign: "center" }}>
              Don't have an account? <Link to="/signup" style={{ color: "#1a6fe0", fontWeight: 600, textDecoration: "none" }}>Sign Up</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
