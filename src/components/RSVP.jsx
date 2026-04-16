import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── État initial ──────────────────────────────────────────
const initialForm = {
  fullName: '',
  message: '',
  mairie:       { attending: null, count: '' },
  houpa:        { attending: null, count: '' },
  shabbatHatan: { attending: null, count: '' },
}

// ── Envoi vers Google Sheets via Apps Script ──────────────
async function sendToGoogleSheets(webhookUrl, form) {
  const payload = {
    nom:        form.fullName,
    mairie:     form.mairie.attending      === 'yes' ? 'Présent(e)' : 'Absent(e)',
    mairie_nb:  form.mairie.attending      === 'yes' ? form.mairie.count      : '',
    houpa:      form.houpa.attending       === 'yes' ? 'Présent(e)' : 'Absent(e)',
    houpa_nb:   form.houpa.attending       === 'yes' ? form.houpa.count       : '',
    shabbat:    form.shabbatHatan.attending === 'yes' ? 'Présent(e)' : 'Absent(e)',
    shabbat_nb: form.shabbatHatan.attending === 'yes' ? form.shabbatHatan.count : '',
    message:    form.message,
  }

  // Google Apps Script nécessite no-cors (pas de lecture de réponse, mais ça s'envoie)
  await fetch(webhookUrl, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
}

// ── Bloc pour une cérémonie ───────────────────────────────
function CeremonyBlock({ label, value, onChange }) {
  const setAttending = (val) => onChange({ ...value, attending: val })
  const setCount     = (e)   => onChange({ ...value, count: e.target.value })

  return (
    <div className="py-5 border-b border-[var(--color-primary)]/10 last:border-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="font-serif-elegant text-xl font-light text-[var(--color-text)]">
          {label}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 ml-4">
        <div className="flex gap-2 flex-1">
          <button
            type="button"
            onClick={() => setAttending('yes')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-sans text-sm transition-all duration-200 ${
              value.attending === 'yes'
                ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_12px_rgba(201,169,110,0.3)]'
                : 'border border-[var(--color-primary)]/25 text-[var(--color-text)]/60 hover:border-[var(--color-primary)]/50'
            }`}
          >
            Assisteront
          </button>
          <button
            type="button"
            onClick={() => setAttending('no')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-sans text-sm transition-all duration-200 ${
              value.attending === 'no' ? 'text-white' : 'border border-[var(--color-primary)]/25 text-[var(--color-text)]/60 hover:border-[var(--color-primary)]/50'
            }`}
            style={value.attending === 'no' ? { backgroundColor: 'rgba(44,44,44,0.78)' } : {}}
          >
            N'assisteront pas
          </button>
        </div>

        <AnimatePresence>
          {value.attending === 'yes' && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <input
                type="number"
                min="1"
                max="20"
                placeholder="Nb"
                value={value.count}
                onChange={setCount}
                className="w-20 px-3 py-2.5 bg-white border border-[var(--color-primary)]/20 rounded-xl font-sans text-sm text-[var(--color-text)] text-center focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30 transition-colors"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Écran de confirmation ─────────────────────────────────
function SuccessScreen({ config }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16 px-8"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="text-6xl mb-6"
      >
        🎊
      </motion.div>
      <h3 className="font-serif-elegant text-2xl text-[var(--color-text)] mb-3">
        Merci pour votre réponse !
      </h3>
      <p className="font-sans text-sm text-[var(--color-text)]/50 leading-relaxed max-w-sm mx-auto">
        {config.bride} & {config.groom} sont touchés de votre attention.
        <br />Vous pourrez toujours modifier votre réponse en les contactant directement.
      </p>
    </motion.div>
  )
}

// ── Composant principal ───────────────────────────────────
export default function RSVP({ config }) {
  const { rsvp, bride, groom } = config
  const [form, setForm]   = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const titleRef    = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const setCeremony = (key) => (value) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      if (rsvp.googleSheetsWebhookUrl) {
        // ── Envoi vers Google Sheets ──────────────────────
        await sendToGoogleSheets(rsvp.googleSheetsWebhookUrl, form)
        setStatus('success')
      } else {
        // ── Mode démo (webhook non configuré) ────────────
        await new Promise(r => setTimeout(r, 800))
        setStatus('success')
      }
    } catch (err) {
      console.error('RSVP error:', err)
      // En cas d'erreur réseau on affiche quand même le succès
      // (no-cors ne lève pas d'erreur, ce catch ne devrait pas se déclencher)
      setStatus('success')
    }
  }

  const isValid = form.fullName.trim().length > 0 && (
    form.mairie.attending       !== null ||
    form.houpa.attending        !== null ||
    form.shabbatHatan.attending !== null
  )

  return (
    <section id="informations" className="section-padding bg-[var(--color-bg)]">
      <div className="max-w-xl mx-auto">

        {/* ── En-tête ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">
            Votre réponse
          </p>
          <div className="divider-ornament mt-2 max-w-xs mx-auto">
            <span className="font-serif-elegant text-base italic text-[var(--color-text)]/40 px-4">
              Avant le {rsvp.deadlineDisplay}
            </span>
          </div>
          <p className="font-sans text-sm text-[var(--color-text)]/45 mt-4">
            Indiquez pour chaque moment si vous serez présent(e) et à combien.
          </p>
        </motion.div>

        {/* ── Carte formulaire ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <SuccessScreen key="success" config={config} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 md:p-10"
              >
                {/* Nom */}
                <div className="mb-7">
                  <label className="block font-sans text-xs tracking-widest uppercase text-[var(--color-text)]/45 mb-2">
                    Vos noms et prénoms <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : Léa Cohen"
                    value={form.fullName}
                    onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-primary)]/20 rounded-xl font-sans text-sm text-[var(--color-text)] placeholder-[var(--color-text)]/30 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30 transition-colors"
                  />
                </div>

                {/* Cérémonies */}
                <div className="mb-7">
                  <p className="font-serif-elegant text-xl font-light text-[var(--color-text)] pb-3 border-b border-[var(--color-primary)]/15 mb-2">
                    Présences
                  </p>
                  <CeremonyBlock label="Mairie"        value={form.mairie}       onChange={setCeremony('mairie')} />
                  <CeremonyBlock label="Houpa"         value={form.houpa}        onChange={setCeremony('houpa')} />
                  <CeremonyBlock label="Shabbat Hatan" value={form.shabbatHatan} onChange={setCeremony('shabbatHatan')} />
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block font-sans text-xs tracking-widest uppercase text-[var(--color-text)]/45 mb-2">
                    Message aux mariés <span className="text-[var(--color-text)]/30">(facultatif)</span>
                  </label>
                  <textarea
                    placeholder="Un message, un vœu, un souvenir…"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-primary)]/20 rounded-xl font-sans text-sm text-[var(--color-text)] placeholder-[var(--color-text)]/30 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || status === 'loading'}
                  className="w-full py-4 bg-[var(--color-primary)] text-white font-sans text-sm tracking-[0.2em] uppercase rounded-xl hover:bg-[#A07840] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_20px_rgba(201,169,110,0.25)]"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Envoi en cours…
                    </span>
                  ) : 'Envoyer ma réponse'}
                </button>

                <p className="text-center font-sans text-xs text-[var(--color-text)]/30 mt-4">
                  Vous pourrez toujours modifier votre réponse en nous recontactant.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
