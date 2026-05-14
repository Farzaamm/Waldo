import { NavLink, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Navbar = () => {
  const { time, isInGame } = useGame();
  const location = useLocation();

  const isGamePage = location.pathname === '/game';

  const formatTime = (centiseconds) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const cs = centiseconds % 100;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-4xl font-bold text-center p-4 bg-gray-800 text-white flex justify-between items-center sticky top-0 z-50 border-b border-gray-700">
      <NavLink to="/" className="hover:text-yellow-400 transition-colors">
        Where's Waldo
      </NavLink>

      {/* Timer - Only shows on Game page */}
      {isGamePage && isInGame && (
        <div className="text-5xl font-mono text-yellow-400 tracking-widest">
          {formatTime(time)}
        </div>
      )}

      <div className="flex gap-8 text-lg">
        {/* <NavLink 
          to="/game"
          className={({ isActive }) => 
            isActive ? "text-yellow-400 underline decoration-4 underline-offset-8" : "hover:text-yellow-400 transition-colors"
          }
        >
          Play Game
        </NavLink> */}

        <NavLink 
          to="/leaderboard"
          className={({ isActive }) => 
            isActive ? "text-yellow-400" : "hover:text-yellow-400 transition-colors"
          }
        >
          Leaderboard
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;