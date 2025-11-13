import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  mode: 'overall' | 'weekly';
}

const getMedal = (rank: string) => {
  switch (rank) {
    case '1': return '🥇';
    case '2': return '🥈';
    case '3': return '🥉';
    default: return null;
  }
};

const ChangeIndicator = ({ change }: { change: number }) => {
  if (change === 0) {
    return <span className="text-gray-400 font-semibold text-sm w-16 text-right">--</span>;
  }
  
  const isPositive = change > 0;
  const color = isPositive ? 'text-green-400' : 'text-red-400';
  const symbol = isPositive ? '▲' : '▼';
  
  return (
    <div className={`flex items-center justify-end w-16 ${color} font-semibold text-sm`}>
      <span>{symbol} {Math.abs(change)}</span>
    </div>
  );
};

export default function LeaderboardItem({ entry, mode }: LeaderboardItemProps) {
  const rank = mode === 'overall' ? entry.overall_rank : entry.weekly_rank;
  const points = mode === 'overall' ? entry.overall_points : entry.weekly_points;
  const change = mode === 'overall' ? parseInt(entry.overall_change, 10) : parseInt(entry.weekly_change, 10);
  
  const medal = getMedal(rank);
  const leetcodeProfileUrl = `http://leetcode.com/u/${entry.id}/`;

  const handleRowClick = () => {
    window.open(leetcodeProfileUrl, '_blank');
  };

  return (
    <div 
      onClick={handleRowClick}
      className="flex items-center px-4 py-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
    >
      <div className="w-12 text-center">
        <span className={`${medal ? 'text-2xl' : 'text-lg'} font-bold text-white`}>{medal || rank}</span>
      </div>
      <div className="flex-grow ml-12">
        <p className="text-lg font-medium text-white">{entry.name}</p>
      </div>
      <div className="hidden sm:flex w-32 text-right pr-4">
        <p className="text-lg font-bold text-indigo-400">{points}</p>
      </div>
      <div className="hidden sm:flex w-20 text-right">
        <ChangeIndicator change={change} />
      </div>
    </div>
  );
}