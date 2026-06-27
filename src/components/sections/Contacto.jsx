import { motion } from 'framer-motion';
import { MdPhone, MdAccessTime } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Contacto() {
  return (
    <section id="contacto" className="py-28 relative" style={{ background: '#F5FBFF' }}>
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.5 }} />
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right top, rgba(0,174,239,0.05) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ══ IZQUIERDA — sin cambios ══════════════════════════════════ */}
          <div>
            <motion.span {...fadeUp(0)} className="section-label block mb-4">Contacto</motion.span>
            <motion.h2 {...fadeUp(0.1)}
              className="font-manrope font-bold mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
              Estamos listos<br />para ayudarte.
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="font-inter leading-relaxed mb-10"
              style={{ color: '#64748B', fontSize: '1.05rem' }}>
              ¿Tienes alguna consulta sobre un producto o sede? Escríbenos y te respondemos en menos de 24 horas.
            </motion.p>

            {/* WhatsApp card */}
            <motion.div {...fadeUp(0.3)}
              className="rounded-2xl p-6 mb-8"
              style={{ background: 'linear-gradient(135deg, #00AEEF 0%, #0077C8 100%)', boxShadow: '0 8px 28px rgba(0,174,239,0.3)' }}>
              <p className="font-manrope font-bold text-white text-sm mb-2">¿Respuesta inmediata?</p>
              <p className="text-white/80 font-inter text-sm mb-5 leading-relaxed">
                Usa nuestro WhatsApp. Respondemos de lunes a sábado de 9am a 8pm.
              </p>
              <a href="https://wa.me/51967200712?text=Hola%20Ratel-case%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 py-3 px-6 rounded-xl font-inter font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ background: '#fff', color: '#00AEEF' }}>
                <FaWhatsapp className="text-lg" style={{ color: '#25D366' }} /> Abrir WhatsApp ahora
              </a>
            </motion.div>

            {/* Info */}
            <motion.div {...fadeUp(0.35)} className="space-y-4">
              {[
                { Icon: MdPhone,      label: 'Teléfono',value: '+51 967 200 712' },
                { Icon: MdAccessTime, label: 'Horario', value: 'Lun–Sáb 9am–8pm · Dom 10am–6pm' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: '#EBF6FD', color: '#00AEEF' }}>
                    <Icon />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-xs mb-0.5" style={{ color: '#00AEEF' }}>{label}</p>
                    <p className="font-inter text-sm" style={{ color: '#64748B' }}>{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

                    {/* ══ DERECHA — imagen WhatsApp lifestyle ══ */}
          <motion.div
            {...fadeUp(0.2)}
            className="relative lg:self-stretch"
            style={{ minHeight: '480px' }}
          >
            {/* Contenedor imagen — ocupa toda la altura de la columna izquierda */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden"
              style={{
                minHeight: '480px',
                border: '1px solid #BAE6FD',
                boxShadow: '0 12px 48px rgba(0,174,239,0.12), 0 4px 16px rgba(15,23,42,0.06)',
              }}>

              {/* Imagen principal — cover para llenar sin deformar */}
              <img
                src="/contacto-whatsapp.webp"
                alt="Persona usando WhatsApp en celular — contacta a Ratel-case por WhatsApp para consultas sobre accesorios"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />

              {/* Overlay gradiente sutil — integra la imagen con el diseño */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,119,200,0.25) 100%)',
                }} />

              {/* Chip superpuesto — esquina inferior izquierda */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 4px 20px rgba(15,23,42,0.1)',
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: '#25D366' }}>
                    <FaWhatsapp className="text-white text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-manrope font-bold text-sm leading-none mb-0.5"
                      style={{ color: '#0F172A' }}>Atención por WhatsApp</p>
                    <p className="font-inter text-xs leading-none"
                      style={{ color: '#64748B' }}>Respondemos Lun–Sáb 9am–8pm</p>
                  </div>
                  <span className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                    style={{ background: '#25D366' }} />
                </div>
              </div>
            </div>
          </motion.div>
          {/* fin columna derecha */}

        </div>
      </div>
    </section>
  );
}
