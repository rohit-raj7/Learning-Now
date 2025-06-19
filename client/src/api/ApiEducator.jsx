import { useEffect, useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
});

// Attach access token to each request
API.interceptors.request.use(
  (config) => {
    const educatorData = JSON.parse(localStorage.getItem('educator'));
    if (educatorData?.token) {
      config.headers.Authorization = `Bearer ${educatorData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh access token if expired
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

      const educatorData = JSON.parse(localStorage.getItem('educator'));
      if (!educatorData?.refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.API_URL}/api/token/refresh`,
          { refreshToken: educatorData.refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        educatorData.token = newAccessToken;
        localStorage.setItem('educator', JSON.stringify(educatorData));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem('educator');
        window.location.href = '/educator/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Custom hook to get educator from localStorage
export const useEducator = () => {
  const [educator, setEducator] = useState(null);

  useEffect(() => {
    const storedEducator = localStorage.getItem('educator');
    if (storedEducator) {
      setEducator(JSON.parse(storedEducator));
    }
  }, []);

  return { educator, setEducator };
};


// ✅ Custom hook to get educator token
export const useEducatorAuth = () => {
  const getToken = async () => {
    const educatorData = JSON.parse(localStorage.getItem('educator'));
    return educatorData?.token;
  };
  return { getToken };
};

// ✅ Update profile image
export const updateEducatorProfileImageAPI = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await API.put('/api/educator/update-profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// ✅ Optional: log token for debugging
export const logEducatorToken = () => {
  const educatorData = JSON.parse(localStorage.getItem('educator'));
  console.log("🪪 Stored Educator Token:", educatorData?.token || "No token found");
};

export default API;




 