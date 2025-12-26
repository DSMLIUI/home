import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PeoplePage from './pages/PeoplePage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-rich-black grid-dots">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}