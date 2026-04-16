import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Hook d'animation au scroll ────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return { ref, isInView, delay }
}

// ── Ligne de timeline ─────────────────────────────────────
function TimelineItem({ item, index, isLast }) {
  const { ref, isInView } = useReveal(index * 0.15)
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* ── Colonne contenu ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-12 md:pl-0`}
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] transition-shadow duration-500">
          {/* Photo */}
          <div className="aspect-[4/3] overflow-hidden bg-ivory-dark">
            <img
              src={item.photo}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                // Placeholder si image absente
                e.target.style.display = 'none'
                e.target.parentElement.style.background = 'linear-gradient(135deg, #F0EDE6, #E8D5A3)'
              }}
            />
          </div>

          {/* Texte */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3" style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-primary)] font-medium">
                {item.year}
              </span>
            </div>
            <h3 className="font-serif-elegant text-2xl font-light text-[var(--color-text)] mb-3 leading-tight">
              {item.title}
            </h3>
            <p className="font-sans text-sm text-[var(--color-text)]/60 leading-relaxed">
              {item.text}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Axe central (desktop seulement) ── */}
      <div className="hidden md:flex w-2/12 flex-col items-center">
        {/* Nœud */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="relative z-10 w-10 h-10 rounded-full border-2 border-[var(--color-primary)] bg-white flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
        </motion.div>
        {/* Ligne de connexion */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
            className="flex-1 w-px bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] mt-2 origin-top"
            style={{ minHeight: '80px' }}
          />
        )}
      </div>

      {/* ── Axe mobile (ligne gauche) ── */}
      <div className="absolute left-4 top-0 bottom-0 flex flex-col items-center md:hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="w-6 h-6 rounded-full border-2 border-[var(--color-primary)] bg-white flex items-center justify-center mt-6"
        >
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
        </motion.div>
        {!isLast && <div className="flex-1 w-px bg-[var(--color-primary)]/20 mt-1" />}
      </div>

      {/* ── Colonne vide (côté opposé, desktop) ── */}
      <div className="hidden md:block w-5/12" />
    </div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function OurStory({ config }) {
  const { bride, groom, ourStory } = config
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="section-padding bg-[var(--color-bg)]">
      <div className="max-w-5xl mx-auto">

        {/* ── En-tête ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">
            Histoire
          </p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-text)] leading-tight">
            {bride} & {groom}
          </h2>
          <div className="divider-ornament mt-6 max-w-xs mx-auto">
            <span className="font-serif-elegant text-xl italic text-[var(--color-primary)]/70 px-4">
              Notre histoire
            </span>
          </div>
          <p className="mt-6 font-sans text-sm text-[var(--color-text)]/50 max-w-md mx-auto leading-relaxed">
            De notre première rencontre jusqu'au jour de notre Houpa,
            voici les chapitres qui nous ont menés jusqu'ici.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="flex flex-col gap-10 md:gap-16">
          {ourStory.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isLast={index === ourStory.length - 1}
            />
          ))}
        </div>

        {/* ── Conclusion ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <p
            className="font-hebrew text-2xl md:text-3xl text-[var(--color-primary)]"
            dir="rtl"
            lang="he"
          >
            מַזָּל טוֹב
          </p>
          <p className="font-serif-elegant text-lg italic text-[var(--color-text)]/50 mt-2">
            Et maintenant, la plus belle page de notre histoire commence.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
