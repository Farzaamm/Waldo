import { useState } from 'react';
import { useGame } from '../context/GameContext';
import axios from 'axios';

const WinModal = ({ isOpen, onClose }) => {
  const { finalTime, resetGame } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTime = (cs) => {
    const totalSec = Math.floor(cs / 100);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    const centi = cs % 100;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!playerName.trim()) {
      return alert("Please enter your name!");
    }

    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:5000/api/scores', {
        username: playerName.trim(),
        time: finalTime,
      });

      alert(`✅ Score saved! Your time: ${formatTime(finalTime)}`);
      resetGame();
      onClose();
      window.location.href = '/leaderboard';
    } catch (err) {
      console.error(err);
      alert("Failed to save score. Make sure server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !finalTime) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200]">
      <div className="bg-gray-900 border-4 border-yellow-400 rounded-3xl p-10 text-center max-w-md w-full">
        <h2 className="text-5xl font-black text-green-400 mb-4">YOU FOUND WALDO!</h2>
        <p className="text-3xl mb-8">Your Time: <span className="text-yellow-400 font-mono">{formatTime(finalTime)}</span></p>

        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 text-white text-2xl p-5 rounded-2xl mb-8 outline-none"
          maxLength={20}
        />

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !playerName.trim()}
          className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 w-full py-6 text-3xl font-bold rounded-2xl transition-all"
        >
          {isSubmitting ? "SAVING..." : "SAVE MY SCORE"}
        </button>
      </div>
    </div>
  );
};

export default WinModal;