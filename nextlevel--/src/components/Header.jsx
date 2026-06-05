import { useState, useEffect } from "react";
import { S } from "../tokens";
import logo from "../assets/logo.jpg";

const NAV_LINKS = [
  { label: "Collections", path: "#collections" },
  { label: "Bespoke",     path: "#bespoke" },
  { label: "About",       path: "#about" },
  { label: "Contact",     path: "#contact" },
];

function HamburgerIcon({ open }) {
  return (
    <div style={{ position: "relative", width: 22, height: 16 }}>
      {[0, 7, 14].map((top, i) => (
        <span key={i} style={{
          display: "block", width: 22, height: 2,
          background: S.gold, borderRadius: 1,
          position: "absolute", left: 0,
          top: open ? "7px" : `${top}px`,
          opacity: open && i === 1 ? 0 : 1,
          transform: open
            ? i === 0 ? "rotate(45deg)" : i === 2 ? "rotate(-45deg)" : "none"
            : "none",
          transition: "all 0.3s ease",
        }} />
      ))}
    </div>
  );
}

export default function Header({ activePage = "" }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <>
      <style>{`
        .hdr-nav-link { text-decoration:none; transition:color .2s; }
        .hdr-nav-link:hover { color:#fff !important; }
        .desktop-nav-links { display:none; gap:32px; align-items:center; }
        .hamburger-btn     { display:flex; }
        @media(min-width:768px){
          .desktop-nav-links { display:flex; }
          .hamburger-btn     { display:none !important; }
        }
        .mobile-drawer {
          position:fixed; inset:0; background:${S.navy}; z-index:49;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:36px; transition:opacity .3s, visibility .3s;
        }
        .mobile-drawer a { text-decoration:none; transition:color .2s; }
        .mobile-drawer a:hover { color:${S.gold} !important; }
      `}</style>

      {/* ── Header bar ── */}
      <header style={{
        background: S.navy, position:"fixed", top:0, left:0, width:"100%", zIndex:50,
        borderBottom:`1px solid ${S.goldFaint}`,
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.22)" : "none",
        transition:"box-shadow .3s",
      }}>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding: "14px clamp(20px,5vw,80px)",
          maxWidth:1440, margin:"0 auto",
        }}>
          {/* Logo */}
          <a href="/" style={{
            fontFamily:S.serif, fontSize:"clamp(13px,3.2vw,20px)",
            fontWeight:700, color:S.gold, textDecoration:"none",
            letterSpacing:"0.08em", flexShrink:0,alignItems:"center", display:"flex", gap:10,
          }}>
            <img src={logo} alt="Logo" style={{ height: 40, width: "40", borderRadius: "50%" ,objectFit: "cover"}} />
            NEXT LEVEL WITH RABIA
          </a>

          {/* Desktop links */}
          <nav className="desktop-nav-links">
            {NAV_LINKS.map(({ label, path }) => {
              const active = activePage.toLowerCase() === label.toLowerCase();
              return (
                <a key={label} href={path} className="hdr-nav-link" style={{
                  fontFamily:S.sans, fontSize:12, fontWeight:700,
                  letterSpacing:"0.12em", textTransform:"uppercase",
                  color: active ? "#fff" : S.goldDim,
                  borderBottom: active ? `2px solid ${S.gold}` : "none",
                  paddingBottom:2,
                }}>{label}</a>
              );
            })}
          </nav>

          {/* Right icons */}
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <button title="Cart" style={{ background:"none", border:"none", cursor:"pointer", color:S.gold, fontSize:22, lineHeight:1, padding:4 }}>🛍</button>
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      <div className="mobile-drawer" style={{ opacity: menuOpen ? 1 : 0, visibility: menuOpen ? "visible" : "hidden" }}>
        {NAV_LINKS.map(({ label, path }) => {
          const active = activePage.toLowerCase() === label.toLowerCase();
          return (
            <a key={label} href={path}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:S.serif, fontSize:"clamp(22px,7vw,32px)", fontWeight:600,
                color: active ? S.gold : S.goldDim,
                borderBottom: active ? `1px solid ${S.gold}` : "none",
                paddingBottom:4, letterSpacing:"0.06em",
              }}
            >{label}</a>
          );
        })}
      </div>
    </>
  );
}