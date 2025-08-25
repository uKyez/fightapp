import React, { useState, useEffect, useCallback } from 'react';
import { InstagramAuth } from './components/InstagramAuth';
import { FollowersCollector } from './components/FollowersCollector';
import { BattleArena } from './components/BattleArena';
import { BattleControls } from './components/BattleControls';
import { BattleLog } from './components/BattleLog';
import { Winner } from './components/Winner';
import { InstagramFollower } from './services/instagramApi';
import { BattleState, LogEntry } from './types';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [followers, setFollowers] = useState<InstagramFollower[]>([]);
  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [alivePlayers, setAlivePlayers] = useState<(InstagramFollower & { hp: number })[]>([]);
  const [battleLog, setBattleLog] = useState<LogEntry[]>([]);
  const [battleSpeed, setBattleSpeed] = useState(1);
  const [winner, setWinner] = useState<(InstagramFollower & { hp: number }) | null>(null);

  const handleAuthSuccess = (token: string, user: string) => {
    setAccessToken(token);
    setUsername(user);
  };

  const handleFollowersCollected = (collectedFollowers: InstagramFollower[]) => {
    setFollowers(collectedFollowers);
    setAlivePlayers(collectedFollowers.map(f => ({ ...f, hp: 100 })));
    setBattleState('ready');
    setBattleLog([]);
    setWinner(null);
  };

  const simulateBattleRound = useCallback(() => {
    setAlivePlayers(currentPlayers => {
      if (currentPlayers.length <= 1) {
        if (currentPlayers.length === 1) {
          setWinner(currentPlayers[0]);
          setBattleState('finished');
        }
        return currentPlayers;
      }

      const newPlayers = [...currentPlayers];
      
      // Select two random players
      const attackerIndex = Math.floor(Math.random() * newPlayers.length);
      let defenderIndex = Math.floor(Math.random() * newPlayers.length);
      
      // Ensure attacker and defender are different
      while (defenderIndex === attackerIndex && newPlayers.length > 1) {
        defenderIndex = Math.floor(Math.random() * newPlayers.length);
      }

      const attacker = newPlayers[attackerIndex];
      const defender = newPlayers[defenderIndex];
      
      // Calculate damage (0-30)
      const damage = Math.floor(Math.random() * 31);
      const newHp = Math.max(0, defender.hp - damage);
      
      // Update defender's HP
      newPlayers[defenderIndex] = { ...defender, hp: newHp };
      
      // Add to battle log
      const logEntry: LogEntry = {
        id: Date.now(),
        attacker: attacker.username,
        defender: defender.username,
        damage,
        timestamp: new Date()
      };
      
      setBattleLog(prev => [logEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
      
      // Remove defeated players
      const survivingPlayers = newPlayers.filter(player => player.hp > 0);
      
      return survivingPlayers;
    });
  }, []);

  useEffect(() => {
    if (battleState === 'fighting') {
      const interval = setInterval(() => {
        simulateBattleRound();
      }, Math.max(100, 1000 / battleSpeed));

      return () => clearInterval(interval);
    }
  }, [battleState, battleSpeed, simulateBattleRound]);

  const handleStartBattle = () => {
    if (alivePlayers.length < 2) return;
    setBattleState('fighting');
    setBattleLog([]);
    setWinner(null);
  };

  const handleResetBattle = () => {
    setAlivePlayers(followers.map(f => ({ ...f, hp: 100 })));
    setBattleState('ready');
    setBattleLog([]);
    setWinner(null);
  };

  if (!accessToken) {
    return <InstagramAuth onAuthSuccess={handleAuthSuccess} />;
  }

  if (followers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              Instagram Battle Arena
            </h1>
            <p className="text-gray-300">Welcome, @{username}!</p>
          </div>
          <FollowersCollector
            accessToken={accessToken}
            onFollowersCollected={handleFollowersCollected}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
            Instagram Battle Arena
          </h1>
          <p className="text-gray-300">Epic battles between real followers • @{username}</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <BattleArena 
              players={alivePlayers}
              battleState={battleState}
              totalPlayers={followers.length}
            />
          </div>

          <div className="space-y-6">
            <BattleControls
              battleState={battleState}
              onStartBattle={handleStartBattle}
              onResetBattle={handleResetBattle}
              battleSpeed={battleSpeed}
              onSpeedChange={setBattleSpeed}
              alivePlayers={alivePlayers.length}
              totalPlayers={followers.length}
            />
            <BattleLog logs={battleLog} />
          </div>
        </div>

        {winner && (
          <Winner 
            winner={winner} 
            onClose={() => setWinner(null)}
            onPlayAgain={handleResetBattle}
          />
        )}
      </div>
    </div>
  );
}

export default App;