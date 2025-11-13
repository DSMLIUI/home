import React, { useState, useEffect } from 'react';
import type { LeaderboardEntry } from '../types';
import LeaderboardItem from '../components/LeaderboardItem';

declare const Papa: any;

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'overall' | 'weekly'>('overall');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/leetcode_leaderboard.csv`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: { data: LeaderboardEntry[] }) => {
            // Sort by the appropriate rank
            const sorted = [...results.data].sort((a, b) => {
              const rankA = parseInt(a.overall_rank, 10);
              const rankB = parseInt(b.overall_rank, 10);
              return rankA - rankB;
            });
            setEntries(sorted);
            setLoading(false);
          },
          error: (err: Error) => {
            throw new Error(`CSV parsing error: ${err.message}`);
          }
        });

      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const sortedEntries = [...entries].sort((a, b) => {
    if (mode === 'overall') {
      return parseInt(a.overall_rank, 10) - parseInt(b.overall_rank, 10);
    } else {
      return parseInt(a.weekly_rank, 10) - parseInt(b.weekly_rank, 10);
    }
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">
          LeetCode <span className="text-indigo-400">Champions</span>
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          Track our members' progress and problem-solving prowess.
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode('overall')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            mode === 'overall'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Overall Rank
        </button>
        <button
          onClick={() => setMode('weekly')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            mode === 'weekly'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Weekly Rank
        </button>
      </div>
      
      {loading && <div className="text-center text-gray-400">Loading leaderboard...</div>}
      {error && <div className="text-center text-red-500">Failed to load leaderboard: {error}</div>}

      {!loading && !error && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center px-4 py-6 border-b-2 border-indigo-500/30 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
              <div className="w-12 text-center">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Rank</span>
              </div>
              <div className="flex-grow ml-12">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Name</p>
              </div>
              <div className="hidden sm:flex w-32 text-right pr-4">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {mode === 'overall' ? 'Global Rank' : 'Weekly Points'}
                </p>
              </div>
              <div className="hidden sm:flex w-20 text-right">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Change</p>
              </div>
            </div>
            {/* Table Body */}
            {sortedEntries.map((entry) => (
              <LeaderboardItem key={`${entry.name}-${mode}`} entry={entry} mode={mode} />
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-300">
              Wanna join this challenge!{' '}
              <a
                href="https://forms.gle/JmFSztmQmf8FKrZR8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline transition-colors"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}