import React from 'react';
import { Transaction, SocialPlatform } from '../types';
import {
  InstagramIcon, TwitterIcon, RedditIcon, SnapchatIcon, TikTokIcon, GitHubIcon, FacebookIcon, YouTubeIcon
} from './icons/SocialIcons';

interface TransactionsProps {
  transactions: Transaction[];
}

const platformMiniIcons: Record<SocialPlatform, React.FC<{className?: string; title?: string}>> = {
  [SocialPlatform.Instagram]: InstagramIcon,
  [SocialPlatform.Twitter]: TwitterIcon,
  [SocialPlatform.Reddit]: RedditIcon,
  [SocialPlatform.Snapchat]: SnapchatIcon,
  [SocialPlatform.TikTok]: TikTokIcon,
  [SocialPlatform.GitHub]: GitHubIcon,
  [SocialPlatform.Facebook]: FacebookIcon,
  [SocialPlatform.YouTube]: YouTubeIcon,
};

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Brand</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data Points</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{tx.brandName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-semibold">+${tx.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex -space-x-1">
                    {tx.dataPointsRequested.map(platform => {
                      const Icon = platformMiniIcons[platform];
                      return Icon ? <Icon key={platform} className="w-5 h-5 text-gray-500" title={platform} /> : null;
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(tx.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
             {transactions.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No transactions yet.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;