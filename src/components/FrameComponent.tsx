import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LeadModal from "./LeadModal";
import "./FrameComponent.css";

export type FrameComponentType = {
  className?: string;
  theme?: "light" | "dark";
};

const links = ["Productos", "Espacios", "Showroom"];

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  theme = "light",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className={`navbar ${theme === "dark" ? "navbar--dark" : ""} ${className}`}>
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img
              className="navbar-logo-img"
              loading="lazy"
              alt="LaFab"
              src="/lafab-blanco-2@2x.png"
            />
          </Link>
        </div>

        {/* Nav links — hidden on mobile */}
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="navbar-link">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button — hidden on mobile */}
        <button
          className="navbar-cta navbar-cta--desktop"
          onClick={() => setModalOpen(true)}
        >
          <span className="navbar-cta-text">Hablar con nosotros</span>
          <span className="navbar-cta-arrow-wrap" aria-hidden>
            <motion.span
              className="navbar-cta-arrow"
              animate={{ y: [0, -22, -22, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 1.4,
                times: [0, 0.35, 0.36, 1],
                ease: ["easeIn", "linear", "easeOut", "easeOut"],
              }}
            >
              ↗
            </motion.span>
            <motion.span
              className="navbar-cta-arrow navbar-cta-arrow--ghost"
              aria-hidden
              animate={{ y: [22, 0, 0, 22] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 1.4,
                times: [0, 0.35, 0.65, 1],
                ease: ["easeOut", "linear", "easeIn", "linear"],
              }}
            >
              ↗
            </motion.span>
          </span>
        </button>

        {/* Hamburger — visible on mobile only */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <motion.span
            className="hamburger-line"
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="hamburger-line"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="hamburger-line"
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mobile-menu-links">
              {links.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <a
                    href="#"
                    className="mobile-menu-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu-divider" />
            <button
              className="mobile-menu-cta"
              onClick={() => { setMenuOpen(false); setModalOpen(true); }}
            >
              Hablar con nosotros ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default FrameComponent;
