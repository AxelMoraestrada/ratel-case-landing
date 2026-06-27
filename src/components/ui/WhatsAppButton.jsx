import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: 10,  scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
              boxShadow: '0 20px 60px rgba(15,23,42,0.15), 0 0 0 1px #E0F2FE',
              maxWidth: '230px',
            }}>
            <button onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 transition-colors"
              style={{ color: '#94A3B8' }}
              onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
              <HiX />
            </button>
            <p className="font-manrope font-bold text-sm mb-1" style={{ color: '#0F172A' }}>¡Hola! 👋</p>
            <p className="font-inter text-xs leading-relaxed mb-3" style={{ color: '#64748B' }}>
              ¿Tienes alguna consulta? Escríbenos por WhatsApp.
            </p>
            <a href="https://wa.me/51967200712?text=Hola%20Ratel-case%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-white text-xs font-inter font-semibold hover:opacity-90 transition-opacity"
              style={{ background: '#25D366' }}>
              <FaWhatsapp /> Abrir WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white relative"
        style={{ background: '#25D366', boxShadow: '0 8px 28px rgba(37,211,102,0.45)' }}
        aria-label="Contactar por WhatsApp">
        <FaWhatsapp className="text-2xl" />
        <span className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: '#25D366' }} />
      </motion.button>
    </div>
  );
}
