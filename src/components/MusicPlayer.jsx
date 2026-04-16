import React, { useState, useRef, useEffect } from 'react'

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6,3 20,12 6,21" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="3" width="4" height="18" rx="1"/>
      <rect x="15" y="3" width="4" height="18" rx="1"/>
    </svg>
  )
}

export default function MusicPlayer({ config }) {
  const { music } = config
  const [playing, setPlaying]   = useState(false)
  const [showTip, setShowTip]   = useState(false)
  const audioRef   = useRef(null)
  const hasPlayed  = useRef(false)   // flag : on ne lance qu'une seule fois en autoplay

  useEffect(() => {
    // Même technique que weddingsalomesamuel.fr :
    // on écoute le PREMIER geste de l'utilisateur (clic, touch, scroll)
    // et on démarre la musique automatiquement à ce moment-là.
    const tryPlay = () => {
      if (hasPlayed.current) return
      const audio = audioRef.current
      if (!audio) return

      audio.play()
        .then(() => {
          hasPlayed.current = true
          setPlaying(true)
          // Supprimer les listeners une fois la musique lancée
          document.removeEventListener('click',      tryPlay)
          document.removeEventListener('touchstart', tryPlay)
          document.removeEventListener('scroll',     tryPlay)
          document.removeEventListener('keydown',    tryPlay)
        })
        .catch(() => {
          // Navigateur trop restrictif — le bouton manuel reste disponible
        })
    }

    document.addEventListener('click',      tryPlay)
    document.addEventListener('touchstart', tryPlay)
    document.addEventListener('scroll',     tryPlay)
    document.addEventListener('keydown',    tryPlay)

    return () => {
      document.removeEventListener('click',      tryPlay)
      document.removeEventListener('touchstart', tryPlay)
      document.removeEventListener('scroll',     tryPlay)
      document.removeEventListener('keydown',    tryPlay)
    }
  }, [])

  // Bouton manuel play / pause
  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
        .then(() => {
          hasPlayed.current = true
          setPlaying(true)
        })
        .catch(err => console.warn('[MusicPlayer]', err.message))
    }
  }

  return (
    <>
      {/* Élément audio dans le DOM */}
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        right:  '1.5rem',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
      }}>
        {/* Tooltip */}
        {showTip && (
          <div style={{
            backgroundColor: 'rgba(61,53,48,0.90)',
            color: '#F5F0E8',
            fontSize: '0.7rem',
            fontFamily: '"DM Sans",system-ui,sans-serif',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            padding: '5px 11px',
            borderRadius: '6px',
          }}>
            {music.title}
          </div>
        )}

        {/* Bouton circulaire */}
        <button
          onClick={toggle}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          aria-label={playing ? 'Pause' : 'Lire la musique'}
          style={{
            width:  '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `1.5px solid ${playing ? '#C9A96E' : 'rgba(201,169,110,0.55)'}`,
            backgroundColor: playing
              ? 'rgba(201,169,110,0.18)'
              : 'rgba(245,240,232,0.88)',
            backdropFilter:       'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#3D3530',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: playing
              ? '0 0 0 3px rgba(201,169,110,0.25), 0 4px 20px rgba(0,0,0,0.15)'
              : '0 4px 20px rgba(0,0,0,0.12)',
            transition: 'all 0.25s ease',
            outline: 'none',
            flexShrink: 0,
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Barres animées */}
        {playing && (
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '14px' }}>
            {[0, 0.15, 0.3, 0.15, 0].map((delay, i) => (
              <div key={i} style={{
                width: '3px',
                borderRadius: '2px',
                backgroundColor: '#C9A96E',
                animation: `musicBar 0.9s ease-in-out ${delay}s infinite alternate`,
              }} />
            ))}
          </div>
        )}

        <style>{`
          @keyframes musicBar {
            from { height: 4px;  opacity: 0.5; }
            to   { height: 14px; opacity: 1;   }
          }
        `}</style>
      </div>
    </>
  )
}
