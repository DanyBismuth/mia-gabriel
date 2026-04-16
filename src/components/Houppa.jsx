import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Palette sépia — indépendante des CSS vars du projet ──
const C = {
  bg:      '#F5F0E8',
  text:    '#3D3530',
  textMid: 'rgba(61,53,48,0.72)',
  textLow: 'rgba(61,53,48,0.55)',
  line:    'rgba(61,53,48,0.22)',
}

// ── Ornement ligne fine centrée ───────────────────────────
function OrnamentLine() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 auto', maxWidth: '220px' }}>
      <div style={{ flex: 1, height: '1px', background: C.line }} />
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.line, flexShrink: 0 }} />
      <div style={{ flex: 1, height: '1px', background: C.line }} />
    </div>
  )
}

// ── Hook inView réutilisable ──────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return { ref, inView, delay }
}

// ── Composant principal ───────────────────────────────────
export default function Houppa({ config }) {
  const { houppa } = config

  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const { ref: verseRef,    inView: verseInView }    = useReveal()
  const { ref: familiesRef, inView: familiesInView } = useReveal()
  const { ref: liaisonRef,  inView: liaisonInView }  = useReveal()
  const { ref: namesRef,    inView: namesInView }    = useReveal()
  const { ref: inviteRef,   inView: inviteInView }   = useReveal()
  const { ref: dateRef,     inView: dateInView }     = useReveal()
  const { ref: notesRef,    inView: notesInView }    = useReveal()

  return (
    <section
      id="houpa"
      ref={sectionRef}
      style={{
        backgroundColor: C.bg,
        paddingTop: '5rem',
        paddingBottom: '5rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
        color: C.text,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >

        {/* ── TITRE ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'inherit',
            fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: C.text,
            marginBottom: '1rem',
          }}>
            Houppa & Soirée
          </h2>
          <OrnamentLine />
        </div>

        {/* ── VERSET HÉBREU ── */}
        <motion.div
          ref={verseRef}
          initial={{ opacity: 0 }}
          animate={verseInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p
            dir="rtl"
            lang="he"
            style={{
              fontFamily: '"Frank Ruhl Libre", serif',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: C.text,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {houppa.verse}
          </p>
        </motion.div>

        {/* ── FAMILLES — 2 colonnes ── */}
        <motion.div
          ref={familiesRef}
          initial={{ opacity: 0 }}
          animate={familiesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '2.5rem' }}
        >
          {/* Desktop : flex row / Mobile : flex col centré */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            {/* Colonne gauche */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: '1 1 auto', minWidth: '160px' }}>
              {houppa.familiesLeft.map((name, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={familiesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: C.text,
                    textAlign: 'left',
                  }}
                >
                  {name}
                </motion.p>
              ))}
            </div>

            {/* Colonne droite */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: '1 1 auto', minWidth: '160px', alignItems: 'flex-end' }}>
              {houppa.familiesRight.map((name, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={familiesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: C.text,
                    textAlign: 'right',
                  }}
                >
                  {name}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── TEXTE DE LIAISON ── */}
        <motion.div
          ref={liaisonRef}
          initial={{ opacity: 0 }}
          animate={liaisonInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: C.textMid,
            lineHeight: 1.7,
            fontStyle: 'normal',
          }}>
            ont la joie de vous faire part du mariage de leurs petits-enfants et enfants
          </p>
        </motion.div>

        {/* ── PRÉNOMS DES MARIÉS ── */}
        <motion.div
          ref={namesRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={namesInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: '3rem',
            gap: '1rem',
          }}
        >
          {/* Mariée */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: C.text,
              lineHeight: 1.1,
            }}>
              {houppa.bride.fr}
            </span>
            <span
              dir="rtl"
              lang="he"
              style={{
                fontFamily: '"Frank Ruhl Libre", serif',
                fontSize: '1.1rem',
                fontWeight: 400,
                color: C.textMid,
              }}
            >
              {houppa.bride.he}
            </span>
          </div>

          {/* Séparateur centre */}
          <span style={{
            fontFamily: 'inherit',
            fontSize: '1.8rem',
            fontWeight: 300,
            color: C.line,
            userSelect: 'none',
            flexShrink: 0,
          }}>
            &amp;
          </span>

          {/* Marié */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: C.text,
              lineHeight: 1.1,
            }}>
              {houppa.groom.fr}
            </span>
            <span
              dir="rtl"
              lang="he"
              style={{
                fontFamily: '"Frank Ruhl Libre", serif',
                fontSize: '1.1rem',
                fontWeight: 400,
                color: C.textMid,
              }}
            >
              {houppa.groom.he}
            </span>
          </div>
        </motion.div>

        {/* ── TEXTE D'INVITATION ── */}
        <motion.div
          ref={inviteRef}
          initial={{ opacity: 0 }}
          animate={inviteInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: C.textMid,
            lineHeight: 1.7,
          }}>
            et seront honorés de votre présence à la houppa qui sera célébrée
          </p>
        </motion.div>

        {/* ── DATE ── */}
        <motion.div
          ref={dateRef}
          initial={{ opacity: 0, y: 20 }}
          animate={dateInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '0.75rem' }}
        >
          <p style={{
            margin: 0,
            fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: C.text,
          }}>
            {houppa.date}
          </p>
        </motion.div>

        {/* ── HEURE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={dateInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ textAlign: 'center', marginBottom: '1.5rem' }}
        >
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: C.textMid,
            letterSpacing: '0.06em',
          }}>
            {houppa.time}
          </p>
        </motion.div>

        {/* ── LIEU ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={dateInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          {houppa.venue.mapsLink ? (
            <a
              href={houppa.venue.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <p style={{
                margin: 0,
                fontSize: '1.05rem',
                fontWeight: 700,
                color: C.text,
                letterSpacing: '0.04em',
              }}>
                {houppa.venue.name}
              </p>
            </a>
          ) : (
            <p style={{
              margin: 0,
              fontSize: '1.05rem',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '0.04em',
            }}>
              {houppa.venue.name}
            </p>
          )}
          <p style={{
            margin: '0.3rem 0 0',
            fontSize: '0.9rem',
            color: C.textMid,
            letterSpacing: '0.06em',
          }}>
            {houppa.venue.city}
          </p>
        </motion.div>

        {/* ── LIGNE FINE ── */}
        <div style={{ marginBottom: '3rem' }}>
          <OrnamentLine />
        </div>

        {/* ── TEXTES COMPLÉMENTAIRES ── */}
        <motion.div
          ref={notesRef}
          initial={{ opacity: 0 }}
          animate={notesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          {/* Ligne 1 */}
          <p style={{
            margin: '0 0 1.5rem',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: C.textMid,
            lineHeight: 1.7,
          }}>
            {houppa.ceremonyNote}
          </p>

          {/* Ligne 2 — hommage avec noms en gras */}
          <p style={{
            margin: '0 0 1.5rem',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: C.textMid,
            lineHeight: 1.8,
            maxWidth: '620px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {houppa.tributeText}{' '}
            <strong style={{ fontStyle: 'italic', fontWeight: 700 }}>{houppa.tributeNames}</strong>.{' '}
            Beaucoup de tendresse aussi vers{' '}
            <strong style={{ fontStyle: 'italic', fontWeight: 700 }}>{houppa.tributePerson}</strong>{' '}
            {houppa.tributeExtra}
          </p>

          {/* Ligne 3 — navettes */}
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: C.textMid,
            lineHeight: 1.7,
            maxWidth: '540px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {houppa.shuttle}
          </p>
        </motion.div>

      </motion.div>
    </section>
  )
}
