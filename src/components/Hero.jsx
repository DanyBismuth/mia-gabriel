import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ── Compte à rebours ──────────────────────────────────────
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculate = () => {
      const now = Date.now()
      const diff = target - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calculate()
    const id = setInterval(calculate, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

// ── Unité du countdown ────────────────────────────────────
function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[52px] md:min-w-[70px]">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-serif-elegant text-4xl md:text-6xl font-light text-white leading-none tabular-nums"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="font-sans text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase text-white/60 mt-1 md:mt-2">
        {label}
      </span>
    </div>
  )
}

// ── Scroll indicator ──────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-2 text-white/50"
    >
      <span className="font-sans text-xs tracking-widest uppercase">Défiler</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
        <motion.rect
          x="6.5" y="5" width="3" height="6" rx="1.5" fill="currentColor"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  )
}

// ── Ornement floral SVG ────────────────────────────────────
function FloralDivider({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/40" />
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-white/50">
        <path d="M20 2 C15 8, 5 8, 2 10 C5 12, 15 12, 20 18 C25 12, 35 12, 38 10 C35 8, 25 8, 20 2Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.4"/>
        <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.8"/>
        <circle cx="6" cy="10" r="1.5" fill="currentColor" opacity="0.5"/>
        <circle cx="34" cy="10" r="1.5" fill="currentColor" opacity="0.5"/>
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/40" />
    </div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function Hero({ config }) {
  const { bride, groom, date, dateDisplay, dateHebrew, dayOfWeek, venue } = config
  const countdown = useCountdown(date)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleRSVP = () => {
    const el = document.querySelector('#informations')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* ── Fond parallax ─────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Fond profond — visible si photo absente */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2e1f0e 40%, #1c1a12 100%)' }} />
        {/* Photo couple en arrière-plan */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: `url(${config.photos.hero})` }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        {/* Overlay couleur dorée */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(ellipse at center top, ${config.colors.primary}50, transparent 65%)` }}
        />
      </motion.div>

      {/* ── Contenu centré ────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Ornement */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <FloralDivider />
        </motion.div>

        {/* Noms */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif-elegant font-light text-white mt-6 mb-2 leading-none tracking-wide"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
        >
          {bride}
          <span className="text-[var(--color-accent)] mx-4 font-thin">&</span>
          {groom}
        </motion.h1>

        {/* Date civile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col items-center gap-2 mt-4"
        >
          <p className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-white/70">
            {dayOfWeek} — {dateDisplay}
          </p>

          {/* Date hébraïque */}
          <p
            className="font-hebrew text-lg md:text-xl text-[var(--color-accent)] tracking-wide"
            dir="rtl"
            lang="he"
          >
            {dateHebrew}
          </p>

          {/* Lieu */}
          <p className="font-sans text-sm text-white/55 tracking-wider mt-1">
            {venue.name} · {venue.city}
          </p>

        </motion.div>

        {/* Ornement bas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-6"
        >
          <FloralDivider />
        </motion.div>

        {/* Compte à rebours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex items-end gap-3 md:gap-10 mt-8 md:mt-10"
        >
          <CountUnit value={countdown.days}    label="jours" />
          <span className="font-serif-elegant text-3xl text-white/30 mb-2 font-light">:</span>
          <CountUnit value={countdown.hours}   label="heures" />
          <span className="font-serif-elegant text-3xl text-white/30 mb-2 font-light">:</span>
          <CountUnit value={countdown.minutes} label="minutes" />
          <span className="font-serif-elegant text-3xl text-white/30 mb-2 font-light">:</span>
          <CountUnit value={countdown.seconds} label="secondes" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12"
        >
          <button
            onClick={handleRSVP}
            className="px-8 py-3.5 bg-[var(--color-primary)] text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-[#A07840] transition-colors duration-300"
          >
            Confirmer ma présence
          </button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ScrollIndicator />
      </motion.div>

    </div>
  )
}
