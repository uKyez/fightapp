import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { instagramApi } from '../services/instagramApi';

interface InstagramAuthProps {
  onAuthSuccess: (accessToken: string, username: string) => void;
}

export const InstagramAuth: React.FC<InstagramAuthProps> = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<'initial' | 'waiting' | 'processing'>('initial');

  useEffect(() => {
    // Check if we're returning from Instagram auth
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      setError('Authorization was denied or failed');
      setAuthStep('initial');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (code) {
      handleAuthCallback(code);
    }
  }, []);

  const handleAuthCallback = async (code: string) => {
    setAuthStep('processing');
    setIsLoading(true);
    setError(null);

    try {
      // Exchange code for access token
      const shortLivedToken = await instagramApi.getAccessToken(code);
      
      // Get long-lived token
      const longLivedToken = await instagramApi.getLongLivedToken(shortLivedToken);
      
      // Get user profile
      const userProfile = await instagramApi.getUserProfile(longLivedToken);
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      onAuthSuccess(longLivedToken, userProfile.username);
    } catch (err) {
      setError('Failed to authenticate with Instagram. Please try again.');
      setAuthStep('initial');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);
    setAuthStep('waiting');
    
    const authUrl = instagramApi.getAuthorizationUrl();
    window.location.href = authUrl;
  };

  if (authStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-4">Processing Authentication</h2>
          <p className="text-gray-300">
            Setting up your Instagram connection...
          </p>
        </div>
      </div>
    );
  }

  if (authStep === 'waiting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center">
          <ExternalLink className="w-16 h-16 text-pink-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Authorize Instagram Access</h2>
          <p className="text-gray-300 mb-6">
            Please complete the authorization process in the Instagram window that opened.
          </p>
          <button
            onClick={() => setAuthStep('initial')}
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            Cancel and return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Instagram Battle Arena</h1>
          <p className="text-gray-300">Connect your Instagram account to start battles</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-300 font-medium">Official Instagram API</span>
            </div>
            <p className="text-gray-300 text-sm">
              Uses Instagram's official API for secure and compliant data access
            </p>
          </div>

          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300 font-medium">Privacy Compliant</span>
            </div>
            <p className="text-gray-300 text-sm">
              Respects Instagram's terms of service and user privacy
            </p>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          ) : (
            <Instagram className="w-5 h-5 mr-2" />
          )}
          Connect Instagram Account
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            By connecting, you agree to Instagram's terms of service
          </p>
        </div>
      </div>
    </div>
  );
};