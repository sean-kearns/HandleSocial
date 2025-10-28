import React, { useState, useMemo } from 'react';
import { SocialPlatform, BrandTransaction } from '../types';
import { mockBrandProfile, mockEcosystemData, mockTopUsers, mockAudienceInsights, mockCustomerList } from '../services/mockData';
// FIX: Removed XCircleIcon as it is not exported from SocialIcons. Also removed unused CheckCircleIcon.
import { CreditCardIcon, UsersIcon } from './icons/SocialIcons';

const EcosystemStatsChart: React.FC = () => {
    const stats = mockEcosystemData.platformStats;
    const platforms = Object.keys(stats) as SocialPlatform[];
    
    return (
        <div className="space-y-4">
            {platforms.map(platform => {
                const { verified, unverified } = stats[platform];
                const total = verified + unverified;
                const verifiedWidth = (verified / total) * 100;

                return (
                    <div key={platform}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{platform}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{total.toLocaleString()} users</span>
                        </div>
                        <div className="w-full bg-yellow-200 dark:bg-yellow-900/50 rounded-full h-4 overflow-hidden">
                           <div className="bg-green-500 h-4" style={{ width: `${verifiedWidth}%` }}></div>
                        </div>
                    </div>
                );
            })}
             <div className="flex justify-end space-x-4 text-xs mt-2">
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>Verified</div>
                <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500 mr-1.5"></div>Unverified</div>
            </div>
        </div>
    );
};

const CustomerMatchPurchase: React.FC<{
    credits: number;
    onPurchase: (cost: number, transaction: BrandTransaction) => void;
}> = ({ credits, onPurchase }) => {
    const [step, setStep] = useState<'idle' | 'matching'>('idle');
    const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);

    const matchedCustomers = useMemo(() => mockCustomerList.filter((_, index) => index % 1.3 > 0.2), []); // Simulate ~70% match rate
    const costPerDataPoint = 0.015;
    const totalCost = matchedCustomers.length * selectedPlatforms.length * costPerDataPoint;
    
    const handlePlatformToggle = (platform: SocialPlatform) => {
        setSelectedPlatforms(prev => 
            prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
        );
    };

    const handlePurchase = () => {
        if (totalCost <= 0 || totalCost > credits) return;

        const newTransaction: BrandTransaction = {
            id: `brand-txn-${Date.now()}`,
            cost: totalCost,
            date: new Date(),
            type: 'match',
            details: {
                fileName: 'sample_list.csv',
                customersUploaded: mockCustomerList.length,
                customersMatched: matchedCustomers.length,
                platforms: selectedPlatforms,
            }
        };
        onPurchase(totalCost, newTransaction);
        setStep('idle');
        setSelectedPlatforms([]);
    };
    
    if (step === 'idle') {
        return (
            <div className="text-center">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Purchase via Customer Match</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Upload your customer list to find matches in our ecosystem and enrich your data.</p>
                 <button onClick={() => setStep('matching')} className="w-full px-4 py-2 font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
                    Simulate List Upload
                 </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Match Results</h3>
                <button onClick={() => setStep('idle')} className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Cancel</button>
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                 <p className="font-bold text-primary-600 dark:text-primary-400">{matchedCustomers.length} / {mockCustomerList.length} Matched</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400">({(matchedCustomers.length / mockCustomerList.length * 100).toFixed(0)}% Match Rate)</p>
            </div>

            <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select data points to request:</h4>
                <div className="flex flex-wrap gap-2">
                    {Object.values(SocialPlatform).map(platform => (
                        <button key={platform} onClick={() => handlePlatformToggle(platform)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                                selectedPlatforms.includes(platform)
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-500'
                            }`}
                        >
                            {platform}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Estimated Cost:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">${totalCost.toFixed(2)}</span>
                </div>
                <button onClick={handlePurchase} disabled={totalCost <= 0 || totalCost > credits} className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {totalCost > credits ? 'Insufficient Credits' : 'Purchase Matched Data'}
                </button>
            </div>
        </div>
    );
};


const BrandView: React.FC = () => {
    const [brandData, setBrandData] = useState(mockBrandProfile);

    const handlePurchase = (cost: number, transaction: BrandTransaction) => {
        setBrandData(prev => ({
            ...prev,
            credits: prev.credits - cost,
            transactions: [transaction, ...prev.transactions]
        }));
        alert(`Purchase successful! $${cost.toFixed(2)} has been deducted from your credits.`);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-left">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Brand Dashboard</h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Insights into the Handle Social user ecosystem. (Sample Data)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                    <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
                        <CreditCardIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Available Credits</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${brandData.credits.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
                     <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                        <UsersIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockEcosystemData.totalUsers.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ecosystem Breakdown</h3>
                        <EcosystemStatsChart />
                    </div>
                     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction History</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                           {brandData.transactions.map(tx => (
                               <div key={tx.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                   <div className="flex justify-between items-center text-sm">
                                       <p className="font-semibold text-gray-800 dark:text-gray-100">
                                            {tx.details.fileName}
                                       </p>
                                       <p className="font-bold text-red-500">-${tx.cost.toFixed(2)}</p>
                                   </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {tx.details.customersMatched}/{tx.details.customersUploaded} matched | Platforms: {tx.details.platforms.join(', ')} | {new Date(tx.date).toLocaleDateString()}
                                    </p>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <CustomerMatchPurchase credits={brandData.credits} onPurchase={handlePurchase} />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Users</h3>
                        <div className="space-y-4">
                           {mockTopUsers.map(user => (
                               <div key={user.id} className="flex items-center space-x-3">
                                   <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                   <div className="flex-1">
                                       <p className="font-semibold text-sm text-gray-900 dark:text-white">{user.name}</p>
                                       <p className="text-xs text-gray-500 dark:text-gray-400">{user.socials} Verified Handles</p>
                                   </div>
                                   <div className="text-sm font-bold text-green-500">{user.score}</div>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandView;