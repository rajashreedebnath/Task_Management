import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAuth } from '../api';
import axios from "axios";


function Login( {setIsLoggedIn} ) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await apiAuth.post('/login', form); // Node.js login
    const { token } = res.data;
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/');
  } catch (err) {
    console.error(err.response?.data || err);
    alert('Login failed');
  }
};

  
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await apiAuth.post('/token/', form); // Django's JWT endpoint
//       localStorage.setItem('token', res.data.access);  // Store JWT token
//       setIsLoggedIn(true);
//       navigate('/');
//     } catch {
//       alert('Login failed');
//     }
//   };


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-sm mt-2 text-center">
          Don't have an account? <a className="text-blue-600 underline" href="/register">Register</a>
        </p>
      </form>
    </div>
  );

}

export default Login;
