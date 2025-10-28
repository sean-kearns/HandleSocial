import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PuzzlePieceIcon, ShieldCheckIcon } from './icons/SocialIcons';

const VerificationManager: React.FC = () => {
    const { user, updateUser } = useAuth();
    
    if (!user) return null;

    const handleCompleteCaptcha = () => {
        const newScore = Math.min(100, user.verifiabilityScore + 10);
        updateUser({
            ...user,
            verifiabilityScore: newScore,
            lastCaptchaRefresh: new Date(),
        });
    };

    const handleClearAuth = () => {
        updateUser({ ...user, verifiabilityScore: 100 });
    };

    const isMaxScore = user.verifiabilityScore === 100;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verification Center</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Increase your verifiability score to earn better rates on your data.
            </p>
            <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <PuzzlePieceIcon className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400"/>
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-100">Complete a CAPTCHA</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">+10 to score</p>
                            </div>
                        </div>
                         <button 
                            onClick={handleCompleteCaptcha}
                            disabled={isMaxScore}
                            className="px-4 py-2 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            Complete
                        </button>
                    </div>
                    {user.lastCaptchaRefresh && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
                           Last completed: {new Date(user.lastCaptchaRefresh).toLocaleDateString()}
                        </p>
                    )}
                </div>
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <ShieldCheckIcon className="w-6 h-6 mr-3 text-green-500"/>
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-100">Authenticate with Clear</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Max out your score</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleClearAuth}
                            disabled={isMaxScore}
                            className="px-4 py-2 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            Authenticate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationManager;
