// FIX: Removed the self-import of `SocialPlatform` which was causing a circular dependency and declaration conflict.
export enum SocialPlatform {
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  Reddit = 'Reddit',
  Snapchat = 'Snapchat',
  TikTok = 'TikTok',
  GitHub = 'GitHub',
  Facebook = 'Facebook',
  YouTube = 'YouTube',
}

export interface SocialAccount {
  platform: SocialPlatform;
  username: string;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  socials: SocialAccount[];
  totalEarnings: number;
  verifiabilityScore: number;
  lastCaptchaRefresh: Date | null;
}

export interface Transaction {
  id: string;
  brandName: string;
  amount: number;
  dataPointsRequested: SocialPlatform[];
  timestamp: Date;
}

export interface BrandTransaction {
  id: string;
  cost: number;
  date: Date;
  type: 'match';
  details: {
    fileName: string;
    customersUploaded: number;
    customersMatched: number;
    platforms: SocialPlatform[];
  }
}