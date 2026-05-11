import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="text-4xl font-bold text-center p-4 bg-gray-800 text-white flex justify-between items-center">
      <NavLink to="/">Where's Waldo</NavLink>

      <div className="flex gap-8">
        <NavLink
          to="/game"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 underline decoration-4 underline-offset-8"
              : "hover:text-yellow-400 transition-colors"
          }
        >
          Game
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 underline decoration-4 underline-offset-8"
              : "hover:text-yellow-400 transition-colors"
          }
        >
          Leaderboard
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;