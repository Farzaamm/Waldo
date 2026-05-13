import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTime = (centiseconds) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const cs = centiseconds % 100;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/scores');
        setScores(res.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-yellow-400 text-center mb-12">LEADERBOARD</h1>

        {loading ? (
          <p className="text-center text-3xl">Loading...</p>
        ) : (
          <div className="bg-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-6 text-left">Rank</th>
                  <th className="p-6 text-left">Player</th>
                  <th className="p-6 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={score.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="p-6 text-2xl font-bold text-yellow-400">#{index + 1}</td>
                    <td className="p-6 text-xl">{score.username}</td>
                    <td className="p-6 text-right text-3xl font-mono text-yellow-400">
                      {formatTime(score.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;