import React from 'react';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight sm:text-5xl">Club Events</h1>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          Join us for workshops, speaker sessions, and networking events.
        </p>
      </div>
      
      <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID%40group.calendar.google.com&ctz=America%2FNew_York"
          className="w-full h-[600px]"
          frameBorder="0"
          scrolling="no"
          title="Club Events Calendar"
        ></iframe>
      </div>
      <div className="text-center mt-4 text-sm text-gray-500">
        <p>Note: Please replace 'YOUR_CALENDAR_ID' with your actual public Google Calendar ID.</p>
      </div>
    </div>
  );
}