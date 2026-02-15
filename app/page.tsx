"use client";
import Image from "next/image";
import { useLanguage } from "./language-context";
import LanguageSwitcher from "../components/LanguageSwitcher";
  
export default function HomePage() {
  const{ lang, setLang, t } = useLanguage();
  
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/9.jpg",
    "/images/10.jpg",
    "/images/11.jpg",
    "/images/12.jpg",
    "/images/13.jpg",
    "/images/14.jpg",
    "/images/15.jpg",
    "/images/16.jpg",
    "/images/17.jpg",
    "/images/18.jpg",
    "/images/19.jpg",
    "/images/20.jpg",
    "/images/21.jpg",
    "/images/22.jpg",
    "/images/23.jpg",
    "/images/24.jpg",
    "/images/25.jpg",
    "/images/26.jpg",
    "/images/27.jpg",
    "/images/28.jpg",
    "/images/29.jpg",
    "/images/30.jpg",
    "/images/31.jpg",
    "/images/32.jpg",
    "/images/33.jpg",
    "/images/34.jpg",
    "/images/35.jpg",
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