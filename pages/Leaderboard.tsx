import React, { useEffect, useState } from 'react';

// LinkedIn Icon
const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// LeetCode Icon
const LeetCodeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-2.365-1.914-5.776-1.649-7.872.537l-2.32 2.497c-.55.59-1.952 2.107-1.952 2.107-.462.527-.812 1.124-1.058 1.744-.297.75-.447 1.553-.447 2.362 0 .809.15 1.613.447 2.363.246.62.596 1.217 1.058 1.744 0 0 1.401 1.517 1.952 2.107L13.263 24l.535-.014a6.63 6.63 0 0 0 4.918-2.319l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392c-1.163 1.116-3.042 1.078-4.205-.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164l4.396-4.708L13.483 0z"/>
  </svg>
);

interface LeaderboardEntry {
    overall_rank: number;
    weekly_rank: number;
    id: string;
    weekly_points: number;
    weekly_change: number;
    overall_points: number;
    overall_change: number;
    name: string;
    linkedin_url: string;
}

const Podium = ({ data, viewMode }: { data: LeaderboardEntry[], viewMode: 'overall' | 'weekly' }) => {
    const rank = viewMode === 'overall' ? 'overall_rank' : 'weekly_rank';
    const change = viewMode === 'overall' ? 'overall_change' : 'weekly_change';
    
    // Specific order for Podium: 2nd, 1st, 3rd
    const podiumData = [
        data.find(u => u[rank] === 2),
        data.find(u => u[rank] === 1),
        data.find(u => u[rank] === 3),
    ].filter((item): item is LeaderboardEntry => !!item);

    const heightClasses = ['h-[50%]', 'h-[75%]', 'h-[40%]'];

    return (
        <div className="flex justify-center items-end h-[300px] md:h-[400px] lg:h-[500px] w-full max-w-4xl mx-auto gap-3 md:gap-8 px-2 md:px-4 mb-20">
            {podiumData.map((user, index) => (
                <div key={user[rank]} className={`flex flex-col items-center justify-end w-1/3 ${heightClasses[index]} group transition-all duration-500`}>
                        {/* User Details Box (Floating above bar) */}
                        <div className="-mb-4 md:-mb-6 w-full text-center animate-in slide-in-from-bottom-4 fade-in duration-700 flex flex-col items-center relative z-20">
                        <div className="font-vt323 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-1 w-full truncate px-1 md:px-2">
                            {user.name}
                        </div>
                        {/* Stock Ticker Stats */}
                        <div className="inline-flex items-center gap-2 md:gap-3 bg-[#111] border border-gray-800 px-2 py-0.5 md:px-3 md:py-1 rounded-sm">
                            <span className={`font-mono text-xs md:text-sm lg:text-base flex items-center gap-1 ${user[change] >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {user[change] >= 0 ? '▲' : '▼'} 
                                {Math.abs(user[change])}
                            </span>
                        </div>
                        </div>

                        {/* The Bar */}
                        <a 
                            href={`https://leetcode.com/u/${user.id}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full h-full relative border-x-2 border-b-2 border-t-0 transition-all duration-300 flex items-center justify-center cursor-pointer
                            bg-[#0a0a0a] hover:bg-white/5 opacity-90 hover:opacity-100
                            ${user[rank] === 1 ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] z-10' : 'border-gray-700 hover:border-gray-500'}
                        `}>
                            {/* Accent Line - Placed at the very top */}
                            <div className={`absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-1.5 ${user[change] >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>

                            {/* Scanline Texture inside Bar */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                            
                            {/* Rank Number Display */}
                            <div className={`font-vt323 font-bold leading-none select-none text-center w-full pb-4 md:pb-6
                                ${user[rank] === 1 
                                    ? 'text-7xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[180px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                                    : 'text-5xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[120px] text-gray-600'}
                            `}>
                                {user[rank]}
                            </div>
                        </a>
                </div>
            ))}
        </div>
    );
};

const LeaderboardView = () => {
    const [viewMode, setViewMode] = useState<'overall' | 'weekly'>('overall');
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const ITEMS_PER_PAGE = 7;

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Fetch and parse CSV data
        fetch('/data/leetcode_leaderboard.csv')
            .then(response => response.text())
            .then(csvData => {
                const lines = csvData.split('\n');
                const headers = lines[0].split(',');
                
                const entries: LeaderboardEntry[] = [];
                const seenIds = new Set<string>();
                
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',');
                        const id = values[2]?.trim();
                        
                        // Skip duplicate entries
                        if (seenIds.has(id)) continue;
                        seenIds.add(id);
                        
                        entries.push({
                            overall_rank: parseInt(values[0]?.trim() || '0'),
                            weekly_rank: parseInt(values[1]?.trim() || '0'),
                            id: id || '',
                            weekly_points: parseFloat(values[3]?.trim() || '0'),
                            weekly_change: parseFloat(values[4]?.trim() || '0'),
                            overall_points: parseInt(values[5]?.trim() || '0'),
                            overall_change: parseInt(values[6]?.trim() || '0'),
                            name: values[7]?.trim() || '',
                            linkedin_url: values[8]?.trim() || ''
                        });
                    }
                }
                setLeaderboardData(entries);
            })
            .catch(error => console.error('Error loading leaderboard data:', error));
    }, []);

    // Reset to page 1 when view mode changes
    useEffect(() => {
        setCurrentPage(1);
    }, [viewMode]);

    const rank = viewMode === 'overall' ? 'overall_rank' : 'weekly_rank';
    const change = viewMode === 'overall' ? 'overall_change' : 'weekly_change';
    const remainingData = leaderboardData.filter(u => u[rank] > 3).sort((a, b) => a[rank] - b[rank]);
    
    // Pagination logic
    const totalPages = Math.ceil(remainingData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = remainingData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section id="leaderboard-page" className="w-full bg-black relative min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-dashed border-gray-600 pb-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-vt323 text-white leading-none">
                        &gt; LEADERBOARD
                    </h2>
                    <span className="text-gray-400 font-mono text-sm tracking-widest uppercase">
                        // UPDATES DAILY @ 07:30 AM
                    </span>
                </div>

                {/* Description */}
                <div className="mb-6 max-w-3xl">
                    <p className="font-space text-gray-300 text-base md:text-lg leading-relaxed">
                        Join the algorithm arena. Solve LeetCode problems, compete with peers, and sharpen your skills. 
                        Whether you're a beginner or a pro, <span className="text-white font-bold"> <a href="https://forms.gle/A687ry7BJXsQxau4A"><u>join us</u></a>  in the journey</span> to mastery.
                    </p>
                </div>

                {/* Overall/Weekly Toggle Buttons */}
                <div className="flex justify-center gap-4 mb-4">
                    <button 
                        onClick={() => setViewMode('overall')}
                        className={`px-8 py-3 font-vt323 text-xl md:text-2xl transition-all uppercase tracking-widest ${
                            viewMode === 'overall' 
                                ? 'bg-white text-black border-2 border-white' 
                                : 'border-2 border-gray-500 text-gray-400 hover:border-white hover:text-white'
                        }`}
                    >
                        Overall
                    </button>
                    <button 
                        onClick={() => setViewMode('weekly')}
                        className={`px-8 py-3 font-vt323 text-xl md:text-2xl transition-all uppercase tracking-widest ${
                            viewMode === 'weekly' 
                                ? 'bg-white text-black border-2 border-white' 
                                : 'border-2 border-gray-500 text-gray-400 hover:border-white hover:text-white'
                        }`}
                    >
                        Weekly
                    </button>
                </div>

                {/* PODIUM SECTION (Top 3) */}
                <Podium data={leaderboardData} viewMode={viewMode} />

                {/* REMAINING BOARD LIST */}
                <div className="max-w-5xl mx-auto border border-white/20 bg-[#050505] relative z-10">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-2 md:gap-4 p-4 border-b border-white/10 text-gray-500 font-mono text-xs md:text-sm uppercase tracking-widest bg-white/5">
                        <div className="col-span-2 md:col-span-1 text-center">RANK</div>
                        <div className="col-span-6 md:col-span-6">NAME</div>
                        <div className="hidden md:block col-span-2 text-right">GLOBAL RANK</div>
                        <div className="col-span-4 md:col-span-3 text-right">CHANGE</div>
                    </div>
                    
                    {/* Table Rows */}
                    {paginatedData.map((user) => (
                        <a 
                            key={user.id}
                            href={`https://leetcode.com/u/${user.id}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grid grid-cols-12 gap-2 md:gap-4 p-4 border-b border-white/5 hover:bg-white/10 transition-colors items-center font-vt323 text-lg md:text-2xl group cursor-pointer"
                        >
                            <div className="col-span-2 md:col-span-1 text-center text-green-500 font-bold group-hover:text-white transition-colors">
                                {user[rank] < 10 ? `0${user[rank]}` : user[rank]}
                            </div>
                            <div className="col-span-6 md:col-span-6 text-gray-300 truncate group-hover:text-white transition-colors">
                                {user.name}
                            </div>
                            <div className="hidden md:block col-span-2 text-right text-gray-500 font-mono text-sm md:text-base group-hover:text-gray-300 transition-colors">
                                {user.overall_points.toLocaleString()}
                            </div>
                            <div className={`col-span-4 md:col-span-3 text-right font-mono text-sm md:text-base ${user[change] >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {user[change] > 0 ? '+' : ''}{user[change]}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 flex items-center justify-center font-vt323 text-lg transition-all ${
                                    currentPage === page
                                        ? 'bg-white text-black border-2 border-white'
                                        : 'border-2 border-gray-600 text-gray-400 hover:border-white hover:text-white'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 h-10 flex items-center justify-center font-vt323 text-lg border-2 border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}

                {/* Footer Action */}
                <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6">
                    <a 
                        href="https://forms.gle/kfDo1pTjFtrZSBnbA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto bg-white text-black border-2 border-white px-8 py-3 font-vt323 text-xl md:text-2xl hover:bg-gray-200 transition-all uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        &gt; JOIN_THE_CHALLENGE
                    </a>
                </div>

                {/* FAQ Section */}
                <div className="mt-24 max-w-5xl mx-auto pb-20">
                    <h3 className="text-3xl md:text-4xl font-vt323 text-white mb-8 border-b border-dashed border-gray-600 pb-4">
                        &gt; FREQUENTLY_ASKED_QUESTIONS
                    </h3>
                    
                    <div className="space-y-4">
                        {[
                            {
                                question: "Who can join this challenge?",
                                answer: (
                                    <>
                                        All current IU and Purdue students are eligible to participate. Fill out <a href="https://forms.gle/kfDo1pTjFtrZSBnbA" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 underline">this form</a> to register your LeetCode profile and join the roster.
                                    </>
                                )
                            },
                            {
                                question: "I don't see my name on the leaderboard. What should I do?",
                                answer: "Reach out to a club member via Linkedin, and we will update your status."
                            },
                            {
                                question: "What are the rules and syllabus?",
                                answer: (
                                    <>
                                        You can access the full <a href="https://docs.google.com/spreadsheets/d/1p2Bl9s2NXrECScXvolCc_Z5Yhw2SP-HCOtlBrnnuZew/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 underline">syllabus</a> and challenge rules through <a href="https://docs.google.com/document/d/1o8qXbtJW_dAy6EEOCMV9CcGsH_efG90t6D30NROSRzw/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 underline">this link</a>.
                                    </>
                                )
                            },
                            {
                                question: "What if I miss a day?",
                                answer: "You can catch up by solving the missed problem later, but daily consistency is weighted higher for the weekly leaderboard."
                            },
                            {
                                question: "I am a beginner; is this for me?",
                                answer: (
                                    <>
                                        Yes; the <a href="https://docs.google.com/spreadsheets/d/1p2Bl9s2NXrECScXvolCc_Z5Yhw2SP-HCOtlBrnnuZew/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 underline">syllabus</a> starts with foundational topics and includes video explanations for every problem.
                                    </>
                                )
                            },
                            {
                                question: "How do I prove I solved a problem?",
                                answer: "Our tracking system syncs with your public LeetCode profile and updates our website everyday."
                            },
                            {
                                question: "Can I use any programming language?",
                                answer: "Yes; you may use any language supported by LeetCode (Python, Java, C++, etc.)."
                            }
                        ].map((faq, index) => (
                            <div 
                                key={index}
                                className="border border-white/20 bg-[#050505] relative"
                            >
                                {/* Corner brackets */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></div>
                                
                                {/* Question Header */}
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full p-4 md:p-6 flex justify-between items-center gap-4 hover:bg-white/5 transition-colors group"
                                >
                                    <span className="font-vt323 text-lg md:text-2xl text-white text-left group-hover:text-green-500 transition-colors">
                                        &gt; {faq.question}
                                    </span>
                                    <span className={`text-2xl md:text-3xl text-gray-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                
                                {/* Answer Content */}
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openFaqIndex === index ? 'max-h-48' : 'max-h-0'
                                    }`}
                                >
                                    <div className="px-6 md:px-8 pt-6 pb-6 md:pt-8 md:pb-8 border-t border-white/10">
                                        <p className="font-space text-gray-300 text-sm md:text-base leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeaderboardView;
