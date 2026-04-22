import { FunctionComponent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LeadModal.css";

type LeadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LeadModal: FunctionComponent<LeadModalProps> = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleClose = () => {
    setSent(false);
    setForm({ name: "", email: "", phone: "", city: "", message: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lead-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          <motion.div
            className="lead-modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="lead-close" onClick={handleClose} aria-label="Cerrar">
              ✕
            </button>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lead-form-wrap"
                >
                  <div className="lead-header">
                    <span className="lead-tag">Línea Premium</span>
                    <h2 className="lead-title">
                      Habla con un<br />
                      <strong>asesor LaFab</strong>
                    </h2>
                    <p className="lead-subtitle">
                      Déjanos tus datos y un asesor te contactará en menos de 24 horas
                      para ayudarte a personalizar tu Sofá Lutton.
                    </p>
                  </div>

                  <form className="lead-form" onSubmit={handleSubmit}>
                    <div className="lead-row">
                      <div className="lead-field">
                        <label className="lead-label">Nombre completo</label>
                        <input
                          className="lead-input"
                          type="text"
                          name="name"
                          placeholder="Tu nombre"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="lead-field">
                        <label className="lead-label">Correo electrónico</label>
                        <input
                          className="lead-input"
                          type="email"
                          name="email"
                          placeholder="tu@correo.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="lead-row">
                      <div className="lead-field">
                        <label className="lead-label">Teléfono / WhatsApp</label>
                        <input
                          className="lead-input"
                          type="tel"
                          name="phone"
                          placeholder="+57 300 000 0000"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="lead-field">
                        <label className="lead-label">Ciudad</label>
                        <input
                          className="lead-input"
                          type="text"
                          name="city"
                          placeholder="Bogotá, Medellín..."
                          value={form.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="lead-field lead-field--full">
                      <label className="lead-label">¿Cómo podemos ayudarte?</label>
                      <textarea
                        className="lead-input lead-textarea"
                        name="message"
                        placeholder="Cuéntanos sobre el espacio, medidas o preferencias..."
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="lead-submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Enviar solicitud&nbsp;&nbsp;→
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="lead-success"
                >
                  <div className="lead-success-icon">✓</div>
                  <h3 className="lead-success-title">¡Recibimos tu solicitud!</h3>
                  <p className="lead-success-body">
                    Un asesor de LaFab se pondrá en contacto contigo en las próximas 24 horas.
                  </p>
                  <motion.button
                    className="lead-submit"
                    onClick={handleClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cerrar
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
