import { FunctionComponent, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FooterSection from "./FooterSection";
import "./Checkout.css";

const Checkout: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("pse");

  // Retrieve state or show default/redirect
  const state = location.state || {};
  const width = state.width || "1.80";
  const softness = state.softness || "Suave";
  const color = state.color || "Beige Arena";
  const currentPrice = state.currentPrice || 3400000;
  const image = state.image || "/Rectangle-1@2x.png";

  useEffect(() => {
    if (!location.state) {
      navigate(-1); // Go back if no state passed (e.g. direct url hit)
    }
  }, [location, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="checkout-page">
      <main className="checkout-container">
        <Link to="/product" className="checkout-back">
          ← Volver al producto
        </Link>
        <div className="checkout-content">
          {/* ── Left Column: Form ── */}
          <section className="checkout-form-section">
            
            <motion.h1 
              className="checkout-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Checkout
            </motion.h1>

            <motion.div 
              className="form-group-wrapper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="form-section-title">Datos de contacto y facturación</h2>
              <div className="form-row">
                <div className="form-col">
                  <label>Nombre completo</label>
                  <input type="text" placeholder="Ej. Ana Gómez" className="checkout-input" />
                </div>
                <div className="form-col">
                  <label>Cédula o NIT</label>
                  <input type="text" placeholder="Número de documento" className="checkout-input" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label>Correo electrónico</label>
                  <input type="email" placeholder="correo@ejemplo.com" className="checkout-input" />
                </div>
                <div className="form-col">
                  <label>Teléfono</label>
                  <input type="tel" placeholder="+57 300 000 0000" className="checkout-input" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="form-group-wrapper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="form-section-title">Datos de envío</h2>
              <div className="form-row">
                <div className="form-col form-col-full">
                  <label>Dirección</label>
                  <input type="text" placeholder="Calle, Carrera, #, Apartamento" className="checkout-input" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label>Departamento</label>
                  <select className="checkout-input">
                    <option value="" disabled selected>Seleccione un departamento...</option>
                    <option value="Antioquia">Antioquia</option>
                    <option value="Atlántico">Atlántico</option>
                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                    <option value="Bolívar">Bolívar</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Valle del Cauca">Valle del Cauca</option>
                  </select>
                </div>
                <div className="form-col">
                  <label>Ciudad</label>
                  <input type="text" placeholder="Ej. Bogotá, Medellín..." className="checkout-input" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="form-group-wrapper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="form-section-title">Método de pago</h2>
              <div className="payment-methods">
                <label className={`payment-method ${paymentMethod === 'pse' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'pse'}
                    onChange={() => setPaymentMethod('pse')}
                  />
                  <div className="payment-method-content">
                    <span className="payment-method-name">PSE</span>
                    <span className="payment-method-desc">Transferencia bancaria</span>
                  </div>
                  {/* Inline SVG for PSE-like icon */}
                  <div className="payment-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12H3"/><path d="M21 6H3"/><path d="M21 18H3"/></svg>
                  </div>
                </label>

                <label className={`payment-method ${paymentMethod === 'mastercard' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'mastercard'}
                    onChange={() => setPaymentMethod('mastercard')}
                  />
                  <div className="payment-method-content">
                    <span className="payment-method-name">Mastercard</span>
                    <span className="payment-method-desc">Tarjeta de crédito</span>
                  </div>
                  <div className="payment-icon payment-icon-mc">
                    <div className="circle-red" />
                    <div className="circle-orange" />
                  </div>
                </label>

                <label className={`payment-method ${paymentMethod === 'visa' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'visa'}
                    onChange={() => setPaymentMethod('visa')}
                  />
                  <div className="payment-method-content">
                    <span className="payment-method-name">Visa</span>
                    <span className="payment-method-desc">Tarjeta de crédito/débito</span>
                  </div>
                  <div className="payment-icon">
                    <svg width="32" height="12" viewBox="0 0 32 12" fill="currentColor"><path d="M11.666 0L8.297 10.366H5.215L3.25 2.215C3.12 1.625 2.94 1.455 2.455 1.25L0 0.28L0.065 0H3.345C4.26 0 5.04 0.655 5.255 1.63L6.46 7.15L8.7 0H11.666ZM22.565 0.38C21.84 0.125 20.81 0 19.67 0C16.8 0 14.85 1.525 14.835 3.71C14.82 5.32 16.32 6.22 17.435 6.77C18.57 7.33 18.96 7.685 18.96 8.165C18.96 8.91 18.065 9.24 17.15 9.24C15.82 9.24 14.855 8.88 14.12 8.52L13.685 8.315L13.125 10.965C13.88 11.31 15.225 11.605 16.63 11.625C19.71 11.625 21.64 10.105 21.655 7.825C21.67 6.645 20.945 5.75 18.065 4.39C16.71 3.73 17.515 2.65 19.615 2.65C20.675 2.65 21.565 2.875 22.25 3.195L22.565 0.38ZM31.135 11.34H33.825L30.93 0.23H28.4C27.68 0.23 27.09 0.67 26.8 1.34L22.956 11.34H26.06L26.685 9.615H30.5L30.85 11.34H31.135ZM27.565 7.215L29.13 2.925L29.585 7.215H27.565ZM23.475 11.34L26.115 0.23H23.015L20.375 11.34H23.475Z"/></svg>
                  </div>
                </label>
              </div>
              <button className="checkout-btn checkout-btn--primary">
                Realizar Pedido — {formatPrice(currentPrice)}
              </button>
            </motion.div>
          </section>

          {/* ── Right Column: Summary ── */}
          <section className="checkout-summary-section">
            <div className="checkout-summary-sticky">
              <h2 className="summary-title">Resumen de tu compra</h2>
              <div className="summary-card">
                <img src={image} alt="Sofá Lutton" className="summary-img" />
                <div className="summary-details">
                  <h3 className="summary-product-name">Sofá Lutton 2026</h3>
                  <p className="summary-config">Línea Premium</p>
                  
                  <div className="summary-props">
                    <div className="summary-prop">
                      <span className="prop-label">Color</span>
                      <span className="prop-value">{color}</span>
                    </div>
                    <div className="summary-prop">
                      <span className="prop-label">Ancho</span>
                      <span className="prop-value">{width} m</span>
                    </div>
                    <div className="summary-prop">
                      <span className="prop-label">Suavidad</span>
                      <span className="prop-value">{softness}</span>
                    </div>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-total-row">
                    <span>Total a pagar</span>
                    <span className="summary-price">{formatPrice(currentPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Checkout;
