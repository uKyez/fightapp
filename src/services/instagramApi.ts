import axios from 'axios';

const INSTAGRAM_API_BASE = 'https://graph.instagram.com';
const INSTAGRAM_AUTH_BASE = 'https://api.instagram.com';

export interface InstagramUser {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
}

export interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  username: string;
  timestamp: string;
}

export interface InstagramFollower {
  id: string;
  username: string;
  profile_picture_url?: string;
}

class InstagramApiService {
  private appId: string;
  private appSecret: string;
  private redirectUri: string;

  constructor() {
    this.appId = import.meta.env.VITE_INSTAGRAM_APP_ID || '';
    this.appSecret = import.meta.env.VITE_INSTAGRAM_APP_SECRET || '';
    this.redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI || '';
  }

  // Step 1: Get authorization URL
  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.appId,
      redirect_uri: this.redirectUri,
      scope: 'user_profile,user_media',
      response_type: 'code'
    });

    return `${INSTAGRAM_AUTH_BASE}/oauth/authorize?${params.toString()}`;
  }

  // Step 2: Exchange code for access token
  async getAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post(`${INSTAGRAM_AUTH_BASE}/oauth/access_token`, {
        client_id: this.appId,
        client_secret: this.appSecret,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
        code: code
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get access token');
    }
  }

  // Step 3: Get long-lived access token
  async getLongLivedToken(shortLivedToken: string): Promise<string> {
    try {
      const params = new URLSearchParams({
        grant_type: 'ig_exchange_token',
        client_secret: this.appSecret,
        access_token: shortLivedToken
      });

      const response = await axios.get(`${INSTAGRAM_API_BASE}/access_token?${params.toString()}`);
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting long-lived token:', error);
      throw new Error('Failed to get long-lived token');
    }
  }

  // Get user profile
  async getUserProfile(accessToken: string): Promise<InstagramUser> {
    try {
      const response = await axios.get(`${INSTAGRAM_API_BASE}/me`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: accessToken
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to get user profile');
    }
  }

  // Get user media (to find followers through comments/likes - limited approach)
  async getUserMedia(accessToken: string, limit: number = 25): Promise<InstagramMedia[]> {
    try {
      const response = await axios.get(`${INSTAGRAM_API_BASE}/me/media`, {
        params: {
          fields: 'id,media_type,media_url,username,timestamp',
          access_token: accessToken,
          limit: limit
        }
      });

      return response.data.data || [];
    } catch (error) {
      console.error('Error getting user media:', error);
      throw new Error('Failed to get user media');
    }
  }

  // Note: Instagram Basic Display API doesn't provide direct access to followers
  // This is a limitation of the official API for privacy reasons
  // Alternative approaches would require Instagram Graph API (business accounts only)
  // or web scraping (which violates ToS)
  
  // Simulate followers based on available data (for demo purposes)
  async getFollowersSimulation(accessToken: string, targetUsername: string): Promise<InstagramFollower[]> {
    // In a real implementation, you would need:
    // 1. Instagram Graph API with business account
    // 2. Approved app with advanced permissions
    // 3. Target account must be a business account you manage
    
    // For now, we'll simulate based on the target username
    const followers: InstagramFollower[] = [];
    
    // Generate realistic followers based on the target account
    const baseNames = [
      'fighter', 'warrior', 'champion', 'gladiator', 'boxer', 'martial', 'combat', 'battle',
      'strong', 'power', 'force', 'energy', 'spirit', 'soul', 'heart', 'mind',
      'club', 'team', 'squad', 'crew', 'gang', 'group', 'family', 'brotherhood'
    ];
    
    const suffixes = ['_oficial', '_real', '_br', '_sp', '_rj', '_mg', '123', '456', '789', '_fighter'];
    
    for (let i = 0; i < 1500; i++) {
      const baseName = baseNames[Math.floor(Math.random() * baseNames.length)];
      const suffix = Math.random() > 0.5 ? suffixes[Math.floor(Math.random() * suffixes.length)] : '';
      const number = Math.random() > 0.7 ? Math.floor(Math.random() * 999) : '';
      
      followers.push({
        id: `follower_${i}`,
        username: `${baseName}${suffix}${number}`,
        profile_picture_url: `https://picsum.photos/150/150?random=${i}`
      });
    }
    
    return followers;
  }
}

export const instagramApi = new InstagramApiService();