import { useState, useEffect } from "react";
import { useAuth } from "../../lib/AuthContext";
import { S } from "../../tokens";

export default function AdminLoginPage() {
  const { signIn, session, loading } = useAuth();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [busy,     setBusy]     = useState(false);
  const [showPw,   setShowPw]   = useState(false);

  // Already logged in → go straight to dashboard
  useEffect(() => {
    if (!loading && session) window.location.hash = "#admin";
  }, [session, loading]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await signIn(email.trim(), password);
    if (error) {
      setError(error.message || "Invalid credentials. Please try again.");
      setBusy(false);
    }
    // On success, onAuthStateChange fires → session updates → useEffect redirects
  };

  const field = {
    width:"100%", background:"rgba(255,255,255,.05)", border:"1px solid rgba(233,195,73,.25)",
    borderRadius:4, padding:"12px 14px", color:"#fff",
    fontFamily:S.sans, fontSize:14, outline:"none",
    transition:"border-color .2s",
  };

  return (
    <div style={{ minHeight:"100vh", background:S.navy, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .login-field:focus{border-color:#e9c349 !important; box-shadow:0 0 0 3px rgba(233,195,73,.12);}
        .login-btn:hover:not(:disabled){background:#002d7a !important;}
        .login-btn:disabled{opacity:.5;cursor:not-allowed;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{
        width:"100%", maxWidth:420,
        background:"#000d28", border:`1px solid rgba(233,195,73,.18)`,
        borderRadius:8, padding:"clamp(28px,6vw,48px)",
        animation:"fadeUp .5s ease",
      }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <p style={{ fontFamily:S.serif, fontSize:13, fontWeight:700, color:S.gold, letterSpacing:"0.12em", marginBottom:6 }}>
            NEXT LEVEL WITH RABIA
          </p>
          <h1 style={{ fontFamily:S.serif, fontSize:"clamp(22px,5vw,28px)", fontWeight:600, color:"#fff", marginBottom:6 }}>
            Admin Portal
          </h1>
          <p style={{ fontFamily:S.sans, fontSize:12, color:"rgba(255,255,255,.4)", letterSpacing:"0.08em" }}>
            Owner access only
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background:"rgba(186,26,26,.15)", border:"1px solid rgba(186,26,26,.4)", borderRadius:4, padding:"10px 14px", marginBottom:20, display:"flex", gap:8, alignItems:"flex-start" }}>
            <span style={{ fontSize:16 }}>⚠️</span>
            <p style={{ fontFamily:S.sans, fontSize:13, color:"#ffb3b3", lineHeight:1.5 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {/* Email */}
          <div>
            <label style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(233,195,73,.7)", display:"block", marginBottom:6 }}>
              Email Address
            </label>
            <input
              type="email" required autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="owner@nextlevelrabia.com"
              className="login-field" style={field}
              onFocus={e => e.target.style.borderColor = S.gold}
              onBlur={e => e.target.style.borderColor = "rgba(233,195,73,.25)"}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(233,195,73,.7)", display:"block", marginBottom:6 }}>
              Password
            </label>
            <div style={{ position:"relative" }}>
              <input
                type={showPw ? "text" : "password"} required autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="login-field" style={{ ...field, paddingRight:44 }}
                onFocus={e => e.target.style.borderColor = S.gold}
                onBlur={e => e.target.style.borderColor = "rgba(233,195,73,.25)"}
              />
              <button type="button" onClick={() => setShowPw(s => !s)}
                style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.4)", fontSize:16 }}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={busy}
            className="login-btn"
            style={{
              marginTop:8, padding:"13px", background:S.navy,
              color:"#fff", border:`1px solid ${S.gold}`,
              borderRadius:4, fontFamily:S.sans, fontSize:12, fontWeight:700,
              letterSpacing:"0.15em", textTransform:"uppercase",
              cursor:"pointer", transition:"background .2s",
            }}>
            {busy ? "Signing in…" : "Sign In to Dashboard"}
          </button>
        </form>

        <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(255,255,255,.25)", textAlign:"center", marginTop:24, lineHeight:1.6 }}>
          This portal is restricted to authorised personnel only.<br/>
          Unauthorised access attempts are logged.
        </p>
      </div>
    </div>
  );
}