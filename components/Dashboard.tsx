import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import SocialsManager from './SocialsManager';
import Transactions from './Transactions';
import EarningsChart from './EarningsChart';
import VerificationManager from './VerificationManager';
import { useAuth } from '../contexts/AuthContext';
import { mockTransactions } from '../services/mockData';
import { Transaction } from '../types';

interface DashboardProps {
    onNavigate: (view: 'marketplace') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const { user, updateUser } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

    if (!user) return null;

    const handleSimulateRequest = () => {
        const brands = ['Nexus Corp', 'Stellar Inc.', 'Quantum Ads', 'Apex Marketing'];
        const randomBrand = brands[Math.floor(Math.random() * brands.length)];
        
        const verifiedSocials = user.socials.filter(s => s.verified).map(s => s.platform);
        if (verifiedSocials.length === 0) {
            alert("Please verify at least one social handle to participate in data requests.");
            return;
        }

        const scoreBonus = 1 + (user.verifiabilityScore / 100);
        const requestedCount = Math.floor(Math.random() * verifiedSocials.length) + 1;
        const dataPointsRequested = verifiedSocials.slice(0, requestedCount);
        const amount = dataPointsRequested.length * 0.01 * scoreBonus;

        const newTransaction: Transaction = {
            id: `txn-${Date.now()}`,
            brandName: randomBrand,
            amount: amount,
            dataPointsRequested,
            timestamp: new Date(),
        };

        setTransactions(prev => [newTransaction, ...prev]);
        updateUser({ ...user, totalEarnings: user.totalEarnings + amount });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <ProfileCard />
                    <VerificationManager />
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Simulate Market</h3>
                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Click the button to simulate a brand requesting your verified data. You'll earn based on your verifiability score.
                         </p>
                         <button onClick={handleSimulateRequest} className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all">
                             Simulate Brand Request
                         </button>
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market Insights</h3>
                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Curious about your data's value? Check out the marketplace to see live rates and trends for different social handles.
                         </p>
                         <button onClick={() => onNavigate('marketplace')} className="w-full px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 rounded-md hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-all">
                             Go to Marketplace
                         </button>
                    </div>
                </div>
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <SocialsManager />
                    <EarningsChart transactions={transactions} />
                    <Transactions transactions={transactions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;