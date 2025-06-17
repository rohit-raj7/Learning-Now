import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import clientId from './GoogleOAuthProvider.js';  

const GoogleSignIn = () => {
  const handleSuccess = (credentialResponse) => {
    console.log("Google Sign In Success", credentialResponse);
  };

  const handleError = () => {
    console.log("Google Sign In Error");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col items-center justify-center mt-8 space-y-4">
        <h1 className="text-2xl font-bold text-blue-500">Google Sign-In</h1>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />

        <p className="text-sm text-gray-400 mt-2">or</p>

        <button
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 p-3 rounded-lg text-white transition"
          aria-label="Sign up with Google"
        >
          <FaGoogle size={24} />
          <span className="ml-2">Google Sign-In</span>
        </button>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
