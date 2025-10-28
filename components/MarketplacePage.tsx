import React, { useState, useMemo } from 'react';
import { SocialPlatform } from '../types';
import { marketplaceData } from '../services/mockData';
import {
  InstagramIcon, TwitterIcon, RedditIcon, SnapchatIcon, TikTokIcon, GitHubIcon, FacebookIcon, YouTubeIcon
} from './icons/SocialIcons';

const platformDetails: Record<SocialPlatform, { icon: React.FC<{className?: string}>, color: string }> = {
  [SocialPlatform.Instagram]: { icon: InstagramIcon, color: '#E1306C' },
  [SocialPlatform.Twitter]: { icon: TwitterIcon, color: '#1DA1F2' },
  [SocialPlatform.Reddit]: { icon: RedditIcon, color: '#FF4500' },
  [SocialPlatform.Snapchat]: { icon: SnapchatIcon, color: '#FFFC00' },
  [SocialPlatform.TikTok]: { icon: TikTokIcon, color: '#000000' },
  [SocialPlatform.GitHub]: { icon: GitHubIcon, color: '#333' },
  [SocialPlatform.Facebook]: { icon: FacebookIcon, color: '#1877F2' },
  [SocialPlatform.YouTube]: { icon: YouTubeIcon, color: '#FF0000' },
};

const PriceHistoryChart: React.FC<{
  platforms: SocialPlatform[];
  verifiabilityScore: number;
}> = ({ platforms, verifiabilityScore }) => {
    
    const memoizedChartData = useMemo(() => {
        const scoreMultiplier = 1 + (verifiabilityScore / 100);

        return platforms.map(platform => {
            const data = marketplaceData[platform];
            if (!data) return null;
            const points = data.history.map(h => {
                const verifiedPrice = h.price * data.verifiedBonus * scoreMultiplier;
                const unverifiedPrice = h.price * scoreMultiplier;
                return { date: h.date, verified: verifiedPrice, unverified: unverifiedPrice };
            });
            return { platform, points };
        }).filter(Boolean) as { platform: SocialPlatform; points: { date: Date; verified: number; unverified: number }[] }[];
    }, [platforms, verifiabilityScore]);

    if (memoizedChartData.length === 0) {
        return <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-gray-500 dark:text-gray-400">Select a platform to view its market rate.</div>;
    }

    const allPrices = memoizedChartData.flatMap(d => d.points.flatMap(p => [p.verified, p.unverified]));
    const maxPrice = Math.max(...allPrices, 0.01);
    const minDate = memoizedChartData[0]?.points[0]?.date.getTime();
    const maxDate = memoizedChartData[0]?.points[memoizedChartData[0].points.length - 1]?.date.getTime();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xScale = (date: Date) => ((date.getTime() - minDate) / (maxDate - minDate)) * chartWidth;
    const yScale = (price: number) => chartHeight - (price / maxPrice) * chartHeight;
    
    const yAxisLabels = Array.from({ length: 6 }, (_, i) => {
        const value = (maxPrice / 5) * i;
        return { value: (value * 100).toFixed(2), y: yScale(value) };
    });

    const createPath = (data: { date: Date; value: number }[]) => data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.date)},${yScale(d.value)}`).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto font-sans text-xs" role="img" aria-label="A line chart showing market rates for social media handles over the last 30 days.">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {/* Y Axis, Gridlines, and Title */}
                <text
                    transform="rotate(-90)"
                    y={0 - margin.left}
                    x={0 - (chartHeight / 2)}
                    dy="1em"
                    textAnchor="middle"
                    className="fill-current text-gray-500 dark:text-gray-400 font-semibold"
                >
                    Price (¢)
                </text>
                {yAxisLabels.map(label => (
                    <g key={label.value} transform={`translate(0, ${label.y})`}>
                        <line x1="-5" y1="0" x2={chartWidth} y2="0" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="1" strokeDasharray="2,2" />
                        <text x="-10" dy="0.32em" textAnchor="end" className="fill-current text-gray-500 dark:text-gray-400">{label.value}¢</text>
                    </g>
                ))}
                
                {/* X Axis and Title */}
                <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} className="stroke-current text-gray-300 dark:text-gray-600" strokeWidth="1" />
                 <text
                    x={chartWidth / 2}
                    y={chartHeight + margin.bottom - 10}
                    textAnchor="middle"
                    className="fill-current text-gray-500 dark:text-gray-400 font-semibold"
                >
                    Date
                </text>
                
                {/* Data Lines */}
                {memoizedChartData.map(({ platform, points }) => (
                    <g key={platform}>
                        <path d={createPath(points.map(p => ({ date: p.date, value: p.verified })))} fill="none" stroke={platformDetails[platform]?.color || '#000'} strokeWidth="2" />
                        <path d={createPath(points.map(p => ({ date: p.date, value: p.unverified })))} fill="none" stroke={platformDetails[platform]?.color || '#000'} strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                    </g>
                ))}
            </g>
        </svg>
    );
};

const MarketplacePage: React.FC = () => {
    const [verifiabilityScore, setVerifiabilityScore] = useState(50);
    const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([SocialPlatform.Twitter, SocialPlatform.GitHub]);

    const handlePlatformToggle = (platform: SocialPlatform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
        );
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Data Marketplace</h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Explore the value of different data points based on platform, verification, and verifiability.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="verifiabilityScore" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Verifiability Score: <span className="font-bold text-primary-600 dark:text-primary-400">{verifiabilityScore}</span>
                            </label>
                            <input
                                type="range"
                                id="verifiabilityScore"
                                min="0"
                                max="100"
                                value={verifiabilityScore}
                                onChange={e => setVerifiabilityScore(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Platforms</h4>
                            <div className="flex flex-wrap gap-2">
                                {Object.values(SocialPlatform).map(platform => {
                                    const { icon: Icon, color } = platformDetails[platform];
                                    const isSelected = selectedPlatforms.includes(platform);
                                    return (
                                        <button
                                            key={platform}
                                            onClick={() => handlePlatformToggle(platform)}
                                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-full border-2 transition-all ${
                                                isSelected ? 'text-white shadow-md' : 'bg-transparent text-gray-700 dark:text-gray-300'
                                            }`}
                                            style={{
                                                backgroundColor: isSelected ? color : 'transparent',
                                                borderColor: color,
                                                color: isSelected ? (color === '#FFFC00' ? '#000' : '#fff') : color
                                            }}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {platform}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Legend */}
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Chart Legend</h4>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                                <div className="w-8 h-0.5 bg-gray-700 dark:bg-gray-300 mr-2"></div>
                                <span>Verified Handle Rate</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-0.5 bg-gray-500 dark:bg-gray-400 mr-2 border-dashed border-t-2 border-gray-500 dark:border-gray-400"></div>
                                <span>Unverified Handle Rate</span>
                            </div>
                            <p className="text-xs mt-2 italic">Prices are shown in cents (¢) and are for illustrative purposes.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                 <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">Market Rates Over Time</h3>
                <PriceHistoryChart platforms={selectedPlatforms} verifiabilityScore={verifiabilityScore} />
            </div>
        </div>
    );
};

export default MarketplacePage;