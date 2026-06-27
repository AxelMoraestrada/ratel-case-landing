import { useState } from 'react';
import { motion } from 'framer-motion';
import { sedes, distritos } from '../../data/sedes';
import { useGeolocation } from '../../hooks/useGeolocation';
import { sedesMasCercanas } from '../../utils/distance';
import { MdLocationOn, MdPhone, MdAccessTime, MdNavigation, MdMyLocation } from 'react-icons/md';
import { HiChevronRight } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

function SedeCard({ sede, distancia, highlight }) {
  // URL verificada: coordenadas idénticas al marcador del mapa
  const gmapsUrl = sede.gmapsUrl;
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 transition-all duration-300"
      style={{
        background: highlight ? '#EBF6FD' : '#ffffff',
        border:     highlight ? '1.5px solid #00AEEF' : '1px solid #E0F2FE',
        boxShadow:  highlight ? '0 8px 32px rgba(0,174,239,0.15)' : '0 2px 12px rgba(0,174,239,0.05)',
      }}>

      {highlight && (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00AEEF' }} />
          <span className="font-inter font-semibold text-xs" style={{ color: '#00AEEF' }}>Sede más cercana</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-manrope font-bold text-base mb-1" style={{ color: '#0F172A' }}>{sede.nombre}</h3>
          {distancia && (
            <span className="font-inter text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: '#EBF6FD', color: '#00AEEF' }}>
              ~{distancia} km de distancia
            </span>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: '#EBF6FD', color: '#00AEEF' }}>
          <MdLocationOn className="text-xl" />
        </div>
      </div>

      <div className="space-y-2.5 mb-5">
        {[
          { Icon: MdLocationOn, text: `${sede.direccion}, ${sede.distrito}` },
          { Icon: MdAccessTime, text: sede.horario },
          { Icon: MdPhone,      text: sede.telefono },
        ].map(({ Icon, text }, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <Icon className="mt-0.5 shrink-0 text-sm" style={{ color: '#94A3B8' }} />
            <p className="font-inter text-sm" style={{ color: '#64748B' }}>{text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <a href={gmapsUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-inter font-semibold text-sm text-white transition-all duration-200 hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #00AEEF, #0077C8)' }}>
          <MdNavigation /> Cómo llegar
        </a>
        <a href={`https://wa.me/${sede.telefono.replace(/[^0-9]/g, '')}?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20la%20sede%20${encodeURIComponent(sede.nombre)}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-inter font-semibold text-sm transition-all duration-200"
          style={{ background: 'rgba(37,211,102,0.1)', color: '#16a34a', border: '1px solid rgba(37,211,102,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}>
          <FaWhatsapp />
        </a>
      </div>
    </motion.div>
  );
}

export default function BuscadorSedes() {
  const { location, error, loading, getLocation } = useGeolocation();
  const [selectedDistrito, setSelectedDistrito] = useState('');
  const [resultados, setResultados] = useState(null);

  const buscarPorDistrito = () => {
    if (!selectedDistrito) return;
    const ref = sedes.find(s => s.distrito === selectedDistrito);
    if (ref) setResultados(sedesMasCercanas(ref.lat, ref.lng, sedes));
  };

  const sedesOrdenadas = location ? sedesMasCercanas(location.lat, location.lng, sedes) : resultados;

  return (
    <section id="sedes" className="py-28 relative" style={{ background: '#F5FBFF' }}>
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.5 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeUp(0)} className="section-label block mb-4">Nuestras tiendas</motion.span>
          <motion.h2 {...fadeUp(0.1)}
            className="font-manrope font-bold mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
            Encuentra tu sede más cercana
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-inter max-w-md mx-auto" style={{ fontSize: '1.05rem', color: '#64748B' }}>
            Usa tu ubicación o selecciona tu distrito para encontrar la tienda más conveniente.
          </motion.p>
        </div>

        {/* Controles */}
        <motion.div {...fadeUp(0.2)}
          className="max-w-2xl mx-auto mb-12 rounded-2xl p-6 bg-white"
          style={{ border: '1px solid #BAE6FD', boxShadow: '0 4px 20px rgba(0,174,239,0.08)' }}>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <button onClick={getLocation} disabled={loading}
              className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-inter font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #00AEEF, #0077C8)', boxShadow: '0 4px 14px rgba(0,174,239,0.3)' }}>
              <MdMyLocation className={`text-lg ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Detectando...' : 'Usar mi ubicación'}
            </button>

            <div className="flex gap-2">
              <select value={selectedDistrito} onChange={e => setSelectedDistrito(e.target.value)}
                className="flex-1 py-3.5 px-4 rounded-xl font-inter text-sm outline-none appearance-none cursor-pointer"
                style={{ background: '#F5FBFF', border: '1.5px solid #BAE6FD', color: selectedDistrito ? '#0F172A' : '#94A3B8' }}>
                <option value="">Seleccionar distrito</option>
                {distritos.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <button onClick={buscarPorDistrito} disabled={!selectedDistrito}
                aria-label="Buscar sede en distrito seleccionado"
                className="px-4 py-3.5 rounded-xl font-inter font-semibold text-sm transition-all duration-200 disabled:opacity-40"
                style={{ background: '#EBF6FD', color: '#00AEEF', border: '1px solid #BAE6FD' }}>
                <HiChevronRight className="text-lg" />
              </button>
            </div>
          </div>

          {error && <p className="text-center font-inter text-sm" style={{ color: '#EF4444' }}>{error}</p>}
          {location && !error && (
            <p className="text-center font-inter text-sm" style={{ color: '#00AEEF' }}>
              ✓ Ubicación detectada. Sedes ordenadas por cercanía.
            </p>
          )}
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {(sedesOrdenadas || sedes).map((sede, i) => (
            <SedeCard key={sede.id} sede={sede} distancia={sede.distancia}
              highlight={i === 0 && sedesOrdenadas !== null} />
          ))}
        </div>
      </div>
    </section>
  );
}
