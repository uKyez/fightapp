import React from 'react';
import { Sword, Shield, Skull } from 'lucide-react';
import { LogEntry } from '../types';

interface BattleLogProps {
  logs: LogEntry[];
}

export const BattleLog: React.FC<BattleLogProps> = ({ logs }) => {
  const getLogIcon = (damage: number) => {
    if (damage === 0) return <Shield className="w-4 h-4 text-blue-400" />;
    if (damage >= 25) return <Skull className="w-4 h-4 text-red-400" />;
    return <Sword className="w-4 h-4 text-orange-400" />;
  };

  const getLogColor = (damage: number) => {
    if (damage === 0) return 'text-blue-300';
    if (damage >= 25) return 'text-red-300';
    return 'text-orange-300';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Battle Log</h3>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            Battle log will appear here...
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="bg-white/5 rounded-lg p-3 border-l-4 border-purple-500 animate-fade-in"
            >
              <div className="flex items-center mb-1">
                {getLogIcon(log.damage)}
                <span className={`ml-2 text-sm font-medium ${getLogColor(log.damage)}`}>
                  {log.damage === 0 ? 'MISS!' : `${log.damage} damage`}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                <span className="font-medium text-white">@{log.attacker}</span>
                {log.damage === 0 ? ' missed ' : ' attacked '}
                <span className="font-medium text-white">@{log.defender}</span>
                {log.damage > 0 && ` for ${log.damage} damage`}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {log.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};