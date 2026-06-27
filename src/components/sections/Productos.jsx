import { motion } from 'framer-motion';
import { productos } from '../../data/productos';
import { HiShieldCheck, HiLightningBolt, HiVolumeUp, HiDesktopComputer, HiChip } from 'react-icons/hi';
import { MdUsb } from 'react-icons/md';

const iconMap = {
  shield: <HiShieldCheck />, zap: <HiLightningBolt />, headphones: <HiVolumeUp />,
  monitor: <HiDesktopComputer />, cable: <MdUsb />, cpu: <HiChip />,
};

// Paleta celeste para cada producto
const colores = ['#00AEEF','#0077C8','#38BDF8','#00AEEF','#0077C8','#38BDF8'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Productos() {
  return (
    <section id="productos" className="py-28 relative" style={{ background: '#F5FBFF' }}>
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.6 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeUp(0)} className="section-label block mb-4">Catálogo</motion.span>
          <motion.h2 {...fadeUp(0.1)}
            className="font-manrope font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
            Productos destacados
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-inter max-w-lg mx-auto" style={{ fontSize: '1.05rem', color: '#64748B' }}>
            Selección curada de los accesorios más vendidos y mejor valorados por nuestros clientes.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((p, i) => {
            const color = colores[i];
            return (
              <motion.div key={p.id} {...fadeUp(0.05 * i)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white"
                style={{ border: '1px solid #E0F2FE', boxShadow: '0 2px 12px rgba(0,174,239,0.06)', transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)' }}
                whileHover={{ y: -8, scale: 1.01 }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color + '70';
                  e.currentTarget.style.boxShadow = `0 24px 56px rgba(0,174,239,0.16), 0 4px 16px rgba(0,174,239,0.08)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E0F2FE';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,174,239,0.06)';
                }}>

                {/* Imagen */}
                <div className="relative h-52 overflow-hidden" style={{ background: '#F5FBFF' }}>
                  <img src={p.img} alt={`${p.nombre} — Ratel-case, Lima`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: {
                      1: 'center center',
                      2: 'center 60%',
                      3: 'center 55%',
                      4: 'center 38%',
                      5: 'center 45%',
                      6: 'center center',
                    }[p.id] || 'center center' }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.4) 100%)' }} />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full font-inter font-semibold text-white"
                    style={{ background: color, fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                    {p.badge}
                  </div>

                  {/* Ícono */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center text-base"
                    style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    {iconMap[p.icon]}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-manrope font-bold text-base" style={{ color: '#0F172A' }}>{p.nombre}</h3>
                    <span className="font-inter font-bold text-sm shrink-0 ml-2" style={{ color }}>{p.precio}</span>
                  </div>
                  <p className="font-inter text-sm leading-relaxed mb-4" style={{ color: '#64748B' }}>{p.descripcion}</p>

                  <div className="flex items-center justify-between">
                    <span className="font-inter text-xs px-2.5 py-1 rounded-lg" style={{ background: '#F5FBFF', color: '#94A3B8', border: '1px solid #E0F2FE' }}>
                      {p.categoria}
                    </span>
                    <a href={`https://wa.me/51967200712?text=Hola%2C%20quiero%20info%20sobre%20${encodeURIComponent(p.nombre)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-xs font-inter font-semibold px-4 py-2 rounded-xl transition-all duration-200"
                      style={{ background: color + '15', color, border: `1px solid ${color}30`, transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 4px 12px ${color}40`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = color + '15'; e.currentTarget.style.color = color; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      Consultar
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="text-center mt-14">
          <p className="font-inter text-sm mb-5" style={{ color: '#94A3B8' }}>¿Buscas algo específico? Tenemos más de 500 productos en tienda.</p>
          <a href="https://wa.me/51967200712?text=Hola%2C%20quiero%20ver%20el%20cat%C3%A1logo%20completo."
            target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
            Ver catálogo completo por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
