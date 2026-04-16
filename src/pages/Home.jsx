import React from 'react'
import Hero from '../components/Hero.jsx'
import OurStory from '../components/OurStory.jsx'
import Ceremonies from '../components/Ceremonies.jsx'
import Venue from '../components/Venue.jsx'
import Accommodations from '../components/Accommodations.jsx'
import RSVP from '../components/RSVP.jsx'
import Footer from '../components/Footer.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'

export default function Home({ config }) {
  return (
    <main>
      <section id="accueil">
        <Hero config={config} />
      </section>
      <section id="notre-histoire">
        <OurStory config={config} />
      </section>
      <section id="ceremonies">
        <Ceremonies config={config} />
      </section>
      <section id="lieu">
        <Venue config={config} />
      </section>
      <section id="hebergements">
        <Accommodations config={config} />
      </section>
      <section id="informations">
        <RSVP config={config} />
      </section>
      <Footer config={config} />
      <MusicPlayer config={config} />
    </main>
  )
}
