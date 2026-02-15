"use client";
import Image from "next/image";
import { useLanguage } from "./language-context";
import LanguageSwitcher from "../components/LanguageSwitcher";
  
export default function HomePage() {
  const{ lang, setLang, t } = useLanguage();
  
  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1503264116251-35a269479413",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  ];

  const stickers = ["😍", "✨", "❤️", "🌈", "📸", "🎉"];

  return (
    <><LanguageSwitcher/>
    <main style={{ textAlign: "center",
        minHeight: "100vh",
        padding: "20px 20px",
        background:
          "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a1c4fd 60%, #c2e9fb 100%)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
   > 
      {/* HERO */}
      <section style={{ textAlign: "center", marginTop: 1, marginBottom: 60 }}>
      <Image
        src="/logo.png"
        alt="PYXLY Logo"
        width={150}
        height={150}
        priority
        style={{marginBottom: 10,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
        }}
      />
        <h1 style={{ fontSize: 52, fontWeight: 800, marginBottom: 1 }}>
          {t.heroTitle} 🎨📸
        </h1>
        <p style={{ fontSize: 32, maxWidth: 700, margin: "0 auto" }}>
          {t.heroSubtitle}
        </p>

        <a
          href="/editor"
          style={{
            display: "inline-block",
            marginTop: 10,
            padding: "16px 36px",
            background: "#000000",
            color: "#fff",
            borderRadius: 999,
            fontSize: 18,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {t.cta} ✨
        </a>
      </section>

      {/* COLLAGE */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 22,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            {/* STICKER (erste einfache Version) */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                fontSize: 28,
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              {stickers[i % stickers.length]}
            </div>

            {/* IMAGE mit Hover-Zoom */}
            <img
              src={`${src}?auto=format&fit=crop&w=600&q=80`}
              alt="Foto Collage"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.35s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section
        style={{
          marginTop: 90,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 🔥 immer 3 pro Reihe
          gap: 32,
          maxWidth: 1200,
          marginInline: "auto",
          textAlign: "center",
        }}
      >
        {[
          ["📷", t.upload],
          ["😍", t.emojis],
          ["🎨", t.filters],
          ["✍️", t.texts],
          ["💌", t.postcards],
          ["🖨️", t.download],
        ].map(([icon, text]) => (
          <div
            key={text}
            style={{
              background: "#ffecd2",
              borderRadius: 28,
              padding: "36px 20px",
              fontSize: 22,
              fontWeight: 700,
              color: "#6a3df0", // 💜 violette Schrift
              boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 26px 60px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 18px 40px rgba(0,0,0,0.15)";
            }}
          >
            <div style={{ fontSize: 54, marginBottom: 14 }}>{icon}</div>
            {text}
          </div>
        ))}
      </section>
    </main>
    </>
  );
}