import React from 'react'
import { motion } from 'framer-motion'

// ── Étoile de David SVG ───────────────────────────────────
function StarOfDavid({ size = 32, color = 'currentColor', opacity = 0.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <polygon points="50,10 90,77 10,77" stroke={color} strokeWidth="5" fill="none"/>
      <polygon points="50,90 10,23 90,23" stroke={color} strokeWidth="5" fill="none"/>
    </svg>
  )
}

export default function Footer({ config }) {
  const { bride, groom } = config

  return (
    <footer className="relative bg-[var(--color-text)] text-white overflow-hidden">
      {/* ── Fond décoratif ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5"
          style={{ background: `radial-gradient(circle, ${config.colors.primary}, transparent)` }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-5"
          style={{ background: `radial-gradient(circle, ${config.colors.primary}, transparent)` }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-10">

        {/* ── Noms ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <StarOfDavid color={config.colors.primary} opacity={0.35} size={36} />

          <h2
            className="font-serif-elegant font-light text-white mt-4 leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            {bride}
            <span className="text-[var(--color-primary)] mx-4 font-thin">&</span>
            {groom}
          </h2>
        </motion.div>

        {/* ── Séparateur ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-10" />

        {/* ── Bénédiction hébraïque ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-10"
        >
          <p
            className="font-hebrew text-2xl md:text-3xl text-[var(--color-primary)] leading-relaxed"
            dir="rtl"
            lang="he"
          >
            בְּשָׁעָה טוֹבָה וּמוּצְלַחַת
          </p>
          <p className="font-serif-elegant text-base italic text-white/50 mt-2">
            « En une heure heureuse et couronnée de succès »
          </p>
        </motion.div>

        {/* ── Séparateur fin ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* ── Bas : message ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <p className="font-serif-elegant text-base italic text-white/40 tracking-wide">
            On vous attend nombreux et comptons sur votre présence
          </p>
          <p className="font-sans text-xs text-white/25 tracking-widest uppercase mt-2">
            {bride} & {groom} · 2026
          </p>
        </motion.div>

      </div>
    </footer>
  )
}
