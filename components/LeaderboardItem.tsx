import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
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

export default function LeaderboardItem({ entry }: LeaderboardItemProps) {
  const medal = getMedal(entry.rank);
  const change = parseInt(entry.change, 10);

  return (
    <div className="flex items-center p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-colors duration-200">
      <div className="w-12 text-center">
        <span className="text-lg font-bold text-white">{medal || entry.rank}</span>
      </div>
      <div className="flex-grow ml-4">
        <p className="text-lg font-medium text-white">{entry.name}</p>
      </div>
      <div className="w-24 text-right">
        <p className="text-lg font-bold text-indigo-400">{entry.points}</p>
      </div>
      <div className="w-16 text-right">
        <ChangeIndicator change={change} />
      </div>
    </div>
  );
}