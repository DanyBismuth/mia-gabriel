import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Icône MapPin ──────────────────────────────────────────
const IconMapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-7.5-8-12a8 8 0 0116 0c0 4.5-8 12-8 12z"/><circle cx="12" cy="10" r="2"/>
  </svg>
)

// ── Séparateur fin doré ───────────────────────────────────
function GoldLine() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-primary)]/30" />
      <div className="w-1 h-1 rounded-full bg-[var(--color-primary)]/50" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--color-primary)]/30" />
    </div>
  )
}

// ── Bloc date/heure/lieu ──────────────────────────────────
function InfoLine({ icon, children }) {
  return (
    <div className="flex items-center justify-center gap-2 text-[var(--color-text)]/60">
      {icon && <span className="text-[var(--color-primary)]">{icon}</span>}
      <span className="font-sans text-sm tracking-wide">{children}</span>
    </div>
  )
}

// ── Carte de cérémonie ────────────────────────────────────
function CeremonyCard({ ceremony, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      id={ceremony.id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden"
    >
      {/* ── Bandeau supérieur coloré ── */}
      <div
        className="h-1.5"
        style={{ background: `linear-gradient(to right, transparent, var(--color-primary), transparent)` }}
      />

      <div className="p-8 md:p-12">
        {/* Surtitre */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] text-center mb-4"
        >
          {ceremony.surtitle}
        </motion.p>

        {/* Titre principal */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="font-serif-elegant text-4xl md:text-5xl font-light text-[var(--color-text)] text-center leading-tight"
        >
          {ceremony.title}
        </motion.h2>

        {/* Nom hébreu si présent */}
        {ceremony.titleHebrew && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="font-hebrew text-2xl text-[var(--color-primary)]/70 text-center mt-2"
            dir="rtl"
            lang="he"
          >
            {ceremony.titleHebrew}
          </motion.p>
        )}

        <GoldLine />

        {/* Corps de la carte — rendu depuis le contenu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-center space-y-3"
        >
          {ceremony.content}
        </motion.div>

        {/* Lien Maps */}
        {ceremony.mapsLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.7 }}
            className="flex justify-center mt-8"
          >
            <a
              href={ceremony.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-primary)]/40 text-[var(--color-primary)] font-sans text-xs tracking-widest uppercase rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
            >
              <IconMapPin />
              Voir sur Maps
            </a>
          </motion.div>
        )}
      </div>

      {/* ── Bandeau inférieur ── */}
      <div
        className="h-1.5"
        style={{ background: `linear-gradient(to right, transparent, var(--color-primary), transparent)` }}
      />
    </motion.article>
  )
}

// ── Composant principal ───────────────────────────────────
export default function Ceremonies({ config }) {
  const { bride, groom, ceremonies } = config
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="section-padding bg-ivory-dark">
      <div className="max-w-2xl mx-auto">

        {/* ── En-tête global ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">
            Les célébrations
          </p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl font-light text-[var(--color-text)]">
            {bride} & {groom}
          </h2>
          <div className="divider-ornament mt-6 max-w-xs mx-auto">
            <span className="font-serif-elegant text-base italic text-[var(--color-text)]/40 px-4">
              Nous avons hâte de partager ces moments avec vous
            </span>
          </div>
        </motion.div>

        {/* ── Cards cérémonies ── */}
        <div className="flex flex-col gap-10">
          {ceremonies.map((ceremony, index) => (
            <CeremonyCard key={ceremony.id} ceremony={ceremony} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
