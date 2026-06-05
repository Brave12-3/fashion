import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductForm from "../components/ProductForm";
import { getProductById, updateProduct } from "../../lib/products";
import { S } from "../../tokens";

export default function AdminEditProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!productId) { setError("No product ID provided."); setLoading(false); return; }
    getProductById(productId)
      .then(setProduct)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleSubmit = async formData => {
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await updateProduct(productId, {
        name:        formData.name.trim(),
        category:    formData.category,
        price:       formData.price.trim(),
        badge:       formData.badge || null,
        btn_style:   formData.btn_style,
        description: formData.description?.trim() || null,
        img:         formData.img?.trim() || null,
      });
      setSuccess(true);
      // Refresh local product data
      const fresh = await getProductById(productId);
      setProduct(fresh);
    } catch(e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout activePage="Products">

        {/* Breadcrumb */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24, flexWrap:"wrap" }}>
          <a href="#admin/products" style={{ fontFamily:S.sans, fontSize:12, color:S.goldDim, textDecoration:"none" }}>Products</a>
          <span style={{ color:"rgba(255,255,255,.25)" }}>›</span>
          <span style={{ fontFamily:S.sans, fontSize:12, color:"rgba(255,255,255,.5)", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {product?.name || "Edit"}
          </span>
        </div>

        {/* States */}
        {loading ? (
          <Spinner />
        ) : error && !product ? (
          <ErrorBox msg={error} />
        ) : (
          <div style={{ maxWidth:860 }}>
            {/* Success toast */}
            {success && (
              <div style={{ background:"rgba(134,239,172,.1)", border:"1px solid rgba(134,239,172,.35)", borderRadius:6, padding:"12px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <p style={{ fontFamily:S.sans, fontSize:13, color:"#86efac" }}>✅ Product updated successfully.</p>
                <div style={{ display:"flex", gap:10 }}>
                  <a href="#collections" style={{ fontFamily:S.sans, fontSize:11, color:"#86efac", textDecoration:"none", fontWeight:700 }}>View on site →</a>
                  <button onClick={() => setSuccess(false)} style={{ background:"none", border:"none", color:"#86efac", cursor:"pointer", fontSize:18 }}>×</button>
                </div>
              </div>
            )}

            {error && (
              <div style={{ background:"rgba(186,26,26,.12)", border:"1px solid rgba(186,26,26,.4)", borderRadius:6, padding:"12px 16px", marginBottom:20 }}>
                <p style={{ fontFamily:S.sans, fontSize:13, color:"#ffb3b3" }}>⚠️ {error}</p>
              </div>
            )}

            {/* Form */}
            <div style={{ background:"#000d28", border:`1px solid rgba(233,195,73,.12)`, borderRadius:8, padding:"clamp(20px,4vw,36px)" }}>
              {/* Product header */}
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28, paddingBottom:20, borderBottom:`1px solid rgba(233,195,73,.1)` }}>
                {product.img && <img src={product.img} alt={product.name} style={{ width:56, height:72, objectFit:"cover", borderRadius:4, flexShrink:0 }} />}
                <div>
                  <h3 style={{ fontFamily:S.serif, fontSize:"clamp(16px,3vw,22px)", fontWeight:500, color:"#fff", marginBottom:4 }}>{product.name}</h3>
                  <p style={{ fontFamily:S.sans, fontSize:11, color:S.goldDim, letterSpacing:"0.1em", textTransform:"uppercase" }}>{product.category}</p>
                </div>
              </div>

              <ProductForm
                initial={{
                  name:        product.name        || "",
                  category:    product.category    || "Evening Couture",
                  price:       product.price       || "",
                  badge:       product.badge       || "",
                  btn_style:   product.btn_style   || "filled",
                  description: product.description || "",
                  img:         product.img         || "",
                }}
                onSubmit={handleSubmit}
                loading={saving}
                submitLabel="Save Changes"
              />
            </div>

            {/* Danger zone */}
            <div style={{ marginTop:24, background:"rgba(186,26,26,.06)", border:"1px solid rgba(186,26,26,.2)", borderRadius:8, padding:"20px 24px" }}>
              <h4 style={{ fontFamily:S.sans, fontSize:12, fontWeight:700, color:"#ff8a8a", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Danger Zone</h4>
              <p style={{ fontFamily:S.sans, fontSize:13, color:"rgba(255,255,255,.45)", marginBottom:14 }}>
                Permanently delete this product from the storefront. This action cannot be undone.
              </p>
              <a href={`#admin/products/${productId}/delete`}
                style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em", padding:"9px 18px", background:"rgba(186,26,26,.25)", color:"#ff8a8a", textDecoration:"none", borderRadius:4, border:"1px solid rgba(186,26,26,.4)" }}>
                🗑 Delete This Product
              </a>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}

function Spinner() {
  return (
    <div style={{ padding:48, textAlign:"center" }}>
      <div style={{ width:32, height:32, border:"3px solid rgba(233,195,73,.2)", borderTopColor:"#e9c349", borderRadius:"50%", animation:"spin .8s linear infinite", margin:"0 auto" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div style={{ background:"rgba(186,26,26,.12)", border:"1px solid rgba(186,26,26,.4)", borderRadius:6, padding:"14px 18px" }}>
      <p style={{ fontFamily:S.sans, fontSize:13, color:"#ffb3b3" }}>⚠️ {msg}</p>
    </div>
  );
}