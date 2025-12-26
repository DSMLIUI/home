import React, { useState, useEffect } from 'react';
import PersonCard from '../components/PersonCard';
import NeuralNetwork from '../components/NeuralNetwork';
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
    <div className="relative overflow-hidden min-h-[calc(100vh-16rem)]">
      <NeuralNetwork />
      <div className="container mx-auto px-8 py-24 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto">
        {/* Faculty Advisors Section */}
        <div className="mb-24">
          <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-mono font-light text-off-white mb-4">Faculty Advisors</h1>
            <div className="w-16 h-px bg-muted-blue"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.filter(m => m.title === 'Faculty Advisor').map((faculty) => (
              <PersonCard key={faculty.name} member={faculty} />
            ))}
          </div>
        </div>

        {/* Board Members Section */}
        <div className="mb-16">
          <h1 className="text-3xl sm:text-4xl font-mono font-light text-off-white mb-4">Board Members</h1>
          <div className="w-16 h-px bg-muted-blue"></div>
        </div>
        
        {loading && <div className="text-center text-mid-gray font-mono text-sm">Loading...</div>}
        {error && <div className="text-center text-subtle-red font-mono text-sm">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {members.filter(m => m.title !== 'Faculty Advisor').map((member) => (
                <PersonCard key={member.name} member={member} />
              ))}
            </div>
            
            <div className="text-center border-t border-dark-gray pt-12">
              <p className="text-base font-mono text-mid-gray mb-6">
                Interested in joining?
              </p>
              <a
                href="https://forms.gle/MRg5a7RArwJVCNcu5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Register
              </a>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}