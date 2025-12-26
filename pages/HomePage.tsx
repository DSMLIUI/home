import React from 'react';
import NeuralNetwork from '../components/NeuralNetwork';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden pb-32">
      <NeuralNetwork />
      <div className="container mx-auto px-8 py-24 text-center max-w-4xl relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-light text-off-white leading-tight mb-8">
          Data Science & Machine Learning Club
        </h1>
        <p className="text-lg sm:text-xl text-mid-gray font-mono mb-4">
          at{' '}
          <a
            href="https://indianapolis.iu.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-blue hover:text-off-white transition-colors"
          >
            IU Indianapolis
          </a>
        </p>
      </div>
    </div>
  );
}