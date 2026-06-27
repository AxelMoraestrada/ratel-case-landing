import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { sedes } from '../../data/sedes';
import { MdLocationOn, MdNavigation, MdClose, MdAccessTime, MdPhone } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

// ─── Constantes ───────────────────────────────────────────────────────────────

const GMAPS_KEY = import.meta.env.VITE_GMAPS_KEY || '';

// Centro geográfico de Lima — solo se usa como fallback inicial
const LIMA_CENTER = { lat: -12.030, lng: -77.065 };

// Padding para fitBounds: deja margen para que ningún marcador quede en el borde
const BOUNDS_PADDING = { top: 80, right: 60, bottom: 60, left: 60 };

// Zoom máximo permitido al hacer fitBounds de UNA sede — evita zoom excesivo
const MAX_SINGLE_ZOOM = 15;

// Zoom mínimo para mostrar todas las sedes — nunca más alejado que esto
const ALL_SEDES_ZOOM_MIN = 11;

// Estilos del mapa — tema claro corporativo Ratel-case
const MAP_STYLES = [
  { featureType: 'all',      elementType: 'labels.icon',      stylers: [{ visibility: 'off' }] },
  { featureType: 'poi',      elementType: 'labels',           stylers: [{ visibility: 'off' }] },
  { featureType: 'transit',  elementType: 'labels',           stylers: [{ visibility: 'off' }] },
  { featureType: 'water',    elementType: 'geometry',         stylers: [{ color: '#DBEAFE' }] },
  { featureType: 'landscape',elementType: 'geometry',         stylers: [{ color: '#F8FAFC' }] },
  { featureType: 'road',     elementType: 'geometry',         stylers: [{ color: '#FFFFFF' }] },
  { featureType: 'road',     elementType: 'geometry.stroke',  stylers: [{ color: '#E2E8F0' }] },
  { featureType: 'road.highway', elementType: 'geometry',     stylers: [{ color: '#BAE6FD' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#93C5FD' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#CBD5E1' }] },
  { elementType: 'labels.text.fill',   stylers: [{ color: '#475569' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#FFFFFF', weight: 3 }] },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * URL de Google Maps Directions — viene directamente de sedes.js
 * Las coordenadas en la URL son idénticas a las del marcador.
 * Esto garantiza que marcador, InfoWindow y botón "Cómo llegar"
 * apunten EXACTAMENTE al mismo punto geográfico.
 */
function buildDirectionsUrl(sede) {
  // sede.gmapsUrl ya contiene lat/lng verificados — no reconstruir
  return sede.gmapsUrl;
}

/**
 * Icono SVG inline para marcador activo (más grande, con pulse ring)
 * Retorna un objeto compatible con google.maps.Icon
 */
function getMarkerIcon(google, isActive) {
  if (isActive) {
    // Marcador activo: celeste corporativo, más grande, con borde blanco grueso
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 14,
      fillColor: '#00AEEF',
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 4,
    };
  }
  // Marcador inactivo: celeste más tenue, tamaño normal
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 9,
    fillColor: '#64B5D6',
    fillOpacity: 0.85,
    strokeColor: '#FFFFFF',
    strokeWeight: 2.5,
  };
}

// ─── Animación ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

// ─── Componente principal ─────────────────────────────────────────────────────
export default function MapaSedes() {
  const [activeSede, setActiveSede] = useState(null); // sede activa (objeto completo)
  const mapRef       = useRef(null);
  const markersRef   = useRef({});                    // ref a instancias de Marker

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GMAPS_KEY,
    id: 'ratel-map',
  });

  // ── onLoad: ajusta bounds para mostrar TODAS las sedes ─────────────────────
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    fitAllSedes(map);
  }, []);

  // ── fitAllSedes: siempre muestra las 4 sedes en pantalla ───────────────────
  const fitAllSedes = (map) => {
    if (!window.google || !map) return;
    const bounds = new window.google.maps.LatLngBounds();
    sedes.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
    map.fitBounds(bounds, BOUNDS_PADDING);

    // Garantizar que el zoom no sea inferior al mínimo (no queremos ver toda Sudamérica)
    const listener = window.google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
      const currentZoom = map.getZoom();
      if (currentZoom < ALL_SEDES_ZOOM_MIN) map.setZoom(ALL_SEDES_ZOOM_MIN);
    });
  };

  // ── handleSedeClick: selecciona sede SIN cambiar el zoom global ─────────────
  const handleSedeClick = (sede) => {
    const map = mapRef.current;
    if (!map || !window.google) return;

    setActiveSede(prev => {
      // Si ya estaba activa → deseleccionar y volver a vista completa
      if (prev?.id === sede.id) {
        fitAllSedes(map);
        return null;
      }
      return sede;
    });

    if (!activeSede || activeSede.id !== sede.id) {
      // Crear bounds que incluya la sede clickeada + las demás visibles
      // Pan suave hacia la sede sin alejar el zoom actual
      const bounds = new window.google.maps.LatLngBounds();
      sedes.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));

      // Calculamos un bounds "centrado" en la sede activa con más padding de ese lado
      const sedeLatLng = new window.google.maps.LatLng(sede.lat, sede.lng);

      // panTo suave — conserva el zoom actual, solo mueve el centro
      map.panTo(sedeLatLng);

      // Zoom suave: si estamos muy alejados, acercamos un poco (máx. 14)
      // pero nunca más cerca de lo que el usuario ya estaba
      const currentZoom = map.getZoom();
      const targetZoom  = Math.min(Math.max(currentZoom, 13), MAX_SINGLE_ZOOM - 1);
      if (currentZoom < 13) {
        // Solo hacemos zoom si estamos demasiado lejos para distinguir el marcador
        map.setZoom(targetZoom);
      }
    }
  };

  // ── handleCloseInfoWindow: cierra y vuelve a vista completa ────────────────
  const handleCloseInfoWindow = () => {
    setActiveSede(null);
    if (mapRef.current) fitAllSedes(mapRef.current);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="py-20 relative" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
          <div>
            <motion.span {...fadeUp(0)} className="section-label block mb-4">Mapa interactivo</motion.span>
            <motion.h2 {...fadeUp(0.1)}
              className="font-manrope font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F172A', letterSpacing: '-0.02em' }}>
              Estamos en todo Lima.
            </motion.h2>
          </div>
          <motion.p {...fadeUp(0.2)} className="font-inter" style={{ fontSize: '1.05rem', color: '#64748B' }}>
            Selecciona una sede en el panel o en el mapa para ver su ubicación exacta y obtener cómo llegar.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* ── Sidebar de sedes ───────────────────────────────────────────── */}
          <div className="space-y-2.5 order-2 lg:order-1">

            {/* Botón "Ver todas" — visible solo cuando hay una activa */}
            {activeSede && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={handleCloseInfoWindow}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-inter font-semibold text-sm transition-all duration-200 mb-1"
                style={{ background: '#EBF6FD', color: '#00AEEF', border: '1px solid #BAE6FD' }}
                onMouseEnter={e => e.currentTarget.style.background = '#DBEAFE'}
                onMouseLeave={e => e.currentTarget.style.background = '#EBF6FD'}
              >
                ← Ver todas las sedes
              </motion.button>
            )}

            {sedes.map((sede, i) => {
              const isActive = activeSede?.id === sede.id;
              return (
                <motion.button
                  key={sede.id}
                  {...fadeUp(0.07 * i)}
                  onClick={() => handleSedeClick(sede)}
                  className="w-full text-left rounded-2xl p-4 transition-all duration-250"
                  style={{
                    background: isActive ? '#EBF6FD' : '#FAFAFA',
                    border:     isActive ? '1.5px solid #00AEEF' : '1px solid #E2E8F0',
                    boxShadow:  isActive ? '0 4px 20px rgba(0,174,239,0.14)' : '0 1px 4px rgba(0,0,0,0.04)',
                    transform:  isActive ? 'translateX(2px)' : 'translateX(0)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#F5FBFF';
                      e.currentTarget.style.borderColor = '#BAE6FD';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#FAFAFA';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {/* Número de sede */}
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-manrope font-bold text-xs transition-all duration-200"
                      style={{
                        background: isActive ? '#00AEEF' : '#EBF6FD',
                        color:      isActive ? '#fff'    : '#00AEEF',
                      }}>
                      {sede.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-manrope font-bold text-sm truncate" style={{ color: '#0F172A' }}>
                        {sede.nombre}
                      </p>
                      <p className="font-inter text-xs truncate" style={{ color: '#94A3B8' }}>
                        {sede.distrito}
                      </p>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ background: '#00AEEF' }} />
                    )}
                  </div>

                  <p className="font-inter text-xs pl-11" style={{ color: '#64748B' }}>
                    {sede.direccion}
                  </p>

                  {/* Expandido solo cuando está activa */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pl-11 mt-3 space-y-2 overflow-hidden"
                    >
                      <div className="flex items-center gap-1.5">
                        <MdAccessTime className="text-xs shrink-0" style={{ color: '#00AEEF' }} />
                        <p className="font-inter text-xs" style={{ color: '#64748B' }}>{sede.horario}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MdPhone className="text-xs shrink-0" style={{ color: '#00AEEF' }} />
                        <p className="font-inter text-xs" style={{ color: '#64748B' }}>{sede.telefono}</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <a
                          href={buildDirectionsUrl(sede)}
                          target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-inter font-semibold text-xs text-white transition-all duration-200 hover:opacity-90"
                          style={{ background: 'linear-gradient(135deg,#00AEEF,#0077C8)' }}
                        >
                          <MdNavigation className="text-sm" /> Cómo llegar
                        </a>
                        <a
                          href={`https://wa.me/${sede.telefono.replace(/[^0-9]/g, '')}?text=Hola%2C%20quiero%20visitar%20la%20sede%20${encodeURIComponent(sede.nombre)}`}
                          target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-inter font-semibold text-xs transition-all duration-200"
                          style={{ background: 'rgba(37,211,102,0.1)', color: '#16a34a', border: '1px solid rgba(37,211,102,0.25)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.18)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
                        >
                          <FaWhatsapp />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}

            {/* Nota de coordenadas */}
            <p className="font-inter text-xs text-center pt-2" style={{ color: '#CBD5E1' }}>
              Coordenadas verificadas · Actualizado 2025
            </p>
          </div>

          {/* ── Mapa ───────────────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.15)}
            className="lg:col-span-2 order-1 lg:order-2 rounded-3xl overflow-hidden relative"
            style={{ height: '560px', border: '1px solid #BAE6FD', boxShadow: '0 8px 40px rgba(0,174,239,0.08)' }}
          >

            {/* ── Placeholder — sin API key ── */}
            {!GMAPS_KEY && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5"
                style={{ background: '#F8FAFC' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: '#EBF6FD', border: '1px solid #BAE6FD' }}>
                  <MdLocationOn className="text-4xl" style={{ color: '#00AEEF' }} />
                </div>
                <div className="text-center px-8">
                  <p className="font-manrope font-bold text-lg mb-1" style={{ color: '#0F172A' }}>Mapa interactivo</p>
                  <p className="font-inter text-sm" style={{ color: '#64748B' }}>
                    Agrega tu Google Maps API key en{' '}
                    <code className="px-1.5 py-0.5 rounded text-xs font-mono"
                      style={{ background: '#EBF6FD', color: '#0077C8' }}>
                      .env
                    </code>
                  </p>
                  <p className="font-inter text-xs mt-1" style={{ color: '#94A3B8' }}>
                    VITE_GMAPS_KEY=AIzaSy...
                  </p>
                </div>

                {/* Links directos a Maps para cada sede */}
                <div className="grid grid-cols-2 gap-3 w-full px-6 max-w-sm">
                  {sedes.map(s => (
                    <a key={s.id}
                      href={buildDirectionsUrl(s)}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-3 px-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ background: '#fff', border: '1px solid #BAE6FD', boxShadow: '0 2px 8px rgba(0,174,239,0.06)' }}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs"
                        style={{ background: '#00AEEF', color: '#fff' }}>
                        {s.id}
                      </div>
                      <div className="min-w-0">
                        <p className="font-inter text-xs font-semibold truncate" style={{ color: '#0F172A' }}>{s.nombre}</p>
                        <p className="font-inter truncate" style={{ fontSize: '0.6rem', color: '#94A3B8' }}>{s.direccion}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ── Error de carga ── */}
            {GMAPS_KEY && loadError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: '#FFF5F5' }}>
                <p className="font-manrope font-bold text-sm" style={{ color: '#EF4444' }}>
                  Error al cargar Google Maps
                </p>
                <p className="font-inter text-xs" style={{ color: '#94A3B8' }}>
                  Verifica que tu API key tenga habilitada Maps JavaScript API
                </p>
              </div>
            )}

            {/* ── Loading ── */}
            {GMAPS_KEY && !loadError && !isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: '#F8FAFC' }}>
                <div className="w-10 h-10 rounded-full border-3 animate-spin"
                  style={{ borderColor: '#E0F2FE', borderTopColor: '#00AEEF', borderWidth: '3px' }} />
                <p className="font-inter text-sm" style={{ color: '#64748B' }}>Cargando mapa...</p>
              </div>
            )}

            {/* ── Google Map activo ── */}
            {GMAPS_KEY && !loadError && isLoaded && (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={LIMA_CENTER}
                zoom={12}
                onLoad={onLoad}
                options={{
                  styles:              MAP_STYLES,
                  disableDefaultUI:    true,
                  zoomControl:         true,
                  zoomControlOptions:  window.google ? {
                    position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
                  } : undefined,
                  fullscreenControl:   true,
                  fullscreenControlOptions: window.google ? {
                    position: window.google.maps.ControlPosition.RIGHT_TOP,
                  } : undefined,
                  mapTypeControl:      false,
                  streetViewControl:   false,
                  // Limitar zoom máximo para no perder contexto urbano
                  maxZoom: 17,
                  minZoom: 10,
                  // Desactivar gestos en mobile que interrumpen el scroll de página
                  gestureHandling: 'cooperative',
                }}
              >
                {/* ── Marcadores — todos visibles siempre ── */}
                {sedes.map(sede => (
                  <Marker
                    key={sede.id}
                    position={{ lat: sede.lat, lng: sede.lng }}
                    onClick={() => handleSedeClick(sede)}
                    title={`${sede.nombre} — ${sede.direccion}`}
                    // zIndex elevado para el activo: queda encima de los demás
                    zIndex={activeSede?.id === sede.id ? 10 : 1}
                    icon={window.google
                      ? getMarkerIcon(window.google, activeSede?.id === sede.id)
                      : undefined
                    }
                    // Animación drop solo al cargar por primera vez
                    animation={window.google ? window.google.maps.Animation.DROP : undefined}
                  />
                ))}

                {/* ── InfoWindow — anclado exactamente al marcador ── */}
                {activeSede && (
                  <InfoWindow
                    // Posición exacta del marcador — sin offset artificial
                    position={{ lat: activeSede.lat, lng: activeSede.lng }}
                    // pixelOffset eleva el popup por encima del pin (24px = alto del círculo)
                    options={{ pixelOffset: window.google
                      ? new window.google.maps.Size(0, -20)
                      : undefined
                    }}
                    onCloseClick={handleCloseInfoWindow}
                  >
                    {/* Contenido del InfoWindow */}
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      padding: '6px 2px 2px',
                      minWidth: '220px',
                      maxWidth: '260px',
                    }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                          background: '#00AEEF', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: '#fff', fontWeight: 700,
                          fontSize: 11, fontFamily: 'Manrope, sans-serif',
                        }}>
                          {activeSede.id}
                        </div>
                        <div>
                          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: '#0F172A', margin: 0, lineHeight: 1.3 }}>
                            Ratel-case {activeSede.nombre}
                          </p>
                          <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0', lineHeight: 1.4 }}>
                            {activeSede.direccion}
                          </p>
                        </div>
                      </div>

                      {/* Info */}
                      <div style={{ borderTop: '1px solid #E0F2FE', paddingTop: 8, marginBottom: 10 }}>
                        <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 3px', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ color: '#00AEEF' }}>🕐</span> {activeSede.horario}
                        </p>
                        <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>
                          📌 {activeSede.referencia}
                        </p>
                      </div>

                      {/* CTA */}
                      <a
                        href={buildDirectionsUrl(activeSede)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          background: 'linear-gradient(135deg, #00AEEF, #0077C8)',
                          color: '#fff', fontSize: 11, fontWeight: 600,
                          padding: '7px 14px', borderRadius: 8, textDecoration: 'none',
                          width: '100%', boxSizing: 'border-box',
                        }}
                      >
                        🗺️ Cómo llegar — {activeSede.nombre}
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}

            {/* ── Leyenda superpuesta — siempre visible ── */}
            {GMAPS_KEY && isLoaded && (
              <div className="absolute bottom-4 left-4 flex items-center gap-3 px-3 py-2 rounded-xl pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #E0F2FE', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#00AEEF', border: '2px solid #fff', boxShadow: '0 0 0 1px #00AEEF' }} />
                  <span className="font-inter text-xs" style={{ color: '#64748B' }}>Sede activa</span>
                </div>
                <div className="w-px h-3" style={{ background: '#E0F2FE' }} />
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#64B5D6', border: '2px solid #fff' }} />
                  <span className="font-inter text-xs" style={{ color: '#94A3B8' }}>Otras sedes</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
