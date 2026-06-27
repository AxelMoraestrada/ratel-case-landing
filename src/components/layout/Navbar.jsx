import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Inicio',    href: '#hero' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Productos', href: '#productos' },
  { label: 'Sedes',     href: '#sedes' },
  { label: 'Contacto',  href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:     scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom:   scrolled ? '1px solid #E0F2FE' : 'none',
        boxShadow:      scrolled ? '0 2px 20px rgba(0,174,239,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">

        {/* ── Logo ── */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="/logo-transparent.png"
            alt="Logo Ratel-case"
            width={52} height={52}
            loading="eager"
            style={{ width: 52, height: 52, objectFit: 'contain', transition: 'transform 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div className="leading-tight">
            <span className="font-manrope font-bold text-base tracking-wide block" style={{ color: '#0F172A' }}>
              Ratel-<span style={{ color: '#00AEEF' }}>case</span>
            </span>
            <span className="font-inter block" style={{ fontSize: '0.58rem', letterSpacing: '0.07em', color: '#94A3B8' }}>
              Protección y tecnología
            </span>
          </div>
        </a>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              className="relative text-sm font-inter font-medium transition-colors duration-200 group"
              style={{ color: '#64748B' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00AEEF'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748B'}>
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: '#00AEEF' }} />
            </a>
          ))}
        </div>

        {/* ── CTA ── */}
        <a href="#sedes" className="hidden md:inline-flex btn-primary">Ver Tiendas</a>

        {/* ── Mobile toggle ── */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} className="md:hidden text-2xl p-1" style={{ color: '#0F172A' }}>
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #E0F2FE' }}>
            <div className="px-5 py-6 flex flex-col gap-1">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className="font-inter font-medium py-3 px-4 rounded-xl transition-all text-sm"
                  style={{ color: '#64748B' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00AEEF'; e.currentTarget.style.background = '#F5FBFF'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.background = 'transparent'; }}>
                  {link.label}
                </a>
              ))}
              <a href="#sedes" onClick={() => setMenuOpen(false)} className="btn-primary mt-3 justify-center">
                Ver Tiendas
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
