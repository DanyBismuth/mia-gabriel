import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Étoiles ───────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--color-primary)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

// ── Carte hébergement ─────────────────────────────────────
function AccommodationCard({ hotel, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="card-float bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-ivory-dark">
        <img
          src={hotel.photo}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background = 'linear-gradient(135deg, #F0EDE6, #E8D5A3)'
          }}
        />
        {/* Badge recommandé */}
        {hotel.recommended && (
          <div className="absolute top-3 left-3">
            <span className="bg-[var(--color-primary)] text-white font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md">
              ⭐ Recommandé
            </span>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-6">
        {/* Nom + étoiles */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-serif-elegant text-xl font-medium text-[var(--color-text)] leading-tight">
            {hotel.name}
          </h3>
          <Stars count={hotel.stars} />
        </div>

        <p className="font-sans text-sm text-[var(--color-text)]/60 leading-relaxed mb-4">
          {hotel.description}
        </p>

        {/* Infos */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 mt-auto">
          <span className="flex items-center gap-1.5 font-sans text-xs text-[var(--color-text)]/50">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s-8-7.5-8-12a8 8 0 0116 0c0 4.5-8 12-8 12z"/><circle cx="12" cy="10" r="2"/>
            </svg>
            {hotel.distance}
          </span>
          {hotel.priceFrom && (
            <span className="flex items-center gap-1.5 font-sans text-xs text-[var(--color-text)]/50">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
              À partir de {hotel.priceFrom}
            </span>
          )}
        </div>

        {/* Code promo */}
        {hotel.promoCode && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-[var(--color-accent)]/30 rounded-lg border border-[var(--color-primary)]/15">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span className="font-sans text-xs text-[var(--color-text)]/60">
              Code promo :{' '}
              <code className="font-mono font-semibold text-[var(--color-primary)] tracking-wider">
                {hotel.promoCode}
              </code>
            </span>
          </div>
        )}

        {/* CTA */}
        <a
          href={hotel.bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center py-3 px-5 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-xl ${
            hotel.recommended
              ? 'bg-[var(--color-primary)] text-white hover:bg-[#A07840] shadow-[0_4px_16px_rgba(201,169,110,0.25)]'
              : 'border border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
          }`}
        >
          Réserver
        </a>
      </div>
    </motion.div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function Accommodations({ config }) {
  const { accommodations } = config
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="section-padding bg-ivory-dark">
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
            Où dormir
          </p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl font-light text-[var(--color-text)]">
            Hébergements
          </h2>
          <div className="divider-ornament mt-6 max-w-sm mx-auto">
            <span className="font-serif-elegant text-base italic text-[var(--color-text)]/40 px-4">
              Nos sélections à proximité du château
            </span>
          </div>

        </motion.div>

        {/* ── Grille ── */}
        <div className={`grid gap-7 ${
          accommodations.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
          accommodations.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {accommodations.map((hotel, index) => (
            <AccommodationCard key={index} hotel={hotel} index={index} />
          ))}
        </div>

        {/* ── Note contact ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center font-sans text-xs text-[var(--color-text)]/35 mt-12"
        >
          Pour toute question sur l'hébergement, contactez-nous via le formulaire RSVP.
        </motion.p>

      </div>
    </section>
  )
}
