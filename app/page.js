"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/playlist", { cache: "no-store" });
        const data = await res.json();
        setTracks(data.tracks || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const playIndex = (i) => {
    if (!tracks.length) return;
    const idx = ((i % tracks.length) + tracks.length) % tracks.length;
    setCurrent(idx);
  };

  const next = () => {
    if (!tracks.length) return;
    if (shuffle) {
      let r = Math.floor(Math.random() * tracks.length);
      if (r === current && tracks.length > 1) r = (r + 1) % tracks.length;
      setCurrent(r);
    } else {
      setCurrent((p) => (p + 1) % tracks.length);
    }
  };

  const prev = () => {
    if (!tracks.length) return;
    setCurrent((p) => (p - 1 + tracks.length) % tracks.length);
  };

  const onEnded = () => {
    if (repeat) {
      audioRef.current?.play?.();
    } else {
      next();
    }
  };

  useEffect(() => {
    audioRef.current?.play?.().catch(() => {});
  }, [current]);

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>🎶 Моё онлайн-радио</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        Клади .mp3 в <code>/public/music</code> — они появятся здесь автоматически.
      </p>

      {loading && <p>Загрузка плейлиста…</p>}
      {!loading && tracks.length === 0 && (
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
          <p>Нет треков. Добавь файлы в <code>/public/music</code> и перезагрузи страницу.</p>
        </div>
      )}

      {tracks.length > 0 && (
        <>
          <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>
              Сейчас играет: <strong>{tracks[current]?.title}</strong>
            </div>
            <audio
              ref={audioRef}
              src={tracks[current]?.url}
              controls
              autoPlay
              onEnded={onEnded}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <button onClick={prev}>⏮ Предыдущий</button>
              <button onClick={() => audioRef.current?.play?.()}>▶️ Пуск</button>
              <button onClick={() => audioRef.current?.pause?.()}>⏸ Пауза</button>
              <button onClick={next}>⏭ Следующий</button>
              <button
                onClick={() => setShuffle((v) => !v)}
                style={{ background: shuffle ? "#e5f6ff" : undefined }}
                title="Случайный порядок"
              >
                🔀 Shuffle {shuffle ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setRepeat((v) => !v)}
                style={{ background: repeat ? "#e5ffe6" : undefined }}
                title="Повтор текущего"
              >
                🔁 Repeat {repeat ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          <div style={{ border: "1px solid #eee", borderRadius: 12 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee", fontWeight: 600 }}>
              Плейлист ({tracks.length})
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {tracks.map((t, i) => (
                <li
                  key={t.url}
                  onClick={() => playIndex(i)}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    background: i === current ? "#f5f5f5" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    borderTop: i === 0 ? "none" : "1px solid #f1f1f1",
                  }}
                >
                  <span style={{ width: 22, textAlign: "center" }}>{i === current ? "▶" : i + 1}</span>
                  <span>{t.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <style jsx global>{`
        button {
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: #fff;
          cursor: pointer;
        }
        button:hover { background: #f7f7f7; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 6px; }
      `}</style>
    </main>
  );
}
