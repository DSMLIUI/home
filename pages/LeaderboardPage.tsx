import React, { useState, useEffect } from 'react';
import type { LeaderboardEntry } from '../types';
import LeaderboardItem from '../components/LeaderboardItem';

declare const Papa: any;

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            setEntries(results.data);
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

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">
          LeetCode <span className="text-indigo-400">Champions</span>
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          Weekly leaderboard tracking our members' progress and problem-solving prowess.
        </p>
      </div>
      
      {loading && <div className="text-center text-gray-400">Loading leaderboard...</div>}
      {error && <div className="text-center text-red-500">Failed to load leaderboard: {error}</div>}

      {!loading && !error && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-lg shadow-lg">
            {entries.map((entry) => (
              <LeaderboardItem key={entry.rank} entry={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}