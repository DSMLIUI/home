import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  mode: 'overall' | 'weekly';
}

const getRankColor = (rank: string) => {
  const rankNum = parseInt(rank);
  if (rankNum === 1) return 'text-yellow-500';
  if (rankNum === 2) return 'text-gray-400';
  if (rankNum === 3) return 'text-orange-600';
  return 'text-mid-gray';
};

const ChangeIndicator = ({ change }: { change: number }) => {
  if (change === 0) {
    return <span className="text-mid-gray font-mono text-xs">—</span>;
  }
  
  const isPositive = change > 0;
  const color = isPositive ? 'text-muted-blue' : 'text-subtle-red';
  const symbol = isPositive ? '+' : '-';
  
  return (
    <span className={`${color} font-mono text-xs`}>
      {symbol}{Math.abs(change)}
    </span>
  );
};

export default function LeaderboardItem({ entry, mode }: LeaderboardItemProps) {
  const rank = mode === 'overall' ? entry.overall_rank : entry.weekly_rank;
  const points = mode === 'overall' ? entry.overall_points : entry.weekly_points;
  const change = mode === 'overall' ? parseInt(entry.overall_change, 10) : parseInt(entry.weekly_change, 10);
  
  const leetcodeProfileUrl = `http://leetcode.com/u/${entry.id}/`;
  const rankColor = getRankColor(rank);

  const handleRowClick = () => {
    window.open(leetcodeProfileUrl, '_blank');
  };

  return (
    <div 
      onClick={handleRowClick}
      className="flex items-center px-6 py-4 border-b border-dark-gray last:border-b-0 hover:bg-dark-gray cursor-pointer transition-colors"
    >
      <div className="w-16 flex-shrink-0 flex items-center justify-center">
        <span className={`text-sm font-mono font-medium ${rankColor}`}>{rank.padStart(2, '0')}</span>
      </div>
      <div className="flex-grow ml-6">
        <span className="text-sm font-mono text-off-white">{entry.name}</span>
      </div>
      <div className="hidden sm:flex items-center gap-12">
        <span className="text-sm font-mono text-muted-blue min-w-[100px] text-right">
          {mode === 'overall' ? parseInt(points).toLocaleString() : points}
        </span>
        <div className="w-20 text-right">
          <ChangeIndicator change={change} />
        </div>
      </div>
    </div>
  );
}