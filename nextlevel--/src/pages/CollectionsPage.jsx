import { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import { getProducts } from "../lib/products";
import { S } from "../tokens";

// Filters map to real Supabase categories
const CATEGORY_FILTERS = [
  { label: "All",              value: null },
  { label: "Jilbab",           value: "Jilbab" },
  { label: "Evening Couture",  value: "Evening Couture" },
  { label: "Bespoke Tailoring",value: "Bespoke Tailoring" },
  { label: "Bridal & Formal",  value: "Bridal & Formal" },
  { label: "Gala Statement",   value: "Gala Statement" },
];

/* ── Buttons ── */
function FilledBtn({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding:"9px 20px", background: h ? "#002366" : S.navy, color:"#fff",
        fontFamily:S.sans, fontSize:11, fontWeight:700,
        letterSpacing:"0.15em", textTransform:"uppercase",
        border:"none", cursor:"pointer", whiteSpace:"nowrap",
        transition:"background .2s, transform .1s",
        transform: h ? "scale(0.97)" : "scale(1)",
      }}
    >{children}</button>
  );
}

function OutlineBtn({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding:"7px 20px", background: h ? "#fed65b" : "transparent",
        color: h ? "#241a00" : "#735c00",
        fontFamily:S.sans, fontSize:11, fontWeight:700,
        letterSpacing:"0.15em", textTransform:"uppercase",
        border:`2px solid ${S.gold}`, cursor:"pointer", whiteSpace:"nowrap",
        transition:"all .2s",
      }}
    >{children}</button>
  );
}

/* ── Inquiry Modal ── */
function InquiryModal({ product, onClose }) {
  const subject = encodeURIComponent(`Inquiry: ${product.name}`);
  const body    = encodeURIComponent(
    `Hi Rabia,\n\nI'm interested in: ${product.name}\nCategory: ${product.category}\nPrice: ${product.price}\n\nPlease share more details.\n\nThank you!`
  );

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.65)",
      zIndex:200, display:"flex", alignItems:"center", justifyContent:"center",
      padding:20, backdropFilter:"blur(4px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#fff", maxWidth:480, width:"100%",
        padding:"clamp(24px,5vw,40px)", position:"relative",
        borderTop:`4px solid ${S.gold}`,
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:14, right:14,
          background:"none", border:"none", cursor:"pointer",
          fontSize:22, color:S.muted, lineHeight:1,
        }}>×</button>

        {/* Product info */}
        <div style={{ display:"flex", gap:16, marginBottom:24 }}>
          {product.img && (
            <img src={product.img} alt={product.name}
              style={{ width:72, height:96, objectFit:"cover", flexShrink:0 }} />
          )}
          <div>
            <p style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#735c00", marginBottom:4 }}>
              {product.category}
            </p>
            <h3 style={{ fontFamily:S.serif, fontSize:"clamp(18px,4vw,22px)", fontWeight:500, color:S.navy, marginBottom:6, lineHeight:1.3 }}>
              {product.name}
            </h3>
            <p style={{ fontFamily:S.sans, fontSize:13, fontWeight:600, color:S.navy }}>
              {product.price}
            </p>
          </div>
        </div>

        {product.description && (
          <p style={{ fontFamily:S.sans, fontSize:13, lineHeight:1.75, color:S.muted, marginBottom:24, borderTop:`1px solid rgba(197,198,210,.4)`, paddingTop:16 }}>
            {product.description}
          </p>
        )}

        <p style={{ fontFamily:S.sans, fontSize:13, color:S.muted, marginBottom:20, lineHeight:1.7 }}>
          Reach out to inquire about this piece, request sizing, or book a fitting appointment.
        </p>

        {/* CTA buttons */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <a href={`mailto:Rabiabahru2581024@gmail.com?subject=${subject}&body=${body}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              padding:"12px", background:S.navy, color:"#fff",
              fontFamily:S.sans, fontSize:11, fontWeight:700,
              letterSpacing:"0.15em", textTransform:"uppercase",
              textDecoration:"none", transition:"background .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#002366"}
            onMouseLeave={e => e.currentTarget.style.background = S.navy}
          >
            ✉️ Inquire via Email
          </a>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <a href="tel:+251933038169"
              style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                padding:"11px", background:"transparent",
                color:S.navy, border:`1px solid ${S.navy}`,
                fontFamily:S.sans, fontSize:11, fontWeight:700,
                letterSpacing:"0.1em", textTransform:"uppercase",
                textDecoration:"none",
              }}>
              📞 Call
            </a>
            <a href="https://t.me/RabiaBahru" target="_blank" rel="noopener noreferrer"
              style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                padding:"11px", background:"#229ED9", color:"#fff",
                fontFamily:S.sans, fontSize:11, fontWeight:700,
                letterSpacing:"0.1em", textTransform:"uppercase",
                textDecoration:"none",
              }}>
              ✈️ Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Skeleton card shown while loading ── */
function SkeletonCard() {
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ aspectRatio:"3/4", background:"linear-gradient(90deg,#f0eded 25%,#e8e4e4 50%,#f0eded 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.4s infinite", marginBottom:14 }} />
      <div style={{ height:20, background:"#f0eded", marginBottom:8, borderRadius:2, animation:"shimmer 1.4s infinite" }} />
      <div style={{ height:12, background:"#f0eded", width:"60%", borderRadius:2, animation:"shimmer 1.4s infinite" }} />
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ product, onInquire }) {
  const [hovered, setHovered] = useState(false);
  const btnStyle = product.btn_style || product.btnStyle || "filled";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"flex", flexDirection:"column", cursor:"pointer",
        transition:"transform .45s cubic-bezier(.4,0,.2,1), box-shadow .45s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,17,58,.12)" : "none",
      }}
    >
      {/* Image */}
      <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden", background:"#f0eded", marginBottom:14 }}>
        {product.img ? (
          <img src={product.img} alt={product.name}
            style={{ width:"100%", height:"100%", objectFit:"cover",
              transition:"transform .65s cubic-bezier(.4,0,.2,1)",
              transform: hovered ? "scale(1.07)" : "scale(1)" }}
          />
        ) : (
          <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:48 }}>👗</div>
        )}
        {product.badge && (
          <span style={{
            position:"absolute", top:12, left:12, padding:"3px 10px",
            border:`1px solid ${S.gold}`, color:"#735c00",
            fontFamily:S.sans, fontSize:10, fontWeight:700,
            letterSpacing:"0.1em", textTransform:"uppercase",
            background:"rgba(255,255,255,.88)",
          }}>{product.badge}</span>
        )}
      </div>

      {/* Info */}
      <h3 style={{ fontFamily:S.serif, fontSize:"clamp(17px,3vw,22px)", fontWeight:500, lineHeight:1.3, marginBottom:4, color:S.ink }}>
        {product.name}
      </h3>
      <p style={{ fontFamily:S.sans, fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:S.muted, marginBottom:14 }}>
        {product.category}
      </p>

      {/* Price + CTA */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto" }}>
        <span style={{ fontFamily:S.sans, fontSize:14, fontWeight:500, color:S.navy }}>{product.price}</span>
        {btnStyle === "filled"
          ? <FilledBtn onClick={() => onInquire(product)}>Inquire</FilledBtn>
          : <OutlineBtn onClick={() => onInquire(product)}>Inquire</OutlineBtn>
        }
      </div>
    </div>
  );
}

/* ── Page ── */
export default function CollectionsPage() {
  const [products,     setProducts]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [activeFilter, setActiveFilter] = useState(null); // null = show all
  const [activeModal,  setActiveModal]  = useState(null); // product being inquired

  // Fetch from Supabase on mount
  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError("");
    getProducts()
      .then(data => setProducts(data || []))
      .catch(e  => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Filter products by selected category
  const visibleProducts = activeFilter
    ? products.filter(p => p.category === activeFilter)
    : products;

  // Close modal on Escape key
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") setActiveModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Layout activePage="Collections">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

        .product-grid { display:grid; grid-template-columns:1fr; gap:32px; }
        @media(min-width:480px){ .product-grid { grid-template-columns:repeat(2,1fr); gap:24px; } }
        @media(min-width:900px){ .product-grid { grid-template-columns:repeat(3,1fr); gap:28px; } }

        .filter-pill {
          display:inline-flex; align-items:center; gap:4px;
          padding:6px 14px;
          border:1px solid rgba(197,198,210,.5); background:transparent;
          font-family:'Montserrat',sans-serif; font-size:11px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase; color:#1c1b1b;
          cursor:pointer; border-radius:2px;
          transition:border-color .2s, color .2s, background .2s;
          white-space:nowrap;
        }
        .filter-pill.active { border-color:#e9c349; color:#735c00; background:rgba(233,195,73,.08); }

        .gold-line { position:relative; padding-bottom:3px; }
        .gold-line::after { content:''; position:absolute; width:0; height:1px; bottom:0; left:0; background:#e9c349; transition:width .3s; }
        .gold-line:hover::after { width:100%; }

        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        .admin-spinner{width:36px;height:36px;border:3px solid rgba(0,17,58,.1);border-top-color:#00113a;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Inquiry modal */}
      {activeModal && (
        <InquiryModal product={activeModal} onClose={() => setActiveModal(null)} />
      )}

      <div style={{ padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)", maxWidth:1440, margin:"0 auto" }}>

        {/* ── Hero text ── */}
        <div style={{ textAlign:"center", marginBottom:"clamp(40px,8vw,64px)" }}>
          <span style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"#735c00", display:"block", marginBottom:12 }}>
            Artisanal Excellence
          </span>
          <h1 style={{ fontFamily:S.serif, fontSize:"clamp(26px,6vw,42px)", fontWeight:600, lineHeight:1.25, color:S.ink, marginBottom:16 }}>
            The Signature Collections
          </h1>
          <p style={{ fontFamily:S.sans, fontSize:"clamp(14px,2.5vw,17px)", lineHeight:1.75, color:S.muted, maxWidth:540, margin:"0 auto" }}>
            Discover a curation of bespoke jilbab and fashion design, where heritage craftsmanship meets contemporary vision.
          </p>
        </div>

        {/* ── Filter bar ── */}
        <div style={{
          display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center",
          marginBottom:32, borderBottom:`1px solid ${S.border}`, paddingBottom:14, gap:12,
        }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {CATEGORY_FILTERS.map(f => (
              <button key={f.label}
                className={`filter-pill${activeFilter === f.value ? " active" : ""}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span style={{ fontFamily:S.sans, fontSize:11, fontStyle:"italic", color:S.muted }}>
            {loading ? "Loading…" : `${visibleProducts.length} of ${products.length} piece${products.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {/* ── Error state ── */}
        {error && (
          <div style={{
            background:"rgba(186,26,26,.06)", border:"1px solid rgba(186,26,26,.2)",
            borderRadius:6, padding:"16px 20px", marginBottom:32,
            display:"flex", justifyContent:"space-between", alignItems:"center", gap:12,
          }}>
            <p style={{ fontFamily:S.sans, fontSize:13, color:"#ba1a1a" }}>
              ⚠️ Could not load products. Check your internet connection.
            </p>
            <button onClick={fetchProducts}
              style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, padding:"7px 14px", background:"#ba1a1a", color:"#fff", border:"none", cursor:"pointer", borderRadius:3, whiteSpace:"nowrap" }}>
              Retry
            </button>
          </div>
        )}

        {/* ── Product grid ── */}
        <div className="product-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : products.length === 0 && !error
              ? (
                <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>👗</div>
                  <p style={{ fontFamily:S.serif, fontSize:22, color:S.muted, marginBottom:8 }}>No pieces yet</p>
                  <p style={{ fontFamily:S.sans, fontSize:14, color:S.muted }}>New arrivals coming soon.</p>
                </div>
              )
              : visibleProducts.length === 0
                ? (
                  <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"40px 20px" }}>
                    <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:14, color:"#444650" }}>No pieces in this category yet.</p>
                  </div>
                )
                : visibleProducts.map(p => (
                  <ProductCard key={p.id} product={p} onInquire={setActiveModal} />
                ))
          }
        </div>

        {/* ── Load more ── */}
        {!loading && products.length > 0 && (
          <div style={{ marginTop:64, display:"flex", justifyContent:"center", borderTop:`1px solid ${S.border}`, paddingTop:40 }}>
            <button onClick={fetchProducts} className="gold-line" style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:S.sans, fontSize:12, fontWeight:700,
              letterSpacing:"0.2em", textTransform:"uppercase", color:S.ink,
            }}>
              Refresh Collection
            </button>
          </div>
        )}

      </div>
    </Layout>
  );
}