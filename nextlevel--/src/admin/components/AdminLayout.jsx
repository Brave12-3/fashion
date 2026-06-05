import AdminSidebar from "./AdminSidebar";
import { S } from "../../tokens";

export default function AdminLayout({ children, activePage = "" }) {
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#060f24", fontFamily:S.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        body{margin:0;overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#060f24;} ::-webkit-scrollbar-thumb{background:#e9c349;border-radius:3px;}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,.25);}
        select option{background:#0d1f3c;color:#fff;}
      `}</style>

      <AdminSidebar activePage={activePage} />

      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflowY:"auto" }}>
        {/* Top bar */}
        <div style={{
          background:"#000d28", borderBottom:`1px solid rgba(233,195,73,.1)`,
          padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0,
        }}>
          <h2 style={{ fontFamily:S.serif, fontSize:"clamp(16px,3vw,22px)", fontWeight:600, color:"#fff", margin:0 }}>
            {activePage || "Admin"}
          </h2>
          <span style={{ fontFamily:S.sans, fontSize:11, color:S.goldDim, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Next Level with Rabia
          </span>
        </div>

        {/* Page content */}
        <main style={{ flex:1, padding:"clamp(16px,3vw,32px)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}