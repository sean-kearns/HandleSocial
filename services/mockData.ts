import { User, Transaction, SocialPlatform, BrandTransaction } from '../types';

export const mockUser: User = {
  id: 'user-123',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  profilePictureUrl: 'https://picsum.photos/seed/user123/200',
  socials: [
    { platform: SocialPlatform.Twitter, username: 'alex_codes', verified: true },
    { platform: SocialPlatform.GitHub, username: 'alex-doe', verified: true },
    { platform: SocialPlatform.Instagram, username: 'alex_snaps', verified: false },
    { platform: SocialPlatform.Reddit, username: 'u/alex_posts', verified: false },
    { platform: SocialPlatform.Facebook, username: 'alex.doe.123', verified: true },
    { platform: SocialPlatform.YouTube, username: 'AlexVlogs', verified: false },
  ],
  totalEarnings: 1.75,
  verifiabilityScore: 30,
  lastCaptchaRefresh: null,
};

export const mockTransactions: Transaction[] = [
  { id: 'txn-1', brandName: 'Brand A', amount: 0.05, dataPointsRequested: [SocialPlatform.Twitter, SocialPlatform.GitHub, SocialPlatform.Instagram, SocialPlatform.Reddit, SocialPlatform.TikTok], timestamp: new Date('2023-10-26T10:00:00Z') },
  { id: 'txn-2', brandName: 'Brand B', amount: 0.02, dataPointsRequested: [SocialPlatform.Twitter, SocialPlatform.GitHub], timestamp: new Date('2023-10-25T15:30:00Z') },
  { id: 'txn-3', brandName: 'Brand C', amount: 0.01, dataPointsRequested: [SocialPlatform.Twitter], timestamp: new Date('2023-10-24T12:00:00Z') },
];

// --- New Mock Data for Marketplace and Brand View ---

// 1. Marketplace Price History
const generatePriceHistory = (basePrice: number) => {
    const history: { date: Date; price: number }[] = [];
    let price = basePrice;
    for (let i = 30; i >= 0; i--) {
        history.push({
            date: new Date(new Date().setDate(new Date().getDate() - i)),
            price: parseFloat(price.toFixed(4)),
        });
        price *= (1 + (Math.random() - 0.48) * 0.1); // Fluctuate price slightly
        price = Math.max(0.005, price); // Ensure price doesn't drop too low
    }
    return history;
};

export const marketplaceData: Record<SocialPlatform, { history: { date: Date, price: number }[], verifiedBonus: number }> = {
    [SocialPlatform.Instagram]: { history: generatePriceHistory(0.012), verifiedBonus: 1.5 },
    [SocialPlatform.Twitter]: { history: generatePriceHistory(0.011), verifiedBonus: 1.6 },
    [SocialPlatform.Reddit]: { history: generatePriceHistory(0.009), verifiedBonus: 1.3 },
    [SocialPlatform.Snapchat]: { history: generatePriceHistory(0.015), verifiedBonus: 1.4 },
    [SocialPlatform.TikTok]: { history: generatePriceHistory(0.020), verifiedBonus: 1.7 },
    [SocialPlatform.GitHub]: { history: generatePriceHistory(0.025), verifiedBonus: 2.0 },
    [SocialPlatform.Facebook]: { history: generatePriceHistory(0.010), verifiedBonus: 1.5 },
    [SocialPlatform.YouTube]: { history: generatePriceHistory(0.018), verifiedBonus: 1.8 },
};

// 2. Brand View Data
export const mockCustomerList = [
    { name: 'Liam Johnson', email: 'liam.j@example.com' },
    { name: 'Olivia Smith', email: 'olivia.s@example.com' },
    { name: 'Noah Williams', email: 'noah.w@example.com' },
    { name: 'Emma Brown', email: 'emma.b@example.com' },
    { name: 'Oliver Jones', email: 'oliver.j@example.com' },
    { name: 'Ava Garcia', email: 'ava.g@example.com' },
    { name: 'Elijah Miller', email: 'elijah.m@example.com' },
    { name: 'Charlotte Davis', email: 'charlotte.d@example.com' },
    { name: 'James Rodriguez', email: 'james.r@example.com' },
    { name: 'Sophia Wilson', email: 'sophia.w@example.com' },
];


export const mockBrandProfile: { name: string; credits: number; transactions: BrandTransaction[] } = {
    name: "Stellar Inc.",
    credits: 250.00,
    transactions: [
        { 
          id: 'brand-txn-1', 
          cost: 7.20, 
          date: new Date('2023-10-25T11:00:00Z'), 
          type: 'match',
          details: {
            fileName: 'Q4_customers.csv',
            customersUploaded: 200,
            customersMatched: 120,
            platforms: [SocialPlatform.Twitter, SocialPlatform.Facebook, SocialPlatform.Instagram]
          }
        },
        { 
          id: 'brand-txn-2', 
          cost: 4.50, 
          date: new Date('2023-10-28T10:00:00Z'), 
          type: 'match',
          details: {
            fileName: 'event_attendees.csv',
            customersUploaded: 150,
            customersMatched: 90,
            platforms: [SocialPlatform.TikTok, SocialPlatform.YouTube]
          }
        },
    ]
};

export const mockEcosystemData = {
    totalUsers: 15234,
    platformStats: {
        [SocialPlatform.Instagram]: { verified: 4500, unverified: 3200 },
        [SocialPlatform.Twitter]: { verified: 6800, unverified: 2100 },
        [SocialPlatform.TikTok]: { verified: 3200, unverified: 4500 },
        [SocialPlatform.GitHub]: { verified: 1500, unverified: 500 },
        [SocialPlatform.Facebook]: { verified: 7800, unverified: 3100 },
        [SocialPlatform.YouTube]: { verified: 2800, unverified: 2900 },
    }
};

export const mockTopUsers = [
    { id: 'user-1', name: 'Casey N.', score: 100, socials: 6, avatar: 'https://picsum.photos/seed/user1/50' },
    { id: 'user-2', name: 'Jordan P.', score: 90, socials: 5, avatar: 'https://picsum.photos/seed/user2/50' },
    { id: 'user-3', name: 'Riley T.', score: 90, socials: 5, avatar: 'https://picsum.photos/seed/user3/50' },
    { id: 'user-4', name: 'Morgan L.', score: 80, socials: 6, avatar: 'https://picsum.photos/seed/user4/50' },
];

export const mockAudienceInsights = [
    'Dog Lovers', 'Food Connoisseurs', 'Sports Enthusiasts', 'Young Families', 'Thriving Professionals', 'Tech Innovators', 'Travel Aficionados'
];