import React, { useState, useEffect } from 'react';
import AboutView from '../pages/About';
import PeopleView from '../pages/People';
import LeaderboardView from '../pages/Leaderboard';

// Simple SVG Icons for the cards
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12 mb-6 text-gray-400 group-hover:text-black transition-colors">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12 mb-6 text-gray-400 group-hover:text-black transition-colors">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12 mb-6 text-gray-400 group-hover:text-black transition-colors">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12 mb-6 text-gray-400 group-hover:text-black transition-colors">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
  </svg>
);

// Social Icons
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const LinktreeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    <line x1="12" y1="12" x2="12" y2="21" />
  </svg>
);

// --- Shared Data Types ---
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

// --- Reusable Components ---

const Podium = () => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        // Fetch and parse CSV data
        fetch('/data/leetcode_leaderboard.csv')
            .then(response => response.text())
            .then(csvData => {
                const lines = csvData.split('\n');
                const entries: LeaderboardEntry[] = [];
                const seenIds = new Set<string>();
                
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',');
                        const id = values[2]?.trim();
                        
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

    // Specific order for Podium: 2nd, 1st, 3rd (using overall_rank)
    const podiumData = [
        leaderboardData.find(u => u.overall_rank === 2),
        leaderboardData.find(u => u.overall_rank === 1),
        leaderboardData.find(u => u.overall_rank === 3),
    ].filter((item): item is LeaderboardEntry => !!item);

    const heightClasses = ['h-[50%]', 'h-[75%]', 'h-[40%]'];

    return (
        <div className="flex justify-center items-end h-[300px] md:h-[400px] lg:h-[500px] w-full max-w-4xl mx-auto gap-3 md:gap-8 px-2 md:px-4 mb-20">
            {podiumData.map((user, index) => (
                <div key={user.overall_rank} className={`flex flex-col items-center justify-end w-1/3 ${heightClasses[index]} group transition-all duration-500`}>
                        {/* User Details Box (Floating above bar) */}
                        <div className="-mb-4 md:-mb-6 w-full text-center animate-in slide-in-from-bottom-4 fade-in duration-700 flex flex-col items-center relative z-20">
                        <div className="font-vt323 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-1 w-full truncate px-1 md:px-2">
                            {user.name}
                        </div>
                        {/* Stock Ticker Stats */}
                        <div className="inline-flex items-center gap-2 md:gap-3 bg-[#111] border border-gray-800 px-2 py-0.5 md:px-3 md:py-1 rounded-sm">
                            <span className={`font-mono text-xs md:text-sm lg:text-base flex items-center gap-1 ${user.overall_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {user.overall_change >= 0 ? '▲' : '▼'} 
                                {Math.abs(user.overall_change)}
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
                            ${user.overall_rank === 1 ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] z-10' : 'border-gray-700 hover:border-gray-500'}
                        `}>
                            {/* Accent Line - Placed at the very top */}
                            <div className={`absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-1.5 ${user.overall_change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>

                            {/* Scanline Texture inside Bar */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                            
                            {/* Rank Number Display */}
                            <div className={`font-vt323 font-bold leading-none select-none text-center w-full pb-4 md:pb-6
                                ${user.overall_rank === 1 
                                    ? 'text-7xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[180px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                                    : 'text-5xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[120px] text-gray-600'}
                            `}>
                                {user.overall_rank}
                            </div>
                        </a>
                </div>
            ))}
        </div>
    );
};

// --- Sub-Components for Content ---

const HomeView = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  const text1 = "DATA SCIENCE &";
  const text2 = "MACHINE LEARNING CLUB";
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const cards = [
    {
      icon: <BookIcon />,
      title: "Learn & Grow",
      desc: "Workshops, study sessions, and peer learning in data science, machine learning, and AI."
    },
    {
      icon: <TrophyIcon />,
      title: "Compete & Practice",
      desc: "Participate in our LeetCode-style problem challenges and climb the leaderboard with your peers."
    },
    {
      icon: <UsersIcon />,
      title: "Events & Community",
      desc: "Weekly meetups, socials, and guest sessions where you can connect, build, and explore together."
    },
    {
      icon: <FlagIcon />,
      title: "Leadership & Involvement",
      desc: "Apply for committee positions and help shape the club's direction — leadership roles are open!"
    }
  ];

  return (
    <>
        {/* HERO SECTION */}
        <section className="relative min-h-[calc(100vh-80px)] p-6 md:p-10 lg:p-16 flex flex-col justify-center items-start max-w-7xl mx-auto w-full">
            <div className="mb-2 flex items-center gap-3 text-green-500 font-vt323 text-xl md:text-2xl tracking-widest">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                RECRUITING FOR SPRING 2026
            </div>

            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-none break-words max-w-full font-bold flex flex-col items-start gap-2 font-vt323 tracking-tight">
                <div className="flex items-center">
                    {text1}
                </div>
                <div className="flex items-center">
                    {text2}
                </div>
            </div>

            <div className="text-sm md:text-base lg:text-lg mb-8 opacity-90 font-bold tracking-widest text-gray-300">
                // @ <a href="https://indianapolis.iu.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">INDIANA UNIVERSITY INDIANAPOLIS</a>
            </div>

            <div className="border-l-4 border-white pl-4 md:pl-8 mt-4 max-w-3xl bg-black/80 p-4">
                <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-200 max-w-2xl">
                    We are a community of students passionate about data science, machine learning, and artificial intelligence. 
                    <br/><br/>
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                    <a href="https://forms.gle/JhBb1krrqg6As8s56" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 font-vt323 text-xl md:text-2xl font-bold text-white bg-transparent border-2 border-white hover:bg-white hover:text-black transition-all uppercase tracking-widest overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                            &gt; <span className="animate-pulse"> JOIN_THE_CLUB</span>
                        </span>
                    </a>
                </div>
            </div>
        </section>
        
        {/* Scroll Indicator - Fixed to viewport for proper centering */}
        {showScrollIndicator && (
            <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center gap-2 animate-bounce z-20 pointer-events-none transition-opacity duration-300">
                <span className="font-vt323 text-gray-500 text-sm tracking-widest">SCROLL_DOWN</span>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        )}

        {/* VISUAL CARDS SECTION (RENAMED TO MODULES) */}
        <section className="w-full border-t border-white/20 bg-black relative">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-28">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4 border-b border-dashed border-gray-600 pb-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-vt323 text-white leading-none">
                        &gt; SYSTEM_MODULES
                    </h2>
                </div>

                {/* Grid Layout - 1 column on mobile, 2 columns on tablet and desktop (2x2 grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                    {cards.map((card, index) => (
                        <div key={index} className="group relative border border-white/20 bg-[#111] p-5 md:p-7 lg:p-8 hover:bg-white hover:text-black transition-all duration-300 flex flex-col h-full overflow-hidden min-h-[200px] md:min-h-[220px]">
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-black transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                            
                            <div className="mb-6">
                                {card.icon}
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-vt323 font-bold mb-4 uppercase tracking-wider">{card.title}</h3>
                            
                            <p className="font-space text-base md:text-lg text-gray-300 group-hover:text-black leading-relaxed flex-grow">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* LEADERBOARD PREVIEW SECTION (On Home Page) */}
        <section className="w-full border-t border-white/20 bg-black relative overflow-hidden">
             {/* Background Grid Accent */}
             <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

             <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 lg:py-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-dashed border-gray-600 pb-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-vt323 text-white leading-none">
                        &gt; LEADERBOARD
                    </h2>
                    <span className="text-gray-400 font-mono text-sm tracking-widest uppercase">
                        // UPDATES DAILY @ 07:30 AM
                    </span>
                </div>

                <div className="mb-4 max-w-3xl">
                    <p className="font-space text-gray-300 text-base md:text-lg leading-relaxed">
                        Join the algorithm arena. Solve LeetCode problems, compete with peers, and sharpen your skills. 
                        Whether you're a beginner or a pro, <span className="text-white font-bold">join us in the journey</span> to mastery.
                    </p>
                </div>

                <Podium />

                <div className="flex justify-center">
                    <button onClick={() => navigateTo('leaderboard')} className="border-2 border-dashed border-gray-600 px-8 py-3 font-vt323 text-xl md:text-2xl text-gray-400 hover:bg-white hover:text-black hover:border-solid transition-all uppercase tracking-widest cursor-pointer">
                        [ VIEW_FULL_LEADERBOARD ]
                    </button>
                </div>
             </div>
        </section>
    </>
  );
};



// --- Main Component ---

const Variation3: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'people' | 'leaderboard'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateTo = (page: 'home' | 'about' | 'people' | 'leaderboard') => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-space relative overflow-x-hidden flex flex-col selection:bg-white selection:text-black">
      {/* CRT Overlay Effects */}
      <div className="scanline absolute inset-0 pointer-events-none z-50 opacity-[0.04] animate-flicker fixed"></div>
      
      {/* Scrolling Background Code */}
      <div className="fixed inset-0 opacity-10 overflow-hidden pointer-events-none text-xs font-mono leading-none break-all p-2 select-none text-gray-400">
        {Array(200).fill(0).map((_, i) => (
            <span key={i}>
                {Math.random() > 0.5 ? '1' : '0'} {Math.random() > 0.9 ? 'ERROR' : 'DATA'} {Math.random().toString(36).substring(7)}
            </span>
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-40 p-4 md:p-6 border-b-2 border-white flex justify-between items-center bg-black">
        <button 
            onClick={() => navigateTo('home')} 
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-none truncate pr-4 font-vt323 tracking-wide hover:text-green-500 transition-colors text-left"
        >
            &gt; DSML_IUI
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-xl lg:text-2xl font-vt323 tracking-wide cursor-pointer">
            <span onClick={() => navigateTo('about')} className={`px-2 transition-colors ${activePage === 'about' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}>[ABOUT]</span>
            <span onClick={() => navigateTo('people')} className={`px-2 transition-colors ${activePage === 'people' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}>[PEOPLE]</span>
            <span onClick={() => navigateTo('leaderboard')} className={`px-2 transition-colors ${activePage === 'leaderboard' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}>[LEADERBOARD]</span>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
            onClick={toggleMenu}
            className="md:hidden text-2xl font-vt323 font-bold border-2 border-transparent hover:border-white px-2 py-1 transition-all"
            aria-label="Toggle menu"
        >
            {isMenuOpen ? '[CLOSE]' : '[MENU]'}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden relative z-40 bg-black border-b-2 border-white p-6 flex flex-col gap-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 font-vt323">
             <button onClick={() => navigateTo('about')} className="text-3xl hover:bg-white hover:text-black w-full p-2 block border border-transparent hover:border-white transition-all text-left">&gt; ABOUT</button>
             <button onClick={() => navigateTo('people')} className="text-3xl hover:bg-white hover:text-black w-full p-2 block border border-transparent hover:border-white transition-all text-left">&gt; PEOPLE</button>
             <button onClick={() => navigateTo('leaderboard')} className="text-3xl hover:bg-white hover:text-black w-full p-2 block border border-transparent hover:border-white transition-all text-left">&gt; LEADERBOARD</button>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 relative z-30 flex flex-col w-full">
          {activePage === 'home' && <HomeView navigateTo={(p) => navigateTo(p as 'home'|'about'|'people'|'leaderboard')} />}
          {activePage === 'about' && <AboutView />}
          {activePage === 'people' && <PeopleView />}
          {activePage === 'leaderboard' && <LeaderboardView />}
      </div>

      <footer className="w-full border-t border-white/20 bg-black relative z-30 pt-8 pb-6 px-6 lg:pt-12 lg:pb-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            
            {/* Left: Logo & Credit */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="text-2xl md:text-3xl font-vt323 font-bold text-white mb-2 tracking-widest flex items-center gap-2">
                    <span className="text-green-500">&gt;</span> DSML_IUI
                </div>
                <p className="font-space text-gray-500 text-xs md:text-sm">
                    Built by DSML_IUI Team and Designed by <a href="https://iknowharsha.framer.website/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">this human</a>
                </p>
            </div>

            

            {/* Right: Socials */}
            <div className="flex items-center gap-6">
                <a href="https://github.com/DSMLIUI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-200" aria-label="GitHub">
                    <GithubIcon />
                </a>
                <a href="https://www.youtube.com/@DSMLIUI/videos" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110 duration-200" aria-label="YouTube">
                    <YoutubeIcon />
                </a>
                <a href="https://www.instagram.com/dsmliui/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110 duration-200" aria-label="Instagram">
                    <InstagramIcon />
                </a>
                <a href="https://www.linkedin.com/company/dsmliui/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-110 duration-200" aria-label="LinkedIn">
                    <LinkedinIcon />
                </a>
                <a href="https://linktr.ee/DSML_IUI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors transform hover:scale-110 duration-200" aria-label="Linktree">
                    <LinktreeIcon />
                </a>
            </div>
        </div>
    </footer>
    </div>
  );
};

export default Variation3;