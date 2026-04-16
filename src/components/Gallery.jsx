import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  // Fermeture au clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // Bloquer le scroll du body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[85vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photos[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </motion.div>

      {/* Fermer */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Fermer"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Précédent */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3"
          aria-label="Photo précédente"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}

      {/* Suivant */}
      {currentIndex < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3"
          aria-label="Photo suivante"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}

      {/* Compteur */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation() }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-white w-4' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ── Photo individuelle ────────────────────────────────────
// Hauteurs variées pour l'effet masonry
const heights = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]']

function GalleryPhoto({ src, index, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className={`${heights[index % heights.length]} overflow-hidden rounded-2xl cursor-pointer group bg-ivory-dark`}
      onClick={() => onOpen(index)}
    >
      <img
        src={src}
        alt={`Photo de galerie ${index + 1}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
        onError={(e) => {
          // Placeholder élégant si image absente
          e.target.style.display = 'none'
          e.target.parentElement.style.background = `hsl(${40 + index * 15}, 30%, ${88 - index * 2}%)`
          e.target.parentElement.innerHTML += `
            <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:0.4;font-family:Georgia,serif;font-size:2rem;color:#C9A96E">
              ✦
            </div>`
        }}
      />
      {/* Overlay hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="text-white text-3xl">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function Gallery({ config }) {
  const { photos, bride, groom, hashtag } = config
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() => setLightboxIndex(i => Math.max(0, i - 1)), [])
  const nextPhoto = useCallback(() => setLightboxIndex(i => Math.min(photos.gallery.length - 1, i + 1)), [photos.gallery.length])

  // Si aucune photo de galerie, on affiche un placeholder
  const galleryPhotos = photos.gallery.length > 0 ? photos.gallery : Array(6).fill('/images/placeholder.jpg')

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
            Souvenirs
          </p>
          <h2 className="font-serif-elegant text-4xl md:text-5xl font-light text-[var(--color-text)]">
            Galerie
          </h2>
          <div className="divider-ornament mt-6 max-w-xs mx-auto">
            <span className="font-serif-elegant text-base italic text-[var(--color-text)]/40 px-4">
              {bride} & {groom}
            </span>
          </div>
          {hashtag && (
            <p className="font-sans text-sm text-[var(--color-primary)]/60 mt-3 tracking-wider">
              {hashtag}
            </p>
          )}
        </motion.div>

        {/* ── Grille masonry ── */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryPhotos.map((src, index) => (
            <div key={index} className="break-inside-avoid relative">
              <GalleryPhoto src={src} index={index} onOpen={openLightbox} />
            </div>
          ))}
        </div>

        {/* ── Note hashtag ── */}
        {hashtag && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center font-sans text-xs text-[var(--color-text)]/30 mt-10"
          >
            Partagez vos photos avec le hashtag{' '}
            <span className="text-[var(--color-primary)]/60 font-medium">{hashtag}</span>
          </motion.p>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={galleryPhotos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
