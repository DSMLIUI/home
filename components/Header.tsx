import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-mid-gray hover:text-off-white px-8 py-8 text-sm font-mono transition-colors ${
      isActive ? 'text-off-white border-b border-muted-blue' : ''
    }`;

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block text-mid-gray hover:text-off-white px-8 py-4 text-sm font-mono transition-colors ${
      isActive ? 'text-off-white border-l-2 border-muted-blue bg-dark-gray' : ''
    }`;

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/people', label: 'Board' },
    { to: '/leaderboard', label: 'Leaderboard' }
  ];

  return (
    <header className="bg-rich-black border-b border-dark-gray sticky top-0 z-50">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-18">
          <div className="flex items-center">
             <NavLink to="/" className="flex items-center space-x-3 group">
                <img src="logo.svg" alt="Logo" className="w-10 h-10 transition-opacity group-hover:opacity-80"/>
                <span className="text-base font-mono font-medium text-off-white">DSML IUI</span>
            </NavLink>
          </div>
          
          <div className="hidden md:flex items-center justify-end flex-1 ml-16">
            {/* Desktop Navigation */}
            <nav className="flex items-center">
              <div className="flex items-center">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.to}
                    to={link.to}
                    className={getNavLinkClass}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 text-mid-gray hover:text-off-white focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-dark-gray">
            <div className="py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={getMobileNavLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}