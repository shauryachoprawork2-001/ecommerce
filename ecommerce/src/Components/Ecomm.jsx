import React from "react";

const heroStyle = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#f5f4ef",
  backgroundImage: `
    linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
};

const heroTextStyle = {
  position: "absolute",
  left: "40px",
  top: "60px",
  zIndex: 2,
  lineHeight: 0.88,
  letterSpacing: "-4px",
};

const lineBase = {
  fontFamily: "'Bebas Neue', 'Arial Black', Impact, sans-serif",
  fontSize: "clamp(80px, 11vw, 155px)",
  fontWeight: 900,
  lineHeight: 0.88,
  display: "block",
  color: "#111",
  textTransform: "uppercase",
};

const cardBase = {
  position: "absolute",
  background: "#fff",
  border: "3px solid #111",
  overflow: "hidden",
  cursor: "pointer",
};

const tagStyle = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  background: "#fff",
  border: "2px solid #111",
  padding: "4px 10px",
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "2px",
  color: "#111",
};

const Ecomm = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@900&display=swap');
        .card { transition: transform 0.3s ease; }
        .card:hover { transform: rotate(0deg) scale(1.04) !important; }
      `}</style>

      <div style={heroStyle}>

        {/* BIG TEXT — left side only */}
        <div style={heroTextStyle}>
          <span style={lineBase}>REJECT</span>
          <span style={{ ...lineBase, color: "#ff2eb4" }}>SUBTLE</span>
          <span style={{ ...lineBase, color: "transparent", WebkitTextStroke: "4px #111" }}>
            EMBRACE
          </span>
          <span style={lineBase}>NOISE</span>
        </div>

        {/* CARD 1 — top right, tall portrait */}
        <div
          className="card"
          style={{ ...cardBase, right: "30px", top: "20px", width: "260px", transform: "rotate(4deg)", zIndex: 3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1610567177680-033d1d9198bc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Look 01"
            style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }}
          />
          <span style={tagStyle}>LAPTOPS</span>
        </div>

        {/* CARD 2 — mid right, slightly lower */}
        <div
          className="card"
          style={{ ...cardBase, right: "320px", top: "60px", width: "220px", transform: "rotate(-5deg)", zIndex: 2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80"
            alt="Look 02"
            style={{ width: "100%", height: "250px", objectFit: "cover", display: "block" }}
          />
          <span style={tagStyle}>FASHION</span>
        </div>

        {/* CARD 3 — bottom right, sneaker with badge */}
        <div
          className="card"
          style={{ ...cardBase, right: "60px", bottom: "40px", width: "280px", transform: "rotate(-8deg)", zIndex: 4 }}
        >
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
            alt="New Drop"
            style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
          />
          <span style={{
            position: "absolute", top: "-18px", right: "-18px",
            width: "72px", height: "72px", borderRadius: "50%",
            background: "#c6ff00", border: "3px solid #111",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px", fontWeight: 900, letterSpacing: "0.5px",
            textAlign: "center", lineHeight: 1.15, textTransform: "uppercase", color: "#111",
          }}>
            NEW<br />DROP
          </span>
        </div>

        {/* CARD 4 — bottom mid-right */}
        <div
          className="card"
          style={{ ...cardBase, right: "360px", bottom: "30px", width: "200px", transform: "rotate(6deg)", zIndex: 3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Look 03"
            style={{ width: "100%", height: "230px", objectFit: "cover", display: "block" }}
          />
          <span style={{ ...tagStyle, background: "#ff2eb4", color: "#111" }}>HEADPHONES</span>
        </div>

      </div>
    </>
  );
};

export default Ecomm;