import { motion } from 'framer-motion';
import { testimonios } from '../../data/testimonios';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className="w-3.5 h-3.5" fill={s <= count ? '#F59E0B' : '#E0F2FE'} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonios() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#F5FBFF' }}>
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.5 }} />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeUp(0)} className="section-label block mb-4">Testimonios</motion.span>
          <motion.h2 {...fadeUp(0.1)}
            className="font-manrope font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-inter max-w-md mx-auto" style={{ color: '#64748B', fontSize: '1.05rem' }}>
            Más de 5,000 clientes han confiado en Ratel-case. Estas son sus experiencias.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonios.map((t, i) => (
            <motion.div key={t.id} {...fadeUp(0.08 * i)}
              className="rounded-2xl p-6 flex flex-col justify-between cursor-default card-light bg-white">
              <div>
                <div className="font-manrope font-bold mb-3" style={{ fontSize: '2.5rem', lineHeight: 1, color: '#BAE6FD' }}>"</div>
                <Stars count={t.rating} />
                <p className="font-inter text-sm leading-relaxed mt-3 mb-5" style={{ color: '#64748B' }}>
                  {t.comentario}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #E0F2FE' }}>
                <img src={t.avatar} alt={`Foto de ${t.nombre}, cliente Ratel-case sede ${t.sede}`} className="w-9 h-9 rounded-full object-cover"
                  style={{ border: '2px solid #BAE6FD' }} loading="lazy" decoding="async" />
                <div>
                  <p className="font-manrope font-bold text-sm" style={{ color: '#0F172A' }}>{t.nombre}</p>
                  <p className="font-inter text-xs" style={{ color: '#94A3B8' }}>Sede {t.sede}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div {...fadeUp(0.3)}
          className="mt-14 py-8 flex flex-wrap items-center justify-center gap-10 rounded-2xl"
          style={{ background: '#fff', border: '1px solid #E0F2FE', boxShadow: '0 4px 20px rgba(0,174,239,0.06)' }}>
          {[
            { value: '4.9/5',  label: 'Calificación promedio' },
            { value: '+500',   label: 'Reseñas verificadas' },
            { value: '98%',    label: 'Clientes satisfechos' },
          ].map((s, i) => (
            <div key={i} className="text-center px-6">
              <p className="font-manrope font-bold text-2xl mb-0.5" style={{ color: '#00AEEF' }}>{s.value}</p>
              <p className="font-inter text-xs" style={{ color: '#94A3B8' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
