import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const StarOfDavid = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
    <polygon points="50,8 90,75 10,75" fill="none" stroke="currentColor" strokeWidth="6" />
    <polygon points="50,92 10,25 90,25" fill="none" stroke="currentColor" strokeWidth="6" />
  </svg>
)

const navLinks = [
  { href: '#notre-histoire', label: 'Notre histoire'  },
  { href: '#mairie',         label: 'Mairie'           },
  { href: '#houpa',          label: 'Houpa'            },
  { href: '#shabbat-hatan',  label: 'Shabbat Hatan'   },
  { href: '#lieu',           label: 'Lieu'             },
  { href: '#hebergements',   label: 'Hébergement'      },
  { href: '#informations',   label: 'Réponse'          },
]

// ── Icône hamburger / croix ───────────────────────────────
function HamburgerIcon({ open, color }) {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: color }}
        className="block w-6 h-[1.5px] rounded-full"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        style={{ backgroundColor: color }}
        className="block w-6 h-[1.5px] rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: color }}
        className="block w-6 h-[1.5px] rounded-full"
      />
    </div>
  )
}

export default function Navigation({ config }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquer le scroll du body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const iconColor = menuOpen ? '#2C2C2C' : (scrolled ? '#2C2C2C' : '#ffffff')

  return (
    <>
      {/* ── Barre de navigation ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !menuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : menuOpen
            ? 'bg-transparent py-4'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => handleLinkClick(e, '#accueil')}
            className="flex items-center gap-2 z-10"
          >
            <StarOfDavid className={`transition-colors duration-300 ${
              menuOpen ? 'text-[var(--color-primary)]' : scrolled ? 'text-[var(--color-primary)]' : 'text-white/80'
            }`} />
            <span className={`font-serif-elegant font-light text-base md:text-lg tracking-wide transition-colors duration-300 ${
              menuOpen ? 'text-[var(--color-text)]' : scrolled ? 'text-[var(--color-text)]' : 'text-white'
            }`}>
              {config.bride} & {config.groom}
            </span>
          </a>

          {/* Bouton hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-10 p-2 -mr-1 rounded-lg focus:outline-none"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <HamburgerIcon open={menuOpen} color={iconColor} />
          </button>
        </div>
      </motion.nav>

      {/* ── Menu plein écran ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fond blanc */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-white"
            />

            {/* Contenu du menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center px-8"
            >
              {/* Ligne dorée décorative haut */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-8 h-px bg-[var(--color-primary)]/40" />

              {/* Liens */}
              <nav className="flex flex-col items-center gap-1 w-full max-w-xs">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                    className={`w-full text-center py-3.5 font-serif-elegant font-light transition-colors duration-200 border-b border-[var(--color-primary)]/8 last:border-0 ${
                      link.label === 'Réponse'
                        ? 'text-[var(--color-primary)] text-2xl mt-2'
                        : 'text-[var(--color-text)] text-2xl hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Noms en bas */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-10 font-serif-elegant text-sm italic text-[var(--color-text)]/30"
              >
                {config.bride} & {config.groom} · 2026
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
