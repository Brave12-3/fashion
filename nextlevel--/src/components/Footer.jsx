import { useState } from "react";
import { S } from "../tokens";

const SOCIAL = [
  { label:"Instagram", handle:"Next level with Rabia", href:"https://instagram.com/nextlevelwithrabia",
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
  { label:"Facebook",  handle:"Suzan Bint Bahru",      href:"https://facebook.com/suzanbintbahru",
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label:"Telegram",  handle:"@RabiaBahru",            href:"https://t.me/RabiaBahru",
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg> },
  { label:"TikTok",    handle:"@rabia_bahru",           href:"https://www.tiktok.com/@rabia_bahru",
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z"/></svg> },
];

const NAV_LINKS = [
  { label:"Collections", hash:"#collections" },
  { label:"Bespoke",     hash:"#bespoke" },
  { label:"About",       hash:"#about" },
  { label:"Contact",     hash:"#contact" },
];

export default function Footer() {
  const [email,    setEmail]    = useState("");
  const [subState, setSubState] = useState("idle"); // idle | success | error

  const handleSubscribe = e => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) { setSubState("error"); return; }
    const subject = encodeURIComponent("Inner Circle Subscription");
    const body    = encodeURIComponent(`Hi Rabia,\n\nPlease add me to your inner circle updates.\n\nEmail: ${email}`);
    window.open(`mailto:Rabiabahru2581024@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSubState("success");
    setEmail("");
  };

  return (
    <footer style={{ background: S.navy, color: S.gold }}>
      <style>{`
        .ftr-grid { display:flex; flex-direction:column; gap:40px; padding:48px clamp(20px,5vw,80px); max-width:1440px; margin:0 auto; }
        @media(min-width:768px){ .ftr-grid { flex-direction:row; flex-wrap:wrap; justify-content:space-between; padding:64px clamp(20px,5vw,80px); } }
        .ftr-nav-grid { display:grid; grid-template-columns:1fr 1fr; gap:0 40px; }
        .ftr-link { display:block; margin-bottom:10px; font-family:${S.sans}; font-size:12px; color:rgba(233,195,73,.7); text-decoration:none; transition:color .2s; }
        .ftr-link:hover { color:${S.gold}; }
        .ftr-social-btn { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:6px; border:1px solid rgba(233,195,73,.18); text-decoration:none; transition:background .2s, border-color .2s; margin-bottom:10px; }
        .ftr-social-btn:hover { background:rgba(233,195,73,.1); border-color:rgba(233,195,73,.4); }
        .ftr-bottom { padding:14px clamp(20px,5vw,80px); border-top:1px solid rgba(233,195,73,.1); display:flex; flex-direction:column; gap:10px; align-items:flex-start; max-width:1440px; margin:0 auto; }
        @media(min-width:600px){ .ftr-bottom { flex-direction:row; justify-content:space-between; align-items:center; } }
        .ftr-email-input::placeholder { color:rgba(233,195,73,.4); }
      `}</style>

      <div className="ftr-grid">

        {/* ── Brand + contact ── */}
        <div style={{ maxWidth:260 }}>
          <p style={{ fontFamily:S.serif, fontSize:18, fontWeight:600, marginBottom:6, lineHeight:1.3 }}>NEXT LEVEL WITH RABIA</p>
          <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(233,195,73,.5)", marginBottom:16, letterSpacing:"0.06em", textTransform:"uppercase" }}>Jilbab &amp; Fashion Designer</p>
          <p style={{ fontFamily:S.sans, fontSize:13, lineHeight:1.8, color:"rgba(233,195,73,.7)", marginBottom:18 }}>
            Bespoke jilbab and fashion design, crafted with care for every occasion.
          </p>
          {["+251 933 038 169", "+251 913 022 057"].map(num => (
            <a key={num} href={`tel:${num.replace(/\s/g,"")}`}
              style={{ display:"flex", alignItems:"center", gap:8, fontFamily:S.sans, fontSize:13, color:S.gold, textDecoration:"none", fontWeight:600, marginBottom:6 }}>
              📞 {num}
            </a>
          ))}
          <a href="mailto:Rabiabahru2581024@gmail.com"
            style={{ display:"flex", alignItems:"center", gap:8, fontFamily:S.sans, fontSize:12, color:"rgba(233,195,73,.7)", textDecoration:"none", wordBreak:"break-all", marginTop:4 }}>
            ✉️ Rabiabahru2581024@gmail.com
          </a>
        </div>

        {/* ── Navigation ── */}
        <div className="ftr-nav-grid">
          <div>
            <h4 style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16 }}>Pages</h4>
            {NAV_LINKS.map(l => <a key={l.label} href={l.hash} className="ftr-link">{l.label}</a>)}
          </div>
          <div>
            <h4 style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16 }}>Contact</h4>
            <a href="https://t.me/RabiaBahru" target="_blank" rel="noopener noreferrer" className="ftr-link">Telegram</a>
            <a href="tel:+251933038169" className="ftr-link">Call Us</a>
            <a href="mailto:Rabiabahru2581024@gmail.com" className="ftr-link">Email Us</a>
            <a href="#contact" className="ftr-link">Contact Page</a>
          </div>
        </div>

        {/* ── Social + Newsletter ── */}
        <div style={{ minWidth:220 }}>
          <h4 style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:14 }}>Follow Us</h4>
          {SOCIAL.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ftr-social-btn">
              <span style={{ color:S.gold, display:"flex", alignItems:"center", flexShrink:0 }}>{s.icon}</span>
              <div>
                <p style={{ fontFamily:S.sans, fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(233,195,73,.5)", marginBottom:1 }}>{s.label}</p>
                <p style={{ fontFamily:S.sans, fontSize:12, color:S.gold, fontWeight:600 }}>{s.handle}</p>
              </div>
            </a>
          ))}

          {/* Newsletter — actually sends an email */}
          <div style={{ marginTop:20, paddingTop:20, borderTop:"1px solid rgba(233,195,73,.15)" }}>
            <h4 style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>Join the Inner Circle</h4>
            {subState === "success" ? (
              <p style={{ fontFamily:S.sans, fontSize:12, color:"#86efac", lineHeight:1.6 }}>
                ✅ Email app opened! Send the email to subscribe.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ display:"flex", borderBottom:"1px solid rgba(233,195,73,.35)", paddingBottom:6 }}>
                  <input
                    type="email" value={email}
                    onChange={e => { setEmail(e.target.value); setSubState("idle"); }}
                    placeholder="Email Address"
                    className="ftr-email-input"
                    style={{ background:"transparent", border:"none", outline:"none", color:S.gold, fontFamily:S.sans, fontSize:13, flex:1 }}
                  />
                  <button type="submit"
                    style={{ background:"none", border:"none", cursor:"pointer", color:S.gold, fontSize:20, padding:"0 4px", transition:"transform .2s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
                  >→</button>
                </div>
                {subState === "error" && (
                  <p style={{ fontFamily:S.sans, fontSize:11, color:"#ffb3b3" }}>Please enter a valid email.</p>
                )}
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="ftr-bottom">
        <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(233,195,73,.4)", fontStyle:"italic" }}>
          © 2025 Next Level with Rabia. All rights reserved.
        </p>
        <p style={{ fontFamily:S.sans, fontSize:11, color:"rgba(233,195,73,.4)" }}>Worabe, Ethiopia</p>
      </div>
    </footer>
  );
}