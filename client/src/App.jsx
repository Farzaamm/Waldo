import { useState } from 'react'
import Game from './components/Game'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Game />
      <Footer />
    </div>
  )
  
}

export default App
