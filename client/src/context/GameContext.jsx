// client/src/context/GameContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

export const GameProvider = ({ children }) => {
  const [time, setTime] = useState(0);        // in centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isInGame, setIsInGame] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const startGame = useCallback(() => {
    setTime(0);
    setIsRunning(true);
  }, []);

  const stopGame = useCallback(() => setIsRunning(false), []);
  const resetGame = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, []);

  const enterGame = useCallback(() => setIsInGame(true), []);
  const exitGame = useCallback(() => {
    setIsInGame(false);
    resetGame();
  }, [resetGame]);

  return (
    <GameContext.Provider value={{
      time,
      isRunning,
      isInGame,
      startGame,
      stopGame,
      resetGame,
      enterGame,
      exitGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};