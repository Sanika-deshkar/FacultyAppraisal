import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Demo credentials ─────────────────────────────────────────────────────────
// Replace with real API call in production
const CREDENTIALS = {
  faculty: { password: "1234",  role: "faculty" },
  hod:     { password: "hod1",  role: "hod"     },
  dean:    { password: "dean1", role: "dean"    },
  director:{ password: "dir1",  role: "director"},
  vc:      { password: "vc123", role: "vc"      },
};

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate network delay — replace setTimeout with fetch() in production
    setTimeout(() => {
      setLoading(false);

      const cred = CREDENTIALS[username.trim().toLowerCase()];

      if (cred && cred.password === password) {
  localStorage.setItem("role", cred.role);
  localStorage.setItem("username", username.trim().toLowerCase());

  // Always go to profile first
  navigate("/profile");
} else {
        setError("Invalid username or password. Please try again.");
      }
    }, 900);
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
            <img src="/dypiu.jpeg" alt="DYPIU Logo" style={{ height: 60 }} />
          </div>
          <h2 style={s.heading}>D Y Patil International University, Akurdi, Pune</h2>
          <p style={s.desc}>
            To create a vibrant learning environment – fostering innovation and creativity,
            experiential learning, which is inspired by research, and focuses on regionally,
            nationally and globally relevant areas.
          </p>

          {/* Demo credentials hint */}
          <div style={s.hint}>
            <div style={s.hintTitle}>Demo Accounts</div>
            {Object.entries(CREDENTIALS).map(([user, { role }]) => (
              <div key={user} style={s.hintRow}>
                <span style={s.hintUser}>{user}</span>
                <span style={s.hintRole}>{role}</span>
              </div>
            ))}
            <div style={s.hintPwd}>All passwords shown in code</div>
          </div>
        </div>

        {/* ── RIGHT: Login form ────────────────────────────────────────────── */}
        <div style={s.right}>
          <div style={s.formWrap}>
            <h3 style={s.welcome}>Faculty Appraisal Portal</h3>
            <p style={s.sub}>Sign in to continue</p>

            {error && <div style={s.error}>{error}</div>}

            {/* Username */}
            <label style={s.label}>Username</label>
            <input
              style={s.input}
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="username"
            />

            {/* Password */}
            <label style={s.label}>Password</label>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <input
                style={{ ...s.input, marginBottom: 0, paddingRight: 44 }}
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

            {/* Submit */}
            <button
              style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <span style={s.spinner}>◌ Signing in…</span>
              ) : (
                "Sign In →"
              )}
            </button>

            <div style={s.forgot}>Forgot password?</div>

            {/* Role legend */}
            <div style={s.roleLegend}>
              {[
  { role: "faculty",  color: "#6d28d9", bg: "#ede9fe" },
  { role: "hod",      color: "#b45309", bg: "#fef3c7" },
  { role: "dean",     color: "#065f46", bg: "#d1fae5" },
  { role: "director", color: "#0e7490", bg: "#cffafe" },
  { role: "vc",       color: "#991b1b", bg: "#fee2e2" },
].map(({ role, color, bg }) => (
                <span key={role} style={{ ...s.rolePill, color, background: bg }}>
                  {role.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe 0%, #e2e8f0 55%, #f8fafc 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  card: {
    background: "rgba(15, 23, 42, 0.94)",
    borderRadius: 14,
    display: "flex",
    width: "100%",
    maxWidth: 920,
    overflow: "hidden",
    boxShadow: "0 22px 56px rgba(15,23,42,0.28)",
  },

  // LEFT
  left: {
    flex: 1.3,
    padding: "40px 36px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  logoBox: {
    background: "white",
    borderRadius: 6,
    padding: "10px 14px",
    display: "inline-block",
    width: "fit-content",
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: "#f1f5f9",
    lineHeight: 1.4,
    margin: 0,
  },
  desc: {
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 1.7,
    margin: 0,
  },
  hint: {
    marginTop: "auto",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
    padding: "12px 14px",
  },
  hintTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  hintRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
    fontSize: 12,
  },
  hintUser: { color: "#e2e8f0", fontFamily: "monospace" },
  hintRole: { color: "#64748b" },
  hintPwd: { fontSize: 10, color: "#475569", marginTop: 6 },

  // RIGHT
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
    fontSize: 16,
    fontWeight: 700,
    color: "#f1f5f9",
    margin: "0 0 4px",
  },
  sub: {
    fontSize: 12,
    color: "#64748b",
    margin: "0 0 24px",
  },

  label: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 7,
    fontSize: 13,
    color: "#f1f5f9",
    marginBottom: 16,
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    lineHeight: 1,
    padding: 4,
  },
  btn: {
    width: "100%",
    padding: "12px 14px",
    background: "#1a6fe0",
    color: "white",
    border: "none",
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.3,
    fontFamily: "inherit",
    transition: "opacity 0.2s",
    marginBottom: 12,
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },
  forgot: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "right",
    cursor: "pointer",
    textDecoration: "underline",
    marginBottom: 20,
  },
  error: {
    background: "rgba(220,50,50,0.18)",
    border: "1px solid rgba(220,50,50,0.4)",
    color: "#fca5a5",
    padding: "9px 12px",
    borderRadius: 5,
    fontSize: 12,
    marginBottom: 14,
    lineHeight: 1.5,
  },

  roleLegend: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  rolePill: {
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: 20,
    letterSpacing: 0.5,
  },
};
