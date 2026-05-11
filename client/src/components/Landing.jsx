import React from 'react'

const Landing = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
      <h1 className='text-8xl font-bold mb-8'>Where's Waldo</h1>
      <p className='text-2xl mb-8'>Try to find Waldo in the image in the shortest amount of time</p>
      <p className='text-2xl mb-10'>Click the button below to start the game</p>
      <button className='bg-blue-800 text-white px-16 py-10 rounded-lg text-8xl font-bold hover:bg-red-700 transition-colors border-4 border-white' 
        onClick={() => window.location.href = '/game'}>
        Play
      </button>
    </div>
  )
}

export default Landing
