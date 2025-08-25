import React, { useEffect, useState } from 'react';
import { Crown, Trophy, Sparkles, RotateCcw } from 'lucide-react';
import { InstagramFollower } from '../services/instagramApi';

interface WinnerProps {
  winner: InstagramFollower & { hp: number };
  onClose: () => void;
  onPlayAgain: () => void;
}

export const Winner: React.FC<WinnerProps> = ({ winner, onClose, onPlayAgain }) => {
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFireworks(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: '1s'
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10">
          <div className="animate-bounce mb-6">
            <Crown className="w-16 h-16 text-yellow-200 mx-auto mb-4" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">🎉 WINNER! 🎉</h2>
          
          <div className="bg-white/20 rounded-2xl p-6 mb-6">
            <img
              src={winner.profile_picture_url || `https://picsum.photos/100/100?random=${winner.id}`}
              alt={winner.username}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-200 shadow-lg"
            />
            <h3 className="text-2xl font-bold text-white mb-2">
              @{winner.username}
            </h3>
            <div className="flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-200 mr-2" />
              <span className="text-yellow-200 font-semibold">
                Champion with {winner.hp} HP remaining!
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onPlayAgain}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-black/20 hover:bg-black/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};