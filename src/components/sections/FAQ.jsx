import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../data/faqs';
import { HiPlus, HiMinus } from 'react-icons/hi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: isOpen ? '#F5FBFF' : '#FFFFFF',
        border:     isOpen ? '1.5px solid #BAE6FD' : '1px solid #E0F2FE',
        boxShadow:  isOpen ? '0 4px 20px rgba(0,174,239,0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
      }}>
      <button onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left">
        <span className="font-manrope font-semibold text-sm md:text-base leading-snug" style={{ color: '#0F172A' }}>
          {faq.pregunta}
        </span>
        <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
          style={{ background: isOpen ? '#00AEEF' : '#EBF6FD', color: isOpen ? '#fff' : '#00AEEF' }}>
          {isOpen ? <HiMinus className="text-sm" /> : <HiPlus className="text-sm" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}>
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="h-px mb-4" style={{ background: '#BAE6FD' }} />
              <p className="font-inter text-sm leading-relaxed" style={{ color: '#64748B' }}>
                {faq.respuesta}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const toggle = id => setOpenId(prev => prev === id ? null : id);

  return (
    <section className="py-20 relative" style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.4 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Izquierda sticky */}
          <div className="lg:sticky lg:top-28">
            <motion.span {...fadeUp(0)} className="section-label block mb-4">FAQs</motion.span>
            <motion.h2 {...fadeUp(0.1)}
              className="font-manrope font-bold mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
              Preguntas frecuentes
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="font-inter mb-10 leading-relaxed" style={{ fontSize: '1.05rem', color: '#64748B' }}>
              Resolvemos tus dudas más comunes. Si no encuentras lo que buscas, escríbenos por WhatsApp.
            </motion.p>

            {/* CTA card */}
            <motion.div {...fadeUp(0.3)}
              className="rounded-2xl p-6"
              style={{ background: '#F5FBFF', border: '1px solid #BAE6FD' }}>
              <p className="font-manrope font-bold text-sm mb-2" style={{ color: '#0F172A' }}>¿No encontraste tu respuesta?</p>
              <p className="font-inter text-sm mb-4" style={{ color: '#64748B' }}>
                Escríbenos directamente y te respondemos al instante.
              </p>
              <a href="https://wa.me/51967200712?text=Hola%2C%20tengo%20una%20consulta."
                target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
                Hacer una pregunta
              </a>
            </motion.div>
          </div>

          {/* Acordeón */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq.id} {...fadeUp(0.05 * i)}>
                <FAQItem faq={faq} isOpen={openId === faq.id} onToggle={() => toggle(faq.id)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
