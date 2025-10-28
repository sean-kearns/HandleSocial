import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SocialAccount, SocialPlatform } from '../types';
import {
  InstagramIcon, TwitterIcon, RedditIcon, SnapchatIcon, TikTokIcon, GitHubIcon, FacebookIcon, YouTubeIcon,
  CheckCircleIcon, ExclamationTriangleIcon, PlusCircleIcon, XMarkIcon
} from './icons/SocialIcons';

const platformIcons: Record<SocialPlatform, React.FC<{className?: string}>> = {
  [SocialPlatform.Instagram]: InstagramIcon,
  [SocialPlatform.Twitter]: TwitterIcon,
  [SocialPlatform.Reddit]: RedditIcon,
  [SocialPlatform.Snapchat]: SnapchatIcon,
  [SocialPlatform.TikTok]: TikTokIcon,
  [SocialPlatform.GitHub]: GitHubIcon,
  [SocialPlatform.Facebook]: FacebookIcon,
  [SocialPlatform.YouTube]: YouTubeIcon,
};

const SocialsManager: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>(SocialPlatform.Twitter);
  const [newUsername, setNewUsername] = useState('');

  if (!user) return null;

  const handleVerify = (platform: SocialPlatform) => {
    const updatedSocials = user.socials.map(s =>
      s.platform === platform ? { ...s, verified: true } : s
    );
    updateUser({ ...user, socials: updatedSocials });
  };

  const handleAdd = () => {
    if (!newUsername.trim()) return;

    const existing = user.socials.find(s => s.platform === newPlatform);
    if (existing) {
        alert(`${newPlatform} handle already exists.`);
        return;
    }

    const newAccount: SocialAccount = {
      platform: newPlatform,
      username: newUsername.trim(),
      verified: false,
    };

    updateUser({ ...user, socials: [...user.socials, newAccount] });
    setNewUsername('');
    setIsAdding(false);
  };
  
  const handleRemove = (platform: SocialPlatform) => {
    if (window.confirm(`Are you sure you want to remove your ${platform} handle?`)) {
       const updatedSocials = user.socials.filter(s => s.platform !== platform);
       updateUser({ ...user, socials: updatedSocials });
    }
  };

  const availablePlatforms = Object.values(SocialPlatform).filter(
    p => !user.socials.some(s => s.platform === p)
  );
  
  // Set default for newPlatform if current selection is not available
  React.useEffect(() => {
      if (availablePlatforms.length > 0 && !availablePlatforms.includes(newPlatform)) {
          setNewPlatform(availablePlatforms[0]);
      }
  }, [user.socials, newPlatform, availablePlatforms]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Social Handles</h3>
        {!isAdding && availablePlatforms.length > 0 && (
          <button onClick={() => setIsAdding(true)} className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 font-medium">
            <PlusCircleIcon className="w-5 h-5 mr-1" />
            Add Handle
          </button>
        )}
      </div>
      <div className="space-y-4">
        {user.socials.map(social => {
          const Icon = platformIcons[social.platform];
          return (
            <div key={social.platform} className={`p-3 rounded-lg flex items-center justify-between transition-all ${
              social.verified ? 'bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700' : 'bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-700'
            }`}>
              <div className="flex items-center">
                <Icon className="w-6 h-6 mr-3 text-gray-600 dark:text-gray-300" />
                <span className="font-medium text-gray-800 dark:text-gray-100">{social.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                {social.verified ? (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <CheckCircleIcon className="w-5 h-5 mr-1" />
                    Verified
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-sm text-yellow-600 dark:text-yellow-400">
                      <ExclamationTriangleIcon className="w-5 h-5 mr-1" />
                      Unverified
                    </div>
                    <button onClick={() => handleVerify(social.platform)} className="px-3 py-1 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Verify</button>
                  </div>
                )}
                <button onClick={() => handleRemove(social.platform)} className="p-1 text-gray-400 hover:text-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500">
                   <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        {isAdding && (
          <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Add New Handle</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <select 
                value={newPlatform} 
                onChange={e => setNewPlatform(e.target.value as SocialPlatform)}
                className="flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                {availablePlatforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <input 
                type="text"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                placeholder="Enter username"
                className="flex-grow w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
              <div className="flex items-center gap-2">
                <button onClick={handleAdd} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Save</button>
                <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialsManager;