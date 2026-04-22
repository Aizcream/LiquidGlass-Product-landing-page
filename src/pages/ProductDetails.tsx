import { FunctionComponent, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import FooterSection from "./FooterSection";
import "./ProductDetails.css";

const titleContainerVariants: Variants = {
  animate: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const wordVariants: Variants = {
  initial: { opacity: 0, filter: "blur(12px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const AnimatedTitle = ({ text }: { text: string }) => (
  <motion.h1
    className="product-title"
    variants={titleContainerVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
  >
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={wordVariants} style={{ display: "inline-block", marginRight: "0.25em" }}>
        {word}
      </motion.span>
    ))}
  </motion.h1>
);

const gallery = [
  "/Rectangle-1@2x.png",
  "/imagen1.jpeg",
  "/partes_sofa.png",
  "/macro.png",
];

const ProductDetails: FunctionComponent = () => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [width, setWidth] = useState<string | null>(null);
  const [softness, setSoftness] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  // Premium color palette for the sofa
  const sofaColors = [
    { name: "Beige Arena", hex: "#e3dbcb" },
    { name: "Gris Ceniza", hex: "#dcdcd9" },
    { name: "Verde Sage", hex: "#9ba691" },
    { name: "Azul Denim", hex: "#425563" },
    { name: "Negro Obsidiana", hex: "#2b2b2b" },
  ];

  // Pricing Logic
  const basePrice = 3400000;
  const regularPrice = 4300000;
  const extraSoftnessCost = softness === "Extra suave" ? 180000 : 0;
  const currentPrice = basePrice + extraSoftnessCost;

  const handleBuy = () => {
    const missing: string[] = [];
    if (!color) missing.push("Textil y Color");
    if (!width) missing.push("Ancho");
    if (!softness) missing.push("Nivel de suavidad");
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowModal(true);
    } else {
      navigate("/checkout", {
        state: { width, softness, color, currentPrice, image: gallery[0] }
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Scroll-reveal variant
  const slideUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }
    })
  };

  return (
    <div className="product-page">
      <main className="product-container">
        {/* ── Left: Sticky Gallery ── */}
        <section className="product-gallery">
          <div className="product-gallery-sticky">
            {/* Back button */}
            <Link to="/" className="product-back">
              ← Volver al inicio
            </Link>

            {/* Main Image */}
            <div className="product-main-img-wrap">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={gallery[activeImage]}
                  alt="Sofá Lutton"
                  className={`product-main-img ${activeImage === 1 ? "product-main-img--contain" : ""}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="product-thumbnails">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  className={`product-thumb ${i === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`Vista ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Right: Scrolling details ── */}
        <section className="product-info-panel">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="product-category">Línea Premium</div>
            <AnimatedTitle text="Sofá Lutton 2026" />

            <div className="product-price-row">
              <span className="product-price-current">{formatPrice(currentPrice)}</span>
              <span className="product-price-regular">{formatPrice(regularPrice)}</span>
              <span className="product-price-badge">Edición Especial</span>
            </div>
            <p className="product-vigency">Vigencia: 15 de abril al 30 de abril</p>

            {/* Configurator */}
            <div className="product-config">
              <h3 className="config-heading">Personaliza tu sofá</h3>

              {/* Color Selection */}
              <div className="config-group">
                <label className="config-label">
                  Textil y Color {color && <span>({color})</span>}
                  {!color && <span className="config-required">— Requerido</span>}
                </label>
                <div className="color-swatches">
                  {sofaColors.map((c) => (
                    <button
                      key={c.name}
                      className={`color-swatch-btn ${color === c.name ? "active" : ""}`}
                      onClick={() => setColor(c.name)}
                      aria-label={`Seleccionar color ${c.name}`}
                    >
                      <span
                        className="color-swatch-circle"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Width Selection */}
              <div className="config-group">
                <label className="config-label">
                  Ancho {width && <span>({width} m)</span>}
                  {!width && <span className="config-required">— Requerido</span>}
                </label>
                <div className="config-options">
                  {["1.60", "1.80", "2.00"].map((w) => (
                    <button
                      key={w}
                      className={`config-btn ${width === w ? "active" : ""}`}
                      onClick={() => setWidth(w)}
                    >
                      {w} m
                    </button>
                  ))}
                </div>
              </div>

              {/* Softness */}
              <div className="config-group">
                <label className="config-label">
                  Nivel de suavidad
                  {!softness && <span className="config-required">— Requerido</span>}
                </label>
                <div className="config-options config-options--stack">
                  <button
                    className={`config-btn-full ${softness === "Suave" ? "active" : ""}`}
                    onClick={() => setSoftness("Suave")}
                  >
                    <span className="config-opt-name">Suave</span>
                    <span className="config-opt-desc">Incluido en el precio base</span>
                  </button>
                  <button
                    className={`config-btn-full ${softness === "Extra suave" ? "active" : ""}`}
                    onClick={() => setSoftness("Extra suave")}
                  >
                    <span className="config-opt-name">Extra suave</span>
                    <span className="config-opt-desc">+ {formatPrice(180000)}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Checkout actions */}
            <div className="product-actions">
              <button 
                className="product-cta product-cta--primary"
                onClick={handleBuy}
              >
                Comprar Ahora — {formatPrice(currentPrice)}
              </button>
              <a
                className="product-cta product-cta--ghost"
                href="https://api.whatsapp.com/send/?phone=573054602395&text=Hola+%2ALaFab%2A.+Necesito+m%C3%A1s+informaci%C3%B3n+sobre+LaFab+https%3A%2F%2Flafab.com.co%2F&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                Hablar con un asesor
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Below the fold: Description & Specs ── */}
      <section className="product-extended-info">
        <div className="extended-info-inner">
          <motion.div
            className="extended-header"
            variants={slideUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2>El confort elevado a su máxima expresión</h2>
            <p className="product-description">
              Sofá de alta gama diseñado para ofrecer un nivel superior de confort y presencia estética en espacios residenciales. Se caracteriza por su fabricación artesanal de línea premium, permitiendo adaptar dimensiones, materiales y acabados para integrarse orgánicamente en tu entorno.
            </p>
          </motion.div>

          {/* Accordions / Info lists in a grid */}
          <div className="product-specs">
            {[
              {
                title: "⭐ Propuesta de valor",
                items: [
                  "Producto de línea premium (no estándar)",
                  "Alto nivel de confort ergonómico",
                  "Materiales seleccionados de primera cálidad",
                  "Diseño elegante adaptable a diferentes espacios",
                ]
              },
              {
                title: "🪵 Construcción",
                items: [
                  "Estructura base en madera de roble",
                  "Espumas certificadas de alta densidad",
                  "Ensamble enfocado en la máxima durabilidad",
                  "Diseño ideal para uso continuo y prolongado",
                ]
              },
              {
                title: "🛡️ Garantía & Envío",
                items: [
                  "Garantía: 3 años en estructura",
                  "Cobertura: Envíos asegurados a todo el país",
                ]
              },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                className="spec-col"
                variants={slideUp}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <h4 className="spec-title">{col.title}</h4>
                <ul className="spec-list">
                  {col.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Validation Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="product-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="product-modal-icon">⚠️</div>
              <h3 className="product-modal-title">Faltan opciones por seleccionar</h3>
              <p className="product-modal-body">
                Por favor selecciona las siguientes opciones antes de continuar:
              </p>
              <ul className="product-modal-list">
                {missingFields.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button
                className="product-modal-btn"
                onClick={() => setShowModal(false)}
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterSection />
    </div>
  );
};

export default ProductDetails;
