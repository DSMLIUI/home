import React from 'react';
import NeuralNetwork from '../components/NeuralNetwork';

export default function EventsPage() {
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-16rem)]">
      <NeuralNetwork />
      <div className="container mx-auto px-8 py-24 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-mono font-light text-off-white mb-4">Events</h1>
            <div className="w-16 h-px bg-muted-blue"></div>
          </div>
          
          <div className="card overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID%40group.calendar.google.com&ctz=America%2FNew_York"
              className="w-full h-[600px]"
              frameBorder="0"
              scrolling="no"
              title="Club Events Calendar"
            ></iframe>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-mono text-mid-gray">
              Note: Replace 'YOUR_CALENDAR_ID' with your Google Calendar ID
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}