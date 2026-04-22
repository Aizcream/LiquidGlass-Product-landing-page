import { FunctionComponent } from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./TextileSection.css";

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
});

const blurIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: "easeOut" },
  },
});

const features = [
  {
    title: "Tecnología Antifluidos",
    desc: "Protección invisible contra derrames accidentales.",
  },
  {
    title: "Resistencia Antirasguños",
    desc: "Tejido reforzado ideal para hogares con mascotas.",
  },
  {
    title: "Limpieza inteligente",
    desc: "Mantenimiento sin esfuerzo, solo con un paño húmedo.",
  },
];

const TextileSection: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <section className="textile-section">
      <div className="textile-inner">
        {/* ── Left column ── */}
        <div className="textile-content">
          {/* Tag pill */}
          <motion.div
            className="textile-tag"
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Tecnología textil
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="textile-heading"
            variants={blurIn(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Innovación Textil
            <br />
            <strong>Tejido de alto rendimiento</strong>
          </motion.h2>

          {/* Feature list */}
          <ul className="textile-list">
            {features.map((f, i) => (
              <motion.li
                key={i}
                className="textile-list-item"
                variants={fadeUp(0.2 + i * 0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="textile-item-title">{f.title}</span>
                <span className="textile-item-desc">{f.desc}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            className="textile-cta"
            variants={fadeUp(0.58)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/product')}
          >
            Personalizar Ahora&nbsp;&nbsp;→
          </motion.button>
        </div>

        {/* ── Right column — macro photo ── */}
        <motion.div
          className="textile-image-wrap"
          variants={fadeUp(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            className="textile-image"
            src="/macro.png"
            alt="Tejido de alto rendimiento del Sofá Lutton"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TextileSection;
