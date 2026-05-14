import { useGame } from '../context/GameContext';

const StartModal = ({ isOpen, onClose }) => {
  const { startGame } = useGame();

  if (!isOpen) return null;

  const handleStart = () => {
    startGame();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-yellow-100/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-yellow-400 rounded-3xl p-12 text-center max-w-md w-full">
        <h2 className="text-6xl font-black text-yellow-300 mb-6">READY?</h2>
        <p className="text-2xl mb-10 text-gray-300">
          Your time starts when you click the button below
        </p>

        <button
          onClick={handleStart}
          className="bg-green-600 hover:bg-green-500 active:bg-green-700 text-white text-4xl font-bold px-20 py-8 rounded-2xl transition-all active:scale-95"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default StartModal;