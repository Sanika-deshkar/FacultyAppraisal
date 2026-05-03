import { useState } from "react";
import { Link } from "react-router-dom";
import { APP_INFO } from "../constants/formConfig";
import { useAuth } from "../context/AuthContext";

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
    maxWidth: "500px",
    overflow: "hidden",
    boxShadow: "0 22px 56px rgba(15,23,42,0.28)",
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
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },
};

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await resetPassword(email.trim());
      setMessage("Password reset link has been sent to your email.");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.formWrap}>
          <h3 style={s.welcome}>Forgot Password</h3>
          <p style={s.sub}>Enter your email to receive a reset link</p>

          {error && <div style={s.error}>{error}</div>}
          {message && <div style={s.success}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <label style={s.label}>Email Address</label>
            <input
              style={s.input}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span style={s.spinner}>◌ Sending...</span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div style={{ fontSize: "12px", color: "#64748b", textAlign: "center", marginTop: "16px" }}>
            Back to <Link to="/login" style={{ color: "#1a6fe0", fontWeight: 600, textDecoration: "none" }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
