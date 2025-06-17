// src/api/api.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Automatically attach access token from localStorage
API.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.token) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Token refresh logic on 401 errors
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData?.refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/token/refresh`,
          { refreshToken: userData.refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        userData.token = newAccessToken;
        localStorage.setItem('user', JSON.stringify(userData));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem('user');
        window.location.href = '/user/login';
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Hook: useAuth
export const useAuth = () => {
  const getToken = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData?.token;
  };
  return { getToken };
};

// ✅ Hook: useUser
export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return { user, setUser };
};

// ✅ Profile image update
export const updateProfileImageAPI = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await API.put('/api/user/update-profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default API;
