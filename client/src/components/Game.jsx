import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import StartModal from './StartModal';

const Game = () => {
  const { enterGame, exitGame, stopGame } = useGame();
  const [showModal, setShowModal] = useState(true);

  // Enter game when component mounts
  useEffect(() => {
    enterGame();
    return () => exitGame(); // Cleanup when leaving game
  }, [enterGame, exitGame]);

  const waldoFinder = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xOnScreen = event.clientX - rect.left;
    const yOnScreen = event.clientY - rect.top;

    const x = Math.round((xOnScreen / rect.width) * 100);
    const y = Math.round((yOnScreen / rect.height) * 100);

    const topLeftX = 61;
    const topLeftY = 35;
    const bottomRightX = 62;
    const bottomRightY = 39;

    if (x >= topLeftX && x <= bottomRightX && y >= topLeftY && y <= bottomRightY) {
      stopGame();
      alert(`Congratulations! You found Waldo!`);
      // TODO: Later send time to backend
    } else {
      alert('Try again! Waldo is not at these coordinates.');
    }
  };

  return (
    <>
      <StartModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />

      <div className={showModal ? 'opacity-50 pointer-events-none' : ''}>
        <img 
          className='w-full' 
          src="Beach scene.jpg" 
          onClick={waldoFinder} 
          alt="Where's Waldo" 
        />
      </div>
    </>
  );
};

export default Game;