import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── Icône chevron ─────────────────────────────────────────
function ChevronIcon({ open }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

// ── Item accordéon ────────────────────────────────────────
function FAQItem({ item, index, isOpen, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`border-b border-[var(--color-primary)]/12 last:border-0 transition-colors duration-300 ${
        isOpen ? 'bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-3 border-transparent' : 'mb-0'
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-4 text-left px-5 py-5 transition-colors ${
          isOpen ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]/80 hover:text-[var(--color-text)]'
        }`}
      >
        <span className="font-serif-elegant text-lg font-light leading-snug">
          {item.question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-[var(--color-text)]/60 leading-relaxed px-5 pb-5">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function FAQ({ config }) {
  const { faq, bride, groom } = config
  const [openIndex, setOpenIndex] = useState(null)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const toggle = (index) => setOpenIndex(prev => prev === index ? null : index)

  // Groupement visuel : cérémonie vs pratique
  const ceremonyQuestions = faq.slice(0, Math.ceil(faq.length / 2))
  const practicalQuestions = faq.slice(Math.ceil(faq.length / 2))

  return (
    <section className="section-padding bg-[var(--color-bg)]">
      <div className="max-w-2xl mx-auto">

        {/* ── En-tête ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">
            Questions
          </p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl font-light text-[var(--color-text)]">
            FAQ
          </h2>
          <div className="divider-ornament mt-6 max-w-xs mx-auto">
            <span className="font-serif-elegant text-base italic text-[var(--color-text)]/40 px-4">
              Tout ce que vous souhaitez savoir
            </span>
          </div>
        </motion.div>

        {/* ── Liste complète ── */}
        <div className="bg-ivory-dark rounded-3xl p-2 md:p-4">
          {faq.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>

        {/* ── CTA contact ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-12 p-8 bg-white rounded-2xl border border-[var(--color-primary)]/15 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
        >
          <p
            className="font-hebrew text-xl text-[var(--color-primary)] mb-2"
            dir="rtl"
            lang="he"
          >
            שְׁאֵלוֹת נוֹסָפוֹת?
          </p>
          <p className="font-serif-elegant text-lg font-light text-[var(--color-text)] mb-1">
            Vous avez d'autres questions ?
          </p>
          <p className="font-sans text-sm text-[var(--color-text)]/50 mb-5">
            {bride} & {groom} seront heureux de vous répondre.
          </p>
          <button
            onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] font-sans text-xs tracking-widest uppercase hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 rounded-xl"
          >
            Nous écrire via le RSVP
          </button>
        </motion.div>

      </div>
    </section>
  )
}
