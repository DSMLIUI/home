import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Welcome to the <span className="text-indigo-400">Data Science & Machine Learning</span> Club
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
          Exploring the frontiers of data, AI, and their impact on the world. Join a community of innovators at Indiana University.
        </p>
        <div className="mt-8 flex justify-center gap-4">
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