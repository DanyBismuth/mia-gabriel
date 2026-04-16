import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navigation from './components/Navigation.jsx'
import { weddingConfig } from './config/wedding.config.js'

// ── Couleurs CSS ──────────────────────────────────────────
function CSSVarsInjector({ colors }) {
  React.useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-bg', colors.background)
    root.style.setProperty('--color-text', colors.text)
    root.style.setProperty('--color-accent', colors.accent)
  }, [colors])
  return null
}

// ── Séparateur fin sépia ──────────────────────────────────
function SepiaDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '180px', margin: '0 auto' }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(61,53,48,0.2)' }} />
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(61,53,48,0.25)', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '1px', background: 'rgba(61,53,48,0.2)' }} />
    </div>
  )
}

// ── Contenu riche de la carte Houpa ──────────────────────
// Lit tout depuis weddingConfig.houppa — zéro hard-code
function HouppaContent({ h }) {
  const sepia      = '#3D3530'
  const sepiaMid   = 'rgba(61,53,48,0.68)'
  const sepiaLow   = 'rgba(61,53,48,0.52)'
  const fontSerif  = '"Cormorant Garamond","Playfair Display",Georgia,serif'
  const fontHebrew = '"Frank Ruhl Libre",serif'

  return (
    <div style={{ fontFamily: fontSerif, color: sepia, textAlign: 'center' }}>

      {/* Verset hébreu */}
      <div style={{ marginBottom: '2rem' }}>
        <p dir="rtl" lang="he" style={{
          fontFamily: fontHebrew,
          fontSize: '1.55rem',
          fontWeight: 700,
          color: sepia,
          lineHeight: 1.5,
          margin: 0,
        }}>
          {h.verse}
        </p>
      </div>

      {/* Familles — 2 colonnes */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {/* Gauche */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: '1 1 140px', textAlign: 'left' }}>
          {h.familiesLeft.map((name, i) => (
            <p key={i} style={{
              margin: 0,
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: sepia,
            }}>
              {name}
            </p>
          ))}
        </div>
        {/* Droite */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: '1 1 140px', alignItems: 'flex-end', textAlign: 'right' }}>
          {h.familiesRight.map((name, i) => (
            <p key={i} style={{
              margin: 0,
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: sepia,
            }}>
              {name}
            </p>
          ))}
        </div>
      </div>

      {/* Texte liaison */}
      <p style={{ margin: '0 0 2rem', fontSize: '0.95rem', color: sepiaMid, lineHeight: 1.7 }}>
        ont la joie de vous faire part du mariage de leurs petits-enfants et enfants
      </p>

      {/* Prénoms côte à côte */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {/* Mariée */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{
            fontFamily: fontSerif,
            fontSize: 'clamp(1.7rem, 5vw, 2.2rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: sepia,
            lineHeight: 1,
          }}>
            {h.bride.fr}
          </span>
          <span dir="rtl" lang="he" style={{
            fontFamily: fontHebrew,
            fontSize: '1.1rem',
            fontWeight: 400,
            color: sepiaMid,
          }}>
            {h.bride.he}
          </span>
        </div>

        <span style={{ color: 'rgba(61,53,48,0.2)', fontSize: '1.6rem', fontWeight: 300, flexShrink: 0 }}>
          &amp;
        </span>

        {/* Marié */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{
            fontFamily: fontSerif,
            fontSize: 'clamp(1.7rem, 5vw, 2.2rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: sepia,
            lineHeight: 1,
          }}>
            {h.groom.fr}
          </span>
          <span dir="rtl" lang="he" style={{
            fontFamily: fontHebrew,
            fontSize: '1.1rem',
            fontWeight: 400,
            color: sepiaMid,
          }}>
            {h.groom.he}
          </span>
        </div>
      </div>

      {/* Texte invitation */}
      <p style={{ margin: '0 0 2rem', fontSize: '0.95rem', color: sepiaMid, lineHeight: 1.7 }}>
        et seront honorés de votre présence à la houppa qui sera célébrée
      </p>

      {/* Date */}
      <p style={{
        margin: '0 0 0.5rem',
        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: sepia,
      }}>
        {h.date}
      </p>

      {/* Heure */}
      <p style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', color: sepiaMid, letterSpacing: '0.05em' }}>
        {h.time}
      </p>

      {/* Lieu */}
      <p style={{ margin: '0 0 0.3rem', fontSize: '1rem', fontWeight: 700, color: sepia, letterSpacing: '0.04em' }}>
        {h.venue.name}
      </p>
      <p style={{ margin: '0 0 2.5rem', fontSize: '0.875rem', color: sepiaMid, letterSpacing: '0.06em' }}>
        {h.venue.city}
      </p>

      {/* Ornement */}
      <div style={{ marginBottom: '2rem' }}>
        <SepiaDivider />
      </div>

      {/* Note cérémonie */}
      <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', fontStyle: 'italic', color: sepiaMid, lineHeight: 1.7 }}>
        {h.ceremonyNote}
      </p>

      {/* Hommage */}
      <p style={{
        margin: '0 0 1.25rem',
        fontSize: '0.875rem',
        fontStyle: 'italic',
        color: sepiaMid,
        lineHeight: 1.8,
        maxWidth: '560px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {h.tributeText}{' '}
        <strong style={{ fontStyle: 'italic' }}>{h.tributeNames}</strong>.{' '}
        Beaucoup de tendresse aussi vers{' '}
        <strong style={{ fontStyle: 'italic' }}>{h.tributePerson}</strong>{' '}
        {h.tributeExtra}
      </p>

      {/* Navette */}
      <p style={{
        margin: 0,
        fontSize: '0.875rem',
        fontStyle: 'italic',
        color: sepiaMid,
        lineHeight: 1.7,
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {h.shuttle}
      </p>
    </div>
  )
}

// ── Contenu des 3 cérémonies ──────────────────────────────
// Modifier ici les textes pour chaque mariage
const ceremonies = [
  {
    id: 'mairie',
    surtitle: 'Cérémonie civile',
    title: 'Mairie',
    titleHebrew: '',
    mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Mairie+de+Paris+Centre',
    content: (
      <div className="space-y-4 text-center">
        <p className="font-serif-elegant text-4xl md:text-6xl font-light italic text-[var(--color-text)] leading-none">
          Mia et Gabriel
        </p>
        <p className="font-serif-elegant text-lg md:text-xl font-light text-[var(--color-text)]/60 italic">
          se diront
        </p>
        <p className="font-serif-elegant text-5xl md:text-7xl font-bold text-[var(--color-primary)] italic leading-none">
          OUI&nbsp;!
        </p>
        <div className="pt-4 space-y-1">
          <p className="font-serif-elegant text-xl text-[var(--color-text)]/80">
            Le jeudi 5 juin 2026 — À 15h00
          </p>
          <p className="font-serif-elegant text-xl text-[var(--color-text)]/80">
            Mairie de Paris Centre
          </p>
        </div>
        <div className="pt-2 space-y-1">
          <p className="font-serif-elegant text-base text-[var(--color-text)]/50 italic">
            Un after mairie suivra la cérémonie
          </p>
          <p className="font-serif-elegant text-sm text-[var(--color-text)]/40 italic">
            Le lieu vous sera communiqué ultérieurement
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'houpa',
    surtitle: 'Cérémonie religieuse',
    title: 'Houpa & Soirée',
    titleHebrew: '',
    mapsLink: weddingConfig.houppa.venue.mapsLink,
    content: <HouppaContent h={weddingConfig.houppa} />,
  },
  {
    id: 'shabbat-hatan',
    surtitle: 'Shabbat du marié',
    title: 'Shabbat Hatan',
    titleHebrew: '',
    mapsLink: null,
    content: (
      <div className="space-y-4">
        <p className="font-serif-elegant text-lg text-[var(--color-text)]/55 leading-relaxed italic">
          Les familles vous convient au Shabbat Hatan
        </p>
        <div className="space-y-4 pt-2">
          <div>
            <p className="font-serif-elegant text-sm tracking-widest uppercase text-[var(--color-primary)]/70 mb-1">
              Vendredi soir
            </p>
            <p className="font-serif-elegant text-xl font-medium text-[var(--color-text)]/80">
              Vendredi 19 juin 2026
            </p>
            <p className="font-serif-elegant text-base text-[var(--color-text)]/50 mt-1 leading-relaxed italic">
              Allumage des bougies, suivi de l'office
              <br />et du repas de Shabbat en l'honneur des mariés
            </p>
          </div>
          <div className="h-px bg-[var(--color-primary)]/10 mx-8" />
          <div>
            <p className="font-serif-elegant text-sm tracking-widest uppercase text-[var(--color-primary)]/70 mb-1">
              Samedi matin
            </p>
            <p className="font-serif-elegant text-xl font-medium text-[var(--color-text)]/80">
              Samedi 20 juin 2026
            </p>
            <p className="font-serif-elegant text-base text-[var(--color-text)]/50 mt-1 leading-relaxed italic">
              Office et lecture de la Torah
              <br />suivi du déjeuner
            </p>
          </div>
        </div>
        <p className="font-serif-elegant text-base text-[var(--color-text)]/40 italic pt-2">
          Le lieu vous sera communiqué ultérieurement
        </p>
      </div>
    ),
  },
]

export default function App() {
  const config = { ...weddingConfig, ceremonies }

  return (
    <BrowserRouter>
      <CSSVarsInjector colors={weddingConfig.colors} />
      <Navigation config={config} />
      <Home config={config} />
    </BrowserRouter>
  )
}
