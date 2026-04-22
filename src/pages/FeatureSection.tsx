import { FunctionComponent } from "react";
import { motion, Variants } from "framer-motion";
import "./FeatureSection.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: "/leaf.svg",
    title: "Suavidad",
    desc: "Manejamos dos niveles de suavidad para tu comodidad",
  },
  {
    icon: "/tools.svg",
    title: "Personalización",
    desc: "Cada sofá es único adaptando sus acabados, medidas y materiales.",
  },
  {
    icon: "/handyman.svg",
    title: "Construcción",
    desc: "Diseñados con materiales sostenibles garantizando durabilidad y calidad",
  },
  {
    icon: "/leaf.svg",
    title: "Suavidad",
    desc: "Manejamos dos niveles de suavidad para tu comodidad",
  },
];

const FeatureSection: FunctionComponent = () => {
  return (
    <section className="feature-section">
      {/* ── Header ── */}
      <div className="feature-header">
        <motion.p
          className="feature-eyebrow"
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Hecho con <strong>propósito</strong>
        </motion.p>
        <motion.h2
          className="feature-title"
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.12}
        >
          Diseñado para impactar
        </motion.h2>
        <motion.p
          className="feature-subtitle"
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.24}
        >
          Sofá lutton posee la mejor combinación entre comodidad,
          <br className="feature-br" /> estética y tecnología
        </motion.p>
      </div>

      {/* ── Body ── */}
      <div className="feature-body">
        {/* Left — sofa diagram */}
        <motion.div
          className="feature-diagram-wrap"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          <img
            className="feature-diagram-img"
            src="/partes_sofa.png"
            alt="Partes del sofá Lutton"
          />
        </motion.div>

        {/* Right — 2×2 grid */}
        <div className="feature-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15 + i * 0.1}
            >
              <img className="feature-icon" src={f.icon} alt={f.title} />
              <h3 className="feature-card-title">{f.title}</h3>
              <p className="feature-card-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
