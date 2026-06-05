import { useState } from "react";
import Layout from "../components/Layout";
import { S } from "../tokens";
import about from "../assets/about.jpg";
const STANDARDS = [
  { icon:"💎", title:"Rare Materiality",  body:"We source exclusively premium fabrics ensuring every fiber meets a standard of tactile excellence that cannot be replicated." },
  { icon:"📐", title:"Precision Cut",     body:"Architecture for the body. Every seam is calculated to the millimeter for a flawless, transformative silhouette." },
  { icon:"🌱", title:"Sustainable Ethos", body:"Zero-waste pattern cutting and locally produced small batches define our commitment to responsible luxury." },
];

export default function AboutPage() {
  const [email,     setEmail]     = useState("");
  const [subState,  setSubState]  = useState("idle"); // idle | success | error

  const handleSubscribe = e => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setSubState("error");
      return;
    }
    // Opens pre-filled email so Rabia receives the subscription request
    const subject = encodeURIComponent("Inner Circle Subscription");
    const body    = encodeURIComponent(`Hi Rabia,\n\nPlease add me to your inner circle updates.\n\nEmail: ${email}`);
    window.open(`mailto:Rabiabahru2581024@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSubState("success");
    setEmail("");
  };

  return (
    <Layout activePage="About">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .vision-grid { display:flex; flex-direction:column; gap:40px; align-items:flex-start; }
        @media(min-width:768px){ .vision-grid { display:grid; grid-template-columns:5fr 7fr; gap:56px; align-items:center; } }
        .gallery-grid { display:flex; flex-direction:column-reverse; gap:32px; }
        @media(min-width:768px){ .gallery-grid { flex-direction:row; } }
        .standards-grid { display:grid; grid-template-columns:1fr; gap:16px; }
        @media(min-width:600px){ .standards-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:900px){ .standards-grid { grid-template-columns:repeat(3,1fr); } }
        .newsletter-row { display:flex; flex-direction:column; gap:12px; align-items:stretch; width:100%; max-width:480px; margin:0 auto; }
        @media(min-width:600px){ .newsletter-row { flex-direction:row; align-items:center; } }
        input::placeholder { color:rgba(0,17,58,.35); }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:"relative", height:"clamp(420px,65vh,920px)", display:"flex", alignItems:"center", overflow:"hidden" }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp96Mr2ybZSuyT41A9OidExh_8vBL9lsjGKXfqUfPFRaQykaull1vkci0VSunR2Dpr4jVhAYcGJu5ItYmF88mXyzeoIVnFT6YrVlUkHG_g5H_a9ssl8IAjsoLDkukakknRyjeNS6pGMm9YGtAkyV5AJxQ9In9alf0CFzjN8jUraD4-rXYN6sk2_7U8IzrGRZp72XS27VpQornoLLcSmAEwP1qBJMcNKD4TcqeuqKKB4sqEZ99LZCPJANVkuuNPI4rJ2dpiZqOo7e0"
          alt="About hero"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
        />
        <div style={{ position:"absolute", inset:0, background:"rgba(0,17,58,.3)" }} />
        <div style={{ position:"relative", zIndex:1, padding:"0 clamp(20px,5vw,80px)", maxWidth:1440, width:"100%" }}>
          <div style={{
            maxWidth:"clamp(280px,80vw,620px)",
            background:"rgba(252,249,248,.92)", backdropFilter:"blur(6px)",
            padding:"clamp(24px,5vw,48px)", borderLeft:`6px solid ${S.gold}`,
          }}>
            <span style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#735c00", display:"block", marginBottom:12 }}>Est. 2018</span>
            <h1 style={{ fontFamily:S.serif, fontSize:"clamp(28px,6vw,64px)", fontWeight:700, color:S.navy, lineHeight:1.1, marginBottom:18 }}>
              A Legacy of Silk and Soul.
            </h1>
            <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,17px)", fontStyle:"italic", color:S.muted, lineHeight:1.7, borderLeft:"2px solid rgba(115,92,0,.25)", paddingLeft:16 }}>
              "Every stitch is a conversation between history and the future."
            </p>
          </div>
        </div>
      </section>

      {/* ── THE VISIONARY ── */}
      <section style={{ padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)", maxWidth:1440, margin:"0 auto" }}>
        <div className="vision-grid">
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <h2 style={{ fontFamily:S.serif, fontSize:"clamp(24px,5vw,38px)", fontWeight:600, color:S.navy }}>The Visionary</h2>
            <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,17px)", lineHeight:1.8, color:S.muted }}>
              Rabia's and Abdu journey began not in a classroom, but surrounded by the rhythmic click of looms and the scent of raw silk.Theydeveloped an intuitive understanding of drape and silhouette that transcends technical skill.
            </p>
            <div style={{ padding:"clamp(16px,3vw,24px)", background:"#f6f3f2", borderLeft:`3px solid ${S.gold}` }}>
              <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,15px)", fontStyle:"italic", color:S.navy, marginBottom:12 }}>
                "Luxury isn't about excess; it's about the profound silence of perfect quality."
              </p>
              <div style={{ width:48, height:2, background:S.gold }} />
            </div>
            <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,15px)", lineHeight:1.8, color:S.muted }}>
              Next Level with Rabia was born from a desire to reclaim the 'bespoke' experience. It is an ode to the woman who requires her wardrobe to be as powerful as her presence.
            </p>
            {/* Real action buttons */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:8 }}>
              <a href="#contact"
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"11px 22px", background:S.navy, color:"#fff", fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", textDecoration:"none", transition:"background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#002366"}
                onMouseLeave={e => e.currentTarget.style.background = S.navy}
              >
                Work With Rabia →
              </a>
              <a href="https://www.tiktok.com/@rabia_bahru" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"11px 22px", background:"transparent", color:S.navy, fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", textDecoration:"none", border:`1px solid ${S.navy}`, transition:"background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,17,58,.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                🎵 See the Work
              </a>
            </div>
          </div>

          <div style={{ position:"relative", width:"100%", aspectRatio:"4/5", overflow:"hidden" }}>
            <HoverImg
              src={about}
              alt="Designer at work"
            />
          </div>
        </div>
      </section>

      {/* ── GOLDEN STANDARDS ── */}
      <section style={{ background:"#002366", padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,56px)" }}>
            <h2 style={{ fontFamily:S.serif, fontSize:"clamp(24px,5vw,38px)", fontWeight:600, color:S.gold, marginBottom:10 }}>Our Golden Standards</h2>
            <p style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(233,195,73,.55)" }}>The pillars of our house</p>
          </div>
          <div className="standards-grid">
            {STANDARDS.map(card => (
              <div key={card.title}
                style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(233,195,73,.15)", padding:"clamp(20px,4vw,32px)", transition:"border-color .3s, background .3s", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.background = "rgba(233,195,73,.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(233,195,73,.15)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}
              >
                <div style={{ fontSize:32, marginBottom:16 }}>{card.icon}</div>
                <h3 style={{ fontFamily:S.serif, fontSize:"clamp(18px,3vw,22px)", fontWeight:500, color:S.gold, marginBottom:10 }}>{card.title}</h3>
                <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,14px)", lineHeight:1.8, color:"rgba(233,195,73,.7)" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)", maxWidth:1440, margin:"0 auto" }}>
        <div className="gallery-grid">
          <div style={{ flex:"1 1 33%", paddingTop:"clamp(0px,4vw,40px)" }}>
            <GrayscaleImg
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYHMSsY4Xt2V-ZNuUpGdPi0ZjnntRA_0Nl1y8lgOlkOU7EdED8k1xY1To2s0cBXDKgBNFSwup7Uz-pb08JcsdA56EUos3--7HEDp5CNQkocsqbEwNYbZRdU1ZkgevwKbQrQK6pUIMSUsqr97KXvsGrq15Xy_HILs1JE73hSchyG65eOD5lzHaioINwmoCNZCaKOTm85sQTesmSCN3-W0lREIWXMnm_H-c6V8XgUL22hjxoXPUn72G2OmNF6DeAJIx68kb6BHSpZlE"
              alt="Fabric detail"
            />
            <h4 style={{ fontFamily:S.serif, fontSize:"clamp(18px,3vw,22px)", fontWeight:500, color:S.navy, margin:"20px 0 8px" }}>The Atelier Process</h4>
            <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2vw,15px)", lineHeight:1.8, color:S.muted }}>
              Each piece spends an average of 40 hours in the hands of a master tailor before the final fitting.
            </p>
          </div>
          <div style={{ flex:"1 1 65%", overflow:"hidden" }}>
            <HoverImg
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCXzzVMUjQeT-Ve6fROMItfGVI3bTb-1gVGIhc0dMXs-4ScGQT3ZNx6uh3_6Wuf_Wn_ROGwu35kSqv9ov7CCOKzXCwbQWPXqNdaDLXSxSSZpEjxNcJ4NUxtI8PVmc7PltEpSF4RJ7NJCx9kS6JbqR9NjbKdPbF1mgQFo33dPfj2_ziSiqc5m86zEXsV5juo6PK2YxJqzYxEiAjzmODEdp5nhAYgDZYS1HODACoUhk5yv9OhMAICQlpI1nJ-2-DRjb2Lo6jjz-FXKg"
              alt="Runway look"
              style={{ height:"clamp(280px,45vw,600px)" }}
            />
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER — actually works ── */}
      <section style={{ background:"rgba(233,195,73,.08)", borderTop:"1px solid rgba(115,92,0,.2)", borderBottom:"1px solid rgba(115,92,0,.2)", padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontFamily:S.serif, fontSize:"clamp(24px,5vw,36px)", fontWeight:600, color:S.navy, marginBottom:12 }}>
            Join the Inner Circle
          </h2>
          <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2.5vw,17px)", color:S.muted, lineHeight:1.75, marginBottom:32 }}>
            Receive early access to new collections and private viewing invitations.
          </p>

          {subState === "success" ? (
            <div style={{ background:"rgba(134,239,172,.15)", border:"1px solid rgba(134,239,172,.4)", borderRadius:6, padding:"20px 24px", display:"inline-block" }}>
              <p style={{ fontFamily:S.sans, fontSize:14, color:"#085041", fontWeight:600 }}>
                ✅ Your email app should have opened! If not, email us directly at<br/>
                <a href="mailto:Rabiabahru2581024@gmail.com" style={{ color:"#735c00" }}>Rabiabahru2581024@gmail.com</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div className="newsletter-row">
                <input
                  type="email" value={email} onChange={e => { setEmail(e.target.value); setSubState("idle"); }}
                  placeholder="Your email address"
                  required
                  style={{
                    flex:1, borderBottom:`2px solid ${subState === "error" ? "#ba1a1a" : S.navy}`,
                    border:"none", borderBottom:`2px solid ${subState === "error" ? "#ba1a1a" : S.navy}`,
                    paddingBottom:8, background:"transparent",
                    fontFamily:S.sans, fontSize:13, color:S.navy, outline:"none",
                    textAlign:"left",
                  }}
                />
                <button type="submit"
                  style={{ padding:"12px 28px", background:S.navy, color:"#fff", fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", border:"none", cursor:"pointer", whiteSpace:"nowrap", transition:"background .2s", borderRadius:2 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#002366"}
                  onMouseLeave={e => e.currentTarget.style.background = S.navy}
                >
                  Join Now
                </button>
              </div>
              {subState === "error" && (
                <p style={{ fontFamily:S.sans, fontSize:12, color:"#ba1a1a", marginTop:8 }}>Please enter a valid email address.</p>
              )}
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}

function HoverImg({ src, alt, style: extra = {} }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ width:"100%", height:"100%", overflow:"hidden", ...extra }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <img src={src} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .7s", transform: h ? "scale(1.06)" : "scale(1)" }} />
    </div>
  );
}

function GrayscaleImg({ src, alt }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ overflow:"hidden" }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <img src={src} alt={alt} style={{ width:"100%", objectFit:"cover", transition:"filter 1s, transform .7s", filter: h ? "grayscale(0)" : "grayscale(1)", transform: h ? "scale(1.04)" : "scale(1)" }} />
    </div>
  );
}