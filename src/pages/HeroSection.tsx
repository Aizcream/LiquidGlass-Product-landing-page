import { FunctionComponent, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

/* ─── Animation variants ─── */
const bgVariants: Variants = {
  initial: { scale: 1.18, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const navVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
  },
};

const titleContainerVariants: Variants = {
  animate: { transition: { staggerChildren: 0.14, delayChildren: 0.9 } },
};

const wordVariants: Variants = {
  initial: { opacity: 0, filter: "blur(12px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const subtitleVariants: Variants = {
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 1.6, ease: "easeOut" },
  },
};

const badgeVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: "easeOut" },
  }),
};

const btnVariants: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: d,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const AnimatedTitle = ({ text }: { text: string }) => (
  <motion.h1
    className="hero-title"
    variants={titleContainerVariants}
    initial="initial"
    animate="animate"
  >
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={wordVariants} className="hero-title-word">
        {word}
      </motion.span>
    ))}
  </motion.h1>
);

/* ─── Component ─── */
const HeroSection: FunctionComponent = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  // Scale from 1 → 0.82 as user scrolls the hero height
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);

  return (
    <motion.section className="hero" ref={sectionRef} style={{ scale }}>
      {/* Full‑bleed background */}
      <motion.img
        className="hero-bg"
        src="/Rectangle-1@2x.png"
        alt=""
        variants={bgVariants}
        initial="initial"
        animate="animate"
      />

      {/* Frost gradient overlay */}
      <div className="hero-frost" />

      {/* Max-width content wrapper */}
      <div className="hero-inner">
        {/* Placeholder to keep flex-between layout at bottom */}
        <div className="hero-nav" />

        {/* Bottom content */}
        <div className="hero-bottom">
          {/* Badges */}
          <div className="hero-badges">
            <motion.div
              className="hero-badge"
              custom={1.0}
              variants={badgeVariants}
              initial="initial"
              animate="animate"
            >
              <img src="/Group-13.svg" alt="" className="hero-badge-icon" />
              <span>Base de madera de roble</span>
            </motion.div>

            <motion.div
              className="hero-badge"
              custom={1.12}
              variants={badgeVariants}
              initial="initial"
              animate="animate"
            >
              <img
                src="/Warranty-Icon.svg"
                alt=""
                className="hero-badge-icon"
              />
              <span>Garantía de 3 años</span>
            </motion.div>
          </div>

          {/* Title + subtitle */}
          <AnimatedTitle text="Sofá Lutton" />

          <motion.p
            className="hero-subtitle"
            variants={subtitleVariants}
            initial="initial"
            animate="animate"
          >
            Sofá de alta gama diseñado para ofrecer un nivel superior de
            <br className="hero-br" />
            confort y presencia estética en espacios residenciales.
          </motion.p>

          {/* CTAs */}
          <div className="hero-ctas">
            <motion.button
              className="hero-btn hero-btn--primary"
              onClick={() => navigate("/product")}
              custom={1.5}
              variants={btnVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Comprar Ahora&nbsp;
              <img src="/Frame.svg" alt="" className="hero-btn-icon" />
            </motion.button>

            <motion.a
              className="hero-btn hero-btn--ghost"
              href="https://calendly.com/lafab-info"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
              custom={1.65}
              variants={btnVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Agenda una cita&nbsp;
              <img src="/Frame1.svg" alt="" className="hero-btn-icon" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
