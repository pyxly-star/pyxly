'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'; 
import { useLanguage } from "../language-context";

/* =========================================================
   TYPES & DATEN
   ========================================================= */
type TextLayer = {
  id: number;
  text: string;
  x: number; // 0–1
  y: number; // 0–1
  size: number;
  color: string;
  font: string;
  touched: boolean;
  //rotation: number; 1
};

const DEFAULT_TEXT = ':)';


const FONTS = [
  'Arial',
  'Arial Black',
  'Comic Sans MS',
  'Courier New',
  'DM Sans',
  'Fira Sans',
  'Garamond',
  'Georgia',
  'Helvetica',
  'Impact',
  'Inter',
  'JetBrains Mono',
  'Lato',
  'Lucida Console',
  'Manrope',
  'Merriweather',
  'Monaco',
  'Montserrat',
  'Nunito',
  'Open Sans',
  'Oswald',
  'Palatino',
  'Playfair Display',
  'Poppins',
  'Quicksand',
  'Raleway',
  'Roboto',
  'Rubik',
  'Source Sans Pro',
  'Space Grotesk',
  'system-ui',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Ubuntu',
  'Verdana',
  'Work Sans',
  
].sort((a, b) => a.localeCompare(b));


const EMOJIS = Array.from(
  '😀😁😂🤣😃😄😉😊😍😘🥰😎🤩🔥✨⭐🌈🎉🎈❤️👍👏'.repeat(3)
);

const STICKER_PACKS = {
  Emojis: [
    '/stickers/emojis/smile.png',
    '/stickers/emojis/laugh.png',
    '/stickers/emojis/cry.png',
  ],
  Hearts: [
    '/stickers/hearts/heart1.png',
    '/stickers/hearts/heart2.png',
  ],
  Shapes: [
    '/stickers/shapes/circle.png',
    '/stickers/shapes/star.png',
    '/stickers/shapes/arrow.png',
  ],
  Doodles: [
    '/stickers/doodles/lightning.png',
    '/stickers/doodles/crown.png',
    '/stickers/doodles/fire.png',
  ],
};

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(line);

  lines.forEach((lineText, i) => {
    ctx.fillText(lineText, x, y + i * lineHeight);
  });
}


/* =========================================================
   COMPONENT
   ========================================================= */
export default function Editor() {
  const { t } = useLanguage();
  
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [layers, setLayers] = useState<TextLayer[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const exportImage = () => {
  }
  const dragging = useRef(false);
  const resizing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const active = layers.find(l => l.id === activeId);
  const rotation = useRef(false);
  const rotationStart = useRef({angle: 0, start: 0});

  /* =========================================================
     EFFECTS
     ========================================================= */
  useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (
      emojiRef.current &&
      !emojiRef.current.contains(e.target as Node)
    ) {
      setShowEmojis(false);
    }
  }

  if (showEmojis) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showEmojis]);
  
     useEffect(() => {
    const close = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmojis(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  /* =========================================================
     IMAGE
     ========================================================= */
  const loadImage = (src: string) => {
    const img = new Image();
    img.onload = () => setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = src;
  };

  /* =========================================================
     FRAME SIZE (Hochformat = volle Breite)
     ========================================================= */
  const frameSize = (() => {
    if (!imgSize) return { w: 360, h: 360 };

    const maxWidth = 520;
    const ratio = imgSize.w / imgSize.h;

    // Hochformat → volle Breite, Höhe skaliert
    if (ratio < 1) {
      return {
        w: maxWidth,
        h: maxWidth / ratio,
      };
    }

    // Querformat / Quadrat
    return {
      w: maxWidth,
      h: maxWidth / ratio,
    };
  })();

  /* =========================================================
     TEXT
     ========================================================= */
  const addText = () => {
    const id = Date.now();
    setLayers(l => [
      ...l,
      {
        id,
        text: DEFAULT_TEXT,
        x: 0.5,
        y: 0.2,
        size: 32,
        color: '#03cd5e',
        font: FONTS[0],
        touched: false,
        rotation: 0,
      },
    ]);
    setActiveId(id);
  };

  const clearIfDefault = (id: number) => {
    setLayers(ls =>
      ls.map(l =>
        l.id === id && !l.touched
          ? { ...l, text: '', touched: true }
          : l
      )
    );
  };
const deleteActiveText = () => {
  if (activeId === null) return;

  setLayers(ls => ls.filter(l => l.id !== activeId));
  setActiveId(null);
};


  /* =========================================================
     DRAG / RESIZE
     ========================================================= */
  
  
  
     const startDrag = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    dragging.current = true;
    setActiveId(id);
    last.current = { x: e.clientX, y: e.clientY };
  };

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    resizing.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const move = (e: React.MouseEvent) => {
    if (!activeId) return;

    const dx = (e.clientX - last.current.x) / frameSize.w;
    const dy = (e.clientY - last.current.y) / frameSize.h;
    last.current = { x: e.clientX, y: e.clientY };

    setLayers(ls =>
      ls.map(l => {
        if (l.id !== activeId) return l;

        if (dragging.current) {
          return {
            ...l,
            x: Math.max(0, Math.min(1, l.x + dx)),
            y: Math.max(0, Math.min(1, l.y + dy)),
          };
        }

        if (resizing.current) {
          return {
            ...l,
            size: Math.max(12, l.size + dx * 120),
          };
        }

        return l;
      })
    );
  };

  const stop = () => {
    dragging.current = false;
    resizing.current = false;
  };

  /* =========================================================
     SAVE – IMMER NACH SPEICHERORT FRAGEN
     ========================================================= */
  const saveImage = async () => {
    if (!image || !imgSize) return;

    const canvas = document.createElement('canvas');
    canvas.width = imgSize.w;
    canvas.height = imgSize.h;
    const ctx = canvas.getContext('2d')!;

    const baseImg = new Image();
    baseImg.src = image;
    await new Promise(res => (baseImg.onload = res));
    ctx.drawImage(baseImg, 0, 0);

    const scaleX = imgSize.w / frameSize.w;
    const scaleY = imgSize.h / frameSize.h;

  layers.forEach(l => {
  const fontSize = l.size * scaleX;

  ctx.font = `${fontSize}px ${l.font}`;
  ctx.fillStyle = l.color;
  ctx.textBaseline = "top";

  const startX = l.x * imgSize.w;
  const startY = l.y * imgSize.h;

  const padding = 20;
  const maxWidth = imgSize.w - startX - padding;

  const lineHeight = fontSize * 1.2;

  const words = l.text.split(" ");
  let line = "";
  let y = startY;

  words.forEach((word, i) => {
    const testLine = line + word + " ";
    const { width } = ctx.measureText(testLine);

    if (width > maxWidth && i > 0) {
      ctx.fillText(line, startX, y);
      line = word + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  });

  // letzte Zeile zeichnen
  ctx.fillText(line, startX, y);
});


    const blob = await new Promise<Blob>(res =>
      canvas.toBlob(b => res(b!), 'image/png')
    );

    // File Picker (modern)
    if ('showSaveFilePicker' in window) {
      // @ts-ignore
      const handle = await window.showSaveFilePicker({
        suggestedName: 'pyxly.png',
        types: [{ description: 'PNG', accept: { 'image/png': ['.png'] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } else {
      // Fallback
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'pyxly.png';
      a.click();
    }
  };

  /* =========================================================
     RENDER
     ========================================================= */
  return (
    <main
      onMouseMove={move}
      onMouseUp={stop}
      onMouseLeave={stop}
      style={{
        minHeight: '190vh',
        padding: 0,
        fontFamily: 'system-ui, -apple-system',
      }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center', padding: '5px 20px',borderRadius:16, marginBottom: 10, background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a1c4fd 60%, #c2e9fb 100%)" }}>
        <button style={btnSmall} onClick={() => router.push('/')}>🏠   Home</button>
        <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 38,
        color: '#f136eb',
        fontWeight: 700,
        background: 'transparent',
        border: 'none',
        cursor: 'default'
      }}
    >
      <span>PYXLY</span>

      {/* 🆕 LOGO IN DER MITTE */}
      <img
        src="/logo.png"
        alt="Logo"
        width={150}
        height={150}
        style={{background:'"linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a1c4fd 60%, #c2e9fb 100%)"'}}
      
      /><span>{t.editorTitle}</span>
    </button>

        <button style={btnSmall} onClick={saveImage}>💾 {t.save} </button>

      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 5 }}>
        {/* SIDEBAR */}
        <aside style={panel}>
          <button style={btnSmall} onClick={addText}>➕ {t.text}</button>

         {active && (
    <>
                    <input
                      value={active.text}
                      style={inputStyle}
                      onFocus={() => clearIfDefault(active.id)}
                      onChange={e =>
                        setLayers(ls =>
                          ls.map(l =>
                            l.id === activeId ? { ...l, text: e.target.value } : l
                          )
                        )
                      }
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 14 ,minWidth: 80, fontWeight: 600 }}>
                        {t.characters}:
                      </span>

                      <select
                        value={active.font}
                        onChange={e =>
                          setLayers(ls =>
                            ls.map(l =>
                              l.id === activeId
                                ? { ...l, font: e.target.value }
                                : l
                            )
                          )
                        }
                      >
                        {FONTS.map(f => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 14 ,minWidth: 80, fontWeight: 600 }}>
                        {t.colour}:
                      </span>

                      <input
                        type="color"
                        value={active.color}
                        onChange={e =>
                          setLayers(ls =>
                            ls.map(l =>
                              l.id === activeId
                                ? { ...l, color: e.target.value }
                                : l
                            )
                          )
                        }
                      />
                    </div>

                    <label style={{ fontSize: 14 ,minWidth: 80, fontWeight: 600 }}>
                {t.size}: <strong>{active.size}px</strong>
              
              </label>
              <input
                type="range"
                min={10}
                max={200}
                step={10}
                value={active.size}
                onChange={e =>
                  setLayers(ls =>
                    ls.map(l =>
                      l.id === activeId
                        ? { ...l, size: Number(e.target.value) }
                        : l
                    )
                  )
                }
              />
              
              {/* EMOJIS */}
              <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                <button style={btnSmall} onClick={() => setShowEmojis(v => !v)}>
                  😊 Emojis
                </button>
                <button
                onClick={deleteActiveText}
                style={{
                  ...btnSmall,
                  background: '#ef4444',
                  marginTop: 20,
                }}
              >
                🗑 {t.deleteText}
              </button>
                  


                {showEmojis && (
                  <div ref={emojiRef} style={emojiDropdown}>
                      <EmojiPicker
                      emojiStyle={EmojiStyle.APPLE} // 🍎 schöne Apple Emojis
                      //EmojiStyle.APPLE     // 🍎 Apple (sehr clean)
                      //EmojiStyle.TWITTER   // 🐦 Twitter/X (flat & modern)
                      //EmojiStyle.GOOGLE    // 🟢 Google
                      //EmojiStyle.FACEBOOK  // 🔵 Facebook
                      
                      onEmojiClick={(emojiData) => {
                        setLayers(ls =>
                          ls.map(l =>
                            l.id === activeId
                              ? { ...l, text: l.text + emojiData.emoji }
                              : l
                          )
                        );
                        //setShowEmojis(false);
                      }}
                      width="100%"
                      height={520}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </aside>
        
        {/* PREVIEW */}
        <section style={preview}>
          <button style={btnSmall} onClick={() => fileInputRef.current?.click()}>
            📸 {t.upload}
          </button>

          {image && (
            <div
              style={{
                position: 'relative',
                width: frameSize.w,
                height: frameSize.h,
                margin: '16px auto',
              }}
            >
              <img
                src={image}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain', // ✅ Hochformat → volle Breite
                  display: 'block',
                }}
              />

              {layers.map(l => (
                <div
                  key={l.id}
                  onMouseDown={e => startDrag(e, l.id)}
                  style={{
                    position: 'absolute',
                    left: `${l.x * 100}%`,
                    top: `${l.y * 100}%`,
                    fontSize: l.size,
                    fontFamily: l.font,
                    fontWeight: 600,
                    color: l.color,
                    textShadow: '0 1px 2px rgba(250, 209, 183, 0.25)',
                    cursor: 'grab',
                  }}
                >
                  {l.text}
                  {activeId === l.id && (
                    <div
                      onMouseDown={startResize}
                      style={{
                        width: 10,
                        height: 10,
                        background: '#0a0006',
                        position: 'absolute',
                        right: -6,
                        bottom: -6,
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={e => {
          const f = e.target.files?.[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = () => {
            setImage(r.result as string);
            loadImage(r.result as string);
          };
          r.readAsDataURL(f);
        }}
      />
    </main>
  );
}

/* =========================================================
   STYLES
   ========================================================= */
const panel: React.CSSProperties = {
  background: 'transparent',
  borderRadius: 18,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  color:'#111827'   //die Farbe der Schrift in dem Dropdown
};

const preview: React.CSSProperties = {
  background: 'transparent',
  borderRadius: 18,
  padding: 16,
};

const btnSmall: React.CSSProperties = {
  height: 42,
  padding: '0 14px',
  borderRadius: 10,
  border: 'none',
  background: '#6366f1',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
};

const emojiDropdown: React.CSSProperties = {
  position: 'absolute',
  top: '110%',
  left: 0,
  background: '#fff',
  padding: 8,
  borderRadius: 12,
  boxShadow: '0 20px 40px rgba(0,0,0,.15)',
  zIndex: 20,
};

const emojiBtn: React.CSSProperties = {
  fontSize: 20,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid #d1d5db',
  fontSize: 16,
  color: '#030a19',          // ✅ TEXTFARBE (dunkel)
  background: '#ffffff',     // ✅ Kontrast zum Panel
  outline: 'none',
};

