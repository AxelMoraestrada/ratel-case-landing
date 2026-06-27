import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MdRocketLaunch, MdVisibility, MdFavorite } from 'react-icons/md';
import { HiShieldCheck, HiLightningBolt, HiUsers } from 'react-icons/hi';


/* ── Hook de conteo animado ──────────────────────────────────────
   Cuenta de 0 al valor final cuando el elemento entra en viewport.
   duration: duración en ms | ease: función de aceleración
──────────────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

/* ── Tarjeta de estadística con conteo animado ─────────────────── */
function StatCard({ num, label, duration = 1800 }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count  = useCountUp(num, duration, inView);

  return (
    <div ref={ref}>
      <p className="font-manrope font-bold text-3xl mb-1" style={{ color: '#00AEEF' }}>
        {num >= 1000 ? `+${count >= 1000 ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + 'K' : count}` : `${num > 4 ? '+' : ''}${count}`}
      </p>
      <p className="font-inter text-sm" style={{ color: '#64748B' }}>{label}</p>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

const valores = [
  { icon: <HiShieldCheck />, label: 'Calidad',    desc: 'Solo productos que superan nuestros estándares.',  color: '#00AEEF' },
  { icon: <HiUsers />,       label: 'Cercanía',   desc: 'Atención personalizada en cada visita.',           color: '#0077C8' },
  { icon: <HiLightningBolt />,label:'Innovación', desc: 'Siempre a la vanguardia tecnológica.',             color: '#38BDF8' },
  { icon: <MdFavorite />,    label: 'Confianza',  desc: 'Relaciones duraderas con nuestros clientes.',     color: '#00AEEF' },
];

export default function SobreNosotros() {
  return (
    <section id="nosotros" className="py-28 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right top, rgba(0,174,239,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.span {...fadeUp(0)} className="section-label block mb-4">Sobre Nosotros</motion.span>
          <motion.h2 {...fadeUp(0.1)}
            className="font-manrope font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
            Tecnología accesible,<br />experiencia garantizada.
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-inter leading-relaxed" style={{ color: '#64748B', fontSize: '1.05rem' }}>
            Nacimos con una misión simple: que cada peruano pueda proteger y potenciar su celular con accesorios de calidad y a precios justos. Desde Lima, llevamos tecnología a quienes más la necesitan.
          </motion.p>
        </div>

        {/* Grid de cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">

          {/* Historia — card con gradiente celeste */}
          <motion.div {...fadeUp(0.1)} className="md:col-span-2 rounded-2xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #00AEEF 0%, #0077C8 100%)', minHeight: '300px' }}>
            <div className="absolute inset-0 dot-grid-white" style={{ opacity: 0.6 }} />
            <div className="relative p-8 h-full flex flex-col justify-end">
              <img src="/logo-transparent.png" alt="Logo Ratel-case — accesorios para celulares Lima"
                width="64" height="64" loading="lazy"
                style={{ width: 64, height: 64, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9, marginBottom: '1.25rem' }} />
              <span className="font-inter font-semibold text-white/80 text-xs tracking-widest uppercase mb-3 block">Nuestra historia</span>
              <h3 className="font-manrope font-bold text-white text-xl mb-3">
                Comenzamos en una sola tienda con una gran idea.
              </h3>
              <p className="text-white/75 font-inter text-sm leading-relaxed" style={{ maxWidth: '420px' }}>
                Ratel-case nació como una pequeña tienda con el sueño de democratizar el acceso a accesorios tecnológicos de calidad. Hoy contamos con 4 sedes activas en Lima y seguimos creciendo.
              </p>
            </div>
          </motion.div>

          {/* Misión */}
          <motion.div {...fadeUp(0.2)} className="rounded-2xl p-8 flex flex-col justify-between card-light">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: '#EBF6FD' }}>
              <MdRocketLaunch className="text-xl" style={{ color: '#00AEEF' }} />
            </div>
            <div>
              <span className="section-label block mb-2">Misión</span>
              <p className="font-inter text-sm leading-relaxed" style={{ color: '#64748B' }}>
                Ofrecer accesorios tecnológicos de alta calidad con atención especializada, precios competitivos y garantía real en cada producto.
              </p>
            </div>
          </motion.div>

          {/* Visión */}
          <motion.div {...fadeUp(0.3)} className="rounded-2xl p-8 flex flex-col justify-between card-light">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: '#EBF6FD' }}>
              <MdVisibility className="text-xl" style={{ color: '#0077C8' }} />
            </div>
            <div>
              <span className="section-label block mb-2">Visión</span>
              <p className="font-inter text-sm leading-relaxed" style={{ color: '#64748B' }}>
                Ser la cadena de tiendas de accesorios tecnológicos más reconocida de Lima, expandiéndonos a las principales ciudades del Perú.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.25)} className="md:col-span-2 rounded-2xl p-8 flex flex-wrap gap-8 items-center"
            style={{ background: '#F5FBFF', border: '1px solid #BAE6FD' }}>
            {[
              { num: 4,    label: 'Tiendas en Lima',        duration: 800  },
              { num: 500, label: 'Productos disponibles',    duration: 1600 },
              { num: 5000,label: 'Clientes satisfechos',     duration: 2000 },
              { num: 8,   label: 'Años de experiencia',      duration: 1000 },
            ].map((s, i) => (
              <StatCard key={i} num={s.num} label={s.label} duration={s.duration} />
            ))}
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div {...fadeUp(0.3)}>
          <h3 className="font-manrope font-bold text-xl mb-8" style={{ color: '#0F172A' }}>Nuestros valores</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {valores.map((v, i) => (
              <motion.div key={v.label} {...fadeUp(0.08 * i)}
                className="rounded-2xl p-6 cursor-default card-light"
                onMouseEnter={e => { e.currentTarget.style.borderColor = v.color + '50'; e.currentTarget.style.background = '#F5FBFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0F2FE'; e.currentTarget.style.background = '#fff'; }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
                  style={{ background: v.color + '15', color: v.color }}>
                  {v.icon}
                </div>
                <p className="font-manrope font-bold text-sm mb-1.5" style={{ color: '#0F172A' }}>{v.label}</p>
                <p className="font-inter text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
