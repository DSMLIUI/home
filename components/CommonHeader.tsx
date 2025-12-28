import React from 'react';

interface HeaderProps {
  className?: string;
  logoClassName?: string;
  linkClassName?: string;
}

export const CommonHeader: React.FC<HeaderProps> = ({ 
  className = "", 
  logoClassName = "text-xl font-bold tracking-widest", 
  linkClassName = "hover:underline underline-offset-4 decoration-2"
}) => {
  return (
    <nav className={`w-full flex justify-between items-center p-6 z-40 relative ${className}`}>
      <div className={`flex items-center gap-2 ${logoClassName}`}>
        <div className="w-6 h-6 bg-white/10 border border-current flex items-center justify-center text-xs">
          <div className="w-2 h-2 bg-current"></div>
        </div>
        DSML IUI
      </div>
      <div className={`flex gap-8 text-sm md:text-base ${linkClassName}`}>
        <a href="#about" className="uppercase">About</a>
        <a href="#people" className="uppercase">People</a>
        <a href="#leaderboard" className="uppercase">Leaderboard</a>
      </div>
    </nav>
  );
};