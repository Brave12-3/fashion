import { useAuth } from "../../lib/AuthContext";
import { S } from "../../tokens";

/**
 * Wraps any admin page.
 * - While session is loading  → shows spinner
 * - If no session             → shows "not authorised" (redirect would need React Router)
 * - If session exists         → renders children
 */
export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", background:S.navy, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ textAlign:"center" }}>
          <div className="admin-spinner" />
          <p style={{ fontFamily:S.sans, fontSize:13, color:S.goldDim, marginTop:16, letterSpacing:"0.1em" }}>Verifying access…</p>
        </div>
        <style>{`.admin-spinner{width:36px;height:36px;border:3px solid rgba(233,195,73,.2);border-top-color:#e9c349;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!session) {
    // Redirect to login by changing hash
    window.location.hash = "#admin/login";
    return null;
  }

  return children;
}