import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PeoplePage from './pages/PeoplePage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} DS/ML Club at IU. All Rights Reserved.</p>
        </footer>
      </div>
    </HashRouter>
  );
}