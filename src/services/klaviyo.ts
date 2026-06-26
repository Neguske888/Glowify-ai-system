const KLAVIYO_API_KEY = import.meta.env.VITE_KLAVIYO_API_KEY || '';

export interface KlaviyoProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  created: string;
  updated: string;
  properties: Record<string, any>;
}

export interface KlaviyoList {
  id: string;
  name: string;
  member_count: number;
  created: string;
}

export interface KlaviyoEvent {
  id: string;
  event_name: string;
  properties: Record<string, any>;
  timestamp: string;
  profile: KlaviyoProfile;
}

class KlaviyoService {
  private apiKey: string;
  private baseUrl = 'https://a.klaviyo.com/api';

  constructor() {
    this.apiKey = KLAVIYO_API_KEY;
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.startsWith('pk_');
  }

  // Validate Klaviyo API key format
  static isValidKey(key: string): boolean {
    return /^pk_[a-zA-Z0-9]+$/.test(key);
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Klaviyo API key not configured');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${this.apiKey}`,
        'revision': '2024-02-15',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Klaviyo API error: ${response.status}`);
    }

    return response.json();
  }

  // Get all profiles
  async getProfiles(): Promise<KlaviyoProfile[]> {
    try {
      const data = await this.request('/profiles/');
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Klaviyo profiles:', error);
      return [];
    }
  }

  // Get all lists
  async getLists(): Promise<KlaviyoList[]> {
    try {
      const data = await this.request('/lists/');
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Klaviyo lists:', error);
      return [];
    }
  }

  // Get profile by email
  async getProfileByEmail(email: string): Promise<KlaviyoProfile | null> {
    try {
      const data = await this.request(`/profiles/?filter=equals(email,"${email}")`);
      return data.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching Klaviyo profile:', error);
      return null;
    }
  }

  // Track event
  async trackEvent(eventName: string, profile: { email: string; [key: string]: any }): Promise<boolean> {
    try {
      await this.request('/events/', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'event',
            attributes: {
              properties: profile,
              metric: {
                data: {
                  type: 'metric',
                  attributes: {
                    name: eventName,
                  },
                },
              },
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email: profile.email,
                  },
                },
              },
            },
          },
        }),
      });
      return true;
    } catch (error) {
      console.error('Error tracking Klaviyo event:', error);
      return false;
    }
  }

  // Get account info
  async getAccount(): Promise<{ account_name: string; account_id: string } | null> {
    try {
      const data = await this.request('/account/');
      return data.data ? {
        account_name: data.data.attributes?.account_name || 'Klaviyo Account',
        account_id: data.data.id,
      } : null;
    } catch (error) {
      console.error('Error fetching Klaviyo account:', error);
      return null;
    }
  }
}

export const klaviyoService = new KlaviyoService();
export default klaviyoService;
