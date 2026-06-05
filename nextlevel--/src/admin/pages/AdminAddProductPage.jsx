import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../../lib/products";
import { S } from "../../tokens";

export default function AdminAddProductPage() {
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async formData => {
    setSaving(true);
    setError("");
    try {
      await createProduct({
        name:        formData.name.trim(),
        category:    formData.category,
        price:       formData.price.trim(),
        badge:       formData.badge || null,
        btn_style:   formData.btn_style,
        description: formData.description?.trim() || null,
        img:         formData.img?.trim() || null,
      });
      setSuccess(true);
    } catch(e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout activePage="Add Product">

        {/* Breadcrumb */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
          <a href="#admin/products" style={{ fontFamily:S.sans, fontSize:12, color:S.goldDim, textDecoration:"none" }}>Products</a>
          <span style={{ color:"rgba(255,255,255,.25)" }}>›</span>
          <span style={{ fontFamily:S.sans, fontSize:12, color:"rgba(255,255,255,.5)" }}>Add New</span>
        </div>

        {success ? (
          <SuccessBanner onAddAnother={() => setSuccess(false)} />
        ) : (
          <div style={{ background:"#000d28", border:`1px solid rgba(233,195,73,.12)`, borderRadius:8, padding:"clamp(20px,4vw,36px)", maxWidth:860 }}>
            {error && (
              <div style={{ background:"rgba(186,26,26,.12)", border:"1px solid rgba(186,26,26,.4)", borderRadius:6, padding:"12px 16px", marginBottom:24 }}>
                <p style={{ fontFamily:S.sans, fontSize:13, color:"#ffb3b3" }}>⚠️ {error}</p>
              </div>
            )}
            <ProductForm onSubmit={handleSubmit} loading={saving} submitLabel="Create Product" />
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}

function SuccessBanner({ onAddAnother }) {
  return (
    <div style={{ background:"rgba(134,239,172,.08)", border:"1px solid rgba(134,239,172,.3)", borderRadius:8, padding:"clamp(24px,5vw,48px)", textAlign:"center", maxWidth:500 }}>
      <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
      <h3 style={{ fontFamily:S.serif, fontSize:22, color:"#86efac", marginBottom:10 }}>Product Created!</h3>
      <p style={{ fontFamily:S.sans, fontSize:13, color:"rgba(255,255,255,.55)", marginBottom:28, lineHeight:1.7 }}>
        Your new product is now live on the storefront.
      </p>
      <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
        <a href="#admin/products" style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em", padding:"10px 20px", background:"rgba(233,195,73,.15)", color:S.gold, textDecoration:"none", borderRadius:4 }}>
          View All Products
        </a>
        <button onClick={onAddAnother}
          style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em", padding:"10px 20px", background:S.gold, color:S.navy, border:"none", borderRadius:4, cursor:"pointer" }}>
          Add Another
        </button>
      </div>
    </div>
  );
}