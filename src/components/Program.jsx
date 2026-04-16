import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── Badge catégorie ───────────────────────────────────────
function CategoryBadge({ category }) {
  const styles = {
    ceremony: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20',
    reception: 'bg-[var(--color-secondary)]/15 text-sage-dark border border-sage-DEFAULT/30',
  }
  const labels = {
    ceremony: 'Cérémonie',
    reception: 'Réception',
  }
  return (
    <span className={`text-[10px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full ${styles[category] || ''}`}>
      {labels[category] || category}
    </span>
  )
}

// ── Étape individuelle ────────────────────────────────────
function ProgramStep({ item, index, isActive, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      id={item.id || undefined}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative"
    >
      {/* Ligne de connexion */}
      {index > 0 && (
        <div className="absolute left-[31px] -top-6 w-px h-6 bg-gradient-to-b from-[var(--color-primary)]/30 to-[var(--color-primary)]/10" />
      )}

      <button
        onClick={onClick}
        className={`w-full text-left group transition-all duration-300 ${
          isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
        }`}
      >
        <div
          className={`flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 ${
            isActive
              ? 'bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
              : 'hover:bg-white/60'
          }`}
        >
          {/* Icône + heure */}
          <div className="flex flex-col items-center gap-1 min-w-[52px]">
            <div
              className={`w-[52px] h-[52px] rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-[var(--color-primary)] shadow-[0_4px_16px_rgba(201,169,110,0.35)]'
                  : 'bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20'
              }`}
            >
              {item.icon}
            </div>
            <span className="font-sans text-[10px] tracking-wider text-[var(--color-text)]/40 font-medium">
              {item.time}
            </span>
          </div>

          {/* Contenu textuel */}
          <div className="flex-1 pt-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-serif-elegant text-xl font-medium text-[var(--color-text)] leading-tight">
                {item.event}
              </h3>
              {item.category && <CategoryBadge category={item.category} />}
            </div>

            {/* Nom hébreu */}
            {item.eventHebrew && (
              <p
                className="font-hebrew text-base text-[var(--color-primary)] mb-1.5"
                dir="rtl"
                lang="he"
              >
                {item.eventHebrew}
              </p>
            )}

            {/* Description (visible si actif) */}
            <motion.div
              initial={false}
              animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="font-sans text-sm text-[var(--color-text)]/60 leading-relaxed pt-1">
                {item.description}
              </p>
            </motion.div>

            {/* Hint "cliquer" */}
            {!isActive && item.description && (
              <p className="font-sans text-xs text-[var(--color-primary)]/50 mt-1">
                Voir les détails →
              </p>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function Program({ config }) {
  const [activeStep, setActiveStep] = useState(2) // Houpa ouvert par défaut
  const { program, date, dateDisplay, dateHebrew, venue } = config

  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const toggleStep = (index) => {
    setActiveStep(prev => prev === index ? null : index)
  }

  return (
    <section className="section-padding bg-ivory-dark">
      <div className="max-w-3xl mx-auto">

        {/* ── En-tête ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">
            Déroulé de la journée
          </p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl font-light text-[var(--color-text)]">
            Programme
          </h2>

          <div className="divider-ornament mt-6 mb-6 max-w-xs mx-auto">
            <span className="font-serif-elegant text-lg italic text-[var(--color-text)]/40 px-4">
              {dateDisplay}
            </span>
          </div>

          {/* Date hébraïque */}
          <p
            className="font-hebrew text-lg text-[var(--color-primary)] mb-2"
            dir="rtl"
            lang="he"
          >
            {dateHebrew}
          </p>

        </motion.div>

        {/* ── Liste des étapes ── */}
        <div className="flex flex-col gap-4">
          {program.map((item, index) => (
            <ProgramStep
              key={index}
              item={item}
              index={index}
              isActive={activeStep === index}
              onClick={() => toggleStep(index)}
            />
          ))}
        </div>

        {/* ── Note bas ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center font-sans text-xs text-[var(--color-text)]/35 mt-12 leading-relaxed"
        >
          Les horaires sont donnés à titre indicatif et peuvent être ajustés.
          <br />
          Cliquez sur chaque étape pour découvrir les détails.
        </motion.p>

      </div>
    </section>
  )
}
