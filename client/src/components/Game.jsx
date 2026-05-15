import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import StartModal from './StartModal';
import WinModal from './WinModal';
import axios from 'axios';

const Game = () => {
  const { enterGame, exitGame, stopGame } = useGame();
  
  const [showStartModal, setShowStartModal] = useState(true);
  const [showWinModal, setShowWinModal] = useState(false);
  const [waldo, setWaldo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const imageRef = useRef(null);

  // Fetch Waldo data
  useEffect(() => {
    const fetchWaldo = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/characters');
        const waldoData = res.data.find(char => char.name === "Waldo");
        if (waldoData) setWaldo(waldoData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWaldo();
  }, []);

  useEffect(() => {
    enterGame();
    return () => exitGame();
  }, [enterGame, exitGame]);

  const resetZoom = () => setZoomLevel(1);

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomLevel(prev => Math.min(prev + 0.25, 4));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    }
  };

  // FIXED Coordinate Calculation
  const waldoFinder = (event) => {
    if (!waldo || !imageRef.current) return;

    const img = imageRef.current;
    const rect = img.getBoundingClientRect();


    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    console.log(`Clicked at → X: ${xPercent.toFixed(2)}% | Y: ${yPercent.toFixed(2)}%`);

    const isHit = 
      xPercent >= waldo.xMin && 
      xPercent <= waldo.xMax && 
      yPercent >= waldo.yMin && 
      yPercent <= waldo.yMax;

    if (isHit) {
      stopGame();
      setShowWinModal(true);
    }
  };

  if (loading) return <div className="text-center text-3xl mt-20">Loading game...</div>;

  return (
    <>
      <StartModal isOpen={showStartModal} onClose={() => setShowStartModal(false)} />
      <WinModal isOpen={showWinModal} onClose={() => setShowWinModal(false)} />

      <div className="flex flex-col items-center bg-white-900 p-0">
        <div 
          className="relative border-4 overflow-auto max-w-[80%] max-h-[85vh] cursor-crosshair"
          onWheel={handleWheel}
        >
          <img 
            ref={imageRef}
            src="Beach scene.jpg" 
            alt="Where's Waldo"
            className="transition-transform duration-200 origin-top-left select-none"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={waldoFinder}
          />
        </div>

          {/* Reset Button */}
          <button
            onClick={resetZoom}
            className="absolute bottom-5 left-3 bg-white/80 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg border border-yellow-400 z-10"
          >
            Reset Zoom
          </button>

        <p className="text-gray-400 mt-3">Mouse wheel to zoom • Click to find Waldo</p>
      </div>
    </>
  );
};

export default Game;