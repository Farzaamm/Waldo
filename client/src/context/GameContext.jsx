import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

export const GameProvider = ({ children }) => {
  const [time, setTime] = useState(0);           // centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isInGame, setIsInGame] = useState(false);
  const [finalTime, setFinalTime] = useState(null); // ← New

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

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startGame = useCallback(() => {
    setTime(0);
    setFinalTime(null);
    setIsRunning(true);
  }, []);

  const stopGame = useCallback(() => {
    setIsRunning(false);
    setFinalTime(time);        // Save final time
  }, [time]);

  const resetGame = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    setFinalTime(null);
  }, []);

  const enterGame = useCallback(() => setIsInGame(true), []);
  const exitGame = useCallback(() => {
    setIsInGame(false);
    resetGame();
  }, [resetGame]);

  return (
    <GameContext.Provider value={{
      time,
      finalTime,
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