import React, { useState, useEffect } from 'react';
import PersonCard from '../components/PersonCard';
import type { BoardMember } from '../types';

declare const Papa: any;

export default function PeoplePage() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/board_members.csv`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: { data: BoardMember[] }) => {
            setMembers(results.data);
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

    fetchMembers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">Meet the Board</h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          The dedicated team leading the Data Science & Machine Learning Club at IU.
        </p>
      </div>
      
      {loading && <div className="text-center text-gray-400">Loading members...</div>}
      {error && <div className="text-center text-red-500">Failed to load members: {error}</div>}

      {!loading && !error && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <PersonCard key={member.name} member={member} />
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300">
              Wanna join our club!{' '}
              <a
                href="https://forms.gle/MRg5a7RArwJVCNcu5"
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