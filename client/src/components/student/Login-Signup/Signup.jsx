
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { assets } from './assets/assets';
import clientId from './GoogleOAuthProvider';
import Loading from './Loading';

function Signup() {
  const [role, setRole] = useState('student'); // 'student' or 'educator'
  const [step, setStep] = useState('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'https://onlinelearning-rohit.vercel.app';

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*\d).{6,}$/.test(password);

  const handleRoleToggle = (selected) => {
    setRole(selected);
    setStep('register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters with a digit');
      setIsLoading(false);
      return;
    }

    const endpoint = role === 'student' ? 'user' : 'educator';

    try {
      const result = await axios.post(`${API_URL}/api/${endpoint}/signup`, {
        name, email, password,
      });

      if (result.data.success) {
        setStep('otp');
        toast.success('OTP sent to your email!');
      }
    } catch (err) {
      if (err.response?.data?.message?.includes('already exists')) {
        toast.error('Email already exists. Please Login.');
        setTimeout(() => {
          navigate(`/user/login`);
        }, 3000);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsVerifyingOtp(true);

    const endpoint = role === 'student' ? 'user' : 'educator';

    try {
      const result = await axios.post(`${API_URL}/api/${endpoint}/verify-email`, {
        code: otp,
      });

      if (result.data.success) {
        toast.success('Account verified successfully!');
        setTimeout(() => {
          navigate(`/user/login`);
        }, 2000);
      } else {
        toast.error(result.data.message || 'OTP verification failed.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred. Try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
        style={{ backgroundImage: `url(${role === 'student' ? assets.bg_img : assets.bg_educator})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0" />
        <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse z-0" />
        <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse z-0" />
        <div className='flex flex-col'>
          {/* Role Toggle - only during registration */}
          {step === 'register' && (
            <div className="flex justify-center mb-6 z-10">
              <div className="relative flex w-64 sm:w-72 bg-gray-800 border border-cyan-600 rounded-full p-1 shadow-inner transition-all">
                {/* Sliding indicator */}
                <div
                  className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-cyan-600 transition-all duration-300 ease-in-out ${role === 'student' ? 'left-1' : 'left-1/2'
                    }`}
                ></div>

                {/* Student Button */}
                <button
                  type="button"
                  onClick={() => handleRoleToggle('student')}
                  className={`w-1/2 z-10 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-200 ${role === 'student'
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  Student
                </button>

                {/* Educator Button */}
                <button
                  type="button"
                  onClick={() => handleRoleToggle('educator')}
                  className={`w-1/2 z-10 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-200 ${role === 'educator'
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  Educator
                </button>
              </div>
            </div>
          )}

          <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-cyan-300 text-center">
              {step === 'register'
                ? (role === 'student' ? 'Sign Up' : 'Sign Up')
                : 'Verify OTP'}
            </h2>




            {step === 'register' ? (
              <form onSubmit={handleSubmit}>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  required
                  className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  required
                  className="w-full mb-1 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {emailError && <p className="text-red-400 text-sm mb-2">{emailError}</p>}

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  required
                  className="w-full mb-4 mt-3 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {passwordError && <p className="text-red-400 text-sm mb-4">{passwordError}</p>}

                <button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300 flex justify-center items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : 'Signup'}
                </button>

                <p className="text-md text-center text-gray-200 mt-4">
                  Already have an account?{' '}
                  <Link
                    to={`/${role === 'student' ? 'user' : 'user'}/login`}
                    className="text-cyan-300 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleOtpVerification}>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  required
                  className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  disabled={isVerifyingOtp}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300"
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </GoogleOAuthProvider>
  );
}

export default Signup;
