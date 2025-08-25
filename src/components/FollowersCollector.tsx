import React, { useState } from 'react';
import { Users, Search, AlertTriangle, Info } from 'lucide-react';
import { instagramApi, InstagramFollower } from '../services/instagramApi';

interface FollowersCollectorProps {
  accessToken: string;
  onFollowersCollected: (followers: InstagramFollower[]) => void;
}

export const FollowersCollector: React.FC<FollowersCollectorProps> = ({
  accessToken,
  onFollowersCollected
}) => {
  const [targetUsername, setTargetUsername] = useState('clube.da.luta.seguidores');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCollectFollowers = async () => {
    if (!targetUsername.trim()) {
      setError('Please enter a username');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Note: This is a simulation due to Instagram API limitations
      // In production with proper permissions, you would use the Graph API
      const followers = await instagramApi.getFollowersSimulation(accessToken, targetUsername);
      onFollowersCollected(followers);
    } catch (err) {
      setError('Failed to collect followers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Collect Followers</h2>
        <p className="text-gray-300">Enter the Instagram username to collect followers from</p>
      </div>

      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-300 font-medium mb-1">API Limitation Notice</p>
            <p className="text-yellow-200 text-sm">
              Instagram's Basic Display API doesn't provide direct access to followers for privacy reasons. 
              For real follower data, you need Instagram Graph API with business account permissions.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">
            Target Instagram Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">@</span>
            </div>
            <input
              type="text"
              value={targetUsername}
              onChange={(e) => setTargetUsername(e.target.value)}
              placeholder="clube.da.luta.seguidores"
              className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleCollectFollowers}
          disabled={isLoading || !targetUsername.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Collecting Followers...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Collect Followers
            </>
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-xs">
          This demo simulates follower collection. Real implementation requires Instagram Graph API.
        </p>
      </div>
    </div>
  );
};