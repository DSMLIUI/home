import React from 'react';
import type { BoardMember } from '../types';

interface PersonCardProps {
  member: BoardMember;
}

export default function PersonCard({ member }: PersonCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-gray-100">
      <img
        src={member.image_url}
        alt={`Photo of ${member.name}`}
        width={150}
        height={150}
        className="rounded-full object-cover border-4 border-indigo-500 shadow-md"
      />
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">{member.name}</h2>
      <h3 className="text-md text-indigo-600 font-medium">{member.title}</h3>
      <p className="text-gray-600 mt-3 flex-grow text-sm">{member.bio}</p>
      <a
        href={member.linkedin_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-sm hover:shadow-md"
      >
        LinkedIn
      </a>
    </div>
  );
}