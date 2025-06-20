import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const check = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/tasks" /> : <Navigate to="/login" />
        } />
        <Route path="/tasks" element={
          isLoggedIn ? <Tasks /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;
