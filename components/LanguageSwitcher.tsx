"use client";

import Image from "next/image";
import { useLanguage } from "../app/language-context";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div style={{ 
      position: "absolute",
      top: 20, 
      right: 30,
      display: "flex", 
      gap: 12,
      zIndex: 1000, 
      }}>
      
      <Image
        src="/de.svg"
        alt="Deutsch"
        width={32}
        height={24}
        onClick={() => setLang("de")}
        style={{
          cursor: "pointer",
          opacity: lang === "de" ? 1 : 0.5,
          transition: "0.2s",
        }}
      />

      <Image
        src="/gb.svg"
        alt="English"
        width={32}
        height={24}
        onClick={() => setLang("en")}
        style={{
          cursor: "pointer",
          opacity: lang === "en" ? 1 : 0.5,
          transition: "0.2s",
        }}
      />

    </div>
  );
}
