import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TourPage from './pages/TourPage';
import InProgress from './pages/InProgress';
import Calendar from './pages/Calendar';
import Gallery from './pages/Gallery';
import AlbumView from './pages/AlbumView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tour/:tourId" element={<TourPage />} />
            <Route path="/in-progress" element={<InProgress />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:albumId" element={<AlbumView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
