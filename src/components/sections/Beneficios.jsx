import { motion } from 'framer-motion';
import { HiShieldCheck, HiCollection, HiUsers, HiLightningBolt, HiLocationMarker, HiTag } from 'react-icons/hi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

const beneficios = [
  { icon: <HiShieldCheck />,    titulo: 'Garantía real',          desc: 'Todos nuestros productos incluyen garantía de 3 meses contra defectos de fabricación. Sin letras pequeñas.',           color: '#00AEEF' },
  { icon: <HiCollection />,     titulo: 'Catálogo amplio',        desc: 'Más de 500 accesorios compatibles con todas las marcas: iPhone, Samsung, Xiaomi, Motorola, Huawei y más.',           color: '#0077C8' },
  { icon: <HiUsers />,          titulo: 'Atención especializada', desc: 'Nuestro equipo te asesora para que encuentres el accesorio exacto que necesitas para tu modelo.',                    color: '#38BDF8' },
  { icon: <HiLightningBolt />,  titulo: 'Instalación en tienda',  desc: 'Colocamos tu protector de pantalla directamente en la tienda, sin costo extra y sin burbujas.',                      color: '#00AEEF' },
  { icon: <HiLocationMarker />, titulo: 'Múltiples sedes',        desc: '4 tiendas estratégicamente ubicadas en Lima para que siempre tengas una cerca de ti.',                              color: '#0077C8' },
  { icon: <HiTag />,            titulo: 'Precios competitivos',   desc: 'Calidad premium sin precio de importadora. Trabajamos con distribuidores para darte el mejor precio.',               color: '#38BDF8' },
];

export default function Beneficios() {
  return (
    <section id="beneficios" className="py-20 relative" style={{ background: '#FFFFFF' }}>
      {/* Línea top */}
      <div className="absolute top-0 left-0 w-full h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #BAE6FD, transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <motion.span {...fadeUp(0)} className="section-label block mb-4">Por qué elegirnos</motion.span>
            <motion.h2 {...fadeUp(0.1)}
              className="font-manrope font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
              Más que una tienda,<br />una experiencia.
            </motion.h2>
          </div>
          <motion.p {...fadeUp(0.2)} className="font-inter leading-relaxed lg:pb-2" style={{ color: '#64748B', fontSize: '1.05rem' }}>
            En Ratel-case no solo vendemos accesorios — construimos confianza. Cada visita está diseñada para que salgas satisfecho con el producto correcto al mejor precio.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {beneficios.map((b, i) => (
            <motion.div key={b.titulo} {...fadeUp(0.07 * i)}
              className="rounded-2xl p-7 cursor-default card-light"
              onMouseEnter={e => { e.currentTarget.style.borderColor = b.color + '50'; e.currentTarget.style.background = '#F5FBFF'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0F2FE'; e.currentTarget.style.background = '#fff'; }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5"
                style={{ background: b.color + '15', color: b.color }}>
                {b.icon}
              </div>
              <h3 className="font-manrope font-bold text-base mb-2.5" style={{ color: '#0F172A' }}>{b.titulo}</h3>
              <p className="font-inter text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div {...fadeUp(0.3)}
          className="mt-16 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: 'linear-gradient(135deg, #00AEEF 0%, #0077C8 100%)', boxShadow: '0 20px 60px rgba(0,174,239,0.25)' }}>
          <div>
            <h3 className="font-manrope font-bold text-white text-xl mb-2">¿Listo para visitar nuestra tienda?</h3>
            <p className="text-white/80 font-inter text-sm">Encuéntranos en Jesús María, Independencia, Lima Centro o San Martín de Porres.</p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <a href="https://wa.me/51967200712" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-inter font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)' }}>
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
