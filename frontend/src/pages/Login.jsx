import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { USER_LOGIN } from '../constants/apiEndpoints';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(USER_LOGIN, {
        email,
        password,
      });

      const { token, user, wallet } = response.data;

      console.log("Token:", token);
      console.log("User:", user);
      console.log("Wallet:", wallet);
      console.log('fundingWallet:', user.fundingWallet);
      console.log('supportWallet:', user.supportWallet);


      const twoHoursInMs = 2 * 60 * 60 * 1000; // Two hours in milliseconds

      // Save token and user data to localStorage
      setWithExpiry('usertoken', token, twoHoursInMs);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);
      localStorage.setItem('fundingWallet', user.fundingWallet);
      localStorage.setItem('supportWallet', user.supportWallet);
      localStorage.setItem('userId', user.id);

      // Store wallet data in localStorage
      localStorage.setItem('wallet', JSON.stringify(wallet));

      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard or home page
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "rgba(21,49,32,255)" }}>
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">User Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
