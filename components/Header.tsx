import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414m15.152 0l-1.414 1.414M5.636 18.364l-1.414 1.414m15.152 0l-1.414-1.414M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function Header() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
      isActive ? 'text-white' : ''
    }`;

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <NavLink to="/" className="flex items-center space-x-2">
                <Logo />
                <span className="text-xl font-bold text-white">DSML IU Indy</span>
            </NavLink>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink 
                to="/" 
                className={getNavLinkClass}
              >
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-indigo-500 rounded-full"></span>}
                  </>
                )}
              </NavLink>
              <NavLink 
                to="/events" 
                className={getNavLinkClass}
              >
                 {({ isActive }) => (
                  <>
                    Events
                    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-indigo-500 rounded-full"></span>}
                  </>
                )}
              </NavLink>
              <NavLink 
                to="/people" 
                className={getNavLinkClass}
              >
                 {({ isActive }) => (
                  <>
                    Our Board
                    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-indigo-500 rounded-full"></span>}
                  </>
                )}
              </NavLink>
              <NavLink 
                to="/leaderboard" 
                className={getNavLinkClass}
              >
                 {({ isActive }) => (
                  <>
                    Leaderboard
                    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-indigo-500 rounded-full"></span>}
                  </>
                )}
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}