import { FunctionComponent, useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import "./CarouselSection.css";

/* ─── Data ─── */
const slides = [
  {
    id: 0,
    src: "/imagen1.jpeg",
    title: "Ángulo de Reposo",
    tags: ["Finesse Texturizado", "Minimalismo"],
  },
  {
    id: 1,
    src: "/imagen2.jpeg",
    title: "Loft Industrial",
    tags: ["Estilo urbano", "Texturas crudas"],
  },
  {
    id: 2,
    src: "/imagen3.jpeg",
    title: "Mirada al Bosque",
    tags: ["Arquitectura en madera", "Esencia Escandinava"],
  },
  {
    id: 3,
    src: "/imagen4.jpeg",
    title: "Calma Nórdica",
    tags: ["Tonos neutros", "Diseño funcional"],
  },
  {
    id: 4,
    src: "/imagen5.jpeg",
    title: "Luz de Atardecer",
    tags: ["Calidez natural", "Confort total"],
  },
];

const N = slides.length;
const mod = (n: number, m: number) => ((n % m) + m) % m;

/* ─── Pixel offsets ─── */
// Each card is 32% of a ~1150px container ≈ 368px, gap ~26px → side offset ~395px
const SIDE_X = 395;

/* ─── Per-card animate variant driven by offset ─── */
type Variant = "center" | "left" | "right" | "hiddenLeft" | "hiddenRight";

const EASE: [number,number,number,number] = [0.25, 0.46, 0.45, 0.94];
const DURATION = 0.58;

const cardVariants: Record<Variant, TargetAndTransition> = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px) brightness(1)",
    zIndex: 10,
    transition: { duration: DURATION, ease: EASE },
  },
  left: {
    x: -SIDE_X,
    scale: 0.88,
    opacity: 0.72,
    filter: "blur(1.5px) brightness(0.82)",
    zIndex: 5,
    transition: { duration: DURATION, ease: EASE },
  },
  right: {
    x: SIDE_X,
    scale: 0.88,
    opacity: 0.72,
    filter: "blur(1.5px) brightness(0.82)",
    zIndex: 5,
    transition: { duration: DURATION, ease: EASE },
  },
  hiddenLeft: {
    x: -SIDE_X * 2,
    scale: 0.76,
    opacity: 0,
    filter: "blur(6px) brightness(0.6)",
    zIndex: 1,
    transition: { duration: 0.42, ease: "easeIn" },
  },
  hiddenRight: {
    x: SIDE_X * 2,
    scale: 0.76,
    opacity: 0,
    filter: "blur(6px) brightness(0.6)",
    zIndex: 1,
    transition: { duration: 0.42, ease: "easeIn" },
  },
};

const getVariant = (offset: number): Variant => {
  if (offset === 0) return "center";
  if (offset === -1) return "left";
  if (offset === 1) return "right";
  if (offset <= -2) return "hiddenLeft";
  return "hiddenRight";
};

/* Normalize offset to [-2, +2] range */
const getOffset = (i: number, current: number): number => {
  let off = mod(i - current, N);
  if (off > N / 2) off -= N;
  return off;
};

/* ─── Component ─── */
const CarouselSection: FunctionComponent = () => {
  const [current, setCurrent] = useState(0);
  const busy = useRef(false);

  const goTo = useCallback((next: number) => {
    if (busy.current) return;
    busy.current = true;
    setCurrent(mod(next, N));
    setTimeout(() => { busy.current = false; }, 650);
  }, []);

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  /* Autoplay */
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(timer);
  }, [next]);

  /* Drag */
  const dragStart = useRef(0);
  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - dragStart.current;
    if (dx < -55) next();
    else if (dx > 55) prev();
  };

  return (
    <section className="carousel-section">
      {/* ── Header ── */}
      <motion.div
        className="carousel-header"
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Row: eyebrow (left) + arrows (right) */}
        <div className="carousel-header-top">
          <div className="carousel-header-left">
            <span className="carousel-dot">•</span>
            <span className="carousel-eyebrow">Proyectos destacados</span>
          </div>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prev} aria-label="Anterior">←</button>
            <button className="carousel-btn" onClick={next} aria-label="Siguiente">→</button>
          </div>
        </div>

        {/* Title centered below on desktop, full-width on mobile */}
        <div className="carousel-header-center">
          <h2 className="carousel-title">Inspiraciones para tu hogar</h2>
        </div>
      </motion.div>

      {/* ── Desktop Track ── */}
      <div
        className="carousel-track"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {slides.map((slide) => {
          const offset = getOffset(slide.id, current);
          const variant = getVariant(offset);

          return (
            <motion.div
              key={slide.id}
              className="carousel-card"
              animate={variant}
              variants={cardVariants}
              initial={false}
            >
              <div className="carousel-card-inner">
                <img
                  className="carousel-img"
                  src={slide.src}
                  alt={slide.title}
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Info (always shows active slide's data) ── */}
      <div className="carousel-info-row">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="carousel-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
          >
            <p className="carousel-card-title">{slides[current].title}</p>
            <div className="carousel-tags">
              {slides[current].tags.map((t) => (
                <span key={t} className="carousel-tag">{t}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot indicators ── */}
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot-btn ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Mobile (single card swipeable) ── */}
      <div className="carousel-mobile">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            className="carousel-mobile-card"
            initial={{ opacity: 0, x: 80, scale: 0.93 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.93 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <img
              className="carousel-img"
              src={slides[current].src}
              alt={slides[current].title}
              draggable={false}
            />
            <div className="carousel-info">
              <p className="carousel-card-title">{slides[current].title}</p>
              <div className="carousel-tags">
                {slides[current].tags.map((t) => (
                  <span key={t} className="carousel-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CarouselSection;
