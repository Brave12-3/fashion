import { useState } from "react";
import Layout from "../components/Layout";
import { S } from "../tokens";

const LOCATIONS = [
  { city:"Addis Ababa",    sub:"online",    addr:["free delivery", "Ethiopia"] },
  { city:"Worabe",sub:"Duna",addr:["worabe stadium", "eduacation biro", "Ethiopia"] },
  
];

export default function ContactPage() {
  const [form, setForm]     = useState({ name:"", email:"", interest:"bespoke", message:"" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  const fieldStyle = (name) => ({
    width:"100%", background:"transparent", border:"none",
    borderBottom:`1px solid ${focused === name ? "#735c00" : "rgba(197,198,210,.7)"}`,
    outline:"none", padding:"10px 0",
    fontFamily:S.sans, fontSize:"clamp(13px,2vw,15px)", color:S.ink,
    transition:"border-color .2s",
  });

  const labelStyle = (name) => ({
    fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.12em",
    textTransform:"uppercase",
    color: focused === name ? "#735c00" : S.muted,
    display:"block", marginBottom:4, transition:"color .2s",
  });

  return (
    <Layout activePage="Contact">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

        /* Form + sidebar grid */
        .contact-grid { display:flex; flex-direction:column; gap:40px; }
        @media(min-width:768px){ .contact-grid { display:grid; grid-template-columns:7fr 5fr; gap:56px; align-items:start; } }

        /* Locations grid */
        .locations-grid { display:grid; grid-template-columns:1fr; gap:16px; }
        @media(min-width:600px){ .locations-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:900px){ .locations-grid { grid-template-columns:repeat(3,1fr); } }

        /* Name/email row */
        .name-email-row { display:grid; grid-template-columns:1fr; gap:24px; }
        @media(min-width:480px){ .name-email-row { grid-template-columns:1fr 1fr; } }

        select option { color: #1c1b1b; background:#fff; }
        input::placeholder, textarea::placeholder { color:rgba(28,27,27,.35); }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)", textAlign:"center", maxWidth:1440, margin:"0 auto" }}>
        <span style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase", color:"#735c00", display:"block", marginBottom:12 }}>
          Exquisite Communication
        </span>
        <h1 style={{ fontFamily:S.serif, fontSize:"clamp(28px,6vw,56px)", fontWeight:700, color:S.navy, marginBottom:20, lineHeight:1.1 }}>
          Connect with the Atelier
        </h1>
        <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2.5vw,17px)", lineHeight:1.8, color:S.muted, maxWidth:580, margin:"0 auto", fontStyle:"italic" }}>
          For those who seek the extraordinary. Whether you desire a bespoke masterpiece or wish to explore our latest collections, our concierge is at your service.
        </p>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section style={{ padding:"0 clamp(20px,5vw,80px) clamp(48px,8vw,80px)", maxWidth:1440, margin:"0 auto" }}>
        <div className="contact-grid">

          {/* ── Inquiry form ── */}
          <div style={{ background:"#fff", padding:"clamp(24px,5vw,48px)", border:`1px solid rgba(197,198,210,.3)` }}>
            <h2 style={{ fontFamily:S.serif, fontSize:"clamp(22px,4vw,34px)", fontWeight:600, color:S.navy, marginBottom:32 }}>Send an Inquiry</h2>

            {submitted ? (
              <div style={{ padding:"clamp(24px,5vw,48px)", textAlign:"center" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>✉️</div>
                <h3 style={{ fontFamily:S.serif, fontSize:24, color:S.navy, marginBottom:10 }}>Inquiry Received</h3>
                <p style={{ fontFamily:S.sans, fontSize:14, color:S.muted, lineHeight:1.75 }}>
                  Thank you. Our concierge will be in touch within 24 hours to discuss your request.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:24 }}>
                <div className="name-email-row">
                  <div>
                    <label style={labelStyle("name")}>Full Name</label>
                    <input name="name" type="text" placeholder="Johnathan Doe" value={form.name}
                      onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={fieldStyle("name")} />
                  </div>
                  <div>
                    <label style={labelStyle("email")}>Email Address</label>
                    <input name="email" type="email" placeholder="concierge@example.com" value={form.email}
                      onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      style={fieldStyle("email")} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle("interest")}>Interest</label>
                  <select name="interest" value={form.interest} onChange={handleChange}
                    onFocus={() => setFocused("interest")} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle("interest"), cursor:"pointer" }}>
                    <option value="bespoke">Bespoke Couture</option>
                    <option value="collection">Seasonal Collection</option>
                    <option value="press">Press &amp; Media</option>
                    <option value="viewing">Private Viewing</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle("message")}>Your Message</label>
                  <textarea name="message" rows={5} placeholder="How may our atelier assist you?" value={form.message}
                    onChange={handleChange} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle("message"), resize:"vertical" }} />
                </div>

                <div style={{ paddingTop:8 }}>
                  <SubmitBtn>Dispatch Inquiry</SubmitBtn>
                </div>
              </form>
            )}
          </div>

          {/* ── Concierge sidebar ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {/* Contact card */}
            <div style={{ background:S.navyDark, padding:"clamp(20px,4vw,32px)", borderLeft:`4px solid ${S.gold}` }}>
              <h3 style={{ fontFamily:S.serif, fontSize:"clamp(18px,3vw,24px)", fontWeight:500, color:S.gold, marginBottom:16 }}>Private Concierge</h3>
              <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,14px)", lineHeight:1.8, color:"rgba(219,225,255,.8)", marginBottom:24 }}>
                Our dedicated team is available for immediate assistance regarding private orders and international shipping.
              </p>
              {[
                { icon:"📞", label:"Private Line",    value:"+44 (0) 20 7946 0123" },
                { icon:"✉️", label:"Email Concierge", value:"concierge@nextlevelrabia.com" },
              ].map(row => (
                <div key={row.label} style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:20 }}>
                  <span style={{ fontSize:20, flexShrink:0, marginTop:2 }}>{row.icon}</span>
                  <div>
                    <p style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(233,195,73,.55)", marginBottom:4 }}>{row.label}</p>
                    <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,15px)", color:"#fff" }}>{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Atelier image */}
            <div style={{ position:"relative", height:"clamp(200px,28vw,280px)", overflow:"hidden" }}>
              <GrayHoverImg
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD2Zc7Oho7QMZul7-P4iibBAxry7Fqhvu9UfkJSm1kgVSXTu7tzSS_eymeYhPygabIryKuE8aTFtg7FhrKpYf0dKKxmbvYF4q4CCDsOp_Bt-xt4a5z8_DHMBf0X9Gr27LF1n0U7q_yFoB-vhyidGWazRnrPwyleTh0A9mJJWI2WGQFSduf45aO25a4YL_z04WxVj4EfLFM27xTbMh8yIeX5Uw3VZnX-YGjbaIFh4HqhqaxL8OIRr5mSdZyggTqORArMKY0ayld_cA"
                alt="Atelier interior"
              />
              <div style={{ position:"absolute", inset:0, background:"rgba(0,17,58,.2)", display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
                <span style={{ fontFamily:S.sans, fontSize:"clamp(9px,1.5vw,11px)", fontWeight:700, letterSpacing:"0.35em", textTransform:"uppercase", color:"#fff", border:"1px solid rgba(255,255,255,.4)", padding:"8px 16px" }}>
                  The Atelier Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section style={{ background:"#f6f3f2", padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,56px)" }}>
            <h2 style={{ fontFamily:S.serif, fontSize:"clamp(24px,5vw,38px)", fontWeight:600, color:S.navy, marginBottom:12 }}>Global Presence</h2>
            <div style={{ width:96, height:3, background:"#735c00", margin:"0 auto" }} />
          </div>
          <div className="locations-grid">
            {LOCATIONS.map(loc => (
              <LocationCard key={loc.city} loc={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL ANCHOR ── */}
      <section style={{ position:"relative", height:"clamp(240px,45vw,600px)", overflow:"hidden" }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcRdMYYlxYCm3dIIzzdW8-LQTjoziPStM48ZV7I2WusHQ16uJ08CujBWtI94o2ERN1oWD3L7bhEyIHtckZI-mChi34ypgg7_ohiMzQzav-uVPQQw_RwzCTFMBHlvf68U4N8ikYca0YkReYvkRh8MAQiAVv4XLXOjNMXSzWcycvueh3l2PS7fMhcBirOpFsabbv-n-LTcVvGQuAb5qMJ1QexE5KomtxyAXedQzrn0AIBUCfpQcew8wQW89m0-IJmDyKq2bG6eHbMqI"
          alt="Fabric detail"
          style={{ width:"100%", height:"100%", objectFit:"cover" }}
        />
        <div style={{ position:"absolute", inset:0, background:"rgba(0,17,58,.42)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px clamp(20px,5vw,80px)", textAlign:"center" }}>
          <p style={{ fontFamily:S.serif, fontSize:"clamp(16px,3.5vw,30px)", fontStyle:"italic", color:"#fff", lineHeight:1.55, marginBottom:20, maxWidth:700 }}>
            "Excellence is not an act, but a habit of the atelier."
          </p>
          <div style={{ width:48, height:1, background:S.gold }} />
        </div>
      </section>
    </Layout>
  );
}

function LocationCard({ loc }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background:"#fff", padding:"clamp(20px,4vw,32px)", textAlign:"center",
        border: h ? `1px solid #735c00` : "1px solid rgba(197,198,210,.3)",
        transition:"border-color .2s, transform .2s",
        transform: h ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ fontSize:32, marginBottom:10 }}>📍</div>
      <h4 style={{ fontFamily:S.serif, fontSize:"clamp(18px,3vw,22px)", fontWeight:500, color:S.navy, marginBottom:6 }}>{loc.city}</h4>
      <p style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:S.muted, marginBottom:16 }}>{loc.sub}</p>
      <p style={{ fontFamily:S.sans, fontSize:"clamp(12px,2vw,14px)", lineHeight:1.8, color:S.ink, marginBottom:20 }}>
        {loc.addr.map((l, i) => <span key={i}>{l}{i < loc.addr.length - 1 && <br />}</span>)}
      </p>
      <a href="#" style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#735c00", textDecoration:"none", borderBottom:"1px solid #735c00", paddingBottom:2 }}>View Map</a>
    </div>
  );
}

function GrayHoverImg({ src, alt }) {
  const [h, setH] = useState(false);
  return (
    <img src={src} alt={alt}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width:"100%", height:"100%", objectFit:"cover", transition:"filter .7s, transform .7s", filter: h ? "grayscale(0)" : "grayscale(1)", transform: h ? "scale(1.04)" : "scale(1)" }}
    />
  );
}

function SubmitBtn({ children }) {
  const [h, setH] = useState(false);
  return (
    <button type="submit"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding:"13px 36px", background: h ? S.navyDark : S.navy,
        color:"#fff", fontFamily:S.sans, fontSize:11, fontWeight:700,
        letterSpacing:"0.15em", textTransform:"uppercase",
        border:"none", cursor:"pointer", transition:"background .2s",
        width:"100%",
      }}
    >{children}</button>
  );
}