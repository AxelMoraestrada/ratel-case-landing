import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { MdLocationOn, MdAccessTime, MdPhone } from 'react-icons/md';

const redes = [
  { Icon: FaInstagram, href: 'https://www.instagram.com/ratel_case?igsh=dGR4M3ppNTZybnZy',  label: 'Instagram' },
  { Icon: FaFacebookF, href: 'https://www.facebook.com/share/1FeEfkwoHk/',                   label: 'Facebook'  },
  { Icon: FaTiktok,    href: 'https://www.tiktok.com/@ratel_case?_r=1&_t=ZS-97NfBwCJQIf',   label: 'TikTok'    },
  { Icon: FaWhatsapp,  href: 'https://wa.me/51967200712',                                     label: 'WhatsApp'  },
];

const links = [
  { label: 'Inicio',     href: '#hero' },
  { label: 'Nosotros',   href: '#nosotros' },
  { label: 'Productos',  href: '#productos' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Sedes',      href: '#sedes' },
  { label: 'Contacto',   href: '#contacto' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', borderTop: '1px solid rgba(0,174,239,0.2)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#hero" className="flex items-center gap-3 mb-5 group w-fit">
              <img src="/logo-transparent.png" alt="Logo Ratel-case"
                width={44} height={44} loading="lazy"
                style={{ width: 44, height: 44, objectFit: 'contain', filter: 'brightness(0) invert(1)', transition: 'filter 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1) saturate(1.1)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(0) invert(1)'}
              />
              <div className="leading-tight">
                <span className="font-manrope font-bold text-white text-base tracking-wide block">
                  Ratel-<span style={{ color: '#00AEEF' }}>case</span>
                </span>
                <span className="font-inter block" style={{ fontSize: '0.58rem', letterSpacing: '0.07em', color: '#64748B' }}>
                  Protección y tecnología
                </span>
              </div>
            </a>

            <p className="text-sm font-inter leading-relaxed mb-6" style={{ color: '#64748B' }}>
              Tu tienda de confianza para accesorios y tecnología en Lima. Calidad, garantía y atención especializada en 4 sedes.
            </p>

            <div className="flex items-center gap-3">
              {redes.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,174,239,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,174,239,0.4)'; e.currentTarget.style.color = '#00AEEF'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#64748B'; }}>
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-manrope font-semibold text-white text-sm mb-5">Navegación</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm font-inter transition-colors duration-200"
                    style={{ color: '#64748B' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#00AEEF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#64748B'}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-manrope font-semibold text-white text-sm mb-5">Contacto</h4>
            <ul className="space-y-4">
              {[
                { Icon: MdPhone,      text: '+51 967 200 712' },
                { Icon: MdLocationOn, text: 'Lima, Perú · 4 sedes' },
                { Icon: MdAccessTime, text: 'Lun–Sáb: 9am–8pm\nDom: 10am–6pm' },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="mt-0.5 shrink-0" style={{ color: '#00AEEF' }} />
                  <span className="text-sm font-inter" style={{ color: '#64748B', whiteSpace: 'pre-line' }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp */}
          <div>
            <h4 className="font-manrope font-semibold text-white text-sm mb-5">¿Tienes dudas?</h4>
            <p className="text-sm font-inter mb-5 leading-relaxed" style={{ color: '#64748B' }}>
              Escríbenos por WhatsApp y te atendemos al instante.
            </p>

            <div className="mt-6 space-y-2">
              <p className="font-inter text-xs uppercase tracking-widest mb-3" style={{ color: '#334155' }}>Nuestras sedes</p>
              {['Jesús María','Independencia','Lima Centro','San Martín de Porres'].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#00AEEF' }} />
                  <span className="font-inter text-xs" style={{ color: '#64748B' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-inter text-xs" style={{ color: '#334155' }}>
            © {new Date().getFullYear()} Ratel-case. Todos los derechos reservados.
          </p>
          <p className="font-inter text-xs" style={{ color: '#334155' }}>Hecho con ❤️ en Lima, Perú 🇵🇪</p>
        </div>
      </div>
    </footer>
  );
}
