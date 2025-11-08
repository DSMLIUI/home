import React from 'react';
import { NavLink } from 'react-router-dom';

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
                <img src="/logo.svg" alt="Logo" className="w-10 h-10 text-white"/>
                <span className="text-xl font-bold text-white">DSML @ IUI</span>
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