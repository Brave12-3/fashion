import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { getProducts, deleteProduct } from "../../lib/products";
import { S } from "../../tokens";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [search,   setSearch]   = useState("");
  const [deleting, setDeleting] = useState(null); // id being deleted
  const [confirm,  setConfirm]  = useState(null); // id awaiting confirm

  const load = () => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async id => {
    setDeleting(id);
    try {
      await deleteProduct(id);
      setProducts(ps => ps.filter(p => p.id !== id));
    } catch(e) {
      setError(e.message);
    } finally {
      setDeleting(null);
      setConfirm(null);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout activePage="Products">
        <style>{`
          .prod-table{width:100%;border-collapse:collapse;}
          .prod-table th,.prod-table td{text-align:left;padding:12px 14px;font-family:'Montserrat',sans-serif;font-size:12px;border-bottom:1px solid rgba(233,195,73,.08);}
          .prod-table th{color:rgba(233,195,73,.6);font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:#000d28;}
          .prod-table td{color:rgba(255,255,255,.8);}
          .prod-table tr:hover td{background:rgba(233,195,73,.04);}
          .admin-spinner{width:32px;height:32px;border:3px solid rgba(233,195,73,.2);border-top-color:#e9c349;border-radius:50%;animation:spin .8s linear infinite;margin:40px auto}
          @keyframes spin{to{transform:rotate(360deg)}}
          .action-btn{font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;padding:5px 12px;border-radius:3px;cursor:pointer;border:none;transition:opacity .2s;}
          .action-btn:hover{opacity:.8;}
        `}</style>

        {/* Top bar */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <input
            type="text" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ background:"#000d28", border:"1px solid rgba(233,195,73,.2)", borderRadius:4, padding:"9px 14px", color:"#fff", fontFamily:S.sans, fontSize:13, width:"clamp(180px,40%,320px)", outline:"none" }}
            onFocus={e => e.target.style.borderColor = S.gold}
            onBlur={e => e.target.style.borderColor = "rgba(233,195,73,.2)"}
          />
          <a href="#admin/products/new" style={{
            fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em",
            textTransform:"uppercase", textDecoration:"none",
            padding:"10px 20px", background:S.gold, color:S.navy, borderRadius:4,
          }}>+ Add Product</a>
        </div>

        {error && <ErrorBox msg={error} onClose={() => setError("")} />}

        {loading ? <div className="admin-spinner" /> : (
          <div style={{ background:"#000d28", border:`1px solid rgba(233,195,73,.1)`, borderRadius:8, overflow:"hidden" }}>
            <div style={{ overflowX:"auto" }}>
              <table className="prod-table">
                <thead>
                  <tr>
                    <th style={{ width:56 }}>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price Label</th>
                    <th>Badge</th>
                    <th style={{ textAlign:"center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign:"center", padding:32, color:"rgba(255,255,255,.3)" }}>No products found.</td></tr>
                  ) : filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        {p.img
                          ? <img src={p.img} alt={p.name} style={{ width:44, height:44, objectFit:"cover", borderRadius:4 }} />
                          : <div style={{ width:44, height:44, background:"rgba(255,255,255,.05)", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>👗</div>
                        }
                      </td>
                      <td style={{ fontWeight:600, color:"#fff", maxWidth:180 }}>{p.name}</td>
                      <td>{p.category || "—"}</td>
                      <td>{p.price || "—"}</td>
                      <td>
                        {p.badge
                          ? <span style={{ background:"rgba(233,195,73,.15)", color:S.gold, padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:700 }}>{p.badge}</span>
                          : "—"}
                      </td>
                      <td>
                        <div style={{ display:"flex", gap:8, justifyContent:"center", alignItems:"center" }}>
                          <a href={`#admin/products/${p.id}/edit`}
                            className="action-btn"
                            style={{ background:"rgba(233,195,73,.15)", color:S.gold, textDecoration:"none", display:"inline-block" }}>
                            ✏️ Edit
                          </a>

                          {confirm === p.id ? (
                            <>
                              <button className="action-btn"
                                onClick={() => handleDelete(p.id)}
                                disabled={deleting === p.id}
                                style={{ background:"rgba(186,26,26,.7)", color:"#fff" }}>
                                {deleting === p.id ? "…" : "Confirm"}
                              </button>
                              <button className="action-btn"
                                onClick={() => setConfirm(null)}
                                style={{ background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.6)" }}>
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button className="action-btn"
                              onClick={() => setConfirm(p.id)}
                              style={{ background:"rgba(186,26,26,.18)", color:"#ff8a8a" }}>
                              🗑 Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding:"10px 16px", borderTop:`1px solid rgba(233,195,73,.08)` }}>
              <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(255,255,255,.3)" }}>{filtered.length} of {products.length} products</p>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}

function ErrorBox({ msg, onClose }) {
  return (
    <div style={{ background:"rgba(186,26,26,.12)", border:"1px solid rgba(186,26,26,.4)", borderRadius:6, padding:"12px 16px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <p style={{ fontFamily:S.sans, fontSize:13, color:"#ffb3b3" }}>⚠️ {msg}</p>
      <button onClick={onClose} style={{ background:"none", border:"none", color:"#ffb3b3", cursor:"pointer", fontSize:18 }}>×</button>
    </div>
  );
}