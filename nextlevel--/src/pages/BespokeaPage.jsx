import { useState } from "react";
import Layout from "../components/Layout";
import { S } from "../tokens";
import bespoke from "../assets/bespoke.jpg";
import bespoke2 from "../assets/bespoke2.jpg";

// Every step button maps to a real action
const STEPS = [
  {
    num: "01", title: "The Consultation",
    body: "Your journey begins with a private conversation. We explore your vision, lifestyle, and aesthetic preferences to define a silhouette that is uniquely yours.",
    btnLabel: "Book a Consultation",
    btnHref: "https://t.me/Nextlevelwithrabia",  // opens Telegram to start chat
    reverse: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEpMILsaT4NotzNzHLLkhqpFENc6I-i67DbSCCkNTv2tT2V8nzQvOvnXBJwn4eVKWn79zgDP0kPYi-yVZVyIOn8wQLv9TJJPUspaXAYxoptJKNaO3QgD8hI_csQb2kRtw1kkuvoOd4r6V6bKvzNuwmqLjwIGwonF9I4jRL2tpVVGpBL7SyoDzbxopaALxJl91TCVJLXbZPTBcaIEd9QVZN5biwqg-TBWJZMp5qkVRLqY5-tv82nEwFDCnucR5vOIUkEAQgNOa9Jbc",
  },
  {
    num: "02", title: "Fabric Selection",
    body: "Choose from our curated library of the world's finest textiles. Every thread is selected for its superior quality — from luxurious silks to fine wools.",
    btnLabel: "Ask About Fabrics",
    btnHref: "https://t.me/Nextlevelwithrabia",
    reverse: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCratVAB5guFxjxA3SOasACuXUnGXONbyF2gXJzUMZpGhqUE52VdNDV4CbeaaE2ABxlRxc-LkeQm6tCvHaKf_u-JuVoXhRjWBYM_qU6C8zUo4LD-eKAdxuC_Uub9n2vZuZ1d_TJS-_QFRC6tDYm0yThyaS9By9dq3c10WAwNmJmlHqiolwhqStNuJQ1iupA_d-HvIT-GIjP_YEclJWFTHc4OJNbOyDUmhYFOWO4njOqZCyWSyfDuZKqblBa1a2I-oft4qzzcoUsKOk",
  },
  {
    num: "03", title: "Master Craftsmanship",
    body: "Our master tailors begin construction, translating your measurements into a three-dimensional masterpiece. Every stitch is a testament to decades of artisanal heritage.",
    btnLabel: "See Our Work",
    btnHref: "https://www.tiktok.com/@rabia_bahru",  // TikTok shows the work
    reverse: false,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgkR9R2ehyhjAQYjLqBHN97RwkLFV49K8AX-Xp38qyAOKXcRVUFLD_17BqQa_SAgbz1UqFtSU4fh6rB3pnjG7hFTwvashiucdKq-ar0h2rN3U__qYaznQZMLjhVgNquBqYz2ZWspflvjDjuJQtq3h47U0HRCSrKxsdLvEgibIjK-x4DstBklzMIf2ubTd0FEpqZ4YbZ_Ic1KlXID9l2AAHnrQ6bcwnG2qHoa14Y2u_l32EmBR44EA5jI7sWCgXYp9ZpXk5mciUbbQ",
  },
  {
    num: "04", title: "Final Fitting",
    body: "The final reveal. We make the most minute adjustments to ensure absolute perfection. This is the moment your vision becomes reality, ready to be worn with pride.",
    btnLabel: "Book a Fitting",
    btnHref: "tel:+251933038169",  // call to book fitting
    reverse: true,
    img: bespoke2,}
];

function StepCard({ step }) {
  const [imgHovered, setImgHovered] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24, alignItems:"center" }}>
      <div
        className={`step-img-wrap ${step.reverse ? "step-reverse" : ""}`}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        style={{ width:"100%", overflow:"hidden", aspectRatio:"4/5", flexShrink:0 }}
      >
        <img src={step.img} alt={step.title}
          style={{ width:"100%", height:"100%", objectFit:"cover",
            transition:"transform .7s cubic-bezier(.4,0,.2,1)",
            transform: imgHovered ? "scale(1.06)" : "scale(1)" }}
        />
      </div>

      <div style={{ width:"100%" }}>
        <span style={{ fontFamily:S.sans, fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:S.gold, display:"block", marginBottom:8 }}>
          Step {step.num}
        </span>
        <h4 style={{ fontFamily:S.serif, fontSize:"clamp(20px,4vw,26px)", fontWeight:500, color:S.navy, marginBottom:12 }}>
          {step.title}
        </h4>
        <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2.5vw,15px)", lineHeight:1.8, color:S.muted, marginBottom:20 }}>
          {step.body}
        </p>
        {/* Real link — opens Telegram / email / phone / TikTok */}
        <a href={step.btnHref}
          target={step.btnHref.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          style={{
            display:"inline-flex", alignItems:"center", gap:6,
            fontFamily:S.sans, fontSize:11, fontWeight:700,
            letterSpacing:"0.12em", textTransform:"uppercase",
            color:S.navy, textDecoration:"none",
            borderBottom:`2px solid ${S.gold}`, paddingBottom:3,
            transition:"color .2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#002366"}
          onMouseLeave={e => e.currentTarget.style.color = S.navy}
        >
          {step.btnLabel} →
        </a>
      </div>
    </div>
  );
}

export default function BespokePage() {
  return (
    <Layout activePage="Bespoke">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .step-img-wrap { order:0; }
        @media(min-width:768px){
          .steps-grid { display:grid !important; grid-template-columns:1fr 1fr; gap:60px 40px; }
          .step-img-wrap { width:100% !important; }
        }
        .cta-btns { display:flex; flex-direction:column; gap:12px; width:100%; }
        @media(min-width:480px){ .cta-btns { flex-direction:row; width:auto; } }
        .standards-grid { display:grid; grid-template-columns:1fr; gap:16px; }
        @media(min-width:600px){ .standards-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:900px){ .standards-grid { grid-template-columns:repeat(3,1fr); } }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:"relative", height:"clamp(420px,70vh,820px)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <img
          src={bespoke}
          alt="Bespoke atelier"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,17,58,.35), rgba(0,17,58,.78))" }} />
        <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 clamp(20px,5vw,80px)", maxWidth:740 }}>
          <span style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:S.goldDim, display:"block", marginBottom:12 }}>
            Artisanal Excellence
          </span>
          <h1 style={{ fontFamily:S.serif, fontSize:"clamp(28px,7vw,56px)", fontWeight:600, color:"#fff", lineHeight:1.15, marginBottom:20 }}>
            The Bespoke Experience
          </h1>
          <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2.5vw,17px)", color:"rgba(255,255,255,.8)", lineHeight:1.75, marginBottom:32 }}>
            A journey of personal expression, meticulously crafted to your exact specifications.
          </p>
          {/* → Opens Telegram to start the journey */}
          <a href="https://t.me/RabiaBahru" target="_blank" rel="noopener noreferrer"
            style={{
              display:"inline-block", padding:"14px 36px",
              background:S.gold, color:S.navy,
              fontFamily:S.sans, fontSize:12, fontWeight:700,
              letterSpacing:"0.15em", textTransform:"uppercase",
              textDecoration:"none", border:`2px solid ${S.gold}`,
              transition:"background .2s, color .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = S.gold; }}
            onMouseLeave={e => { e.currentTarget.style.background = S.gold; e.currentTarget.style.color = S.navy; }}
          >
            Start Your Journey →
          </a>
        </div>
      </section>

      {/* ── THE PROCESS ── */}
      <section style={{ padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)", maxWidth:1440, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"clamp(40px,6vw,64px)" }}>
          <h2 style={{ fontFamily:S.serif, fontSize:"clamp(26px,5vw,40px)", fontWeight:600, color:S.navy, marginBottom:12 }}>
            The Crafting Process
          </h2>
          <div style={{ width:64, height:2, background:S.gold, margin:"0 auto" }} />
        </div>
        <div className="steps-grid" style={{ display:"flex", flexDirection:"column", gap:56 }}>
          {STEPS.map(step => <StepCard key={step.num} step={step} />)}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ background:"#f6f3f2", padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:40, color:S.gold, marginBottom:20, lineHeight:1 }}>"</div>
          <blockquote style={{ fontFamily:S.serif, fontSize:"clamp(18px,3.5vw,28px)", fontWeight:400, fontStyle:"italic", color:S.navy, lineHeight:1.55, marginBottom:28 }}>
            Bespoke is not just about a garment that fits; it is about a garment that tells your story through every thread and every seam.
          </blockquote>
          <p style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:S.gold }}>
            Rabia — CEO and Creative Director
            Abdu -CEO and Managing Director
          </p>
        </div>
      </section>

      {/* ── STANDARDS ── */}
      <section style={{ background:"#002366", padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,56px)" }}>
            <h2 style={{ fontFamily:S.serif, fontSize:"clamp(24px,4.5vw,36px)", fontWeight:600, color:S.gold, marginBottom:10 }}>Our Golden Standards</h2>
            <p style={{ fontFamily:S.sans, fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(233,195,73,.6)" }}>The pillars of our house</p>
          </div>
          <div className="standards-grid">
            {[
              { icon:"💎", title:"Rare Materiality",  body:"We source exclusively premium fabrics ensuring every fiber meets a standard of tactile excellence that cannot be replicated." },
              { icon:"📐", title:"Precision Cut",      body:"Architecture for the body. Every seam is calculated to the millimeter for a flawless, transformative silhouette." },
              { icon:"🌱", title:"Sustainable Ethos",  body:"Zero-waste pattern cutting and locally produced small batches define our commitment to a kinder planet." },
            ].map(card => (
              <div key={card.title}
                style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(233,195,73,.15)", padding:"clamp(20px,4vw,32px)", transition:"border-color .3s, background .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.background = "rgba(233,195,73,.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(233,195,73,.15)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}
              >
                <div style={{ fontSize:32, marginBottom:16 }}>{card.icon}</div>
                <h3 style={{ fontFamily:S.serif, fontSize:20, fontWeight:500, color:S.gold, marginBottom:10 }}>{card.title}</h3>
                <p style={{ fontFamily:S.sans, fontSize:14, lineHeight:1.75, color:"rgba(233,195,73,.7)" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:S.navy, padding:"clamp(48px,8vw,80px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
          <h2 style={{ fontFamily:S.serif, fontSize:"clamp(24px,5vw,38px)", fontWeight:600, color:"#fff", marginBottom:16 }}>
            Begin Your Bespoke Journey
          </h2>
          <p style={{ fontFamily:S.sans, fontSize:"clamp(13px,2.5vw,16px)", color:"rgba(255,255,255,.7)", lineHeight:1.75, maxWidth:560, marginBottom:36 }}>
            Consultations are by appointment. Contact us to discuss your next custom piece.
          </p>
          <div className="cta-btns">
            {/* Schedule Appointment → WhatsApp/Telegram */}
            <a href="https://t.me/Nextlevelwithrabia" target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
                padding:"13px 28px", background:S.gold, color:S.navy,
                fontFamily:S.sans, fontSize:11, fontWeight:700,
                letterSpacing:"0.15em", textTransform:"uppercase",
                textDecoration:"none", border:`2px solid ${S.gold}`,
                transition:"all .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = S.gold; }}
              onMouseLeave={e => { e.currentTarget.style.background = S.gold; e.currentTarget.style.color = S.navy; }}
            >
              ✈️ Schedule via Telegram
            </a>
            {/* View Portfolio → TikTok */}
            <a href="https://www.tiktok.com/@rabia_bahru" target="_blank" rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
                padding:"13px 28px", background:"transparent", color:"rgba(233,195,73,.8)",
                fontFamily:S.sans, fontSize:11, fontWeight:700,
                letterSpacing:"0.15em", textTransform:"uppercase",
                textDecoration:"none", border:"2px solid rgba(233,195,73,.5)",
                transition:"all .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = S.gold; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(233,195,73,.5)"; e.currentTarget.style.color = "rgba(233,195,73,.8)"; }}
            >
              🎵 View Portfolio on TikTok
            </a>
          </div>
          {/* Quick phone line */}
          <p style={{ fontFamily:S.sans, fontSize:12, color:"rgba(255,255,255,.4)", marginTop:20 }}>
            Or call us: <a href="tel:+251933038169" style={{ color:S.gold, fontWeight:700, textDecoration:"none" }}>+251 933 038 169</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}