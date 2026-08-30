import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// ---------------------------------------------------------------------------
// "Field Notes" carousel — presented as pages from a naturalist's expedition
// journal. Each slide is a specimen: a photograph, a catalog number, a
// hand-set title, and an observation written in the field.
// ---------------------------------------------------------------------------

const SPECIMENS = [
  {
    image: "/images/bss_logo.webp",
    title: "Institute A",
    location: "Temperate Rainforest, 47°N",
    note: "Light arrives here in columns, not sheets. By the time it reaches the floor it has already been filtered twice — once by cloud, once by leaf.",
  },
  {
    image: "/images/hero_img.webp",
    title: "Institute B",
    location: "Alpine Zone, 3,400m",
    note: "Above the tree line, growth slows to a crawl and everything that survives has stopped wasting effort on height.",
  },
  {
    image: "/images/logo.webp",
    title: "Organization A",
    location: "Intertidal Flats, coastal survey site 6",
    note: "Twice a day this ground changes jurisdiction — sea to shore and back — and nothing living here has any say in the matter.",
  },
];

const AUTOPLAY_MS = 5500;

export default function ImageCarousel({ items = SPECIMENS }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const count = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const goTo = useCallback(
    (i) => {
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // autoplay
  useEffect(() => {
    if (!playing || reduceMotion) return;
    timerRef.current = setTimeout(() => next(), AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [playing, index, next, reduceMotion]);

  // keyboard
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  // touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const current = items[index];
  const tag = String(index + 1).padStart(2, "0");

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Field specimen carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      style={styles.wrap}
    >
      <style>{fontImport}</style>

      <div
        style={styles.frame}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* image track */}
        <div
          ref={trackRef}
          style={{
            ...styles.track,
            transform: `translateX(-${index * 100}%)`,
            transition: reduceMotion
              ? "none"
              : "transform 700ms cubic-bezier(.65,0,.35,1)",
          }}
        >
          {items.map((item, i) => (
            <div style={styles.slide} key={i} aria-hidden={i !== index}>
              <img
                src={item.image}
                alt={item.title}
                style={styles.image}
                draggable={false}
              />
              <div style={styles.vignette} />
            </div>
          ))}
        </div>

        {/* specimen tag, top-left */}
        <div style={styles.specimenTag}>
          <span style={styles.specimenNo}>No. {tag}</span>
          <span style={styles.specimenTotal}>
            ／{String(count).padStart(2, "0")}
          </span>
        </div>

        {/* arrows */}
        <button
          aria-label="Previous specimen"
          onClick={prev}
          style={{ ...styles.arrow, left: 16 }}
        >
          <ChevronLeft size={20} strokeWidth={2.25} />
        </button>
        <button
          aria-label="Next specimen"
          onClick={next}
          style={{ ...styles.arrow, right: 16 }}
        >
          <ChevronRight size={20} strokeWidth={2.25} />
        </button>

        {/* play / pause */}
        <button
          aria-label={playing ? "Pause autoplay" : "Resume autoplay"}
          onClick={() => setPlaying((p) => !p)}
          style={styles.playBtn}
        >
          {playing && !reduceMotion ? (
            <Pause size={14} strokeWidth={2} />
          ) : (
            <Play size={14} strokeWidth={2} />
          )}
        </button>

        {/* caption card */}
        <div style={styles.captionCard}>
          {/* <p style={styles.location}>{current.location}</p> */}
          <h3 style={styles.title}>{current.title}</h3>
          {/* <p style={styles.note}>{current.note}</p> */}
        </div>
      </div>

      {/* filmstrip ticks */}
      <div style={styles.ticks} role="tablist" aria-label="Choose specimen">
        {items.map((item, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to ${item.title}`}
            onClick={() => goTo(i)}
            style={{
              ...styles.tick,
              backgroundColor: i === index ? "#C9A227" : "rgba(31,46,35,0.18)",
              width: i === index ? 28 : 8,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const styles = {
  wrap: {
    width: "100%",
    margin: "0 auto",
    fontFamily: "'IBM Plex Mono', monospace",
    outline: "none",
  },
  frame: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    overflow: "hidden",
    borderRadius: 4,
    background: "#1F2E23",
    boxShadow:
      "0 1px 2px rgba(0,0,0,0.06), 0 12px 28px -12px rgba(31,46,35,0.45)",
  },
  track: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  slide: {
    position: "relative",
    minWidth: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(0deg, rgba(15,20,14,0.82) 0%, rgba(15,20,14,0.15) 42%, rgba(15,20,14,0) 62%)",
  },
  specimenTag: {
    position: "absolute",
    top: 16,
    left: 16,
    display: "flex",
    alignItems: "baseline",
    gap: 2,
    padding: "5px 10px",
    background: "rgba(237,230,214,0.92)",
    color: "#1F2E23",
    borderRadius: 2,
    fontSize: 12,
    letterSpacing: "0.06em",
  },
  specimenNo: {
    fontWeight: 600,
  },
  specimenTotal: {
    opacity: 0.55,
    fontSize: 11,
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid rgba(237,230,214,0.35)",
    background: "rgba(31,46,35,0.45)",
    backdropFilter: "blur(4px)",
    color: "#EDE6D6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 150ms ease, border-color 150ms ease",
  },
  playBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "1px solid rgba(237,230,214,0.35)",
    background: "rgba(31,46,35,0.45)",
    color: "#EDE6D6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  captionCard: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 18,
    color: "#EDE6D6",
    maxWidth: 560,
  },
  location: {
    margin: 0,
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#C9A227",
    fontWeight: 500,
  },
  title: {
    margin: "6px 0 8px",
    fontFamily: "'Fraunces', serif",
    fontWeight: 600,
    fontSize: "clamp(20px, 3.4vw, 30px)",
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
  },
  note: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.55,
    color: "rgba(237,230,214,0.82)",
  },
  ticks: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },
  tick: {
    height: 4,
    borderRadius: 2,
    border: "none",
    cursor: "pointer",
    transition: "width 250ms ease, background-color 250ms ease",
    padding: 0,
  },
};
