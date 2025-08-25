import React from 'react';
import { Crown, Heart, Skull } from 'lucide-react';
import { InstagramFollower } from '../services/instagramApi';
import { BattleState } from '../types';

interface BattleArenaProps {
  players: (InstagramFollower & { hp: number })[];
  battleState: BattleState;
  totalPlayers: number;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  players,
  battleState,
  totalPlayers
}) => {
  const getPlayerStatusColor = (hp: number) => {
    if (hp > 70) return 'border-green-400 shadow-green-400/50';
    if (hp > 30) return 'border-yellow-400 shadow-yellow-400/50';
    return 'border-red-400 shadow-red-400/50';
  };

  const getHPBarColor = (hp: number) => {
    if (hp > 70) return 'bg-green-500';
    if (hp > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Battle Arena</h2>
          <p className="text-gray-300">
            {players.length} of {totalPlayers} fighters remaining
          </p>
        </div>
        
        {battleState === 'fighting' && (
          <div className="flex items-center text-red-400">
            <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="font-semibold">BATTLE IN PROGRESS</span>
          </div>
        )}
        
        {players.length === 1 && (
          <div className="flex items-center text-yellow-400">
            <Crown className="w-5 h-5 mr-2" />
            <span className="font-semibold">WINNER!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-h-96 overflow-y-auto">
        {players.map((player) => (
          <div
            key={player.id}
            className={`relative bg-white/5 rounded-lg p-3 border-2 transition-all duration-300 ${getPlayerStatusColor(player.hp)}`}
          >
            <div className="text-center">
              <div className="relative mb-2">
                <img
                  src={player.profile_picture_url || `https://picsum.photos/60/60?random=${player.id}`}
                  alt={player.username}
                  className="w-12 h-12 rounded-full mx-auto object-cover"
                />
                {player.hp <= 0 && (
                  <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
                    <Skull className="w-6 h-6 text-red-400" />
                  </div>
                )}
              </div>
              
              <p className="text-white text-xs font-medium truncate mb-2">
                @{player.username}
              </p>
              
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getHPBarColor(player.hp)}`}
                    style={{ width: `${player.hp}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-center text-xs">
                  <Heart className="w-3 h-3 text-red-400 mr-1" />
                  <span className="text-white font-medium">{player.hp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {players.length === 0 && (
        <div className="text-center py-12">
          <Skull className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No fighters remaining</p>
        </div>
      )}
    </div>
  );
};