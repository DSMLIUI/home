import React, { useEffect, useState } from 'react';

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface BoardMember {
    name: string;
    title: string;
    image_url: string;
    linkedin_url: string;
    profile_url: string;
    bio: string;
}

const PeopleView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);

    useEffect(() => {
        // Fetch and parse CSV data
        fetch('/data/board_members.csv')
            .then(response => response.text())
            .then(csvData => {
                const lines = csvData.split('\n');
                const headers = lines[0].split(',');
                
                const members: BoardMember[] = [];
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',');
                        members.push({
                            name: values[0]?.trim() || '',
                            title: values[1]?.trim() || '',
                            image_url: values[2]?.trim() || '',
                            linkedin_url: values[3]?.trim() || '',
                            profile_url: values[4]?.trim() || '',
                            bio: values[5]?.trim() || ''
                        });
                    }
                }
                setBoardMembers(members);
            })
            .catch(error => console.error('Error loading board members:', error));
    }, []);

    const faculty = boardMembers.filter(member => member.title.includes('Faculty Advisor'));
    const team = boardMembers.filter(member => !member.title.includes('Faculty Advisor'));

    return (
        <section id="people-page" className="w-full bg-black relative min-h-screen">
             <div className="max-w-7xl mx-auto px-6 py-10 md:py-20">
                
                {/* FACULTY SECTION */}
                <h3 className="font-vt323 text-3xl md:text-4xl text-green-500 mb-8 tracking-wide border-l-4 border-green-500 pl-4">
                    &gt; FACULTY_ADVISORS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {faculty.map((member, i) => (
                        <div key={i} className="border border-white/20 bg-[#0a0a0a] p-6 flex flex-col items-center text-center group hover:bg-[#111] transition-colors relative overflow-hidden">
                             {/* Avatar/Image */}
                            <div className="w-48 h-48 bg-gray-800 mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-dither opacity-50 mix-blend-overlay"></div>
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600 font-vt323 text-6xl">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            
                            <h4 className="font-vt323 text-3xl text-white mb-2">{member.name}</h4>
                            <p className="font-space text-gray-400 text-sm tracking-wider uppercase">{member.title}</p>
                            
                            {/* Use profile_url for faculty instead of LinkedIn */}
                            {member.profile_url && (
                                <a href={member.profile_url} target="_blank" rel="noopener noreferrer" className="mt-6 font-vt323 text-xl text-gray-500 hover:text-green-500 transition-colors flex items-center gap-2 group-hover:text-green-400">
                                    VIEW PROFILE
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* TEAM SECTION (Board Members) */}
                <h3 className="font-vt323 text-3xl md:text-4xl text-green-500 mb-8 tracking-wide border-l-4 border-green-500 pl-4">
                    &gt; CLUB_MEMBERS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {team.map((member, i) => (
                         <a 
                            key={i} 
                            href={member.linkedin_url || '#'} 
                            target={member.linkedin_url ? "_blank" : undefined} 
                            rel={member.linkedin_url ? "noopener noreferrer" : undefined}
                            className="border border-white/20 bg-[#0a0a0a] p-6 flex flex-col items-center text-center group hover:bg-[#111] hover:border-green-500/50 transition-all relative overflow-hidden cursor-pointer"
                         >
                             {/* Avatar/Image */}
                            <div className="w-48 h-48 bg-gray-800 mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-dither opacity-50 mix-blend-overlay"></div>
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600 font-vt323 text-6xl">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            
                            <h4 className="font-vt323 text-3xl text-white mb-2 group-hover:text-green-400 transition-colors">{member.name}</h4>
                            <p className="font-space text-gray-400 text-sm tracking-wider uppercase">{member.title}</p>
                        </a>
                    ))}
                </div>
                
                {/* Call to Action */}
                <div className="flex justify-center mt-16">
                    <a href="https://forms.gle/JhBb1krrqg6As8s56" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 font-vt323 text-2xl md:text-3xl font-bold text-white bg-transparent border-2 border-white hover:bg-white hover:text-black transition-all uppercase tracking-widest overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                            &gt; <span className="animate-pulse"> JOIN_THE_CLUB</span>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PeopleView;
