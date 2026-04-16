import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Icônes inline SVG ─────────────────────────────────────
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-7.5-8-12a8 8 0 0116 0c0 4.5-8 12-8 12z"/><circle cx="12" cy="10" r="2"/>
  </svg>
)
const IconCar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 01-2-2v-4l3-6h12l3 6v4a2 2 0 01-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
  </svg>
)
const IconTrain = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16"/><path d="M8 17l-2 4"/><path d="M16 17l2 4"/><path d="M9 3v8"/><path d="M15 3v8"/>
  </svg>
)

// ── Bloc infos pratiques ──────────────────────────────────
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[var(--color-primary)]/10 last:border-0">
      <span className="mt-0.5 text-[var(--color-primary)]">{icon}</span>
      <div>
        <span className="font-sans text-xs tracking-wider uppercase text-[var(--color-text)]/40 block">{label}</span>
        <span className="font-sans text-sm text-[var(--color-text)]/80 leading-snug">{value}</span>
      </div>
    </div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function Venue({ config }) {
  const { venue } = config
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="section-padding bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto">

        {/* ── En-tête ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">
            Lieu de réception
          </p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl font-light text-[var(--color-text)]">
            {venue.name}
          </h2>
          <div className="divider-ornament mt-6 max-w-xs mx-auto">
            <span className="font-serif-elegant text-lg italic text-[var(--color-text)]/40 px-4">
              {venue.city}
            </span>
          </div>
        </motion.div>

        {/* ── Grid photo + infos + carte ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Colonne gauche : infos */}
          <div className="flex flex-col gap-6">

            {/* Infos pratiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <h3 className="font-serif-elegant text-xl font-medium text-[var(--color-text)] mb-4">
                Informations pratiques
              </h3>

              <InfoRow
                icon={<IconMapPin />}
                label="Adresse complète"
                value={venue.address}
              />
              <InfoRow
                icon={<IconCar />}
                label="Parking"
                value={venue.parking}
              />
              <InfoRow
                icon={<IconTrain />}
                label="Accès & transports"
                value={venue.access}
              />

            </motion.div>

            {/* Bouton GPS */}
            <motion.a
              href={venue.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-primary)] text-white font-sans text-sm tracking-[0.15em] uppercase rounded-xl hover:bg-[#A07840] transition-colors duration-300 shadow-[0_4px_20px_rgba(201,169,110,0.3)]"
            >
              <IconMapPin />
              Ouvrir dans Google Maps
            </motion.a>
          </div>

          {/* Colonne droite : carte */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)] h-[500px] lg:h-full min-h-[400px] lg:sticky lg:top-28"
          >
            {venue.mapsEmbed ? (
              <iframe
                src={venue.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Carte — ${venue.name}`}
              />
            ) : (
              /* Fallback si pas d'embed Google Maps */
              <div className="w-full h-full bg-ivory-dark flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="text-5xl">🗺️</span>
                <p className="font-serif-elegant text-xl text-[var(--color-text)]/50">{venue.name}</p>
                <p className="font-sans text-sm text-[var(--color-text)]/40">{venue.address}</p>
                <a
                  href={venue.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-5 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] font-sans text-xs tracking-widest uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  Voir sur Maps
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
