import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { assets } from './assets/assets';
import Loading from './Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL="https://onlinelearning-rohit.vercel.app"

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/reset-password`, { email });
      if (res.data.success) {
        toast.success(res.data.message || 'OTP sent to your email.');
        setStep('otp');
      } else {
        toast.error(res.data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6 || !/\d/.test(newPassword)) {
      toast.error('Password must be at least 6 characters and include a digit.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/verify-reset-otp`, {
        email,
        resetCode: otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Password reset successful!');
        navigate('/user/login');
      } else {
        toast.error(res.data.message || 'Invalid OTP or error. Try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${assets.bg_img})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse z-0"></div>
      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse z-0"></div>

      <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-cyan-300 text-center tracking-wide">
          Forgot Password
        </h2>

        {step === 'email' ? (
          <form onSubmit={sendOtp}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={email}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300 flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? <Loading /> : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={resetPassword}>
            <input
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={otp}
              required
              disabled={loading}
            />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={newPassword}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300 flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? <Loading /> : 'Reset Password'}
            </button>
          </form>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </div>
  );
}

export default ForgotPassword;
