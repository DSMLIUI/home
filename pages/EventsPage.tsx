import React from 'react';
import NeuralNetwork from '../components/NeuralNetwork';

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <NeuralNetwork />
      <div className="container mx-auto px-8 py-24 pb-64 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-mono font-light text-off-white mb-4">About</h1>
            <div className="w-16 h-px bg-muted-blue"></div>
          </div>
          
          <div className="space-y-12">
            {/* About Section */}
            <div className="card p-8">
              <h2 className="text-xl font-mono font-medium text-off-white mb-4">Who We Are</h2>
              <p className="text-base font-mono text-mid-gray leading-relaxed">
                We're the largest student organization for Data Science, Machine Learning, and AI enthusiasts at IU Indianapolis. 
                Our focus is helping Luddy students keep pace with developments in AI and Machine Learning.
              </p>
            </div>

            {/* What We Do Section */}
            <div className="card p-8">
              <h2 className="text-xl font-mono font-medium text-off-white mb-4">What We Do</h2>
              <p className="text-base font-mono text-mid-gray leading-relaxed mb-4">
                We organize technical workshops covering ML and AI fundamentals. Beyond workshops, we organize or participate in:
              </p>
              <ul className="space-y-2 text-base font-mono text-mid-gray ml-6">
                <li>• Industry Talks</li>
                <li>• ML Paper Presentations</li>
                <li>• Monthly Networking Events</li>
                <li>• Professional Development Workshops</li>

              </ul>
              <p className="text-base font-mono text-mid-gray leading-relaxed mt-4">
                These events connect students with faculty and industry professionals.
              </p>
            </div>

            {/* Mission Section */}
            <div className="card p-8">
              <h2 className="text-xl font-mono font-medium text-off-white mb-4">Mission</h2>
              <p className="text-base font-mono text-mid-gray leading-relaxed">
                Build a community where students can learn, collaborate, and grow in Data Science and AI through 
                hands-on workshops, projects, and connections with faculty and industry.
              </p>
            </div>

            {/* Vision Section */}
            <div className="card p-8">
              <h2 className="text-xl font-mono font-medium text-off-white mb-4">Vision</h2>
              <p className="text-base font-mono text-mid-gray leading-relaxed">
                Prepare Luddy students to lead in AI and Machine Learning by providing practical experience, 
                technical knowledge, and professional networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}