import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAuth } from '../api';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiAuth.post('/register', form);
      alert('Registered. Now please login.');
      navigate('/login');

    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
        <p className="text-sm mt-2 text-center">
          Already have an account? <a className="text-blue-600 underline" href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
