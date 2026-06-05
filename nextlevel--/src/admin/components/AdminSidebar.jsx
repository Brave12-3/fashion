import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { S } from "../../tokens";

const NAV = [
  { label:"Dashboard",  hash:"#admin",          icon:"📊" },
  { label:"Products",   hash:"#admin/products", icon:"👗" },
  { label:"Add Product",hash:"#admin/products/new", icon:"➕" },
  { label:"View Site",  hash:"#collections",    icon:"🌐" },
];

export default function AdminSidebar({ activePage }) {
  const { signOut, session } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    window.location.hash = "#admin/login";
  };

  return (
    <>
      <style>{`
        .admin-sidebar { width:${collapsed ? "64px" : "220px"}; transition:width .3s; }
        @media(max-width:600px){ .admin-sidebar { width:${collapsed ? "0px" : "200px"}; position:fixed; z-index:100; height:100vh; } }
        .sidebar-link { display:flex; align-items:center; gap:10px; padding:11px 14px; border-radius:6px;
          font-family:'Montserrat',sans-serif; font-size:12px; font-weight:600; letter-spacing:.06em;
          text-decoration:none; color:rgba(233,195,73,.75); transition:background .2s, color .2s; cursor:pointer; border:none; background:none; width:100%; text-align:left; }
        .sidebar-link:hover, .sidebar-link.active { background:rgba(233,195,73,.1); color:#e9c349; }
        .sidebar-link .icon { font-size:18px; flex-shrink:0; }
        .sidebar-label { white-space:nowrap; overflow:hidden; opacity:${collapsed ? 0 : 1}; transition:opacity .2s; }
      `}</style>

      <aside className="admin-sidebar" style={{
        background:"#000d28", borderRight:`1px solid rgba(233,195,73,.12)`,
        display:"flex", flexDirection:"column", height:"100vh", flexShrink:0,
        overflowY:"auto", overflowX:"hidden",
      }}>
        {/* Logo / collapse toggle */}
        <div style={{ padding:"20px 14px 16px", borderBottom:`1px solid rgba(233,195,73,.1)`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {!collapsed && (
            <span style={{ fontFamily:S.serif, fontSize:13, fontWeight:700, color:S.gold, letterSpacing:"0.06em", lineHeight:1.3 }}>
              NLR<br/>
              <span style={{ fontSize:9, color:S.goldDim, letterSpacing:"0.12em", fontFamily:S.sans }}>ADMIN</span>
            </span>
          )}
          <button onClick={() => setCollapsed(c => !c)}
            style={{ background:"none", border:"none", cursor:"pointer", color:S.goldDim, fontSize:18, padding:4, marginLeft:"auto" }}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex:1, padding:"12px 8px", display:"flex", flexDirection:"column", gap:4 }}>
          {NAV.map(item => (
            <a key={item.label} href={item.hash}
              className={`sidebar-link${activePage === item.label ? " active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User + sign out */}
        <div style={{ padding:"12px 8px", borderTop:`1px solid rgba(233,195,73,.1)` }}>
          {!collapsed && session && (
            <p style={{ fontFamily:S.sans, fontSize:10, color:"rgba(233,195,73,.45)", marginBottom:8, padding:"0 6px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {session.user.email}
            </p>
          )}
          <button onClick={handleSignOut} className="sidebar-link" disabled={signingOut}
            style={{ color: signingOut ? "rgba(233,195,73,.3)" : undefined }}
          >
            <span className="icon">🚪</span>
            <span className="sidebar-label">{signingOut ? "Signing out…" : "Sign Out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}