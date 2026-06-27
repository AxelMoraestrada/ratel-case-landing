import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MdArrowForward, MdLocationOn } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { HiShieldCheck, HiLightningBolt, HiVolumeUp, HiStar } from 'react-icons/hi';

/* ─── animaciones ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ─── DotGrid interactivo ─────────────────────────────────────────── */
function DotGrid() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const S = 28, R = 1, GR = 130;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = e => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', () => { mouseRef.current = { x: -999, y: -999 }; });

    const draw = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;
      for (let x = S; x < W; x += S) {
        for (let y = S; y < H; y += S) {
          const d   = Math.hypot(x - mx, y - my);
          const inf = Math.max(0, 1 - d / GR);
          ctx.beginPath();
          ctx.arc(x, y, R + inf * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,174,239,${0.055 + inf * 0.34})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
}

/* ─── Hero ────────────────────────────────────────────────────────── */
export default function Hero() {

  const benefits = [
    { icon: <HiShieldCheck />,   label: 'Garantía incluida',        color: '#00AEEF' },
    { icon: <HiLightningBolt />, label: 'Carga rápida 65W',         color: '#0077C8' },
    { icon: <HiVolumeUp />,      label: 'Sonido de alta fidelidad', color: '#38BDF8' },
    { icon: <HiStar />,          label: '+5,000 clientes felices',  color: '#F59E0B' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(155deg,#FFFFFF 0%,#F5FBFF 52%,#EBF6FD 100%)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0"><DotGrid /></div>

      {/* Orbs de ambiente */}
      <div className="absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(0,174,239,0.07) 0%,transparent 65%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(0,119,200,0.05) 0%,transparent 65%)', filter: 'blur(60px)' }} />

      {/* ── Layout 12 columnas: 5 texto / 7 imagen ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 lg:pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-4 items-center">

          {/* ══ TEXTO — 5 col ════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col lg:pr-4">

            {/* Badge */}
            <motion.div {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 self-start"
              style={{ background: '#EBF6FD', border: '1px solid #BAE6FD' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00AEEF' }} />
              <span className="section-label" style={{ fontSize: '0.67rem' }}>
                Accesorios tecnológicos premium · Lima
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 {...fadeUp(0.2)}
              className="font-manrope font-bold leading-[1.06] mb-5"
              style={{ fontSize: 'clamp(2.4rem,4.2vw,3.9rem)', letterSpacing: '-0.025em', color: '#0F172A' }}>
              Protege y potencia
              <br />
              <span className="relative inline-block">
                <span className="text-gradient-sky">tu celular.</span>
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5"
                  viewBox="0 0 200 5" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 4 Q50 1 100 3.5 Q150 6 200 2.5"
                    stroke="url(#ug)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%"   stopColor="#00AEEF"/>
                      <stop offset="100%" stopColor="#0077C8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            {/* Descripción */}
            <motion.p {...fadeUp(0.3)}
              className="font-inter leading-relaxed mb-8"
              style={{ fontSize: 'clamp(0.95rem,1.5vw,1.05rem)', color: '#64748B', maxWidth: '400px' }}>
              Cases premium, cargadores rápidos, audífonos y protectores.
              El accesorio perfecto en nuestras{' '}
              <span className="font-semibold" style={{ color: '#00AEEF' }}>4 tiendas en Lima</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-8">
              <a href="#productos" className="btn-primary">
                Ver Productos <MdArrowForward className="text-lg" />
              </a>
              <a href="https://wa.me/51967200712?text=Hola%20Ratel-case%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n."
                target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <FaWhatsapp className="text-base" /> Escríbenos ahora
              </a>
            </motion.div>

            {/* Chips 2×2 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="grid grid-cols-2 gap-2 mb-8"
              style={{ maxWidth: 340 }}
            >
              {benefits.map((b, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.06 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{ background: '#fff', border: '1px solid #E0F2FE', boxShadow: '0 1px 6px rgba(0,174,239,0.07)' }}>
                  <span className="text-sm shrink-0" style={{ color: b.color }}>{b.icon}</span>
                  <span className="font-inter font-medium leading-tight"
                    style={{ fontSize: '0.7rem', color: '#475569' }}>{b.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.82 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {['12','25','33','47'].map((n, i) => (
                  <img key={i} src={`https://i.pravatar.cc/32?img=${n}`} alt=""
                    width={28} height={28} loading="lazy"
                    role="presentation"
                    className="w-7 h-7 rounded-full object-cover"
                    style={{ border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="11" height="11" fill="#F59E0B" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="font-inter text-xs" style={{ color: '#94A3B8' }}>
                  <span className="font-semibold" style={{ color: '#0F172A' }}>+5,000</span> clientes satisfechos
                </p>
              </div>
            </motion.div>
          </div>

          {/* ══ IMAGEN — 7 col ═══════════════════════════════════════════
              La imagen PNG tiene:
              • Fondo 100% transparente (alpha=0 en esquinas) ✅
              • 1536×1024px, contenido real en 1216×661px
              • 179px de espacio transparente arriba/abajo (respiración)
              • Esto permite que se integre directo sin ningún recuadro

              Estrategia de integración premium (Apple/Samsung):
              • w-full sin max-w → ocupa toda la columna
              • overflow-visible → la composición puede sobresalir
              • translateX positivo → sangra levemente al borde derecho
              • Glow centrado sobre el case azul (centro de la imagen)
              • Sin border, sin background, sin borderRadius → invisible el wrapper
          ════════════════════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'visible' }}
          >
            {/* ── Glows de ambiente (detrás de la imagen, z-0) ── */}

            {/* Glow principal — sobre el case azul (centro de la composición) */}
            <div className="absolute pointer-events-none" style={{
              zIndex: 0,
              top:    '18%',
              left:   '28%',
              width:  '44%',
              height: '60%',
              background: 'radial-gradient(ellipse, rgba(0,174,239,0.22) 0%, rgba(56,189,248,0.10) 40%, transparent 70%)',
              filter: 'blur(36px)',
              borderRadius: '50%',
              transform: 'translateX(-10%)',
            }}/>

            {/* Glow secundario — audífonos izquierda */}
            <div className="absolute pointer-events-none" style={{
              zIndex: 0,
              top:    '28%',
              left:   '2%',
              width:  '26%',
              height: '44%',
              background: 'radial-gradient(ellipse, rgba(0,174,239,0.12) 0%, transparent 70%)',
              filter: 'blur(24px)',
              borderRadius: '50%',
            }}/>

            {/* Glow terciario — cargador/cable derecha */}
            <div className="absolute pointer-events-none" style={{
              zIndex: 0,
              top:    '22%',
              right:  '0%',
              width:  '28%',
              height: '48%',
              background: 'radial-gradient(ellipse, rgba(0,119,200,0.10) 0%, transparent 70%)',
              filter: 'blur(20px)',
              borderRadius: '50%',
            }}/>

            {/* Sombra del pedestal — en el suelo, debajo del case */}
            <div className="absolute pointer-events-none" style={{
              zIndex: 0,
              bottom: '14%',
              left:   '50%',
              transform: 'translateX(-50%)',
              width:  '28%',
              height: '5%',
              background: 'radial-gradient(ellipse, rgba(0,174,239,0.18) 0%, transparent 70%)',
              filter: 'blur(12px)',
              borderRadius: '50%',
            }}/>

            {/* ── IMAGEN PRINCIPAL (z-10) ──
                PNG con alpha transparente → se integra directo
                Sin ningún wrapper con color, border o borderRadius
                overflow: visible → permite que los chips sobresalgan
                translateX(2%) → sangra levemente hacia el borde derecho
            ── */}
            <div className="relative" style={{ zIndex: 10, overflow: 'visible' }}>
              <img
                src="/hero-products.webp"
                alt="Ratel-case: case premium azul, audífonos, cargador rápido y cable USB"
                width={1536}
                height={1024}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full sm:w-[110%] lg:w-[160%] h-auto lg:-translate-x-[20%]"
                style={{
                  objectFit: 'contain',
                  filter: [
                    'brightness(1.06)',
                    'contrast(1.09)',
                    'saturate(1.05)',
                    'drop-shadow(0 24px 40px rgba(15,23,42,0.12))',
                  ].join(' '),
                }}
              />

              {/* ── CHIPS HTML propios — reemplazan los textos con errores de IA ──
                  Posicionados sobre las tarjetas existentes en la imagen
                  para corregir: "Cargo Rajnda"→"Carga Rápida", "Somdo"→"Sonido"
                  Se posicionan con % relativos al contenedor de la imagen
              ── */}

              {/* Chip GARANTÍA — nuevo, esquina superior derecha libre */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -8 }}
                animate={{ opacity: 1, scale: 1,    y: 0 }}
                transition={{ duration: 0.45, delay: 0.9 }}
                className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl"
                style={{
                  top: '6%', right: '20%',
                  background: '#fff',
                  border: '1px solid #BAE6FD',
                  boxShadow: '0 8px 28px rgba(0,174,239,0.16)',
                  zIndex: 20,
                }}
              >
                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: '#EBF6FD' }}>
                  <HiStar style={{ color: '#F59E0B', fontSize: 12 }} />
                </div>
                <div>
                  <p className="font-manrope font-bold leading-none mb-0.5"
                    style={{ fontSize: '0.63rem', color: '#0F172A' }}>Garantía</p>
                  <p className="font-inter leading-none"
                    style={{ fontSize: '0.57rem', color: '#94A3B8' }}>3 meses incluida</p>
                </div>
              </motion.div>

              {/* Chip 4 TIENDAS — esquina inferior izquierda */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1,    y: 0 }}
                transition={{ duration: 0.45, delay: 1.05 }}
                className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl"
                style={{
                  bottom: '2%', left: '2%',
                  background: 'linear-gradient(135deg,#00AEEF 0%,#0077C8 100%)',
                  boxShadow: '0 8px 28px rgba(0,174,239,0.32)',
                  zIndex: 20,
                }}
              >
                <MdLocationOn style={{ color: '#fff', fontSize: 14, flexShrink: 0 }} />
                <div>
                  <p className="font-manrope font-bold leading-none mb-0.5"
                    style={{ fontSize: '0.63rem', color: '#fff' }}>4 Tiendas en Lima</p>
                  <p className="font-inter leading-none"
                    style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.78)' }}>Jesús María · SMP · y más</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>{/* /grid */}
      </div>{/* /container */}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-xs tracking-widest uppercase" style={{ color: '#CBD5E1' }}>Scroll</span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: '#E0F2FE' }}>
          <motion.div className="absolute top-0 w-full"
            style={{ background: 'linear-gradient(180deg,#00AEEF,#0077C8)', height: '40%' }}
            animate={{ y: ['0%','250%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </motion.div>
    </section>
  );
}
