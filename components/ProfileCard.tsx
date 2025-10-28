import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const VerifiabilityGauge: React.FC<{ score: number }> = ({ score }) => {
    const size = 100;
    const strokeWidth = 10;
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let colorClass = 'text-green-500';
    if (score < 40) colorClass = 'text-red-500';
    else if (score < 70) colorClass = 'text-yellow-500';

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                />
                <circle
                    className={`transform -rotate-90 origin-center transition-all duration-500 ${colorClass}`}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${colorClass}`}>
                {score}
            </span>
        </div>
    );
};

const ClaimModal: React.FC<{
    earnings: number;
    onConfirm: (donate: boolean) => void;
    onCancel: () => void;
}> = ({ earnings, onConfirm, onCancel }) => {
    const [donate, setDonate] = useState(false);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-sm w-full p-6 text-center animate-fade-in-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Claim</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    You are about to claim your earnings of <strong className="text-green-500">${earnings.toFixed(2)}</strong>.
                </p>
                <div className="mt-6 flex items-center justify-center">
                    <input 
                        type="checkbox" 
                        id="donate-checkbox"
                        checked={donate}
                        onChange={(e) => setDonate(e.target.checked)}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="donate-checkbox" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Donate 10% (${(earnings * 0.1).toFixed(2)}) to charity
                    </label>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                    <button 
                        onClick={onCancel}
                        className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onConfirm(donate)}
                        className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-sm {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-sm { animation: fade-in-sm 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};


const ProfileCard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isClaiming, setIsClaiming] = useState(false);

  if (!user) return null;
  
  const handleClaim = () => {
    if (user.totalEarnings > 0) {
        setIsClaiming(true);
    }
  };
  
  const handleConfirmClaim = (donate: boolean) => {
      let message = "Success! An email has been sent with instructions to claim your earnings.";
      if (donate) {
          const donationAmount = user.totalEarnings * 0.1;
          message += `\nThank you for your $${donationAmount.toFixed(2)} donation!`;
      }
      alert(message);
      updateUser({ ...user, totalEarnings: 0 });
      setIsClaiming(false);
  };
  
  const handleCancelClaim = () => {
      setIsClaiming(false);
  }

  return (
    <>
      {isClaiming && (
          <ClaimModal 
              earnings={user.totalEarnings}
              onConfirm={handleConfirmClaim}
              onCancel={handleCancelClaim}
          />
      )}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <img
          className="w-24 h-24 mx-auto rounded-full ring-4 ring-primary-300 dark:ring-primary-600"
          src={user.profilePictureUrl}
          alt="Profile"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        
        <div className="mt-6 grid grid-cols-2 divide-x dark:divide-gray-700">
          <div className="pr-4">
               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Earnings</h3>
              <div className="mt-1 flex justify-center items-center h-16">
                   <p className="text-4xl font-extrabold text-green-500 tracking-tight">
                      ${user.totalEarnings.toFixed(2)}
                  </p>
              </div>
              
              <button 
                  onClick={handleClaim}
                  disabled={user.totalEarnings <= 0}
                  className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600 transition-all">
                  Claim Now
              </button>
          </div>
          <div className="pl-4 flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Verifiability</h3>
               <div className="mt-2">
                  <VerifiabilityGauge score={user.verifiabilityScore} />
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;