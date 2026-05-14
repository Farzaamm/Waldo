import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import StartModal from './StartModal';
import WinModal from './WinModal';     

const Game = () => {
  const { enterGame, exitGame, stopGame } = useGame();
  const [showStartModal, setShowStartModal] = useState(true);
  const [showWinModal, setShowWinModal] = useState(false);  

  useEffect(() => {
    enterGame();
    return () => exitGame();
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
      setShowWinModal(true);        
    }
  };

  return (
    <>
      <StartModal isOpen={showStartModal} onClose={() => setShowStartModal(false)} />
      <WinModal isOpen={showWinModal} onClose={() => setShowWinModal(false)} /> 

      <div className={(showStartModal || showWinModal) ? 'opacity-50 pointer-events-none' : ''}>
        <img 
          className='w-full' 
          src="Beach scene.jpg" 
          onClick={waldoFinder} 
          alt="" 
        />
      </div>
    </>
  );
};

export default Game;