import React from 'react';
import { Play, Square, RotateCcw, Zap } from 'lucide-react';
import { BattleState } from '../types';

interface BattleControlsProps {
  battleState: BattleState;
  onStartBattle: () => void;
  onResetBattle: () => void;
  battleSpeed: number;
  onSpeedChange: (speed: number) => void;
  alivePlayers: number;
  totalPlayers: number;
}

export const BattleControls: React.FC<BattleControlsProps> = ({
  battleState,
  onStartBattle,
  onResetBattle,
  battleSpeed,
  onSpeedChange,
  alivePlayers,
  totalPlayers
}) => {
  const speedOptions = [
    { value: 1, label: '1x', color: 'bg-blue-500' },
    { value: 2, label: '2x', color: 'bg-green-500' },
    { value: 4, label: '4x', color: 'bg-yellow-500' },
    { value: 6, label: '6x', color: 'bg-red-500' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Battle Controls</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onStartBattle}
            disabled={battleState === 'fighting' || alivePlayers < 2}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </button>
          
          <button
            onClick={onResetBattle}
            disabled={battleState === 'fighting'}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>

        <div>
          <div className="flex items-center mb-3">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Battle Speed</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {speedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSpeedChange(option.value)}
                className={`py-2 px-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                  battleSpeed === option.value
                    ? `${option.color} shadow-lg scale-105`
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Alive</span>
            <span className="text-green-400 font-bold">{alivePlayers}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Eliminated</span>
            <span className="text-red-400 font-bold">{totalPlayers - alivePlayers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total</span>
            <span className="text-white font-bold">{totalPlayers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};