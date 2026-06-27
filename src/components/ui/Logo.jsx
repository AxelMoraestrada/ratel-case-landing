/**
 * Logo oficial de Ratel-case
 * 
 * Props:
 *   variant: "color" | "white" | "original"
 *     - "color"    → PNG transparente con celeste original (para fondos claros o semitransparentes)
 *     - "white"    → PNG blanco (para fondos oscuros navy)
 *     - "original" → PNG original con fondo gris (para uso externo)
 *   size: número en px para el alto (ancho se ajusta automáticamente, el logo es cuadrado)
 *   showTagline: mostrar el tagline debajo del logo
 *   className: clases adicionales
 * 
 * Para reemplazar el logo: sobreescribe los archivos en /public/
 *   - logo-transparent.png  → versión sin fondo
 *   - logo-white.png        → versión en blanco puro
 *   - logo-original.png     → archivo original
 */
export default function Logo({ variant = 'color', size = 40, showTagline = false, className = '' }) {
  const src = {
    color:    '/logo-transparent.png',
    white:    '/logo-white.png',
    original: '/logo-original.png',
  }[variant] || '/logo-transparent.png';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={src}
        alt="Ratel-case logo"
        width={size}
        height={size}
        loading="eager"
        style={{ width: size, height: size, objectFit: 'contain', imageRendering: 'crisp-edges' }}
      />
      {showTagline && (
        <div className="leading-tight">
          <span className="font-manrope font-bold text-white text-base tracking-wide block">
            Ratel-<span style={{ color: '#29ABE2' }}>case</span>
          </span>
          <span className="font-inter text-white/45 block" style={{ fontSize: '0.6rem', letterSpacing: '0.06em' }}>
            Protección y tecnología para tu celular
          </span>
        </div>
      )}
    </div>
  );
}
