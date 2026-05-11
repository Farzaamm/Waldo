import App from './App.jsx';
import Game from './components/Game.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Landing from './components/Landing.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,           // ← Better than path: '/'
        element: <Landing />,
      },
      {
        path: 'game',          // ← Relative path (no leading /)
        element: <Game />,
      },
      {
        path: 'leaderboard',   // ← Relative path
        element: <Leaderboard />,
      },
    ],
  },
];

export default routes;