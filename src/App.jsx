import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AartiTicker from './components/AartiTicker'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <AartiTicker />
        {/* Additional sections will be built in future sessions following the AGENTS.md strategy */}
        <div style={{ height: '50vh', background: 'var(--color-maroon)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: 'var(--color-gold-bright)', textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
            More sections (About, Events, Donations, Gallery, Contact) will be migrated in the next sessions.
          </h2>
        </div>
      </main>
    </div>
  )
}

export default App
