export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    stripeCustomerId?: string;
    subscriptions?: {
      [key: string]: 'active' | 'pastDue' | 'cancelled';
    }

    // for Stripe Connect
    accountId?: string;
    refreshToken?: string;
  }