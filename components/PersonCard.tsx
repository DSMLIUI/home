import React from 'react';
import type { BoardMember } from '../types';

interface PersonCardProps {
  member: BoardMember;
}

export default function PersonCard({ member }: PersonCardProps) {
  // Parse name to get first and last name
  const nameParts = member.name.trim().split(' ');
  let firstName = '';
  let lastName = '';
  
  if (nameParts.length === 1) {
    firstName = nameParts[0];
  } else if (nameParts.length === 2) {
    firstName = nameParts[0];
    lastName = nameParts[1];
  } else {
    // If 3+ words, last word is last name, rest is first name
    lastName = nameParts[nameParts.length - 1];
    firstName = nameParts.slice(0, -1).join(' ');
  }

  return (
    <div className="card p-6 hover:border-muted-blue transition-colors bg-rich-black">
      <div className="flex flex-col gap-4">
        <img
          src={member.image_url}
          alt={`Photo of ${member.name}`}
          className="w-full h-48 object-contain border border-dark-gray bg-rich-black"
        />
        <div>
          <h2 className="text-lg font-mono font-medium text-off-white mb-1">
            <span className="font-bold">{firstName}</span>
            {lastName && <span className="font-light ml-2">{lastName}</span>}
          </h2>
          <p className="text-sm font-mono text-mid-gray mb-3">{member.title}</p>
          <div className="flex items-center gap-3">
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 border border-muted-blue text-muted-blue hover:bg-muted-blue hover:text-rich-black transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            {member.profile_url && (
              <a
                href={member.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-muted-blue hover:text-off-white transition-colors"
              >
                IU Profile →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}