import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import "./FooterSection.css";

const legalLinks = [
  "Términos y condiciones de uso",
  "Política de tratamiento de datos personales",
];

const exploreLinks = [
  "Nosotros",
  "Compra por Espacio",
  "Solicitar Catálogo",
  "Proyectos",
  "Escríbenos",
];

const serviceLinks = [
  "Reservar una cita de Diseño",
  "Diseño de Interiores",
  "Preguntas Frecuentes",
  "Póliza de Garantía",
];

const contactInfo = {
  companyName: "INVERSIONES CORREA RUA S.A.S.",
  nit: "NIT 901606662-6",
  email: "info@lafab.com.co",
  phones: ["(305) 460 2395", "(305) 329 8641"],
  address: "Cl. 64 #44 74 Barrio la Esmeralda, Itagüí, Antioquia",
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
});

const FooterSection: FunctionComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* ── Column 1: Legal + Showrooms ── */}
        <motion.div
          className="footer-col"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="footer-heading">Información Legal</h4>
          <ul className="footer-list">
            {legalLinks.map((l) => (
              <li key={l}>
                <a href="#" className="footer-link">
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <h4 className="footer-heading footer-heading--spaced">Showrooms</h4>
          <ul className="footer-list">
            <li>
              <a href="#" className="footer-link">
                Itagüí
              </a>
            </li>
          </ul>
        </motion.div>

        {/* ── Column 2: Explora ── */}
        <motion.div
          className="footer-col"
          variants={fadeUp(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="footer-heading">Explora</h4>
          <ul className="footer-list">
            {exploreLinks.map((l) => (
              <li key={l}>
                <a href="#" className="footer-link">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Column 3: Servicios ── */}
        <motion.div
          className="footer-col"
          variants={fadeUp(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="footer-heading">Servicios</h4>
          <ul className="footer-list">
            {serviceLinks.map((l) => (
              <li key={l}>
                <a href="#" className="footer-link">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Column 4: Contáctanos ── */}
        <motion.div
          className="footer-col"
          variants={fadeUp(0.24)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4 className="footer-heading">Contáctanos</h4>

          <div className="footer-contact">
            {/* Company */}
            <div className="footer-contact-item">
              <span className="footer-contact-icon">🏢</span>
              <div>
                <p className="footer-contact-label">Razón social</p>
                <p className="footer-contact-value">
                  {contactInfo.companyName}
                </p>
                <p className="footer-contact-value footer-contact-value--muted">
                  {contactInfo.nit}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉</span>
              <a href={`mailto:${contactInfo.email}`} className="footer-link">
                {contactInfo.email}
              </a>
            </div>

            {/* Phones */}
            {contactInfo.phones.map((p) => (
              <div key={p} className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a href={`tel:${p}`} className="footer-link">
                  {p}
                </a>
              </div>
            ))}

            {/* Address */}
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <p className="footer-contact-value">{contactInfo.address}</p>
            </div>

            {/* Social */}
            <div className="footer-socials">
              <a
                href="https://www.facebook.com/LaFabricaMed"
                className="footer-social-btn"
                aria-label="Facebook"
                target="_blank"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lafabricamed/"
                className="footer-social-btn"
                aria-label="Instagram"
                target="_blank"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <p className="footer-copy">
          © 2025 LaFab · Todos los derechos reservados.
        </p>
        <div className="footer-bottom-right">
          <img
            src="/lafab-blanco-2@2x.png"
            alt="LaFab"
            className="footer-logo"
          />
          <span className="footer-bottom-divider" />
          <div className="footer-superintendencia">
            <p className="footer-sup-text">Industria y Comercio</p>
            <p className="footer-sup-sub">SUPERINTENDENCIA</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
