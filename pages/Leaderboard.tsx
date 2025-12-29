import React, { useEffect, useMemo, useState } from 'react';

interface LeaderboardEntry {
    name: string;
    id: string;
    global_rank: number;
    global_leetcode_rank: number;
    global_change: number;
    overall_rank: number;
    overall_problems_solved: number;
    overall_rank_change: number;
    weekly_rank: number;
    weekly_problems_solved: number;
    weekly_rank_change: number;
    linkedin_url: string;
}

type ViewMode = 'global' | 'overall' | 'weekly';
type RankedEntry = LeaderboardEntry & { display_rank: number };

const parseNumber = (value?: string) => {
    const num = parseFloat(value ?? '');
    return Number.isFinite(num) ? num : 0;
};

const formatChange = (change: number) => {
    if (!Number.isFinite(change) || change === 0) return '0';
    const sign = change > 0 ? '+' : '';
    return `${sign}${change}`;
};

const viewConfigs: Record<ViewMode, {
    label: string;
    description: React.ReactNode;
    changeKey: keyof LeaderboardEntry;
    metricColumnLabel: string;
    supportingLabel: string;
    supportingValue: (user: LeaderboardEntry) => string;
    metricFormatter?: (value: number) => string;
}> = {
    global: {
        label: 'Global',
        description: 'Rankings are based on the LeetCode global rank, which reflects a student\'s overall performance on LeetCode compared to all users worldwide.',
        changeKey: 'global_change',
        metricColumnLabel: 'LeetCode global rank',
        supportingLabel: 'Rank change',
        supportingValue: (user) => formatChange(user.global_change),
        metricFormatter: (value) => `#${Math.max(1, Math.round(value)).toLocaleString()}`
    },
    overall: {
        label: 'Overall',
        description: (
            <>
                Overall rankings are based on the total number of <a href="https://docs.google.com/spreadsheets/d/1p2Bl9s2NXrECScXvolCc_Z5Yhw2SP-HCOtlBrnnuZew/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 underline" >  syllabus</a>  problems completed. In the event of a tie, the student with the higher LeetCode global rank is placed higher on the leaderboard.
            </>
        ),
        changeKey: 'overall_rank_change',
        metricColumnLabel: 'Overall problems solved',
        supportingLabel: 'LeetCode global rank (tie-breaker)',
        supportingValue: (user) => `#${Math.max(1, Math.round(user.global_leetcode_rank)).toLocaleString()}`,
        metricFormatter: (value) => `${Math.round(value).toLocaleString()} solved`
    },
    weekly: {
        label: 'Weekly',
        description: 'Rankings are based on the total number of syllabus problems completed during the week, with the LeetCode global rank serving as the tie-breaker for students with equal scores.',
        changeKey: 'weekly_rank_change',
        metricColumnLabel: 'Problems solved this week',
        supportingLabel: 'Overall rank (tie-breaker)',
        supportingValue: (user) => `#${Math.max(1, Math.round(user.overall_rank)).toLocaleString()}`,
        metricFormatter: (value) => `${Math.round(value).toLocaleString()} solved`
    }
};

const sorters: Record<ViewMode, (a: LeaderboardEntry, b: LeaderboardEntry) => number> = {
    global: (a, b) => a.global_rank - b.global_rank || a.global_leetcode_rank - b.global_leetcode_rank || a.overall_rank - b.overall_rank,
    overall: (a, b) => b.overall_problems_solved - a.overall_problems_solved || a.global_leetcode_rank - b.global_leetcode_rank || a.weekly_rank - b.weekly_rank,
    weekly: (a, b) => b.weekly_problems_solved - a.weekly_problems_solved || a.overall_rank - b.overall_rank || a.global_leetcode_rank - b.global_leetcode_rank
};

const Podium = ({ data, viewMode }: { data: LeaderboardEntry[], viewMode: ViewMode }) => {
    const changeKey = viewConfigs[viewMode].changeKey;
    
    // Specific order for Podium: 2nd, 1st, 3rd
    const podiumData = [
        data.find(u => u[viewMode === 'global' ? 'global_rank' : viewMode === 'overall' ? 'overall_rank' : 'weekly_rank'] === 2),
        data.find(u => u[viewMode === 'global' ? 'global_rank' : viewMode === 'overall' ? 'overall_rank' : 'weekly_rank'] === 1),
        data.find(u => u[viewMode === 'global' ? 'global_rank' : viewMode === 'overall' ? 'overall_rank' : 'weekly_rank'] === 3),
    ].filter((item): item is LeaderboardEntry => !!item);

    const heightClasses = ['h-[50%]', 'h-[75%]', 'h-[40%]'];

    return (
        <div className="flex justify-center items-end h-[300px] md:h-[400px] lg:h-[500px] w-full max-w-4xl mx-auto gap-3 md:gap-8 px-2 md:px-4 mb-20">
            {podiumData.map((user, index) => {
                const rank = user[viewMode === 'global' ? 'global_rank' : viewMode === 'overall' ? 'overall_rank' : 'weekly_rank'];
                const change = user[changeKey] as number;
                return (
                    <div key={rank} className={`flex flex-col items-center justify-end w-1/3 ${heightClasses[index]} group transition-all duration-500`}>
                        {/* User Details Box (Floating above bar) */}
                        <div className="-mb-4 md:-mb-6 w-full text-center animate-in slide-in-from-bottom-4 fade-in duration-700 flex flex-col items-center relative z-20">
                            <div className="font-vt323 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-1 w-full truncate px-1 md:px-2">
                                {user.name}
                            </div>
                            {/* Stock Ticker Stats */}
                            <div className="inline-flex items-center gap-2 md:gap-3 bg-[#111] border border-gray-800 px-2 py-0.5 md:px-3 md:py-1 rounded-sm">
                                <span className={`font-mono text-xs md:text-sm lg:text-base flex items-center gap-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {change >= 0 ? '▲' : '▼'} 
                                    {Math.abs(change)}
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
                            ${rank === 1 ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] z-10' : 'border-gray-700 hover:border-gray-500'}
                        `}>
                            {/* Accent Line - Placed at the very top */}
                            <div className={`absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-1.5 ${change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>

                            {/* Scanline Texture inside Bar */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                            
                            {/* Rank Number Display */}
                            <div className={`font-vt323 font-bold leading-none select-none text-center w-full pb-4 md:pb-6
                                ${rank === 1 
                                    ? 'text-7xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[180px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                                    : 'text-5xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[120px] text-gray-600'}
                            `}>
                                {rank}
                            </div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

const LeaderboardView = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('global');
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const ITEMS_PER_PAGE = 7;

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('/data/leetcode_leaderboard.csv')
            .then(response => response.text())
            .then(csvData => {
                const lines = csvData.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                const headerIndex = (key: string) => headers.findIndex(h => h === key);
                const indices = {
                    name: headerIndex('name'),
                    id: headerIndex('id'),
                    global_rank: headerIndex('global_rank'),
                    global_leetcode_rank: headerIndex('global_leetcode_rank'),
                    global_change: headerIndex('global_change'),
                    overall_rank: headerIndex('overall_rank'),
                    overall_problems_solved: headerIndex('overall_problems_solved'),
                    overall_rank_change: headerIndex('overall_rank_change'),
                    weekly_rank: headerIndex('weekly_rank'),
                    weekly_problems_solved: headerIndex('weekly_problems_solved'),
                    weekly_rank_change: headerIndex('weekly_rank_change'),
                    linkedin_url: headerIndex('linkedin_url')
                };

                const entries: LeaderboardEntry[] = [];
                const seenIds = new Set<string>();
                
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',');
                        const getValue = (index: number) => index >= 0 && index < values.length ? values[index].trim() : '';
                        const id = getValue(indices.id);
                        
                        if (seenIds.has(id)) continue;
                        seenIds.add(id);
                        
                        entries.push({
                            name: getValue(indices.name) || '',
                            id: id || '',
                            global_rank: parseNumber(getValue(indices.global_rank)),
                            global_leetcode_rank: parseNumber(getValue(indices.global_leetcode_rank)),
                            global_change: parseNumber(getValue(indices.global_change)),
                            overall_rank: parseNumber(getValue(indices.overall_rank)),
                            overall_problems_solved: parseNumber(getValue(indices.overall_problems_solved)),
                            overall_rank_change: parseNumber(getValue(indices.overall_rank_change)),
                            weekly_rank: parseNumber(getValue(indices.weekly_rank)),
                            weekly_problems_solved: parseNumber(getValue(indices.weekly_problems_solved)),
                            weekly_rank_change: parseNumber(getValue(indices.weekly_rank_change)),
                            linkedin_url: getValue(indices.linkedin_url)
                        });
                    }
                }
                setLeaderboardData(entries);
            })
            .catch(error => console.error('Error loading leaderboard data:', error));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [viewMode]);

    const rankedData = useMemo(() => (
        leaderboardData.slice().sort(sorters[viewMode])
    ), [leaderboardData, viewMode]);

    const remainingData = rankedData.slice(3);

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

                <div className="flex justify-center gap-4 mb-4">
                    {(['global', 'overall', 'weekly'] as ViewMode[]).map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-6 md:px-8 py-3 font-vt323 text-xl md:text-2xl transition-all uppercase tracking-widest ${
                                viewMode === mode
                                    ? 'bg-white text-black border-2 border-white'
                                    : 'border-2 border-gray-500 text-gray-400 hover:border-white hover:text-white'
                            }`}
                        >
                            {viewConfigs[mode].label}
                        </button>
                    ))}
                </div>

                <div className="mb-8 max-w-4xl mx-auto text-center">
                    <p className="font-space text-gray-300 text-base md:text-lg leading-relaxed">
                        {viewConfigs[viewMode].description}
                    </p>
                </div>

                

                <Podium 
                    data={rankedData}
                    viewMode={viewMode}
                />

                <div className="max-w-5xl mx-auto border border-white/20 bg-[#050505] relative z-10">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></div>

                    <div className={`grid gap-2 md:gap-4 p-4 border-b border-white/10 text-gray-500 font-mono text-xs md:text-sm uppercase tracking-widest bg-white/5 ${
                        viewMode === 'global' ? 'grid-cols-6 md:grid-cols-12' : 'grid-cols-9 md:grid-cols-12'
                    }`}>
                        <div className="col-span-1 md:col-span-1 text-center">RANK</div>
                        <div className="col-span-5 md:col-span-5">NAME</div>
                        <div className={`text-right ${
                            viewMode === 'global' ? 'hidden md:block md:col-span-4' : 'col-span-3 md:col-span-4'
                        }`}>{viewConfigs[viewMode].metricColumnLabel}</div>
                        <div className="hidden md:block md:col-span-2 text-right">CHANGE</div>
                    </div>
                    
                    {paginatedData.map((user, idx) => {
                        const rank = remainingData.indexOf(user) + 4;
                        const metricValue = viewMode === 'global' 
                            ? user.global_leetcode_rank 
                            : viewMode === 'overall' 
                            ? user.overall_problems_solved 
                            : user.weekly_problems_solved;
                        const changeValue = viewMode === 'global'
                            ? user.global_change
                            : viewMode === 'overall' 
                            ? user.overall_rank_change 
                            : user.weekly_rank_change;
                        return (
                        <a 
                            key={user.id}
                            href={`https://leetcode.com/u/${user.id}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`grid gap-2 md:gap-4 p-4 border-b border-white/5 hover:bg-white/10 transition-colors items-center font-vt323 text-lg md:text-2xl group cursor-pointer ${
                                viewMode === 'global' ? 'grid-cols-6 md:grid-cols-12' : 'grid-cols-9 md:grid-cols-12'
                            }`}
                        >
                            <div className="col-span-1 md:col-span-1 text-center text-green-500 font-bold group-hover:text-white transition-colors">
                                {rank < 10 ? `0${rank}` : rank}
                            </div>
                            <div className="col-span-5 md:col-span-5 text-gray-300 truncate group-hover:text-white transition-colors">
                                {user.name}
                            </div>
                            <div className={`text-right text-gray-300 font-mono text-sm md:text-base group-hover:text-white transition-colors ${
                                viewMode === 'global' ? 'hidden md:block md:col-span-4' : 'col-span-3 md:col-span-4'
                            }`}>
                                {viewConfigs[viewMode].metricFormatter
                                    ? viewConfigs[viewMode].metricFormatter(metricValue)
                                    : metricValue.toLocaleString()}
                            </div>
                            <div className={`hidden md:block md:col-span-2 text-right font-mono text-sm md:text-base transition-colors ${
                                changeValue > 0 ? 'text-green-500' : changeValue < 0 ? 'text-red-500' : 'text-gray-500'
                            }`}>
                                {formatChange(changeValue)}
                            </div>
                        </a>
                        );
                    })}
                </div>

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

                <div className="mt-16 flex justify-center items-center">
                    <a 
                        href="https://forms.gle/kfDo1pTjFtrZSBnbA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black border-2 border-white px-8 py-3 font-vt323 text-xl md:text-2xl hover:bg-gray-200 transition-all uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] text-center"
                    >
                        &gt; JOIN_THE_CHALLENGE
                    </a>
                </div>

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
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></div>
                                
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
