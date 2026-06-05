import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { getProducts } from "../../lib/products";
import { S } from "../../tokens";

function StatCard({ icon, label, value, sub, color = S.gold }) {
  return (
    <div style={{
      background:"#000d28", border:`1px solid rgba(233,195,73,.14)`,
      borderRadius:8, padding:"clamp(16px,3vw,24px)",
      display:"flex", flexDirection:"column", gap:8,
    }}>
      <div style={{ fontSize:28 }}>{icon}</div>
      <p style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,.45)" }}>{label}</p>
      <p style={{ fontFamily:S.serif, fontSize:"clamp(24px,4vw,36px)", fontWeight:600, color }}>{value}</p>
      {sub && <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(255,255,255,.35)" }}>{sub}</p>}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(products.map(p => p.category))];
  const badges     = products.filter(p => p.badge).length;

  return (
    <ProtectedRoute>
      <AdminLayout activePage="Dashboard">
        <style>{`
          .stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
          @media(min-width:700px){.stats-grid{grid-template-columns:repeat(4,1fr);}}
          .recent-table{width:100%;border-collapse:collapse;}
          .recent-table th,.recent-table td{text-align:left;padding:10px 12px;font-family:'Montserrat',sans-serif;font-size:12px;border-bottom:1px solid rgba(233,195,73,.08);}
          .recent-table th{color:rgba(233,195,73,.6);font-weight:700;letter-spacing:.1em;text-transform:uppercase;}
          .recent-table td{color:rgba(255,255,255,.75);}
          .recent-table tr:hover td{background:rgba(233,195,73,.04);}
          .admin-spinner{width:32px;height:32px;border:3px solid rgba(233,195,73,.2);border-top-color:#e9c349;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto}
          @keyframes spin{to{transform:rotate(360deg)}}
        `}</style>

        {/* Welcome */}
        <div style={{ marginBottom:28 }}>
          <h2 style={{ fontFamily:S.serif, fontSize:"clamp(18px,3vw,24px)", fontWeight:600, color:"#fff", marginBottom:6 }}>
            Welcome back 👋
          </h2>
          <p style={{ fontFamily:S.sans, fontSize:13, color:"rgba(255,255,255,.45)" }}>
            Here's an overview of your storefront.
          </p>
        </div>

        {/* Stats */}
        {loading ? (
          <div style={{ padding:40 }}><div className="admin-spinner" /></div>
        ) : error ? (
          <ErrorBox msg={error} />
        ) : (
          <>
            <div className="stats-grid" style={{ marginBottom:32 }}>
              <StatCard icon="👗" label="Total Products"  value={products.length} sub="In your catalogue" />
              <StatCard icon="🗂" label="Categories"      value={categories.length} sub="Unique types" color="#7dd3fc" />
              <StatCard icon="⭐" label="Limited Edition" value={badges} sub="Badged pieces" color="#86efac" />
              <StatCard icon="✉️" label="Inquiry Type"    value="All" sub="Price on inquiry" color="#f9a8d4" />
            </div>

            {/* Recent products table */}
            <div style={{ background:"#000d28", border:`1px solid rgba(233,195,73,.1)`, borderRadius:8, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid rgba(233,195,73,.1)`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <h3 style={{ fontFamily:S.serif, fontSize:16, fontWeight:500, color:"#fff" }}>Recent Products</h3>
                <a href="#admin/products" style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, color:S.gold, textDecoration:"none", letterSpacing:"0.1em" }}>View All →</a>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table className="recent-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Badge</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 6).map(p => (
                      <tr key={p.id}>
                        <td style={{ display:"flex", alignItems:"center", gap:10 }}>
                          {p.img && <img src={p.img} alt="" style={{ width:36, height:36, objectFit:"cover", borderRadius:4, flexShrink:0 }} />}
                          <span style={{ fontWeight:600, color:"#fff" }}>{p.name}</span>
                        </td>
                        <td>{p.category}</td>
                        <td>{p.badge ? <span style={{ background:"rgba(233,195,73,.15)", color:S.gold, padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:700 }}>{p.badge}</span> : "—"}</td>
                        <td>
                          <a href={`#admin/products/${p.id}/edit`}
                            style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, color:S.gold, textDecoration:"none", letterSpacing:"0.08em" }}>
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Quick links */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:24 }}>
          {[
            { label:"+ Add New Product", hash:"#admin/products/new", bg:S.gold, color:S.navy },
            { label:"Manage All Products", hash:"#admin/products",   bg:"transparent", color:S.gold, border:`1px solid ${S.gold}` },
          ].map(btn => (
            <a key={btn.label} href={btn.hash} style={{
              fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em",
              textTransform:"uppercase", textDecoration:"none",
              padding:"11px 22px", background:btn.bg, color:btn.color,
              border:btn.border || "none", borderRadius:4, transition:"opacity .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >{btn.label}</a>
          ))}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

function ErrorBox({ msg }) {
  return (
    <div style={{ background:"rgba(186,26,26,.12)", border:"1px solid rgba(186,26,26,.4)", borderRadius:6, padding:"14px 18px" }}>
      <p style={{ fontFamily:S.sans, fontSize:13, color:"#ffb3b3" }}>⚠️ {msg}</p>
    </div>
  );
}