import React from 'react';
import { Transaction } from '../types';

interface EarningsChartProps {
  transactions: Transaction[];
}

const EarningsChart: React.FC<EarningsChartProps> = ({ transactions }) => {
  if (transactions.length < 2) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Earnings Over Time</h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <p>Not enough transaction data to display a chart.</p>
        </div>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  let cumulativeAmount = 0;
  const dataPoints = sortedTransactions.map(tx => {
    cumulativeAmount += tx.amount;
    return { date: new Date(tx.timestamp), total: cumulativeAmount };
  });

  const width = 500;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxEarnings = Math.max(...dataPoints.map(d => d.total));
  const minDate = dataPoints[0].date.getTime();
  const maxDate = dataPoints[dataPoints.length - 1].date.getTime();

  const xScale = (date: Date) => {
    const time = date.getTime();
    if (maxDate === minDate) return 0;
    return ((time - minDate) / (maxDate - minDate)) * chartWidth;
  };

  const yScale = (value: number) => {
    if (maxEarnings === 0) return chartHeight;
    return chartHeight - (value / maxEarnings) * chartHeight;
  };

  const pathData = dataPoints.map((d, i) => {
    const x = xScale(d.date);
    const y = yScale(d.total);
    return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
  }).join(' ');
  
  const areaPathData = `${pathData} L ${xScale(dataPoints[dataPoints.length - 1].date)},${chartHeight} L ${xScale(dataPoints[0].date)},${chartHeight} Z`;

  const yAxisLabels = Array.from({ length: 5 }, (_, i) => {
    const value = (maxEarnings / 4) * i;
    return { value: value.toFixed(2), y: yScale(value) };
  });
  
  const xAxisIndices = [0, Math.floor(dataPoints.length / 2), dataPoints.length - 1];
  const xAxisLabels = [...new Set(xAxisIndices)].map(i => {
    const dp = dataPoints[i];
    return {
        value: dp.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        x: xScale(dp.date)
    };
  });


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Earnings Over Time</h3>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="font-sans text-xs" role="img" aria-label="A line chart showing cumulative earnings over time.">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Y Axis */}
            <line x1="0" y1="0" x2="0" y2={chartHeight} className="stroke-current text-gray-300 dark:text-gray-600" strokeWidth="1" />
            {yAxisLabels.map(label => (
                <g key={label.value} transform={`translate(0, ${label.y})`}>
                  <line x1="-5" y1="0" x2={chartWidth} y2="0" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="1" strokeDasharray="2,2"/>
                  <text x="-10" dy="0.32em" textAnchor="end" className="fill-current text-gray-500 dark:text-gray-400">
                    ${label.value}
                  </text>
                </g>
            ))}

            {/* X Axis */}
            <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} className="stroke-current text-gray-300 dark:text-gray-600" strokeWidth="1" />
            {xAxisLabels.map((label, index) => (
                <text key={index} x={label.x} y={chartHeight + 20} textAnchor="middle" className="fill-current text-gray-500 dark:text-gray-400">
                  {label.value}
                </text>
            ))}
            <text x={chartWidth / 2} y={chartHeight + 35} textAnchor="middle" className="fill-current text-gray-400 dark:text-gray-500 text-[10px] font-medium">Date</text>

            {/* Area Gradient */}
             <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" className="text-primary-500" stopColor="currentColor" stopOpacity="0.4" />
                    <stop offset="100%" className="text-primary-500" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaPathData} fill="url(#areaGradient)" />

            {/* Line Path */}
            <path d={pathData} className="fill-none stroke-primary-600 dark:stroke-primary-400" strokeWidth="2" />
            
            {/* Data Points */}
            {dataPoints.map((d, i) => (
              <g key={i}>
                <circle cx={xScale(d.date)} cy={yScale(d.total)} r="3" className="fill-primary-600 dark:fill-primary-400" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default EarningsChart;
