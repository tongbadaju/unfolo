import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Instructions from './pages/Landing';
import UploadPage from './pages/UploadPage';
import Tutorial from './pages/Tutorial';

export default function App() {
  return (
    // Router wraps the whole app to enable client-side navigation
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex flex-col items-center flex-grow mt-15">
          <Routes>
            <Route path="/" element={<Instructions />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/tutorial" element={<Tutorial />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
