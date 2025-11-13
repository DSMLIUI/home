import React from 'react';
import type { BoardMember } from '../types';

interface PersonCardProps {
  member: BoardMember;
}

export default function PersonCard({ member }: PersonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 text-center flex flex-col items-center transform hover:-translate-y-1 transition-transform duration-300 ease-in-out border border-gray-100">
      <img
        src={member.image_url}
        alt={`Photo of ${member.name}`}
        width={120}
        height={120}
        className="rounded-full object-cover border-4 border-indigo-500 shadow-md"
      />
      <h2 className="text-base font-semibold mt-2 text-gray-800">{member.name}</h2>
      <h3 className="text-xs text-indigo-600 font-medium">{member.title}</h3>
      <a
        href={member.linkedin_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block bg-indigo-600 text-white font-bold py-1 px-3 rounded text-xs hover:bg-indigo-700 transition-colors duration-300 shadow-sm hover:shadow-md"
      >
        LinkedIn
      </a>
    </div>
  );
}