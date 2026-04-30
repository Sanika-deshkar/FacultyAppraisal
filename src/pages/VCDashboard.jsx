export default function VCDashboard() {
  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.badge}>Role: Vice Chancellor</div>
        <h2 style={S.title}>Vice Chancellor Dashboard</h2>
        <p style={S.subtitle}>
          Interface styling has been aligned with the rest of the portal while keeping all functionality unchanged.
        </p>
      </div>
    </div>
  );
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: "Georgia, serif",
  },
  card: {
    width: "100%",
    maxWidth: 760,
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
    padding: "28px 30px",
  },
  badge: {
    display: "inline-block",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 10,
  },
  title: {
    margin: 0,
    fontSize: 24,
    color: "#0f172a",
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#64748b",
    fontSize: 13,
    lineHeight: 1.6,
  },
};