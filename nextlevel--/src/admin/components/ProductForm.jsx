import { useState } from "react";
import { uploadProductImage } from "../../lib/products";
import { S } from "../../tokens";

const CATEGORIES = [
  "Evening Couture", "Bespoke Tailoring", "Cocktail & Gala",
  "Bridal & Formal", "Outerwear Couture", "Gala Statement", "Other",
];

const BTN_STYLES = ["filled", "outlined"];

const EMPTY = {
  name:"", category:"Evening Couture", price:"", badge:"",
  btn_style:"filled", description:"", img:"",
};

export default function ProductForm({ initial = EMPTY, onSubmit, submitLabel = "Save Product", loading = false }) {
  const [form,       setForm]       = useState({ ...EMPTY, ...initial });
  const [imgFile,    setImgFile]    = useState(null);
  const [imgPreview, setImgPreview] = useState(initial.img || "");
  const [uploading,  setUploading]  = useState(false);
  const [error,      setError]      = useState("");

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5 MB."); return; }
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) { setError("Product name is required."); return; }
    if (!form.price.trim()) { setError("Price label is required."); return; }

    let imgUrl = form.img;

    // Upload new image if selected
    if (imgFile) {
      setUploading(true);
      try {
        imgUrl = await uploadProductImage(imgFile);
      } catch(err) {
        setError("Image upload failed: " + err.message);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    await onSubmit({ ...form, img: imgUrl, badge: form.badge.trim() || null });
  };

  const labelStyle = { fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(233,195,73,.7)", display:"block", marginBottom:6 };
  const inputStyle = { width:"100%", background:"rgba(255,255,255,.05)", border:"1px solid rgba(233,195,73,.2)", borderRadius:4, padding:"10px 12px", color:"#fff", fontFamily:S.sans, fontSize:13, outline:"none", transition:"border-color .2s" };
  const focus = e => e.target.style.borderColor = S.gold;
  const blur  = e => e.target.style.borderColor = "rgba(233,195,73,.2)";

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:22 }}>
      <style>{`.pf-grid{display:grid;grid-template-columns:1fr;gap:20px;}@media(min-width:600px){.pf-grid{grid-template-columns:1fr 1fr;}}`}</style>

      {error && (
        <div style={{ background:"rgba(186,26,26,.15)", border:"1px solid rgba(186,26,26,.4)", borderRadius:4, padding:"10px 14px" }}>
          <p style={{ fontFamily:S.sans, fontSize:13, color:"#ffb3b3" }}>⚠️ {error}</p>
        </div>
      )}

      {/* Name + Category */}
      <div className="pf-grid">
        <div>
          <label style={labelStyle}>Product Name *</label>
          <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Emerald Sovereign Gown"
            style={inputStyle} onFocus={focus} onBlur={blur} required />
        </div>
        <div>
          <label style={labelStyle}>Category *</label>
          <select value={form.category} onChange={e => set("category", e.target.value)}
            style={{ ...inputStyle, cursor:"pointer" }} onFocus={focus} onBlur={blur}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Price + Badge */}
      <div className="pf-grid">
        <div>
          <label style={labelStyle}>Price Label * <span style={{ color:"rgba(255,255,255,.3)", fontWeight:400, textTransform:"none" }}>(e.g. "Price upon inquiry")</span></label>
          <input value={form.price} onChange={e => set("price", e.target.value)} placeholder="Price upon inquiry"
            style={inputStyle} onFocus={focus} onBlur={blur} required />
        </div>
        <div>
          <label style={labelStyle}>Badge <span style={{ color:"rgba(255,255,255,.3)", fontWeight:400, textTransform:"none" }}>(optional — e.g. "Limited Edition")</span></label>
          <input value={form.badge || ""} onChange={e => set("badge", e.target.value)} placeholder="Limited Edition"
            style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
      </div>

      {/* Button style */}
      <div>
        <label style={labelStyle}>Button Style</label>
        <div style={{ display:"flex", gap:12 }}>
          {BTN_STYLES.map(s => (
            <label key={s} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontFamily:S.sans, fontSize:13, color: form.btn_style === s ? S.gold : "rgba(255,255,255,.5)" }}>
              <input type="radio" name="btn_style" value={s} checked={form.btn_style === s} onChange={() => set("btn_style", s)}
                style={{ accentColor:S.gold }} />
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description <span style={{ color:"rgba(255,255,255,.3)", fontWeight:400, textTransform:"none" }}>(optional)</span></label>
        <textarea value={form.description || ""} onChange={e => set("description", e.target.value)}
          rows={4} placeholder="A magnificent gown crafted from…"
          style={{ ...inputStyle, resize:"vertical" }} onFocus={focus} onBlur={blur} />
      </div>

      {/* Image */}
      <div>
        <label style={labelStyle}>Product Image</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:16, alignItems:"flex-start" }}>
          {/* Preview */}
          <div style={{ width:120, height:160, background:"rgba(255,255,255,.05)", border:`1px dashed rgba(233,195,73,.3)`, borderRadius:4, overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {imgPreview
              ? <img src={imgPreview} alt="Preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              : <span style={{ fontSize:32 }}>👗</span>}
          </div>

          <div style={{ flex:1, minWidth:200 }}>
            {/* File upload */}
            <label style={{
              display:"inline-flex", alignItems:"center", gap:8, cursor:"pointer",
              background:"rgba(233,195,73,.12)", border:`1px solid rgba(233,195,73,.3)`,
              borderRadius:4, padding:"9px 16px",
              fontFamily:S.sans, fontSize:11, fontWeight:700, color:S.gold, letterSpacing:"0.1em",
            }}>
              📁 {uploading ? "Uploading…" : "Choose Image"}
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display:"none" }} />
            </label>
            <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(255,255,255,.35)", marginTop:8 }}>JPG, PNG, WEBP · max 5 MB</p>

            {/* OR: external URL */}
            <div style={{ marginTop:12 }}>
              <label style={{ ...labelStyle, marginBottom:4 }}>Or paste image URL</label>
              <input value={form.img} onChange={e => { set("img", e.target.value); setImgPreview(e.target.value); setImgFile(null); }}
                placeholder="https://…"
                style={{ ...inputStyle, fontSize:12 }} onFocus={focus} onBlur={blur} />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div style={{ paddingTop:8, borderTop:`1px solid rgba(233,195,73,.1)` }}>
        <SubmitBtn loading={loading || uploading}>{loading || uploading ? "Saving…" : submitLabel}</SubmitBtn>
      </div>
    </form>
  );
}

function SubmitBtn({ children, loading }) {
  const [h, setH] = useState(false);
  return (
    <button type="submit" disabled={loading}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding:"12px 32px", background: loading ? "rgba(233,195,73,.3)" : h ? "#c9a520" : S.gold,
        color:S.navy, fontFamily:S.sans, fontSize:12, fontWeight:700,
        letterSpacing:"0.15em", textTransform:"uppercase",
        border:"none", borderRadius:4, cursor: loading ? "not-allowed" : "pointer",
        transition:"background .2s",
      }}
    >{children}</button>
  );
}