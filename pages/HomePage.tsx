import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="text-white min-h-[calc(100vh-80px-100px)] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Welcome to the
          <br />
          <span className="text-indigo-400">Data Science & Machine Learning Club</span> at{' '}
          <a
            href="https://indianapolis.iu.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
          >
            IU Indianapolis
          </a>
        </h1>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/events"
            className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Upcoming Events
          </Link>
          <Link
            to="/people"
            className="inline-block bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            Meet the Board
          </Link>
        </div>
      </div>
    </div>
  );
}