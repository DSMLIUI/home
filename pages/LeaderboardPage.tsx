import React, { useState, useEffect } from 'react';
import type { LeaderboardEntry } from '../types';
import LeaderboardItem from '../components/LeaderboardItem';
import NeuralNetwork from '../components/NeuralNetwork';

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
    <div className="relative overflow-hidden min-h-screen">
      <NeuralNetwork />
      <div className="container mx-auto px-8 py-24 pb-64 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-3xl sm:text-4xl font-mono font-light text-off-white mb-4">LeetCode Leaderboard</h1>
          <div className="w-16 h-px bg-muted-blue mb-6"></div>
          <p className="text-base font-mono text-mid-gray leading-relaxed">
            Solve problems on LeetCode and compete with fellow students to top the leaderboard.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setMode('overall')}
            className={`px-8 py-3 border font-mono text-sm transition-colors ${
              mode === 'overall'
                ? 'border-muted-blue text-muted-blue'
                : 'border-mid-gray text-mid-gray hover:border-off-white hover:text-off-white'
            }`}
          >
            Overall
          </button>
          <button
            onClick={() => setMode('weekly')}
            className={`px-8 py-3 border font-mono text-sm transition-colors ${
              mode === 'weekly'
                ? 'border-muted-blue text-muted-blue'
                : 'border-mid-gray text-mid-gray hover:border-off-white hover:text-off-white'
            }`}
          >
            Weekly
          </button>
        </div>
        
        {loading && <div className="text-center text-mid-gray font-mono text-sm">Loading...</div>}
        {error && <div className="text-center text-subtle-red font-mono text-sm">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div className="card mb-16">
              <div className="flex items-center px-6 py-4 border-b border-dark-gray">
                <div className="w-16 flex-shrink-0 text-center">
                  <span className="text-xs font-mono text-mid-gray uppercase">Rank</span>
                </div>
                <div className="flex-grow ml-6">
                  <span className="text-xs font-mono text-mid-gray uppercase">Name</span>
                </div>
                <div className="hidden sm:flex items-center gap-12">
                  <span className="text-xs font-mono text-mid-gray uppercase min-w-[100px] text-right">
                    {mode === 'overall' ? 'Global Rank' : 'Weekly Points'}
                  </span>
                  <div className="w-20 text-right">
                    <span className="text-xs font-mono text-mid-gray uppercase">Change</span>
                  </div>
                </div>
              </div>
              {sortedEntries.map((entry) => (
                <LeaderboardItem key={`${entry.name}-${mode}`} entry={entry} mode={mode} />
              ))}
            </div>
            
            <div className="text-center border-t border-dark-gray pt-12">
              <br></br>
              <br></br>
              <a
                href="https://forms.gle/JmFSztmQmf8FKrZR8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Join the challenge
              </a>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
}