import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Sparkles, LogOut } from 'lucide-react';

// Pages - We will create these next
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Predictor from './pages/Predictor';
import Chatbot from './pages/Chatbot';
import Contact from './pages/Contact';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('career_craft_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('career_craft_user');
    setUser(null);
  };

  return (
    <Router>
      <div className="container">
        <header>
          <Link to="/" className="logo nav-link">
            <Sparkles size={28} />
            Career Craft
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/predict" className="nav-link">AI Predictor</Link>
                <Link to="/chat" className="nav-link">Chatbot</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border)' }}>
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/contact" className="nav-link">Contact</Link>
                <Link to="/login" className="btn-primary">Get Started</Link>
              </>
            )}
          </nav>
        </header>

        <main style={{ paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/predict" element={user ? <Predictor /> : <Navigate to="/login" />} />
            <Route path="/chat" element={user ? <Chatbot /> : <Navigate to="/login" />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
