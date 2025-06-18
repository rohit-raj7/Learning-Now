import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from './assets/assets';
import clientId from './GoogleOAuthProvider';
import Loading from './Loading';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = loginInfo;

    if (!email || !password) {
      toast.error('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const url = 'https://onlinelearning-rohit.vercel.app/api/educator/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log('Login result from backend:', result);

      const { success, message, jwtToken, educator, error } = result;

      if (success) {
        toast.success(message || 'Login successful!');
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('educator', JSON.stringify(educator));

        setTimeout(() => {
          navigate('/educator');
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 1000);
      } else {
        toast.error(error || message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google Sign In Success', credentialResponse);
    toast.success('Google Sign-In successful!');
  };

  const handleGoogleError = () => {
    console.error('Google Sign In Error');
    toast.error('Google Sign-In failed. Try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
        style={{ backgroundImage: `url(${assets.bg_img})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse z-0"></div>
        <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse z-0"></div>

        <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-cyan-300 text-center tracking-wide">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={loginInfo.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={loginInfo.password}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <p className="text-sm text-cyan-100 mb-4 text-right">
              <Link to="/educator/forgot-password" className="hover:underline text-cyan-300">
                Forgot Password?
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition duration-300 ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              {loading ? <Loading /> : 'Login'}
            </button>

            <p className="text-sm text-center text-cyan-200 mt-4">
              Don't have an account?{' '}
              <Link to="/educator/signup" className="text-cyan-300 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-100 mb-4">Or login with</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </GoogleOAuthProvider>
  );
}

export default Login;
