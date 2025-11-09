import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PeoplePage from './pages/PeoplePage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';

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
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
        <footer className="bg-black text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} DSML Club at IU Indy. All Rights Reserved.</p>
        </footer>
      </div>
    </HashRouter>
  );
}